---
title: 'Power Values'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#power-values'
sidebar:
  order: 2
---

This option serves as a general values overview for the `Power` key (similar to `DXG Kernel Values`/`Kernel Values`/`DWM Values`). Several values are applied, some have been changed, others are default values. The applied data is sometimes pure speculation.

No values are applied that apply to other options in this section.

See win-registry repo for a list of `CCS\\Control\\Power\\...` values/defaults/notes:
> [/docs/win-registry/sections/registry-values-research/power-values/](/docs/win-registry/sections/registry-values-research/power-values/)

---

## Power Throttling

```
Power throttling, introduced in W10 and present in W11, limits CPU usage for background or minimized applications. It reduces the processing power available to these apps while allowing active applications to run normally.
```
You can see processes, which use power throttling by enabling the column (`Details` > `Select Column`) or add it to the active columns in system informer via the `Choose columns...` window (picture).
> https://systeminformer.io/

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling";
    "PowerThrottlingOff" = 0; // PpmPerfQosGroupPolicyDisable 
```

![](https://github.com/nohuto/win-config/blob/main/power/images/powerth.png?raw=true)
