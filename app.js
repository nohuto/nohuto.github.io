/* Copyright (c) 2026 Nohuto. All rights reserved. */
const THEME_KEY = 'nv-theme';
const DEFAULT_THEME = 'default-dark';
const BG_KEY = 'nv-bg';
const DEFAULT_BG = 'topo-trace';
const BG_OPTIONS = [
  'data-tape',
  'hex-matrix',
  'signal-rails',
  'circuit-loom',
  'phase-noise',
  'mono-shards',
  'topo-trace',
  'quasar-mesh'
];
const FONT_KEY = 'nv-font';
const FONT_SIZE_KEY = 'nv-font-size';
const DEFAULT_FONT = 'cascadia';
const DEFAULT_FONT_SIZE = 14;
const FONT_KEYS = ['cascadia', 'jetbrains', 'fira', 'ibm', 'sourcecode', 'consolas'];
const FONT_SET = new Set(FONT_KEYS);
const REPO_DESC_URL = 'data/repos.json';
const PROJECT_LIST = [
  { title: 'Windows Configuration', repo: 'nohuto/win-config' },
  { title: 'AES CBC Encryption', repo: 'nohuto/aes-cbc' },
  { title: 'Bitmask Calculator', repo: 'nohuto/bitmask-calc' },
  { title: 'Blocklist Manager', repo: 'nohuto/blocklist-mgr' },
  { title: 'Component Manager', repo: 'nohuto/comp-mgr' },
  { title: 'App Configuration Tools', repo: 'nohuto/app-tools' },
  { title: 'Game Configuration Tools', repo: 'nohuto/game-tools' },
  { title: 'Symbols Memory Dump', repo: 'nohuto/sym-dump' },
  { title: 'NVFetch', repo: 'nohuto/nvfetch' },
  { title: 'Void Obfuscation', repo: 'nohuto/void' },
  { title: 'PowerShell Minifier', repo: 'nohuto/minifier' },
  { title: 'PS12bat', repo: 'nohuto/ps12bat' },
  { title: 'WPR/Procmon Registry Activity Records', repo: 'nohuto/wpr-reg-records' },
  { title: 'Base64 Encoding / Character Obfuscation', repo: 'nohuto/b64-char' },
  { title: 'ADMX Parser', repo: 'nohuto/admx-parser' },
  { title: 'Hash Generator', repo: 'nohuto/hash-gen' },
  { title: 'strings2 TUI', repo: 'nohuto/strings2-tui' },
  { title: 'Base64 Reversal & Character Obfuscation', repo: 'nohuto/b64rev' },
  { title: 'DISM WSIM', repo: 'nohuto/dism-wsim' },
  { title: 'reg2bat', repo: 'nohuto/reg2bat' },
  { title: 'PBO2 UV Guide', repo: 'nohuto/pbo2-uv' },
  { title: 'GPU OC/UV Guide', repo: 'nohuto/gpu-oc-uv' }
];

let toastTimer;
let consoleHistory = [];
let consoleHistoryIndex = -1;
let consoleTimestampTimer;
let consoleFocusListener;
let consoleResizeHandler;
let consoleResizeObserver;
let repoDescriptionsPromise;

const ASCII_ART = [
  '  \\  |                                    ',
  '   \\ |   _ \\ \\ \\   /  _ \\   __|  __|   _ \\',
  ' |\\  |  (   | \\ \\ /   __/  |   \\__ \\   __/',
  '_| \\_| \\___/   \\_/  \\___| _|   ____/ \\___|'
];

const storageGet = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const storageSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch { }
};

const hasSelectOption = (select, value) => Array.from(select.options).some(option => option.value === value);

