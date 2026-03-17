---
title: 'Temporary NVCPL'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#temporary-nvcpl'
sidebar:
  order: 4
---

`NVDisplay.Container.exe` is required for nvcpl to start. [`nvcpl.ps1`](https://github.com/nohuto/win-config/blob/main/nvidia/assets/nvcpl.ps1) starts them, waits till you close the program, and then terminates them.

Download location:
```powershell
$env:appdata\Noverse
```
Shortcut location:
```powershell
$home\Desktop\Nvcpl.lnk
```
