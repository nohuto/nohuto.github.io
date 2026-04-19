---
title: 'Reserved Storage'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

"Windows reserves `~7 GB` of disk space to ensure updates and system processes run reliably. Temporary files and updates use this reserved area first. If it's full, Windows uses normal disk space or asks for external storage. Size increases with optional features or extra languages. Unused ones can be removed to reduce it."

`dism /online /Set-ReservedStorageState /State:Disabled /NoRestart` / `Set-WindowsReservedStorageState -State Disabled` set:
```bat
dismhost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\ReserveManager\DisableDeletes	Type: REG_DWORD, Length: 4, Data: 1
```
> https://learn.microsoft.com/en-us/powershell/module/dism/set-windowsreservedstoragestate?view=windowsserver2025-ps
