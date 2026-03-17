---
title: 'MUI Cache'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#mui-cache'
sidebar:
  order: 8
---

Clears per user MUI cache entries that store resolved display names for executables, shortcuts, and shell items. Windows recreates these entries as programs are launched.

Registry paths removed:
```c
HKCU\Software\Microsoft\Windows\ShellNoRoam\MUICache
HKCU\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache
```
