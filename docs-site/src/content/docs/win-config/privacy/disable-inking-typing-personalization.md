---
title: 'Inking & Typing Personalization'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 26
---

Used for better suggestions by creating a custom dictionary using your typing history and handwriting patterns. Disables autocorrection of misspelled words, highlight of misspelled words, and typing insights - would use AI to suggest words, autocorrect spelling mistakes etc. (`Privacy & security > Inking & typing personalization` & `Time & Language > Typing`).

```
\Registry\Machine\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
\Registry\User\.Default\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
\Registry\User\S-ID\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
```

![](https://github.com/nohuto/win-config/blob/main/privacy/images/inking.png?raw=true)

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Globalization.admx",
  "CategoryName": "RegionalOptions",
  "PolicyName": "AllowInputPersonalization",
  "NameSpace": "Microsoft.Policies.Globalization",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow users to enable online speech recognition services",
  "ExplainText": "This policy specifies whether users on the device have the option to enable online speech recognition services. If this policy is enabled or not configured, control is deferred to users, and users may choose whether to enable speech services via settings. If this policy is disabled, speech services will be disabled, and users cannot enable speech services via settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\InputPersonalization"
  ],
  "ValueName": "AllowInputPersonalization",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "TextInput.admx",
  "CategoryName": "TextInput",
  "PolicyName": "AllowLinguisticDataCollection",
  "NameSpace": "Microsoft.Policies.TextInput",
  "Supported": "Windows_10_0_RS4 - At least Windows Server 2016, Windows 10 Version 1803",
  "DisplayName": "Improve inking and typing recognition",
  "ExplainText": "This policy setting controls the ability to send inking and typing data to Microsoft to improve the language recognition and suggestion capabilities of apps and services running on Windows.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\TextInput"
  ],
  "ValueName": "AllowLinguisticDataCollection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsInkWorkspace.admx",
  "CategoryName": "WindowsInkWorkspace",
  "PolicyName": "AllowWindowsInkWorkspace",
  "NameSpace": "Microsoft.Policies.WindowsInkWorkspace",
  "Supported": "WIN10_RS1 - At least Windows 10 Redstone",
  "DisplayName": "Allow Windows Ink Workspace",
  "ExplainText": "Allow Windows Ink Workspace",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\WindowsInkWorkspace"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowWindowsInkWorkspace", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "On, but disallow access above lock", "Data": "1" },
        { "DisplayName": "On", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "WindowsInkWorkspace.admx",
  "CategoryName": "WindowsInkWorkspace",
  "PolicyName": "AllowSuggestedAppsInWindowsInkWorkspace",
  "NameSpace": "Microsoft.Policies.WindowsInkWorkspace",
  "Supported": "WIN10_RS1 - At least Windows 10 Redstone",
  "DisplayName": "Allow suggested apps in Windows Ink Workspace",
  "ExplainText": "Allow suggested apps in Windows Ink Workspace",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\WindowsInkWorkspace"
  ],
  "ValueName": "AllowSuggestedAppsInWindowsInkWorkspace",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
