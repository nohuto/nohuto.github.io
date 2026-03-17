---
title: 'Sensors'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-sensors'
sidebar:
  order: 10
---

Blocks apps/system from using hardware sensors such as ambient light, orientation, and other motion/position sensors (features like adaptive brightness, auto rotation and sensor based behaviors will no longer work).

"This policy setting turns off the sensor feature for this computer. If you enable this policy setting, the sensor feature is turned off, and all programs on this computer can't use the sensor feature."

| Service | Description |
| ---- | ---- |
| `SensorDataService` | Delivers data from a variety of sensors |
| `SensrSvc` | Monitors various sensors in order to expose data and adapt to system and user state. If this service is stopped or disabled, the display brightness will not adapt to lighting conditions. Stopping this service may affect other system functionality and features as well. |
| `SensorService` | A service for sensors that manages different sensors' functionality. Manages Simple Device Orientation (SDO) and History for sensors. Loads the SDO sensor that reports device orientation changes. If this service is stopped or disabled, the SDO sensor will not be loaded and so auto-rotation will not occur. History collection from Sensors will also be stopped. |

No other [services](https://github.com/nohuto/win-config/blob/main/system/assets/services.txt)/[drivers](https://github.com/nohuto/win-config/blob/main/system/assets/drivers.txt) depend on these three services.

---

```json
{
  "File": "Sensors.admx",
  "CategoryName": "LocationAndSensors",
  "PolicyName": "DisableSensors_2",
  "NameSpace": "Microsoft.Policies.Sensors",
  "Supported": "Windows7",
  "DisplayName": "Turn off sensors",
  "ExplainText": "This policy setting turns off the sensor feature for this computer. If you enable this policy setting, the sensor feature is turned off, and all programs on this computer cannot use the sensor feature. If you disable or do not configure this policy setting, all programs on this computer can use the sensor feature.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors"
  ],
  "ValueName": "DisableSensors",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

---

Miscellaneous notes (ignore):
```
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\WinBio : RequireSecureSensors
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : CPU
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : ExternalResources
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : Flags
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : Importance
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : IO
\Registry\Machine\SYSTEM\ResourcePolicyStore\ResourceSets\PolicySets\LongRunningSensor : Memory
\Registry\Machine\SOFTWARE\Microsoft\Windows Defender\NIS\Consumers\IPS : DisableBmNetworkSensor
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\AutoRotation : SensorPresent
```
