"""
Page1 FINAL: From diagram_lower.png (1998x1197) - visually confirmed positions.
"""
from PIL import Image
import os

MACHINES = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images\machines"
REF = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\scripts\reference"

def save(img, filename):
    path = os.path.join(MACHINES, filename)
    img.convert("RGB").save(path, "JPEG", quality=95, optimize=True)
    print(f"  {filename}: {img.size} OK")


lower = Image.open(os.path.join(REF, "diagram_lower.png"))  # 1998 x 1197
W, H = lower.size

print(f"Source: {W}x{H}")
print("=== FINAL Page1 Machines ===")

# Visually confirmed in diagram_lower (1998x1197):
# 
# [H-Shaped Sealer - white machine] ---- [conveyor] ---- [shrink wrapper]
#        (x:200-580, y:230-590)                          (upper right)
#                    |
#              [robot arm + pallets]
#              (x:460-950, y:430-920)
#
# [unboxing machine label+machine at right]

# 1. H-Shaped Carton Sealer (white H-frame machine with red conveyors, left side)
save(lower.crop((190, 220, 590, 600)), "h-type-sealer.jpg")

# 2. Palletizing Robot (robot arm + boxes on pallets + controller, bottom-center)
save(lower.crop((450, 420, 960, 930)), "palletizing-robot.jpg")

# 3. Carton boxer / unboxing machine (right side of line)
save(lower.crop((1000, 200, 1750, 500)), "carton-boxer.jpg")

# 4. Case packer / carton forming (near shrink wrapper area, upper right of center)
save(lower.crop((800, 180, 1400, 450)), "case-packer.jpg")

print("\nDone! Check images visually.")
