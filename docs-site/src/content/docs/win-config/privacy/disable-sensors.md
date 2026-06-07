---
title: 'Sensors'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

Blocks apps/system from using hardware sensors such as ambient light, orientation, and other motion/position sensors (features like adaptive brightness, auto rotation and sensor based behaviors will no longer work).

"This policy setting turns off the sensor feature for this computer. If you enable this policy setting, the sensor feature is turned off, and all programs on this computer can't use the sensor feature."

| Service | Description |
| ---- | ---- |
| `SensorDataService` | Delivers data from a variety of sensors |
| `SensrSvc` | Monitors various sensors in order to expose data and adapt to system and user state. If this service is stopped or disabled, the display brightness will not adapt to lighting conditions. Stopping this service may affect other system functionality and features as well. |
| `SensorService` | A service for sensors that manages different sensors' functionality. Manages Simple Device Orientation (SDO) and History for sensors. Loads the SDO sensor that reports device orientation changes. If this service is stopped or disabled, the SDO sensor will not be loaded and so auto-rotation will not occur. History collection from Sensors will also be stopped. |

No other [services](https://github.com/nohuto/win-config/blob/main/system/assets/services.txt)/[drivers](https://github.com/nohuto/win-config/blob/main/system/assets/drivers.txt) depend on these three services.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off sensors](https://noverse.dev/policies?p=Sensors*DisableSensors_2) | `HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors` | `DisableSensors` |
