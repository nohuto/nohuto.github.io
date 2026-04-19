---
title: 'HDD Parking'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-hdd-parking'
sidebar:
  order: 10
---

`EnableHDDParking` is set to `1` by default, `EnableDIPM`/`EnableHIPM` are set to `0` by default. I haven't looked further into it and therefore can't say if changing `EnableHDDParking` has any affect at all, since it seems to not be read. I might add more details soon.

---

Miscellaneous information:
```
HIPM = Host Initiated Link Power Management
DIPM = Device Initiated Link Power Management
```
```c
Dst[37] = L"EnableHIPM";
LODWORD(Dst[11]) = 4;
Dst[38] = &dword_4C134;
Dst[40] = &dword_4C134;
Dst[44] = L"EnableDIPM";
LODWORD(Dst[13]) = 4;
Dst[45] = &dword_5D0C8;
Dst[47] = &dword_5D0C8;
Dst[58] = L"EnableHDDParking";
LODWORD(Dst[18]) = 4;
Dst[59] = &dword_4C13C;
Dst[61] = &dword_4C13C;

dword_5D0CC = 0;
dword_5D0C8 = 0;
dword_4C434 = 0;
dword_4C12C = -1;
dword_4C138 = -1;
dword_4C134 = -1;
dword_4C424 = 16;
dword_4C420 = 3000;
dword_5D510 = 1;
dword_4C13C = 1;
dword_4C130 = 1;
dword_4C140 = -1;
```

> [power/assets | hddpark-amdsbs.c](https://github.com/nohuto/win-config/blob/main/power/assets/hddpark-amdsbs.c)  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/device-power-states  
> https://github.com/nohuto/regkit

Needs more research (`ClassGetServiceParameter.c` - default `0`?):
```
\Registry\Machine\SYSTEM\ControlSet001\Services\disk : IdleClassSupported
```
Additional notes: `EnableALPEDisableHotplug` (`0`), `AhciDisablePxHotplug` - `amdsbs.c`

> https://learn.microsoft.com/en-us/windows-hardware/customize/power-settings/disk-settings-link-power-management-mode---hipm-dipm  
> [power/assets | hddpark-ClassGetServiceParameter.c](https://github.com/nohuto/win-config/blob/main/power/assets/hddpark-ClassGetServiceParameter.c)  
> [power/assets | hddpark-DllInitialize.c](https://github.com/nohuto/win-config/blob/main/power/assets/hddpark-DllInitialize.c)
