#!/usr/bin/env python3
"""
OKALAM Studio — Page Encryptor
Encrypts HTML pages with AES-256-CBC so content is unreadable in source.
Users enter a password to decrypt and view the page in-browser.
"""

import hashlib, os, sys, base64, json
from pathlib import Path

# ── CONFIG ──────────────────────────────────────────────────────
PAGES = {
    # brandkit.html is now public (no encryption)
    "mediakit-elisa.html":  "elisa26",
    "mediakit-pierre.html": "pierre25",
}
SRC_DIR = Path(__file__).resolve().parent.parent / "_src"
OUT_DIR = Path(__file__).resolve().parent.parent

# ── AES-256-CBC (pure Python, no dependencies) ─────────────────
# Using Web Crypto API in the browser for actual decryption.
# This script just encrypts with PBKDF2+AES-256-CBC using Python's hashlib.

def encrypt_page(html_content: str, password: str) -> str:
    """Encrypt HTML content and return a self-decrypting HTML page."""

    # Generate random salt and IV
    salt = os.urandom(16)
    iv = os.urandom(16)

    # Derive key with PBKDF2 (100k iterations, SHA-256)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000, dklen=32)

    # AES-256-CBC encryption (manual implementation to avoid dependencies)
    plaintext = html_content.encode('utf-8')

    # PKCS7 padding
    pad_len = 16 - (len(plaintext) % 16)
    plaintext += bytes([pad_len] * pad_len)

    # AES encrypt (using Python's built-in if available)
    try:
        # Try using PyCryptodome or similar
        from Crypto.Cipher import AES
        cipher = AES.new(key, AES.MODE_CBC, iv)
        ciphertext = cipher.encrypt(plaintext)
    except ImportError:
        try:
            # Try cryptography library
            from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
            cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
            encryptor = cipher.encryptor()
            ciphertext = encryptor.update(plaintext) + encryptor.finalize()
        except ImportError:
            # Fallback: use openssl via subprocess
            import subprocess, tempfile
            with tempfile.NamedTemporaryFile(delete=False, suffix='.bin') as f:
                f.write(plaintext)
                tmp_in = f.name
            tmp_out = tmp_in + '.enc'
            subprocess.run([
                'openssl', 'enc', '-aes-256-cbc',
                '-in', tmp_in, '-out', tmp_out,
                '-K', key.hex(), '-iv', iv.hex(), '-nopad'
            ], check=True)
            with open(tmp_out, 'rb') as f:
                ciphertext = f.read()
            os.unlink(tmp_in)
            os.unlink(tmp_out)

    # Encode for embedding
    encrypted_data = json.dumps({
        "salt": base64.b64encode(salt).decode(),
        "iv": base64.b64encode(iv).decode(),
        "ct": base64.b64encode(ciphertext).decode(),
        "iter": 100000
    })

    return generate_decrypt_page(encrypted_data, password)


def generate_decrypt_page(encrypted_data: str, password: str) -> str:
    """Generate a self-decrypting HTML page with OKALAM Studio styling."""

    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="robots" content="noindex, nofollow"/>
