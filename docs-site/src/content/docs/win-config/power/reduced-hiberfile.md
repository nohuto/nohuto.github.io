---
title: 'Reduced HiberFile'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#reduced-hiberfile'
sidebar:
  order: 6
---

Hibernation files are used for hybrid sleep, fast startup, and [standard hibernation](https://learn.microsoft.com/en-us/windows/win32/power/system-power-states#hibernate-state-s4). There are two types, differentiated by size, a full and reduced size hibernation file. Only fast startup can use a reduced hibernation file.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "HiberFileSizePercent" = 100; // PopHiberFileSizePercent dd 64h (IDA), but set to 0 by default on LTSC IoT Enterprise 2024 since hibernation is unsupported by default

    // DWORD 1 = Reduced, DWORD 2 = Full
    "HiberFileType" = 4294967295; // PopHiberFileTypeReg (0xFFFFFFFF)
    "HiberFileTypeDefault" = 4294967295; // PopHiberFileTypeDefaultReg (0xFFFFFFFF)

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\HiberFileBucket";
    "Percent16GBFull" = ?; // unk_140FC36D0 - 28Hex/40Dec
    "Percent16GBReduced" = ?; // unk_140FC36CC - 14Hex/20Dec
    "Percent1GBFull" = ?; // unk_140FC3670 - 28Hex/40Dec
    "Percent1GBReduced" = ?; // unk_140FC366C - 14Hex/20Dec
    "Percent2GBFull" = ?; // unk_140FC3688 - 28Hex/40Dec
    "Percent2GBReduced" = ?; // unk_140FC3684 - 14Hex/20Dec
    "Percent32GBFull" = ?; // unk_140FC36E8 - 28Hex/40Dec
    "Percent32GBReduced" = ?; // unk_140FC36E4 - 14Hex/20Dec
    "Percent4GBFull" = ?; // unk_140FC36A0 - 28Hex/40Dec
    "Percent4GBReduced" = ?; // unk_140FC369C - 14Hex/20Dec
    "Percent8GBFull" = ?; // unk_140FC36B8 - 28Hex/40Dec
    "Percent8GBReduced" = ?; // unk_140FC36B4 - 14Hex/20Dec
    "PercentUnlimitedFull" = ?; // unk_140FC3700 - 28Hex/40Dec
    "PercentUnlimitedReduced" = ?; // unk_140FC36FC - 14Hex/20Dec
```

## PowerCFG Captures & Commands

`powercfg /h /size 0`:
```c
RegSetValue	HKLM\System\CurrentControlSet\Control\Power\HiberFileSizePercent	SUCCESS	Type: REG_DWORD, Length: 4, Data: 0
```
`powercfg /h /type full`:
```c
RegSetValue	HKLM\System\CurrentControlSet\Control\Power\HiberFileType	SUCCESS	Type: REG_DWORD, Length: 4, Data: 2
```
`powercfg /h /type reduced`:
```c
RegSetValue	HKLM\System\CurrentControlSet\Control\Power\HiberFileType	SUCCESS	Type: REG_DWORD, Length: 4, Data: 1
```

| Hibernation file type | Default size           | Supports                              |
|-----------------------|------------------------|---------------------------------------|
| Full                  | 40% of physical memory | hibernate, hybrid sleep, fast startup |
| Reduced               | 20% of physical memory | fast startup                          |

To verify or change the type of hibernation file used, run the *powercfg.exe* utility. The following examples demonstrate how.

| Example      |Description   |
|--------------|--------------|
| `powercfg /a`                      | **Verify the hibernation file type.** When a full hibernation file is used, the results state that hibernation is an available option. When a reduced hibernation file is used, the results say hibernation is not supported. If the system has no hibernation file at all, the results say hibernation hasn't been enabled. |
| `powercfg /h /type full`           | **Change the hibernation file type to full.** This isn't recommended on systems with less than 32GB of storage.                      |
| `powercfg /h /type reduced`        | **Change the hibernation file type to reduced.** If the command returns "the parameter is incorrect," see the following example.      |
| `powercfg /h /size 0`<br> `powercfg /h /type reduced`  | **Retry changing the hibernation file type to reduced.** If the hibernation file is set to a custom size greater than 40%, you must first set the size of the file to zero. Then retry the reduced configuration.     |

> https://www.noverse.dev/docs/win-config/power/power-values/#registry-values-details  
> https://learn.microsoft.com/en-us/windows/win32/power/system-power-states
