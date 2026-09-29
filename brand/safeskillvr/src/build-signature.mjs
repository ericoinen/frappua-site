// Regenerates the signature PNGs for SafeSkillVR material.
//
//   node brand/safeskillvr/src/build-signature.mjs
//
// Two families, picked by who the material is about (docs/BRAND-SIGNATURE.md):
//   product  "SafeSkillVR / by Frappua!"         the product is the subject
//   maker    "Frappua! / building SafeSkillVR"   the team is the subject
//
// Each variant renders on black and on white with headless Chrome, and the pair is
// matted into a transparent PNG (alpha from the black/white difference, so
// anti-aliased edges stay clean; Chrome's own transparent-background flag does not
// work in this environment).
//
// Fonts come from the local video project (video-studio/assets/fonts/fonts.css),
// which is gitignored: if it is missing, regenerate it there first.
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "..");
const FONTS = resolve(HERE, "../../../video-studio/assets/fonts/fonts.css");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PURPLE = "#8b7bff";

const fonts = readFileSync(FONTS, "utf8");
const MARK =
  '<svg class="mk" viewBox="14 13 37 37" aria-hidden="true">' +
  '<g class="mk-f"><rect x="18" y="15" width="7" height="33" rx="1.5"/>' +
  '<rect x="18" y="15" width="20" height="7" rx="1.5"/>' +
  '<rect x="18" y="28" width="15" height="6" rx="1.5"/></g>' +
  '<g class="mk-b"><rect x="41" y="15" width="6" height="23" rx="2"/>' +
  '<circle cx="44" cy="45" r="3.4"/></g></svg>';

const shell = (bg, css, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
html,body{margin:0;padding:0;background:${bg}}
.wrap{display:inline-block;padding:70px}
.by{display:flex;align-items:center;gap:.55em;font-family:"Inter",sans-serif;font-weight:400;line-height:1.2;letter-spacing:.005em}
.by em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;font-size:1.12em;line-height:1}
${css}
</style></head><body><div class="wrap">${body}</div></body></html>`;

// Product first. Caption at 30% and fully monochrome: SafeSkillVR material already
// carries its own teal accent, so the Frappua purple would fight it.
const productPage = ({ ink, caption, tail, mark, bg }) =>
  shell(bg, `
.wrap{color:${ink}}
.name{font-family:"Space Grotesk",sans-serif;font-weight:600;font-size:160px;letter-spacing:-.03em;line-height:1;display:block}
.by{margin-top:22px;font-size:48px;color:${caption}}
.mk{width:1.05em;height:1.05em;display:block;flex-shrink:0}
.mk-f,.mk-b{fill:${caption}}`,
    `<span class="name">SafeSkillVR</span>
<div class="by">${mark ? MARK : ""}<span>by Frappua<em>!</em>${tail}</span></div>`);

// Maker first. The Frappua lockup keeps its purple (it is the only accent in this
// frame); the product line underneath stays a quiet monochrome caption.
const makerPage = ({ ink, caption, tail, bg }) =>
  shell(bg, `
.lock{display:flex;align-items:center;gap:.45em;font-family:"Space Grotesk",sans-serif;font-weight:600;
  font-size:150px;letter-spacing:-.02em;line-height:1;color:${ink}}
.lock em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;color:${PURPLE}}
.mk{width:1.15em;height:1.15em;display:block;flex-shrink:0}
.mk-f{fill:${ink}} .mk-b{fill:${PURPLE}}
.by{margin-top:26px;font-size:45px;color:${caption}}`,
    `<div class="lock">${MARK}<span>Frappua<em>!</em></span></div>
<div class="by"><span>building SafeSkillVR${tail}</span></div>`);

const LIGHT = { ink: "#f4f4f7", caption: "rgba(244,244,247,.64)" };
const DARK = { ink: "#08080c", caption: "rgba(8,8,12,.62)" };
const HEH = " &middot; Helsinki Education Hub Incubator";

const variants = [
  { out: "safeskillvr-signature-light", page: productPage, tone: LIGHT, tail: "", mark: false },
  { out: "safeskillvr-signature-dark", page: productPage, tone: DARK, tail: "", mark: false },
  { out: "safeskillvr-signature-heh-light", page: productPage, tone: LIGHT, tail: HEH, mark: false },
  { out: "safeskillvr-signature-heh-dark", page: productPage, tone: DARK, tail: HEH, mark: false },
  { out: "safeskillvr-signature-mark-light", page: productPage, tone: LIGHT, tail: "", mark: true },
  { out: "safeskillvr-signature-mark-dark", page: productPage, tone: DARK, tail: "", mark: true },
  { out: "frappua-building-safeskillvr-light", page: makerPage, tone: LIGHT, tail: "" },
  { out: "frappua-building-safeskillvr-dark", page: makerPage, tone: DARK, tail: "" },
  { out: "frappua-building-safeskillvr-heh-light", page: makerPage, tone: LIGHT, tail: HEH },
  { out: "frappua-building-safeskillvr-heh-dark", page: makerPage, tone: DARK, tail: HEH },
];

const only = process.argv[2]; // optional substring filter, e.g. "frappua-"
const todo = only ? variants.filter((v) => v.out.includes(only)) : variants;

const tmp = resolve(HERE, ".tmp");
mkdirSync(tmp, { recursive: true });

for (const v of todo) {
  for (const bg of ["000", "fff"]) {
    const html = resolve(tmp, `${v.out}-${bg}.html`);
    writeFileSync(html, v.page({ ...v.tone, tail: v.tail, mark: v.mark, bg: `#${bg}` }));
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=2", "--window-size=1500,480",
      `--screenshot=${resolve(tmp, `${v.out}-${bg}.png`)}`,
      `file:///${html.replace(/\\/g, "/")}`,
    ], { stdio: "ignore", timeout: 90000 });
  }
  console.log("rendered", v.out);
}

// Matte + trim in Python: numpy and Pillow do the per-pixel work.
const py = `
import numpy as np, sys
from PIL import Image
tmp, out = sys.argv[1], sys.argv[2]
for n in ${JSON.stringify(todo.map((v) => v.out))}:
    b = np.asarray(Image.open(f'{tmp}/{n}-000.png').convert('RGB')).astype(np.float64)
    w = np.asarray(Image.open(f'{tmp}/{n}-fff.png').convert('RGB')).astype(np.float64)
    alpha = np.clip(1.0 - (w - b).mean(axis=2) / 255.0, 0, 1)
    safe = np.where(alpha > 1e-4, alpha, 1)[..., None]
    rgba = np.dstack([np.clip(b / safe, 0, 255), alpha * 255]).round().astype(np.uint8)
    rgba[alpha < 1/255] = 0
    im = Image.fromarray(rgba, 'RGBA')
    crop = im.crop(im.split()[3].getbbox()); p = 44
    canvas = Image.new('RGBA', (crop.width + p*2, crop.height + p*2), (0,0,0,0))
    canvas.paste(crop, (p, p))
    canvas.save(f'{out}/{n}.png')
    print('wrote', n, canvas.size)
`;
const script = resolve(tmp, "matte.py");
writeFileSync(script, py);
console.log(execFileSync("python", [script, tmp, OUT], { encoding: "utf8" }));
rmSync(tmp, { recursive: true, force: true });
console.log("done");
