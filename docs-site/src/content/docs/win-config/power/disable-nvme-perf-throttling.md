---
title: 'NVMe Perf Throttling'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-nvme-perf-throttling'
sidebar:
  order: 13
---

It get intialized, unsure what exactly it does. Might be related to thermal throttling (controller cuts IOPS and bandwidth to lower heat and protect the drive)?

The default data is `0` if the value is missing, but for new installations it's present with the value `1`. Il'll still leave it in here for documentation reasons.

```c
ResultLength = 0;
DestinationString = 0LL;
RtlInitUnicodeString(&DestinationString, L"NVMeDisablePerfThrottling");
if (ZwQueryValueKey(
        KeyHandle,
        &DestinationString,
        KeyValuePartialInformation,
        KeyValueInformation,
        0x110u,
        &ResultLength) < 0)           // query failed
{
    ClassNVMeDisablePerfThrottling = 0; // default if missing
}
else if (v6 == 4 && ResultLength >= 4)  // REG_DWORD
{
    ClassNVMeDisablePerfThrottling = (v7 != 0); // non zero = disable throttling
}
```

> https://github.com/nohuto/win-registry/blob/main/records/Classpnp.txt  
> [power/assets | nvmeperf-ClassUpdateDynamicRegistrySettings.c](https://github.com/nohuto/win-config/blob/main/power/assets/nvmeperf-ClassUpdateDynamicRegistrySettings.c)
