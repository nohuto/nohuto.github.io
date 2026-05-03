---
title: 'Cortana'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 34
---

"[Cortana](https://en.wikipedia.org/wiki/Cortana_(virtual_assistant)) was a virtual assistant developed by Microsoft that used the Bing search engine to perform tasks such as setting reminders and answering questions for users."

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AllowCloudSearch",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Cloud Search",
  "ExplainText": "Allow search and Cortana to search cloud sources like OneDrive and SharePoint",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowCloudSearch", "Items": [
        { "DisplayName": "Disable Cloud Search", "Data": "0" },
        { "DisplayName": "Enable Cloud Search", "Data": "1" },
        { "DisplayName": "User Selected", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AllowCortanaInAAD",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Cortana Page in OOBE on an AAD account",
  "ExplainText": "Allow the cortana opt-in page during windows setup out of the box experience",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search\\AllowCortanaInAAD"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowCortanaInAADPathOOBE", "Items": [
        { "DisplayName": "Disable Cortana Page in AAD", "Data": "0" },
        { "DisplayName": "Enable Cortana Page in AAD", "Data": "1" }
      ]
    }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AllowCortana",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Cortana",
  "ExplainText": "This policy setting specifies whether Cortana is allowed on the device. If you enable or don't configure this setting, Cortana will be allowed on the device. If you disable this setting, Cortana will be turned off. When Cortana is off, users will still be able to use search to find things on the device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "AllowCortana",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AllowCortanaAboveLock",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Cortana above lock screen",
  "ExplainText": "This policy setting determines whether or not the user can interact with Cortana using speech while the system is locked. If you enable or don\u2019t configure this setting, the user can interact with Cortana using speech while the system is locked. If you disable this setting, the system will need to be unlocked for the user to interact with Cortana using speech.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "AllowCortanaAboveLock",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AllowSearchToUseLocation",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow search and Cortana to use location",
  "ExplainText": "This policy setting specifies whether search and Cortana can provide location aware search and Cortana results. If this is enabled, search and Cortana can access location information.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "AllowSearchToUseLocation",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```

## Miscellaneous Notes
```c
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\DevOverrideOneSettings","Length: 16"
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\IsAvailable","Type: REG_DWORD, Length: 4, Data: 1"
```
