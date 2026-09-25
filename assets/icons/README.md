# Google Material Symbols

Source: https://github.com/google/material-design-icons/tree/bd8cb85bd4bad964fe6918f79665bb40c3a8efef/symbols/web
License: Apache 2.0; see LICENSE.

All SVGs are unmodified Material Symbols Outlined, weight 300, fill 0, grade 0,
optical size 20 (`{name}_wght300_20px.svg`). `resume.html` embeds these paths
at 13px for the compact print contact row. Shared UI normally uses the Google
Fonts subset at 20px or 24px. `chevron_right.svg` is used as a CSS mask.

`assets/cursor-*.svg` wrap these paths at 20px on a 24px white circular
background; their PNGs are rendered from those SVGs for cursor compatibility.
wave = waving_hand; link = open_in_new; other names match the symbol name.
To update, replace the official SVG and regenerate its derived cursor PNG
at 24 × 24. Keep the 12 12 hotspot in CSS.
