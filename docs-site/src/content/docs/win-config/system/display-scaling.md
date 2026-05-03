---
title: 'Display Scaling'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 30
---

Changes the size of text, apps, and other items. Note that on laptops the default display scaling might not be `100%`. You can set a custom scaling size via `System > Display > Custom scaling`:

![](https://github.com/nohuto/win-config/blob/main/system/images/displayscaling.png?raw=true)

## SystemSettings Captures

```c
// 100%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 0
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 0

// 125%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 1
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 1

// 150%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 2
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 2

// 175%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 3
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 3

// 200%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 4
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 4

// 225%
SystemSettings.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 5
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\PerMonitorSettings\MONITORID\DpiValue	Type: REG_DWORD, Length: 4, Data: 5
```

## Suboption

`Prevent Window Minimization on Monitor Disconnection` disables `Minimize windows then a monitor is diconnected` (`System > Display`).

```c
// Enabled
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\MonitorRemovalRecalcBehavior	Type: REG_DWORD, Length: 4, Data: 0

// Disabled
SystemSettings.exe	RegSetValue	HKCU\Control Panel\Desktop\MonitorRemovalRecalcBehavior	Type: REG_DWORD, Length: 4, Data: 1
```