function setActive(href) {
  document.querySelectorAll('.nav-tabs a').forEach(a => {
    const isActive = a.getAttribute('href') === href;
    a.classList.toggle('active', isActive);
    if (isActive) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

function applyTheme(theme) {
  const applied = theme || DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', applied);
  return applied;
}

function initTheme() {
  const select = document.getElementById('theme-select');
  if (!select) return;

  const stored = storageGet(THEME_KEY, document.documentElement.getAttribute('data-theme') || DEFAULT_THEME);
  const initial = hasSelectOption(select, stored) ? stored : DEFAULT_THEME;
  applyTheme(initial);
  select.value = initial;

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_THEME;
    applyTheme(next);
    storageSet(THEME_KEY, next);
  });
}

function applyBackground(bg) {
  const candidate = bg || DEFAULT_BG;
  const applied = BG_OPTIONS.includes(candidate) ? candidate : DEFAULT_BG;
  document.documentElement.setAttribute('data-bg', applied);
  return applied;
}

function initBackground() {
  const select = document.getElementById('bg-select');
  if (!select) return;

  const stored = storageGet(BG_KEY, document.documentElement.getAttribute('data-bg') || DEFAULT_BG);
  const initial = BG_OPTIONS.includes(stored) ? stored : DEFAULT_BG;
  applyBackground(initial);
  select.value = initial;

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_BG;
    applyBackground(next);
    storageSet(BG_KEY, next);
  });
}

function applyFont(key) {
  const applied = FONT_SET.has(key) ? key : DEFAULT_FONT;
  document.documentElement.setAttribute('data-font', applied);
  document.documentElement.style.removeProperty('--font-family');
  return applied;
}

function applyFontSize(size) {
  const parsed = Number.parseInt(size, 10);
  const safe = Number.isFinite(parsed)
    ? Math.min(22, Math.max(12, parsed))
    : DEFAULT_FONT_SIZE;
  document.documentElement.style.setProperty('--font-size', safe + 'px');
  return safe;
}

function initTypography() {
  const fontSelect = document.getElementById('font-select');
  const sizeInput = document.getElementById('font-size');
  const stepButtons = document.querySelectorAll('.size-step');
  if (!fontSelect && !sizeInput) return;

  const storedFont = storageGet(FONT_KEY, DEFAULT_FONT);
  const appliedFont = applyFont(storedFont);
  if (fontSelect) {
    fontSelect.value = hasSelectOption(fontSelect, appliedFont) ? appliedFont : DEFAULT_FONT;
  }

  const storedSize = storageGet(FONT_SIZE_KEY, DEFAULT_FONT_SIZE);
  const appliedSize = applyFontSize(storedSize);
  if (sizeInput) {
    sizeInput.value = appliedSize;
  }

  if (fontSelect) {
    fontSelect.addEventListener('change', () => {
      const next = fontSelect.value || DEFAULT_FONT;
      applyFont(next);
      storageSet(FONT_KEY, next);
    });
  }

  if (sizeInput) {
    sizeInput.addEventListener('input', () => {
      const applied = applyFontSize(sizeInput.value);
      sizeInput.value = applied;
      storageSet(FONT_SIZE_KEY, applied + 'px');
    });
  }

  stepButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!sizeInput) return;
      const delta = Number.parseInt(button.dataset.step, 10) || 0;
      const nextValue = Number.parseInt(sizeInput.value || DEFAULT_FONT_SIZE, 10) + delta;
      const applied = applyFontSize(nextValue);
      sizeInput.value = applied;
      storageSet(FONT_SIZE_KEY, applied + 'px');
    });
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  textarea.remove();
  return ok;
}

function initClipboard() {
  document.addEventListener('click', async e => {
    const target = e.target.closest('[data-copy]');
    if (!target) return;
    const text = target.getAttribute('data-copy');
    if (!text) return;
    e.preventDefault();
    let ok = false;
    try {
      ok = await copyText(text);
    } catch {
      ok = false;
    }
    const message = target.getAttribute('data-toast') || (ok ? 'Copied.' : 'Copy failed.');
    showToast(message);
  });
}

async function loadPage(url, push = true) {
  const main = document.querySelector('main');
  try {
    main.classList.add('fading');
    const res = await fetch(url, { credentials: 'same-origin' });
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');
    if (!newMain) throw new Error('No main element in response');
    const newTitle = doc.querySelector('title')?.textContent || document.title;
    newMain.classList.add('fading');

    setTimeout(() => {
      main.replaceWith(newMain);
      document.title = newTitle;
      setActive(new URL(url, location.href).pathname.split('/').pop() || 'index.html');
      initRepoDescriptions();
      initFiltering();
      initConsole();
      requestAnimationFrame(() => newMain.classList.remove('fading'));
    }, 180);

    if (push) history.pushState({ url }, '', url);
  } catch {
    main.classList.remove('fading');
    location.href = url;
  }
}

