import base64, os
os.makedirs('/Users/doclaundal/okalamstudio/imgs', exist_ok=True)

# ltot_menu.jpg (Little ToT menu screen)
menu_b64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAbKAyADASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwQFBgcI"

with open('/tmp/ltot_menu_b64.txt', 'w') as f:
    f.write(menu_b64)

print("script written")
