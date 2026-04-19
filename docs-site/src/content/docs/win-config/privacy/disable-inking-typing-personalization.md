---
title: 'Inking & Typing Personalization'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 19
---

Used for better suggestions by creating a custom dictionary using your typing history and handwriting patterns. Disables autocorrection of misspelled words, highlight of misspelled words, and typing insights - would use AI to suggest words, autocorrect spelling mistakes etc. (`Privacy & security > Inking & typing personalization` & `Time & Language > Typing`).

```
\Registry\Machine\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
\Registry\User\.Default\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
\Registry\User\S-ID\SOFTWARE\Microsoft\INPUT\TIPC : Enabled
```

![](https://github.com/nohuto/win-config/blob/main/privacy/images/inking.png?raw=true)

## Windows Policies

```json
{
  "File": "TextInput.admx",
  "CategoryName": "TextInput",
  "PolicyName": "AllowLinguisticDataCollection",
  "NameSpace": "Microsoft.Policies.TextInput",
  "Supported": "Windows_10_0_RS4",
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
  "PolicyName": "AllowSuggestedAppsInWindowsInkWorkspace",
  "NameSpace": "Microsoft.Policies.WindowsInkWorkspace",
  "Supported": "WIN10_RS1",
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
},
{
  "File": "WindowsInkWorkspace.admx",
  "CategoryName": "WindowsInkWorkspace",
  "PolicyName": "AllowWindowsInkWorkspace",
  "NameSpace": "Microsoft.Policies.WindowsInkWorkspace",
  "Supported": "WIN10_RS1",
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
```
