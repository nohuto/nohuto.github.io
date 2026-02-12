/* Copyright (c) 2026 Nohuto. All rights reserved. */
(() => {
  const THEME_KEY = 'nv-theme';
  const BG_KEY = 'nv-bg';
  const FONT_KEY = 'nv-font';
  const FONT_SIZE_KEY = 'nv-font-size';
  const DEFAULT_BG = 'topo-trace';
  const FONT_SIZE_MIN = 10;
  const FONT_SIZE_MAX = 22;

  const THEME_OPTIONS = new Set([
    'default-dark',
    'default-light',
    'ayu-dark',
    'ayu-light',
    'catppuccin-frappe',
    'catppuccin-latte',
    'catppuccin-macchiato',
    'catppuccin-mocha',
    'dracula',
    'everforest-dark',
    'everforest-light',
    'gruvbox-dark',
    'gruvbox-light',
    'horizon',
    'kanagawa-dragon',
    'kanagawa-lotus',
    'kanagawa-wave',
    'material',
    'monokai',
    'night-owl',
    'nord',
    'one-dark',
    'one-light',
    'rose-pine',
    'rose-pine-moon',
    'solarized-dark',
    'solarized-light',
    'tokyo-night'
  ]);

  const BG_OPTIONS = new Set([
    'data-tape',
    'hex-matrix',
    'signal-rails',
    'circuit-loom',
    'phase-noise',
    'mono-shards',
    'topo-trace',
    'quasar-mesh'
  ]);

  const FONT_OPTIONS = new Set([
    'cascadia',
    'jetbrains',
    'fira',
    'ibm',
    'sourcecode',
    'consolas'
  ]);

  const safeGet = key => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const setAttrIfValid = (attr, value, allowed, fallback) => {
    const candidate = (value || '').trim();
    if (candidate && allowed.has(candidate)) {
      document.documentElement.setAttribute(attr, candidate);
      return;
    }
    if (fallback) {
      document.documentElement.setAttribute(attr, fallback);
    }
  };

  const applyFontSize = value => {
    const parsed = Number.parseInt(String(value || '').trim(), 10);
    if (!Number.isFinite(parsed)) return;
    const safe = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, parsed));
    document.documentElement.style.setProperty('--font-size', `${safe}px`);
  };

  try {
    setAttrIfValid('data-theme', safeGet(THEME_KEY), THEME_OPTIONS);
    setAttrIfValid('data-bg', safeGet(BG_KEY) || DEFAULT_BG, BG_OPTIONS, DEFAULT_BG);
    setAttrIfValid('data-font', safeGet(FONT_KEY), FONT_OPTIONS);
    applyFontSize(safeGet(FONT_SIZE_KEY));
  } catch {
    // ignore storage errors or blocked access
  }
})();
