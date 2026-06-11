/* Copyright (c) 2026 Nohuto */
(() => {
  const ACTIVE_PAGE_PATH_KEY = 'nv-active-page-path';
  const NOT_FOUND_PATH_KEY = 'nv-not-found-path';
  const MAIN_PAGE_ROUTES = [
    { clean: '/', file: '/index.html' },
    { clean: '/product', file: '/product.html' },
    { clean: '/projects', file: '/projects.html' },
    { clean: '/bin-diff', file: '/bin-diff.html' },
    { clean: '/policies', file: '/policies.html' }
  ];
  const routeAliases = new Map();
  MAIN_PAGE_ROUTES.forEach(route => {
    routeAliases.set(route.clean, route);
    routeAliases.set(route.file, route);
  });
  const getRoute = pathname => {
    const path = String(pathname || '/');
    const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`.toLowerCase();
    return routeAliases.get(normalized) || null;
  };
  const requestedPath = `${location.pathname}${location.search}${location.hash}`;
  let fallbackPath = '/';

  try {
    sessionStorage.setItem(NOT_FOUND_PATH_KEY, requestedPath);
    const activePath = sessionStorage.getItem(ACTIVE_PAGE_PATH_KEY);
    const activeRoute = getRoute(activePath);
    if (activeRoute) fallbackPath = activeRoute.clean;
  } catch { }

  location.replace(fallbackPath);
})();
