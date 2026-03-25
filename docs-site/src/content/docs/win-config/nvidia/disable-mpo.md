---
title: 'MPO'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#disable-mpo'
sidebar:
  order: 20
---

"MPO lets the GPU present frames directly to the display using hardware scanout planes, reducing latency by bypassing the DWMs software composition. A display needs at least two planes for MPO to be active. As of April 2023, SKIF shows MPO assignments in its settings tab. NVIDIA typically assigns all available planes (usually 4 or more) to one display, leaving others without."

Shouldn't be disabled, same goes for FSO. Leave it enabled or you may end up using composition atlas. I decided to add it since MPO can cause issues like screen flickering.

Use [PresentMon](https://github.com/GameTechDev/PresentMon/releases) and record your game to see which presentation mode you currently use.

![](https://github.com/nohuto/win-config/blob/main/nvidia/images/swapchain.jpg?raw=true)  

```
\Registry\Machine\SOFTWARE\Microsoft\Windows\Dwm : OverlayTestMode
```
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
> https://github.com/nohuto/win-registry/blob/main/records/Windows-Dwm.txt
