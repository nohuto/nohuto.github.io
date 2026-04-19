---
title: 'HAGS'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 13
---

HAGS feature is introduced specifically for the WDDM. If disabled the CPU manages the GPU scheduling via a high-priority kernel thread, GPU context switches and task scheduling are handled by the CPU (CPU offloads graphics intensive tasks to the GPU for rendering). If enabled the GPU handles its own scheduling using a built in scheduler processor, context switching between GPU tasks is done directly on the GPU. It is especially beneficial, if you've a slow CPU, or if the CPU is heavily loaded with other tasks.

"It depends on your hardware, if you want HAGS to be enabled or not. E.g if using a old GPU, it may not fully support the new scheduler."

HAGS should be enabled.

> https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/  
> https://maxcloudon.com/hardware-accelerated-gpu-scheduling/

## SystemSettings Records

Enable HAGS:
```powershell
SystemSettingsAdminFlows.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\HwSchMode	Type: REG_DWORD, Length: 4, Data: 2
```
Disable HAGS:
```powershell
SystemSettingsAdminFlows.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\HwSchMode	Type: REG_DWORD, Length: 4, Data: 1
```
