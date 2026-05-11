import fs from 'node:fs';

const fail = (msg) => { console.error(`ERROR: ${msg}`); process.exitCode = 1; };

if (!fs.existsSync('hacs.json')) fail('hacs.json fehlt');
const hacs = JSON.parse(fs.readFileSync('hacs.json', 'utf8'));
for (const key of ['name', 'filename', 'homeassistant']) {
  if (!hacs[key]) fail(`hacs.json: Feld '${key}' fehlt`);
}
if (!fs.existsSync('dist/dhe-connect-card.js')) fail('dist/dhe-connect-card.js fehlt');

const dist = fs.readFileSync('dist/dhe-connect-card.js', 'utf8');
if (!dist.includes('customElements.define("dhe-connect-card"')) fail('Card Registrierung fehlt im dist Bundle');
if (!dist.includes('window.customCards')) fail('window.customCards Registrierung fehlt im dist Bundle');

const readme = fs.readFileSync('README.md', 'utf8');
if (!readme.includes('type: custom:dhe-connect-card')) fail('README enthaelt kein Lovelace Beispiel');

if (!process.exitCode) console.log('OK: Basis-Validierung fuer HA/HACS Konformitaet erfolgreich.');
