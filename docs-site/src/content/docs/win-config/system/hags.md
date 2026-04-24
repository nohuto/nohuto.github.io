---
title: 'HAGS'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 13
---

[HAGS](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/) feature is introduced specifically for the WDDM. If disabled the CPU manages the GPU scheduling via a high-priority kernel thread, GPU context switches and task scheduling are handled by the CPU (CPU offloads graphics intensive tasks to the GPU for rendering). If enabled the GPU handles its own scheduling using a built in scheduler processor, context switching between GPU tasks is done directly on the GPU. It is especially beneficial, if you've a slow CPU, or if the CPU is heavily loaded with other tasks.

"It depends on your hardware, if you want [HAGS](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/) to be enabled or not. E.g if using a old GPU, it may not fully support the new scheduler."

[HAGS](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/) should be enabled.

## SystemSettings Records

```c
// Enabled
HKLM\System\CurrentControlSet\Control\GraphicsDrivers\HwSchMode	Type: REG_DWORD, Length: 4, Data: 2
```
```c
// Disabled
HKLM\System\CurrentControlSet\Control\GraphicsDrivers\HwSchMode	Type: REG_DWORD, Length: 4, Data: 1
```
