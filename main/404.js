/* Copyright (c) 2026 Nohuto */
(() => {
  const ACTIVE_PAGE_PATH_KEY = 'nv-active-page-path';
  const NOT_FOUND_PATH_KEY = 'nv-not-found-path';
  const MAIN_PAGE_PATHS = new Set(['/', '/index.html', '/product.html', '/projects.html', '/bin-diff.html', '/policies.html']);
  const requestedPath = `${location.pathname}${location.search}${location.hash}`;
  let fallbackPath = '/';

  try {
    sessionStorage.setItem(NOT_FOUND_PATH_KEY, requestedPath);
    const activePath = sessionStorage.getItem(ACTIVE_PAGE_PATH_KEY);
    if (MAIN_PAGE_PATHS.has(activePath)) fallbackPath = activePath;
  } catch { }

  location.replace(fallbackPath);
})();
