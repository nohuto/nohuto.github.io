---
title: 'Icons Meaning'
description: 'Generated from regkit README section: Icons Meaning.'
editUrl: false
sidebar:
  order: 6
---

### Symlink Icon <img src="https://github.com/nohuto/regkit/blob/main/assets/icons/lucide/light/symlink.ico?raw=true" width="16" height="16">

A key created with `REG_OPTION_CREATE_LINK` is a registry symbolic link key, symbolic link keys let the Configuration Manager redirect lookups to another key. They're created by passing `REG_CREATE_LINK` to `RegCreateKey` / `RegCreateKeyEx`. Internally, the link is stored as a `REG_LINK` value named `SymbolicLinkValue` that holds the target path. This value is usually not visible in regedit.

RegKit displays keys as symbolic links when the registry reports a link target (done by checking for a symbolic link target during key enumeration).

Examples:
- `HKLM\SYSTEM\CurrentControlSet` -> `HKLM\SYSTEM\ControlSet00x`
- `HKEY_CURRENT_USER` -> `HKEY_USERS\<CurrentUserSID>`
- `HKEY_CURRENT_CONFIG` -> `HKLM\SYSTEM\CurrentControlSet\Hardware Profiles\Current`

### Database Icon <img src="https://github.com/nohuto/regkit/blob/main/assets/icons/lucide/light/database.ico?raw=true" width="16" height="16">

RegKit marks keys that map to hive files listed under HKLM\SYSTEM\CurrentControlSet\Control\Hivelist (see "[A true hive is stored in a file.](https://scorpiosoftware.net/2022/04/15/mysteries-of-the-registry/)").

These hive-backed keys can be opened directly via "*Open Hive File*" (view menu or context menu). See [Hives and on-disk files](https://github.com/nohuto/regkit#hives-and-on-disk-files) for hive file paths.

### Simulated Key Icon <img src="https://github.com/nohuto/regkit/blob/main/assets/icons/lucide/light/folder-sim.ico?raw=true" width="16" height="16">

Keys displayed as simulated are virtual entries created from trace files when a key exists in a trace but not in the actual hive view. They're displayed with the *folder-sim* icon so you can differ them from real keys. Creating or modifying a value in a simulated key will create the key path on demand.
