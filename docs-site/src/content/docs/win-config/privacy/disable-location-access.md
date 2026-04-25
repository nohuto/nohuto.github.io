---
title: 'Location Access'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 10
---

Disables app access to your location, locating your system will be disabled, geolocation service gets disabled.

`Privacy & security` > `Location`:
```powershell
"Process Name","Operation","Path","Detail"
"svchost.exe","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location\NonPackaged\Value","Type: REG_SZ, Length: 10, Data: Deny"
"svchost.exe","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location\Value","Type: REG_SZ, Length: 10, Data: Deny"
"svchost.exe","RegSetValue","HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location\Value","Type: REG_SZ, Length: 10, Data: Deny"
"svchost.exe","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location\ShowGlobalPrompts","Type: REG_DWORD, Length: 4, Data: 1"
```

- [privacy/assets | locationaccess-LocationApi.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/locationaccess-LocationApi.c)

## Windows Policies

```json
{
  "File": "Sensors.admx",
  "CategoryName": "LocationAndSensors",
  "PolicyName": "DisableLocation_2",
  "NameSpace": "Microsoft.Policies.Sensors",
  "Supported": "Windows7",
  "DisplayName": "Turn off location",
  "ExplainText": "This policy setting turns off the location feature for this computer. If you enable this policy setting, the location feature is turned off, and all programs on this computer are prevented from using location information from the location feature. If you disable or do not configure this policy setting, all programs on this computer will not be prevented from using location information from the location feature.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors"
  ],
  "ValueName": "DisableLocation",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Sensors.admx",
  "CategoryName": "LocationAndSensors",
  "PolicyName": "DisableLocationScripting_2",
  "NameSpace": "Microsoft.Policies.Sensors",
  "Supported": "Windows7",
  "DisplayName": "Turn off location scripting",
  "ExplainText": "This policy setting turns off scripting for the location feature. If you enable this policy setting, scripts for the location feature will not run. If you disable or do not configure this policy setting, all location scripts will run.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors"
  ],
  "ValueName": "DisableLocationScripting",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "LocationProviderAdm.admx",
  "CategoryName": "WindowsLocationProvider",
  "PolicyName": "DisableWindowsLocationProvider_1",
  "NameSpace": "Microsoft.Policies.Sensors.WindowsLocationProvider",
  "Supported": "Windows8_Or_Windows_6_3_Only",
  "DisplayName": "Turn off Windows Location Provider",
  "ExplainText": "This policy setting turns off the Windows Location Provider feature for this computer. If you enable this policy setting, the Windows Location Provider feature will be turned off, and all programs on this computer will not be able to use the Windows Location Provider feature. If you disable or do not configure this policy setting, all programs on this computer can use the Windows Location Provider feature.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors"
  ],
  "ValueName": "DisableWindowsLocationProvider",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
