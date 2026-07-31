# Frappua! site - handoff

Everything a new session needs to continue work on **frappua.win**.

## 0. Golden rule

**Never use the em dash character "—" anywhere** - not in copy, page titles, code
comments, README, or commit messages. Use commas, colons, periods, hyphens "-", or
the middot "·" instead. This is a hard user rule.

## 1. Repo & infra

| Thing | Value |
|-------|-------|
| GitHub | https://github.com/ericoinen/frappua-site (owner `ericoinen`, public) |
| Default branch | `main` (push here -> Vercel auto-deploys) |
| Host | Vercel project `frappua-site` (team: ericoinen's projects, Hobby) |
| Live domain | https://frappua.win (apex primary), `www` 301-redirects to apex |
| DNS / registrar | Cloudflare (domain bought there) |
| Node | v22 (build is plain ESM, no deps to install) |
| Git identity used | `git -c user.name="Frappua" -c user.email="info@frappua.win"` |

### Clone & work
```bash
git clone https://github.com/ericoinen/frappua-site.git
cd frappua-site
node build.mjs            # generates /dist
npx serve dist -l 3000    # preview (or: npm run dev)
```
Push to `main` -> Vercel builds (`node build.mjs`, output `dist/`) and deploys.

If `git push` returns 403 while `gh auth status` shows a logged-in account with
`repo` scope: run `gh auth setup-git` once, then push works.

## 2. How the site is built

Static site **generated** by `build.mjs` from a content model. Do NOT hand-edit
`dist/` - edit source and rebuild.

```
src/site.config.mjs   ← ALL text/content (edit copy here), per-project accent colors
src/icons.mjs         ← inline SVG icons + project glyphs
src/assets/main.css   ← design system (all styling)
src/assets/main.js    ← interaction layer (Lenis, GSAP, WebGL, cmd-K, etc.)
src/assets/vendor/    ← GSAP + ScrollTrigger + Lenis (vendored locally, no CDN)
src/assets/favicon.svg← brand "F!" mark (also used inline as nav logo via logoMark())
build.mjs             ← generator: templates + writes dist/ + sitemap + robots
Videos/AI-assistant.mp4← hero footage (5.2MB, 720p; original was 91MB, compressed)
dist/                 ← GENERATED output, Vercel serves this (gitignored)
vercel.json           ← buildCommand=node build.mjs, outputDirectory=dist, cleanUrls
```

### URLs (folder-per-page -> clean URLs)
`/` (home/overview), `/safeskillvr`, `/aicameras`, `/workshops`, `/automatenow`

### Add a new project
1. Add an entry to the `projects` array in `src/site.config.mjs` (slug, name, color,
   colorRGB, status, hero, summary, problem/solution, features, etc.).
2. Optional: add a glyph in `src/icons.mjs` under `projectIcons`.
3. `node build.mjs` -> a new `/slug` page appears automatically in nav, home grid,
   "Also from Frappua" rows, sitemap.

## 3. Key features already built (main.js)

- **WebGL video hero**: footage rendered through a shader (feathered edges, accent
  duotone, chromatic aberration, scroll-velocity reactive) with a **spotlight lens**
  that reveals clean footage under the cursor (`initVideoStage`).
- **Calm WebGL backdrop** on no-video heroes (`initBgShader`).
- Lenis smooth scroll, magnetic buttons, custom NO cursor (native cursor kept on
  purpose - user disliked the trailing ring; do not re-add a custom cursor).
- Scroll reveals, word-lit manifesto, parallax, scroll-velocity marquee, scramble.
- **Modern layer**: ⌘K command palette (`initCmdk`), spotlight cards (`initGlow`),
  3D tilt (`initTilt`), char-split titles (`initCharTitles`), animated counters
  (`initCounters`), tab-hidden video pause.
- **Page transitions**: accent wipe between pages; counting preloader only on first
  visit (sessionStorage `frx-seen` / `frx-nav`). `start()` is guarded against
  double-boot (was a first-visit race that hid the video).
- Progressive enhancement: no GSAP -> `.no-anim`; `prefers-reduced-motion` honored;
  touch devices skip glow/tilt/cursor-effects.

## 4. Design language

- Fonts: Space Grotesk (display), Inter (body), Instrument Serif italic (accents,
  e.g. the "!" in the wordmark).
- Dark theme. Per-project accent via CSS vars `--c` / `--crgb` set on `<body>`.
- Logo: "F!" mark (`logoMark()` in build.mjs) + wordmark "Frappua" with serif-italic
  "!". Same mark is `favicon.svg`.

## 5. Domain / DNS / email (Cloudflare)

- Apex: `CNAME @ -> c4b273814207471e.vercel-dns-017.com` (DNS only / grey cloud).
- `www`: `CNAME www -> same vercel target` (DNS only), redirects to apex in Vercel.
- Keep records **DNS only (grey cloud)** - do NOT enable Cloudflare proxy (orange),
  it breaks Vercel SSL.
- **Email**: Cloudflare Email Routing is ON. `info@frappua.win` forwards to the
  owner's Gmail. MX (route1/2/3.mx.cloudflare.net) + SPF + DKIM added & locked.
  SPF TXT is intentionally "Unlocked". DMARC (`_dmarc` TXT) optional/pending.

## 6. Company facts (already on the site)

- Legal name: Frappua! (Finnish sole trader / yksityinen elinkeinonharjoittaja)
- Business ID (Y-tunnus): **2775290-7**
- VAT (ALV): **FI27752907** (owner confirmed VAT-registered)
- Location shown: Helsinki, Finland (home street address deliberately NOT published)
- Contact email: info@frappua.win
- In footer, Contact section, and JSON-LD Organization.

## 7. SEO

Per-page title/description/canonical/OG/Twitter, JSON-LD Organization (identifier
= Y-tunnus, vatID), `sitemap.xml` + `robots.txt` generated by build.
Google Search Console: NOT yet set up (recommend Domain property + submit sitemap).

## 8. Verify a change locally

`node build.mjs` then serve `dist/` and load `http://localhost:3000`. For "first
visit" behavior (preloader + video), clear `sessionStorage` before reload. Check
browser console for errors.

## 9. Open / possible next tasks

- Google Search Console (Domain property, verify via Cloudflare TXT, submit sitemap).
- DMARC record for anti-spoofing.
- OG image (og:image) for nice social link previews (none yet).
- Optional: put the "F!" mark into preloader/footer for full brand consistency.
- Future: 3rd project (workshops content is placeholder), 4th (AutomateNow) - fill
  real content when ready. AutomateNow/Workshops currently marked "Coming soon".
