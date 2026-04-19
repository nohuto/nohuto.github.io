---
title: 'MPO'
description: 'NVIDIA option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

"MPO lets the GPU present frames directly to the display using hardware scanout planes, reducing latency by bypassing the DWMs software composition. A display needs at least two planes for MPO to be active. As of April 2023, SKIF shows MPO assignments in its settings tab. NVIDIA typically assigns all available planes (usually 4 or more) to one display, leaving others without."

I decided to add it since MPO can cause issues like screen flickering, if not having such issues, leave it enabled.

Takes a default value of `0`, which shouldn't get changed (removing the value = using `0`):
```c
v5 = 0;
if (!(unsigned int)GetPersistedRegistryValueW(
      L"DWMSwitches",
      L"Software\\Microsoft\\Windows\\Dwm",
      L"OverlayTestMode",
      16,
      0,
      &v5,
      4,
      0))
{
    dword_18041A46C = v5;
}
```

> [nvidia/assets | mpo-bDwmOverlayTestMode.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/mpo-bDwmOverlayTestMode.c)  
> https://wiki.special-k.info/en/SwapChain  
> https://wiki.special-k.info/Presentation_Model  
> https://github.com/nohuto/regkit/blob/main/records/Windows-Dwm.txt
