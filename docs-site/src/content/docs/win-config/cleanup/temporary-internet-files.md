---
title: 'Temporary Internet Files'
description: 'Cleanup option documentation from win-config.'
editUrl: false
sidebar:
  order: 12
---

Legacy WinINet consumers (Explorer, old Control Panel surfaces, webviews inside installers, etc.) still use these caches. Expect the first launch of an affected app to take longer while it rebuilds HTTP caches.

Paths removed:
```c
%LOCALAPPDATA%\Microsoft\Windows\INetCache\*
%LOCALAPPDATA%\Microsoft\Windows\INetCookies\*
%LOCALAPPDATA%\Microsoft\Windows\WebCache\*
%LOCALAPPDATA%\Microsoft\Windows\Temporary Internet Files\*
```
