import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
copyFileSync("src/dhe-connect-card.js", "dist/dhe-connect-card.js");
console.log("Built dist/dhe-connect-card.js");
