---
title: 'Windows Update Cache'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#windows-update-cache'
sidebar:
  order: 17
---

Troubleshooting update loops often requires resetting `%WINDIR%\SoftwareDistribution` and `%WINDIR%\System32\catroot2`. This forces Windows Update to redownload the catalog metadata.

Paths removed:
```c
%WINDIR%\SoftwareDistribution\Download\*
%WINDIR%\SoftwareDistribution\DataStore\*
%WINDIR%\System32\catroot2\*
```

Services stopped first:
```c
bits, wuauserv, cryptsvc, msiserver
```
