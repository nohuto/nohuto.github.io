---
title: 'OneSettings Download'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 53
---

Services Configuration is used by Windows components and apps, such as the telemetry service, to dynamically update their configuration. If you turn off this service, apps using this service may stop working.

If enabled = "Windows will periodically attempt to connect with the OneSettings service to download configuration settings".

> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#31-services-configuration

## Windows Policies

```json
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "EnableOneSettingsAuditing",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Enable OneSettings Auditing",
  "ExplainText": "This policy setting controls whether Windows records attempts to connect with the OneSettings service to the EventLog. If you enable this policy, Windows will record attempts to connect with the OneSettings service to the Microsoft\\Windows\\Privacy-Auditing\\Operational EventLog channel. If you disable or don't configure this policy setting, Windows will not record attempts to connect with the OneSettings service to the EventLog.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "EnableOneSettingsAuditing",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DisableOneSettingsDownloads",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Disable OneSettings Downloads",
  "ExplainText": "This policy setting controls whether Windows attempts to connect with the OneSettings service. If you enable this policy, Windows will not attempt to connect with the OneSettings Service. If you disable or don't configure this policy setting, Windows will periodically attempt to connect with the OneSettings service to download configuration settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableOneSettingsDownloads",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
