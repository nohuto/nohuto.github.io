---
title: 'Recycle Bin'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#recycle-bin'
sidebar:
  order: 5
---

Empties the recycle bin for every mounted drive. Windows stores deleted files per volume in `$Recycle.Bin`, so if you have multiple volumes this can recover more space than the Explorer UI shows.

```powershell
C:\$Recycle.Bin\S-<user-id>
```
Command used:
```powershell
Clear-RecycleBin -Force
```