<title>Accès protégé — OKALAM Studio</title>
<style>
*{{margin:0;padding:0;box-sizing:border-box;}}
body{{background:#080c12;color:#e8edf5;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;}}
.gate{{text-align:center;padding:40px 24px;max-width:420px;}}
.gate-logo{{font-family:'Segoe UI',sans-serif;font-weight:800;font-size:.8rem;letter-spacing:.22em;color:#8deaff;margin-bottom:32px;}}
.gate-lock{{font-size:2.5rem;margin-bottom:20px;opacity:.35;}}
.gate-title{{font-weight:700;font-size:1.3rem;margin-bottom:8px;}}
.gate-sub{{font-size:.88rem;color:#6b7280;margin-bottom:32px;}}
.gate-form{{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}}
.gate-input{{background:#111827;border:1px solid rgba(141,234,255,.1);border-radius:8px;padding:11px 18px;color:#e8edf5;font-size:.85rem;outline:none;width:200px;text-align:center;transition:border-color .2s;}}
.gate-input:focus{{border-color:#8deaff;}}
.gate-btn{{background:#8deaff;color:#05080e;font-weight:700;font-size:.75rem;letter-spacing:.08em;border:none;border-radius:8px;padding:11px 22px;cursor:pointer;transition:all .2s;}}
.gate-btn:hover{{background:#fff;}}
.gate-error{{color:#f87171;font-size:.8rem;margin-top:12px;display:none;}}
.gate-home{{margin-top:28px;display:inline-block;font-size:.75rem;color:#6b7280;text-decoration:none;border:1px solid rgba(255,255,255,.06);padding:8px 20px;border-radius:4px;transition:all .2s;}}
.gate-home:hover{{border-color:#8deaff;color:#8deaff;}}
</style>
</head>
<body>
<div class="gate">
  <div class="gate-logo">OKALAM STUDIO</div>
  <div class="gate-lock">🔒</div>
  <h1 class="gate-title" id="g-title">Accès protégé</h1>
  <p class="gate-sub" id="g-sub">Ce document est réservé aux partenaires OKALAM Studio.</p>
  <form class="gate-form" onsubmit="return decrypt(event)">
    <input type="password" class="gate-input" id="pwd" placeholder="Code d'accès" autocomplete="off"/>
    <button type="submit" class="gate-btn" id="g-btn">ACCÉDER</button>
  </form>
  <div class="gate-error" id="err">Code incorrect. Réessaie.</div>
  <a href="index.html" class="gate-home" id="g-back">← Retour au site</a>
</div>
<script>
(function(){{
  const T={{
    fr:{{title:"Accès protégé",sub:"Ce document est réservé aux partenaires OKALAM Studio.",ph:"Code d'accès",btn:"ACCÉDER",err:"Code incorrect. Réessaie.",back:"← Retour au site"}},
    en:{{title:"Protected access",sub:"This document is reserved for OKALAM Studio partners.",ph:"Access code",btn:"ACCESS",err:"Incorrect code. Try again.",back:"← Back to site"}},
    ja:{{title:"アクセス保護",sub:"このドキュメントはOKALAM Studioのパートナー専用です。",ph:"アクセスコード",btn:"アクセス",err:"コードが正しくありません。",back:"← サイトに戻る"}},
    zh:{{title:"受保护的访问",sub:"此文档仅供OKALAM Studio合作伙伴使用。",ph:"访问代码",btn:"访问",err:"代码不正确，请重试。",back:"← 返回网站"}},
    es:{{title:"Acceso protegido",sub:"Este documento está reservado para los socios de OKALAM Studio.",ph:"Código de acceso",btn:"ACCEDER",err:"Código incorrecto. Inténtalo de nuevo.",back:"← Volver al sitio"}},
    pt:{{title:"Acesso protegido",sub:"Este documento é reservado aos parceiros do OKALAM Studio.",ph:"Código de acesso",btn:"ACEDER",err:"Código incorreto. Tenta novamente.",back:"← Voltar ao site"}}
  }};
  const lang=localStorage.getItem('okalam_lang')||'fr';
  const t=T[lang]||T.fr;
  document.getElementById('g-title').textContent=t.title;
  document.getElementById('g-sub').textContent=t.sub;
  document.getElementById('pwd').placeholder=t.ph;
  document.getElementById('g-btn').textContent=t.btn;
  document.getElementById('err').textContent=t.err;
  document.getElementById('g-back').textContent=t.back;
  document.title=t.title+' — OKALAM Studio';
}})();
</script>
<script id="encrypted-data" type="application/json">{encrypted_data}</script>
<script>
async function decrypt(e){{
  e.preventDefault();
  const pwd=document.getElementById('pwd').value;
  const data=JSON.parse(document.getElementById('encrypted-data').textContent);
  const salt=Uint8Array.from(atob(data.salt),c=>c.charCodeAt(0));
  const iv=Uint8Array.from(atob(data.iv),c=>c.charCodeAt(0));
  const ct=Uint8Array.from(atob(data.ct),c=>c.charCodeAt(0));
  try{{
    const keyMaterial=await crypto.subtle.importKey('raw',new TextEncoder().encode(pwd),'PBKDF2',false,['deriveBits','deriveKey']);
    const key=await crypto.subtle.deriveKey({{name:'PBKDF2',salt:salt,iterations:data.iter,hash:'SHA-256'}},keyMaterial,{{name:'AES-CBC',length:256}},false,['decrypt']);
    // Web Crypto AES-CBC auto-unpads PKCS7. Our Python encrypt already added PKCS7 padding,
    // then chained openssl with -nopad. So Web Crypto sees valid PKCS7 and unpads correctly.
    const decrypted=await crypto.subtle.decrypt({{name:'AES-CBC',iv:iv}},key,ct);
    const html=new TextDecoder().decode(decrypted);
    document.open();document.write(html);document.close();
  }}catch(err){{
    document.getElementById('err').style.display='block';
    document.getElementById('pwd').value='';
    document.getElementById('pwd').focus();
  }}
}}
</script>
</body>
</html>'''


def main():
    print("🔐 OKALAM Studio — Encrypting private pages...")

    for filename, password in PAGES.items():
        src = SRC_DIR / filename
        out = OUT_DIR / filename

        if not src.exists():
            print(f"  ⚠ {filename}: source not found in _src/, skipping")
            continue

        html = src.read_text(encoding='utf-8')
        encrypted_page = encrypt_page(html, password)
        out.write_text(encrypted_page, encoding='utf-8')

        original_size = len(html)
        encrypted_size = len(encrypted_page)
        print(f"  ✓ {filename}: {original_size:,} → {encrypted_size:,} bytes (password: {password})")

    print("✅ Done. Encrypted pages are ready to push.")


if __name__ == "__main__":
    main()
