/**
 * Lists framerusercontent.com image URLs in first-seen order from a saved HTML file.
 * Usage: curl -sL "https://porto-template.framer.website/" -o page.html
 *        node scripts/extract-framer-images.mjs page.html
 */
import fs from "fs";

const file = process.argv[2] || "page.html";
if (!fs.existsSync(file)) {
  console.error("Missing HTML file. Example:");
  console.error('  curl -sL "https://porto-template.framer.website/" -o page.html');
  console.error("  node scripts/extract-framer-images.mjs page.html");
  process.exit(1);
}

const s = fs.readFileSync(file, "utf8");
const re =
  /https:\/\/framerusercontent\.com\/images\/[A-Za-z0-9]+\.(jpg|png|webp)/gi;
const seen = new Set();
const order = [];
let m;
while ((m = re.exec(s))) {
  const u = m[0].split("?")[0];
  if (
    seen.has(u) ||
    u.includes("favicon") ||
    u.includes("touch-icon")
  ) {
    continue;
  }
  seen.add(u);
  order.push(u);
}
order.forEach((u, i) => console.log(String(i).padStart(2, "0"), u));
