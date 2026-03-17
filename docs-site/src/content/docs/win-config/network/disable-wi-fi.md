---
title: 'Wi-Fi'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#disable-wi-fi'
sidebar:
  order: 6
---

Disables Wi-Fi services/drivers, scheduled tasks.

| Service/Driver | Description |
| --- | --- |
| `WlanSvc` | The WLANSVC service provides the logic required to configure, discover, connect to, and disconnect from a wireless local area network (WLAN) as defined by IEEE 802.11 standards. It also contains the logic to turn your computer into a software access point so that other devices or computers can connect to your computer wirelessly using a WLAN adapter that can support this. Stopping or disabling the WLANSVC service will make all WLAN adapters on your computer inaccessible from the Windows networking UI. It is strongly recommended that you have the WLANSVC service running if your computer has a WLAN adapter. |
| `vwififlt` | Virtual WiFi Filter Driver |
| `WwanSvc` | This service manages mobile broadband (GSM & CDMA) data card/embedded module adapters and connections by auto-configuring the networks. It is strongly recommended that this service be kept running for best user experience of mobile broadband devices. |

---

```c
"\\Microsoft\\Windows\\WCM\\WiFiTask" // %WINDIR%\System32\WiFiTask.exe
"\\Microsoft\\Windows\\WwanSvc\\NotificationTask" // %WINDIR%\System32\WiFiTask.exe wwan
```
