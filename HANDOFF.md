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

## Pedagogy slides (/safeskillvr/pedagogy)

- **Exception to the rule "content lives only in src/site.config.mjs".** `src/pages/` is for
  self-contained artifacts only (a deck, an interactive piece), not for regular site pages.
  Regular pages still come from the content model. The build copies `src/pages/` after the
  generated pages and **fails** if a file there would overwrite a generated one.
- No third-party requests on this page: fonts are self-hosted in `fonts/`, audio uses
  `preload="none"`, all asset URLs are root-absolute (`/safeskillvr/pedagogy/...`) because
  `cleanUrls` serves the page without a trailing slash and relative URLs would 404.
- A static page, NOT generated from the content model: `src/pages/safeskillvr/pedagogy/index.html`
  plus `audio/slide01.mp3` to `slide12.mp3`. `build.mjs` copies everything under `src/pages/`
  into `dist/` as-is, so the folder path is the URL.
- The page is a 12-slide deck with chalk-style SVG animations and a Play button per slide
  (synthetic narration). It has its own fonts and palette on purpose and does not load
  `main.css` or `main.js`.
- Two entry points on the SafeSkillVR page: a ghost button in the hero (`heroLabel`) and
  the section after the demo (`title`, `lead`, `cta`).
- The SafeSkillVR page links to it through the `pedagogy` key of the project in
  `src/site.config.mjs`, rendered by `pedagogyBlock` in `build.mjs`. Remove the key to hide
  the section; the sitemap entry follows the key.
- Source of truth for the deck lives outside this repo, in Erik's working folder
  `E:\HEH\Kirsti Lonka\Curiosity_can_be_designed.html`. Edit there and regenerate the site
  copy; do not hand-edit the copy here unless the change is site-only.
- Same golden rule: no em dash anywhere on the page.


## Study questionnaire (/safeskillvr/study) and the first API function

- `src/pages/safeskillvr/study/index.html`: a static, self-contained questionnaire (EN/RU,
  `?lang=ru` or the toggle) filled by participants on their phones after a five-minute
  session with the SafeSkillVR mentor avatar. `noindex`, not in the sitemap, not linked from
  the site: participants get a QR code. Fonts come from `/safeskillvr/pedagogy/fonts/`,
  no third-party requests, root-absolute URLs, no `main.css`/`main.js`.
- `api/survey.js`: the repo's first Vercel function (ESM, `export default handler`). Vercel
  picks up `api/*.js` next to the static build with no config change. It validates the body
  and writes one record to Airtable (base "SafeSkillVR stage zero", table "Responses").
  Needs three Production env vars in the Vercel project: `AIRTABLE_TOKEN` (personal access
  token, scope `data.records:write`, access limited to that base), `AIRTABLE_BASE`,
  `AIRTABLE_TABLE`. Without them it answers 503 and the page shows "could not send".
- Privacy: no names, e-mail, IP or user agent are stored. Participant number (e.g. A07) is
  the only link to the session. Honeypot field `website`; a filled honeypot is dropped with
  a fake 200.
- Local preview (`npx serve dist`) does not run functions: the page works, sending fails.
  The mapping is covered by a tiny script in Erik's scratchpad; on production test with a
  submission and tick "Test" on that row in Airtable.
- Question text is the English master `E:\HEH\Kirsti Lonka\Avatar_pilot_form_EN.md`
  (Russian: `Avatar_pilot_form_RU.md`). Change wording there first, then here. Items 4-10 are
  the EES short form (Pekrun et al. 2017): do not reword them.
- Same golden rule: no em dash anywhere.
