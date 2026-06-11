/* Copyright (c) 2026 Nohuto */
(function attachTerminal(global) {
  'use strict';
const BIN_DIFF_RELEASE_LINKS = Object.freeze([
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-21H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-22H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-24H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-25H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/11-26H1',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1507',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1511',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1607',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1703',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1709',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1803',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1809',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1903',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/1909',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/2004',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/20H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/21H1',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/21H2',
  'https://github.com/nohuto/decompiled-pseudocode/tree/main/22H2'
]);
const PROJECT_LIST = [
  { title: 'Windows Configuration', repo: 'nohuto/win-config' },
  { title: 'RegKit', repo: 'nohuto/regkit' },
  { title: 'Decompiled Pseudocode', repo: 'nohuto/decompiled-pseudocode' },
  { title: 'NVAPI CLI', repo: 'nohuto/nvapi-cli' },
  { title: 'AES CBC Encryption', repo: 'nohuto/aes-cbc' },
  { title: 'Bitmask Calculator', repo: 'nohuto/bitmask-calc' },
  { title: 'Blocklist Manager', repo: 'nohuto/blocklist-mgr' },
  { title: 'Component Manager', repo: 'nohuto/comp-mgr' },
  { title: 'App Guides', repo: 'nohuto/app-guides' },
  { title: 'Game Configuration Tools', repo: 'nohuto/game-tools' },
  { title: 'Symbols Memory Dump', repo: 'nohuto/sym-dump' },
  { title: 'NVFetch', repo: 'nohuto/nvfetch' },
  { title: 'Void Obfuscation', repo: 'nohuto/void' },
  { title: 'PowerShell Minifier', repo: 'nohuto/minifier' },
  { title: 'PS12bat', repo: 'nohuto/ps12bat' },
  { title: 'Base64 Encoding / Character Obfuscation', repo: 'nohuto/b64-char' },
  { title: 'ADMX Parser', repo: 'nohuto/admx-parser' },
  { title: 'strings2 TUI', repo: 'nohuto/strings2-tui' },
  { title: 'Base64 Reversal & Character Obfuscation', repo: 'nohuto/b64rev' },
  { title: 'DISM WSIM', repo: 'nohuto/dism-wsim' },
  { title: 'reg2bat', repo: 'nohuto/reg2bat' },
  { title: 'PBO2 UV Guide', repo: 'nohuto/pbo2-uv' },
  { title: 'GPU OC/UV Guide', repo: 'nohuto/gpu-oc-uv' }
];

let consoleHistory = [];
let consoleHistoryIndex = -1;
let consoleTimestampTimer;
let consoleFocusListener;
let consoleResizeHandler;
let consolePageShowHandler;
let consoleResizeObserver;
let consoleClampRaf = 0;
let consoleAnimationCleanup = null;

const ASCII_ART = [
  '  \\  |                                    ',
  '   \\ |   _ \\ \\ \\   /  _ \\   __|  __|   _ \\',
  ' |\\  |  (   | \\ \\ /   __/  |   \\__ \\   __/',
  '_| \\_| \\___/   \\_/  \\___| _|   ____/ \\___|'
];

function stopConsoleAnimation() {
  if (!consoleAnimationCleanup) return;
  consoleAnimationCleanup();
  consoleAnimationCleanup = null;
}

function initConsoleWindow() {
  const windowEl = document.getElementById('console-window');
  const handle = document.getElementById('console-drag');
  if (!windowEl || !handle) return;
  if (windowEl.dataset.ready === 'true') return;
  windowEl.dataset.ready = 'true';

  const parent = windowEl.parentElement;
  let positionTries = 0;

  const getParentSize = () => {
    const rect = parent.getBoundingClientRect();
    return {
      width: Math.max(0, parent.clientWidth || rect.width || 0),
      height: Math.max(0, parent.clientHeight || rect.height || 0)
    };
  };

  const getWindowSize = () => ({
    width: Math.max(0, windowEl.offsetWidth || windowEl.getBoundingClientRect().width || 0),
    height: Math.max(0, windowEl.offsetHeight || windowEl.getBoundingClientRect().height || 0)
  });

  const getMetrics = () => {
    const parentSize = getParentSize();
    const windowSize = getWindowSize();
    return {
      parentWidth: parentSize.width,
      parentHeight: parentSize.height,
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
      maxLeft: Math.max(0, parentSize.width - windowSize.width),
      maxTop: Math.max(0, parentSize.height - windowSize.height)
    };
  };

  const isAbsoluteWindow = () => getComputedStyle(windowEl).position === 'absolute';

  const hasMetrics = metrics => metrics.parentWidth && metrics.parentHeight && metrics.windowWidth && metrics.windowHeight;

  const setPosition = (left, top, metrics = getMetrics()) => {
    windowEl.style.transform = 'none';
    windowEl.style.inset = 'auto';
    windowEl.style.margin = '0';
    windowEl.style.left = `${Math.min(Math.max(0, left), metrics.maxLeft)}px`;
    windowEl.style.top = `${Math.min(Math.max(0, top), metrics.maxTop)}px`;
    windowEl.dataset.positioned = 'true';
  };

  const centerPosition = () => {
    if (!isAbsoluteWindow()) return true;
    const metrics = getMetrics();
    if (!hasMetrics(metrics)) {
      if (positionTries < 8) {
        positionTries += 1;
        requestAnimationFrame(centerPosition);
      }
      return false;
    }
    positionTries = 0;
    setPosition(metrics.maxLeft / 2, metrics.maxTop / 2, metrics);
    return true;
  };

  const materializeCurrentPosition = () => {
    if (!isAbsoluteWindow()) return;
    if (windowEl.dataset.positioned === 'true') {
      setPosition(windowEl.offsetLeft, windowEl.offsetTop);
      return;
    }
    const parentRect = parent.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    setPosition(rect.left - parentRect.left, rect.top - parentRect.top);
  };

  const clampPosition = () => {
    if (windowEl.dataset.userPositioned !== 'true') {
      centerPosition();
      return;
    }
    setPosition(windowEl.offsetLeft, windowEl.offsetTop);
  };

  const scheduleClampPosition = () => {
    if (!document.contains(windowEl)) return;
    if (consoleClampRaf) return;
    consoleClampRaf = requestAnimationFrame(() => {
      consoleClampRaf = 0;
      positionTries = 0;
      clampPosition();
    });
  };

  requestAnimationFrame(clampPosition);

  if (consoleResizeObserver) {
    consoleResizeObserver.disconnect();
    consoleResizeObserver = null;
  }
  if (consoleClampRaf) {
    cancelAnimationFrame(consoleClampRaf);
    consoleClampRaf = 0;
  }
  if (window.ResizeObserver) {
    consoleResizeObserver = new ResizeObserver(scheduleClampPosition);
    consoleResizeObserver.observe(parent);
    consoleResizeObserver.observe(windowEl);
  }

  if (consoleResizeHandler) {
    window.removeEventListener('resize', consoleResizeHandler);
    window.visualViewport?.removeEventListener('resize', consoleResizeHandler);
  }
  if (consolePageShowHandler) {
    window.removeEventListener('pageshow', consolePageShowHandler);
  }
  consoleResizeHandler = scheduleClampPosition;
  consolePageShowHandler = scheduleClampPosition;
  window.addEventListener('resize', consoleResizeHandler);
  window.visualViewport?.addEventListener('resize', consoleResizeHandler);
  window.addEventListener('pageshow', consolePageShowHandler);

  handle.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    e.preventDefault();
    materializeCurrentPosition();
    windowEl.dataset.userPositioned = 'true';
    windowEl.style.transform = 'none';
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = windowEl.offsetLeft;
    const startTop = windowEl.offsetTop;
    const { maxLeft, maxTop } = getMetrics();
    let rafId = 0;
    let pendingX = startX;
    let pendingY = startY;
    let lastLeft = startLeft;
    let lastTop = startTop;

    handle.setPointerCapture(e.pointerId);
    windowEl.style.willChange = 'transform';

    const paintDrag = () => {
      rafId = 0;
      const dx = pendingX - startX;
      const dy = pendingY - startY;
      const nextLeft = Math.min(Math.max(0, startLeft + dx), maxLeft);
      const nextTop = Math.min(Math.max(0, startTop + dy), maxTop);
      lastLeft = nextLeft;
      lastTop = nextTop;
      windowEl.style.transform = `translate3d(${nextLeft - startLeft}px, ${nextTop - startTop}px, 0)`;
    };

    const onMove = ev => {
      pendingX = ev.clientX;
      pendingY = ev.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(paintDrag);
    };

    const onUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      paintDrag();
      windowEl.style.transform = 'none';
      windowEl.style.left = `${lastLeft}px`;
      windowEl.style.top = `${lastTop}px`;
      windowEl.style.willChange = '';
      if (handle.hasPointerCapture(e.pointerId)) {
        handle.releasePointerCapture(e.pointerId);
      }
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      handle.removeEventListener('pointercancel', onUp);
      clampPosition();
    };

    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
    handle.addEventListener('pointercancel', onUp);
  });
}

