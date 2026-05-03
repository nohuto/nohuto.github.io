---
title: 'File History'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 30
---

"File History automatically backs up versions of files in your user folders (Documents, Music, Pictures, Videos, Desktop) and offline OneDrive. It tracks changes via the NTFS change journal (fast, low overhead) and saves only changed files. You must choose a backup target (external drive or network share). If that target is unavailable, it caches copies locally and syncs them when the target returns. You can browse and restore any version or recover lost/deleted files."

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "FileHistory.admx",
  "CategoryName": "FileHistory",
  "PolicyName": "DisableFileHistory",
  "NameSpace": "Microsoft.Policies.FileHistory",
  "Supported": "Windows8",
  "DisplayName": "Turn off File History",
  "ExplainText": "This policy setting allows you to turn off File History. If you enable this policy setting, File History cannot be activated to create regular, automatic backups. If you disable or do not configure this policy setting, File History can be activated to create regular, automatic backups.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\FileHistory"
  ],
  "ValueName": "Disabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
