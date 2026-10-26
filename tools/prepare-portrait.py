#!/usr/bin/env python3
"""Optimize the supplied completed studio portrait for the homepage.

The input is the provided 'Professional Portrait on Green Gradient.png'
from Downloads. Only the surrounding pale margin is cropped; the subject,
green background, and facial features are kept unchanged. The source PNG
remains untouched, and the optimized WebP is included with the website.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / 'Downloads' / 'Professional Portrait on Green Gradient.png'
OUT = ROOT / 'assets' / 'media' / 'ayush-professional-portrait.webp'

with Image.open(SOURCE) as original:
    rgb = original.convert('RGB')
    if rgb.size != (1278, 1230):
        raise ValueError(f'Unexpected portrait dimensions: {rgb.size}')
    # Remove only the pale outer page border from the supplied artwork.
    photo = rgb.crop((36, 40, 1242, 1203))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    photo.save(OUT, 'WEBP', quality=92, method=6)
print(f'Prepared supplied studio portrait: {OUT} ({OUT.stat().st_size / 1024:.1f} KiB)')