function initConsole() {
  const consoleRoot = document.getElementById('console');
  const output = document.getElementById('console-output');
  const lines = document.getElementById('console-lines');
  const form = document.getElementById('console-form');
  const input = document.getElementById('console-command');
  const caret = document.getElementById('console-cursor');
  const measure = document.getElementById('console-measure');
  const ghost = document.getElementById('console-ghost');
  if (!consoleRoot || !output || !lines || !form || !input || !caret || !measure || !ghost) return;
  if (consoleRoot.dataset.ready === 'true') return;
  consoleRoot.dataset.ready = 'true';

  initConsoleWindow();

  const promptUser = 'nohuto';
  const promptHost = 'noverse';
  const rootPath = '~/terminal';
  let currentPath = rootPath;
  const promptEl = consoleRoot.querySelector('.console-prompt');
  const timestampEl = document.getElementById('console-timestamp');
  const DOCS_ROOT_PATH = `${rootPath}/docs`;
  const formatDisplayPath = path => {
    if (path === rootPath) return rootPath;
    if (path === DOCS_ROOT_PATH) return '~/docs';
    if (String(path || '').startsWith(`${DOCS_ROOT_PATH}/`)) {
      return String(path).replace(`${DOCS_ROOT_PATH}/`, '~/docs/');
    }
    if (String(path || '').startsWith(`${rootPath}/`)) {
      return String(path).replace(`${rootPath}/`, '~/');
    }
    return path;
  };

  const updatePrompt = () => {
    if (promptEl) {
      promptEl.textContent = `${promptUser}@${promptHost}:${formatDisplayPath(currentPath)}$`;
    }
  };

  const promptLabel = () => `${promptUser}@${promptHost}:${formatDisplayPath(currentPath)}$`;

  const updateTimestamp = () => {
    if (!timestampEl) return;
    const now = new Date();
    const day = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now);
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(now);
    timestampEl.textContent = `${day} at ${time}`;
  };

  const scrollToBottom = () => {
    output.scrollTop = output.scrollHeight;
  };

  const getCompletion = () => {
    const raw = input.value;
    if (!raw) return '';
    const hasTrailingSpace = /\s$/.test(raw);
    const parts = raw.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    const head = parts[0];
    const firstMatch = (options, seed, sort = false) => {
      const matches = options.filter(option => option.startsWith(seed));
      if (!matches.length) return '';
      if (sort) {
        matches.sort((a, b) => a.localeCompare(b));
      }
      return matches[0] || '';
    };
    if (head === 'cd') {
      const cdMatch = raw.match(/^cd\s+(.+)$/);
      if (!cdMatch) return '';
      const seed = cdMatch[1];
      if (!seed) return '';
      const useBackslash = seed.startsWith('.\\');
      const options = listDirs().map(option => useBackslash ? option.replace(/\//g, '\\') : option);
      const match = firstMatch(options, seed);
      return match ? `cd ${match}` : '';
    }
    if ((head === 'theme' || head === 'bg') && (parts.length > 1 || hasTrailingSpace)) {
      const seed = parts.length > 1 ? parts.slice(1).join(' ') : '';
      const options = head === 'theme' ? listThemes() : listBackgrounds();
      const match = firstMatch(options, seed);
      return match ? `${head} ${match}` : '';
    }
    if (parts.length > 1) return '';
    const commandMatch = firstMatch(Object.keys(commands), head, true);
    if (commandMatch) return commandMatch;
    return firstMatch(Object.keys(aliases), head, true);
  };

  const updateGhost = (value, pos, width) => {
    if (!value || pos !== value.length) {
      ghost.textContent = '';
      return;
    }
    const completion = getCompletion();
    if (!completion || completion === value || !completion.startsWith(value)) {
      ghost.textContent = '';
      return;
    }
    ghost.style.left = `${width}px`;
    ghost.textContent = completion.slice(value.length);
  };

  const updateCaret = () => {
    const value = input.value;
    const pos = typeof input.selectionStart === 'number' ? input.selectionStart : value.length;
    const head = value.slice(0, pos).replace(/ /g, '\u00a0');
    measure.textContent = head;
    const width = measure.getBoundingClientRect().width;
    const caretOffset = 1;
    const ghostOffset = 0;
    const caretHeight = Math.round(input.offsetHeight * 0.8);
    caret.style.left = `${width + caretOffset}px`;
    caret.style.top = `${Math.round((input.offsetHeight - caretHeight) / 2)}px`;
    caret.style.height = `${caretHeight}px`;
    updateGhost(value, pos, width + ghostOffset);
  };

  const addLine = (text, className) => {
    const line = document.createElement('div');
    line.className = className ? `console-line ${className}` : 'console-line';
    line.textContent = text;
    lines.appendChild(line);
    scrollToBottom();
  };

  const addLineParts = (parts, className) => {
    const urlPattern = /https?:\/\/[^\s<>"'`]+/i;
    const line = document.createElement('div');
    line.className = className ? `console-line ${className}` : 'console-line';
    parts.forEach(part => {
      const span = document.createElement('span');
      span.textContent = part.text;
      if (part.className) span.className = part.className;
      if (urlPattern.test(part.text || '')) span.classList.add('console-url');
      line.appendChild(span);
    });
    lines.appendChild(line);
    scrollToBottom();
  };

  const addNodeLine = (node, className) => {
    const line = document.createElement('div');
    line.className = className ? `console-line ${className}` : 'console-line';
    line.appendChild(node);
    lines.appendChild(line);
    scrollToBottom();
    return line;
  };

  const addIndentedLines = (items, className) => {
    items.forEach(item => addLine(`  ${item}`, className));
  };

  const parseAnimationDimension = value => {
    if (value == null || value === '') return null;
    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return null;
    const match = normalized.match(/^(\d{1,5})(?:px)?$/);
    if (!match) return Number.NaN;
    const parsed = Number.parseInt(match[1], 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : Number.NaN;
  };

  const startTrippyAnimation = (requestedWidth = null, requestedHeight = null) => {
    stopConsoleAnimation();

    const container = document.createElement('div');
    container.className = 'console-animation console-animation-trippy';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'trippy-grid-container';

    const canvas = document.createElement('canvas');
    canvas.className = 'trippy-grid';
    canvas.setAttribute('aria-label', 'Terminal animation');

    gridContainer.appendChild(canvas);
    container.appendChild(gridContainer);

    const line = addNodeLine(container, 'console-animation-line');
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      addLine('animation unavailable: canvas is not supported', 'muted');
      line.remove();
      return;
    }

    const charRangeStart = 33;
    const charRangeEnd = 126;
    const charRangeMax = charRangeEnd - charRangeStart;
    const targetFrameMs = 1000 / 30;
    let cellWidth = 10;
    let cellHeight = 10;
    let colCount = 0;
    let rowCount = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let xTerms = new Float32Array(0);
    let yTerms = new Float32Array(0);
    let glyphAtlas = [];
    let palette = [];
    let rafId = 0;
    let lastFrame = 0;
    let stopped = false;

    const getThemePalette = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      const nextPalette = [
        rootStyle.getPropertyValue('--accent').trim(),
        rootStyle.getPropertyValue('--accent-2').trim(),
        rootStyle.getPropertyValue('--text').trim(),
        rootStyle.getPropertyValue('--muted').trim(),
        rootStyle.getPropertyValue('--success').trim(),
        rootStyle.getPropertyValue('--warning').trim()
      ].filter(Boolean);
      return nextPalette.length ? nextPalette : ['#ffffff'];
    };

    const applyRequestedSize = () => {
      const lineWidth = Math.max(1, line.clientWidth);
      const outputHeight = Math.max(1, output.clientHeight);
      const inputHeight = form.offsetHeight || 0;
      const maxWidth = lineWidth;
      const maxHeight = Math.max(80, outputHeight - inputHeight - 12);
      const nextWidth = requestedWidth ? Math.min(requestedWidth, maxWidth) : maxWidth;
      const nextHeight = requestedHeight ? Math.min(requestedHeight, maxHeight) : Math.min(Math.max(145, outputHeight * 0.26), 230, maxHeight);
      gridContainer.style.width = `${Math.floor(nextWidth)}px`;
      gridContainer.style.height = `${Math.floor(nextHeight)}px`;
    };

    const buildGlyphAtlas = font => {
      glyphAtlas = palette.map(color => {
        const colorGlyphs = [];
        for (let code = 0; code < charRangeMax; code += 1) {
          const glyphCanvas = document.createElement('canvas');
          glyphCanvas.width = Math.ceil(cellWidth);
          glyphCanvas.height = Math.ceil(cellHeight);
          const glyphCtx = glyphCanvas.getContext('2d', { alpha: true });
          if (glyphCtx) {
            glyphCtx.font = font;
            glyphCtx.textBaseline = 'top';
            glyphCtx.fillStyle = color;
            glyphCtx.fillText(String.fromCharCode(charRangeStart + code), 0, 0);
          }
          colorGlyphs.push(glyphCanvas);
        }
        return colorGlyphs;
      });
    };

    const updateSize = () => {
      if (stopped) return;

      applyRequestedSize();

      const rect = gridContainer.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const gridStyle = getComputedStyle(canvas);
      const fontSize = parseFloat(gridStyle.fontSize) || 10;
      const lineHeight = parseFloat(gridStyle.lineHeight) || fontSize;
      const font = `${fontSize}px ${gridStyle.fontFamily}`;

      ctx.font = font;
      ctx.textBaseline = 'top';
      cellWidth = Math.max(1, ctx.measureText('M').width);
      cellHeight = Math.max(1, lineHeight);
      colCount = Math.max(1, Math.floor(nextWidth / cellWidth));
      rowCount = Math.max(1, Math.floor(nextHeight / cellHeight));
      canvasWidth = Math.ceil(colCount * cellWidth);
      canvasHeight = Math.ceil(rowCount * cellHeight);

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.imageSmoothingEnabled = false;
      palette = getThemePalette();
      buildGlyphAtlas(font);

      xTerms = new Float32Array(colCount);
      yTerms = new Float32Array(rowCount);
      const cx = Math.floor(colCount / 2);
      const cy = Math.floor(rowCount / 2);
      for (let x = 0; x < colCount; x += 1) xTerms[x] = Math.cos((x - cx) / 8.0);
      for (let y = 0; y < rowCount; y += 1) yTerms[y] = Math.sin((y - cy) / 8.0);

      scrollToBottom();
    };

    const render = ticks => {
      if (stopped || !line.isConnected) return;
      rafId = requestAnimationFrame(render);
      if (ticks - lastFrame < targetFrameMs) return;
      lastFrame = ticks;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const t = 100 + (ticks * 0.001);

      for (let y = 0; y < rowCount; y += 1) {
        const yTerm = yTerms[y];
        const drawY = y * cellHeight;
        for (let x = 0; x < colCount; x += 1) {
          const v = (xTerms[x] + yTerm + t) * 16;
          const charVal = Math.floor(v % charRangeMax);
          const glyphIndex = (charVal + charRangeMax) % charRangeMax;
          const colorIndex = glyphIndex % palette.length;
          ctx.drawImage(glyphAtlas[colorIndex][glyphIndex], x * cellWidth, drawY);
        }
      }
    };

    const resizeObserver = window.ResizeObserver ? new ResizeObserver(updateSize) : null;
    const handleThemeChange = updateSize;
    resizeObserver?.observe(line);
    resizeObserver?.observe(output);
    document.addEventListener('nv:theme-change', handleThemeChange);
    requestAnimationFrame(() => {
      updateSize();
      rafId = requestAnimationFrame(render);
    });

    consoleAnimationCleanup = () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      document.removeEventListener('nv:theme-change', handleThemeChange);
      if (line.isConnected) line.remove();
    };
  };

  const extractFirstUrl = text => {
    if (!text) return null;
    const match = text.match(/https?:\/\/[^\s<>"'`]+/i);
    return match ? match[0] : null;
  };

  const openConsoleUrlFromEvent = event => {
    if (!(event.ctrlKey || event.metaKey)) return false;
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return false;

    const clickable = target.closest('a');
    if (clickable && clickable.getAttribute('href')) return false;

    const span = target.closest('span');
    const line = target.closest('.console-line');
    const url = extractFirstUrl(span?.textContent || '') || extractFirstUrl(line?.textContent || '');
    if (!url) return false;

    event.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  };

  const addKeyValueLines = entries => {
    const width = entries.reduce((max, [key]) => Math.max(max, key.length), 0);
    entries.forEach(([key, value]) => {
      if (!value) {
        addLine(`  ${key}`);
        return;
      }
      addLineParts([
        { text: `  ${key.padEnd(width + 2)}` },
        { text: value, className: 'console-comment' }
      ]);
    });
  };

  const normalizePath = input => (input || '').replace(/\\/g, '/').trim();
  const trimSlashes = value => (value || '').replace(/^\/+|\/+$/g, '');

  const resolvePath = input => {
    if (!input) return rootPath;
    let raw = normalizePath(input);
    if (!raw || raw === '~' || raw === '/' || raw === rootPath) return rootPath;
    if (raw === '.' || raw === './' || raw === '.\\') return currentPath;
    if (raw === '..' || raw.startsWith('../')) return rootPath;
    if (raw.startsWith('~/')) raw = raw.slice(2);
    if (raw.startsWith(`${rootPath}/`)) raw = raw.slice(rootPath.length + 1);
    if (raw.startsWith('./')) raw = raw.slice(2);
    if (raw === 'terminal') return rootPath;
    if (raw.startsWith('terminal/')) raw = raw.slice(9);
    raw = raw.replace(/^\/+/, '');

    const segments = raw.split('/').filter(Boolean);
    if (!segments.length) return rootPath;
    if (segments[0] === 'terminal') return rootPath;

    if (segments[0] === 'docs') {
      const docsTail = trimSlashes(segments.slice(1).join('/'));
      return docsTail ? `${DOCS_ROOT_PATH}/${docsTail}` : DOCS_ROOT_PATH;
    }

    if (segments.length === 1 && ['product', 'projects', 'bin-diff', 'policies'].includes(segments[0])) {
      return `${rootPath}/${segments[0]}`;
    }
    return null;
  };

  const listDirs = () => {
    if (currentPath === rootPath) {
      return ['./product', './projects', './bin-diff', './policies', './docs'];
    }
    return ['..'];
  };

  const NAV_MAP = Object.fromEntries((window.NV_MAIN_ROUTES || [
    { slug: 'terminal', clean: '/' },
    { slug: 'product', clean: '/product' },
    { slug: 'projects', clean: '/projects' },
    { slug: 'bin-diff', clean: '/bin-diff' },
    { slug: 'policies', clean: '/policies' }
  ]).map(route => [route.slug, route.clean]));

  const navigateToPath = nextPath => {
    if (nextPath === DOCS_ROOT_PATH || nextPath.startsWith(`${DOCS_ROOT_PATH}/`)) {
      const docsRelative = nextPath === DOCS_ROOT_PATH ? '' : nextPath.slice(DOCS_ROOT_PATH.length + 1);
      const cleanRelative = trimSlashes(docsRelative);
      const target = cleanRelative ? `docs/${cleanRelative}/` : 'docs/';
      const currentPathname = (location.pathname || '').replace(/^\/+/, '');
      const normalizedCurrent = currentPathname.endsWith('/') ? currentPathname : `${currentPathname}/`;
      if (normalizedCurrent === target) return;
      location.href = target;
      return;
    }

    const segment = nextPath === rootPath ? 'terminal' : nextPath.split('/').pop();
    const target = NAV_MAP[segment];
    if (!target) return;
    const currentPath = location.pathname.replace(/\/+$/g, '') || '/';
    if (currentPath === target) return;
    loadPage(target);
  };

  const aliases = Object.freeze({
    h: 'help',
    '?': 'help',
    usage: 'help',
    cmds: 'help',
    commands: 'help',
    cls: 'clear',
    dir: 'ls',
    ll: 'ls',
    la: 'ls',
    terminal: 'cd terminal',
    cprod: 'cd product',
    cproj: 'cd projects',
    cbindiff: 'cd bin-diff',
    cpolicies: 'cd policies',
    cdocs: 'cd docs',
    cabout: 'about',
    quit: 'exit',
    '..': 'cd ..'
  });

  const expandAlias = input => {
    const parts = input.trim().split(/\s+/);
    const key = parts[0];
    const expansion = aliases[key];
    if (!expansion) return input;
    const rest = parts.slice(1).join(' ');
    return rest ? `${expansion} ${rest}` : expansion;
  };

  const listThemes = () => {
    const select = document.getElementById('theme-select');
    if (!select) return [];
    return Array.from(select.options).map(option => option.value);
  };

  const listBackgrounds = () => {
    const select = document.getElementById('bg-select');
    if (!select) return [];
    return Array.from(select.options).map(option => option.value);
  };

  const commands = {
    help: () => {
      addLine('commands:');
      const entries = [
        ['help', 'show this help message'],
        ['about', 'about me + links'],
        ['contact', 'email + discord'],
        ['product', 'winconfig information'],
        ['projects', 'list projects with repo links'],
        ['docs', 'documentation sections'],
        ['bindiff', 'list decompiled-pseudocode links (used by bin-diff section)'],
        ['policies', 'list ADMX parser links (used by policies section)'],
        ['ls', 'list available directories'],
        ['cd <path>', 'change directory (./product, ./projects, ./bin-diff, ./policies, ./docs/<projectname>, ../)'],
        ['alias', 'list built-in aliases'],
        ['bg', 'list background ids'],
        ['bg <id>', 'set background'],
        ['themes', 'list theme ids'],
        ['theme <id>', 'set theme'],
        ['ascii', 'print the banner'],
        ['animation [x y]', 'some cool animation (x/y = pixels)'],
        ['clear', 'clear the terminal'],
        ['exit', 'exit (hide) terminal, reverted on site refresh']
      ];
      const width = entries.reduce((max, [cmd]) => Math.max(max, cmd.length), 0);
      entries.forEach(([cmd, desc]) => {
        addLineParts([
          { text: `  ${cmd.padEnd(width + 2)}` },
          { text: desc, className: 'console-comment' }
        ]);
      });
    },
    about: () => {
      addLine('about:');
      addKeyValueLines([
        ['name', 'nohuto (Discord: ".nohuto", 836853057235976232)'],
        ['proprietor', 'Noverse'],
        ['github', 'https://github.com/nohuto'],
        ['youtube', 'https://www.youtube.com/@5Noverse'],
        ['discord', 'https://discord.noverse.dev']
      ]);
    },
    product: () => {
      addLine('product: winconfig');
      addKeyValueLines([
        ['price', '9.99 EUR (lifetime)'],
        ['includes updates + discord role']
      ]);
      addLine('features:');
      addIndentedLines([
        'transparent execution logs',
        'dynamic state detection',
        'per-option documentation (cd ./docs/win-config)',
        'extensive customization controls'
      ]);
      addLine('terms:');
      addKeyValueLines([
        ['data privacy', 'hardware identifiers only for licensing'],
        ['usage', 'personal license only, no resale'],
        ['refunds', 'only before registration/role assignment'],
        ['license', 'hardware-bound']
      ]);
    },
    docs: () => {
      addLine('sections:');
      addKeyValueLines([
        ['overview', 'docs/'],
        ['winconfig', 'docs/win-config/'],
        ['system', 'docs/win-config/system/'],
        ['visibility', 'docs/win-config/visibility/'],
        ['peripheral', 'docs/win-config/peripheral/'],
        ['power', 'docs/win-config/power/'],
        ['privacy', 'docs/win-config/privacy/'],
        ['network', 'docs/win-config/network/'],
        ['security', 'docs/win-config/security/'],
        ['nvidia', 'docs/win-config/nvidia/'],
        ['misc', 'docs/win-config/misc/'],
        ['policies', 'docs/win-config/policies/'],
        ['affinities', 'docs/win-config/affinities/'],
        ['regkit', 'docs/regkit/'],
        ['app-guides', 'docs/app-guides/'],
      ]);
    },
    bindiff: () => {
      addLine('decompiled-pseudocode folders:');
      const items = [{
        release: 'repo',
        link: 'https://github.com/nohuto/decompiled-pseudocode'
      }].concat(BIN_DIFF_RELEASE_LINKS.map(link => ({
        release: decodeURIComponent((link.split('/').pop() || '').trim()),
        link
      })));
      const width = items.reduce((max, item) => Math.max(max, item.release.length), 0);
      items.forEach(item => {
        addLineParts([
          { text: `  ${item.release.padEnd(width + 2)}` },
          { text: item.link, className: 'console-comment' }
        ]);
      });
    },
    policies: () => {
      addLine('admx-parser:');
      addKeyValueLines([
        ['repo', 'https://github.com/nohuto/admx-parser'],
        ['policies.json', 'https://raw.githubusercontent.com/nohuto/admx-parser/main/assets/policies.json'],
        ['policies.yaml', 'https://raw.githubusercontent.com/nohuto/admx-parser/main/assets/policies.yaml'],
        ['policyCategories.json', 'https://raw.githubusercontent.com/nohuto/admx-parser/main/assets/policyCategories.json']
      ]);
    },
    contact: () => {
      addLine('contact:');
      addKeyValueLines([
        ['email', 'use the footer icon to copy'],
        ['discord', 'https://discord.noverse.dev']
      ]);
    },
    ascii: () => {
      ASCII_ART.forEach(line => addLine(line, 'art'));
    },
    ls: () => {
      const entries = listDirs();
      if (!entries.length) {
        addLine('empty', 'muted');
        return;
      }
      addLine(entries.join('  '), 'muted');
    },
    pwd: () => {
      addLine(formatDisplayPath(currentPath));
    },
    cd: args => {
      const target = args.join(' ');
      const nextPath = resolvePath(target);
      if (!nextPath) {
        addLine(`cd: no such directory: ${target || ''}`.trim(), 'muted');
        return;
      }
      currentPath = nextPath;
      updatePrompt();
      navigateToPath(nextPath);
    },
    alias: args => {
      const raw = args.join(' ').trim();
      if (raw) {
        addLine('custom aliases are disabled, only preconfigured aliases are available.', 'muted');
      }
      addLine('aliases:', 'muted');
      const entries = Object.entries(aliases);
      const width = entries.reduce((max, [name]) => Math.max(max, name.length), 0);
      entries.forEach(([name, value]) => {
        addLineParts([
          { text: `  ${name.padEnd(width + 2)}` },
          { text: value, className: 'console-comment' }
        ]);
      });
    },
    themes: () => {
      addLine('themes:', 'muted');
      addIndentedLines(listThemes());
    },
    bg: args => {
      const select = document.getElementById('bg-select');
      if (!select) return;
      if (!args.length) {
        addLine(`current bg: ${select.value}`);
        addLine('backgrounds:', 'muted');
        addIndentedLines(listBackgrounds());
        return;
      }
      const next = args.join(' ').trim();
      if (!hasSelectOption(select, next)) {
        addLine(`bg not found: ${next}`, 'muted');
        return;
      }
      select.value = next;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      addLine(`bg set: ${next}`);
    },
    theme: args => {
      const select = document.getElementById('theme-select');
      if (!select) return;
      if (!args.length) {
        addLine(`current theme: ${select.value}`);
        return;
      }
      const next = args.join(' ').trim();
      if (!hasSelectOption(select, next)) {
        addLine(`theme not found: ${next}`, 'muted');
        return;
      }
      select.value = next;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      addLine(`theme set: ${next}`);
    },
    animation: args => {
      const requestedWidth = parseAnimationDimension(args[0]);
      const requestedHeight = parseAnimationDimension(args[1]);
      if (Number.isNaN(requestedWidth) || Number.isNaN(requestedHeight) || args.length > 2) {
        addLine('usage: animation [width] [height]', 'muted');
        addLine('example: animation 900 180', 'muted');
        return;
      }
      addLine('animation', 'muted');
      startTrippyAnimation(requestedWidth, requestedHeight);
    },
    clear: () => {
      stopConsoleAnimation();
      lines.replaceChildren();
      scrollToBottom();
    },
    exit: () => {
      stopConsoleAnimation();
      terminalExited = true;
      applyTerminalExitState();
      loadPage('/projects');
    },
    projects: () => {
      addLine('projects:');
      const items = PROJECT_LIST.map(project => ({
        title: project.title,
        link: `https://github.com/${project.repo}`
      }));
      const width = items.reduce((max, item) => Math.max(max, item.title.length), 0);
      items.forEach(item => {
        addLineParts([
          { text: `  ${item.title.padEnd(width + 2)}` },
          { text: item.link, className: 'console-comment' }
        ]);
      });
    }
  };

  const runCommand = async raw => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    addLineParts([
      { text: `${promptLabel()} `, className: 'console-prompt-text' },
      { text: trimmed, className: 'console-muted' }
    ]);
    const expanded = expandAlias(trimmed);
    const parts = expanded.split(' ').filter(Boolean);
    const command = parts.shift().toLowerCase();
    const handler = commands[command];
    if (!handler) {
      addLine(`unknown command: ${command}`, 'muted');
      addLine('type "help" to list commands.', 'muted');
      return;
    }
    await handler(parts);
  };

  const autocomplete = () => {
    const completion = getCompletion();
    if (!completion) return;
    input.value = completion;
    updateCaret();
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const value = input.value;
    if (value.trim()) {
      consoleHistory.push(value);
      consoleHistoryIndex = consoleHistory.length;
    }
    input.value = '';
    updateCaret();
    await runCommand(value);
    scrollToBottom();
  });

  ['input', 'keyup', 'click', 'focus'].forEach(eventName => {
    input.addEventListener(eventName, updateCaret);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Tab' || e.key === 'ArrowRight') {
      if (e.key === 'ArrowRight') {
        const value = input.value;
        const pos = typeof input.selectionStart === 'number' ? input.selectionStart : value.length;
        const completion = getCompletion();
        const canApply =
          pos === value.length &&
          completion &&
          completion !== value &&
          completion.startsWith(value);
        if (!canApply) return;
      }
      e.preventDefault();
      autocomplete();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (consoleHistory.length === 0) return;
      consoleHistoryIndex = Math.max(0, consoleHistoryIndex - 1);
      input.value = consoleHistory[consoleHistoryIndex] || '';
      updateCaret();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (consoleHistory.length === 0) return;
      consoleHistoryIndex = Math.min(consoleHistory.length, consoleHistoryIndex + 1);
      input.value = consoleHistory[consoleHistoryIndex] || '';
      updateCaret();
    }
  });

  output.addEventListener('click', event => {
    if (openConsoleUrlFromEvent(event)) return;
    input.focus();
  });

  if (!consoleFocusListener) {
    consoleFocusListener = e => {
      const activeInput = document.getElementById('console-command');
      if (!activeInput) return;
      const target = e.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.tagName === 'BUTTON' || target.isContentEditable)) {
        return;
      }
      activeInput.focus({ preventScroll: true });
    };
    document.addEventListener('keydown', consoleFocusListener);
  }

  updatePrompt();
  updateTimestamp();
  if (consoleTimestampTimer) {
    clearInterval(consoleTimestampTimer);
  }
  consoleTimestampTimer = setInterval(updateTimestamp, 60000);

  input.focus();
  updateCaret();

  ASCII_ART.forEach(line => addLine(line, 'art'));
  addLine(' ');
  addLine('Welcome to the terminal, use Tab or Right Arrow for autocompletion (CTRL + mouse click opens links).', 'muted');
  addLine('Use the top sections to navigate if the terminal feels unfamiliar.', 'muted');
  addLine(' ');
  commands.help();
}
  global.stopConsoleAnimation = stopConsoleAnimation;
  global.initConsole = initConsole;
})(window);
