import { readFileSync, readdirSync } from 'node:fs';

const BLOCKED = [
  'api.fonts.coollabs.io',
  'fonts.coollabs.io',
  'cdn.fonts.coollabs.io',
  'raw.githubusercontent.com'
];

const files = readdirSync('.', { withFileTypes: true })
  .filter(entry => entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.css')))
  .map(entry => entry.name);

let bad = false;
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const host of BLOCKED) {
    if (content.includes(host)) {
      console.error(`Disallowed third-party origin "${host}" found in ${file}`);
      bad = true;
    }
  }
}

process.exit(bad ? 1 : 0);
