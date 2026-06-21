"""
FINAL v2: Extract from COLUMN REFERENCE images (each ~1440px wide).
This gives us precise control over crop regions.
"""
from PIL import Image
import os

REF = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\scripts\reference"
MACHINES = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images\machines"

def save(img, filename):
    path = os.path.join(MACHINES, filename)
    if filename.endswith('.png'):
        img.save(path, "PNG")
    else:
        img.convert("RGB").save(path, "JPEG", quality=95, optimize=True)
    print(f"  {filename}: {img.size} OK")


# Load column reference images from page2
col1 = Image.open(os.path.join(REF, "col_1_x1439-2878.png"))   # x:1440-2880  AUTOMATIC CARD FEEDER
col2 = Image.open(os.path.join(REF, "col_2_x2878-4317.png"))   # x:2880-4320  BINDING+SUCTION+BAGGING
col3 = Image.open(os.path.join(REF, "col_3_x4317-5756.png"))   # x:4320-5760  SHRINK+UNBOXING
col4 = Image.open(os.path.join(REF, "col_4_x5756-7195.png"))   # x:5760-7195  (remaining)

print(f"Col sizes: {col1.size}, {col2.size}, {col3.size}")
print("=== Machine Photos ===")

# === COL 1 (AUTOMATIC CARD FEEDER, 1439x2475) ===
# From visual analysis of col1 reference:
# - Top section (~y:0-825): Title "AUTOMATIC CARD FEEDER" right side,
#   card sample grid center, **FKJ machine at BOTTOM-RIGHT**
# - The FKJ green/white friction feeder is in bottom-right corner of upper area
save(col1.crop((560, 380, 1439, 825)), "friction-feeder.jpg")

# Parameters table area has FKJ-J62B and FKJ-J600 product photos
# Table is in lower portion, two columns with small machine images
save(col1.crop((70, 1480, 290, 1600)), "auto-feeder.jpg")       # FKJ variant left photo
save(col1.crop((310, 1480, 560, 1600)), "nylon-packager.jpg")   # FKJ variant right photo


# === COL 2 (BINDING + SUCTION + BAGGING, 1439x2475) ===
# From visual analysis:
# - Top: binding machine photo (left), QR code (right), title
# - Mid-upper: CARD SUCTION MATCHING LINE with green suction machines (center)
# - Bottom-right: FULLY AUTOMATIC BAGGING MACHINE with bagging machine photo

# Binding/banding machine (upper-left area of this column)
save(col2.crop((0, 80, 700, 420)), "binding-machine.jpg")

# Card suction matching system (green suction machines, mid-area)
# This overlaps with the next column's content slightly
save(col2.crop((340, 180, 1100, 480)), "suction-matcher.jpg")

# Bagging machine (bottom-right area - but note this might be in col4 area actually)
# From the col2 image, bagging machine was visible in lower-right


# === COL 3 (SHRINK WRAPPER + UNBOXING, 1439x2475) ===
# - Top: FULLY AUTOMATIC SEALING AND CUTTING SHRINK WRAPPER (wide machine photo)
# - Bottom: AUTOMATIC UNBOXING AND SEALING LINE (machine + flow)

# POF shrink wrapper / sealing cutting shrink wrapper (top full-width area)
save(col3.crop((0, 120, 1439, 420)), "shrink-wrapper.jpg")

# Unboxing/sealing line machine (bottom area)
save(col3.crop((0, 1050, 1200, 1450)), "unboxing-sealer.jpg")


# === For page1 machines (h-type-sealer, palletizing-robot etc.) ===
# Let me generate proper page1 reference first
page1 = Image.open(r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images\paper-brochure-page-1.png")
W1, H1 = page1.size

# Page 1 right half (Paper Printing Industry Packaging Solution diagram)
p1_right = page1.crop((W1//2, 0, W1, H1))
p1_right.save(os.path.join(REF, "page1_right.png"))

# Split into upper/lower for detailed analysis
rw, rh = p1_right.size
p1_ru = p1_right.crop((0, 0, rw, rh//2))
p1_rl = p1_right.crop((0, rh//2, rw, rh))
p1_ru.save(os.path.join(REF, "page1_right_upper.png"))
p1_rl.save(os.path.join(REF, "page1_right_lower.png"))

print(f"\nPage1 right: {p1_right.size}")

# Now crop machines from page1 RIGHT HALF
# The diagram shows (from left to right): sealer/shrink wrapper → H-type sealer → palletizing robot → unboxing

# H-Type Carton Sealer (middle-right of the diagram area)
save(p1_right.crop((800, 200, 2000, 750)), "h-type-sealer.jpg")

# Collaborative Palletizing Robot (far right of diagram)
save(p1_right.crop((2100, 280, 3600, 720)), "palletizing-robot.jpg")

# Carton boxer / case packer (bottom area of diagram)
save(p1_right.crop((1400, 650, 2600, 900)), "carton-boxer.jpg")
save(p1_right.crop((300, 680, 1400, 900)), "case-packer.jpg")


# Bagging machine from col4 (rightmost column of page2)
if os.path.exists(os.path.join(REF, "col_4_x5756-7195.png")):
    col4 = Image.open(os.path.join(REF, "col_4_x5756-7195.png"))
    save(col4.crop((50, 1120, 1380, 1500)), "bagging-machine.jpg")

print("\nDone!")
