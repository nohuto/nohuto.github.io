---
title: 'Windows Update Cache'
description: 'Cleanup option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
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
