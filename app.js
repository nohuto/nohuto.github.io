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
const FONT_MAP = {
  cascadia: '"Cascadia Mono", "Cascadia Code", Consolas, "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace',
  jetbrains: '"JetBrains Mono", "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace',
  fira: '"Fira Code", "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace',
  ibm: '"IBM Plex Mono", "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace',
  sourcecode: '"Source Code Pro", "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace',
  consolas: 'Consolas, "Cascadia Mono", "SFMono-Regular", Menlo, Monaco, "Liberation Mono", monospace'
};
const PROJECT_LIST = [
  { title: 'Windows Configuration', repo: '5Noxi/win-config' },
  { title: 'AES CBC Encryption', repo: '5Noxi/aes-cbc' },
  { title: 'Bitmask Calculator', repo: '5Noxi/bitmask-calc' },
  { title: 'Blocklist Manager', repo: '5Noxi/blocklist-mgr' },
  { title: 'Component Manager', repo: '5Noxi/comp-mgr' },
  { title: 'App Configuration Tools', repo: '5Noxi/app-tools' },
  { title: 'Game Configuration Tools', repo: '5Noxi/game-tools' },
  { title: 'Symbols Memory Dump', repo: '5Noxi/sym-dump' },
  { title: 'NVFetch', repo: '5Noxi/nvfetch' },
  { title: 'Void Obfuscation', repo: '5Noxi/void' },
  { title: 'PowerShell Minifier', repo: '5Noxi/minifier' },
  { title: 'PS12bat', repo: '5Noxi/ps12bat' },
  { title: 'WPR/Procmon Registry Activity Records', repo: '5Noxi/wpr-reg-records' },
  { title: 'Base64 Encoding / Character Obfuscation', repo: '5Noxi/b64-char' },
  { title: 'ADMX Parser', repo: '5Noxi/admx-parser' },
  { title: 'Hash Generator', repo: '5Noxi/hash-gen' },
  { title: 'strings2 TUI', repo: '5Noxi/strings2-tui' },
  { title: 'Base64 Reversal & Character Obfuscation', repo: '5Noxi/b64rev' },
  { title: 'DISM WSIM', repo: '5Noxi/dism-wsim' },
  { title: 'reg2bat', repo: '5Noxi/reg2bat' },
  { title: 'PBO2 UV Guide', repo: '5Noxi/pbo2-uv' },
  { title: 'GPU OC/UV Guide', repo: '5Noxi/gpu-oc-uv' }
];

let toastTimer;
let consoleHistory = [];
let consoleHistoryIndex = -1;
let consoleTimestampTimer;
let consoleFocusListener;

const ASCII_ART = [
  '  \\  |                                    ',
  '   \\ |   _ \\ \\ \\   /  _ \\   __|  __|   _ \\',
  ' |\\  |  (   | \\ \\ /   __/  |   \\__ \\   __/',
  '_| \\_| \\___/   \\_/  \\___| _|   ____/ \\___|'
];

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

  let stored = DEFAULT_THEME;
  try {
    stored = localStorage.getItem(THEME_KEY) || document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  } catch {
    stored = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  }

  const applied = applyTheme(stored);
  const hasOption = Array.from(select.options).some(option => option.value === applied);
  if (hasOption) {
    select.value = applied;
  } else {
    select.value = DEFAULT_THEME;
    applyTheme(DEFAULT_THEME);
  }

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_THEME;
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch { }
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

  let stored = DEFAULT_BG;
  try {
    stored = localStorage.getItem(BG_KEY) || document.documentElement.getAttribute('data-bg') || DEFAULT_BG;
  } catch {
    stored = document.documentElement.getAttribute('data-bg') || DEFAULT_BG;
  }

  const applied = applyBackground(stored);
  const hasOption = Array.from(select.options).some(option => option.value === applied);
  if (hasOption) {
    select.value = applied;
  } else {
    select.value = DEFAULT_BG;
    applyBackground(DEFAULT_BG);
  }

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_BG;
    applyBackground(next);
    try {
      localStorage.setItem(BG_KEY, next);
    } catch { }
  });
}

