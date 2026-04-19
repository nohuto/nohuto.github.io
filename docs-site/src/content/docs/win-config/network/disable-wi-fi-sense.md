---
title: 'Wi-Fi Sense'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 13
---

Beginning with Windows 10, version 1803, Wi-Fi Sense is no longer available. The following section only applies to Windows 10, version 1709 and prior.

Wi-Fi Sense is enabled by default and, when you're signed in with a Microsoft account, can share Wi-Fi access (password stays encrypted in MS servers) with your Outlook and Skype contacts, Facebook contacts can be added. When you join a new network, it asks whether to share it. Networks you used before the upgrade won't trigger the prompt.

> https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/configure-wifi-sense-and-paid-wifi-service  
> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#23-wi-fi-sense

## Windows Policies

```json
{
  "File": "wlansvc.admx",
  "CategoryName": "WlanSettings_Category",
  "PolicyName": "WiFiSense",
  "NameSpace": "Microsoft.Policies.WlanSvc",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Allow Windows to automatically connect to suggested open hotspots, to networks shared by contacts, and to hotspots offering paid services",
  "ExplainText": "This policy setting determines whether users can enable the following WLAN settings: \"Connect to suggested open hotspots,\" \"Connect to networks shared by my contacts,\" and \"Enable paid services\". \"Connect to suggested open hotspots\" enables Windows to automatically connect users to open hotspots it knows about by crowdsourcing networks that other people using Windows have connected to. \"Connect to networks shared by my contacts\" enables Windows to automatically connect to networks that the user's contacts have shared with them, and enables users on this device to share networks with their contacts. \"Enable paid services\" enables Windows to temporarily connect to open hotspots to determine if paid services are available. If this policy setting is disabled, both \"Connect to suggested open hotspots,\" \"Connect to networks shared by my contacts,\" and \"Enable paid services\" will be turned off and users on this device will be prevented from enabling them. If this policy setting is not configured or is enabled, users can choose to enable or disable either \"Connect to suggested open hotspots\" or \"Connect to networks shared by my contacts\".",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\wcmsvc\\wifinetworkmanager\\config"
  ],
  "ValueName": "AutoConnectAllowedOEM",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
