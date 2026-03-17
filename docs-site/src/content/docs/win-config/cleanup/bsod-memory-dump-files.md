---
title: 'BSoD Memory Dump Files'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#bsod-memory-dump-files'
sidebar:
  order: 20
---

Removes kernel crash dump data created after a system bugcheck. Useful if you want to reclaim disk space or you have already analyzed the crash.

This option clears both LiveKernelReports and `MEMORY.DMP` when present.

Paths removed:
```c
%WINDIR%\LiveKernelReports
%WINDIR%\MEMORY.DMP
```
