---
title: 'Alt-Tab App Tabs'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#alt-tab-app-tabs'
sidebar:
  order: 22
---

Select the amount of recent tabs from apps in the alt+tab menu.

### Don't show tabs

![](https://github.com/nohuto/win-config/blob/main/visibility/images/0tabs.png?raw=true)

### 3 Tabs

![](https://github.com/nohuto/win-config/blob/main/visibility/images/3tabs.png?raw=true)

### 5 Tabs

![](https://github.com/nohuto/win-config/blob/main/visibility/images/5tabs.png?raw=true)

### 20 Tabs

![](https://github.com/nohuto/win-config/blob/main/visibility/images/20tabs.png?raw=true)

## Windows Policies

```json
{
  "File": "Multitasking.admx",
  "CategoryName": "MULTITASKING",
  "PolicyName": "BrowserAltTabBlowout",
  "NameSpace": "Microsoft.Policies.Multitasking",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Configure the inclusion of app tabs into Alt-Tab",
  "ExplainText": "This setting controls the inclusion of app tabs into Alt+Tab. This can be set to show the most recent 3, 5 or 20 tabs, or no tabs from apps. If this is set to show \"Open windows only\", the whole feature will be disabled.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "MultiTaskingAltTabFilter", "Items": [
        { "DisplayName": "Open windows and 20 most recent tabs in apps", "Data": "1" },
        { "DisplayName": "Open windows and 5 most recent tabs in apps", "Data": "2" },
        { "DisplayName": "Open windows and 3 most recent tabs in apps", "Data": "3" },
        { "DisplayName": "Open windows only", "Data": "4" }
      ]
    }
  ]
},
```

The option changes it via `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced`.

## Classic Task Switcher

Restarting the explorer is enough to apply the changes.

### New

![](https://github.com/nohuto/win-config/blob/main/visibility/images/taskswitchnew.png?raw=true)

### Classic

![](https://github.com/nohuto/win-config/blob/main/visibility/images/taskswitchold.png?raw=true)
