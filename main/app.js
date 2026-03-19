/* Copyright (c) 2026 Nohuto. All rights reserved. */
const THEME_KEY = 'nv-theme';
const DEFAULT_THEME = 'gruvbox-dark';
const LIGHT_THEMES = new Set([
  'default-light',
  'gruvbox-light',
  'kanagawa-lotus',
  'catppuccin-latte',
  'solarized-light',
  'one-light',
  'ayu-light',
  'everforest-light'
]);
const BG_KEY = 'nv-bg';
const DEFAULT_BG = 'diagonal-grid';
const BG_KEYS = ['clear', 'diagonal-grid', 'dark-noise', 'dot-matrix', 'circuit-board', 'starfield'];
const BG_SET = new Set(BG_KEYS);
const KEYFRAMES_ICON_DARK = 'main/icons/dark/keyframes.svg';
const KEYFRAMES_ICON_LIGHT = 'main/icons/light/keyframes.svg';
const FONT_KEY = 'nv-font';
const FONT_SIZE_KEY = 'nv-font-size';
const DEFAULT_FONT = 'cascadia';
const DEFAULT_FONT_SIZE = 14;
const FONT_SIZE_MIN = 10;
const FONT_SIZE_MAX = 22;
const FONT_KEYS = ['cascadia'];
const FONT_SET = new Set(FONT_KEYS);
const REPO_DESC_URL = 'main/data/repos.json';
const BIN_DIFF_REPO_API_BASE = 'https://api.github.com/repos/nohuto/decompiled-pseudocode/contents';
const BIN_DIFF_REPO_RAW_BASE = 'https://raw.githubusercontent.com/nohuto/decompiled-pseudocode/main';
const BIN_DIFF_REPO_BLOB_BASE = 'https://github.com/nohuto/decompiled-pseudocode/blob/main';
const BIN_DIFF_REPO_GIT_TREES_BASE = 'https://api.github.com/repos/nohuto/decompiled-pseudocode/git/trees';
const BIN_DIFF_ASSET_STYLES = [
  'main/vendor/highlight-github-dark.min.css',
  'main/vendor/diff2html.min.css'
];
const BIN_DIFF_ASSET_SCRIPTS = [
  'main/vendor/highlight.common.min.js',
  'main/vendor/diff.min.js',
  'main/vendor/diff2html-ui-base.min.js'
];
const BIN_DIFF_FUNCTION_CACHE_KEY = 'nv-bindiff-function-cache-v1';
const BIN_DIFF_FUNCTION_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const BIN_DIFF_FUNCTION_CACHE_MAX_ENTRIES = 6;
const BIN_DIFF_FUNCTION_SEARCH_LIMIT_KEY = 'nv-bindiff-function-search-limit';
const BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT = 300;
const BIN_DIFF_DIFF_SETTINGS_KEY = 'nv-bindiff-diff-settings-v1';
const BIN_DIFF_DIFF_SETTINGS_DEFAULTS = Object.freeze({
  stripXrefs: true,
  stripAddresses: true,
  stripLocations: true,
  normalizeIdentifiers: true,
  trimTrailingWhitespace: true
});
const RELEASE_NAME_COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const PROJECT_LIST = [
  { title: 'Windows Configuration', repo: 'nohuto/win-config' },
  { title: 'RegKit', repo: 'nohuto/regkit' },
  { title: 'Windows Registry Research', repo: 'nohuto/win-registry' },
  { title: 'NVAPI CLI', repo: 'nohuto/nvapi-cli' },
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
let selectUiListener;
let selectUiKeyListener;
let binDiffAssetsPromise;
const binDiffAssetPromiseCache = new Map();
const binDiffEntriesCache = new Map();
const binDiffFunctionNamesCache = new Map();

const ASCII_ART = [
  '  \\  |                                    ',
  '   \\ |   _ \\ \\ \\   /  _ \\   __|  __|   _ \\',
  ' |\\  |  (   | \\ \\ /   __/  |   \\__ \\   __/',
  '_| \\_| \\___/   \\_/  \\___| _|   ____/ \\___|'
];
const EMAIL_KEY = 23;
const EMAIL_BYTES = [121, 120, 127, 98, 99, 120, 87, 99, 98, 99, 118, 57, 126, 120];

const getEmailAddress = () =>
  EMAIL_BYTES.map(byte => String.fromCharCode(byte ^ EMAIL_KEY)).join('');

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
const closeSelectUIs = except => {
  document.querySelectorAll('.select-ui.open').forEach(wrapper => {
    if (wrapper !== except) wrapper.classList.remove('open');
  });
};

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

function updateIconTheme(theme) {
  const applied = theme || document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  const useLight = LIGHT_THEMES.has(applied);
  document.querySelectorAll('img[data-dark-src][data-light-src]').forEach(img => {
    const next = useLight ? img.getAttribute('data-light-src') : img.getAttribute('data-dark-src');
    if (!next || img.getAttribute('src') === next) return;
    img.setAttribute('src', next);
  });
}

function applyTheme(theme) {
  const applied = theme || DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', applied);
  updateIconTheme(applied);
  return applied;
}

function initSelectUI() {
  const selects = document.querySelectorAll('.footer-tools select, select.select-enhanced');
  if (!selects.length) return;

  selects.forEach(select => {
    if (select.dataset.ui === 'true') return;
    select.dataset.ui = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'select-ui';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const label = document.querySelector(`label[for="${select.id}"]`);
    if (label && label.textContent) {
      trigger.setAttribute('aria-label', label.textContent.trim());
    }

    const menu = document.createElement('div');
    menu.className = 'select-menu';
    menu.setAttribute('role', 'listbox');
    const isSearchable = select.dataset.searchable === 'true';
    if (isSearchable) {
      wrapper.classList.add('is-searchable');
    }
    let searchValue = '';

    let searchInput = null;
    let menuMeta = null;
    let menuMetaText = null;
    if (isSearchable) {
      searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.className = 'select-search';
      searchInput.placeholder = 'Filter...';
      searchInput.setAttribute('aria-label', 'Filter options');
      menu.appendChild(searchInput);

      menuMeta = document.createElement('div');
      menuMeta.className = 'select-menu-meta';
      menuMetaText = document.createElement('span');
      menuMetaText.className = 'select-menu-meta-text';
      menuMeta.appendChild(menuMetaText);
    }

    const list = document.createElement('div');
    list.className = 'select-list';
    menu.appendChild(list);
    if (menuMeta) menu.appendChild(menuMeta);
    const isAnimatedBgOption = option => select.id === 'bg-select' && option.dataset.animated === 'true';
    const createAnimatedBadge = className => {
      const icon = document.createElement('img');
      icon.className = className;
      icon.setAttribute('alt', '');
      icon.setAttribute('aria-hidden', 'true');
      icon.setAttribute('decoding', 'async');
      icon.setAttribute('loading', 'lazy');
      icon.setAttribute('src', KEYFRAMES_ICON_DARK);
      icon.setAttribute('data-dark-src', KEYFRAMES_ICON_DARK);
      icon.setAttribute('data-light-src', KEYFRAMES_ICON_LIGHT);
      return icon;
    };

    const optionSignature = () => Array.from(select.options).map(option => `${option.value}\u0000${option.disabled ? '1' : '0'}\u0000${option.textContent || ''}`).join('\u0001');
    let lastOptionSignature = '';
    const getSearchRenderLimit = () => {
      const raw = (select.dataset.searchLimit || '').trim().toLowerCase();
      if (!raw) return BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT;
      if (raw === 'all' || raw === 'unlimited' || raw === '0' || raw === 'inf' || raw === 'infinity') {
        return Number.POSITIVE_INFINITY;
      }
      const parsed = Number.parseInt(raw, 10);
      if (!Number.isFinite(parsed) || parsed < 1) return BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT;
      return parsed;
    };

    const escapeSearchRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wildcardToRegexPattern = term => {
      let pattern = '';
      for (const char of term) {
        if (char === '*') {
          pattern += '.*';
        } else if (char === '?') {
          pattern += '.';
        } else {
          pattern += escapeSearchRegex(char);
        }
      }
      return pattern;
    };

    const buildSearchMatcher = filterText => {
      const raw = (filterText || '').trim();
      if (!raw) return null;

      const terms = raw.split(/\s+/).filter(Boolean);
      const checks = terms.map(term => {
        if (!/[*?]/.test(term)) {
          const literal = term.toLowerCase();
          return text => (text || '').toLowerCase().includes(literal);
        }
        const wildcardPattern = wildcardToRegexPattern(term);
        const expression = new RegExp(wildcardPattern, 'i');
        return text => expression.test(text || '');
      });

      return text => checks.every(check => check(text));
    };

    const buildOptions = (filterText = '') => {
      list.replaceChildren();
      const normalizedFilter = (filterText || '').trim();
      const matcher = buildSearchMatcher(normalizedFilter);
      const allOptions = Array.from(select.options);
      const filteredOptions = matcher
        ? allOptions.filter(option => matcher(option.textContent || ''))
        : allOptions;
      const searchRenderLimit = getSearchRenderLimit();
      const optionsToRender = isSearchable && Number.isFinite(searchRenderLimit)
        ? filteredOptions.slice(0, searchRenderLimit)
        : filteredOptions;
      const fragment = document.createDocumentFragment();

      optionsToRender.forEach(option => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'select-option';
        const labelSpan = document.createElement('span');
        labelSpan.className = 'select-option-label';
        labelSpan.textContent = option.textContent;
        btn.appendChild(labelSpan);
        if (isAnimatedBgOption(option)) {
          btn.appendChild(createAnimatedBadge('select-option-icon'));
        }
        btn.dataset.value = option.value;
        btn.setAttribute('role', 'option');
        btn.setAttribute('aria-selected', option.selected ? 'true' : 'false');
        if (option.disabled) {
          btn.disabled = true;
          btn.classList.add('is-disabled');
        }
        fragment.appendChild(btn);
      });
      list.appendChild(fragment);

      if (menuMetaText) {
        if (!filteredOptions.length) {
          menuMetaText.textContent = 'No matches';
        } else if (isSearchable && filteredOptions.length > optionsToRender.length) {
          menuMetaText.textContent = `Showing ${optionsToRender.length} / ${filteredOptions.length}`;
        } else {
          menuMetaText.textContent = `${filteredOptions.length} option${filteredOptions.length === 1 ? '' : 's'}`;
        }
      }
    };

    const updateActive = () => {
      const active = select.value;
      const selected = select.options[select.selectedIndex];
      trigger.replaceChildren();
      const labelSpan = document.createElement('span');
      labelSpan.className = 'select-trigger-label';
      labelSpan.textContent = selected ? selected.textContent : active;
      trigger.appendChild(labelSpan);
      list.querySelectorAll('.select-option').forEach(btn => {
        const isActive = btn.dataset.value === active;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    };

    const syncMenuOptions = (forceRebuild = false) => {
      if (isSearchable) {
        buildOptions(searchValue);
      } else {
        const nextSignature = optionSignature();
        if (forceRebuild || nextSignature !== lastOptionSignature) {
          buildOptions();
          lastOptionSignature = nextSignature;
        }
      }
      updateActive();
    };

    const toggleOpen = () => {
      syncMenuOptions();
      const next = !wrapper.classList.contains('open');
      closeSelectUIs(wrapper);
      wrapper.classList.toggle('open', next);
      trigger.setAttribute('aria-expanded', next ? 'true' : 'false');
      if (next && searchInput) {
        requestAnimationFrame(() => searchInput?.focus({ preventScroll: true }));
      }
    };

    buildOptions();
    if (!isSearchable) {
      lastOptionSignature = optionSignature();
    }
    updateActive();
    select.addEventListener('change', syncMenuOptions);
    select.addEventListener('nv:options-updated', event => {
      if (searchInput && event instanceof CustomEvent && event.detail?.resetSearch) {
        searchValue = '';
        searchInput.value = '';
      }
      syncMenuOptions(true);
    });
    list.addEventListener('click', event => {
      const optionButton = event.target.closest('.select-option');
      if (!optionButton || !list.contains(optionButton) || optionButton.disabled) return;
      select.value = optionButton.dataset.value || '';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closeSelectUIs();
      trigger.focus({ preventScroll: true });
    });
    trigger.addEventListener('pointerdown', event => {
      event.preventDefault();
      event.stopPropagation();
      toggleOpen();
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!wrapper.classList.contains('open')) {
          toggleOpen();
        }
      }
    });
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchValue = searchInput.value;
        buildOptions(searchValue);
        updateActive();
      });
    }

    const parent = select.parentNode;
    parent.insertBefore(wrapper, select);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    wrapper.appendChild(select);
    select.classList.add('select-native');
    select.setAttribute('tabindex', '-1');
    select.setAttribute('aria-hidden', 'true');
  });
  updateIconTheme();

  if (!selectUiListener) {
    selectUiListener = e => {
      if (!e.target.closest('.select-ui')) closeSelectUIs();
    };
    selectUiKeyListener = e => {
      if (e.key === 'Escape') closeSelectUIs();
    };
    document.addEventListener('click', selectUiListener);
    document.addEventListener('keydown', selectUiKeyListener);
  }
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

