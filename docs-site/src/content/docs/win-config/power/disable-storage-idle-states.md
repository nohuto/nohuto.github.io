---
title: 'Storage Idle States'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-storage-idle-states'
sidebar:
  order: 12
---

Disables idle states for NVMe, SSD, SD, HDD. This is currently more of a possible idea. 

If `IdleStatesNumber` is set, the other values are ignored? Let me know if you have a better interpretation.

> The values are located in the `EnergyEstimation` (guesses how much power is used over time), so it's probably related to something else. I'll leave it for documentation reasons (and future extended declaration).

> https://github.com/nohuto/regkit/blob/main/records/Power.txt  
> [power/assets | storageidle-PmPowerContextInitialization.c](https://github.com/nohuto/win-config/blob/main/power/assets/nvmeperf-ClassUpdateDynamicRegistrySettings.c)

## Suboption

### Disable HDD Parking

`EnableHDDParking` is set to `1` by default, `EnableDIPM`/`EnableHIPM` are set to `0` by default. I haven't looked further into it and therefore can't say if changing `EnableHDDParking` has any affect at all, since it seems to not be read. I might add more details soon.

HIPM (Host Initiated Link Power Management)/DIPM (Device Initiated Link Power Management) are controlled via the [AHCI Link Power Management - HIPM/DIPM](https://github.com/nohuto/win-config/blob/main/power/assets/power-settings/disk-settings-link-power-management-mode---hipm-dipm.md) (power plan), I haven't checked whenever these values interfer with it or not.

```powershell
Power Setting GUID: 0b2d69d7-a2a1-449c-9680-f91c70521c60  (AHCI Link Power Management - HIPM/DIPM)
  Possible Setting Index: 000
  Possible Setting Friendly Name: Active - Neither Host or Device initiated allowed
  Possible Setting Index: 001
  Possible Setting Friendly Name: HIPM - Host initiated allowed only
  Possible Setting Index: 002
  Possible Setting Friendly Name: HIPM+DIPM - Both Host and Device initiated allowed
  Possible Setting Index: 003
  Possible Setting Friendly Name: DIPM - Device initiated allowed only
  Possible Setting Index: 004
  Possible Setting Friendly Name: Lowest - HIPM+DIPM+DEVSLP
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
> [power/assets | hddpark-DllInitialize.c](https://github.com/nohuto/win-config/blob/main/power/assets/hddpark-DllInitialize.c)  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/device-power-states  
> https://learn.microsoft.com/en-us/windows-hardware/customize/power-settings/disk-settings-link-power-management-mode---hipm-dipm
