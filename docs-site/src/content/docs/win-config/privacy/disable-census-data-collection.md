---
title: 'Census Data Collection'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 52
---

`DeviceCensus.exe` = "Device and configuration data collection tool"

"*In a nutshell, Device Census is a telemetry process from Microsoft. It will analyze the use of the webcam and other components. Then, the data will be transmitted anonymously to Microsoft to help optimize Windows for future versions and fix bugs. In addition, it only checks how often the devices are used and don't record anything.*" [[*]](https://www.partitionwizard.com/partitionmanager/devicecensus-exe.html)

## Scheduled Task Actions

`\Microsoft\Windows\Device Information` runs:
```powershell
%windir%\system32\devicecensus.exe SystemCxt
```

`\Microsoft\Windows\Device Information` runs:
```powershell
%windir%\system32\devicecensus.exe UserCxt
```
