---
title: 'Explorer Options'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#explorer-options'
sidebar:
  order: 4
---

It changes every setting, which is shown in the `Folder Options` window. Some are personal preference, see suboptions bellow for customization.

![](https://github.com/nohuto/win-config/blob/main/visibility/images/explorer.png?raw=true)

---

Miscellaneous notes:
```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer": {
  "ShellState": { "Type": "REG_BINARY", "Data": "240000003e20000000000000000000000001000000130000000000000042000000" }
},
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CabinetState": {
  "Settings": { "Type": "REG_BINARY", "Data": "0c0002000a01000060000000" }
}
```

```json
  {
    "File": "WindowsConnectNow.admx",
    "CategoryName": "WCN_Category",
    "PolicyName": "WCN_DisableWcnUi_2",
    "NameSpace": "Microsoft.Policies.WindowsConnectNow",
    "Supported": "WindowsVista",
    "DisplayName": "Prohibit access of the Windows Connect Now wizards",
    "ExplainText": "This policy setting prohibits access to Windows Connect Now (WCN) wizards. If you enable this policy setting, the wizards are turned off and users have no access to any of the wizard tasks. All the configuration related tasks, including \"Set up a wireless router or access point\" and \"Add a wireless device\" are disabled. If you disable or do not configure this policy setting, users can access the wizard tasks, including \"Set up a wireless router or access point\" and \"Add a wireless device.\" The default for this policy setting allows users to access all WCN wizards.",
    "KeyPath": [
      "HKLM\\Software\\Policies\\Microsoft\\Windows\\WCN\\UI"
    ],
    "ValueName": "DisableWcnUi",
    "Elements": [
      { "Type": "EnabledValue", "Data": "1" },
      { "Type": "DisabledValue", "Data": "0" }
    ]
  },
```

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-admx-windowsconnectnow
