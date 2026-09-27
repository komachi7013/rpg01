"""Compose generated RPG assets for visual QA; scene JSON remains the runtime source."""

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent


def main() -> None:
    for scene_file in sorted((ROOT / "maps").glob("*_scene.json")):
        scene = json.loads(scene_file.read_text())
        canvas = Image.open(ROOT / scene["background"]).convert("RGBA")
        for obj in sorted(scene["objects"], key=lambda item: item.get("z", 0)):
            sprite = Image.open(ROOT / obj["image"]).convert("RGBA")
            width = obj["width"]
            height = round(sprite.height * width / sprite.width)
            sprite = sprite.resize((width, height), Image.Resampling.LANCZOS)
            x, y = obj["center"]
            canvas.alpha_composite(sprite, (round(x - width / 2), round(y - height / 2)))
        output = scene_file.with_name(scene_file.stem.replace("_scene", "_preview") + ".png")
        canvas.convert("RGB").save(output)
        print(output)


if __name__ == "__main__":
    main()
