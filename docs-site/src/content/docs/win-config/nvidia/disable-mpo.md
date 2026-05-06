---
title: 'MPO'
description: 'NVIDIA option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

> "*Multi-Plane Overlay (MPO) refers to the use of additional dedicated hardware scanout planes in the GPU that frames can be presented to, which the GPU then takes care of scanning out to the display itself, thereby allowing the GPU to shoulder the work (again achieving lower latencies) that the DWM would otherwise do but in software (which would incur an additional latency). Typically NVIDIA assigns all of the planes it supports (usually upwards of 4 of them) to a single display while the rest of the displays goes without any.*
>
> *A display typically needs to be assigned at least 2 planes by the display driver for the feature to be regarded as supported on the display.*"
>
> — Special K Wiki, [Multi-Plane Overlay](https://wiki.special-k.info/SwapChain#multi-plane-overlay-mpo)

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

- [nvidia/assets | mpo-bDwmOverlayTestMode.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/mpo-bDwmOverlayTestMode.c)
