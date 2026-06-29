# Frappua! — site

Multi-page marketing site. One codebase, separate landing pages per project so each
can be submitted as its own grant URL.

## URLs

| URL | Page |
|-----|------|
| `frappua.win/` | Company overview (all projects) |
| `frappua.win/safeskillvr` | SafeSkillVR (project-first) |
| `frappua.win/aicameras` | AI Cameras |
| `frappua.win/workshops` | Workshops |
| `frappua.win/automatenow` | AutomateNow |

## How it works

Pages are **generated** from a template + content model — edit content in one place,
rebuild, and every page updates.

```
src/site.config.mjs   ← all text/content (edit this for copy changes)
src/icons.mjs         ← inline SVG icons
src/assets/main.css   ← design system
src/assets/main.js    ← animations (Lenis smooth scroll, GSAP, cursor, etc.)
src/assets/vendor/    ← GSAP + ScrollTrigger + Lenis (vendored, no CDN needed)
build.mjs             ← generator
Videos/               ← media (copied into the build)
dist/                 ← GENERATED output — deploy this folder
```

## Commands

```bash
node build.mjs        # build into /dist
npm run build         # same
npm run dev           # build + serve dist on http://localhost:3000
```

## Adding a new project (e.g. a future 5th)

1. Add an entry to the `projects` array in `src/site.config.mjs`.
2. (Optional) add a project glyph in `src/icons.mjs` under `projectIcons`.
3. Run `node build.mjs`. A new page at `/<slug>` is created automatically and
   appears in the nav, home grid and "Also from Frappua" sections.

## Deploy

Upload the **`dist/`** folder to any static host (Cloudflare Pages, Netlify,
GitHub Pages, nginx). Clean URLs like `/safeskillvr` resolve to
`/safeskillvr/index.html` automatically. `dist/404.html` falls back to the home page.

## Notes

- Animations are progressive enhancement: if JS/GSAP fail to load, all content
  still shows (`.no-anim` fallback) and `prefers-reduced-motion` is respected.
- Per-project accent color is set in `site.config.mjs` (`color` / `colorRGB`).
