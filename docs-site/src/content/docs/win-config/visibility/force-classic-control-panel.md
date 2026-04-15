---
title: 'Force Classic Control Panel'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#force-classic-control-panel'
sidebar:
  order: 32
---

"This policy setting controls the default Control Panel view, whether by category or icons. If this policy setting is enabled, the Control Panel opens to the icon view. If this policy setting is disabled, the Control Panel opens to the category view."

#### Icon View

![](https://github.com/nohuto/win-config/blob/main/visibility/images/panel0.png?raw=true)

#### Category View

![](https://github.com/nohuto/win-config/blob/main/visibility/images/panel1.png?raw=true)

## Windows Policies

```json
{
  "File": "ControlPanel.admx",
  "CategoryName": "ControlPanel",
  "PolicyName": "ForceClassicControlPanel",
  "NameSpace": "Microsoft.Policies.ControlPanel",
  "Supported": "WindowsXP",
  "DisplayName": "Always open All Control Panel Items when opening Control Panel",
  "ExplainText": "This policy setting controls the default Control Panel view, whether by category or icons. If this policy setting is enabled, the Control Panel opens to the icon view. If this policy setting is disabled, the Control Panel opens to the category view. If this policy setting is not configured, the Control Panel opens to the view used in the last Control Panel session. Note: Icon size is dependent upon what the user has set it to in the previous session.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "ForceClassicControlPanel",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
