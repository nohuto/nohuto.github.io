---
title: 'Opt-Out KMS Activation Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#opt-out-kms-activation-telemetry'
sidebar:
  order: 47
---

Friendly name: `Turn off KMS Client Online AVS Validation`

"This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state.

If you disable or don't configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates."

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-licensing#disallowkmsclientonlineavsvalidation

`Disable Auto Activation` (MAK and KMS host but not KMS client) prevents windows from whether it's actived or not.

> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn502532(v=ws.11)

## Windows Policies

```json
{
  "File": "AVSValidationGP.admx",
  "CategoryName": "SoftwareProtectionPlatform",
  "PolicyName": "NoAcquireGT",
  "NameSpace": "Microsoft.Policies.SoftwareProtectionPlatform",
  "Supported": "Windows_10_0",
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
},
```

For Windows Server 2016 it can be disabled via:
```json
"HKLM\\Software\\Policies\\Microsoft\\Windows NT\\CurrentVersion\\Software Protection Platform": {
  "NoAcquireGT": { "Type": "REG_DWORD", "Data": 1 }
}
```

"Due to a known issue the Turn off KMS Client Online AVS Validation group policy does not work as intended on Windows Server 2016; the NoAcquireGT value needs to be set instead. The Windows activation status will be valid for a rolling period of 180 days with weekly activation status checks to the KMS."

> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#19-software-protection-platform
