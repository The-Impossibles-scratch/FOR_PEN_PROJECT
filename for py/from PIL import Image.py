from PIL import Image
import os

def rgb_to_int(r, g, b):
    return (r << 16) + (g << 8) + b

# ====== Settings ======
MAX_WIDTH = 480
MAX_HEIGHT = 360
UPSCALE_SMALLER_IMAGE = True
# ===================

download_path = os.path.join(os.path.expanduser("~"), "Downloads")
image_path = os.path.join(download_path, "IMG PATH HERE")
output_path = os.path.join(download_path, "output.txt")

img = Image.open(image_path).convert('RGB')
original_width, original_height = img.size

scale_w = MAX_WIDTH / original_width
scale_h = MAX_HEIGHT / original_height
scale = min(scale_w, scale_h)

if (original_width > MAX_WIDTH or original_height > MAX_HEIGHT) or \
   (UPSCALE_SMALLER_IMAGE and (original_width < MAX_WIDTH and original_height < MAX_HEIGHT)):
    new_width = int(original_width * scale)
    new_height = int(original_height * scale)
    img = img.resize((new_width, new_height), resample=Image.Resampling.LANCZOS)

width, height = img.size

with open(output_path, 'w') as f:
    f.write(f"{width}:{height}\n")
    for y in range(height):
        for x in range(width):
            r, g, b = img.getpixel((x, y))
            color_int = rgb_to_int(r, g, b)
            f.write(f"{color_int}\n")

print(f"Succsessfull：{output_path}")