function applyBackground(key) {
  const applied = BG_SET.has(key) ? key : DEFAULT_BG;
  document.documentElement.setAttribute('data-bg', applied);
  return applied;
}

function initBackground() {
  const select = document.getElementById('bg-select');
  if (!select) return;

  const stored = storageGet(BG_KEY, document.documentElement.getAttribute('data-bg') || DEFAULT_BG);
  const initial = BG_SET.has(stored) ? stored : DEFAULT_BG;
  applyBackground(initial);
  select.value = initial;

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_BG;
    const applied = applyBackground(next);
    storageSet(BG_KEY, applied);
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
    ? Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, parsed))
    : DEFAULT_FONT_SIZE;
  document.documentElement.style.setProperty('--font-size', safe + 'px');
  return safe;
}

function initTypography() {
  const sizeInput = document.getElementById('font-size');
  const stepButtons = document.querySelectorAll('.size-step');
  applyFont(DEFAULT_FONT);
  storageSet(FONT_KEY, DEFAULT_FONT);
  if (!sizeInput) return;

  const storedSize = storageGet(FONT_SIZE_KEY, DEFAULT_FONT_SIZE);
  const appliedSize = applyFontSize(storedSize);
  let lastValidSize = appliedSize;
  if (sizeInput) {
    sizeInput.value = appliedSize;
  }

  if (sizeInput) {
    sizeInput.addEventListener('input', () => {
      const raw = sizeInput.value.trim();
      const parsed = Number.parseInt(raw, 10);
      if (!Number.isFinite(parsed)) return;
      if (parsed < FONT_SIZE_MIN || parsed > FONT_SIZE_MAX) return;
      const applied = applyFontSize(parsed);
      lastValidSize = applied;
      storageSet(FONT_SIZE_KEY, applied + 'px');
    });
    sizeInput.addEventListener('blur', () => {
      const raw = sizeInput.value.trim();
      const parsed = Number.parseInt(raw, 10);
      if (!Number.isFinite(parsed)) {
        sizeInput.value = lastValidSize;
        applyFontSize(lastValidSize);
        return;
      }
      const applied = applyFontSize(parsed);
      lastValidSize = applied;
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
      lastValidSize = applied;
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
    const emailTarget = e.target.closest('[data-email]');
    const source = emailTarget || target;
    if (!source) return;
    const text = emailTarget ? getEmailAddress() : source.getAttribute('data-copy');
    if (!text) return;
    e.preventDefault();
    let ok = false;
    try {
      ok = await copyText(text);
    } catch {
      ok = false;
    }
    const message = source.getAttribute('data-toast') || (ok ? 'Copied.' : 'Copy failed.');
    showToast(message);
  });
}

function sanitizeMain(main) {
  if (!main) return;
  main.querySelectorAll('script').forEach(script => script.remove());
  main.querySelectorAll('*').forEach(node => {
    node.getAttributeNames().forEach(name => {
      if (name.toLowerCase().startsWith('on')) {
        node.removeAttribute(name);
      }
    });
    ['href', 'src'].forEach(attr => {
      const value = node.getAttribute(attr);
      if (value && value.trim().toLowerCase().startsWith('javascript:')) {
        node.removeAttribute(attr);
      }
    });
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
    sanitizeMain(newMain);
    const newTitle = doc.querySelector('title')?.textContent || document.title;
    newMain.classList.add('fading');

    setTimeout(() => {
      main.replaceWith(newMain);
      document.title = newTitle;
      setActive(new URL(url, location.href).pathname.split('/').pop() || 'index.html');
      initRepoDescriptions();
      initFiltering();
      initSelectUI();
      initBinDiff();
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

const estimateReleaseRank = release => {
  const normalized = (release || '').trim();
  if (!normalized) return Number.NEGATIVE_INFINITY;

  const win11Match = normalized.match(/^(\d+)-(\d{2})H([12])$/i);
  if (win11Match) {
    const generation = Number.parseInt(win11Match[1], 10);
    const year = 2000 + Number.parseInt(win11Match[2], 10);
    const half = Number.parseInt(win11Match[3], 10);
    return generation * 100000 + year * 10 + half;
  }

  const win10Match = normalized.match(/^(\d{2})H([12])$/i);
  if (win10Match) {
    const year = 2000 + Number.parseInt(win10Match[1], 10);
    const half = Number.parseInt(win10Match[2], 10);
    return year * 10 + half;
  }

  if (/^\d{4}$/.test(normalized)) {
    return Number.parseInt(normalized, 10);
  }

  return Number.NEGATIVE_INFINITY;
};

const compareReleaseNames = (left, right) => {
  const leftRank = estimateReleaseRank(left);
  const rightRank = estimateReleaseRank(right);
  if (leftRank !== rightRank) return rightRank - leftRank;
  return RELEASE_NAME_COLLATOR.compare(right, left);
};

const encodePathSegments = segments => segments
  .filter(Boolean)
  .map(segment => encodeURIComponent(segment))
  .join('/');

const joinPathSegments = segments => segments.filter(Boolean).join('/');

const hasScriptAsset = src => Array.from(document.scripts).some(script => {
  const current = script.getAttribute('src') || '';
  return current === src || current.endsWith(`/${src}`);
});

const hasStyleAsset = href => Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => {
  const current = link.getAttribute('href') || '';
  return current === href || current.endsWith(`/${href}`);
});

const ensureScriptAsset = src => {
  if (hasScriptAsset(src)) return Promise.resolve();
  if (binDiffAssetPromiseCache.has(src)) return binDiffAssetPromiseCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script asset: ${src}`));
    document.head.appendChild(script);
  });
  binDiffAssetPromiseCache.set(src, promise);
  return promise;
};

const ensureStyleAsset = href => {
  if (hasStyleAsset(href)) return Promise.resolve();
  if (binDiffAssetPromiseCache.has(href)) return binDiffAssetPromiseCache.get(href);
  const promise = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load style asset: ${href}`));
    document.head.appendChild(link);
  });
  binDiffAssetPromiseCache.set(href, promise);
  return promise;
};

const ensureBinDiffAssets = async () => {
  if (window.Diff && window.Diff2HtmlUI && window.hljs) return;
  if (!binDiffAssetsPromise) {
    binDiffAssetsPromise = (async () => {
      for (const href of BIN_DIFF_ASSET_STYLES) {
        await ensureStyleAsset(href);
      }
      for (const src of BIN_DIFF_ASSET_SCRIPTS) {
        await ensureScriptAsset(src);
      }
    })();
  }
  await binDiffAssetsPromise;
};

const fetchRepoEntries = async pathSegments => {
  const pathKey = joinPathSegments(pathSegments);
  if (binDiffEntriesCache.has(pathKey)) {
    return binDiffEntriesCache.get(pathKey);
  }

  const encodedPath = encodePathSegments(pathSegments);
  const base = encodedPath ? `${BIN_DIFF_REPO_API_BASE}/${encodedPath}` : BIN_DIFF_REPO_API_BASE;
  const url = `${base}?ref=main`;
  const promise = fetch(url, {
    cache: 'force-cache',
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(`GitHub API request failed (${response.status})`);
      }
      const json = await response.json();
      return Array.isArray(json) ? json : [];
    });

  binDiffEntriesCache.set(pathKey, promise);
  return promise;
};

