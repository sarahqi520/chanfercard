"""
Create row-based reference crops for page1 to understand its layout.
"""
from PIL import Image
import os

IMAGES = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images"
page1 = Image.open(os.path.join(IMAGES, "paper-brochure-page-1.png"))
W, H = page1.size

out = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\scripts\reference"
os.makedirs(out, exist_ok=True)

# Page 1 appears to have:
# Left half (~0-3600): Smart Cards Packaging Line + Introduction
# Right half (~3600-7195): Paper Printing Industry Packaging Solution diagram

# Split into left/right halves
left = page1.crop((0, 0, W//2, H))
right = page1.crop((W//2, 0, W, H))
left.save(os.path.join(out, "page1_left_half.png"))
right.save(os.path.join(out, "page1_right_half.png"))
print(f"Left: {left.size}, Right: {right.size}")

# Also split right half into upper/lower
right_upper = page1.crop((W//2, 0, W, H//2))
right_lower = page1.crop((W//2, H//2, W, H))
right_upper.save(os.path.join(out, "page1_right_upper.png"))
right_lower.save(os.path.join(out, "page1_right_lower.png"))

# Grid of 4x4 on right half for precise location
gw, gh = W // 4, H // 4
for r in range(4):
    for c in range(2, 4):  # only right half columns
        c_img = page1.crop((c * gw, r * gh, (c+1) * gw, (r+1) * gh))
        c_img.save(os.path.join(out, f"p1_grid_{c}_{r}.png"))

print("Grid saved")
