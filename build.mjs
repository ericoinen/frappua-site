// ============================================================
//  Frappua! static site generator
//  Usage: node build.mjs
//  Output: /dist  (deploy this folder)
//  URLs:   /  /safeskillvr  /aicameras  /workshops  /automatenow
// ============================================================
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, projects, capabilities, projectBySlug } from "./src/site.config.mjs";
import { icons, projectIcons } from "./src/icons.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

/* ---------- small helpers ---------- */
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const kineticTitle = (lines, cls = "display") =>
  `<h1 class="${cls}">${lines
    .map((l) => `<span class="line"><span class="line-i">${esc(l)}</span></span>`)
    .join("")}</h1>`;

const statusChip = (status) =>
  status ? `<span class="chip chip--${status.kind}"><i></i>${esc(status.label)}</span>` : "";

/* ---------- shared head ---------- */
const head = ({ title, desc, slug }) => {
  const url = slug ? `https://${site.domain}/${slug}` : `https://${site.domain}/`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="theme-color" content="#0a0a0f">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/favicon.svg">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `https://${site.domain}/`,
  email: site.email,
  description: site.description,
  identifier: { "@type": "PropertyValue", propertyID: "Y-tunnus", value: site.businessId },
  vatID: site.vat,
  address: { "@type": "PostalAddress", addressLocality: "Helsinki", addressCountry: "FI" },
  knowsAbout: ["Virtual Reality Training", "Computer Vision", "AI", "Business Process Automation"],
})}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/main.css">
<script>try{if(sessionStorage.getItem('frx-nav'))document.documentElement.classList.add('frx-incoming');}catch(e){}</script>
</head>`;
};

/* ---------- brand mark (the F! logo) ---------- */
const logoMark = (cls = "logo-mark") =>
  `<svg class="${cls}" viewBox="14 13 37 37" aria-hidden="true"><g class="mk-f"><rect x="18" y="15" width="7" height="33" rx="1.5"/><rect x="18" y="15" width="20" height="7" rx="1.5"/><rect x="18" y="28" width="15" height="6" rx="1.5"/></g><g class="mk-b"><rect x="41" y="15" width="6" height="23" rx="2"/><circle cx="44" cy="45" r="3.4"/></g></svg>`;

/* ---------- chrome: preloader, cursor, progress, nav, footer ---------- */
const preloader = () => `
<div class="preloader" id="preloader" aria-hidden="true">
  <div class="preloader__inner">
    <span class="preloader__word">Frappua<em>!</em></span>
    <span class="preloader__count" id="preCount">0</span>
  </div>
  <div class="preloader__bar"><span id="preBar"></span></div>
</div>`;

const cursor = () => `
<div class="cursor" id="cursor" aria-hidden="true"><div class="cursor__dot" id="cursorDot"></div><div class="cursor__ring" id="cursorRing"></div></div>`;

const progress = () => `<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>`;

const nav = (activeSlug) => `
<header class="nav" id="nav">
  <a href="/" class="nav__logo" data-magnetic aria-label="Frappua — home">${logoMark()}<span class="nav__logo-txt">Frappua<em>!</em></span></a>
  <nav class="nav__links" id="navLinks">
    ${projects
      .map(
        (p) =>
          `<a href="/${p.slug}" class="nav__link${p.slug === activeSlug ? " is-active" : ""}" data-magnetic>${esc(p.name)}</a>`
      )
      .join("")}
    <a href="/#contact" class="nav__cta" data-magnetic>Contact ${icons.arrowUpRight}</a>
  </nav>
  <button class="nav__burger" id="burger" aria-label="Menu"><span></span><span></span></button>
</header>`;

const contact = () => `
<section class="section contact" id="contact">
  <div class="wrap">
    <div class="contact__grid reveal">
      <div class="contact__lead">
        <p class="eyebrow">Get in touch</p>
        <h2 class="h-lg">Let's talk about<br><em>your</em> challenges.</h2>
        <a href="mailto:${site.email}" class="contact__mail" data-magnetic>${site.email} ${icons.arrowUpRight}</a>
      </div>
      <div class="contact__meta">
        <div class="contact__row"><span>Company</span><p>${site.name}<br><i>Finnish micro-enterprise</i></p></div>
        <div class="contact__row"><span>Business ID</span><p>${site.businessId}<br><i>Y-tunnus</i></p></div>
        <div class="contact__row"><span>VAT</span><p>${site.vat}<br><i>ALV-numero</i></p></div>
        <div class="contact__row"><span>Location</span><p>${site.location}</p></div>
        <div class="contact__row"><span>We work with</span><p class="contact__tags">${capabilities
          .map((c) => `<b>${esc(c)}</b>`)
          .join("")}</p></div>
      </div>
    </div>
  </div>
