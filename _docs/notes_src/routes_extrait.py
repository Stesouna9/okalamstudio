        elif url.path == "/notes":
            self.send_file(STUDIO / "notes.html")
        elif url.path.startswith("/notes/photo/"):
            name = re.sub(r"[^a-z0-9.]", "", url.path.rsplit("/", 1)[1])
            self.send_file(NOTES_PHOTOS / name)
        elif url.path == "/api/notes":
            self.send_json(load_json(NOTES_FILE, []))
        elif url.path == "/api/marketing":
            self.send_json({"data": load_json(MARKETING_FILE, {}),
                            "doc": MARKETING_DOC.read_text() if MARKETING_DOC.is_file() else "",
                            "doc_maj": time.strftime("%d/%m/%Y %H:%M", time.localtime(MARKETING_DOC.stat().st_mtime)) if MARKETING_DOC.is_file() else "",
                            "git": git_state()})
        elif url.path == "/api/dashboard":
            self.send_json(dashboard())
        elif url.path == "/api/jingles/sources":
            out = {}
            for st in STATION_IDS:
                f = JINGLES / st / "source.json"
                if f.is_file():
                    out[st] = load_json(f, {})
            self.send_json(out)
        elif url.path == "/api/job":
            self.send_json(job_status())
        elif url.path.startswith("/contrats/"):
            # The OKALAM contract templates, read-only, so Production can
            # open the right one without leaving the studio.
            name = pathlib.Path(urllib.parse.unquote(url.path[len("/contrats/"):])).name
            self.send_file(CONTRACTS / name)
        elif url.path == "/api/contrats":
            files = sorted(f.name for f in CONTRACTS.glob("*.pdf")) if CONTRACTS.is_dir() else []
            self.send_json({"files": files})
        elif url.path == "/api/state":
            self.send_json(state())
        elif url.path == "/inbox":
            self.send_file(STUDIO / "inbox.html")
        elif url.path == "/jingles":
            self.send_file(STUDIO / "jingles.html")
        elif url.path == "/pubs":
            self.send_file(STUDIO / "pubs.html")
        elif url.path == "/api/pubs":
            prod = load_json(PROD_FILE, {})
            beds = [{"id": b, "label": AD_BED_NAMES.get(b, b), "url": f"/inbox_audio?file=pubs/beds/{b}.m4a"}
                    for b in AD_BED_NAMES if (AD_BEDS / f"{b}.m4a").is_file()]
            takes = {}
            for st in STATION_IDS:
                for f in sorted((DROPS / st).glob("pub_*.m4a")) if (DROPS / st).is_dir() else []:
                    pid = f.stem.split("_")[1] if f.stem.count("_") >= 2 else ""
                    takes.setdefault(pid, []).append({"file": f"Drops/{st}/{f.name}", "url": f"/audio?file=Drops/{st}/{f.name}",
                                                      "seconds": round(seconds(f), 1), "name": f.name})
            self.send_json({"pubs": prod.get("pubs", []), "beds": beds, "takes": takes, "stations": STATIONS})
        elif url.path == "/api/inbox":
            cards = [c for c in read_cards() if (INBOX / c["file"]).is_file()]
            if (query.get("bundle") or ["1"])[0] != "0":
                cards = bundle_cards() + cards
            self.send_json({"cards": cards,
                            "stations": [{k: s.get(k, "") for k in ("id", "frequency", "name", "genre", "color", "slogan")}
                                         for s in STATIONS]})
        elif url.path == "/inbox_audio":
            name = (query.get("file") or [""])[0]
            target = (INBOX / name).resolve()
            if INBOX.resolve() in target.parents:
                self.send_file(target)
            else:
                self.send_error(403)
        elif url.path == "/api/ambiance":
            # The format bible: who is at the microphone and what he may say.
            self.send_file(STUDIO / "ambiance.json")
        elif url.path == "/api/scripts":
            # What the presenter reads. Written per station, in its voice.
            self.send_file(STUDIO / "scripts.json")
        elif url.path == "/apple-touch-icon.png":
            self.send_file(ROOT / "ViceBreak" / "Art" / "Radio" / "vicebay_radio_1x1.png")
        elif url.path == "/favicon.ico":
            self.send_file(ART / "vicebay_radio_nav.png")
        elif url.path == "/art":
            # The station's mark, so the console looks like the dial it feeds.
            name = slug((query.get("name") or [""])[0])
            self.send_file(ART / f"{name}.png")
        elif url.path == "/mix":
            # A rendered changeover. Nothing here survives a rebuild.
            name = slug((query.get("name") or [""])[0])
            self.send_file(MIX / f"{name}.m4a")
        elif url.path == "/audio":
            name = (query.get("file") or [""])[0]
            target = (MUSIC / name).resolve()
            # Never serve anything outside the music folder.
            if MUSIC.resolve() in target.parents:
                self.send_file(target)
            else:
                self.send_error(403)
        else:
            self.send_error(404)

    def do_OPTIONS(self):
        # The station art is pushed in from a browser tab on another origin.
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(url.query)

        if url.path == "/api/art":
            name = slug((query.get("name") or ["art"])[0])
            ART.mkdir(parents=True, exist_ok=True)
            target = ART / f"{name}.png"
            target.write_bytes(self.body())
            self.send_header_cors = True
            self.send_json({"saved": str(target.relative_to(ROOT)),
                            "bytes": target.stat().st_size})

        elif url.path == "/api/cut":
            payload = json.loads(self.body() or b"{}")
            cuts = read_cuts()
            if payload.get("cut"):
                cuts.add(payload["file"])
            else:
                cuts.discard(payload["file"])
            write_cuts(cuts)
            self.send_json({"cuts": len(cuts)})

        elif url.path == "/api/drop":
            station = (query.get("station") or [""])[0]
            if station not in STATION_IDS:
                self.send_json({"error": "unknown station"}, 400)
                return
            source = (query.get("from") or [""])[0]
            target = (query.get("to") or [""])[0]
            name = (query.get("name") or ["ident"])[0]

            folder = DROPS / station
            folder.mkdir(parents=True, exist_ok=True)
            keep = RAW / station
            keep.mkdir(parents=True, exist_ok=True)
            raw = keep / f".incoming_{slug(name)}"
            raw.write_bytes(self.body())
            out = folder / f"{slug(name)}.m4a"

            def encode(codec, rate):
                """Runs one encode and says whether it produced audio.

                ffmpeg opens the output before it fails, so a file existing
                proves nothing: an empty take is the failure mode that looks
                like success, and it is the one that wastes a session.
                """
                run = subprocess.run(["ffmpeg", "-y", "-i", str(raw),
                                      "-af", VOICE_CHAIN, "-c:a", codec,
                                      "-b:a", rate, "-ar", "44100", str(out)],
                                     capture_output=True, text=True)
                if out.is_file() and out.stat().st_size > 2048:
                    return None
                out.unlink(missing_ok=True)
                return run.stderr.strip().splitlines()[-1] if run.stderr else "ffmpeg"

            # Mono AAC at 72k: a little more than the music gets, because a
            # voice loses its consonants first. aac_at is the Apple encoder;
            # ffmpeg's own is the fallback when it is not built in.
            why = encode("aac_at", "64k") and encode("aac", "80k")
            # The untreated take is kept: the voice chain can be reworked
            # later, and nobody should have to perform a link twice because
            # a filter setting turned out wrong.
            if why:
                raw.unlink(missing_ok=True)
            else:
                raw.replace(keep / slug(name))
            if why:
                self.send_json({"error": f"encodage impossible — {why}"}, 500)
                return

            index = load_json(DROPS / "index.json", {})
            index[f"{station}/{out.name}"] = {"from": source or None, "to": target or None}
            (DROPS / "index.json").write_text(json.dumps(index, indent=1))
            # A take that recorded nothing looks exactly like a good one in
            # the console, so the level is measured here and said out loud.
            self.send_json({"file": f"Drops/{station}/{out.name}",
                            "peak": round(peak_db(out), 1),
                            "voice": round(voice_db(keep / slug(name)), 1),
                            "log": rebuild()})

        elif url.path == "/api/mix":
            payload = json.loads(self.body() or b"{}")
            voice = (MUSIC / payload.get("file", "")).resolve()
            outro = (MUSIC / payload.get("from", "")).resolve()
            intro = (MUSIC / payload.get("to", "")).resolve()
            music = MUSIC.resolve()
            if not all(music in f.parents and f.is_file()
                       for f in (voice, outro, intro)):
                self.send_json({"error": "fichiers introuvables"}, 400)
                return
            out = render_mix(outro, intro, voice, float(payload.get("gain", 0)))
            if out is None:
                self.send_json({"error": "mixage impossible"}, 500)
                return
            self.send_json({"url": f"/mix?name={out.stem}&t={int(time.time())}"})

        elif url.path == "/api/drop/validate":
            payload = json.loads(self.body() or b"{}")
            validated = set(load_json(VALID_FILE, []))
            if payload.get("ok"):
                validated.add(payload.get("file", ""))
            else:
                validated.discard(payload.get("file", ""))
            VALID_FILE.write_text(json.dumps(sorted(validated), indent=1))
            self.send_json({"validated": len(validated)})

        elif url.path == "/api/drop/delete":
            payload = json.loads(self.body() or b"{}")
            target = (MUSIC / payload.get("file", "")).resolve()
            if DROPS.resolve() in target.parents and target.is_file():
                target.unlink()
                index = load_json(DROPS / "index.json", {})
                index.pop(str(target.relative_to(DROPS)), None)
                (DROPS / "index.json").write_text(json.dumps(index, indent=1))
                self.send_json({"log": rebuild()})
            else:
                self.send_json({"error": "not a drop"}, 400)

        elif url.path == "/api/inbox/verdict":
            # {id, verdict: station id | "trash" | null}. Nothing moves yet.
            payload = json.loads(self.body() or b"{}")
            if str(payload.get("id", "")).startswith("b_"):
                verdicts = load_json(BUNDLE_VERDICTS, {})
                file = payload.get("file", "")
                if payload.get("verdict"):
                    verdicts[file] = payload["verdict"]
                else:
                    verdicts.pop(file, None)
                BUNDLE_VERDICTS.write_text(json.dumps(verdicts, indent=1))
                self.send_json({"pending": len(verdicts)})
                return
            cards = read_cards()
            for card in cards:
                if card["id"] == payload.get("id"):
                    if payload.get("verdict"):
                        card["verdict"] = payload["verdict"]
                    else:
                        card.pop("verdict", None)
            write_cards(cards)
            self.send_json({"pending": sum(1 for c in cards if c.get("verdict"))})

        elif url.path == "/api/fetch":
            station = (query.get("station") or [""])[0]
            per = int((query.get("per") or ["24"])[0])
            argv = [str(ROOT / "tools" / "fetch_music.py"), "--per", str(per)] + ([station] if station in STATION_IDS else [])
            self.send_json(start_job(f"fournée {station or 'toutes stations'} ({per})", argv))

        elif url.path == "/api/jingle/from":
            # A real track from the inbox becomes the station's jingle bed.
            station = (query.get("station") or [""])[0]
            rel = (query.get("file") or [""])[0]
            if station not in STATION_IDS or not rel:
                self.send_json({"error": "station ou fichier manquant"}); return
            self.send_json(start_job(f"jingle {station} depuis {pathlib.Path(rel).stem[:30]}",
                                     [str(ROOT / "tools" / "jingle_from_track.py"), station, rel]))

        elif url.path == "/api/jingles/make":
            station = (query.get("station") or [""])[0]
            argv = [str(ROOT / "tools" / "make_jingles.py")] + ([station] if station in STATION_IDS else [])
            self.send_json(start_job(f"jingles {station or 'toutes stations'}", argv))

        elif url.path == "/api/rebuild":
            self.send_json({"log": rebuild()})

        elif url.path == "/api/scripts":
            payload = json.loads(self.body() or b"{}")
            if not isinstance(payload, dict) or set(payload) - STATION_IDS:
                self.send_json({"error": "format inattendu"}, 400)
                return
            SCRIPTS_FILE.write_text(json.dumps(payload, indent=1, ensure_ascii=False))
            self.send_json({"saved": sum(len(v) for v in payload.values())})

        elif url.path == "/api/marketing":
            data = json.loads(self.body() or b"{}")
            data["maj"] = time.strftime("%Y-%m-%d")
            MARKETING_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2))
            self.send_json({"saved": True})
