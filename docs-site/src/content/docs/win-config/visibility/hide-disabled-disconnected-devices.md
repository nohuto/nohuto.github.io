---
title: 'Hide Disabled/Disconnected Devices'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#hide-disableddisconnected-devices'
sidebar:
  order: 31
---

Hides disabled/disconnected devices in the `mmsys.cpl` window.

![](https://github.com/nohuto/win-config/blob/main/visibility/images/hidedevices.png?raw=true)

```c
// Show disabled/disconnected devices
rundll32.exe	RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\DeviceCpl\ShowHiddenDevices	Type: REG_DWORD, Length: 4, Data: 1
rundll32.exe	RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\DeviceCpl\ShowDisconnectedDevices	Type: REG_DWORD, Length: 4, Data: 1

// Hide disabled/diconnected devices
rundll32.exe	RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\DeviceCpl\ShowHiddenDevices	Type: REG_DWORD, Length: 4, Data: 0
rundll32.exe	RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\DeviceCpl\ShowDisconnectedDevices	Type: REG_DWORD, Length: 4, Data: 0
```
