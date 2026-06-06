/* Copyright (c) 2026 Nohuto */
(() => {
  const THEME_KEY = 'nv-theme';
  const BG_KEY = 'nv-bg';
  const THEME_SYSTEM = 'system';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const DEFAULT_THEME = THEME_SYSTEM;
  const DEFAULT_BG = 'dots';
  const FONT_KEY = 'nv-font';

  const THEME_OPTIONS = new Set([
    'system',
    'dark',
    'light',
    'ayu-dark',
    'ayu-light',
    'catppuccin-frappe',
    'catppuccin-latte',
    'catppuccin-macchiato',
    'catppuccin-mocha',
    'everforest-dark',
    'everforest-light',
    'gray-black',
    'gruvbox-dark',
    'gruvbox-light',
    'horizon',
    'kanagawa-dragon',
    'kanagawa-lotus',
    'kanagawa-wave',
    'monokai',
    'night-owl',
    'nord',
    'one-dark',
    'one-light',
    'purple-black',
    'rose-pine',
    'rose-pine-moon',
    'solarized-dark',
    'solarized-light'
  ]);

  const BG_OPTIONS = new Set([
    'clear',
    'diamonds',
    'noise',
    'dots',
    'grid',
    'carbon',
    'starfield'
  ]);
  const FONT_OPTIONS = new Set([
    'cascadia'
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
    const selected = candidate && allowed.has(candidate) ? candidate : fallback;
    if (!selected) return;
    document.documentElement.setAttribute(attr, selected);
  };

  const getSystemDefaultTheme = () => {
    try {
      return window.matchMedia('(prefers-color-scheme: light)').matches
        ? THEME_LIGHT
        : THEME_DARK;
    } catch {
      return THEME_DARK;
    }
  };

  const setTheme = value => {
    const candidate = (value || '').trim();
    const selected = candidate && THEME_OPTIONS.has(candidate) ? candidate : DEFAULT_THEME;
    const applied = selected === THEME_SYSTEM ? getSystemDefaultTheme() : selected;
    document.documentElement.setAttribute('data-theme-setting', selected);
    document.documentElement.setAttribute('data-theme', applied);
  };

  try {
    setTheme(safeGet(THEME_KEY) || DEFAULT_THEME);
    setAttrIfValid('data-bg', safeGet(BG_KEY) || DEFAULT_BG, BG_OPTIONS, DEFAULT_BG);
    setAttrIfValid('data-font', safeGet(FONT_KEY), FONT_OPTIONS);
  } catch {
  }
})();