</section>`;

const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="footer__mark" data-parallax="0.1">Frappua<span>!</span></div>
    <div class="footer__bar">
      <div class="footer__links">
        ${projects.map((p) => `<a href="/${p.slug}" data-magnetic>${esc(p.name)}</a>`).join("")}
      </div>
      <p class="footer__copy">© ${new Date().getFullYear() === 2026 ? "2026" : "2025"} ${site.name} · Business ID ${site.businessId} · VAT ${site.vat} — ${esc(site.tagline)}</p>
    </div>
  </div>
</footer>`;

const noise = () => `<div class="noise" aria-hidden="true"></div>`;
const pageCover = () => `<div class="page-cover" id="pageCover" aria-hidden="true"><span class="page-cover__mark">Frappua<em>!</em></span></div>`;

// WebGL video stage: raw <video> feeds a canvas shader (distortion + chroma + feather)
const videoStage = (tag) => `
<div class="hero__media hero__media--video" data-parallax="0.08">
  <div class="hero__stage" data-cursor="hover">
    <video class="hero__src" autoplay muted loop playsinline preload="auto"><source src="/Videos/AI-assistant.mp4" type="video/mp4"></video>
    <canvas class="hero__canvas"></canvas>
    <span class="hero__video-tag">${tag}</span>
  </div>
</div>`;

const scripts = () => `
<script src="/assets/vendor/gsap.min.js"></script>
<script src="/assets/vendor/ScrollTrigger.min.js"></script>
<script src="/assets/vendor/lenis.min.js"></script>
<script src="/assets/main.js"></script>`;

/* ---------- reusable content blocks ---------- */
const marquee = () => {
  const row = capabilities.concat(["Built in Finland"]).map((c) => `<span>${esc(c)}</span><i>✳</i>`).join("");
  return `
<div class="marquee" aria-hidden="true">
  <div class="marquee__track">${row}${row}</div>
</div>`;
};

const featureGrid = (project) => `
<div class="features">
  ${project.features
    .map(
      (f, i) => `
  <article class="feature reveal" style="--i:${i}">
    <span class="feature__ic">${icons[f.icon] || icons.spark}</span>
    <h3>${esc(f.title)}</h3>
    <p>${esc(f.text)}</p>
  </article>`
    )
    .join("")}
</div>`;