function applyFont(key) {
  const resolved = FONT_MAP[key] || FONT_MAP[DEFAULT_FONT];
  document.documentElement.style.setProperty('--font-family', resolved);
  return key || DEFAULT_FONT;
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

  let storedFont = DEFAULT_FONT;
  try {
    storedFont = localStorage.getItem(FONT_KEY) || DEFAULT_FONT;
  } catch { }

  if (fontSelect) {
    const hasFontOption = Array.from(fontSelect.options).some(option => option.value === storedFont);
    if (!hasFontOption) {
      storedFont = DEFAULT_FONT;
    }
    fontSelect.value = storedFont;
  }
  applyFont(storedFont);

  let storedSize = DEFAULT_FONT_SIZE;
  try {
    storedSize = localStorage.getItem(FONT_SIZE_KEY) || DEFAULT_FONT_SIZE;
  } catch { }
  const appliedSize = applyFontSize(storedSize);
  if (sizeInput) {
    sizeInput.value = appliedSize;
  }

  if (fontSelect) {
    fontSelect.addEventListener('change', () => {
      const next = fontSelect.value || DEFAULT_FONT;
      applyFont(next);
      try {
        localStorage.setItem(FONT_KEY, next);
      } catch { }
    });
  }

  if (sizeInput) {
    sizeInput.addEventListener('input', () => {
      const applied = applyFontSize(sizeInput.value);
      sizeInput.value = applied;
      try {
        localStorage.setItem(FONT_SIZE_KEY, applied + 'px');
      } catch { }
    });
  }

  stepButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!sizeInput) return;
      const delta = Number.parseInt(button.dataset.step, 10) || 0;
      const nextValue = Number.parseInt(sizeInput.value || DEFAULT_FONT_SIZE, 10) + delta;
      const applied = applyFontSize(nextValue);
      sizeInput.value = applied;
      try {
        localStorage.setItem(FONT_SIZE_KEY, applied + 'px');
      } catch { }
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

function fetchRepoMeta(repo) {
  return fetch(`https://api.github.com/repos/${repo}`, {
    headers: { 'Accept': 'application/vnd.github+json' },
    cache: 'no-store'
  }).then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  });
}

