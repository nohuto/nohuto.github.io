---
title: 'SRUM Data'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#srum-data'
sidebar:
  order: 3
---

Deletes the SRUM database file, which tracks app, service, and network usage.

Location:
```bat
%WINDIR%\System32\sru
```
Paths removed:
```c
%WINDIR%\System32\sru\SRUDB.dat
```
Read the SRUM data:
> https://github.com/MarkBaggett/srum-dump
