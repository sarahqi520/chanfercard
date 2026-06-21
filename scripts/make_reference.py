"""
Create grid reference crops from paper-brochure-page-2.png
to identify exact positions of each machine product photo.
"""
from PIL import Image
import os

IMAGES = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images"
page2 = Image.open(os.path.join(IMAGES, "paper-brochure-page-2.png"))
W, H = page2.size  # 7195 x 2475

out = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\scripts\reference"

# Create column-wise reference crops (each column is ~1440px wide)
# Also create row-wise crops to see vertical layout
col_w = W // 5  # 1439

print(f"Page size: {W}x{H}, col width: {col_w}")

for i in range(5):
    x0 = i * col_w
    x1 = (i + 1) * col_w if i < 4 else W
    c = page2.crop((x0, 0, x1, H))
    path = os.path.join(out, f"col_{i}_x{x0}-{x1}.png")
    os.makedirs(out, exist_ok=True)
    c.save(path)
    print(f"  Col {i} ({x0}-{x1}): {c.size}")

# Also crop upper half and lower half of key columns
# Column 1 (FKJ feeder) - split into top/middle/bottom
c = page2.crop((1440, 0, 2880, H//3))
c.save(os.path.join(out, "col1_top.png"))
c = page2.crop((1440, H//3, 2880, 2*H//3))
c.save(os.path.join(out, "col1_mid.png"))
c = page2.crop((1440, 2*H//3, 2880, H))
c.save(os.path.join(out, "col1_bot.png"))

print("\nReference images saved to scripts/reference/")
