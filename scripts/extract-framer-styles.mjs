import fs from "fs";

const h = fs.readFileSync(new URL("./framer-home.html", import.meta.url), "utf8");

const fonts = [...new Set([...h.matchAll(/font-family:([^;}{]+)/g)].map((x) => x[1].trim()))];
console.log("font-family values:", fonts);

const rgb = [...new Set([...h.matchAll(/rgb\([^)]+\)/g)].map((x) => x[0]))].slice(0, 40);
console.log("sample rgb:", rgb);

const rgba = [...new Set([...h.matchAll(/rgba\([^)]+\)/g)].map((x) => x[0]))].slice(0, 25);
console.log("sample rgba:", rgba);

const fontSize = [...new Set([...h.matchAll(/font-size:\s*([^;}{]+)/g)].map((x) => x[1].trim()))]
  .filter((s) => /px|rem/.test(s))
  .sort((a, b) => parseFloat(a) - parseFloat(b));
console.log("font-sizes (subset):", fontSize.slice(0, 50));

const letter = [...new Set([...h.matchAll(/letter-spacing:\s*([^;}{]+)/g)].map((x) => x[1].trim()))].slice(0, 20);
console.log("letter-spacing:", letter);

const greyo = h.indexOf(">Greyo<");
console.log("Greyo snippet:", h.slice(Math.max(0, greyo - 500), greyo + 800));

const portfolio = h.indexOf(">Portfolio<");
console.log("Portfolio snippet:", h.slice(Math.max(0, portfolio - 400), portfolio + 400));

const matches = [...h.matchAll(/Greyo<\/h1>/g)];
console.log("Greyo h1 count", matches.length);
for (let k = 0; k < Math.min(3, matches.length); k++) {
  const at = matches[k].index;
  console.log("---", k, h.slice(at - 350, at + 20));
}

const idx128 = h.indexOf("rgb(128, 128, 128)");
console.log("first 128 context", h.slice(idx128 - 80, idx128 + 120));

const names = new Set([...h.matchAll(/data-framer-name="([^"]+)"/g)].map((x) => x[1]));
console.log("framer names:", [...names].sort().join(", "));

const preset = h.match(/framer-styles-preset-1ejc4kd:not\([^{]+\{[^}]+/);
console.log("h2 preset", preset ? preset[0] : "none");

const bodyP = h.match(/framer-styles-preset-gv6ry7:not\([^{]+\{[^}]+/);
console.log("body preset", bodyP ? bodyP[0] : "none");

const g = h.indexOf("Greyola");
console.log("greyola ctx", g > 0 ? h.slice(g - 200, g + 120) : "not found");