async function getRepoDescription(repo) {
  const cacheKey = `ghmeta:${repo}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { t, description } = JSON.parse(cached);
      if (Date.now() - t < 6 * 60 * 60 * 1000 && description) {
        return description;
      }
    }
  } catch { }

  try {
    const meta = await fetchRepoMeta(repo);
    const desc = (meta.description || 'No description yet.').trim();
    localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), description: desc }));
    return desc;
  } catch {
    return 'No description yet.';
  }
}

function initRepoDescriptions() {
  document.querySelectorAll('.project-card[data-repo]').forEach(async card => {
    const repo = card.getAttribute('data-repo');
    const descEl = card.querySelector('.project-desc');
    if (!repo || !descEl) return;
    descEl.textContent = await getRepoDescription(repo);
  });
}

function filterProjects() {
  const searchInput = document.getElementById('project-search');
  if (!searchInput) return;

  const search = searchInput.value.toLowerCase();
  const activeTags = Array.from(document.querySelectorAll('.tag-filter button.active')).map(btn => btn.textContent.toLowerCase());

  document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('.project-title').textContent.toLowerCase();
    const desc = card.querySelector('.project-desc').textContent.toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase().split(',').map(tag => tag.trim());

    const matchesSearch = title.includes(search) || desc.includes(search);
    const matchesTags = activeTags.length === 0 || activeTags.some(tag => tags.includes(tag));

    card.style.display = (matchesSearch && matchesTags) ? '' : 'none';
  });
}

function initFiltering() {
  const searchInput = document.getElementById('project-search');
  const tagButtons = document.querySelectorAll('.tag-filter button');

  if (!searchInput || tagButtons.length === 0) return;

  searchInput.addEventListener('input', filterProjects);
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      filterProjects();
    });
  });

  filterProjects();
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

  if (window.ResizeObserver) {
    const observer = new ResizeObserver(() => clampPosition());
    observer.observe(windowEl);
  }

  window.addEventListener('resize', clampPosition);

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

  const addBlock = items => {
    items.forEach(item => addLine(item));
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
    if (['product', 'projects', 'about'].includes(raw)) {
      return `${rootPath}/${raw}`;
    }
    return null;
  };

  const listDirs = () => {
    if (currentPath === rootPath) {
      return ['./product', './projects', './about'];
    }
    return ['..'];
  };

  const NAV_MAP = {
    home: 'index.html',
    product: 'product.html',
    projects: 'projects.html',
    about: 'about.html'
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

  const listFonts = () => Object.keys(FONT_MAP);

  const commands = {
    help: () => {
      addBlock([
        'available commands:',
        '- help: show this help message',
        '- about: about me + links',
        '- product: winconfig summary + pricing',
        '- docs: documentation sections',
        '- toolkit: external tools list',
        '- projects: list projects with repo descriptions',
        '- terms: terms of service summary',
        '- contact: email + discord',
        '- ascii: print the banner',
        '- ls: list available directories',
        '- pwd: show current directory',
        '- cd <path>: change directory (./product, ../)',
        '- alias: list aliases',
        '- alias name=command: set alias',
        '- unalias <name>: remove alias',
        '- themes: list theme ids',
        '- theme <id>: set theme',
        '- fonts: list font ids',
        '- font <id>: set font',
        '- fontsize <12-22>: set size',
        '- clear: clear the console'
      ]);
      addLine('tip: use Tab for autocompletion.', 'muted');
    },
    about: () => {
      addBlock([
        'about:',
        '- proprietor of Noverse',
        '- github: https://github.com/nohuto',
        '- youtube: https://www.youtube.com/@5Noverse',
        '- discord: https://discord.gg/E2ybG4j9jU'
      ]);
    },
    product: () => {
      addBlock([
        'product: winconfig',
        '- price: 9.99 EUR (lifetime)',
        '- includes updates + discord role',
        'features:',
        '- transparent execution logs',
        '- dynamic state detection',
        '- per-option documentation',
        '- extensive customization controls'
      ]);
    },
    docs: () => {
      addBlock([
        'documentation sections:',
        '- system, visibility, peripheral, power, privacy, security',
        '- network, nvidia, cleanup, misc, policies, affinities'
      ]);
    },
    toolkit: () => {
      addBlock([
        'external tools:',
        '- app tools',
        '- game tools',
        '- component manager',
        '- blocklist manager',
        '- bitmask calculator'
      ]);
    },
    terms: () => {
      addBlock([
        'terms:',
        '- data privacy: hardware identifiers only for licensing',
        '- usage: personal license only, no resale',
        '- refunds: only before registration/role assignment',
        '- license: hardware-bound, manual validation',
        '- after purchase: discord role assignment required'
      ]);
    },
    contact: () => {
      addBlock([
        'contact:',
        '- email: nohuto@duck.com (use copy button)',
        '- discord: https://discord.gg/E2ybG4j9jU'
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
        Object.entries(aliases).forEach(([name, value]) => {
          addLine(`- ${name}=${value}`);
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
      listThemes().forEach(theme => addLine(`- ${theme}`));
    },
    fonts: () => {
      addLine('fonts:', 'muted');
      listFonts().forEach(font => addLine(`- ${font}`));
    },
    theme: args => {
      const select = document.getElementById('theme-select');
      if (!select) return;
      if (!args.length) {
        addLine(`current theme: ${select.value}`);
        return;
      }
      const next = args.join(' ').trim();
      const exists = Array.from(select.options).some(option => option.value === next);
      if (!exists) {
        addLine(`theme not found: ${next}`, 'muted');
        return;
      }
      select.value = next;
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch { }
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
      if (!FONT_MAP[next]) {
        addLine(`font not found: ${next}`, 'muted');
        return;
      }
      select.value = next;
      applyFont(next);
      try {
        localStorage.setItem(FONT_KEY, next);
      } catch { }
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
      try {
        localStorage.setItem(FONT_SIZE_KEY, applied + 'px');
      } catch { }
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
        return `- ${project.title}: ${desc}`;
      }));
      items.forEach(item => addLine(item));
    }
  };

  const runCommand = async raw => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    addLine(`${promptLabel()} ${trimmed}`, 'muted');
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

  input.addEventListener('input', () => {
    updateCaret();
  });

  input.addEventListener('keyup', () => {
    updateCaret();
  });

  input.addEventListener('click', () => {
    updateCaret();
  });

  input.addEventListener('focus', () => {
    updateCaret();
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
  addLine('');
  addLine('welcome to the noverse console.', 'muted');
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