const listRepoDirectories = async pathSegments => {
  const entries = await fetchRepoEntries(pathSegments);
  return entries
    .filter(entry => entry && entry.type === 'dir' && typeof entry.name === 'string' && !entry.name.startsWith('.'))
    .map(entry => entry.name)
    .sort((a, b) => RELEASE_NAME_COLLATOR.compare(a, b));
};

const readFunctionCacheStore = () => {
  try {
    const raw = localStorage.getItem(BIN_DIFF_FUNCTION_CACHE_KEY);
    if (!raw) return { entries: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.entries || typeof parsed.entries !== 'object') {
      return { entries: {} };
    }
    return parsed;
  } catch {
    return { entries: {} };
  }
};

const writeFunctionCacheStore = store => {
  try {
    const entries = Object.entries(store.entries || {})
      .sort((left, right) => (right[1]?.ts || 0) - (left[1]?.ts || 0))
      .slice(0, BIN_DIFF_FUNCTION_CACHE_MAX_ENTRIES);
    const normalized = { entries: Object.fromEntries(entries) };
    localStorage.setItem(BIN_DIFF_FUNCTION_CACHE_KEY, JSON.stringify(normalized));
  } catch {
    // ignore quota and storage failures
  }
};

const loadFunctionNamesFromPersistentCache = key => {
  const store = readFunctionCacheStore();
  const entry = store.entries?.[key];
  if (!entry || !Array.isArray(entry.names) || typeof entry.ts !== 'number') return null;
  if (Date.now() - entry.ts > BIN_DIFF_FUNCTION_CACHE_TTL_MS) return null;
  return entry.names;
};

const saveFunctionNamesToPersistentCache = (key, names) => {
  const store = readFunctionCacheStore();
  store.entries[key] = { ts: Date.now(), names };
  writeFunctionCacheStore(store);
};

