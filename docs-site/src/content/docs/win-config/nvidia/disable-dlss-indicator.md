---
title: 'DLSS Indicator'
description: 'NVIDIA option documentation from win-config.'
editUrl: false
sidebar:
  order: 7
---

Enabled = `1024`  
Disabled = `0`

---

### From NVIDIA Documentations

`turn-dlss-indicator-off`
```powershell
[HKEY_LOCAL_MACHINE\SOFTWARE\NVIDIA Corporation\Global\NGXCore]
"ShowDlssIndicator"=dword:00000000
```
`turn-dlss-indicator-on-center`
```powershell
[HKEY_LOCAL_MACHINE\SOFTWARE\NVIDIA Corporation\Global\NGXCore]
"ShowDlssIndicator"=dword:00000001
```
`turn-dlss-indicator-on-top-left`
```powershell
[HKEY_LOCAL_MACHINE\SOFTWARE\NVIDIA Corporation\Global\NGXCore]
"ShowDlssIndicator"=dword:00000002
```

> [nvidia/assets | dlss.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/dlss.c)  
> [nvidia/assets | dlss-NGXCubinGeneric.cpp](https://github.com/nohuto/win-config/blob/main/nvidia/assets/dlss-NGXCubinGeneric.cpp)