document.addEventListener('click', e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest('a');
  const href = a?.getAttribute('href');
  if (a && href && href.endsWith('.html') && a.origin === location.origin) {
    const targetPath = new URL(href, location.href).pathname;
    if (targetPath === location.pathname) return;
    e.preventDefault();
    loadPage(href);
  }
});

window.addEventListener('popstate', e => {
  const url = e.state?.url || location.pathname.split('/').pop() || 'index.html';
  loadPage(url, false);
});

const loadRepoDescriptions = () => {
  if (repoDescriptionsPromise) return repoDescriptionsPromise;
  repoDescriptionsPromise = fetch(REPO_DESC_URL, { cache: 'force-cache' })
    .then(res => (res.ok ? res.json() : {}))
    .catch(() => ({}));
  return repoDescriptionsPromise;
};

async function getRepoDescription(repo) {
  if (!repo || !repo.includes('/')) return 'No description yet.';
  const data = await loadRepoDescriptions();
  const desc = Object.prototype.hasOwnProperty.call(data, repo) ? data[repo] : '';
  return desc && desc.trim() ? desc.trim() : 'No description yet.';
}

function initRepoDescriptions() {
  const cards = document.querySelectorAll('.project-card[data-repo]');
  if (!cards.length) return;
  cards.forEach(card => {
    const repo = card.getAttribute('data-repo');
    const descEl = card.querySelector('.project-desc');
    if (!repo || !descEl) return;
    getRepoDescription(repo).then(desc => {
      descEl.textContent = desc;
    });
  });
}

function initFiltering() {
  const searchInput = document.getElementById('project-search');
  const tagButtons = Array.from(document.querySelectorAll('.tag-filter button'));
  const cards = Array.from(document.querySelectorAll('.project-card'));

  if (!searchInput || tagButtons.length === 0 || cards.length === 0) return;

  const cardData = cards.map(card => {
    const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
    const descEl = card.querySelector('.project-desc');
    const tags = (card.dataset.tags || '')
      .toLowerCase()
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
    return { card, title, descEl, tags };
  });

  const applyFilter = () => {
    const search = searchInput.value.trim().toLowerCase();
    const activeTags = tagButtons
      .filter(btn => btn.classList.contains('active'))
      .map(btn => (btn.dataset.tag || btn.textContent || '').toLowerCase());

    cardData.forEach(({ card, title, descEl, tags }) => {
      const desc = (descEl?.textContent || '').toLowerCase();
      const matchesSearch = !search || title.includes(search) || desc.includes(search);
      const matchesTags = activeTags.length === 0 || activeTags.some(tag => tags.includes(tag));
      card.style.display = matchesSearch && matchesTags ? '' : 'none';
    });
  };

  searchInput.addEventListener('input', applyFilter);
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilter();
    });
  });

  applyFilter();
}

