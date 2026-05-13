import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
};

if (!existsSync("hacs.json")) fail("hacs.json fehlt");
if (!existsSync("dist/dhe-connect-card.js")) fail("dist/dhe-connect-card.js fehlt");

const hacs = JSON.parse(readFileSync("hacs.json", "utf8"));
if (hacs.filename !== "dhe-connect-card.js") fail("hacs.json filename muss dhe-connect-card.js sein");

const dist = readFileSync("dist/dhe-connect-card.js", "utf8");
if (!dist.includes("customElements.define")) fail("customElements.define fehlt");
if (!dist.includes("dhe-connect-card")) fail("Card type dhe-connect-card fehlt");
if (!dist.includes("dhe-connect-card-config-editor")) fail("GUI editor element fehlt");
if (dist.includes("dhe-connect-card-v042")) fail("Alter Test-Alias ist noch im Bundle");

const readme = readFileSync("README.md", "utf8");
if (!readme.includes("/hacsfiles/dhe-connect-card/dhe-connect-card.js")) {
  fail("README enthaelt keinen HACS Resource-Pfad");
}
if (!readme.includes("type: custom:dhe-connect-card")) {
  fail("README enthaelt kein YAML-Beispiel");
}

if (!process.exitCode) console.log("OK: DHE Connect Card validation passed.");
