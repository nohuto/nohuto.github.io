---
title: 'Dynamic Lock'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 21
---

Automatically locks your device when you're away. It requires Bluetooth to be active. This option is disabled by default.

### Accounts Captures

Toggling it via `Accounts > Sign-in options`:
```c
// Enabled
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\EnableGoodbye	Type: REG_DWORD, Length: 4, Data: 1

// Disabled (default)
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\EnableGoodbye	Type: REG_DWORD, Length: 4, Data: 0
```

## Windows Policies

```json
{
  "File": "Passport.admx",
  "CategoryName": "MSPassportForWorkCategory",
  "PolicyName": "MSPassport_UseDynamicLock",
  "NameSpace": "Microsoft.Policies.MicrosoftPassportForWork",
  "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
  "DisplayName": "Configure dynamic lock factors",
  "ExplainText": "Configure a comma separated list of signal rules in the form of xml for each signal type. If you enable this policy setting, these signal rules will be evaluated to detect user absence and automatically lock the device. If you disable or do not configure this policy setting, users can continue to lock with existing locking options. For more information see: https://go.microsoft.com/fwlink/?linkid=849684",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\PassportForWork\\DynamicLock"
  ],
  "ValueName": "DynamicLock",
  "Elements": [
    { "Type": "Text", "ValueName": "Plugins" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
