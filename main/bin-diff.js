/* Copyright (c) 2026 Nohuto */
(function attachBinDiff(global) {
  'use strict';

  const BIN_DIFF_REPO_API_BASE = 'https://api.github.com/repos/nohuto/decompiled-pseudocode/contents';
  const BIN_DIFF_REPO_RAW_BASE = 'https://raw.githubusercontent.com/nohuto/decompiled-pseudocode/main';
  const BIN_DIFF_REPO_BLOB_BASE = 'https://github.com/nohuto/decompiled-pseudocode/blob/main';
  const BIN_DIFF_REPO_GIT_TREES_BASE = 'https://api.github.com/repos/nohuto/decompiled-pseudocode/git/trees';
  const BIN_DIFF_ASSET_STYLES = [
    'main/vendor/highlight-github-dark.min.css',
    'main/vendor/diff2html.min.css'
  ];
  const BIN_DIFF_ASSET_SCRIPTS = [
    'main/normalization.js',
    'main/vendor/highlight.common.min.js',
    'main/vendor/diff.min.js',
    'main/vendor/diff2html-ui-base.min.js'
  ];
  const BIN_DIFF_FUNCTION_CACHE_KEY = 'nv-bindiff-function-cache-v1';
  const BIN_DIFF_FUNCTION_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
  const BIN_DIFF_FUNCTION_CACHE_MAX_ENTRIES = 6;
  const BIN_DIFF_FUNCTION_SEARCH_LIMIT_KEY = 'nv-bindiff-function-search-limit';
  const BIN_DIFF_FUNCTION_SEARCH_LIMIT_DEFAULT = 300;
  const BIN_DIFF_DEFAULT_LEFT_RELEASE = '11-23H2';
  const BIN_DIFF_DEFAULT_RIGHT_RELEASE = '11-24H2';
  const BIN_DIFF_DIFF_SETTINGS_KEY = 'nv-bindiff-settings-v2';
  const BIN_DIFF_NORMALIZATION_DEFAULTS = Object.freeze({
    stripCrossReferenceMetadata: true,
    normalizeRelocationSymbols: true,
    stripStorageLocationComments: true,
    normalizeDecompilerIdentifiers: true,
    normalizeNumericNotation: true,
    normalizeGeneratedLabels: false,
    normalizePrototypeExpansionArgs: false,
    trimTrailingWhitespace: true
  });
  const getNormalizationDefaults = () => ({
    ...BIN_DIFF_NORMALIZATION_DEFAULTS,
    ...(window.Normalization?.DEFAULTS || {})
  });
  const BIN_DIFF_DIFF_SETTINGS_DEFAULTS = Object.freeze({
    normalization: getNormalizationDefaults(),
    showFullFunction: true
  });
  const RELEASE_NAME_COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  let binDiffAssetsPromise;
  const binDiffAssetPromiseCache = new Map();
  const binDiffEntriesCache = new Map();
  const binDiffFunctionNamesCache = new Map();
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
  const defaults = {
    ...BIN_DIFF_DIFF_SETTINGS_DEFAULTS,
    normalization: getNormalizationDefaults()
  };

  const normalizeNormalizationSettings = candidate => {
    const normalizationDefaults = getNormalizationDefaults();
    if (!candidate || typeof candidate !== 'object') return normalizationDefaults;
    const normalized = { ...normalizationDefaults };
    Object.keys(normalizationDefaults).forEach(key => {
      if (candidate[key] !== undefined) {
        normalized[key] = Boolean(candidate[key]);
      }
    });
    return normalized;
  };

  const normalizeContainer = candidate => {
    if (!candidate || typeof candidate !== 'object') return defaults;
    return {
      normalization: normalizeNormalizationSettings(candidate.normalization),
      showFullFunction: candidate.showFullFunction !== undefined ? Boolean(candidate.showFullFunction) : defaults.showFullFunction
    };
  };

  const raw = storageGet(BIN_DIFF_DIFF_SETTINGS_KEY, '');
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw);
    return normalizeContainer(parsed);
  } catch {
    return defaults;
  }
};

