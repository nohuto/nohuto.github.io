/* Copyright (c) 2026 Nohuto */
const THEME_KEY = 'nv-theme';
const THEME_SYSTEM = 'system';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const DEFAULT_THEME = THEME_SYSTEM;
const LIGHT_THEMES = new Set([
  THEME_LIGHT,
  'gruvbox-light',
  'kanagawa-lotus',
  'catppuccin-latte',
  'solarized-light',
  'one-light',
  'ayu-light',
  'everforest-light'
]);
const BG_KEY = 'nv-bg';
const DEFAULT_BG = 'dots';
const BG_KEYS = ['clear', 'diamonds', 'noise', 'dots', 'grid', 'carbon', 'starfield'];
const BG_SET = new Set(BG_KEYS);
const KEYFRAMES_ICON_DARK = 'main/icons/dark/keyframes.svg';
const KEYFRAMES_ICON_LIGHT = 'main/icons/light/keyframes.svg';
const ACTIVE_PAGE_PATH_KEY = 'nv-active-page-path';
const NOT_FOUND_PATH_KEY = 'nv-not-found-path';
const MAIN_PAGE_PATHS = new Set(['/', '/index.html', '/product.html', '/projects.html', '/bin-diff.html', '/policies.html']);
const FONT_KEY = 'nv-font';
const FONT_SIZE_KEY = 'nv-font-size';
const DEFAULT_FONT = 'cascadia';
const DEFAULT_FONT_SIZE = 13;
const FONT_SIZE_MIN = 10;
const FONT_SIZE_MAX = 22;
const FONT_KEYS = ['cascadia'];
const FONT_SET = new Set(FONT_KEYS);
const REPO_DESC_URL = 'main/data/repos.json';
const SELECT_SEARCH_RENDER_LIMIT_DEFAULT = 300;
const PAGE_FEATURES = Object.freeze([
  { rootId: 'console', src: 'main/terminal.js', initName: 'initConsole' },
  { rootId: 'policy-explorer', src: 'main/policies.js', styleHref: 'main/tools.css', initName: 'initPolicyExplorer' },
  { rootId: 'bin-diff-app', src: 'main/bin-diff.js', styleHref: 'main/tools.css', initName: 'initBinDiff' }
]);
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: light)';

let toastTimer;
let repoDescriptionsPromise;
let selectUiListener;
let selectUiKeyListener;
let terminalExited = false;
let siteErrorReturnFocus;
const pageFeaturePromises = new Map();
const pageFeatureStylePromises = new Map();

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

const rememberActivePage = pathname => {
  if (!MAIN_PAGE_PATHS.has(pathname)) return;
  try {
    sessionStorage.setItem(ACTIVE_PAGE_PATH_KEY, pathname);
  } catch { }
};

const consumeNotFoundPath = () => {
  try {
    const pathname = sessionStorage.getItem(NOT_FOUND_PATH_KEY) || '';
    sessionStorage.removeItem(NOT_FOUND_PATH_KEY);
    return pathname;
  } catch {
    return '';
  }
};