function initConsoleWindow() {
  const windowEl = document.getElementById('console-window');
  const handle = document.getElementById('console-drag');
  if (!windowEl || !handle) return;
  if (windowEl.dataset.ready === 'true') return;
  windowEl.dataset.ready = 'true';

  const parent = windowEl.parentElement;

  const centerWindow = () => {
    if (windowEl.dataset.positioned === 'true') return;
    const parentRect = parent.getBoundingClientRect();
    const width = windowEl.offsetWidth;
    const height = windowEl.offsetHeight;
    const left = Math.max(0, (parentRect.width - width) / 2);
    const top = Math.max(0, (parentRect.height - height) / 2);
    windowEl.style.left = `${left}px`;
    windowEl.style.top = `${top}px`;
    windowEl.dataset.positioned = 'true';
  };

  const clampPosition = () => {
    const parentRect = parent.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    const maxLeft = Math.max(0, parentRect.width - rect.width);
    const maxTop = Math.max(0, parentRect.height - rect.height);
    const currentLeft = windowEl.offsetLeft;
    const currentTop = windowEl.offsetTop;
    windowEl.style.left = `${Math.min(Math.max(0, currentLeft), maxLeft)}px`;
    windowEl.style.top = `${Math.min(Math.max(0, currentTop), maxTop)}px`;
  };

  requestAnimationFrame(() => {
    centerWindow();
    clampPosition();
  });

  if (consoleResizeObserver) {
    consoleResizeObserver.disconnect();
    consoleResizeObserver = null;
  }
  if (window.ResizeObserver) {
    consoleResizeObserver = new ResizeObserver(() => clampPosition());
    consoleResizeObserver.observe(windowEl);
  }

  if (consoleResizeHandler) {
    window.removeEventListener('resize', consoleResizeHandler);
  }
  consoleResizeHandler = clampPosition;
  window.addEventListener('resize', consoleResizeHandler);

  handle.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = windowEl.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = rect.left - parentRect.left;
    const startTop = rect.top - parentRect.top;

    handle.setPointerCapture(e.pointerId);

    const onMove = ev => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const maxLeft = Math.max(0, parentRect.width - windowEl.offsetWidth);
      const maxTop = Math.max(0, parentRect.height - windowEl.offsetHeight);
      const nextLeft = Math.min(Math.max(0, startLeft + dx), maxLeft);
      const nextTop = Math.min(Math.max(0, startTop + dy), maxTop);
      windowEl.style.left = `${nextLeft}px`;
      windowEl.style.top = `${nextTop}px`;
    };

    const onUp = () => {
      handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      clampPosition();
    };

    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
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
  if (!consoleRoot || !output || !lines || !form || !input || !caret || !measure) return;
  if (consoleRoot.dataset.ready === 'true') return;
  consoleRoot.dataset.ready = 'true';

  initConsoleWindow();

  const promptUser = 'nohuto';
  const promptHost = 'noverse';
  const rootPath = '~/site';
  let currentPath = rootPath;
  const promptEl = consoleRoot.querySelector('.console-prompt');
  const timestampEl = document.getElementById('console-timestamp');

  const updatePrompt = () => {
    if (promptEl) {
      promptEl.textContent = `${promptUser}@${promptHost}:${currentPath}$`;
    }
  };

  const promptLabel = () => `${promptUser}@${promptHost}:${currentPath}$`;

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

  const updateCaret = () => {
    const value = input.value;
    const pos = typeof input.selectionStart === 'number' ? input.selectionStart : value.length;
    const head = value.slice(0, pos).replace(/ /g, '\u00a0');
    measure.textContent = head;
    const width = measure.getBoundingClientRect().width;
    caret.style.left = `${width}px`;
    caret.style.height = `${input.offsetHeight}px`;
  };

  const addLine = (text, className) => {
    const line = document.createElement('div');
    line.className = className ? `console-line ${className}` : 'console-line';
    line.textContent = text;
    lines.appendChild(line);
    scrollToBottom();
  };

  const addLineParts = (parts, className) => {
    const line = document.createElement('div');
    line.className = className ? `console-line ${className}` : 'console-line';
    parts.forEach(part => {
      const span = document.createElement('span');
      span.textContent = part.text;
      if (part.className) span.className = part.className;
      line.appendChild(span);
    });
    lines.appendChild(line);
    scrollToBottom();
  };

  const addBlock = items => {
    items.forEach(item => addLine(item));
  };

  const addIndentedLines = (items, className) => {
    items.forEach(item => addLine(`  ${item}`, className));
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

  const resolvePath = input => {
    if (!input) return rootPath;
    let raw = normalizePath(input);
    if (!raw || raw === '~' || raw === '/' || raw === rootPath) return rootPath;
    if (raw === '.' || raw === './' || raw === '.\\') return currentPath;
    if (raw === '..' || raw.startsWith('../')) return rootPath;
    if (raw.startsWith('~/')) raw = raw.slice(2);
    if (raw.startsWith('./')) raw = raw.slice(2);
    if (raw.startsWith('site/')) raw = raw.slice(5);
    raw = raw.split('/').filter(Boolean).pop() || '';
    if (raw === 'home') return rootPath;
    if (['product', 'projects', 'about', 'security'].includes(raw)) {
      return `${rootPath}/${raw}`;
    }
    return null;
  };

  const listDirs = () => {
    if (currentPath === rootPath) {
      return ['./product', './projects', './about', './security'];
    }
    return ['..'];
  };

  const NAV_MAP = {
    home: 'index.html',
    product: 'product.html',
    projects: 'projects.html',
    about: 'about.html',
    security: 'security.html'
  };

  const navigateToPath = nextPath => {
    const segment = nextPath === rootPath ? 'home' : nextPath.split('/').pop();
    const target = NAV_MAP[segment];
    if (!target) return;
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    if (currentPage === target) return;
    loadPage(target);
  };

  const defaultAliases = {
    h: 'help',
    '?': 'help',
    cls: 'clear',
    dir: 'ls',
    ll: 'ls',
    la: 'ls',
    home: 'cd home',
    cprod: 'cd product',
    cproj: 'cd projects',
    cabout: 'cd about',
    '..': 'cd ..'
  };
  const aliases = { ...defaultAliases };

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

  const listFonts = () => FONT_KEYS;

  const commands = {
    help: () => {
      addLine('available commands:');
      const entries = [
        ['help', 'show this help message'],
        ['about', 'about me + links'],
        ['product', 'winconfig summary + pricing'],
        ['docs', 'documentation sections'],
        ['toolkit', 'external tools list'],
        ['projects', 'list projects with repo descriptions'],
        ['security', 'security + privacy statement'],
        ['terms', 'terms of service summary'],
        ['contact', 'email + discord'],
        ['ascii', 'print the banner'],
        ['ls', 'list available directories'],
        ['pwd', 'show current directory'],
        ['cd <path>', 'change directory (./product, ../)'],
        ['alias', 'list aliases'],
        ['alias name=command', 'set alias'],
        ['unalias <name>', 'remove alias'],
        ['themes', 'list theme ids'],
        ['theme <id>', 'set theme'],
        ['fonts', 'list font ids'],
        ['font <id>', 'set font'],
        ['fontsize <12-22>', 'set size'],
        ['clear', 'clear the terminal']
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
        ['proprietor', 'Noverse'],
        ['github', 'https://github.com/nohuto'],
        ['youtube', 'https://www.youtube.com/@5Noverse'],
        ['discord', 'https://discord.gg/E2ybG4j9jU']
      ]);
    },
    security: () => {
      addLine('security:');
      addIndentedLines([
        'CSP, referrer policy, permissions policy',
        'clickjacking blocked via frame-ancestors',
        'includes privacy notes'
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
        'per-option documentation',
        'extensive customization controls'
      ]);
    },
    docs: () => {
      addLine('documentation sections:');
      addIndentedLines([
        'system, visibility, peripheral, power, privacy, security',
        'network, nvidia, cleanup, misc, policies, affinities'
      ]);
    },
    toolkit: () => {
      addLine('external tools:');
      addIndentedLines([
        'app tools',
        'game tools',
        'component manager',
        'blocklist manager',
        'bitmask calculator'
      ]);
    },
    terms: () => {
      addLine('terms:');
      addKeyValueLines([
        ['data privacy', 'hardware identifiers only for licensing'],
        ['usage', 'personal license only, no resale'],
        ['refunds', 'only before registration/role assignment'],
        ['license', 'hardware-bound, manual validation'],
        ['after purchase', 'discord role assignment required']
      ]);
    },
    contact: () => {
      addLine('contact:');
      addKeyValueLines([
        ['email', 'nohuto@duck.com (use footer icon)'],
        ['discord', 'https://discord.gg/E2ybG4j9jU']
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
      addLine(currentPath);
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
      if (!raw) {
        addLine('aliases:', 'muted');
        const entries = Object.entries(aliases);
        const width = entries.reduce((max, [name]) => Math.max(max, name.length), 0);
        entries.forEach(([name, value]) => {
          addLineParts([
            { text: `  ${name.padEnd(width + 2)}` },
            { text: value, className: 'console-comment' }
          ]);
        });
        return;
      }
      const match = raw.match(/^([\\w?.-]+)=(.+)$/);
      if (!match) {
        addLine('usage: alias name=command', 'muted');
        return;
      }
      const name = match[1];
      const value = match[2].trim();
      if (!value) {
        addLine('alias target required', 'muted');
        return;
      }
      aliases[name] = value;
      addLine(`alias set: ${name}=${value}`);
    },
    unalias: args => {
      const name = args[0];
      if (!name) {
        addLine('usage: unalias name', 'muted');
        return;
      }
      if (!aliases[name]) {
        addLine(`alias not found: ${name}`, 'muted');
        return;
      }
      delete aliases[name];
      addLine(`alias removed: ${name}`);
    },
    themes: () => {
      addLine('themes:', 'muted');
      addIndentedLines(listThemes());
    },
    fonts: () => {
      addLine('fonts:', 'muted');
      addIndentedLines(listFonts());
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
      applyTheme(next);
      storageSet(THEME_KEY, next);
      addLine(`theme set: ${next}`);
    },
    font: args => {
      const select = document.getElementById('font-select');
      if (!select) return;
      if (!args.length) {
        addLine(`current font: ${select.value}`);
        return;
      }
      const next = args.join(' ').trim();
      if (!FONT_SET.has(next)) {
        addLine(`font not found: ${next}`, 'muted');
        return;
      }
      select.value = next;
      applyFont(next);
      storageSet(FONT_KEY, next);
      addLine(`font set: ${next}`);
    },
    fontsize: args => {
      const sizeInput = document.getElementById('font-size');
      if (!sizeInput) return;
      if (!args.length) {
        addLine(`current size: ${sizeInput.value}px`);
        return;
      }
      const applied = applyFontSize(args[0]);
      sizeInput.value = applied;
      storageSet(FONT_SIZE_KEY, applied + 'px');
      addLine(`size set: ${applied}px`);
    },
    clear: () => {
      lines.innerHTML = '';
      scrollToBottom();
    },
    projects: async () => {
      addLine('projects: fetching descriptions...', 'muted');
      const items = await Promise.all(PROJECT_LIST.map(async project => {
        const desc = await getRepoDescription(project.repo);
        return { title: project.title, desc };
      }));
      const width = items.reduce((max, item) => Math.max(max, item.title.length), 0);
      items.forEach(item => {
        addLineParts([
          { text: `  ${item.title.padEnd(width + 2)}` },
          { text: item.desc || 'No description yet.', className: 'console-comment' }
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
    const value = input.value.trim();
    if (!value) return;
    const parts = value.split(' ');
    if (parts.length > 1 && parts[0] === 'theme') {
      const seed = parts.slice(1).join(' ');
      const options = listThemes().filter(theme => theme.startsWith(seed));
      if (options.length === 1) {
        input.value = `theme ${options[0]}`;
        updateCaret();
      } else if (options.length > 1) {
        addLine(options.join('  '), 'muted');
      }
      return;
    }
    if (parts.length > 1 && parts[0] === 'font') {
      const seed = parts.slice(1).join(' ');
      const options = listFonts().filter(font => font.startsWith(seed));
      if (options.length === 1) {
        input.value = `font ${options[0]}`;
        updateCaret();
      } else if (options.length > 1) {
        addLine(options.join('  '), 'muted');
      }
      return;
    }
    const commandPool = Array.from(new Set([...Object.keys(commands), ...Object.keys(aliases)]));
    const matches = commandPool.filter(cmd => cmd.startsWith(value));
    if (matches.length === 1) {
      input.value = matches[0];
      updateCaret();
    } else if (matches.length > 1) {
      addLine(matches.join('  '), 'muted');
    }
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
    if (e.key === 'Tab') {
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

  output.addEventListener('click', () => {
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
  addLine('welcome to the terminal, use Tab for autocompletion.', 'muted');
  addLine('use the top sections to navigate if the terminal feels unfamiliar.', 'muted');
  addLine(' ');
  commands.help();
}

document.addEventListener('DOMContentLoaded', () => {
  setActive(location.pathname.split('/').pop() || 'index.html');
  initTheme();
  initBackground();
  initTypography();
  initRepoDescriptions();
  initFiltering();
  initClipboard();
  initConsole();
});
