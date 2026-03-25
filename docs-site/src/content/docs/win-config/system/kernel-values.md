---
title: 'Kernel Values'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#kernel-values'
sidebar:
  order: 2
---

Since many people don't yet know which values exist and what default value they have, here's a list. I used IDA, WinDbg, WinObjEx, Windows Internals E7 P1 to create it. Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

> https://github.com/nohuto/windows-books/releases  
> https://github.com/hfiref0x/WinObjEx64  
> https://github.com/nohuto/sym-mem-dump  
> https://github.com/nohuto/win-registry#kernel-values  

See win-registry repo for a list of `CCS\\Control\\Session Manager\\...` values/defaults/notes:
> [/docs/win-registry/sections/registry-values-research/session-manager-values/](/docs/win-registry/sections/registry-values-research/session-manager-values/)

![](https://github.com/nohuto/win-config/blob/main/system/images/kernel0.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/kernel1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/kernel2.png?raw=true)

## Notes on SerializeTimerExpiration

`0` = depends on `HalpAcpiAoacCapable`, can end up with `0`/`1`. `HalpSetPlatformFlags` checks if bit 21
```c
if ( (*(_DWORD *)(a1 + 112) & 0x200000) != 0 )
  HalpPlatformFlags |= 8u;
```
is set or not, if set it's `1`, if not `0`.
```
LOW_POWER_S0_IDLE_CAPABLE Bit offset 21. Indicates that the platform supports low-power idle states within the ACPI S0 system power state that are more energy efficient than any Sx sleep state. If this flag is set, Windows won't try to sleep and resume, but will instead use platform idle states and connected standby.
```
Means for desktops/servers it's usually `0`, since "S0 Low‑Power Idle/Modern Standby" is more of a laptop/tablet thing.

You can check if the bit is true or false using [iasl & acpidump](https://github.com/acpica/acpica).

`1` = forced on (uses CPU 0 `KiProcessorBlock[0]`)
`>=2` = forced `0`

This isn't completey, it's currently only for the data ranges.

![](https://github.com/nohuto/win-config/blob/main/system/images/kernel-ste.png?raw=true)

Read more about 'Timer expiration' in [Windows Interals E7, P1, P.66f](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).