const writeBinDiffSettings = settings => {
  const normalizationDefaults = getNormalizationDefaults();
  const normalizationRaw = settings?.normalization;
  const normalization = { ...normalizationDefaults };
  if (normalizationRaw && typeof normalizationRaw === 'object') {
    Object.keys(normalizationDefaults).forEach(key => {
      if (normalizationRaw[key] !== undefined) {
        normalization[key] = Boolean(normalizationRaw[key]);
      }
    });
  }

  storageSet(BIN_DIFF_DIFF_SETTINGS_KEY, JSON.stringify({
    normalization,
    showFullFunction: Boolean(settings?.showFullFunction)
  }));
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
  const stripCrossReferenceMetadataInput = document.getElementById('bindiff-setting-strip-cross-reference-metadata');
  const normalizeRelocationSymbolsInput = document.getElementById('bindiff-setting-normalize-relocation-symbols');
  const stripStorageLocationCommentsInput = document.getElementById('bindiff-setting-strip-storage-location-comments');
  const normalizeDecompilerIdentifiersInput = document.getElementById('bindiff-setting-normalize-decompiler-identifiers');
  const normalizeNumericInput = document.getElementById('bindiff-setting-normalize-numeric');
  const normalizeLabelsInput = document.getElementById('bindiff-setting-normalize-labels');
  const normalizePrototypeInput = document.getElementById('bindiff-setting-normalize-prototype');
  const showFullFunctionInput = document.getElementById('bindiff-setting-show-full');
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
    !stripCrossReferenceMetadataInput ||
    !normalizeRelocationSymbolsInput ||
    !stripStorageLocationCommentsInput ||
    !normalizeDecompilerIdentifiersInput ||
    !normalizeNumericInput ||
    !normalizeLabelsInput ||
    !normalizePrototypeInput ||
    !showFullFunctionInput ||
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
    stripCrossReferenceMetadataInput.checked = diffSettings.normalization.stripCrossReferenceMetadata;
    normalizeRelocationSymbolsInput.checked = diffSettings.normalization.normalizeRelocationSymbols;
    stripStorageLocationCommentsInput.checked = diffSettings.normalization.stripStorageLocationComments;
    normalizeDecompilerIdentifiersInput.checked = diffSettings.normalization.normalizeDecompilerIdentifiers;
    normalizeNumericInput.checked = diffSettings.normalization.normalizeNumericNotation;
    normalizeLabelsInput.checked = diffSettings.normalization.normalizeGeneratedLabels;
    normalizePrototypeInput.checked = diffSettings.normalization.normalizePrototypeExpansionArgs;
    showFullFunctionInput.checked = diffSettings.showFullFunction;
    trimWhitespaceInput.checked = diffSettings.normalization.trimTrailingWhitespace;
  };

  const applySettingsFromUi = () => {
    diffSettings = {
      normalization: {
        stripCrossReferenceMetadata: stripCrossReferenceMetadataInput.checked,
        normalizeRelocationSymbols: normalizeRelocationSymbolsInput.checked,
        stripStorageLocationComments: stripStorageLocationCommentsInput.checked,
        normalizeDecompilerIdentifiers: normalizeDecompilerIdentifiersInput.checked,
        normalizeNumericNotation: normalizeNumericInput.checked,
        normalizeGeneratedLabels: normalizeLabelsInput.checked,
        normalizePrototypeExpansionArgs: normalizePrototypeInput.checked,
        trimTrailingWhitespace: trimWhitespaceInput.checked
      },
      showFullFunction: showFullFunctionInput.checked
    };
    writeBinDiffSettings(diffSettings);
    syncSettingsUi();
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
    const url = `/bin-diff?${params.toString()}`;
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

  const getBinDiffColorScheme = () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    return LIGHT_THEMES.has(activeTheme) ? 'light' : 'dark';
  };

  const applyRenderedDiffColorScheme = () => {
    const schemeClass = getBinDiffColorScheme() === 'light' ? 'd2h-light-color-scheme' : 'd2h-dark-color-scheme';
    output.querySelectorAll('.d2h-wrapper').forEach(wrapper => {
      wrapper.classList.remove('d2h-light-color-scheme', 'd2h-dark-color-scheme', 'd2h-auto-color-scheme');
      wrapper.classList.add(schemeClass);
    });
  };

  const applyDiffHeaderFormatting = () => {
    output.querySelectorAll('.d2h-file-name').forEach(node => {
      node.textContent = (node.textContent || '').replaceAll('→', '->');
    });
    output.querySelectorAll('.d2h-file-name-wrapper .d2h-icon').forEach(icon => {
      icon.remove();
    });
  };

  const enhanceDiffCommentHighlight = () => {
    output.querySelectorAll('.d2h-file-side-diff, .d2h-file-diff').forEach(container => {
      let inBlockComment = false;
      container.querySelectorAll('.d2h-code-line-ctn').forEach(line => {
        const text = line.textContent || '';
        if (!text) return;

        const startIndex = text.indexOf('/*');
        const endIndex = text.indexOf('*/');
        const startsBlock = startIndex !== -1;
        const endsBlock = endIndex !== -1;
        const closedSameLine = startsBlock && endsBlock && endIndex > startIndex;

        if (inBlockComment || startsBlock) {
          line.classList.add('hljs-comment', 'bindiff-comment-line');
        }

        if (inBlockComment) {
          if (endsBlock) {
            inBlockComment = false;
          }
        } else if (startsBlock && !closedSameLine) {
          inBlockComment = true;
        }
      });
    });
  };

  const renderDiff = (leftSource, rightSource, options) => {
    const leftLabel = `${options.leftRelease}/${options.module}/${options.functionName}`;
    const rightLabel = `${options.rightRelease}/${options.module}/${options.functionName}`;
    const normalizationResult = window.Normalization?.preparePair
      ? window.Normalization.preparePair(leftSource, rightSource, diffSettings.normalization)
      : {
        leftText: String(leftSource || '').replace(/\r\n?/g, '\n'),
        rightText: String(rightSource || '').replace(/\r\n?/g, '\n'),
        equivalent: false
      };
    const preparedLeft = normalizationResult.leftText;
    const preparedRight = normalizationResult.rightText;
    const fullContext = Math.max(preparedLeft.split('\n').length, preparedRight.split('\n').length) + 2;
    const context = diffSettings.showFullFunction ? fullContext : 4;
    const buildNoChangePatch = (leftFile, rightFile, source) => {
      const normalized = String(source || '').replace(/\r\n?/g, '\n');
      const lines = normalized.endsWith('\n')
        ? normalized.slice(0, -1).split('\n')
        : normalized
          ? normalized.split('\n')
          : [];
      const lineCount = lines.length;
      const startLine = lineCount > 0 ? 1 : 0;
      const headers = [
        '===================================================================',
        `--- ${leftFile}`,
        `+++ ${rightFile}`,
        `@@ -${startLine},${lineCount} +${startLine},${lineCount} @@`
      ];
      const body = lines.map(line => ` ${line}`);
      return [...headers, ...body, ''].join('\n');
    };

    const rawPatch = normalizationResult.equivalent || preparedLeft === preparedRight
      ? buildNoChangePatch(leftLabel, rightLabel, preparedLeft)
      : window.Diff.createTwoFilesPatch(
        leftLabel,
        rightLabel,
        preparedLeft,
        preparedRight,
        '',
        '',
        { context }
      );
    const patch = rawPatch.replace(/^(---|\+\+\+) ([^\n\t]+)\t$/gm, '$1 $2');
    const ui = new window.Diff2HtmlUI(output, patch, {
      drawFileList: false,
      matching: 'lines',
      outputFormat: options.viewMode,
      colorScheme: getBinDiffColorScheme(),
      synchronisedScroll: true,
      highlight: true,
      fileListToggle: false,
      fileContentToggle: false,
      stickyFileHeaders: true,
      renderNothingWhenEmpty: false
    }, window.hljs);
    ui.draw();
    applyDiffHeaderFormatting();
    enhanceDiffCommentHighlight();
    applyRenderedDiffColorScheme();
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
      const releases = (await listRepoDirectories([])).sort(compareReleaseNames);
      if (!releases.length) {
        return;
      }

      const urlState = readUrlState();
      const preferredLeft = releases.includes(BIN_DIFF_DEFAULT_LEFT_RELEASE)
        ? BIN_DIFF_DEFAULT_LEFT_RELEASE
        : releases[0];
      const leftDefault = releases.includes(urlState.left) ? urlState.left : preferredLeft;
      const preferredRight = releases.includes(BIN_DIFF_DEFAULT_RIGHT_RELEASE)
        ? BIN_DIFF_DEFAULT_RIGHT_RELEASE
        : releases.find(release => release !== leftDefault) || leftDefault;
      const rightFallback = releases.find(release => release !== leftDefault) || leftDefault;
      const rightFromUrl = releases.includes(urlState.right) ? urlState.right : '';
      const rightCandidate = rightFromUrl || preferredRight;
      const rightDefault = rightCandidate !== leftDefault ? rightCandidate : rightFallback;

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
    diffSettings = {
      ...BIN_DIFF_DIFF_SETTINGS_DEFAULTS,
      normalization: getNormalizationDefaults()
    };
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
  [
    stripCrossReferenceMetadataInput,
    normalizeRelocationSymbolsInput,
    stripStorageLocationCommentsInput,
    normalizeDecompilerIdentifiersInput,
    normalizeNumericInput,
    normalizeLabelsInput,
    normalizePrototypeInput,
    showFullFunctionInput,
    trimWhitespaceInput
  ].forEach(input => {
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
  document.addEventListener('nv:theme-change', () => {
    if (!lastComparisonState) return;
    applyRenderedDiffColorScheme();
  });

  initFunctionSearchLimit();
  syncSettingsUi();
  initialize();
}
  global.initBinDiff = initBinDiff;
})(window);
