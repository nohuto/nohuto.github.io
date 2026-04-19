---
title: 'Power Values'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#power-values'
sidebar:
  order: 2
---

This option serves as a general values overview for the `Power` key (similar to `DXG Kernel Values`/`Kernel Values`/`DWM Values`). Several values are applied, some have been changed, others are default values. The applied data is sometimes pure speculation.

No values are applied that apply to other options in this section.

See regkit repo for a list of `CCS\\Control\\Power\\...` values/defaults/notes:
> [/docs/win-config/power/power-values/#registry-values-details](/docs/win-config/power/power-values/#registry-values-details)

---

## PowerThrottlingOff Details

```
Power throttling, introduced in W10 and present in W11, limits CPU usage for background or minimized applications. It reduces the processing power available to these apps while allowing active applications to run normally.
```

When looking into the pseudocode (PopInitializeHeteroProcessors) it shows that if the value is set to nonzero it would:
- force QoS allow variable `v5` to `0` and stores it in `PpmPerfQosSupportedAndAllowed` at the end
- passes `v5` (`0`) value into `KeConfigureHeteroProcessors`
- skips `PpmIdleEnableIdleDurationExpirationTimeout` (`PpmIdleDurationExpirationTimeout = (unsigned int)(10000 * PpmIdleDurationExpirationTimeoutMs);`, `PpmInstallNewIdleStates` can also set `PpmIdleDurationExpirationTimeout`), causing the idle expiration to be off by exiting PoExecuteIdleCheck instantly (otherwise periodic checks would run, see `PoExecuteIdleCheck`)

All of this seems to depend on whenever either
```c
v4 = 0;
if ( (PpmBackgroundProfile || PpmEntryLevelPerfProfile || PpmMultimediaQosProfile || PpmPerfAlwaysComputeQosEnabled)
  && PpmPerfSchedulerDirectedPerfStatesSupported
  && KeQueryActiveProcessorCountEx(0) >= 2 )
{
  v4 = 1;
}
if ( PpmPerfVmQosSupported )
{
  v4 = 1;
  goto LABEL_13;
}
if ( v4 )
{
LABEL_13:
  v5 = 1;
  if ( !PpmPerfQosGroupPolicyDisable ) // if PowerThrottlingOff = 1, then v5 = 0
    goto LABEL_15;
}
v5 = 0; // forced 0 if v4 not true
LABEL_15:
```
or `PpmPerfVmQosSupported` (hypervisor present, HvlIsRootPowerSchedulerQosPresent) are true. If both aren't true, then v5 is already 0 means changing PowerThrottlingOff would have no impact?

On my system both aren't true means that changing the value has no impact as v5 can't be `1` (this is my current interpretation).

Note that this is based on [binary build version 22631 (23H2)](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/ntoskrnl/PopInitializeHeteroProcessors.c) and isn't complete. I might add more/get better structure into whenever I've time.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling";
    "PowerThrottlingOff" = 0; // PpmPerfQosGroupPolicyDisable 
```
