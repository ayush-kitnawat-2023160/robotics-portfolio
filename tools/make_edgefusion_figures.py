#!/usr/bin/env python3
"""Recreate readable, scalable EdgeFusion diagrams from the 2025 IP report.

Sources:
  Ayush Kitnawat & Suyash Pathak, EdgeFusion Multi-Camera Tracking System,
  IIIT Delhi Independent Project Report (Monsoon 2025).
  Benchmarks: pp. 3–4. System description and schematic: pp. 1–2 and 5–6.

These are redrawn explanatory SVGs, not photographs or new experimental runs.
"""
from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "media"
OUT.mkdir(parents=True, exist_ok=True)

def text(x, y, value, size=16, color="#263e31", weight=500, extra=""):
    return f'<text x="{x}" y="{y}" font-family="Arial, Helvetica, sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}" {extra}>{escape(str(value))}</text>'

def rect(x, y, w, h, fill, stroke="none", radius=10, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}" {extra}/>'

# -------------------------------------------------------------------
# Diagram: The report calls 3 cameras + 1 Jetson a sensing unit (p. 5).
# The *example illustration in the report* depicts 4 per unit; this
# redraw intentionally follows the written unit definition.
# -------------------------------------------------------------------
s = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Recreated EdgeFusion architecture: camera groups attached to Jetson Orin Nanos, Wi-Fi router and central DeepSORT server">',
     '<defs><pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#2b4f40" stroke-width=".6" opacity=".4"/></pattern><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L7 4L0 8Z" fill="#a7d18a"/></marker></defs>',
     rect(0,0,1200,630,"#112b23",radius=0),
     '<rect width="1200" height="630" fill="url(#grid)"/>',
     text(45,60,"EDGEFUSION / SYSTEM DESIGN",25,"#f0f6ec",700),
     text(45,88,"DISTRIBUTED OBJECT DETECTION + CENTRAL TRACKING",13,"#94c78f",700),
     text(45,124,"RECREATED FROM THE 2025 INDEPENDENT PROJECT REPORT · DESIGN OVERVIEW",12,"#8aa59a",500)]

def camera(x,y,tag):
    return [
        rect(x,y,72,49,"#234638","#49715d",7),
        rect(x+10,y+12,49,22,"#143026","#a2d68b",4),
        f'<circle cx="{x+35}" cy="{y+23}" r="8" fill="#a9d18e"/>',
        f'<circle cx="{x+35}" cy="{y+23}" r="4" fill="#355747"/>',
        text(x+36,y+69,tag,10,"#aac5b4",500,'text-anchor="middle"')
    ]

def unit(x,y,ident):
    out=[rect(x,y,432,163,"#193c30","#3d6954",15),
         text(x+18,y+27,f"SENSING UNIT {ident}",13,"#b3dbab",700),
         text(x+18,y+46,"3 × FLIR Firefly USB3 cameras",11,"#aac5b4",500)]
    for i in range(3):
        cx=x+20+i*89;cy=y+64
        out.extend(camera(cx,cy,str(i+1)))
        out.append(f'<path d="M{cx+72} {cy+23}H{x+300}" stroke="#83ab78" stroke-width="1.1" opacity=".65"/>')
    out.extend([rect(x+308,y+59,108,86,"#285241","#87b991",8),
                text(x+362,y+80,"JETSON",13,"#eaf8e7",700,'text-anchor="middle"'),
                text(x+362,y+97,"ORIN NANO",10,"#dbf0db",700,'text-anchor="middle"'),
                text(x+362,y+116,"YOLO11n",11,"#badfa8",500,'text-anchor="middle"'),
                text(x+362,y+132,"TensorRT",10,"#badfa8",500,'text-anchor="middle"')])
    return out
s.extend(unit(35,155,"A"));s.extend(unit(35,339,"B"))
s.extend([
    '<path d="M467 239H517V330H559" stroke="#addc96" stroke-width="3" fill="none" marker-end="url(#arrow)"/>',
    '<path d="M467 423H517V330" stroke="#addc96" stroke-width="3" fill="none"/>',
    rect(559,248,196,163,"#234a39","#82b77c",14),
    text(657,278,"NETWORK",12,"#c1ddb2",700,'text-anchor="middle"'),
    text(657,313,"Wi-Fi 7",22,"#f4f9ed",700,'text-anchor="middle"'),
    text(657,337,"Router / BE6500",12,"#b4d0bb",500,'text-anchor="middle"'),
    text(657,374,"ZeroMQ PUSH",14,"#ceecba",700,'text-anchor="middle"'),
    '<path d="M755 330H824" stroke="#addc96" stroke-width="3" fill="none" marker-end="url(#arrow)"/>',
    rect(824,222,341,214,"#234a39","#82b77c",14),
    text(995,262,"CENTRAL TRACKING PC",16,"#e8f6e2",700,'text-anchor="middle"'),
    rect(864,286,261,94,"#122e25","#628c69",8),
    text(995,314,"RECEIVE & DECODE",13,"#b6deb0",700,'text-anchor="middle"'),
    text(995,339,"DeepSORT / identity association",14,"#eff5e9",600,'text-anchor="middle"'),
    text(995,363,"Across camera observations",11,"#a9c3b3",500,'text-anchor="middle"'),
    text(44,570,"EDGE: Spinnaker/PySpin → YOLO → boxes, classes, confidence + Base64 images",14,"#d1e8c7",500),
    text(44,594,"SERVER: JSON packets received from each distributed sensing unit",13,"#94b99f",500),
    '</svg>'
])
(OUT / "edgefusion-ip-architecture.svg").write_text("\n".join(s), encoding="utf-8")

