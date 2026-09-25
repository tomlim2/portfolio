# Social brand marks

These are brand assets, separate from the Apache-licensed Google UI icons.
Retrieved 2026-09-25. The respective brand owners retain their trademarks.

- `github.svg`: official Invertocat artwork, `GitHub Logos/SVG/GitHub_Invertocat_Black.svg` from [GitHub logo downloads](https://brand.github.com/GitHub_Logos.zip). Unmodified file. [Usage guidance](https://brand.github.com/foundations/logo).
- `linkedin.svg`: the `inbug-blue-28` symbol from the [official LinkedIn brand downloads page](https://brand.linkedin.com/downloads), placed in a standalone 28px SVG. Original path geometry and blue fill retained; the embedded class/style is flattened to a fill attribute. [Brand guidance](https://brand.linkedin.com/).

Shared UI renders these SVGs as monochrome CSS masks in a centered 20 × 20px box, preserving proportions. The enclosing Ghost icon link has a 44 × 44px target. Neutral theme color is retained on hover; only the logo opacity changes. Do not substitute `code` / `work`, redraw the logos, or apply Material Symbols weight settings.

`resume.html` embeds the same path geometry at 13px in the contact row; `assets/resume.pdf` carries the corresponding vector marks. Update HTML and PDF together. The accessible name and optional tooltip belong to the enclosing link; decorative SVGs/masks are hidden from assistive technology.
