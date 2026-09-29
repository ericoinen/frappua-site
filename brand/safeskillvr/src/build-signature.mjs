// Regenerates the SafeSkillVR signature PNGs.
//
//   node brand/safeskillvr/src/build-signature.mjs
//
// It writes one HTML page per variant per background, renders each with headless
// Chrome, and mattes the pair into a transparent PNG (alpha from the black/white
// difference, so anti-aliased edges stay clean; Chrome's own transparent-background
// flag does not work in this environment).
//
// The rules behind the layout live in docs/BRAND-SIGNATURE.md. Fonts come from the
// local video project (video-studio/assets/fonts/fonts.css), which is gitignored:
// if it is missing, regenerate it there first or point FONTS at another copy.
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "..");
const FONTS = resolve(HERE, "../../../video-studio/assets/fonts/fonts.css");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const fonts = readFileSync(FONTS, "utf8");
const MARK =
  '<svg class="mk" viewBox="14 13 37 37" aria-hidden="true">' +
  '<g class="mk-f"><rect x="18" y="15" width="7" height="33" rx="1.5"/>' +
  '<rect x="18" y="15" width="20" height="7" rx="1.5"/>' +
  '<rect x="18" y="28" width="15" height="6" rx="1.5"/></g>' +
  '<g class="mk-b"><rect x="41" y="15" width="6" height="23" rx="2"/>' +
  '<circle cx="44" cy="45" r="3.4"/></g></svg>';

// Caption sits at 30% of the product name and stays monochrome: one accent per frame.
const page = ({ ink, caption, tail, mark, bg }) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
html,body{margin:0;padding:0;background:${bg}}
.wrap{display:inline-block;padding:70px;color:${ink}}
.name{font-family:"Space Grotesk",sans-serif;font-weight:600;font-size:160px;letter-spacing:-.03em;line-height:1;display:block}
.by{display:flex;align-items:center;gap:.55em;margin-top:22px;font-family:"Inter",sans-serif;font-weight:400;
  font-size:48px;line-height:1.2;letter-spacing:.005em;color:${caption}}
.by em{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;font-size:1.12em;line-height:1}
.mk{width:1.05em;height:1.05em;display:block;flex-shrink:0}
.mk-f,.mk-b{fill:${caption}}
</style></head><body><div class="wrap">
<span class="name">SafeSkillVR</span>
<div class="by">${mark ? MARK : ""}<span>by Frappua<em>!</em>${tail}</span></div>
</div></body></html>`;

const LIGHT = { ink: "#f4f4f7", caption: "rgba(244,244,247,.64)" };
const DARK = { ink: "#08080c", caption: "rgba(8,8,12,.62)" };
const HEH = " &middot; Helsinki Education Hub Incubator";

const variants = [
  { file: "signature-light", tone: LIGHT, tail: "", mark: false },
  { file: "signature-dark", tone: DARK, tail: "", mark: false },
  { file: "signature-heh-light", tone: LIGHT, tail: HEH, mark: false },
  { file: "signature-heh-dark", tone: DARK, tail: HEH, mark: false },
  { file: "signature-mark-light", tone: LIGHT, tail: "", mark: true },
  { file: "signature-mark-dark", tone: DARK, tail: "", mark: true },
];

const tmp = resolve(HERE, ".tmp");
mkdirSync(tmp, { recursive: true });

for (const v of variants) {
  for (const bg of ["000", "fff"]) {
    const html = resolve(tmp, `${v.file}-${bg}.html`);
    writeFileSync(html, page({ ...v.tone, tail: v.tail, mark: v.mark, bg: `#${bg}` }));
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=2", "--window-size=1400,460",
      `--screenshot=${resolve(tmp, `${v.file}-${bg}.png`)}`,
      `file:///${html.replace(/\\/g, "/")}`,
    ], { stdio: "ignore", timeout: 90000 });
  }
  console.log("rendered", v.file);
}

// Matte + trim in Python: numpy and Pillow do the per-pixel work.
const py = `
import numpy as np, sys
from PIL import Image
tmp, out = sys.argv[1], sys.argv[2]
names = ${JSON.stringify(variants.map((v) => v.file))}
for n in names:
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
    canvas.save(f'{out}/safeskillvr-{n}.png')
    print('wrote', n, canvas.size)
`;
const script = resolve(tmp, "matte.py");
writeFileSync(script, py);
console.log(execFileSync("python", [script, tmp, OUT], { encoding: "utf8" }));
rmSync(tmp, { recursive: true, force: true });
console.log("done");
