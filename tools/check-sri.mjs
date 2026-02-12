import { readFileSync, readdirSync } from 'node:fs';

const htmlFiles = readdirSync('.')
  .filter(name => name.endsWith('.html'));

const tagRe = /<(script|link)\b[^>]*(src|href)="https?:\/\/[^"]+"[^>]*>/gi;

let bad = false;
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const tags = content.match(tagRe) || [];
  for (const tag of tags) {
    const hasIntegrity = /integrity="/i.test(tag);
    const hasCrossorigin = /crossorigin="/i.test(tag);
    if (!hasIntegrity || !hasCrossorigin) {
      console.error(`Missing SRI on tag in ${file}: ${tag}`);
      bad = true;
    }
  }
}

process.exit(bad ? 1 : 0);
