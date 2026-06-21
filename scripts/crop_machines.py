"""Crop machine product photos from paper-brochure-page-2.png for the machines catalog.

Page 2 layout (7195 x 2475 px) — 6 columns of machine product info:
  Col 1 (0-1198):   Smart Cards Packaging Line — full line overview
  Col 2 (1198-2397): Automatic Card Feeder — single machine photo
  Col 3 (2397-3596): Auto Card Feeding Binding Line
  Col 4 (3596-4795): Card Suction Matching Line
  Col 5 (4795-5994): Sealing & Cutting Shrink Wrapper
  Col 6 (5994-7195): Bagging Machine / Unboxing & Sealing Line

Plus page 1 has: Friction feeder, matching system, nylon packer,
                  crayon counter, membrane machine, shrink wrapper,
                  carton sealer, palletizing system, unboxer.
"""

from PIL import Image
import os

BASE = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site"
SRC_PAGE2 = os.path.join(BASE, "public", "images", "paper-brochure-page-2.png")
SRC_PAGE1 = os.path.join(BASE, "public", "images", "paper-brochure-page-1.png")
OUT_DIR = os.path.join(BASE, "public", "images", "machines")

os.makedirs(OUT_DIR, exist_ok=True)

# ── Page 2 crops ──────────────────────────────────────────────
img2 = Image.open(SRC_PAGE2)
W2, H2 = img2.size  # 7195 x 2475

page2_crops = {
    # (left, top, right, bottom) -> filename
    # Column 2: Automatic Card Feeder — machine photo is upper area of col 2
    "auto-feeder.jpg":            (1220, 80,  1990, 520),
    # Column 3: Binding line — machine area upper portion
    "binding-machine.jpg":        (2420, 100, 3540, 500),
    # Column 4: Card Suction Matching — machines shown side by side
    "suction-matcher.jpg":       (3620, 90,  4760, 450),
    # Column 5: Shrink wrapper — machine photo upper area
    "shrink-wrapper.jpg":        (4820, 70,  5940, 430),
    # Column 6a: Bagging Machine — upper section of col 6
    "bagging-machine.jpg":       (6020, 550, 7100, 950),
    # Column 6b: Unboxing & Sealing — lower section of col 6
    "unboxing-sealer.jpg":       (6020, 1050, 7150, 1550),
}

print(f"Page 2 size: {W2}x{H2}")
for fname, box in page2_crops.items():
    crop = img2.crop(box)
    path = os.path.join(OUT_DIR, fname)
    crop.save(path, quality=92)
    print(f"  Saved {fname} ({crop.size[0]}x{crop.size[1]})")

# ── Page 1 crops — Paper Printing Industry Packaging Solution ──
img1 = Image.open(SRC_PAGE1)
W1, H1 = img1.size
print(f"\nPage 1 size: {W1}x{H1}")

# Page 1 right side shows individual machines in the paper-printing solution area
page1_crops = {
    # Right half of page 1 has the "Paper Printing Industry" section
    # These are smaller machine thumbnails arranged vertically
    "friction-feeder.jpg":       (3950, 180, 4680, 420),
    "nylon-packager.jpg":        (3820, 420, 4580, 640),
    "h-type-sealer.jpg":         (3680, 600, 4480, 800),
    "palletizing-robot.jpg":     (4420, 650, 5280, 920),
}

for fname, box in page1_crops.items():
    crop = img1.crop(box)
    path = os.path.join(OUT_DIR, fname)
    crop.save(path, quality=92)
    print(f"  Saved {fname} ({crop.size[0]}x{crop.size[1]})")

# ── Also generate placeholder images for machines we couldn't extract ──
# Use the existing card-packaging pages for remaining machines
img_cp1 = Image.open(os.path.join(BASE, "public", "images", "card-packaging-page-1.png"))
img_cp2 = Image.open(os.path.join(BASE, "public", "images", "card-packaging-page-2.png"))
print(f"\nCard-packaging p1 size: {img_cp1.size}, p2 size: {img_cp2.size}")

extra_crops = {
    # From card-packaging page 2 — production line segments that show specific machines
    "carton-boxer.jpg":          (52, 280,  530, 560),      # leftmost line segment
    "case-packer.jpg":           (268, 300, 745, 580),      # second line segment
    "ai-visual.jpg":             (755, 55, 1240, 340),      # green machine in middle-top area of p2
}

for fname, box in extra_crops.items():
    if fname == "ai-visual.jpg":
        crop = img_cp2.crop(box)
    else:
        crop = img_cp2.crop(box)
    path = os.path.join(OUT_DIR, fname)
    crop.save(path, quality=92)
    print(f"  Saved {fname} ({crop.size[0]}x{crop.size[1]})")

# ── Summary ──
print(f"\nAll images saved to: {OUT_DIR}")
files = os.listdir(OUT_DIR)
print(f"Total files: {len(files)}")
for f in sorted(files):
    fp = os.path.join(OUT_DIR, f)
    sz = os.path.getsize(fp)
    print(f"  {f}  ({sz//1024}KB)")
