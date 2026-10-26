#!/usr/bin/env python3
"""Prepare authentic, web-sized media from the golf-cart files in Downloads.

This script never alters the source recordings or benchmarking slide deck.
It exports full-length browser-friendly MP4 videos, three video stills, and
selected slide images with explanatory captions supplied by the website.
"""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/media"
IN = Path.home() / "Downloads"
OUT.mkdir(parents=True, exist_ok=True)

def run(*args):
    print("$", " ".join(map(str, args)), flush=True)
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL)

videos = [
    ("VID-20260323-WA0031.mp4", "golfcart-early-drive.mp4", "golfcart-early-poster.jpg", 22, 25, 854),
    ("Golf_Cart_Demo.mp4", "golfcart-latest-demo.mp4", "golfcart-latest-poster.jpg", 54, 24, 1280),
    ("WhatsApp Video 2026-10-23 at 7.34.33 PM.mp4", "golfcart-zenoh-bridge.mp4", "golfcart-zenoh-poster.jpg", 5, 24, 1280),
]
for source, dest, poster, second, fps, max_width in videos:
    source_path = IN / source
    if not source_path.exists():
        raise SystemExit(f"Missing original media: {source_path}")
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", source_path,
        "-vf", f"fps={fps},scale='min({max_width},iw)':-2:flags=lanczos",
        "-an", "-c:v", "libx264", "-preset", "faster", "-crf", "29",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT / dest)
    run("ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", str(second),
        "-i", source_path, "-frames:v", "1", "-vf", "scale='min(1500,iw)':-2",
        "-q:v", "3", OUT / poster)

# Render slide images directly; do not invent data or new architecture.
deck = IN / "Localisation Benchmarking.pptx"
pdfdir = ROOT / ".golfcart-prep"
pdfdir.mkdir(exist_ok=True)
run("libreoffice", "-env:UserInstallation=file:///tmp/portfolio_golfcart_slides",
    "--headless", "--convert-to", "pdf", "--outdir", pdfdir, deck)
pdf = pdfdir / "Localisation Benchmarking.pdf"
for slide, name in [
    (3, "golfcart-benchmark-map"),
    (9, "golfcart-benchmark-clean"),
    (14, "golfcart-benchmark-rain"),
    (15, "golfcart-benchmark-fog"),
    (17, "golfcart-benchmark-analysis"),
    (22, "golfcart-fusion-architecture"),
]:
    run("pdftoppm", "-f", str(slide), "-l", str(slide), "-singlefile",
        "-scale-to", "1650", "-jpeg", "-jpegopt", "quality=86,optimize=y",
        pdf, OUT / name)
print("Created golf-cart media:", flush=True)
for path in sorted(OUT.glob("golfcart-*")):
    print(" ", path.name, f"{path.stat().st_size/1024/1024:.2f} MB")
