---
title: 'Opt-Out KMS Activation Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 45
---

Friendly name: `Turn off KMS Client Online AVS Validation`

"This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state.

If you disable or don't configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates."

[`Disable Auto Activation`](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn502532(v=ws.11)#registry-settings) (MAK and KMS host but not KMS client) prevents windows from whether it's actived or not.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "AVSValidationGP.admx",
  "CategoryName": "SoftwareProtectionPlatform",
  "PolicyName": "NoAcquireGT",
  "NameSpace": "Microsoft.Policies.SoftwareProtectionPlatform",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Turn off KMS Client Online AVS Validation",
  "ExplainText": "This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state. If you disable or do not configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates. Policy Options: - Not Configured (default -- data will be automatically sent to Microsoft) - Disabled (data will be automatically sent to Microsoft) - Enabled (data will not be sent to Microsoft)",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\CurrentVersion\\Software Protection Platform"
  ],
  "ValueName": "NoGenTicket",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
