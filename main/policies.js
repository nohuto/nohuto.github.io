/* Copyright (c) 2026 Nohuto */
(function attachPolicyExplorer(global) {
  'use strict';

  const POLICY_DATA_URL = 'https://raw.githubusercontent.com/nohuto/admx-parser/main/assets/policies.json';
  const POLICY_CATEGORY_DATA_URL = 'https://raw.githubusercontent.com/nohuto/admx-parser/main/assets/policyCategories.json';
  let policyDataPromise;
  let policyCategoryDataPromise;
const loadPolicyData = () => {
  if (policyDataPromise) return policyDataPromise;
  policyDataPromise = fetch(POLICY_DATA_URL, { cache: 'force-cache' })
    .then(async response => {
      if (!response.ok) throw new Error(`Policy data request failed (${response.status})`);
      const json = await response.json();
      return Array.isArray(json) ? json : [];
    });
  return policyDataPromise;
};

const loadPolicyCategoryData = () => {
  if (policyCategoryDataPromise) return policyCategoryDataPromise;
  policyCategoryDataPromise = fetch(POLICY_CATEGORY_DATA_URL, { cache: 'force-cache' })
    .then(async response => {
      if (!response.ok) {
        console.warn(`Policy category data request failed (${response.status})`);
        return {};
      }
      const json = await response.json();
      return json?.categories && typeof json.categories === 'object' ? json.categories : {};
    });
  return policyCategoryDataPromise;
};

const getPolicyScope = policy => {
  const hives = new Set((policy.KeyPath || [])
    .map(path => String(path || '').split('\\')[0].toUpperCase())
    .filter(Boolean));
  const hasMachine = hives.has('HKLM');
  const hasUser = hives.has('HKCU');
  if (hasMachine && hasUser) return 'Both';
  if (hasUser) return 'User';
  return 'Machine';
};

const formatPolicyRange = element => {
  const maxValue = element?.MaxValue;
  const minValue = element?.MinValue ?? '0';
  if (maxValue !== null && maxValue !== undefined && maxValue !== '') return `${minValue} - ${maxValue}`;
  return `${minValue}+`;
};

const createNode = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (typeof text === 'string') node.textContent = text;
  return node;
};

const getPolicyElementValueNames = policy => {
  const elements = Array.isArray(policy?.Elements) ? policy.Elements : [];
  return [...new Set(elements
    .map(element => String(element?.ValueName || '').trim())
    .filter(Boolean))];
};

function initPolicyExplorer() {
  const root = document.getElementById('policy-explorer');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';

  const searchInput = root.querySelector('#policy-search');
  const limitInput = root.querySelector('#policy-limit');
  const unlimitedInput = root.querySelector('#policy-limit-unlimited');
  const paneToggles = Array.from(root.querySelectorAll('[data-policy-pane]'));
  const viewDropdown = root.querySelector('#policy-view-dropdown');
  const viewTrigger = root.querySelector('#policy-view-trigger');
  const viewMenu = root.querySelector('#policy-view-menu');
  const columnDropdown = root.querySelector('#policy-column-dropdown');
  const columnTrigger = root.querySelector('#policy-column-trigger');
  const treeEl = root.querySelector('#policy-tree');
  const tablePanel = root.querySelector('.policy-table-panel');
  const tableWrap = root.querySelector('.policy-table-wrap');
  const tableEl = root.querySelector('.policy-table');
  const detailPanel = root.querySelector('#policy-detail');
  const tableHead = root.querySelector('#policy-table-head');
  const tableCols = root.querySelector('#policy-table-cols');
  const tableBody = root.querySelector('#policy-table-body');
  const tableNote = root.querySelector('#policy-table-note');
  const columnMenu = root.querySelector('#policy-column-menu');
  const detailScopeEl = root.querySelector('#policy-detail-scope');
  const detailBody = root.querySelector('#policy-detail-body');
  const settingsButton = root.querySelector('#policy-settings');
  const settingsModal = root.querySelector('#policy-settings-modal');
  const settingsDialog = root.querySelector('#policy-settings-dialog');
  const settingsHeader = root.querySelector('#policy-settings-header');
  const settingsCloseButton = root.querySelector('#policy-settings-close');
  const settingsDoneButton = root.querySelector('#policy-settings-done');
  const settingsResetButton = root.querySelector('#policy-settings-reset');
  const searchDelayInput = root.querySelector('#policy-search-delay');
  const searchOptionInputs = {
    wildcards: root.querySelector('#policy-search-wildcards'),
    whole: root.querySelector('#policy-search-whole'),
    caseSensitive: root.querySelector('#policy-search-case'),
    matchAny: root.querySelector('#policy-search-any'),
    currentPath: root.querySelector('#policy-search-current-path'),
    names: root.querySelector('#policy-search-names'),
    registry: root.querySelector('#policy-search-registry'),
    details: root.querySelector('#policy-search-details')
  };
  const splitters = Array.from(root.querySelectorAll('[data-policy-splitter]'));

  if (!searchInput || !treeEl || !tableBody || !detailBody || !tableHead || !tableCols) return;

  let policies = [];
  let policyById = new Map();
  let policyByShareId = new Map();
  let filtered = [];
  let selectedId = null;
  let selectedCategoryKey = '';
  let categoryMap = new Map();
  const expandedTreeNodes = new Set(['__admin__']);
  let rowLimit = 350;
  let unlimitedRows = false;
  const defaultSearchDelayMs = 200;
  let searchDelayMs = defaultSearchDelayMs;
  let searchDelayTimer = 0;
  const paneState = {
    tree: true,
    table: true,
    detail: false
  };
  const defaultSearchOptions = {
    wildcards: false,
    whole: false,
    caseSensitive: false,
    matchAny: false,
    currentPath: false,
    names: true,
    registry: true,
    details: true
  };
  const searchOptions = { ...defaultSearchOptions };
  const sortState = {
    id: 'setting',
    direction: 'asc'
  };
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

  const getCategory = policy => policy.CategoryName || 'Uncategorized';
  const normalizeCategorySegment = segment => String(segment || '').trim().toLowerCase();
  const makeCategoryKey = path => path.map(segment => normalizeCategorySegment(segment.name || segment.displayName)).join('\u001f');
  const getCategoryPath = policy => {
    const categoryName = getCategory(policy);
    const meta = categoryMap.get(categoryName);
    if (meta?.path?.length) return meta.path;
    return [{ name: categoryName, displayName: categoryName }];
  };
  const getCategoryDisplayPath = policy => (policy.categoryPath || getCategoryPath(policy))
    .map(segment => segment.displayName || segment.name)
    .join(' / ') || policy.categoryDisplayPath || getCategory(policy);
  const getPrimaryPath = policy => (policy.KeyPath || [])[0] || '';
  const getPolicyValue = policy => {
    if (policy.ValueName) return policy.ValueName;
    const valueNames = getPolicyElementValueNames(policy);
    return valueNames.length ? valueNames.join(', ') : '<ElementDefined>';
  };
  const POLICY_QUERY_PARAM = 'p';
  const getPolicyShareId = policy => {
    const policyName = String(policy?.PolicyName || '').trim();
    if (!policyName) return '';
    const fileName = String(policy?.File || '').trim().replace(/\.admx$/i, '');
    if (fileName) return `${fileName}*${policyName}`;
    const namespace = String(policy?.NameSpace || '').trim();
    return namespace ? `${namespace}*${policyName}` : policyName;
  };
  const normalizePolicyShareId = value => String(value || '').trim().toLowerCase();
  const updatePolicyUrl = policy => {
    if (!history?.replaceState) return;
    const url = new URL(location.href);
    const shareId = policy?.shareId || '';
    if (shareId) {
      url.searchParams.set(POLICY_QUERY_PARAM, shareId);
    } else {
      url.searchParams.delete(POLICY_QUERY_PARAM);
    }
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    history.replaceState({ ...(history.state || {}), url: nextUrl }, '', nextUrl);
  };
  const getPolicyFromUrl = () => {
    const rawId = new URLSearchParams(location.search).get(POLICY_QUERY_PARAM);
    if (!rawId) return null;
    const normalized = normalizePolicyShareId(rawId);
    return policyByShareId.get(normalized)
      || policyByShareId.get(normalized.replace(':', '*'))
      || policyById.get(rawId)
      || null;
  };
  const expandTreeForPolicy = policy => {
    expandedTreeNodes.add('__admin__');
    const path = Array.isArray(policy?.categoryPath) ? policy.categoryPath : [];
    path.forEach((_, index) => {
      expandedTreeNodes.add(makeCategoryKey(path.slice(0, index + 1)));
    });
  };
  const isNumericData = value => /^-?\d+$/.test(String(value ?? '').trim());
  const getElementRegistryType = element => {
    const type = element?.Type || '';
    if (type === 'Text') return element?.Expandable ? 'REG_EXPAND_SZ' : 'REG_SZ';
    if (type === 'MultiText') return 'REG_MULTI_SZ';
    if (type === 'List') return 'REG_SZ';
    if (type === 'LongDecimal') return 'REG_QWORD';
    if (type === 'Decimal') return element?.StoreAsText ? 'REG_SZ' : 'REG_DWORD';
    if (type === 'Boolean' || type === 'TrueValue' || type === 'FalseValue') return 'REG_DWORD';
    if (type === 'Enum') {
      const items = Array.isArray(element.Items) ? element.Items : [];
      return items.some(item => item.Data !== null && item.Data !== undefined && !isNumericData(item.Data)) ? 'REG_SZ' : 'REG_DWORD';
    }
    if (type === 'EnabledValue' || type === 'DisabledValue' || type === 'EnabledList' || type === 'DisabledList') {
      if (element?.Action === 'Delete') return 'Delete';
      return isNumericData(element.Data) ? 'REG_DWORD' : 'REG_SZ';
    }
    return 'Unknown';
  };
  const getElementDisplayType = element => {
    const type = element?.Type || 'Element';
    if (type === 'EnabledValue' || type === 'DisabledValue' || type === 'EnabledList' || type === 'DisabledList') {
      return getElementRegistryType(element);
    }
    return type;
  };
  const appendUnique = (target, value) => {
    if (value === null || value === undefined) return;
    const normalized = String(value);
    if (!normalized && value !== '') return;
    if (!target.includes(normalized)) target.push(normalized);
  };
  const formatPolicyMetaValue = value => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (value === '') return '""';
    return String(value);
  };
  const addPolicyMeta = (group, label, value) => {
    if (value === null || value === undefined) return;
    const text = formatPolicyMetaValue(value);
    const existing = group.meta.find(item => item.label === label);
    if (existing) {
      appendUnique(existing.values, text);
    } else {
      group.meta.push({ label, values: [text] });
    }
  };
  const addElementMeta = (entry, element) => {
    [
      ['Required', element?.Required],
      ['Max length', element?.MaxLength],
      ['Max strings', element?.MaxStrings],
      ['Expandable', element?.Expandable],
      ['Stored as text', element?.StoreAsText],
      ['Client extension', element?.ClientExtension]
    ].forEach(([label, value]) => addPolicyMeta(entry, label, value));
  };
  const getPathTail = path => {
    const parts = String(path || '').split('\\').filter(Boolean);
    return parts[parts.length - 1] || '';
  };
  const getActionValue = item => (item?.Action === 'Delete' ? 'Delete' : item?.Data ?? '');
  const getEntryValueLabel = (valueName, element, paths) => {
    const cleanValue = String(valueName || '').trim();
    if (cleanValue) return cleanValue;
    if (element?.Type === 'List') return '<ListEntries>';
    if (element?.Type === 'EnabledList' || element?.Type === 'DisabledList') return '<ListValue>';
    return getPathTail(paths[0]) || '<ElementDefined>';
  };
  const getElementPaths = (policy, element) => {
    const elementPaths = Array.isArray(element?.KeyPath) ? element.KeyPath.filter(Boolean) : [];
    if (elementPaths.length) return elementPaths;
    return Array.isArray(policy?.KeyPath) ? policy.KeyPath.filter(Boolean) : [];
  };
  const makePathGroupKey = paths => (paths.length ? paths : ['__no_key__'])
    .map(path => String(path || '').toLowerCase())
    .join('\u001f');
  const getPolicyStorageGroups = policy => {
    const groups = [];
    const groupByPath = new Map();
    const ensureGroup = paths => {
      const normalizedPaths = paths.length ? paths : ['<RegistryPathNotSpecified>'];
      const key = makePathGroupKey(normalizedPaths);
      if (!groupByPath.has(key)) {
        const group = { keyPaths: normalizedPaths, entries: [] };
        groupByPath.set(key, group);
        groups.push(group);
      }
      return groupByPath.get(key);
    };
    const addEntry = (paths, valueName, element, rows, copyValue = valueName) => {
      const group = ensureGroup(paths);
      const label = getEntryValueLabel(valueName, element, paths);
      const entryKey = `${label}\u001f${copyValue ?? ''}`;
      let entry = group.entries.find(item => item.key === entryKey);
      if (!entry) {
        entry = {
          key: entryKey,
          valueName: label,
          copyValue,
          meta: [],
          rows: []
        };
        group.entries.push(entry);
      }
      addElementMeta(entry, element);
      entry.rows.push(...rows);
      return entry;
    };
    const policyValueName = String(policy?.ValueName || '').trim();
    const elements = Array.isArray(policy?.Elements) ? policy.Elements : [];

    elements.forEach(element => {
      const type = element?.Type || '';
      const paths = getElementPaths(policy, element);
      if ((type === 'EnabledValue' || type === 'DisabledValue') && policyValueName) {
        addEntry(paths, policyValueName, element, [{
          type,
          registryType: getElementRegistryType(element),
          label: type === 'EnabledValue' ? 'Enabled' : 'Disabled',
          value: getActionValue(element)
        }], policyValueName);
        return;
      }

      const rawValueName = String(element?.ValueName || '').trim();
      if (type === 'Enum' && Array.isArray(element.Items) && element.Items.length) {
        const rows = element.Items.map(item => ({
          type: 'Enum',
          registryType: getElementRegistryType(element),
          label: item.DisplayName || '<Option>',
          value: getActionValue(item)
        }));
        addEntry(paths, rawValueName || policyValueName, element, rows, rawValueName || policyValueName || null);
        element.Items.forEach(item => {
          const valueList = Array.isArray(item.ValueList) ? item.ValueList : [];
          valueList.forEach(listItem => {
            const listPaths = getElementPaths(policy, listItem);
            const listValueName = String(listItem?.ValueName || '').trim();
            addEntry(listPaths, listValueName, listItem, [{
              type: 'Enum option',
              registryType: listItem.Action === 'Delete' ? 'Delete' : isNumericData(listItem.Data) ? 'REG_DWORD' : 'REG_SZ',
              label: `When ${item.DisplayName || '<Option>'}`,
              value: getActionValue(listItem)
            }], listValueName || null);
          });
        });
        return;
      }
      if (type === 'Boolean') {
        addEntry(paths, rawValueName || policyValueName, element, [
          {
            type: 'Boolean',
            registryType: getElementRegistryType(element),
            label: 'True',
            value: element.TrueAction === 'Delete' ? 'Delete' : element.TrueValue ?? '1'
          },
          {
            type: 'Boolean',
            registryType: getElementRegistryType(element),
            label: 'False',
            value: element.FalseAction === 'Delete' ? 'Delete' : element.FalseValue ?? '0'
          }
        ], rawValueName || policyValueName || null);
        return;
      }
      if (type === 'Decimal' || type === 'LongDecimal') {
        addEntry(paths, rawValueName || policyValueName, element, [{
          type,
          registryType: getElementRegistryType(element),
          label: 'Range',
          value: formatPolicyRange(element)
        }], rawValueName || policyValueName || null);
        return;
      }
      if (type === 'EnabledList' || type === 'DisabledList') {
        addEntry(paths, rawValueName, element, [{
          type,
          registryType: getElementRegistryType(element),
          label: type === 'EnabledList' ? 'Enabled' : 'Disabled',
          value: getActionValue(element)
        }], rawValueName || null);
        return;
      }
      const fallbackValueName = type === 'List' && !rawValueName ? '' : rawValueName || policyValueName;
      addEntry(paths, fallbackValueName, element, [{
        type: getElementDisplayType(element),
        registryType: getElementRegistryType(element),
        label: type === 'List' ? '<InputEntries>' : '<InputValue>',
        value: ''
      }], fallbackValueName || null);
    });

    if (!groups.length && policyValueName) {
      addEntry(getElementPaths(policy, null), policyValueName, null, []);
    }
    const policyPathKey = makePathGroupKey(Array.isArray(policy?.KeyPath) ? policy.KeyPath.filter(Boolean) : []);
    return groups.sort((left, right) => {
      const leftMain = makePathGroupKey(left.keyPaths) === policyPathKey;
      const rightMain = makePathGroupKey(right.keyPaths) === policyPathKey;
      if (leftMain === rightMain) return 0;
      return leftMain ? -1 : 1;
    });
  };
  const getPolicyValueGroups = policy => getPolicyStorageGroups(policy).flatMap(group => group.entries.map(entry => ({
    valueName: entry.valueName,
    keyPaths: group.keyPaths,
    meta: entry.meta,
    rows: entry.rows.map(row => ({
      type: row.type,
      registryType: row.registryType,
      text: [row.label, row.value].filter(value => value !== '').join(': ')
    }))
  })));
  const getEntryRegistryTypes = entry => [...new Set(entry.rows
    .map(row => row.registryType && row.registryType !== 'Unknown' ? row.registryType : row.type)
    .filter(Boolean))];

  const columns = [
    { id: 'setting', label: 'Name', width: 420, minWidth: 180, value: policy => policy.DisplayName || policy.PolicyName || '' },
    { id: 'scope', label: 'Scope', width: 90, minWidth: 58, value: policy => policy.scope || '' },
    { id: 'supported', label: 'Supported On', width: 240, minWidth: 150, value: policy => policy.Supported || '' },
    { id: 'policy', label: 'Policy', width: 220, minWidth: 140, value: policy => policy.PolicyName || '' },
    { id: 'category', label: 'Category', width: 260, minWidth: 150, value: policy => policy.categoryDisplayPath || getCategoryDisplayPath(policy) },
    { id: 'value', label: 'Value', width: 160, minWidth: 90, value: policy => getPolicyValue(policy) },
    { id: 'registry', label: 'Registry', width: 360, minWidth: 180, value: policy => getPrimaryPath(policy) },
    { id: 'admx', label: 'ADMX', width: 150, minWidth: 90, value: policy => policy.File || '' }
  ];
  const visibleColumns = new Set(['setting', 'scope', 'supported']);
  let tableWidthSignature = '';

  const getVisibleColumns = () => columns.filter(column => visibleColumns.has(column.id));
  const getColumnMinWidth = column => column.minWidth || 80;

  const copyPolicyText = async (text, successMessage = 'Copied') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch {
      showToast('Copy failed');
    }
  };

  const createCopyBox = (className, text, label = 'Copy', successMessage = 'Copied', prefixText = '') => {
    const box = createNode('div', className);
    if (prefixText) {
      box.classList.add('has-prefix');
      box.appendChild(createNode('span', 'policy-copy-prefix', prefixText));
    }
    const labelNode = createNode('span', 'policy-copy-text', text || '');
    const button = createNode('button', 'policy-copy-button');
    button.type = 'button';
    button.title = label;
    button.setAttribute('aria-label', label);
    const iconNode = createNode('span', 'policy-copy-icon');
    iconNode.setAttribute('aria-hidden', 'true');
    button.appendChild(iconNode);
    button.addEventListener('click', () => copyPolicyText(text || '', successMessage));
    box.append(labelNode, button);
    return box;
  };
  const createPolicyValueTitle = (entry, typeText) => {
    if (entry.copyValue !== null) {
      return createCopyBox('policy-copy-box policy-value-name', entry.valueName, 'Copy value name', 'Copied value', typeText);
    }

    const title = createNode('div', 'policy-value-title');
    if (typeText) {
      title.appendChild(createNode('span', 'policy-copy-prefix', typeText));
    }
    title.appendChild(createNode('span', 'policy-copy-text', entry.valueName));
    return title;
  };

  const updatePaneLayout = () => {
    root.classList.toggle('policy-hide-tree', !paneState.tree);
    root.classList.toggle('policy-hide-table', !paneState.table);
    root.classList.toggle('policy-hide-detail', !paneState.detail);
    const treePanel = root.querySelector('.policy-tree-panel');
    if (treePanel) treePanel.hidden = !paneState.tree;
    if (tablePanel) tablePanel.hidden = !paneState.table;
    if (detailPanel) detailPanel.hidden = !paneState.detail;
    splitters.forEach(splitter => {
      const type = splitter.dataset.policySplitter;
      splitter.hidden = type === 'tree'
        ? !(paneState.tree && paneState.table)
        : !(paneState.table && paneState.detail);
    });
    paneToggles.forEach(button => {
      const pane = button.dataset.policyPane;
      const active = Boolean(paneState[pane]);
      button.checked = active;
      button.closest('.policy-view-option')?.setAttribute('aria-checked', active ? 'true' : 'false');
    });
    requestAnimationFrame(applyTableColumnWidths);
  };

  const openViewMenu = () => {
    if (!viewMenu || !viewTrigger) return;
    viewMenu.hidden = false;
    viewTrigger.setAttribute('aria-expanded', 'true');
  };

  const closeViewMenu = () => {
    if (!viewMenu || !viewTrigger) return;
    viewMenu.hidden = true;
    viewTrigger.setAttribute('aria-expanded', 'false');
  };

  const toggleViewMenu = () => {
    if (!viewMenu || viewMenu.hidden) {
      openViewMenu();
    } else {
      closeViewMenu();
    }
  };

  const renderDetail = policy => {
    detailBody.replaceChildren();
    if (detailScopeEl) detailScopeEl.textContent = policy?.scope || 'none';
    if (!policy || !paneState.detail) {
      return;
    }

    const heading = createNode('div', 'policy-detail-heading');
    heading.appendChild(createNode('h2', null, policy.DisplayName || policy.PolicyName));
    detailBody.appendChild(heading);

    const fields = createNode('div', 'policy-detail-grid');
    const detailFields = [
      ['Policy', policy.PolicyName],
      ['Scope', policy.scope],
      ['ADMX', policy.File],
      ['Namespace', policy.NameSpace],
      ['Supported', policy.Supported],
      ['Category', getCategoryDisplayPath(policy)]
    ];
    if (policy.ClientExtension) {
      detailFields.splice(4, 0, ['Client Extension', policy.ClientExtension]);
    }
    detailFields.forEach(([label, value]) => {
      const row = createNode('div', 'policy-detail-field');
      row.appendChild(createNode('span', 'policy-field-label', label));
      row.appendChild(createNode('span', 'policy-field-value', value || 'Not specified'));
      fields.appendChild(row);
    });
    detailBody.appendChild(fields);

    if (policy.ExplainText) {
      const explain = createNode('p', 'policy-explain', policy.ExplainText);
      detailBody.appendChild(explain);
    }

    const elementSection = createNode('section', 'policy-section');
    elementSection.appendChild(createNode('h3', null, 'Registry Values'));
    const storageGroups = getPolicyStorageGroups(policy);
    if (!storageGroups.length) {
      elementSection.appendChild(createNode('div', 'policy-muted', 'No ADMX elements exported for this policy.'));
    } else {
      const registryList = createNode('div', 'policy-registry-list');
      storageGroups.forEach(group => {
        const groupNode = createNode('div', 'policy-registry-group');
        const pathList = createNode('div', 'policy-code-list policy-registry-paths');
        group.keyPaths.forEach(path => {
          pathList.appendChild(createCopyBox('policy-copy-box', path, 'Copy registry path', 'Copied key'));
        });
        groupNode.appendChild(pathList);

        const entries = createNode('div', 'policy-registry-values');
        group.entries.forEach(entry => {
          const entryNode = createNode('div', 'policy-value-entry');
          const header = createNode('div', 'policy-value-header');
          const registryTypes = getEntryRegistryTypes(entry);
          const typeText = registryTypes.length ? registryTypes.join(', ') : '';
          header.appendChild(createPolicyValueTitle(entry, typeText));
          if (entry.meta.length) {
            const metaRow = createNode('div', 'policy-value-meta-row');
            const meta = createNode('span', 'policy-value-attrs');
            meta.textContent = entry.meta.map(item => `${item.label}: ${item.values.join(', ')}`).join('  |  ');
            metaRow.appendChild(meta);
            header.appendChild(metaRow);
          }
          entryNode.appendChild(header);

          if (entry.rows.length) {
            const rows = createNode('div', 'policy-data-list');
            if (entry.rows.some(row => row.value !== '')) {
              const head = createNode('div', 'policy-data-row policy-data-head');
              head.appendChild(createNode('span', 'policy-data-label', 'Meaning'));
              head.appendChild(createNode('span', 'policy-data-value', 'Data'));
              rows.appendChild(head);
            }
            entry.rows.forEach(row => {
              const hasValue = row.value !== '';
              const item = createNode('div', hasValue ? 'policy-data-row' : 'policy-data-row policy-data-row-single');
              item.appendChild(createNode('span', 'policy-data-label', row.label));
              if (hasValue) {
                item.appendChild(createNode('span', 'policy-data-value', row.value));
              }
              rows.appendChild(item);
            });
            entryNode.appendChild(rows);
          }
          entries.appendChild(entryNode);
        });
        groupNode.appendChild(entries);
        registryList.appendChild(groupNode);
      });
      elementSection.appendChild(registryList);
    }
    detailBody.appendChild(elementSection);
  };

  const sortPolicies = rows => {
    const column = columns.find(item => item.id === sortState.id) || columns[0];
    const direction = sortState.direction === 'desc' ? -1 : 1;
    return rows.slice().sort((left, right) => {
      const a = column.value(left);
      const b = column.value(right);
      return collator.compare(String(a), String(b)) * direction;
    });
  };

  const renderColumnMenu = () => {
    if (!columnMenu) return;
    columnMenu.replaceChildren();
    columns.forEach(column => {
      const label = createNode('label', 'policy-column-choice');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = visibleColumns.has(column.id);
      checkbox.addEventListener('change', () => {
        if (!checkbox.checked && visibleColumns.size === 1) {
          checkbox.checked = true;
          return;
        }
        if (checkbox.checked) {
          visibleColumns.add(column.id);
        } else {
          visibleColumns.delete(column.id);
        }
        renderTableHeader();
        renderTable();
      });
      label.append(checkbox, createNode('span', null, column.label));
      columnMenu.appendChild(label);
    });
  };

  const openColumnMenu = (x, y, options = {}) => {
    if (!columnMenu) return;
    renderColumnMenu();
    columnMenu.hidden = false;
    columnMenu.style.left = `${x}px`;
    columnMenu.style.top = `${y}px`;
    columnTrigger?.setAttribute('aria-expanded', options.fromTrigger ? 'true' : 'false');
  };

  const openColumnMenuFromTrigger = () => {
    if (!columnTrigger) return;
    const rect = columnTrigger.getBoundingClientRect();
    openColumnMenu(rect.right, rect.bottom + 4, { fromTrigger: true });
    if (!columnMenu) return;
    const menuWidth = columnMenu.offsetWidth;
    const menuHeight = columnMenu.offsetHeight;
    const left = Math.min(Math.max(4, rect.right - menuWidth), window.innerWidth - menuWidth - 4);
    const top = Math.min(rect.bottom + 4, window.innerHeight - menuHeight - 4);
    columnMenu.style.left = `${left}px`;
    columnMenu.style.top = `${Math.max(4, top)}px`;
  };

  const closeColumnMenu = () => {
    if (columnMenu) columnMenu.hidden = true;
    columnTrigger?.setAttribute('aria-expanded', 'false');
  };

  const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const wildcardToRegExp = term => {
    const pattern = String(term)
      .split('')
      .map(char => {
        if (char === '*') return '.*';
        if (char === '?') return '.';
        return escapeRegExp(char);
      })
      .join('');
    return new RegExp(searchOptions.whole ? `^${pattern}$` : pattern, searchOptions.caseSensitive ? '' : 'i');
  };

  const splitSearchTerms = value => {
    const terms = [];
    String(value || '').replace(/"([^"]+)"|(\S+)/g, (_, quoted, bare) => {
      const term = quoted || bare;
      if (term) terms.push(term);
      return '';
    });
    return terms;
  };

  const getSearchFields = policy => {
    const fields = [];
    if (searchOptions.names) fields.push(...policy.searchFields.names);
    if (searchOptions.registry) fields.push(...policy.searchFields.registry);
    if (searchOptions.details) fields.push(...policy.searchFields.details);
    return fields
      .filter(value => value !== null && value !== undefined && value !== '')
      .map(value => String(value));
  };

  const termMatchesPolicy = (policy, term) => {
    const fields = getSearchFields(policy);
    if (!fields.length) return false;
    if (searchOptions.wildcards) {
      const regex = wildcardToRegExp(term);
      return fields.some(field => regex.test(field));
    }
    const needle = searchOptions.caseSensitive ? term : term.toLowerCase();
    return fields.some(field => {
      const haystack = searchOptions.caseSensitive ? field : field.toLowerCase();
      return searchOptions.whole ? haystack === needle : haystack.includes(needle);
    });
  };

  const applyTableColumnWidths = () => {
    if (!tableEl || !tableCols) return;
    const visible = getVisibleColumns();
    const baseTotal = visible.reduce((sum, column) => sum + column.width, 0);
    const available = Math.max(0, Math.floor(tableWrap?.clientWidth || tablePanel?.clientWidth || 0) - 2);
    const renderedTotal = Math.max(baseTotal, available);
    const filler = Math.max(0, renderedTotal - baseTotal);
    const overflowX = baseTotal > available ? 'auto' : 'hidden';
    const widths = visible.map((column, index) => {
      const width = column.width + (index === visible.length - 1 ? filler : 0);
      return Math.max(getColumnMinWidth(column), width);
    });
    const signature = `${renderedTotal}|${available}|${overflowX}|${widths.join(',')}`;
    if (signature === tableWidthSignature) return;
    tableWidthSignature = signature;

    const tableWidth = renderedTotal ? `${renderedTotal}px` : '';
    const tableMinWidth = available ? `${available}px` : '100%';
    if (tableWrap && tableWrap.style.overflowX !== overflowX) tableWrap.style.overflowX = overflowX;
    if (tableEl.style.width !== tableWidth) tableEl.style.width = tableWidth;
    if (tableEl.style.minWidth !== tableMinWidth) tableEl.style.minWidth = tableMinWidth;
    tableCols.replaceChildren();

    widths.forEach(width => {
      const col = document.createElement('col');
      col.style.width = `${width}px`;
      tableCols.appendChild(col);
    });
  };

  const startColumnResize = (column, event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const visible = getVisibleColumns();
    const index = visible.findIndex(item => item.id === column.id);
    if (index < 0) return;

    const startX = event.clientX;
    const startWidth = column.width;
    const minWidth = getColumnMinWidth(column);
    let rafId = 0;
    let pendingX = startX;
    let resizing = true;
    const target = event.currentTarget;

    const paint = () => {
      rafId = 0;
      if (!resizing) return;
      const delta = pendingX - startX;
      column.width = Math.max(minWidth, startWidth + delta);
      applyTableColumnWidths();
    };

    const onMove = moveEvent => {
      if (!resizing || (moveEvent.buttons & 1) !== 1) {
        stop(false);
        return;
      }
      pendingX = moveEvent.clientX;
      if (!rafId) rafId = requestAnimationFrame(paint);
    };

    const stop = (commit = true) => {
      if (!resizing) return;
      resizing = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        if (commit) {
          const delta = pendingX - startX;
          column.width = Math.max(minWidth, startWidth + delta);
          applyTableColumnWidths();
        }
      }
      document.body.classList.remove('policy-column-resizing');
      if (target.hasPointerCapture?.(event.pointerId)) target.releasePointerCapture(event.pointerId);
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerup', onUp);
      target.removeEventListener('pointercancel', onCancel);
      target.removeEventListener('lostpointercapture', onCancel);
    };

    const onUp = () => stop(true);
    const onCancel = () => stop(false);

    document.body.classList.add('policy-column-resizing');
    target.setPointerCapture(event.pointerId);
    target.addEventListener('pointermove', onMove);
    target.addEventListener('pointerup', onUp);
    target.addEventListener('pointercancel', onCancel);
    target.addEventListener('lostpointercapture', onCancel);
  };

  const renderTableHeader = () => {
    tableHead.replaceChildren();
    getVisibleColumns().forEach(column => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.dataset.column = column.id;
      th.className = 'policy-table-header';
      if (sortState.id === column.id) {
        th.setAttribute('aria-sort', sortState.direction === 'asc' ? 'ascending' : 'descending');
      }
      const headerContent = createNode('span', 'policy-table-header-content');
      headerContent.appendChild(createNode('span', 'policy-table-header-label', column.label));
      if (sortState.id === column.id) {
        const sortIcon = createNode('span', `policy-sort-indicator is-${sortState.direction}`);
        sortIcon.setAttribute('aria-hidden', 'true');
        headerContent.appendChild(sortIcon);
      }
      th.appendChild(headerContent);
      const resizer = createNode('span', 'policy-column-resizer');
      th.appendChild(resizer);
      th.addEventListener('click', event => {
        if (event.target === resizer) return;
        sortState.direction = sortState.id === column.id && sortState.direction === 'asc' ? 'desc' : 'asc';
        sortState.id = column.id;
        renderTableHeader();
        renderTable();
      });
      th.addEventListener('contextmenu', event => {
        event.preventDefault();
        openColumnMenu(event.clientX, event.clientY);
      });
      resizer.addEventListener('pointerdown', event => startColumnResize(column, event));
      tableHead.appendChild(th);
    });
    applyTableColumnWidths();
  };

  const getEffectiveLimit = () => unlimitedRows ? filtered.length : Math.max(1, rowLimit);

  const renderTable = () => {
    tableBody.replaceChildren();
    const sorted = sortPolicies(filtered);
    const visible = sorted.slice(0, getEffectiveLimit());
    const activePolicy = policyById.get(selectedId);
    const fragment = document.createDocumentFragment();

    visible.forEach(policy => {
      const row = document.createElement('tr');
      row.className = policy.id === selectedId ? 'is-active' : '';
      row.tabIndex = 0;
      row.dataset.id = policy.id;
      getVisibleColumns().forEach(column => {
        const cell = document.createElement('td');
        cell.textContent = column.value(policy) || '';
        cell.dataset.column = column.id;
        row.appendChild(cell);
      });

      const selectRow = () => {
        selectPolicy(policy, { selectCategory: splitSearchTerms(searchInput.value).length > 0 });
      };
      row.addEventListener('click', selectRow);
      row.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectRow();
        }
      });
      fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
    if (tableNote) {
      const shown = visible.length;
      tableNote.textContent = filtered.length > shown
        ? `Showing ${shown} of ${filtered.length}.`
        : filtered.length ? '' : 'No matching policies.';
    }
    if (activePolicy && paneState.detail) renderDetail(activePolicy);
  };

  const categoryMatches = (policy, categoryKey) => {
    if (!categoryKey) return true;
    return policy.categoryPathKey === categoryKey || policy.categoryPathKey.startsWith(`${categoryKey}\u001f`);
  };

  const selectPolicy = (policy, options = {}) => {
    if (!policy) return;
    const { updateUrl = true, selectCategory = false } = options;
    selectedId = policy.id;
    paneState.detail = true;
    if (selectCategory) {
      selectedCategoryKey = policy.categoryPathKey || '';
      expandTreeForPolicy(policy);
      renderTree();
    }
    if (updateUrl) updatePolicyUrl(policy);
    updatePaneLayout();
    applyFilters();
  };

  const getTreeSelectionKey = () => selectedCategoryKey;

  const selectTreeNode = (categoryKey = '') => {
    selectedCategoryKey = categoryKey || '';
    selectedId = null;
    paneState.detail = false;
    updatePolicyUrl(null);
    updatePaneLayout();
    applyFilters();
  };

  const createTreeButton = ({ label, count, categoryKey = '', depth = 0, nodeKey = '', selectionKey = '', hasChildren = false }) => {
    const button = document.createElement('button');
    const treeNodeKey = nodeKey || categoryKey;
    const treeSelectionKey = selectionKey || categoryKey;
    const expanded = hasChildren && expandedTreeNodes.has(treeNodeKey);
    button.type = 'button';
    button.className = 'policy-tree-item';
    button.dataset.categoryKey = categoryKey;
    button.dataset.selectionKey = treeSelectionKey;
    button.dataset.nodeKey = treeNodeKey;
    button.style.setProperty('--policy-tree-depth', String(depth));
    button.setAttribute('role', 'treeitem');
    if (hasChildren) {
      const chevron = createNode('span', 'policy-tree-chevron');
      chevron.setAttribute('aria-hidden', 'true');
      chevron.classList.toggle('is-open', expanded);
      chevron.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (expandedTreeNodes.has(treeNodeKey)) {
          expandedTreeNodes.delete(treeNodeKey);
        } else {
          expandedTreeNodes.add(treeNodeKey);
        }
        renderTree();
      });
      button.appendChild(chevron);
    } else {
      button.appendChild(createNode('span', 'policy-tree-spacer'));
    }
    button.appendChild(createNode('span', 'policy-tree-label', label));
    button.appendChild(createNode('span', 'policy-tree-count', String(count)));
    button.addEventListener('click', () => selectTreeNode(categoryKey));
    return button;
  };

  const updateTreeActive = () => {
    const activeKey = getTreeSelectionKey();
    treeEl.querySelectorAll('.policy-tree-item').forEach(item => {
      const selectionKey = item.dataset.selectionKey || '';
      const categoryKey = item.dataset.categoryKey || '';
      const isActive = selectionKey === activeKey;
      const isActivePath = isActive || (
        Boolean(activeKey)
        && Boolean(categoryKey)
        && (activeKey === categoryKey || activeKey.startsWith(`${categoryKey}\u001f`))
      ) || (item.dataset.nodeKey === '__admin__' && Boolean(activeKey));
      item.classList.toggle('is-active', isActive);
      item.classList.toggle('is-active-path', isActivePath);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  const clearPendingSearch = () => {
    if (!searchDelayTimer) return;
    clearTimeout(searchDelayTimer);
    searchDelayTimer = 0;
  };

  const scheduleSearch = () => {
    clearPendingSearch();
    if (searchDelayMs <= 0) {
      applyFilters();
      return;
    }
    searchDelayTimer = window.setTimeout(() => {
      searchDelayTimer = 0;
      applyFilters();
    }, searchDelayMs);
  };

  const buildCategoryTree = () => {
    const rootNode = { children: new Map() };
    policies.forEach(policy => {
      let cursor = rootNode;
      policy.categoryPath.forEach(segment => {
        const key = normalizeCategorySegment(segment.name || segment.displayName);
        if (!cursor.children.has(key)) {
          cursor.children.set(key, {
            key,
            name: segment.name || segment.displayName,
            label: segment.displayName || segment.name,
            categoryKey: '',
            count: 0,
            children: new Map()
          });
        }
        cursor = cursor.children.get(key);
        cursor.count += 1;
      });
    });
    const applyKeys = (node, prefix = []) => {
      [...node.children.values()].forEach(child => {
        const path = [...prefix, { name: child.name, displayName: child.label }];
        child.categoryKey = makeCategoryKey(path);
        applyKeys(child, path);
      });
    };
    applyKeys(rootNode);
    return rootNode;
  };

  const appendCategoryNodes = (parent, node, depth) => {
    [...node.children.values()]
      .sort((left, right) => collator.compare(left.label, right.label))
      .forEach(child => {
        const hasChildren = child.children.size > 0;
        const nodeKey = child.categoryKey;
        parent.appendChild(createTreeButton({
          label: child.label,
          count: child.count,
          categoryKey: child.categoryKey,
          depth,
          nodeKey,
          hasChildren
        }));
        if (expandedTreeNodes.has(nodeKey)) {
          const childLevel = createNode('div', 'policy-tree-level');
          childLevel.style.setProperty('--policy-tree-depth', String(depth + 1));
          appendCategoryNodes(childLevel, child, depth + 1);
          parent.appendChild(childLevel);
        }
      });
  };

  const appendAdministrativeTemplatesTree = parent => {
    const count = policies.length;
    parent.appendChild(createTreeButton({
      label: 'Administrative Templates',
      count,
      depth: 0,
      nodeKey: '__admin__',
      selectionKey: '__admin__',
      hasChildren: true
    }));
    if (expandedTreeNodes.has('__admin__')) {
      const adminLevel = createNode('div', 'policy-tree-level');
      adminLevel.style.setProperty('--policy-tree-depth', '1');
      appendCategoryNodes(adminLevel, buildCategoryTree(), 1);
      adminLevel.appendChild(createTreeButton({ label: 'All Settings', count, depth: 1 }));
      parent.appendChild(adminLevel);
    }
  };

  const renderTree = () => {
    treeEl.replaceChildren();
    const fragment = document.createDocumentFragment();
    appendAdministrativeTemplatesTree(fragment);

    treeEl.appendChild(fragment);
    updateTreeActive();
  };

  const applyFilters = () => {
    clearPendingSearch();
    const terms = splitSearchTerms(searchInput.value);

    filtered = policies.filter(policy => {
      if ((!terms.length || searchOptions.currentPath) && !categoryMatches(policy, selectedCategoryKey)) return false;
      if (!terms.length) return true;
      return searchOptions.matchAny
        ? terms.some(term => termMatchesPolicy(policy, term))
        : terms.every(term => termMatchesPolicy(policy, term));
    });

    if (selectedId && !filtered.some(policy => policy.id === selectedId)) {
      selectedId = null;
      paneState.detail = false;
      updatePolicyUrl(null);
      updatePaneLayout();
    }
    updateTreeActive();
    renderTable();
    renderDetail(policyById.get(selectedId));
  };

  const normalizePolicy = (policy, index) => {
    const elements = Array.isArray(policy.Elements) ? policy.Elements : [];
    const valueGroups = getPolicyValueGroups(policy);
    const elementText = valueGroups.flatMap(group => [
      group.valueName,
      ...group.keyPaths,
      ...group.meta.flatMap(item => [item.label, ...item.values]),
      ...group.rows.flatMap(row => [row.type, row.registryType, row.text])
    ]).join(' ');
    const elementTypeText = elements.map(element => `${element.Type || ''} ${getElementRegistryType(element)}`).join(' ');
    const keyText = [
      ...(policy.KeyPath || []),
      ...valueGroups.flatMap(group => group.keyPaths)
    ].join(' ');
    const categoryPath = getCategoryPath(policy);
    const categoryDisplayPath = categoryPath.map(segment => segment.displayName || segment.name).join(' / ');
    const scope = getPolicyScope(policy);
    const shareId = getPolicyShareId(policy);
    return {
      ...policy,
      id: `policy-${index}`,
      shareId,
      scope,
      categoryPath,
      categoryPathKey: makeCategoryKey(categoryPath),
      categoryDisplayPath,
      searchFields: {
        names: [
          policy.DisplayName,
          policy.PolicyName,
          getCategory(policy),
          categoryDisplayPath,
          policy.File,
          policy.NameSpace,
          scope
        ],
        registry: [
          keyText,
          policy.ValueName,
          getPolicyValue(policy)
        ],
        details: [
          policy.Supported,
          policy.ExplainText,
          elementText,
          elementTypeText
        ]
      }
    };
  };

  const syncSearchSettingsUi = () => {
    Object.entries(searchOptionInputs).forEach(([key, input]) => {
      if (input) input.checked = Boolean(searchOptions[key]);
    });
    if (searchDelayInput) searchDelayInput.value = String(searchDelayMs);
  };

  const applySearchSettingsFromUi = () => {
    Object.entries(searchOptionInputs).forEach(([key, input]) => {
      if (input) searchOptions[key] = input.checked;
    });
    if (searchDelayInput) {
      const parsedDelay = Number.parseInt(searchDelayInput.value, 10);
      searchDelayMs = Number.isFinite(parsedDelay) ? Math.min(2000, Math.max(0, parsedDelay)) : defaultSearchDelayMs;
      searchDelayInput.value = String(searchDelayMs);
    }
    applyFilters();
  };

  const clampSettingsDialogPosition = () => {
    if (!settingsModal || !settingsDialog || settingsModal.hidden) return;
    const width = settingsDialog.offsetWidth;
    const height = settingsDialog.offsetHeight;
    const maxLeft = Math.max(0, settingsModal.clientWidth - width);
    const maxTop = Math.max(0, settingsModal.clientHeight - height);
    const left = Math.min(Math.max(0, settingsDialog.offsetLeft), maxLeft);
    const top = Math.min(Math.max(0, settingsDialog.offsetTop), maxTop);
    settingsDialog.style.left = `${left}px`;
    settingsDialog.style.top = `${top}px`;
  };

  const centerSettingsDialog = () => {
    if (!settingsModal || !settingsDialog) return;
    const width = settingsDialog.offsetWidth;
    const height = settingsDialog.offsetHeight;
    settingsDialog.style.left = `${Math.max(0, (settingsModal.clientWidth - width) / 2)}px`;
    settingsDialog.style.top = `${Math.max(0, (settingsModal.clientHeight - height) / 2)}px`;
    settingsDialog.dataset.positioned = 'true';
  };

  const openSettingsModal = () => {
    if (!settingsModal || !settingsDialog) return;
    settingsModal.hidden = false;
    document.body.classList.add('bindiff-settings-open');
    if (settingsDialog.dataset.positioned !== 'true') {
      requestAnimationFrame(centerSettingsDialog);
    } else {
      requestAnimationFrame(clampSettingsDialogPosition);
    }
  };

  const closeSettingsModal = () => {
    if (!settingsModal) return;
    settingsModal.hidden = true;
    document.body.classList.remove('bindiff-settings-open');
  };

  const startPaneResize = (splitter, event) => {
    if (event.button !== 0) return;
    const type = splitter.dataset.policySplitter;
    const treePanel = root.querySelector('.policy-tree-panel');
    if (!type || !tablePanel || !treePanel || !detailPanel) return;
    event.preventDefault();

    const layoutRect = splitter.parentElement.getBoundingClientRect();
    const startX = event.clientX;
    const startTreeWidth = treePanel.getBoundingClientRect().width;
    const startDetailWidth = detailPanel.getBoundingClientRect().width;
    const minTree = 180;
    const minDetail = 300;
    const minTable = 460;
    const maxTree = Math.max(minTree, layoutRect.width - minTable - (paneState.detail ? minDetail : 0));
    const maxDetail = Math.max(minDetail, layoutRect.width - minTable - (paneState.tree ? minTree : 0));
    let rafId = 0;
    let pendingX = startX;

    splitter.setPointerCapture(event.pointerId);
    document.body.classList.add('policy-resizing');

    const paint = () => {
      rafId = 0;
      const delta = pendingX - startX;
      if (type === 'tree') {
        const nextWidth = Math.min(Math.max(minTree, startTreeWidth + delta), maxTree);
        root.style.setProperty('--policy-tree-width', `${nextWidth}px`);
      } else {
        const nextWidth = Math.min(Math.max(minDetail, startDetailWidth - delta), maxDetail);
        root.style.setProperty('--policy-detail-width', `${nextWidth}px`);
      }
    };

    const onMove = moveEvent => {
      pendingX = moveEvent.clientX;
      if (!rafId) rafId = requestAnimationFrame(paint);
    };

    const onUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        paint();
      }
      document.body.classList.remove('policy-resizing');
      splitter.releasePointerCapture(event.pointerId);
      splitter.removeEventListener('pointermove', onMove);
      splitter.removeEventListener('pointerup', onUp);
    };

    splitter.addEventListener('pointermove', onMove);
    splitter.addEventListener('pointerup', onUp);
  };

  searchInput.addEventListener('input', scheduleSearch);
  viewTrigger?.addEventListener('click', event => {
    event.preventDefault();
    closeColumnMenu();
    toggleViewMenu();
  });
  columnTrigger?.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    closeViewMenu();
    if (columnMenu && !columnMenu.hidden) {
      closeColumnMenu();
    } else {
      openColumnMenuFromTrigger();
    }
  });
  settingsButton?.addEventListener('click', openSettingsModal);
  settingsCloseButton?.addEventListener('click', closeSettingsModal);
  settingsDoneButton?.addEventListener('click', closeSettingsModal);
  settingsResetButton?.addEventListener('click', () => {
    Object.assign(searchOptions, defaultSearchOptions);
    searchDelayMs = defaultSearchDelayMs;
    syncSearchSettingsUi();
    applyFilters();
  });
  Object.values(searchOptionInputs).forEach(input => {
    input?.addEventListener('change', applySearchSettingsFromUi);
  });
  searchDelayInput?.addEventListener('change', applySearchSettingsFromUi);
  searchDelayInput?.addEventListener('input', () => {
    const parsedDelay = Number.parseInt(searchDelayInput.value, 10);
    if (Number.isFinite(parsedDelay)) {
      searchDelayMs = Math.min(2000, Math.max(0, parsedDelay));
    }
  });
  settingsModal?.addEventListener('click', event => {
    if (event.target === settingsModal) closeSettingsModal();
  });
  settingsHeader?.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !settingsModal || !settingsDialog || settingsModal.hidden) return;
    if (event.target instanceof Element && event.target.closest('button')) return;
    event.preventDefault();
    if (settingsDialog.dataset.positioned !== 'true') centerSettingsDialog();

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
      lastLeft = Math.min(Math.max(0, startLeft + dx), maxLeft);
      lastTop = Math.min(Math.max(0, startTop + dy), maxTop);
      settingsDialog.style.transform = `translate3d(${lastLeft - startLeft}px, ${lastTop - startTop}px, 0)`;
    };

    const onMove = moveEvent => {
      pendingX = moveEvent.clientX;
      pendingY = moveEvent.clientY;
      if (!rafId) rafId = requestAnimationFrame(paintDrag);
    };

    const onUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        paintDrag();
      }
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
  splitters.forEach(splitter => {
    splitter.addEventListener('pointerdown', event => startPaneResize(splitter, event));
  });
  limitInput?.addEventListener('input', () => {
    const parsed = Number.parseInt(limitInput.value, 10);
    rowLimit = Number.isFinite(parsed) ? Math.min(5000, Math.max(1, parsed)) : 350;
    renderTable();
  });
  unlimitedInput?.addEventListener('change', () => {
    unlimitedRows = unlimitedInput.checked;
    if (limitInput) limitInput.disabled = unlimitedRows;
    renderTable();
  });
  paneToggles.forEach(button => {
    button.addEventListener('change', () => {
      const pane = button.dataset.policyPane;
      if (!pane) return;
      if (pane === 'detail' && !selectedId && button.checked) {
        button.checked = false;
        return;
      }
      paneState[pane] = button.checked;
      updatePaneLayout();
      renderDetail(policyById.get(selectedId));
    });
  });

  document.addEventListener('click', event => {
    if (
      columnMenu
      && !columnMenu.hidden
      && !columnMenu.contains(event.target)
      && !columnDropdown?.contains(event.target)
    ) closeColumnMenu();
    if (viewDropdown && viewMenu && !viewMenu.hidden && !viewDropdown.contains(event.target)) closeViewMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeColumnMenu();
    closeViewMenu();
    closeSettingsModal();
  });
  window.addEventListener('resize', () => {
    clampSettingsDialogPosition();
    applyTableColumnWidths();
  });
  if (typeof ResizeObserver !== 'undefined' && tableWrap) {
    new ResizeObserver(() => requestAnimationFrame(applyTableColumnWidths)).observe(tableWrap);
  }

  syncSearchSettingsUi();
  updatePaneLayout();
  renderTableHeader();
  Promise.all([loadPolicyData(), loadPolicyCategoryData()])
    .then(([data, categories]) => {
      categoryMap = new Map(Object.entries(categories || {}));
      policies = data.map(normalizePolicy).sort((left, right) => {
        const leftName = left.DisplayName || left.PolicyName || '';
        const rightName = right.DisplayName || right.PolicyName || '';
        return leftName.localeCompare(rightName, undefined, { sensitivity: 'base' });
      });
      policyById = new Map(policies.map(policy => [policy.id, policy]));
      policyByShareId = new Map();
      policies.forEach(policy => {
        const shareKey = normalizePolicyShareId(policy.shareId);
        if (shareKey && !policyByShareId.has(shareKey)) {
          policyByShareId.set(shareKey, policy);
        }
      });
      const linkedPolicy = getPolicyFromUrl();
      if (linkedPolicy) {
        selectedId = linkedPolicy.id;
        paneState.detail = true;
        selectedCategoryKey = linkedPolicy.categoryPathKey || '';
        expandTreeForPolicy(linkedPolicy);
      } else if (new URLSearchParams(location.search).has(POLICY_QUERY_PARAM)) {
        updatePolicyUrl(null);
      }
      updatePaneLayout();
      renderTree();
      applyFilters();
    })
    .catch(error => {
      if (tableNote) tableNote.textContent = error.message || 'Failed to load policy definitions.';
      renderTree();
      renderTable();
      renderDetail(null);
    });
}
  global.initPolicyExplorer = initPolicyExplorer;
})(window);
