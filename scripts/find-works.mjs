import fs from "fs";
const h = fs.readFileSync(new URL("./framer-home.html", import.meta.url), "utf8");
const tag = 'data-framer-name="Works"';
const i = h.indexOf(tag);
console.log("idx", i);
console.log(h.slice(i, i + 4000));
