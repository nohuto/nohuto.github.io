---
title: 'Downloaded Program Files'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#downloaded-program-files'
sidebar:
  order: 22
---

Clears cached ActiveX and legacy web components used by older installers and control panel items. Modern apps typically ignore this folder, so this is generally safe to remove.

Paths removed:
```c
%WINDIR%\Downloaded Program Files
```
