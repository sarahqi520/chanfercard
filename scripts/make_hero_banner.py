#!/usr/bin/env python3
"""Render brochure PDF page 1 at high resolution and extract the SMART CARD PACKAGING LINE diagram."""
import pypdfium2 as pdfium
from PIL import Image
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
PUBLIC_IMAGES = os.path.join(PROJECT_ROOT, 'public', 'images')

# Try to find the brochure PDF in IMA knowledge base or local files
# For now, re-render paper-brochure-page-1.png at higher quality
src = os.path.join(PUBLIC_IMAGES, 'paper-brochure-page-1.png')
if not os.path.exists(src):
    print(f"Source not found: {src}")
    exit(1)

img = Image.open(src)
print(f"Source: {src}")
print(f"Size: {img.size}, Mode: {img.mode}")

# The SMART CARD PACKAGING LINE diagram is the full-width 3D isometric line art
# Crop the full diagram area (the entire page is essentially the banner image)
# Save as hero-banner.png for the homepage
out = os.path.join(PUBLIC_IMAGES, 'hero-banner.png')
img.save(out, 'PNG')
print(f"Saved full page as hero-banner.png ({img.size[0]}x{img.size[1]})")

# Also create a darker version for text overlay
from PIL import ImageEnhance
enhancer = ImageEnhance.Brightness(img)
dark_img = enhancer.enhance(0.65)
dark_out = os.path.join(PUBLIC_IMAGES, 'hero-banner-dark.png')
dark_img.save(dark_out, 'PNG')
print(f"Saved darkened version as hero-banner-dark.png")