const productCards = (project) =>
  !project.productCards
    ? ""
    : `
<div class="prods">
  ${project.productCards
    .map(
      (c) => `
  <article class="prod reveal">
    <span class="prod__badge">${esc(c.badge)}</span>
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.text)}</p>
    <ul>${c.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
  </article>`
    )
    .join("")}
</div>`;

const audienceBlock = (project) =>
  !project.audience
    ? ""
    : `
<div class="audience reveal">
  <p class="eyebrow">${esc(project.audience.title)}</p>
  <div class="audience__tags">
    ${project.audience.tags.map((t) => `<span data-magnetic>${esc(t)}</span>`).join("")}
  </div>
</div>`;

const problemSolution = (project) =>
  !project.problem
    ? ""
    : `
<div class="ps">
  <div class="ps__col ps__col--p reveal">
    <p class="eyebrow eyebrow--warn">${esc(project.problem.title)}</p>
    <p class="ps__lead">${esc(project.problem.lead)}</p>
    <ul class="ps__list">${project.problem.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>
  <div class="ps__col ps__col--s reveal">
    <p class="eyebrow">${esc(project.solution.title)}</p>
    <p class="ps__lead">${esc(project.solution.lead)}</p>
    <p class="ps__body">${esc(project.solution.body)}</p>
  </div>
</div>`;

const statusBanner = (project) =>
  !project.statusBanner
    ? ""
    : `
<div class="status-banner reveal">
  <span class="status-banner__dot"></span>
  <div><strong>${esc(project.statusBanner.title)}</strong><p>${esc(project.statusBanner.text)}</p></div>
</div>`;

const ctaButton = (cta, big = false) =>
  !cta
    ? ""
    : `<a href="${cta.href}" class="btn btn--primary${big ? " btn--lg" : ""}"${cta.external ? ' target="_blank" rel="noopener"' : ""} data-magnetic>${esc(cta.label)} ${icons.arrowUpRight}</a>`;

// "Also from Frappua" — shows the other projects as interactive rows
const otherProjects = (currentSlug, heading = "Also from Frappua") => {
  const others = projects.filter((p) => p.slug !== currentSlug);
  return `
<section class="section work" id="work">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">${esc(heading)}</p>
      <h2 class="h-lg">${currentSlug ? "More of what<br>we build." : "Selected<br>work."}</h2>
    </div>
    <div class="rows">
      ${others
        .map(
          (p) => `
      <a href="/${p.slug}" class="row reveal" style="--c:${p.color};--crgb:${p.colorRGB}" data-cursor="view">
        <span class="row__idx">${p.index}</span>
        <span class="row__name">${esc(p.name)}</span>
        <span class="row__desc">${esc(p.tagline)}</span>
        <span class="row__status">${esc(p.status.label)}</span>
        <span class="row__arrow">${icons.arrow}</span>
        <span class="row__flood"></span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;
};

/* ============================================================
   HOME PAGE
   ============================================================ */
const homePage = () => {
  const heroVideoProject = projectBySlug.safeskillvr;
  return `${head({
    title: "Frappua! — XR, AI & Digital Innovation Studio",
    desc: site.description,
    slug: "",
  })}
<body data-page="home">
${preloader()}${pageCover()}${progress()}${noise()}
${nav(null)}
<main>
  <section class="hero hero--home hero--cinematic">
    <div class="hero__mesh" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="wrap hero__wrap">
      <p class="hero__kicker reveal-now">Finnish micro-enterprise · XR · AI</p>
      ${kineticTitle(["We build", "intelligent", "products with", "emerging tech"], "display display--xl")}
      <div class="hero__base">
        <p class="hero__lead reveal-now">${esc(site.description)} We help organisations adopt new technology for real operational impact.</p>
        <div class="hero__actions reveal-now">
          <a href="#work" class="btn btn--primary" data-magnetic>Explore projects ${icons.arrowDown}</a>
          <a href="/#contact" class="btn btn--ghost" data-magnetic>Get in touch</a>
        </div>
      </div>
    </div>
    ${videoStage(esc(heroVideoProject.name) + " · live VR scenarios")}
    <a href="#manifesto" class="hero__scroll" aria-label="Scroll">${icons.arrowDown}</a>
  </section>

  ${marquee()}

  <section class="section manifesto" id="manifesto">
    <div class="wrap">
      <p class="eyebrow reveal">What we do</p>
      <p class="manifesto__text" data-split>Frappua! turns emerging technology — virtual reality, computer vision, AI assistants and automation — into practical products that organisations can actually use, measure and trust.</p>
    </div>
  </section>

  ${homeWork()}

  <section class="section approach">
    <div class="wrap approach__grid">
      <div class="sec-head reveal">
        <p class="eyebrow">How we work</p>
        <h2 class="h-lg">Practical first.<br><em>Always.</em></h2>
      </div>
      <div class="approach__items">
        ${[
          ["Practical AI, not research demos", "We ship products that solve real operational problems — not prototypes that never leave the lab."],
          ["Built to be measured", "Every solution produces data you can act on: training records, detected events, process metrics."],
          ["Reuse what you have", "We integrate with existing hardware and workflows where possible, keeping adoption fast and affordable."],
          ["Cloud or on-premise", "You choose where things run, depending on your privacy, infrastructure and compliance needs."],
        ]
          .map(
            (a, i) => `
        <div class="approach__item reveal" style="--i:${i}">
          <span class="approach__num">0${i + 1}</span>
          <div><h3>${esc(a[0])}</h3><p>${esc(a[1])}</p></div>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${contact()}
</main>
${footer()}
${scripts()}
</body></html>`;
};

// Home "work" section: all four projects as big interactive rows
const homeWork = () => `
<section class="section work" id="work">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="eyebrow">Our projects</p>
      <h2 class="h-lg">Four ways we<br>put tech to work.</h2>
    </div>
    <div class="rows">
      ${projects
        .map(
          (p) => `
      <a href="/${p.slug}" class="row reveal" style="--c:${p.color};--crgb:${p.colorRGB}" data-cursor="view">
        <span class="row__idx">${p.index}</span>
        <span class="row__name">${esc(p.name)}</span>
        <span class="row__desc">${esc(p.tagline)}</span>
        <span class="row__status">${esc(p.status.label)}</span>
        <span class="row__arrow">${icons.arrow}</span>
        <span class="row__flood"></span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;

/* ============================================================
   PROJECT PAGE  (project-first)
   ============================================================ */
const projectPage = (p) => {
  const accent = `--c:${p.color};--crgb:${p.colorRGB}`;
  return `${head({
    title: `${p.name} — ${p.tagline} · Frappua!`,
    desc: p.summary,
    slug: p.slug,
  })}
<body data-page="project" data-project="${p.slug}" style="${accent}">
${preloader()}${pageCover()}${progress()}${noise()}
${nav(p.slug)}
<main>
  <section class="hero hero--project${p.hero.hasVideo ? " hero--cinematic" : ""}">
    <div class="hero__mesh hero__mesh--accent" aria-hidden="true"><span></span><span></span></div>
    <div class="wrap hero__wrap">
      <div class="hero__top reveal-now">
        <span class="hero__idx">${p.index}</span>
        <span class="hero__kicker">${esc(p.hero.kicker)}</span>
        ${statusChip(p.status)}
      </div>
      ${kineticTitle(p.hero.title, "display display--xl")}
      <div class="hero__base">
        <p class="hero__lead reveal-now">${esc(p.hero.lead)}</p>
        <div class="hero__actions reveal-now">
          ${p.cta ? ctaButton(p.cta) : `<a href="#detail" class="btn btn--primary" data-magnetic>Learn more ${icons.arrowDown}</a>`}
          <a href="/#contact" class="btn btn--ghost" data-magnetic>Get in touch</a>
        </div>
      </div>
    </div>
    ${
      p.hero.hasVideo
        ? videoStage("Live VR scenarios")
        : `<div class="hero__media hero__media--glyph" data-parallax="0.1"><div class="hero__glyph">${projectIcons[p.slug] || icons.spark}</div></div>`
    }
    <a href="#detail" class="hero__scroll" aria-label="Scroll">${icons.arrowDown}</a>
  </section>

  <section class="section summary" id="detail">
    <div class="wrap">
      <p class="eyebrow reveal">In short</p>
      <p class="manifesto__text" data-split>${esc(p.summary)}</p>
    </div>
  </section>

  ${
    p.problem
      ? `<section class="section ps-sec section--alt"><div class="wrap">${problemSolution(p)}</div></section>`
      : ""
  }

  <section class="section feat-sec${p.problem ? "" : " section--alt"}">
    <div class="wrap">
      <div class="sec-head reveal">
        <p class="eyebrow">${p.productCards ? "Capabilities" : "Key features"}</p>
        <h2 class="h-lg">What ${esc(p.name)}<br><em>does.</em></h2>
      </div>
      ${featureGrid(p)}
      ${productCards(p)}
    </div>
  </section>

  ${
    p.comingSoon
      ? `<section class="section soon-sec"><div class="wrap"><div class="soon reveal"><span class="soon__ic">${icons.clock}</span><p class="eyebrow">Coming soon</p><p class="soon__text">${esc(p.comingSoon)}</p>${ctaButton(p.cta, true)}</div></div></section>`
      : ""
  }

  ${
    p.audience || p.statusBanner
      ? `<section class="section close-sec section--alt"><div class="wrap">${audienceBlock(p)}${statusBanner(p)}</div></section>`
      : ""
  }

  ${otherProjects(p.slug)}
  ${contact()}
</main>
${footer()}
${scripts()}
</body></html>`;
};

/* ============================================================
   BUILD
   ============================================================ */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function build() {
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  // assets
  await fs.mkdir(path.join(DIST, "assets"), { recursive: true });
  await fs.copyFile(path.join(__dirname, "src/assets/main.css"), path.join(DIST, "assets/main.css"));
  await fs.copyFile(path.join(__dirname, "src/assets/main.js"), path.join(DIST, "assets/main.js"));
  await copyDir(path.join(__dirname, "src/assets/vendor"), path.join(DIST, "assets/vendor"));
  await fs.copyFile(path.join(__dirname, "src/assets/favicon.svg"), path.join(DIST, "favicon.svg"));

  // media
  await copyDir(path.join(__dirname, "Videos"), path.join(DIST, "Videos"));

  // pages
  await fs.writeFile(path.join(DIST, "index.html"), homePage(), "utf8");
  for (const p of projects) {
    const dir = path.join(DIST, p.slug);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), projectPage(p), "utf8");
  }

  // 404 -> reuse home (nice for static hosts)
  await fs.writeFile(path.join(DIST, "404.html"), homePage(), "utf8");

  // SEO: robots.txt + sitemap.xml
  const base = `https://${site.domain}`;
  const today = new Date().toISOString().slice(0, 10);
  await fs.writeFile(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
    "utf8"
  );
  const urls = ["", ...projects.map((p) => p.slug)];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${base}/${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u === "" ? "1.0" : "0.8"}</priority>\n  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  console.log("✓ Built:", ["/", ...projects.map((p) => "/" + p.slug)].join("  "), "+ sitemap.xml, robots.txt");
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
