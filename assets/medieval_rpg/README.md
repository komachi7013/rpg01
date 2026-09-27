# Medieval RPG asset pack

All visible art in this folder was generated with the built-in image generator. `.venv/bin/python` and the `generate2dsprite` / `generate2dmap` processors were used only for transparent extraction, animation frames, metadata, and preview composition.

## Contents

- `characters/hero`, `slime`, `dragon`, `dark_lord`: four-frame idle animations, transparent sprite sheets, individual PNG frames, GIFs, and QC metadata.
- `characters/hero/walk`: 4 × 4 directional walking sheet. Rows are `down`, `left`, `right`, `up`; each direction has four PNG frames, a strip PNG, and a GIF. Frame duration is 130 ms.
- `characters/residents`: shopkeeper, farmer, healer, and guard as separate transparent PNGs.
- `props/town`, `props/castle`: nine separate transparent props each.
- `props/cottage`, `props/gatehouse`: large isolated building objects.
- `symbols`: town, castle, road marker, and forest map symbols.
- `maps/*_ground.png`: 1254 × 1254 ground art without placed objects.
- `maps/*_scene.json`: object placement, spawn, and zone metadata; image paths are relative to this directory.
- `maps/*_preview.png`: visual QA composites, regenerated with `.venv/bin/python assets/medieval_rpg/build_previews.py`.
- `raw`: untouched source images with magenta backgrounds.

The scene JSON uses pixel coordinates on the 1254 × 1254 maps. `blocking` marks props that should receive collisions; collision dimensions still need to be set in the game runtime. The field scene's `destination` values identify the town and castle entrance symbols.

This workspace contains the asset forge but no existing TypeScript RPG runtime, so this pack is prepared for integration rather than wired into a game.
