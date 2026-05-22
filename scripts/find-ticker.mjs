import fs from "fs";

const h = fs.readFileSync(new URL("./framer-home.html", import.meta.url), "utf8");

for (const needle of ["Ticker", "ticker", "data-framer-name=\"Ticker", "loop:", "animation:"]) {
  let i = 0;
  let c = 0;
  while ((i = h.indexOf(needle, i)) !== -1 && c < 5) {
    console.log("\n---", needle, c, "---\n", h.slice(i, i + 400));
    i += needle.length;
    c++;
  }
}
