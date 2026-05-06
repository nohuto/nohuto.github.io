---
title: 'Location Access'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 17
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

---

There's also a value named `CSEnable` which I found in `srms.dat`, it doesn't seem to exist anymore.
```html
<!-- Help improve Microsoft services by sending some location data when you use location-aware apps -->
<pattern type="Registry">HKLM\Software\Microsoft\Sensors\LocationProvider [CSEnable]</pattern>
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessLocation",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access location",
  "ExplainText": "This policy setting specifies whether Windows apps can access location. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access location by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access location and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access location and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access location by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessLocation", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "LocationProviderAdm.admx",
  "CategoryName": "WindowsLocationProvider",
  "PolicyName": "DisableWindowsLocationProvider_1",
  "NameSpace": "Microsoft.Policies.Sensors.WindowsLocationProvider",
  "Supported": "Windows8_Or_Windows_6_3_Only - Windows Server 2012, Windows 8, Windows RT, Windows Server 2012 R2, Windows 8.1 or Windows RT 8.1 only",
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
{
  "File": "Sensors.admx",
  "CategoryName": "LocationAndSensors",
  "PolicyName": "DisableSensors_2",
  "NameSpace": "Microsoft.Policies.Sensors",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
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
{
  "File": "Sensors.admx",
  "CategoryName": "LocationAndSensors",
  "PolicyName": "DisableLocation_2",
  "NameSpace": "Microsoft.Policies.Sensors",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
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
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
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
}
```