const hasSelectOption = (select, value) => Array.from(select.options).some(option => option.value === value);
const closeSelectUIs = except => {
  document.querySelectorAll('.select-ui.open').forEach(wrapper => {
    if (wrapper === except) return;
    wrapper.classList.remove('open');
    wrapper.querySelector('.select-trigger')?.setAttribute('aria-expanded', 'false');
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

function applyTerminalExitState() {
  document.documentElement.toggleAttribute('data-terminal-exited', terminalExited);
  document.querySelectorAll('.nav-tabs a[href="index.html"]').forEach(link => {
    link.hidden = terminalExited;
    link.style.display = terminalExited ? 'none' : '';
    link.setAttribute('aria-hidden', terminalExited ? 'true' : 'false');
    if (terminalExited) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    } else {
      link.removeAttribute('aria-hidden');
    }
  });
  document.querySelectorAll('main.main-terminal, .terminal-shell, #console-window').forEach(node => {
    node.hidden = terminalExited;
  });
}

function getPromptDirectory(pathname = location.pathname) {
  const normalized = String(pathname || '')
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();

  if (!normalized || normalized === 'index.html') return 'terminal';
  if (normalized === 'product.html') return 'product';
  if (normalized === 'projects.html') return 'projects';
  if (normalized === 'bin-diff.html') return 'bin-diff';
  if (normalized === 'policies.html') return 'policies';
  if (normalized === 'docs' || normalized.startsWith('docs/')) return 'docs';
  return 'terminal';
}

function getPromptPath(pathname = location.pathname) {
  return `:~/${getPromptDirectory(pathname)}`;
}

function updatePromptBar(pathname = location.pathname) {
  const nextPath = getPromptPath(pathname);
  document.querySelectorAll('.prompt-bar .prompt-path').forEach(node => {
    node.textContent = nextPath;
  });
}

function updateIconTheme(theme) {
  const applied = resolveTheme(theme || document.documentElement.getAttribute('data-theme') || DEFAULT_THEME);
  const useLight = LIGHT_THEMES.has(applied);
  document.querySelectorAll('img[data-dark-src][data-light-src]').forEach(img => {
    const next = useLight ? img.getAttribute('data-light-src') : img.getAttribute('data-dark-src');
    if (!next || img.getAttribute('src') === next) return;
    img.setAttribute('src', next);
  });
}

function getSystemDefaultTheme() {
  try {
    return window.matchMedia(SYSTEM_THEME_QUERY).matches ? THEME_LIGHT : THEME_DARK;
  } catch {
    return THEME_DARK;
  }
}

function normalizeTheme(theme) {
  return String(theme || '').trim();
}

function resolveTheme(theme) {
  const normalized = normalizeTheme(theme);
  return normalized === THEME_SYSTEM ? getSystemDefaultTheme() : (normalized || THEME_DARK);
}

function applyTheme(theme) {
  const selected = normalizeTheme(theme || DEFAULT_THEME);
  const applied = resolveTheme(selected);
  document.documentElement.setAttribute('data-theme-setting', selected);
  document.documentElement.setAttribute('data-theme', applied);
  updateIconTheme(applied);
  document.dispatchEvent(new CustomEvent('nv:theme-change', {
    detail: {
      theme: selected,
      appliedTheme: applied,
      isLight: LIGHT_THEMES.has(applied)
    }
  }));
  return selected;
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
    let optionsDirty = true;
    const getSearchRenderLimit = () => {
      const raw = (select.dataset.searchLimit || '').trim().toLowerCase();
      if (!raw) return SELECT_SEARCH_RENDER_LIMIT_DEFAULT;
      if (raw === 'all' || raw === 'unlimited' || raw === '0' || raw === 'inf' || raw === 'infinity') {
        return Number.POSITIVE_INFINITY;
      }
      const parsed = Number.parseInt(raw, 10);
      if (!Number.isFinite(parsed) || parsed < 1) return SELECT_SEARCH_RENDER_LIMIT_DEFAULT;
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
      optionsDirty = false;
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
      if (forceRebuild) optionsDirty = true;
      if (!wrapper.classList.contains('open')) {
        updateActive();
        return;
      }
      if (isSearchable || optionsDirty) {
        buildOptions(searchValue);
        if (!isSearchable) lastOptionSignature = optionSignature();
      } else {
        const nextSignature = optionSignature();
        if (nextSignature !== lastOptionSignature) {
          buildOptions();
          lastOptionSignature = nextSignature;
        }
      }
      updateActive();
    };

    const toggleOpen = () => {
      const next = !wrapper.classList.contains('open');
      closeSelectUIs(wrapper);
      wrapper.classList.toggle('open', next);
      trigger.setAttribute('aria-expanded', next ? 'true' : 'false');
      if (next) syncMenuOptions();
      if (next && searchInput) {
        requestAnimationFrame(() => searchInput?.focus({ preventScroll: true }));
      }
    };

    updateActive();
    select.addEventListener('change', () => syncMenuOptions());
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

  const stored = normalizeTheme(storageGet(THEME_KEY, document.documentElement.getAttribute('data-theme-setting') || DEFAULT_THEME));
  const initial = hasSelectOption(select, stored) ? stored : DEFAULT_THEME;
  applyTheme(initial);
  select.value = initial;

  select.addEventListener('change', () => {
    const next = select.value || DEFAULT_THEME;
    applyTheme(next);
    storageSet(THEME_KEY, next);
  });

  try {
    const media = window.matchMedia(SYSTEM_THEME_QUERY);
    const syncSystemTheme = () => {
      if (select.value !== THEME_SYSTEM) return;
      applyTheme(THEME_SYSTEM);
    };
    media.addEventListener('change', syncSystemTheme);
  } catch { }
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
    const message = source.getAttribute('data-toast') || (ok ? 'Key copied' : 'Copy failed');
    showToast(message);
  });
}

