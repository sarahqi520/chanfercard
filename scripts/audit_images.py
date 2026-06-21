"""
FINAL INTEGRATION: Map each of the 16 machines to its BEST available image.
Update data.ts image paths to match actual files.
"""
from PIL import Image
import os

MACHINES = r"C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site\public\images\machines"

print("=== All available machine images ===")
files = {}
for f in sorted(os.listdir(MACHINES)):
    p = os.path.join(MACHINES, f)
    img = Image.open(p)
    files[f] = img.size
    print(f"  {f}: {img.size[0]}x{img.size[1]}")

# 16 machines in data.ts and their best image mapping:
# Goal: assign each machine ID to the best matching image file

mapping = {
    # Feeding machines
    "fkj-100sl":        ("fkj-100sl.png",       2268, 2268),      # ✅ Perfect
    "fkj-200e":         ("fkj-200e.png",        2268, 2268),      # ✅ Perfect
    "fkj-300e":         ("fkj-300e.png",        2268, 2268),      # ✅ Perfect
    "fkj-420e":         ("fkj-420e.png",        950,  880),       # ✅ Good
    "three-head-suction": ("three-head-suction.png", 950, 880),   # ✅ Good
    "four-head-suction":  ("four-head-suction.png", 950, 880),     # ✅ Good
    
    # Matching & Packaging
    "card-dispensing-matching": ("card-dispensing-matching.png", 950, 880),  # ✅ Good
    "zs-220x":          ("zs-220x.png",         2268, 2268),      # ✅ Perfect
    "sbf-250":          ("sbf-250.png",         1100, 700),       # ✅ OK
    "qdzd-2130":        ("qdzd-2130.png",       1100, 700),       # ✅ OK
    
    # Boxing & Sealing (these are the tricky ones)
    "pof-shrink":       ("pof-shrink.png",      1200, 880),       # ✅ Good (from previous extraction)
    "cartoning":        ("cartoning.png",       2280,  670),      # ✅ OK (wide shot)
    "carton-forming":   ("carton-forming.png",  2360,  670),      # ✅ OK (wide shot)
    
    # The problematic ones - use best available extraction
    "h-type-sealer":    ("h-type-sealer.jpg",   400,  380),       # ⚠️ New crop (shows actual machine)
    "palletizing-robot":("palletizing-robot.jpg",510,  510),       # ✅ New crop (good!)
    "ai-visual":        ("ai-visual.jpg",      485,  285),       # ❌ Tiny - need fix
}

print("\n=== Recommended data.ts mappings ===")
for mid, (fname, w, h) in mapping.items():
    status = "✅" if min(w, h) >= 400 else "⚠️" if min(w, h) >= 200 else "❌"
    print(f"  {status} {mid}: /images/machines/{fname} ({w}x{h})")
