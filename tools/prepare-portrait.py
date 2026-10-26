#!/usr/bin/env python3
"""Prepare the user-provided portrait for the portfolio hero.

Keeps the face and clothing as photographed. Removes the cafe background,
softens cutout edges, slightly adjusts image tonality, and fades the lower
portion so the original table/foreground do not compete with the portrait.

The original photograph in Downloads is never modified.
"""

from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SOURCE = Path.home() / "Downloads" / "WhatsApp Image 2026-10-25 at 8.57.53 AM.jpeg"
OUT = Path(__file__).resolve().parents[1] / "assets" / "media" / "ayush-portrait-cutout.webp"

original = ImageOps.exif_transpose(Image.open(SOURCE)).convert("RGB")
rgb = np.asarray(original)
height, width = rgb.shape[:2]
if (width, height) != (900, 1600):
    raise ValueError(f"Unexpected photo dimensions: {(width, height)}")

# A mask initialized around the head and shoulders, with the dining area
# explicitly marked as background. These points apply only to this portrait.
mask = np.full((height, width), cv2.GC_BGD, dtype=np.uint8)
outline = np.array([
    (344, 297), (413, 288), (495, 299), (529, 335),
    (537, 459), (523, 515), (594, 519), (678, 549),
    (745, 719), (763, 798), (653, 813), (565, 768),
    (319, 765), (232, 817), (105, 813), (118, 749),
    (157, 636), (218, 544), (321, 516), (330, 451),
], dtype=np.int32)
cv2.fillPoly(mask, [outline], cv2.GC_PR_FGD)
cv2.ellipse(mask, (435, 437), (75, 118), 0, 0, 360, cv2.GC_FGD, -1)
cv2.ellipse(mask, (435, 655), (182, 70), 0, 0, 360, cv2.GC_FGD, -1)

cv2.grabCut(
    cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR),
    mask, None,
    np.zeros((1, 65), np.float64),
    np.zeros((1, 65), np.float64),
    6, cv2.GC_INIT_WITH_MASK,
)
alpha = np.where(
    (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0
).astype(np.uint8)
alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))

# Retain face/hair detail while tapering away flowers/glasses/table at bottom.
top, bottom, left, right = 275, 815, 105, 767
fade_start, fade_end = 655, 782
for y in range(fade_start, bottom):
    multiplier = max(0., (fade_end - y) / (fade_end - fade_start))
    alpha[y, :] = (alpha[y, :].astype(np.float32) * multiplier).astype(np.uint8)
alpha = np.asarray(
    Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.25))
)

picture = Image.fromarray(rgb).convert("RGBA")
picture.putalpha(Image.fromarray(alpha))
picture = picture.crop((left, top, right, bottom))

# Very gentle grading; no facial feature reshaping or synthetic additions.
subject_rgb = ImageEnhance.Color(picture.convert("RGB")).enhance(.94)
subject_rgb = ImageEnhance.Contrast(subject_rgb).enhance(1.035)
picture = subject_rgb.convert("RGBA")
picture.putalpha(Image.fromarray(alpha).crop((left, top, right, bottom)))
picture = picture.resize((920, 750), Image.Resampling.LANCZOS)

OUT.parent.mkdir(parents=True, exist_ok=True)
picture.save(OUT, "WEBP", quality=88, method=6)
print(f"Prepared portrait: {OUT} ({OUT.stat().st_size / 1024:.1f} KiB)")
