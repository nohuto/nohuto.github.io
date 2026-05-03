---
title: 'Mobility Center'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 36
---

Note that this is a laptop only feature. The "Mobility Center" is a feature that includes controls for screen brightness, power options, volume, battery status, wireless network status, external display settings, and more.

![](https://github.com/nohuto/win-config/blob/main/system/images/mobility-center.png?raw=true)

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "MobilePCMobilityCenter.admx",
  "CategoryName": "MobilityCenterCat",
  "PolicyName": "MobilityCenterEnable_2",
  "NameSpace": "Microsoft.Policies.MobilePCMobilityCenter",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Turn off Windows Mobility Center",
  "ExplainText": "This policy setting turns off Windows Mobility Center. If you enable this policy setting, the user is unable to invoke Windows Mobility Center. The Windows Mobility Center UI is removed from all shell entry points and the .exe file does not launch it. If you disable this policy setting, the user is able to invoke Windows Mobility Center and the .exe file launches it. If you do not configure this policy setting, Windows Mobility Center is on by default.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\MobilityCenter"
  ],
  "ValueName": "NoMobilityCenter",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

### Miscellaneous Values

```c
"HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility\LastResumeOnPCInteractionTime","Length: 20"
"HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility\LastResumeOnPCTime","Length: 20"
"HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility\OptedIn","Length: 16"
```