function hideSiteError() {
  const modal = document.getElementById('site-error-modal');
  if (!modal) return;
  modal.hidden = true;
  if (siteErrorReturnFocus?.isConnected) {
    siteErrorReturnFocus.focus();
  }
  siteErrorReturnFocus = null;
}

function createSiteErrorModal() {
  const modal = document.createElement('div');
  modal.className = 'site-error-modal';
  modal.id = 'site-error-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <section class="site-error-dialog" role="alertdialog" aria-modal="true" aria-labelledby="site-error-title" aria-describedby="site-error-message">
      <header class="site-error-header">
        <h2 id="site-error-title">404</h2>
        <button class="site-error-close" type="button" data-site-error-close aria-label="Close error message" title="Close error message">
          <svg class="bindiff-close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </header>
      <div class="site-error-body">
        <p id="site-error-message">The requested page could not be found.</p>
        <code class="site-error-path"></code>
      </div>
    </section>
  `;
  const dialog = modal.querySelector('.site-error-dialog');
  const header = modal.querySelector('.site-error-header');
  if (!(dialog instanceof HTMLElement) || !(header instanceof HTMLElement)) return modal;

  const clampDialogPosition = () => {
    if (modal.hidden) return;
    const maxLeft = Math.max(0, modal.clientWidth - dialog.offsetWidth);
    const maxTop = Math.max(0, modal.clientHeight - dialog.offsetHeight);
    dialog.style.left = `${Math.min(Math.max(0, dialog.offsetLeft), maxLeft)}px`;
    dialog.style.top = `${Math.min(Math.max(0, dialog.offsetTop), maxTop)}px`;
    dialog.style.transform = 'none';
  };

  const centerDialog = () => {
    dialog.style.left = `${Math.max(0, (modal.clientWidth - dialog.offsetWidth) / 2)}px`;
    dialog.style.top = `${Math.max(0, (modal.clientHeight - dialog.offsetHeight) / 2)}px`;
    dialog.style.transform = 'none';
    dialog.dataset.positioned = 'true';
  };

  header.addEventListener('pointerdown', event => {
    if (event.button !== 0 || modal.hidden) return;
    if (event.target instanceof Element && event.target.closest('button')) return;
    event.preventDefault();
    if (dialog.dataset.positioned !== 'true') centerDialog();

    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = dialog.offsetLeft;
    const startTop = dialog.offsetTop;
    const maxLeft = Math.max(0, modal.clientWidth - dialog.offsetWidth);
    const maxTop = Math.max(0, modal.clientHeight - dialog.offsetHeight);
    let lastLeft = startLeft;
    let lastTop = startTop;

    header.setPointerCapture(event.pointerId);

    const onMove = moveEvent => {
      lastLeft = Math.min(Math.max(0, startLeft + moveEvent.clientX - startX), maxLeft);
      lastTop = Math.min(Math.max(0, startTop + moveEvent.clientY - startY), maxTop);
      dialog.style.left = `${lastLeft}px`;
      dialog.style.top = `${lastTop}px`;
    };

    const onUp = () => {
      dialog.dataset.positioned = 'true';
      header.releasePointerCapture(event.pointerId);
      header.removeEventListener('pointermove', onMove);
      header.removeEventListener('pointerup', onUp);
    };

    header.addEventListener('pointermove', onMove);
    header.addEventListener('pointerup', onUp);
  });
  window.addEventListener('resize', clampDialogPosition);
  modal.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (target === modal || target?.closest('[data-site-error-close]')) {
      hideSiteError();
    }
  });
  modal.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    hideSiteError();
  });
  document.body.appendChild(modal);
  return modal;
}

function showNotFoundError(url) {
  const modal = document.getElementById('site-error-modal') || createSiteErrorModal();
  const requestedUrl = new URL(url, location.href);
  const path = `${requestedUrl.pathname}${requestedUrl.search}${requestedUrl.hash}`;
  const pathElement = modal.querySelector('.site-error-path');
  if (pathElement) pathElement.textContent = path;
  siteErrorReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  modal.hidden = false;
  const dialog = modal.querySelector('.site-error-dialog');
  if (dialog instanceof HTMLElement) {
    requestAnimationFrame(() => {
      const maxLeft = Math.max(0, modal.clientWidth - dialog.offsetWidth);
      const maxTop = Math.max(0, modal.clientHeight - dialog.offsetHeight);
      if (dialog.dataset.positioned !== 'true') {
        dialog.style.left = `${maxLeft / 2}px`;
        dialog.style.top = `${maxTop / 2}px`;
        dialog.dataset.positioned = 'true';
      } else {
        dialog.style.left = `${Math.min(Math.max(0, dialog.offsetLeft), maxLeft)}px`;
        dialog.style.top = `${Math.min(Math.max(0, dialog.offsetTop), maxTop)}px`;
      }
    });
  }
  modal.querySelector('[data-site-error-close]')?.focus();
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

const loadPageFeatureScript = src => {
  if (pageFeaturePromises.has(src)) return pageFeaturePromises.get(src);

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load page feature: ${src}`));
    document.head.appendChild(script);
  });
  pageFeaturePromises.set(src, promise);
  return promise;
};