# -------------------------------------------------------------------
# Charts: average per-camera FPS. The original tables report a separate
# FPS number for each stream; averaging within a run is for visualization.
# -------------------------------------------------------------------
measurements = {
    ("YOLO11n","640 × 640"): {
        "FP16":[[18.92],[16.62,16.46],[12.70,12.79,12.80],[11.79,11.26,10.83,10.84]],
        "INT8":[[20.39],[17.62,17.44],[15.72,15.76,14.53],[14.29,12.10,11.69,11.62]],
    },
    ("YOLO11n","1440 × 1080"): {
        "FP16":[[11.83],[9.28,9.31],[8.98,8.85,8.87],[7.37,7.81,7.34,6.36]],
        "INT8":[[12.55],[11.37,11.34],[9.62,9.58,9.64],[8.39,8.37,8.34,8.54]],
    },
    ("YOLOv8n","640 × 640"): {
        "FP16":[[18.92],[16.04,16.05],[12.53,12.59,12.60],[11.38,11.20,10.48,10.61]],
        "INT8":[[20.42],[16.67,16.61],[14.47,14.55,14.64],[12.87,12.23,11.98,11.95]],
    },
    ("YOLOv8n","1440 × 1080"): {
        "FP16":[[13.31],[10.39,10.39],[8.99,9.00,9.01],[7.90,7.72,7.58,7.66]],
        "INT8":[[13.72],[12.40,12.41],[11.66,11.24,11.04],[9.62,9.60,9.56,9.45]],
    },
}
chart=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="810" viewBox="0 0 1200 810" role="img" aria-label="EdgeFusion Jetson benchmark comparison. Four line charts show average per-camera FPS versus camera count for YOLO11n and YOLOv8n, at 640 by 640 and 1440 by 1080 input, each with FP16 and INT8 variants.">',
       rect(0,0,1200,810,"#f7faf5",radius=0),
       text(52,58,"JETSON THROUGHPUT / CAMERA SCALING",27,"#1d3b2d",700),
       text(52,86,"Per-camera mean FPS (averaged across the simultaneous streams in each test)",14,"#658070",500),
       rect(850,40,16,8,"#457e6a",radius=0),text(876,49,"INT8",13,"#294b3c",700),
       rect(960,40,16,8,"#c2974d",radius=0),text(986,49,"FP16",13,"#294b3c",700)]
colors={"FP16":"#c2974d","INT8":"#457e6a"}
for i,((model,resolution), precisions) in enumerate(measurements.items()):
    xx=50 + (i%2)*567; yy=120+(i//2)*324
    chart.append(rect(xx,yy,537,303,"#ffffff","#dce9dc",10))
    chart.append(text(xx+25,yy+40,f"{model} · {resolution}",18,"#2a4934",700))
    chart.append(text(xx+25,yy+60,"FPS PER CAMERA",10,"#7c9988",600))
    plotx=xx+56;ploty=yy+84;plotw=425;ploth=166
    for mark in [0,5,10,15,20]:
        y=ploty+ploth-ploth*mark/24
        chart.append(f'<line x1="{plotx}" y1="{y:.1f}" x2="{plotx+plotw}" y2="{y:.1f}" stroke="#e6eee5" stroke-width="1"/>')
        chart.append(text(plotx-12, y+5, mark, 11, "#7e9686",500, 'text-anchor="end"'))
    for n in range(1,5):
        x=plotx+plotw*(n-1)/3
        chart.append(text(round(x,1),ploty+ploth+25,n,12,"#526c5b",600,'text-anchor="middle"'))
    for name in ["FP16","INT8"]:
        avg=[sum(row)/len(row) for row in precisions[name]]
        points=[(plotx+plotw*j/3,ploty+ploth-v*ploth/24) for j,v in enumerate(avg)]
        chart.append('<polyline fill="none" stroke="'+colors[name]+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="'+' '.join(f"{x:.1f},{y:.1f}" for x,y in points)+'"/>')
        for x,y in points:
            chart.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.2" fill="{colors[name]}" stroke="#fff" stroke-width="2"/>')
        chart.append(text(points[-1][0]+12,points[-1][1]+5,f"{avg[-1]:.2f}",12,colors[name],700))
    chart.append(text(plotx+plotw/2,yy+289,"SIMULTANEOUS CAMERA STREAMS",11,"#7b9885",600,'text-anchor="middle"'))
chart.extend([
    rect(50,780,1100,2,"#b6d2bd",radius=0),
    text(52,801,"SOURCE: 2025 IP REPORT, PP. 3–4  ·  TESTED 1–4 CAMERAS, NOT COMBINED THROUGHPUT",11,"#5e8069",600),
    '</svg>'
])
(OUT / "edgefusion-ip-benchmarks.svg").write_text("\n".join(chart), encoding="utf-8")
print("Created SVG diagrams",[(p.name,p.stat().st_size) for p in OUT.glob('edgefusion-ip-*.svg')])
