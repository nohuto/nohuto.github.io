import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_SITE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(DOCS_SITE_DIR, 'dist');
const PUBLISH_DIR = path.resolve(DOCS_SITE_DIR, '..', 'docs');

if (!fs.existsSync(DIST_DIR) || !fs.statSync(DIST_DIR).isDirectory()) {
  throw new Error(`Missing build output directory: ${DIST_DIR}`);
}

fs.rmSync(PUBLISH_DIR, { recursive: true, force: true });
fs.mkdirSync(PUBLISH_DIR, { recursive: true });
fs.cpSync(DIST_DIR, PUBLISH_DIR, { recursive: true });

const indexPath = path.join(PUBLISH_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  throw new Error(`Publish output is missing index.html: ${indexPath}`);
}

console.log(`[publish-docs] Published docs from ${DIST_DIR} to ${PUBLISH_DIR}`);
