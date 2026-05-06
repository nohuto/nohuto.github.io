---
title: 'Windows Insider'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 19
---

> "*The Windows Insider Preview program lets you help shape the future of Windows, be part of the community, and get early access to releases of Windows 10 and Windows 11. Windows Insider Preview builds only apply to Windows 10 and Windows 11 and aren't available for Windows Server 2016.*"
>
> — Microsoft, [Manage connections from Windows operating system components to Microsoft services](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services)

`AllowBuildPreview` is used up to V1703, I'll still leave it. `Computer Configuration > Administrative Templates > Windows Component > Windows Update > Windows Update for Business : Manage Preview Builds` for W10+ versions.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "AllowBuildPreview.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "AllowBuildPreview",
  "NameSpace": "Microsoft.Policies.AllowBuildPreview",
  "Supported": "Windows_10_0_UP_TO_RS2 - Windows Server 2016, Windows 10 up to Version 1703",
  "DisplayName": "Toggle user control over Insider builds",
  "ExplainText": "This policy setting determines whether users can get preview builds of Windows, by configuring controls in Settings > Update and security > Windows Insider Program. If you enable or do not configure this policy setting, users can download and install preview builds of Windows by configuring Windows Insider Program settings. If you disable this policy setting, Windows Insider Program settings will be unavailable to users through the Settings app. This policy is only supported up to Windows 10, Version 1703. Please use 'Manage preview builds' under 'Windows Update for Business' for newer Windows 10 versions.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\PreviewBuilds"
  ],
  "ValueName": "AllowBuildPreview",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
