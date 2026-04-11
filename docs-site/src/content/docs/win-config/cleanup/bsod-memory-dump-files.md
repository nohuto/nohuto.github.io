---
title: 'BSoD Memory Dump Files'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#bsod-memory-dump-files'
sidebar:
  order: 23
---

Removes kernel crash dump data created after a system bugcheck. Useful if you want to reclaim disk space or you have already analyzed the crash.

This option clears `LiveKernelReports`, `MEMORY.DMP`, and per-crash minidumps in `%WINDIR%\Minidump`.

Paths removed:
```c
%WINDIR%\LiveKernelReports
%WINDIR%\MEMORY.DMP
%WINDIR%\Minidump\*.dmp
```
