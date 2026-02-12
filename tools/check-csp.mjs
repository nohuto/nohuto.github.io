import { readFileSync, readdirSync } from 'node:fs';

const htmlFiles = readdirSync('.')
  .filter(name => name.endsWith('.html'));

let bad = false;
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const ok = /<meta\s+http-equiv=["']Content-Security-Policy["']\s+content=["'][^"']+["']\s*\/?>/i
    .test(content);
  const looksMalformed = /<meta\s+\\1default-src/i.test(content) || /\\3>/.test(content);
  if (!ok || looksMalformed) {
    console.error(`CSP meta missing or malformed in ${file}`);
    bad = true;
  }
}

process.exit(bad ? 1 : 0);