const fetchTreeBySha = async treeSha => {
  const key = `tree:${treeSha}`;
  if (binDiffEntriesCache.has(key)) {
    return binDiffEntriesCache.get(key);
  }
  const url = `${BIN_DIFF_REPO_GIT_TREES_BASE}/${treeSha}?recursive=1`;
  const promise = fetch(url, {
    cache: 'force-cache',
    headers: { Accept: 'application/vnd.github+json' }
  }).then(async response => {
    if (!response.ok) {
      throw new Error(`GitHub tree request failed (${response.status})`);
    }
    const json = await response.json();
    return {
      truncated: Boolean(json?.truncated),
      tree: Array.isArray(json?.tree) ? json.tree : []
    };
  });
  binDiffEntriesCache.set(key, promise);
  return promise;
};

const listRepoFunctionFiles = async pathSegments => {
  const cacheKey = joinPathSegments(pathSegments);
  if (binDiffFunctionNamesCache.has(cacheKey)) {
    return binDiffFunctionNamesCache.get(cacheKey).map(name => ({
      name,
      downloadUrl: `${BIN_DIFF_REPO_RAW_BASE}/${encodePathSegments([...pathSegments, name])}`
    }));
  }

  const persistentNames = loadFunctionNamesFromPersistentCache(cacheKey);
  if (persistentNames) {
    binDiffFunctionNamesCache.set(cacheKey, persistentNames);
    return persistentNames.map(name => ({
      name,
      downloadUrl: `${BIN_DIFF_REPO_RAW_BASE}/${encodePathSegments([...pathSegments, name])}`
    }));
  }

  if (pathSegments.length < 2) {
    const entries = await fetchRepoEntries(pathSegments);
    const names = entries
      .filter(entry =>
        entry &&
        entry.type === 'file' &&
        typeof entry.name === 'string' &&
        entry.name.toLowerCase().endsWith('.c'))
      .map(entry => entry.name)
      .sort((a, b) => RELEASE_NAME_COLLATOR.compare(a, b));
    binDiffFunctionNamesCache.set(cacheKey, names);
    saveFunctionNamesToPersistentCache(cacheKey, names);
    return names.map(name => ({
      name,
      downloadUrl: `${BIN_DIFF_REPO_RAW_BASE}/${encodePathSegments([...pathSegments, name])}`
    }));
  }

  const parentPath = pathSegments.slice(0, -1);
  const targetName = pathSegments[pathSegments.length - 1];
  const parentEntries = await fetchRepoEntries(parentPath);
  const targetDirectory = parentEntries.find(entry => entry.type === 'dir' && entry.name === targetName);
  if (!targetDirectory?.sha) {
    throw new Error(`Unable to locate directory SHA for ${cacheKey}`);
  }

  const treeResult = await fetchTreeBySha(targetDirectory.sha);
  if (treeResult.truncated) {
    throw new Error(`Function tree for ${cacheKey} is truncated by GitHub API.`);
  }

  const names = treeResult.tree
    .filter(entry =>
      entry &&
      entry.type === 'blob' &&
      typeof entry.path === 'string' &&
      !entry.path.includes('/') &&
      entry.path.toLowerCase().endsWith('.c'))
    .map(entry => entry.path)
    .sort((a, b) => RELEASE_NAME_COLLATOR.compare(a, b));

  binDiffFunctionNamesCache.set(cacheKey, names);
  saveFunctionNamesToPersistentCache(cacheKey, names);
  return names.map(name => ({
    name,
    downloadUrl: `${BIN_DIFF_REPO_RAW_BASE}/${encodePathSegments([...pathSegments, name])}`
  }));
};

const readBinDiffSettings = () => {
  const defaults = { ...BIN_DIFF_DIFF_SETTINGS_DEFAULTS };
  const raw = storageGet(BIN_DIFF_DIFF_SETTINGS_KEY, '');
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaults;
    return {
      stripXrefs: parsed.stripXrefs !== undefined ? Boolean(parsed.stripXrefs) : defaults.stripXrefs,
      stripAddresses: parsed.stripAddresses !== undefined ? Boolean(parsed.stripAddresses) : defaults.stripAddresses,
      stripLocations: parsed.stripLocations !== undefined ? Boolean(parsed.stripLocations) : defaults.stripLocations,
      normalizeIdentifiers: parsed.normalizeIdentifiers !== undefined ? Boolean(parsed.normalizeIdentifiers) : defaults.normalizeIdentifiers,
      trimTrailingWhitespace: parsed.trimTrailingWhitespace !== undefined ? Boolean(parsed.trimTrailingWhitespace) : defaults.trimTrailingWhitespace
    };
  } catch {
    return defaults;
  }
};

const writeBinDiffSettings = settings => {
  storageSet(BIN_DIFF_DIFF_SETTINGS_KEY, JSON.stringify({
    stripXrefs: Boolean(settings?.stripXrefs),
    stripAddresses: Boolean(settings?.stripAddresses),
    stripLocations: Boolean(settings?.stripLocations),
    normalizeIdentifiers: Boolean(settings?.normalizeIdentifiers),
    trimTrailingWhitespace: Boolean(settings?.trimTrailingWhitespace)
  }));
};

const stripBinDiffXrefMetadata = source => source.replace(/\/\*[\s\S]*?\*\//g, block => {
  if (/\bXREFs of\b/.test(block) || /\bCallers:\b/.test(block) || /\bCallees:\b/.test(block)) {
    return '';
  }
  return block;
});

const stripBinDiffLocationComments = source => source
  .split('\n')
  .map(line => line
    .replace(/\s*\/\/\s*\[(?:rsp|rbp|esp|ebp)[^\]]*\](?:\s*\[(?:rsp|rbp|esp|ebp)[^\]]*\])*(?:\s*BYREF)?\s*$/i, '')
    .replace(/\s*\/\/\s*(?:[re]?[abcd]x|[re]?(?:si|di|sp|bp|ip)|r\d+[bwd]?|xmm\d+|ymm\d+|zmm\d+)\s*$/i, ''))
  .join('\n');

const AUTO_IDENTIFIER_DECLARATION_RE = /^(?:[_A-Za-z]\w*(?:\s+[_A-Za-z]\w*)*\s+)(?:\*+\s*)?(?:var_\d+|arg_\d+)(?:\s*\[[^\]]+\])?\s*;\s*$/;

const stripAutoIdentifierDeclarations = source => source
  .split('\n')
  .filter(line => !AUTO_IDENTIFIER_DECLARATION_RE.test(line.trim()))
  .join('\n');

const normalizeBinDiffIdentifiers = source => {
  const mapping = new Map();
  let argCount = 0;
  let varCount = 0;
  const normalized = source.replace(/\b([av])\d+\b/g, match => {
    if (!mapping.has(match)) {
      if (match.startsWith('a')) {
        argCount += 1;
        mapping.set(match, `arg_${argCount}`);
      } else {
        varCount += 1;
        mapping.set(match, `var_${varCount}`);
      }
    }
    return mapping.get(match) || match;
  });
  return stripAutoIdentifierDeclarations(normalized);
};

const normalizeBinDiffAddresses = source => source
  .replace(/\b((?:qword|dword|word|byte|xmmword|ymmword|zmmword|oword|unk|loc|off|stru|sub|nullsub)_)0x?[0-9A-Fa-f]{6,}\b/g, '$1ADDR')
  .replace(/\b0x[0-9A-Fa-f]{8,}(?:u|U|l|L|ul|UL|ll|LL|ull|ULL)?\b/g, '0xADDR');

