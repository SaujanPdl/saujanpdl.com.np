from PIL import Image, ImageDraw, ImageOps
from pathlib import Path

def generate_favicon():
    size = 256
    border_width = 8  # 2px when scaled down to 64x64
    out_size = (64, 64)

    # 1. Base canvas: full transparent RGBA
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # 2. Circular background with obsidian tone #0b0b12
    bg_circle = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg_circle)
    # Circle bounding box
    pad = 4
    bbox = [pad, pad, size - pad, size - pad]
    bg_draw.ellipse(bbox, fill=(11, 11, 18, 255))

    # 3. Load portrait
    portrait_path = Path("public/assets/saujan-portrait.png")
    if not portrait_path.exists():
        portrait_path = Path("public/saujan-portrait.png")
    if not portrait_path.exists():
        portrait_path = Path("public/pp.png")
    if not portrait_path.exists():
        portrait_path = Path("public/pp.jpeg")

    portrait = Image.open(portrait_path).convert("RGBA")

    # Resize portrait to fit neatly within circle (centered on head/torso)
    # Target height around 90% of inner circle
    inner_dim = size - 2 * border_width
    portrait_resized = ImageOps.fit(portrait, (inner_dim, inner_dim), centering=(0.5, 0.45), method=Image.Resampling.LANCZOS)

    # Circular mask for clipping inner image
    clip_mask = Image.new("L", (size, size), 0)
    clip_draw = ImageDraw.Draw(clip_mask)
    inner_pad = pad + border_width // 2
    inner_bbox = [inner_pad, inner_pad, size - inner_pad, size - inner_pad]
    clip_draw.ellipse(inner_bbox, fill=255)

    # Composite portrait onto circular background
    combined = bg_circle.copy()
    portrait_placed = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    portrait_offset = ((size - inner_dim) // 2, (size - inner_dim) // 2)
    portrait_placed.paste(portrait_resized, portrait_offset)

    # Composite inside circle mask
    combined.paste(portrait_placed, (0, 0), mask=clip_mask)

    # 4. Draw neon violet/indigo border ring #8b5cf6
    ring_draw = ImageDraw.Draw(combined)
    ring_color = (139, 92, 246, 255)
    ring_draw.ellipse(bbox, outline=ring_color, width=border_width)

    # 5. Downscale with high quality Lanczos anti-aliasing to 64x64
    final_favicon = combined.resize(out_size, resample=Image.Resampling.LANCZOS)

    # Ensure output directory exists
    out_path = Path("public/favicon.png")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    final_favicon.save(out_path, format="PNG")
    print(f"Successfully generated {out_path} ({out_size[0]}x{out_size[1]}) with alpha transparency.")

if __name__ == "__main__":
    generate_favicon()
