---
title: 'Differences to Default RegEdit'
description: 'Generated from regkit README section: Differences to Default RegEdit.'
editUrl: false
sidebar:
  order: 3
---

RegKit adds functionality that standard regedit doesn't support/expose:

- A real REGISTRY root view in addition to standard hives
- [Theme modes](https://github.com/nohuto/regkit#theme-presets) (System/Light/Dark) and custom theme presets (edit colors, import/export `.rktheme`)
- Custom font support
- Custom [icon support](https://github.com/nohuto/regkit#icon-sets) (has 4 sets installed by default)
- Symbolic link detection (`SymbolicLinkValue` value with the link target)
- Hive backed key detection using hivelist key & open Hive File (opens the backing hive file)
- [Trace presets](https://github.com/nohuto/regkit#trace-menu) (23H2/24H2/25H2 - see below), used for "Read on boot" column
- Default presets, this shows default data from new installations
- Extra hives toggle, exposes additional predefined keys that RegEdit typically doesn't show, such as `HKEY_PERFORMANCE_DATA` (live performance counter data produced on demand, not stored in a hive file) and related keys like `HKEY_PERFORMANCE_TEXT`/`HKEY_PERFORMANCE_NLSTEXT` for e.g. counter name strings (read more [here](https://learn.microsoft.com/en-us/windows/win32/perfctrs/using-the-registry-functions-to-consume-counter-data))
- Run with [SYSTEM/TI rights](https://github.com/nohuto/regkit#rights-and-elevation)
- Favorites import/export
- Comment column for values with import/export support
- Loading/unloading hives
- Local/remote/offline registry
- Undo/redo, copy/paste (entire keys), replace, performant 'Find'
- Find can search Standard Hives, the real REGISTRY root, and Trace values independently
- Address bar accepts multiple registry path formats (abbreviated HK*, full root, regedit address bar, `.reg` header, PowerShell drive/provider, escaped)
- Copy Key Path As menu for the same formats (to copy/paste into the address bar)
- Copy Value Name / Copy Value Data from value context menus
- Tab control
- Tab session restore (Save Tabs / Clear Tabs on Exit), including cached Find results
- Filter bar (value list filter)
- History view
- Option to save/forget previous key tree state
- Simulated keys toggle (from traces)
- Compare Registries (compare two registry sources or `.reg` files and see differences)
- `.reg` / hive file/folder drag and drop support
- Research menu (redirections to [regkit](https://github.com/nohuto/regkit))
- Miscellaneous common functionalities