const loadPageFeatureStyle = href => {
  const isLoaded = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .some(link => link.getAttribute('href') === href);
  if (isLoaded) return Promise.resolve();
  if (pageFeatureStylePromises.has(href)) return pageFeatureStylePromises.get(href);

  const promise = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load page feature stylesheet: ${href}`));
    document.head.appendChild(link);
  });
  pageFeatureStylePromises.set(href, promise);
  return promise;
};

async function initPageFeatures() {
  for (const feature of PAGE_FEATURES) {
    if (!document.getElementById(feature.rootId)) continue;
    if (feature.styleHref) {
      await loadPageFeatureStyle(feature.styleHref);
    }
    if (typeof window[feature.initName] !== 'function') {
      await loadPageFeatureScript(feature.src);
    }
    const initialize = window[feature.initName];
    if (typeof initialize !== 'function') {
      throw new Error(`Page feature did not register ${feature.initName}`);
    }
    initialize();
  }
}

async function loadPage(url, push = true) {
  const main = document.querySelector('main');
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (res.status === 404) {
      showNotFoundError(url);
      return;
    }
    if (!res.ok) throw new Error(`Page request failed with status ${res.status}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');
    if (!newMain) throw new Error('No main element in response');
    sanitizeMain(newMain);
    const newTitle = doc.querySelector('title')?.textContent || document.title;
    const nextPathname = new URL(url, location.href).pathname;
    rememberActivePage(nextPathname);
    window.stopConsoleAnimation?.();
    main.replaceWith(newMain);
    document.title = newTitle;
    setActive(nextPathname.split('/').pop() || 'index.html');
    applyTerminalExitState();
    updatePromptBar(nextPathname);
    initRepoDescriptions();
    initClickableCards();
    initFiltering();
    initSelectUI();
    await initPageFeatures();

    if (push) history.pushState({ url }, '', url);
  } catch {
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
  const cards = document.querySelectorAll('.project-card[data-repo], .tool-card[data-repo]');
  if (!cards.length) return;
  cards.forEach(card => {
    const repo = card.getAttribute('data-repo');
    const descEl = card.querySelector('.project-desc, .tool-desc');
    if (!repo || !descEl) return;
    getRepoDescription(repo).then(desc => {
      descEl.textContent = desc;
    });
  });
}

function initClickableCards() {
  const cards = document.querySelectorAll('.clickable-card');

  cards.forEach(card => {
    if (!(card instanceof HTMLElement) || card.dataset.cardReady === 'true') return;
    const href = card.dataset.cardHref || (card.dataset.repo ? `https://github.com/${card.dataset.repo}` : '');
    if (!href) return;

    const title = card.querySelector('h3, h4')?.textContent?.trim() || 'card';
    const link = document.createElement('a');
    link.className = 'clickable-card-link';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Open ${title}`);

    card.dataset.cardReady = 'true';
    card.appendChild(link);
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



document.addEventListener('DOMContentLoaded', () => {
  const notFoundPath = consumeNotFoundPath();
  rememberActivePage(location.pathname);
  setActive(location.pathname.split('/').pop() || 'index.html');
  applyTerminalExitState();
  updatePromptBar(location.pathname);
  initTheme();
  initBackground();
  initTypography();
  initSelectUI();
  initRepoDescriptions();
  initClickableCards();
  initFiltering();
  initPageFeatures().catch(error => console.error(error));
  initClipboard();
  if (notFoundPath) showNotFoundError(notFoundPath);
});
