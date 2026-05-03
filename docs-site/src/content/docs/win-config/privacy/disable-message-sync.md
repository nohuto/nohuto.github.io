---
title: 'Message Sync'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 43
---

"This policy setting allows backup and restore of cellular text messages to Microsoft's cloud services. Disable this feature to avoid information being stored on servers outside of your organization's control."

| Policy | Description | Values |
| ------ | ------ | ------ |
| AllowMessageSync | Controls whether SMS/MMS are synced to Microsoft's cloud so they can be backed up and restored; also decides if the user can toggle this in the UI. | 0 = sync not allowed, user cannot change - 1 = sync allowed, user can change (default) |

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "messaging.admx",
  "CategoryName": "Messaging_Category",
  "PolicyName": "AllowMessageSync",
  "NameSpace": "Microsoft.Policies.Messaging",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Allow Message Service Cloud Sync",
  "ExplainText": "This policy setting allows backup and restore of cellular text messages to Microsoft's cloud services.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Messaging"
  ],
  "ValueName": "AllowMessageSync",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
