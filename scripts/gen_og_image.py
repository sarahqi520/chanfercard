from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#0f172a")
draw = ImageDraw.Draw(img)

# Gradient background (draw line by line)
for y in range(H):
    r = int(15 + (26 - 15) * y / H)
    g = int(23 + (41 - 23) * y / H)
    b = int(42 + (67 - 42) * y / H)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Accent green bar on left
draw.rectangle([0, 0, 8, H], fill="#22c55e")

# Try to load real fonts
try:
    font_large = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 72)
    font_mid   = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 36)
    font_small  = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 24)
    font_available = True
except Exception:
    font_large = ImageFont.load_default()
    font_mid   = font_large
    font_small  = font_large
    font_available = False

# CHANFER title (green)
title_w = draw.textlength("CHANFER", font=font_large) if font_available else 300
draw.text((80, 180), "CHANFER", fill="#22c55e", font=font_large)

# Tagline (light text)
draw.text((82, 270), "Card Packaging Automation Solutions", fill="#e2e8f0", font=font_mid)

# Sub-tagline
draw.text((82, 320), "Game Cards  Trading Cards  Board Games", fill="#94a3b8", font=font_small)

# URL at bottom
draw.text((82, 540), "www.gzchanfer.com", fill="#22c55e", font=font_small)

out = "C:/Users/Sarah/WorkBuddy/2026-06-11-17-27-29/cfpack-site/public/images/og/og-image.jpg"
img.save(out, "JPEG", quality=92)
print(f"Saved: {out}")
