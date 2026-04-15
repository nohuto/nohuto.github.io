---
title: 'App Archive'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#app-archive'
sidebar:
  order: 35
---

"Automatically archive your infrequently used apps to save storage and internet bandwidth. Your files and data will still be saved, and the app's full version will be restored on your next use if it's still available."

If enabled, the system will periodically check for such infrequently used apps. By default app archiving is turned on.

## SystemSettings Records

Toggling the option via `Apps > Advanced app settings`:
```c
// On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\InstallService\Stubification\S-{ID}\EnableAppOffloading    Type: REG_DWORD, Length: 4, Data: 1

// Off
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\InstallService\Stubification\S-{ID}\EnableAppOffloading    Type: REG_DWORD, Length: 4, Data: 0
```

## Windows Policies

```json
{
  "File": "AppxPackageManager.admx",
  "CategoryName": "AppxDeployment",
  "PolicyName": "AllowAutomaticAppArchiving",
  "NameSpace": "Microsoft.Policies.Appx",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Archive infrequently used apps",
  "ExplainText": "This policy setting controls whether the system can archive infrequently used apps. If you enable this policy setting, then the system will periodically check for and archive infrequently used apps. If you disable this policy setting, then the system will not archive any apps. If you do not configure this policy setting (default), then the system will follow default behavior, which is to periodically check for and archive infrequently used apps, and the user will be able to configure this setting themselves.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Appx"
  ],
  "ValueName": "AllowAutomaticAppArchiving",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
