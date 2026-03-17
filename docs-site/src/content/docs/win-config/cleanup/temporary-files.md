---
title: 'Temporary Files'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#temporary-files'
sidebar:
  order: 12
---

Per user temporary files are saved in `%TEMP%`, global files under `%WINDIR%\Temp`. Some installers never delete leftovers, so those can pollute the folder. Anything that is still used will be skipped.

Paths removed:
```c
%TEMP%\*
%WINDIR%\Temp\*
```
