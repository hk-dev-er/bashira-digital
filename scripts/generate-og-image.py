from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1200, 630
BG = (246, 244, 236)
NAVY = (35, 32, 88)
GOLD = (232, 162, 61)
MUTED = (70, 67, 111)

out = Path(__file__).resolve().parents[1] / "assets" / "og-image.png"
logo_path = Path(r"H:\BASHIRA\faviconmock.png")

canvas = Image.new("RGBA", (W, H), BG + (255,))
draw = ImageDraw.Draw(canvas)

draw.rectangle([0, 0, W, 6], fill=GOLD)
draw.rectangle([0, H - 4, W, H], fill=NAVY)
draw.arc([W - 220, -80, W + 60, 200], start=200, end=320, fill=GOLD, width=4)

logo = Image.open(logo_path).convert("RGBA")
logo_size = 340
logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
x = (W - logo_size) // 2
y = (H - logo_size) // 2 - 36
canvas.paste(logo, (x, y), logo)

title_font = None
body_font = None
for p in (r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"):
    if Path(p).exists():
        title_font = ImageFont.truetype(p, 44)
        break
for p in (r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"):
    if Path(p).exists():
        body_font = ImageFont.truetype(p, 24)
        break
if title_font is None:
    title_font = ImageFont.load_default()
if body_font is None:
    body_font = ImageFont.load_default()

title = "Bashira Digital"
tagline = "Inteligencia digital que trae buenas noticias"

tb = draw.textbbox((0, 0), title, font=title_font)
tw = tb[2] - tb[0]
draw.text(((W - tw) / 2, y + logo_size + 18), title, fill=NAVY, font=title_font)

sb = draw.textbbox((0, 0), tagline, font=body_font)
sw = sb[2] - sb[0]
draw.text(((W - sw) / 2, y + logo_size + 72), tagline, fill=MUTED, font=body_font)

out.parent.mkdir(parents=True, exist_ok=True)
canvas.convert("RGB").save(out, "PNG", optimize=True)
print(f"saved {out} ({out.stat().st_size} bytes)")
