---
title: 'MMCSS Values'
description: 'Generated from win-registry README section: MMCSS Values.'
editUrl: 'https://github.com/nohuto/win-registry/blob/main/README.md#mmcss-values'
sidebar:
  order: 14
---

All values are read via `CiConfigReadDWORD()`, so the type is `REG_DWORD` for all listed ones. If `\Tasks` opens successfully, `CiConfigInitializeFromRegistry()` handles that part?

See [mmcss-CiConfigInitialize.c](https://github.com/nohuto/win-registry/blob/main/assets/mmcss/mmcss-CiConfigInitialize.c) for notes and [system/desc.md#mmcss-values](/docs/win-config/system/mmcss-values/) for details on SystemResponsiveness.

```c
"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\multimedia\\systemprofile";
    "SystemResponsiveness" = 20; // see win-config section in system\desc
    "NetworkThrottlingIndex" = 10; // 0 becomes 1, 1-70 stay unchanged, 71-4294967294 become 70, 4294967295 stays unchanged
    "NoLazyMode" = 0; // any nonzero value = enabled
    "IdleDetectionCycles" = 2; // valid range is 1-31, otherwise 2 is used
    "LazyModeTimeout" = 1000000; // 0 is replaced with 1000000
    "SchedulerTimerResolution" = 10000; // values above 10000 are capped to 10000
    "SchedulerPeriod" = 100000; // valid range is 50000-1000000, otherwise 100000 is used
    "MaxThreadsPerProcess" = 32; // valid range is 8-128, otherwise 32 is used
    "MaxThreadsTotal" = 256; // valid range is 64-65535, otherwise 256 is used
```
