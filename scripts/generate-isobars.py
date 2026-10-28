"""Generate the synthetic isobar map used as a CSS mask in the hero.

Usage: python scripts/generate-isobars.py public/images/hero-isobars.svg  (needs numpy + matplotlib)
"""
import sys
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

W, H = 1600, 760
out = sys.argv[1]

x = np.linspace(0, W, 400)
y = np.linspace(0, H, 190)
X, Y = np.meshgrid(x, y)

def blob(cx, cy, sx, sy, amp):
    return amp * np.exp(-(((X - cx) / sx) ** 2 + ((Y - cy) / sy) ** 2))

# Pressure field (hPa): gentle N-S gradient + highs and lows
P = 1013 + 6 * (Y / H) - 3 * (X / W)
P += blob(1180, 260, 260, 190, 16)   # high
P += blob(300, 560, 300, 210, 10)    # high
P += blob(760, 120, 220, 160, -18)   # low
P += blob(1480, 700, 200, 170, -12)  # low
P += blob(120, 80, 180, 140, -8)     # low
P += 1.6 * np.sin(X / 170) * np.cos(Y / 140)

levels = np.arange(np.floor(P.min()), np.ceil(P.max()) + 2, 2)
cs = plt.contour(X, Y, P, levels=levels)

paths = []
for lvl, segs in zip(cs.levels, cs.allsegs):
    major = int(round(lvl)) % 8 == 0
    for seg in segs:
        if len(seg) < 4:
            continue
        seg = seg[:: max(1, len(seg) // 120)] if len(seg) > 240 else seg
        d = "M" + "L".join(f"{px:.1f} {py:.1f}" for px, py in seg)
        paths.append(f'<path d="{d}" stroke-width="{1.6 if major else 0.9}"/>')

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" '
    f'preserveAspectRatio="xMidYMid slice">'
    f'<g fill="none" stroke="#000" stroke-linejoin="round" stroke-linecap="round">'
    + "".join(paths)
    + "</g></svg>"
)
open(out, "w", encoding="utf-8").write(svg)
print(len(paths), "paths,", len(svg) // 1024, "KB")
