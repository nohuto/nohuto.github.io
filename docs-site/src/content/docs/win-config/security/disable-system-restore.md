---
title: 'System Restore'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

```powershell
Disable-ComputerRestore -Drive "C:\"
```
Does:
```powershell
"wmiprvse.exe", "RegSetValue","HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore\RPSessionInterval","Type: REG_DWORD, Length: 4, Data: 0"
```
