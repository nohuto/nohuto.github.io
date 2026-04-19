---
title: 'DXG Kernel Values'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#dxg-kernel-values'
sidebar:
  order: 3
---

`dxgkrnl.sys` is Windows DirectX/WDDM graphics kernel driver that mediates between apps and the GPU to schedule work, manage graphics memory, present frames, and handle TDR hang recovery.

> https://github.com/nohuto/regkit/blob/main/records/Graphics-Drivers.txt

Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

See regkit repo for a list of `CCS\\Control\\GraphicsDrivers\\...` values/defaults/notes:
> [/docs/win-config/system/dxg-kernel-values/#registry-values-details](/docs/win-config/system/dxg-kernel-values/#registry-values-details)
