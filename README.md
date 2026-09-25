# Portfolio

Personal portfolio of Younsoo Lim, Technical Artist. The site presents technology research and validation through real-time rendering, character animation pipelines, and 3D creation tools. The production domain is tommlimm.net.

## TA portfolio migration

The `codex/ta-portfolio-migration` branch starts from this repository's default branch, `gh-pages`, and imports the committed `main` snapshot of `tomlim2/ta-portfolio`. It provides the new foundation for migrating the six legacy projects individually. The original site remains in `gh-pages` and Git history. See [the migration record and checklist](docs/portfolio-migration.md) for exact source commits, recovery instructions, and pending work. This branch has not been deployed.

For project narratives, editing locations, and evidence-record navigation, start with [map.md](map.md).

## Design and page authoring

- [Current style guide](docs/style-guide.md): colors, typography, spacing, responsive layouts, media, and interaction rules.
- [Component Library](component-library.html): visual examples using the shared CSS, including overlay cards and the image viewer.
- [Project authoring guide](docs/project-template.md) and [HTML starter](projects/_template.html): migrate one project at a time.

These internal references are excluded from `site-public.json`. Preview them locally from the repository root with `python3 -m http.server 8781 --bind 127.0.0.1`, then open `/component-library.html` or `/projects/_template.html`. The normal `_site/` preview does not include them. The February documents in `docs/plans/` are historical plans, not the current style specification.

## Shotloom case study

Shotloom is the fourth Selected Work card, after NPR Shading & Look Development, Character System, and UE5 Profiling. Its homepage card and case-study hero use the approved `assets/images/shotloom/thumbnail-editor-v2.png`, labeled as an AI-retouched thumbnail. Original development screenshots remain in the case study. Direct access is also available: `/shotloom` redirects to `/projects/shotloom.html`. The case study covers core 3D workflows, company service integration, and accessible editing. SceneGen illustrates one of several Shotloom use cases: in this example, Shotloom’s 3D editing and scene video output connect CINEV’s image input with final video generation. The product reached development-server deployment; publication of this case study does not imply a product launch.

## Projects

| Project | Scope | Description |
|---------|------|-------------|
| Shotloom | Company project; product reached dev deployment | Retargeting, editor UX/frontend, and engineering handoff |
| NPR Shading & Look Development | Cinev Studio company project | Research, look development, and lighting decisions |
| Character System | Cinev Studio company project | Artist authoring tools and runtime character loading |
| UE5 Profiling | Cinev Studio company project | GPU profiling and documented optimization decisions |
| PMX to VRM | Internal R&D; not integrated into Studio | Conversion for the existing VRM import path; internally validated |
| Matcap Painter | Personal tool shared with the character team | Real-time texture editing used for metal and plastic character details |
| MMD Player | Personal tool; sole user | Source-model verification and WebGPU motion experiments |
| Live UE Scene Bridge | Internal R&D PoC | Natural language UE scene control and AI generation integration |

## Tech Stack

- **Hosting** — GitHub Pages + custom domain
- **Styling** — Tailwind CSS + custom CSS variables
- **Language** — Korean by default; English content is paired with `data-ko` attributes
- **Legacy encryption** — AES-256-GCM helpers remain in `js/auth.js` and `js/crypto.js`; the current checked-in project pages contain plain HTML

## Structure

```
index.html               # Landing page
resume.html              # Single-column, two-page A4 resume source
assets/resume.pdf        # Download linked from the homepage; regenerate after resume edits
projects/                # 8 published case studies
shotloom/index.html      # Direct-entry redirect to the Shotloom case study
css/style.css            # Shared portfolio styles
js/                      # main.js, auth.js, crypto.js
assets/                  # Images, resume PDF, cursors
site-public.json         # Explicit publication manifest
scripts/                 # Site validation and release-note generation
releases/                # Optional editorial notes for individual version tags
.github/workflows/       # Validation and tag-triggered release/deployment
tools/drafts/            # Local, gitignored unpublished work
tools/career-notes/      # Local, gitignored interview, evidence, and revision records
```

## Editing content

Update both the English element content and its Korean `data-ko` value. Keep role ownership, implementation status, and measurement scope consistent across the homepage, case studies, and resume. Legacy encryption scripts expect `projects/originals/`, which is absent from this checkout; do not run them against incomplete source files.

The Korean resume is maintained directly in `resume.html`. Regenerate `assets/resume.pdf` after edits and check both A4 pages, text reading order, and contact links before release.

Build the actual public bundle, then preview it with a static HTTP server:

```sh
python3 scripts/build_site.py
python3 -m http.server 8780 --directory _site
```

The build copies only `site-public.json` entries, then checks local links, anchors, CSS asset references, headings, and malformed text. Repository metadata, developer documentation, and local drafts are not published. Add new public pages and asset directories to the manifest deliberately. Check desktop/mobile layouts and the language toggle before releasing.

## Release and deployment

Pushing `gh-pages` or a `codex/**` branch runs validation. The imported deployment workflow runs only when a stable version tag such as `v1.0.1` is pushed. Tags must point to a commit in `gh-pages` history. The workflow follows the [GitHub Pages custom workflow setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The existing production site currently uses `gh-pages`. This migration does not change repository-level Pages settings. When deployment is requested, configure Pages to publish the `_site/` artifact through GitHub Actions before the production merge or release. A branch-based Pages deployment would bypass `site-public.json` and publish repository files directly.

```sh
# After committing the reviewed changes:
git push origin gh-pages
git tag -a v1.0.1 -m "Update portfolio"
git push origin v1.0.1
```

Use a new version each time. The workflow validates the publication bundle, deploys that tagged commit to GitHub Pages, then publishes its GitHub Release. The release includes the changes since the preceding version tag and the deployed commit. For the first release, the commit list contains the tagged commit. To add a human-written summary, commit `releases/<tag>.md` before creating the tag; it is included above the generated commit list. Without that file, notes are generated automatically.

In repository settings, Pages must use **GitHub Actions** and the `github-pages` environment must allow `v*` tags. The workflow uses the built-in `GITHUB_TOKEN`; no extra deployment token is required. Failed runs can be retried from Actions; the release step updates an existing release for the same tag instead of duplicating it.
