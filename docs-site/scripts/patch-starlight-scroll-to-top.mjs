import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const targetFile = resolve(
  process.cwd(),
  'node_modules/starlight-scroll-to-top/libs/scroll-to-top.js'
);

if (!existsSync(targetFile)) {
  process.exit(0);
}

const source = readFileSync(targetFile, 'utf8');

const homepageDetectorPattern =
  /  \/\/ Check if current page is homepage using DOM content detection\.[\s\S]*?  };\r?\n\r?\n  const initButton = \(\) => {/;
const homepageDetectorReplacement = `  // Treat only the docs index route as the homepage.
  const isHomepage = () => {
    const pathname = window.location.pathname.replace(/\\/+$/, '') || '/';
    return pathname === '/docs' || pathname === '/docs/index.html' || pathname === '/';
  };

  const initButton = () => {`;

const zoomHidePattern =
  /\r?\n    \/\/ Function to check zoom level and hide the button accordingly\.[\s\S]*?    checkZoomLevel\(\);\r?\n/;
const zoomHideReplacement = `
    // Keep the button available at all zoom levels.
    // Browsers can persist zoom per origin, so hiding this control makes localhost and production
    // behave inconsistently for the same page and harms accessibility.
`;

const thresholdLogicPattern =
  /      \/\/ Ensure threshold is between 10 and 99\.[\s\S]*?      if \(scrollPercentage > thresholdValue \/ 100\) \{\r?\n        \/\/ Show when scrolled past configured threshold\.\r?\n        scrollToTopButton\.classList\.add\("visible"\);\r?\n      \} else \{\r?\n        scrollToTopButton\.classList\.remove\("visible"\);\r?\n      \}/;
const thresholdLogicReplacement = `      // Support a fixed pixel threshold for layouts where total document height
      // varies a lot due to expanded sidebars and other persisted UI state.
      const usesPixelThreshold = Number.isFinite(threshold) && threshold > 99;
      const shouldShow = usesPixelThreshold
        ? scrollPosition > threshold
        : scrollPercentage > ((threshold >= 10 && threshold <= 99 ? threshold : 30) / 100);

      if (shouldShow) {
        scrollToTopButton.classList.add("visible");
      } else {
        scrollToTopButton.classList.remove("visible");
      }`;

let patched = source;

if (homepageDetectorPattern.test(patched)) {
  patched = patched.replace(homepageDetectorPattern, homepageDetectorReplacement);
}

if (zoomHidePattern.test(patched)) {
  patched = patched.replace(zoomHidePattern, zoomHideReplacement);
}

if (thresholdLogicPattern.test(patched)) {
  patched = patched.replace(thresholdLogicPattern, thresholdLogicReplacement);
}

patched = patched.replace(
  /\r?\n      window\.removeEventListener\("resize", checkZoomLevel\);/,
  ''
);

if (patched === source) {
  process.exit(0);
}

writeFileSync(targetFile, patched, 'utf8');
console.log('[postinstall] Applied starlight-scroll-to-top reliability patch.');
