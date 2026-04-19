import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const targetFile = resolve(
  process.cwd(),
  'node_modules/starlight-codeblock-fullscreen/src/libs/ec-fullscreen.js'
);

if (!existsSync(targetFile)) {
  process.exit(0);
}

const source = readFileSync(targetFile, 'utf8');
const exportLinePattern = /\r?\nexport default initECFullscreen;\r?\n?$/;

if (!exportLinePattern.test(source)) {
  process.exit(0);
}

const patched = source.replace(exportLinePattern, '\n');
writeFileSync(targetFile, patched, 'utf8');
console.log('[postinstall] Applied starlight-codeblock-fullscreen export patch.');
