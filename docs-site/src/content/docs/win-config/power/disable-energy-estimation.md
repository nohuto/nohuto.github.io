---
title: 'Energy Estimation'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-energy-estimation'
sidebar:
  order: 9
---

Not needed, if you disable energy estimation:
```json
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\EnergyEstimation\\TaggedEnergy": {
  "DisableTaggedEnergyLogging": { "Type": "REG_DWORD", "Data": 1 },
  "TelemetryMaxApplication": { "Type": "REG_DWORD", "Data": 0 },
  "TelemetryMaxTagPerApplication": { "Type": "REG_DWORD", "Data": 0 }
}
```
```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "UserBatteryDischargeEstimator" = 0; // PopDisableBatteryDischargeEstimator 
    "UserBatteryChargeEstimator" = 0; // PopUserBatteryChargingEstimator 
    "EnergyEstimationEnabled" = 1; // PopEnergyEstimationEnabled
                                    // If following HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\knobs\Power/Controls/EnergyEstimationEnabled, it should have a range of 0-4294967295
```

> https://www.noverse.dev/docs/win-config/power/power-values/#registry-values-details  
> [power/assets | energyesti-PtInitializeTelemetry.c](https://github.com/nohuto/win-config/blob/main/power/assets/energyesti-PtInitializeTelemetry.c)

![](https://github.com/nohuto/win-config/blob/main/power/images/energyesti.png?raw=true)

## Suboption

`Disable Battery Capacity Section` = Disables the battery capacity section on the battery saver page of the system settings app.