const preprocessBinDiffSource = (source, settings) => {
  let normalized = String(source || '').replace(/\r\n?/g, '\n');

  if (settings.stripXrefs) {
    normalized = stripBinDiffXrefMetadata(normalized);
  }
  if (settings.stripAddresses) {
    normalized = normalizeBinDiffAddresses(normalized);
  }
  if (settings.stripLocations) {
    normalized = stripBinDiffLocationComments(normalized);
  }
  if (settings.normalizeIdentifiers) {
    normalized = normalizeBinDiffIdentifiers(normalized);
  }
  if (settings.trimTrailingWhitespace) {
    normalized = normalized.replace(/[ \t]+$/gm, '');
  }

  normalized = normalized.replace(/\n{3,}/g, '\n\n').trimEnd();
  return normalized ? `${normalized}\n` : '';
};

function initBinDiff() {
  const root = document.getElementById('bin-diff-app');
  if (!root) return;
  if (root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const leftReleaseSelect = document.getElementById('bindiff-left-release');
  const rightReleaseSelect = document.getElementById('bindiff-right-release');
  const moduleSelect = document.getElementById('bindiff-module');
  const functionSelect = document.getElementById('bindiff-function');
  const viewTools = document.getElementById('bindiff-view-tools');
  const viewModeToggle = document.getElementById('bindiff-view-mode');
  const viewModeButtons = Array.from(document.querySelectorAll('#bindiff-view-mode .bindiff-view-button'));
  const settingsButton = document.getElementById('bindiff-settings');
  const maximizeButton = document.getElementById('bindiff-maximize');
  const settingsModal = document.getElementById('bindiff-settings-modal');
  const settingsDialog = document.getElementById('bindiff-settings-dialog');
  const settingsHeader = document.getElementById('bindiff-settings-header');
  const settingsCloseButton = document.getElementById('bindiff-settings-close');
  const settingsDoneButton = document.getElementById('bindiff-settings-done');
  const settingsResetButton = document.getElementById('bindiff-settings-reset');
  const stripXrefsInput = document.getElementById('bindiff-setting-strip-xrefs');
  const stripAddressesInput = document.getElementById('bindiff-setting-strip-addresses');
  const stripLocationsInput = document.getElementById('bindiff-setting-strip-locations');
  const normalizeIdentifiersInput = document.getElementById('bindiff-setting-normalize-identifiers');
  const trimWhitespaceInput = document.getElementById('bindiff-setting-trim-whitespace');
  const runButton = document.getElementById('bindiff-run');
  const swapButton = document.getElementById('bindiff-swap');
  const output = document.getElementById('bin-diff-output');
  let functionLimitInput = document.getElementById('bindiff-function-limit');
  let functionLimitUnlimited = document.getElementById('bindiff-function-limit-unlimited');
  const leftLink = document.getElementById('bindiff-left-link');
  const rightLink = document.getElementById('bindiff-right-link');
  const linksWrap = document.getElementById('bindiff-links');

  if (
    !leftReleaseSelect ||
    !rightReleaseSelect ||
    !moduleSelect ||
    !functionSelect ||
    !viewTools ||
    !viewModeToggle ||
    !viewModeButtons.length ||
    !settingsButton ||
    !maximizeButton ||
    !settingsModal ||
    !settingsDialog ||
    !settingsHeader ||
    !settingsCloseButton ||
    !settingsDoneButton ||
    !settingsResetButton ||
    !stripXrefsInput ||
    !stripAddressesInput ||
    !stripLocationsInput ||
    !normalizeIdentifiersInput ||
    !trimWhitespaceInput ||
    !runButton ||
    !swapButton ||
    !output ||
    !linksWrap ||
    !leftLink ||
    !rightLink
  ) {
    return;
  }

  let leftFileMap = new Map();
  let rightFileMap = new Map();
  let selectionUpdateToken = 0;
  let lastComparisonState = null;
  let currentViewMode = 'side-by-side';
  let isMaximized = false;
  let diffSettings = readBinDiffSettings();
  let settingsFocusRestore = null;

  const setMaximized = maximized => {
    const next = Boolean(maximized);
    if (isMaximized === next) return;
    isMaximized = next;
    root.classList.toggle('bindiff-maximized', next);
    document.body.classList.toggle('bindiff-maximized', next);
    maximizeButton.setAttribute('aria-pressed', next ? 'true' : 'false');
    maximizeButton.setAttribute('aria-label', next ? 'Restore diff size' : 'Maximize diff');
    maximizeButton.title = next ? 'Restore diff size' : 'Maximize diff';
  };

  const setComparisonUiVisible = visible => {
    viewTools.style.display = visible ? '' : 'none';
    linksWrap.style.display = visible ? '' : 'none';
    swapButton.style.display = visible ? 'block' : 'none';
    settingsButton.style.display = visible ? 'block' : 'none';
    maximizeButton.style.display = visible ? 'block' : 'none';
    if (!visible) {
      setMaximized(false);
    }
  };

  const syncSettingsUi = () => {
    stripXrefsInput.checked = diffSettings.stripXrefs;
    stripAddressesInput.checked = diffSettings.stripAddresses;
    stripLocationsInput.checked = diffSettings.stripLocations;
    normalizeIdentifiersInput.checked = diffSettings.normalizeIdentifiers;
    trimWhitespaceInput.checked = diffSettings.trimTrailingWhitespace;
  };

  const applySettingsFromUi = () => {
    diffSettings = {
      stripXrefs: stripXrefsInput.checked,
      stripAddresses: stripAddressesInput.checked,
      stripLocations: stripLocationsInput.checked,
      normalizeIdentifiers: normalizeIdentifiersInput.checked,
      trimTrailingWhitespace: trimWhitespaceInput.checked
    };
    writeBinDiffSettings(diffSettings);
    if (lastComparisonState) {
      rerenderLastComparison();
    }
  };

  const clampSettingsDialogPosition = () => {
    const width = settingsDialog.offsetWidth;
    const height = settingsDialog.offsetHeight;
    const maxLeft = Math.max(0, settingsModal.clientWidth - width);
    const maxTop = Math.max(0, settingsModal.clientHeight - height);
    const currentLeft = settingsDialog.offsetLeft;
    const currentTop = settingsDialog.offsetTop;
    settingsDialog.style.left = `${Math.min(Math.max(0, currentLeft), maxLeft)}px`;
    settingsDialog.style.top = `${Math.min(Math.max(0, currentTop), maxTop)}px`;
    settingsDialog.style.transform = 'none';
  };

  const centerSettingsDialog = () => {
    const width = settingsDialog.offsetWidth;
    const height = settingsDialog.offsetHeight;
    const left = Math.max(0, (settingsModal.clientWidth - width) / 2);
    const top = Math.max(0, (settingsModal.clientHeight - height) / 2);
    settingsDialog.style.left = `${left}px`;
    settingsDialog.style.top = `${top}px`;
    settingsDialog.style.transform = 'none';
    settingsDialog.dataset.positioned = 'true';
  };

  const openSettingsModal = () => {
    syncSettingsUi();
    settingsFocusRestore = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    settingsModal.hidden = false;
    document.body.classList.add('bindiff-settings-open');
    requestAnimationFrame(() => {
      if (settingsDialog.dataset.positioned !== 'true') {
        centerSettingsDialog();
      }
      clampSettingsDialogPosition();
      settingsCloseButton.focus({ preventScroll: true });
    });
  };

  const closeSettingsModal = () => {
    if (settingsModal.hidden) return;
    settingsModal.hidden = true;
    document.body.classList.remove('bindiff-settings-open');
    const focusTarget = settingsFocusRestore || settingsButton;
    settingsFocusRestore = null;
    if (focusTarget instanceof HTMLElement) {
      focusTarget.focus({ preventScroll: true });
    }
  };

  const clearComparison = () => {
    output.replaceChildren();
    lastComparisonState = null;
    setComparisonUiVisible(false);
  };

  const setSourceLinks = (leftPath, rightPath) => {
    leftLink.href = `${BIN_DIFF_REPO_BLOB_BASE}/${encodePathSegments(leftPath)}`;
    rightLink.href = `${BIN_DIFF_REPO_BLOB_BASE}/${encodePathSegments(rightPath)}`;
    leftLink.textContent = `Left source (${leftPath[0]})`;
    rightLink.textContent = `Right source (${rightPath[0]})`;
  };

  const ensureFunctionLimitControls = () => {
    const selectUi = functionSelect.closest('.select-ui');
    const menuMeta = selectUi?.querySelector('.select-menu-meta');
    if (!menuMeta) return;

    let controls = menuMeta.querySelector('.bindiff-limit-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'bindiff-limit-controls';

      const limitLabel = document.createElement('label');
      limitLabel.className = 'bindiff-limit-label';
      limitLabel.setAttribute('for', 'bindiff-function-limit');
      limitLabel.textContent = 'limit';

      const limitInput = document.createElement('input');
      limitInput.id = 'bindiff-function-limit';
      limitInput.type = 'number';
      limitInput.min = '1';
      limitInput.step = '100';
      limitInput.value = String(BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT);

      const unlimitedLabel = document.createElement('label');
      unlimitedLabel.className = 'bindiff-limit-toggle';
      unlimitedLabel.setAttribute('for', 'bindiff-function-limit-unlimited');
      const unlimitedInput = document.createElement('input');
      unlimitedInput.id = 'bindiff-function-limit-unlimited';
      unlimitedInput.type = 'checkbox';
      unlimitedLabel.appendChild(unlimitedInput);
      unlimitedLabel.appendChild(document.createTextNode('unlimited'));

      controls.appendChild(limitLabel);
      controls.appendChild(limitInput);
      controls.appendChild(unlimitedLabel);
      menuMeta.appendChild(controls);
    }

    functionLimitInput = menuMeta.querySelector('#bindiff-function-limit');
    functionLimitUnlimited = menuMeta.querySelector('#bindiff-function-limit-unlimited');
  };

  const refreshFunctionSelectUi = () => {
    functionSelect.dispatchEvent(new CustomEvent('nv:options-updated', { detail: { resetSearch: false } }));
  };

  const applyFunctionSearchLimit = (value, unlimited, persist = true) => {
    if (unlimited) {
      functionSelect.dataset.searchLimit = 'all';
      if (functionLimitUnlimited) functionLimitUnlimited.checked = true;
      if (persist) storageSet(BIN_DIFF_FUNCTION_SEARCH_LIMIT_KEY, 'all');
      refreshFunctionSelectUi();
      return;
    }

    let parsed = Number.parseInt(String(value || ''), 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      parsed = BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT;
    }
    functionSelect.dataset.searchLimit = String(parsed);
    if (functionLimitInput) functionLimitInput.value = String(parsed);
    if (functionLimitUnlimited) functionLimitUnlimited.checked = false;
    if (persist) storageSet(BIN_DIFF_FUNCTION_SEARCH_LIMIT_KEY, String(parsed));
    refreshFunctionSelectUi();
  };

  const initFunctionSearchLimit = () => {
    const stored = String(storageGet(BIN_DIFF_FUNCTION_SEARCH_LIMIT_KEY, String(BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT)))
      .trim()
      .toLowerCase();
    if (stored === 'all' || stored === 'unlimited' || stored === '0' || stored === 'inf' || stored === 'infinity') {
      applyFunctionSearchLimit(BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT, true, false);
      return;
    }
    applyFunctionSearchLimit(stored, false, false);
  };

  const replaceOptions = (select, options, preferredValue) => {
    select.replaceChildren();
    options.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
    if (!options.length) {
      select.dispatchEvent(new CustomEvent('nv:options-updated', { detail: { resetSearch: true } }));
      return '';
    }
    if (preferredValue && options.includes(preferredValue)) {
      select.value = preferredValue;
      select.dispatchEvent(new CustomEvent('nv:options-updated', { detail: { resetSearch: true } }));
      return preferredValue;
    }
    select.value = options[0];
    select.dispatchEvent(new CustomEvent('nv:options-updated', { detail: { resetSearch: true } }));
    return options[0];
  };

  const replaceFunctionOptions = (items, preferredValue) => {
    return replaceOptions(functionSelect, items, preferredValue);
  };

  const updateUrlState = () => {
    const params = new URLSearchParams();
    params.set('left', leftReleaseSelect.value);
    params.set('right', rightReleaseSelect.value);
    params.set('module', moduleSelect.value);
    params.set('function', functionSelect.value);
    params.set('mode', currentViewMode);
    const url = `bin-diff.html?${params.toString()}`;
    history.replaceState({ ...(history.state || {}), url }, '', url);
  };

  const setViewMode = mode => {
    const nextMode = mode === 'line-by-line' ? 'line-by-line' : 'side-by-side';
    currentViewMode = nextMode;
    viewModeButtons.forEach(button => {
      const active = button.dataset.mode === nextMode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const renderDiff = (leftSource, rightSource, options) => {
    const leftLabel = `${options.leftRelease}/${options.module}/${options.functionName}`;
    const rightLabel = `${options.rightRelease}/${options.module}/${options.functionName}`;
    const preparedLeft = preprocessBinDiffSource(leftSource, diffSettings);
    const preparedRight = preprocessBinDiffSource(rightSource, diffSettings);

    const patch = window.Diff.createTwoFilesPatch(
      leftLabel,
      rightLabel,
      preparedLeft,
      preparedRight,
      '',
      '',
      { context: 4 }
    );
    const ui = new window.Diff2HtmlUI(output, patch, {
      drawFileList: false,
      matching: 'lines',
      outputFormat: options.viewMode,
      synchronisedScroll: true,
      highlight: true,
      fileListToggle: false,
      fileContentToggle: false,
      stickyFileHeaders: true,
      renderNothingWhenEmpty: false
    }, window.hljs);
    ui.draw();
  };

  const runComparison = async () => {
    const functionName = functionSelect.value.trim();
    if (!functionName) return;
    if (!leftFileMap.has(functionName) || !rightFileMap.has(functionName)) return;

    try {
      await ensureBinDiffAssets();

      const leftFile = leftFileMap.get(functionName);
      const rightFile = rightFileMap.get(functionName);
      const [leftSource, rightSource] = await Promise.all([
        fetch(leftFile.downloadUrl, { cache: 'force-cache' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch left source (${res.status})`);
          return res.text();
        }),
        fetch(rightFile.downloadUrl, { cache: 'force-cache' }).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch right source (${res.status})`);
          return res.text();
        })
      ]);

      const options = {
        leftRelease: leftReleaseSelect.value,
        rightRelease: rightReleaseSelect.value,
        module: moduleSelect.value,
        functionName,
        viewMode: currentViewMode
      };
      renderDiff(leftSource, rightSource, options);
      setSourceLinks(
        [options.leftRelease, options.module, functionName],
        [options.rightRelease, options.module, functionName]
      );
      updateUrlState();
      setComparisonUiVisible(true);
      lastComparisonState = { leftSource, rightSource, options };
    } catch (error) {
      clearComparison();
    }
  };

  const refreshFunctions = async (preferredFunction, autoRun = false) => {
    const leftRelease = leftReleaseSelect.value;
    const rightRelease = rightReleaseSelect.value;
    const module = moduleSelect.value;
    if (!leftRelease || !rightRelease || !module) return;

    const token = ++selectionUpdateToken;
    try {
      const [leftFiles, rightFiles] = await Promise.all([
        listRepoFunctionFiles([leftRelease, module]),
        listRepoFunctionFiles([rightRelease, module])
      ]);
      if (token !== selectionUpdateToken) return;

      leftFileMap = new Map(leftFiles.map(file => [file.name, file]));
      rightFileMap = new Map(rightFiles.map(file => [file.name, file]));
      const rightNames = new Set(rightFiles.map(file => file.name));
      const sharedFunctions = leftFiles
        .map(file => file.name)
        .filter(name => rightNames.has(name))
        .sort((a, b) => RELEASE_NAME_COLLATOR.compare(a, b));

      const selectedFunction = replaceFunctionOptions(sharedFunctions, preferredFunction);
      runButton.disabled = sharedFunctions.length === 0;
      if (!sharedFunctions.length) {
        clearComparison();
        return;
      }
      if (autoRun && selectedFunction) {
        await runComparison();
      }
    } catch (error) {
      if (token !== selectionUpdateToken) return;
      clearComparison();
    }
  };

  const refreshModules = async (preferredModule, preferredFunction, autoRun = false) => {
    const leftRelease = leftReleaseSelect.value;
    const rightRelease = rightReleaseSelect.value;
    if (!leftRelease || !rightRelease) return;

    const token = ++selectionUpdateToken;
    try {
      const [leftModules, rightModules] = await Promise.all([
        listRepoDirectories([leftRelease]),
        listRepoDirectories([rightRelease])
      ]);
      if (token !== selectionUpdateToken) return;

      const rightModuleSet = new Set(rightModules);
      const sharedModules = leftModules
        .filter(module => rightModuleSet.has(module))
        .sort((a, b) => RELEASE_NAME_COLLATOR.compare(a, b));

      const selectedModule = replaceOptions(moduleSelect, sharedModules, preferredModule);
      if (!sharedModules.length) {
        clearComparison();
        return;
      }
      await refreshFunctions(preferredFunction, autoRun && Boolean(selectedModule));
    } catch (error) {
      if (token !== selectionUpdateToken) return;
      clearComparison();
    }
  };

  const readUrlState = () => {
    const params = new URLSearchParams(location.search);
    return {
      left: params.get('left') || '',
      right: params.get('right') || '',
      module: params.get('module') || '',
      functionName: params.get('function') || '',
      mode: params.get('mode') || ''
    };
  };

  const applyViewState = state => {
    setViewMode(state.mode);
  };

  const rerenderLastComparison = () => {
    if (!lastComparisonState) return;
    lastComparisonState.options.viewMode = currentViewMode;
    renderDiff(lastComparisonState.leftSource, lastComparisonState.rightSource, lastComparisonState.options);
    setComparisonUiVisible(true);
    updateUrlState();
  };

  const initialize = async () => {
    clearComparison();
    runButton.disabled = true;
    try {
      await ensureBinDiffAssets();
      const releases = (await listRepoDirectories([])).sort(compareReleaseNames);
      if (!releases.length) {
        return;
      }

      const urlState = readUrlState();
      const leftDefault = releases.includes(urlState.left) ? urlState.left : releases[0];
      const rightFallback = releases.find(release => release !== leftDefault) || leftDefault;
      const rightDefault = releases.includes(urlState.right) ? urlState.right : rightFallback;

      replaceOptions(leftReleaseSelect, releases, leftDefault);
      replaceOptions(rightReleaseSelect, releases, rightDefault);
      applyViewState(urlState);
      await refreshModules(urlState.module, urlState.functionName, false);
    } catch (error) {
    }
  };

  leftReleaseSelect.addEventListener('change', () => {
    clearComparison();
    refreshModules(moduleSelect.value, functionSelect.value);
  });
  rightReleaseSelect.addEventListener('change', () => {
    clearComparison();
    refreshModules(moduleSelect.value, functionSelect.value);
  });
  moduleSelect.addEventListener('change', () => {
    clearComparison();
    refreshFunctions(functionSelect.value);
  });
  functionSelect.addEventListener('change', () => {
    clearComparison();
    updateUrlState();
  });
  ensureFunctionLimitControls();
  if (functionLimitInput) {
    functionLimitInput.addEventListener('input', () => {
      if (functionLimitUnlimited?.checked) functionLimitUnlimited.checked = false;
    });
    functionLimitInput.addEventListener('change', () => {
      if (functionLimitUnlimited?.checked) functionLimitUnlimited.checked = false;
      applyFunctionSearchLimit(functionLimitInput.value, false, true);
    });
    functionLimitInput.addEventListener('blur', () => {
      if (functionLimitUnlimited?.checked) functionLimitUnlimited.checked = false;
      applyFunctionSearchLimit(functionLimitInput.value, false, true);
    });
  }
  if (functionLimitUnlimited) {
    functionLimitUnlimited.addEventListener('change', () => {
      if (functionLimitUnlimited.checked) {
        applyFunctionSearchLimit(BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT, true, true);
        return;
      }
      applyFunctionSearchLimit(functionLimitInput?.value || BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT, false, true);
    });
  }
  settingsButton.addEventListener('click', () => {
    openSettingsModal();
  });
  settingsCloseButton.addEventListener('click', () => {
    closeSettingsModal();
  });
  settingsDoneButton.addEventListener('click', () => {
    closeSettingsModal();
  });
  settingsResetButton.addEventListener('click', () => {
    diffSettings = { ...BIN_DIFF_DIFF_SETTINGS_DEFAULTS };
    writeBinDiffSettings(diffSettings);
    syncSettingsUi();
    if (lastComparisonState) {
      rerenderLastComparison();
    }
  });
  settingsModal.addEventListener('click', event => {
    if (event.target === settingsModal) {
      closeSettingsModal();
    }
  });
  settingsHeader.addEventListener('pointerdown', event => {
    if (event.button !== 0 || settingsModal.hidden) return;
    if (event.target instanceof Element && event.target.closest('button')) return;
    event.preventDefault();
    if (settingsDialog.dataset.positioned !== 'true') {
      centerSettingsDialog();
    }

    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = settingsDialog.offsetLeft;
    const startTop = settingsDialog.offsetTop;
    const width = settingsDialog.offsetWidth;
    const height = settingsDialog.offsetHeight;
    const maxLeft = Math.max(0, settingsModal.clientWidth - width);
    const maxTop = Math.max(0, settingsModal.clientHeight - height);
    let rafId = 0;
    let pendingX = startX;
    let pendingY = startY;
    let lastLeft = startLeft;
    let lastTop = startTop;

    settingsHeader.setPointerCapture(event.pointerId);
    settingsDialog.style.willChange = 'transform';

    const paintDrag = () => {
      rafId = 0;
      const dx = pendingX - startX;
      const dy = pendingY - startY;
      const nextLeft = Math.min(Math.max(0, startLeft + dx), maxLeft);
      const nextTop = Math.min(Math.max(0, startTop + dy), maxTop);
      lastLeft = nextLeft;
      lastTop = nextTop;
      settingsDialog.style.transform = `translate3d(${nextLeft - startLeft}px, ${nextTop - startTop}px, 0)`;
    };

    const onMove = moveEvent => {
      pendingX = moveEvent.clientX;
      pendingY = moveEvent.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(paintDrag);
    };

    const onUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      paintDrag();
      settingsDialog.style.transform = 'none';
      settingsDialog.style.left = `${lastLeft}px`;
      settingsDialog.style.top = `${lastTop}px`;
      settingsDialog.style.willChange = '';
      settingsDialog.dataset.positioned = 'true';
      settingsHeader.releasePointerCapture(event.pointerId);
      settingsHeader.removeEventListener('pointermove', onMove);
      settingsHeader.removeEventListener('pointerup', onUp);
    };

    settingsHeader.addEventListener('pointermove', onMove);
    settingsHeader.addEventListener('pointerup', onUp);
  });
  window.addEventListener('resize', () => {
    if (settingsModal.hidden) return;
    clampSettingsDialogPosition();
  });
  [stripXrefsInput, stripAddressesInput, stripLocationsInput, normalizeIdentifiersInput, trimWhitespaceInput].forEach(input => {
    input.addEventListener('change', () => {
      applySettingsFromUi();
    });
  });
  runButton.addEventListener('click', () => {
    runComparison();
  });
  swapButton.addEventListener('click', () => {
    const previousLeft = leftReleaseSelect.value;
    leftReleaseSelect.value = rightReleaseSelect.value;
    rightReleaseSelect.value = previousLeft;
    refreshModules(moduleSelect.value, functionSelect.value, true);
  });
  viewModeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.mode === currentViewMode) return;
      setViewMode(button.dataset.mode);
      if (lastComparisonState) {
        rerenderLastComparison();
      } else {
        updateUrlState();
      }
    });
  });
  maximizeButton.addEventListener('click', () => {
    if (!lastComparisonState) return;
    setMaximized(!isMaximized);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (!settingsModal.hidden) {
      event.preventDefault();
      closeSettingsModal();
      return;
    }
    if (!isMaximized) return;
    event.preventDefault();
    setMaximized(false);
  });

  initFunctionSearchLimit();
  syncSettingsUi();
  initialize();
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
    const width = rect.width;
    const height = rect.height;
    const maxLeft = Math.max(0, parentRect.width - width);
    const maxTop = Math.max(0, parentRect.height - height);
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
      windowEl.style.transform = '';
      windowEl.style.left = `${lastLeft}px`;
      windowEl.style.top = `${lastTop}px`;
      windowEl.style.willChange = '';
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
  const ghost = document.getElementById('console-ghost');
  if (!consoleRoot || !output || !lines || !form || !input || !caret || !measure || !ghost) return;
  if (consoleRoot.dataset.ready === 'true') return;
  consoleRoot.dataset.ready = 'true';

  initConsoleWindow();

  const promptUser = 'nohuto';
  const promptHost = 'noverse';
  const rootPath = '~/main';
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
    if (head === 'theme' && (parts.length > 1 || hasTrailingSpace)) {
      const seed = parts.length > 1 ? parts.slice(1).join(' ') : '';
      const match = firstMatch(listThemes(), seed);
      return match ? `theme ${match}` : '';
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
    caret.style.left = `${width + caretOffset}px`;
    caret.style.height = `${input.offsetHeight}px`;
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
    if (raw.startsWith('main/')) raw = raw.slice(5);
    raw = raw.split('/').filter(Boolean).pop() || '';
    if (raw === 'home') return rootPath;
    if (['product', 'projects', 'bin-diff', 'docs'].includes(raw)) {
      return `${rootPath}/${raw}`;
    }
    return null;
  };

  const listDirs = () => {
    if (currentPath === rootPath) {
      return ['./product', './projects', './bin-diff', './docs'];
    }
    return ['..'];
  };

  const NAV_MAP = {
    home: 'index.html',
    product: 'product.html',
    projects: 'projects.html',
    'bin-diff': 'bin-diff.html',
    docs: 'docs/'
  };

  const navigateToPath = nextPath => {
    const segment = nextPath === rootPath ? 'home' : nextPath.split('/').pop();
    const target = NAV_MAP[segment];
    if (!target) return;
    if (target === 'docs/') {
      location.href = target;
      return;
    }
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
    cbindiff: 'cd bin-diff',
    cdocs: 'cd docs',
    cabout: 'about',
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

  const commands = {
    help: () => {
      addLine('available commands:');
      const entries = [
        ['help', 'show this help message'],
        ['about', 'about me + links'],
        ['product', 'winconfig summary + pricing'],
        ['docs', 'documentation hub + section links'],
        ['bindiff', 'open binary pseudocode diff page'],
        ['toolkit', 'external tools list'],
        ['projects', 'list projects with repo links'],
        ['terms', 'terms of service summary'],
        ['contact', 'email + discord'],
        ['ascii', 'print the banner'],
        ['ls', 'list available directories'],
        ['pwd', 'show current directory'],
        ['cd <path>', 'change directory (./product, ./projects, ./bin-diff, ./docs, ../)'],
        ['alias', 'list aliases'],
        ['alias name=command', 'set alias'],
        ['unalias <name>', 'remove alias'],
        ['themes', 'list theme ids'],
        ['theme <id>', 'set theme'],
        ['fontsize <10-22>', 'set size'],
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
        ['name', 'nohuto (Discord: ".nohuto", 836853057235976232)'],
        ['proprietor', 'Noverse'],
        ['github', 'https://github.com/nohuto'],
        ['youtube', 'https://www.youtube.com/@5Noverse'],
        ['discord', 'https://discord.gg/E2ybG4j9jU']
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
      addLine('documentation:');
      addKeyValueLines([
        ['main docs', 'docs/'],
        ['docs home', 'docs/'],
        ['winconfig', 'docs/win-config/'],
        ['win registry', 'docs/win-registry/'],
        ['system', 'docs/win-config/system/'],
        ['visibility', 'docs/win-config/visibility/'],
        ['peripheral', 'docs/win-config/peripheral/'],
        ['power', 'docs/win-config/power/'],
        ['privacy', 'docs/win-config/privacy/'],
        ['network', 'docs/win-config/network/'],
        ['nvidia', 'docs/win-config/nvidia/'],
        ['cleanup', 'docs/win-config/cleanup/'],
        ['misc', 'docs/win-config/misc/'],
        ['policies', 'docs/win-config/policies/'],
        ['affinities', 'docs/win-config/affinities/']
      ]);
    },
    bindiff: () => {
      addLine('opening bin-diff...');
      navigateToPath(`${rootPath}/bin-diff`);
    },
    toolkit: () => {
      addLine('external tools:');
      addKeyValueLines([
        ['app tools', 'https://github.com/nohuto/app-tools'],
        ['game tools', 'https://github.com/nohuto/game-tools'],
        ['component manager', 'https://github.com/nohuto/comp-mgr'],
        ['blocklist manager', 'https://github.com/nohuto/blocklist-mgr'],
        ['bitmask calculator', 'https://github.com/nohuto/bitmask-calc']
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
        ['email', 'use the footer icon to copy'],
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
      lines.replaceChildren();
      scrollToBottom();
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
  addLine('welcome to the terminal, use Tab or Right Arrow for autocompletion.', 'muted');
  addLine('use the top sections to navigate if the terminal feels unfamiliar.', 'muted');
  addLine(' ');
  commands.help();
}

document.addEventListener('DOMContentLoaded', () => {
  setActive(location.pathname.split('/').pop() || 'index.html');
  initTheme();
  initBackground();
  initTypography();
  initSelectUI();
  initRepoDescriptions();
  initFiltering();
  initBinDiff();
  initClipboard();
  initConsole();
});
