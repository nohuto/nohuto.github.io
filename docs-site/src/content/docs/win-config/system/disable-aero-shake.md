---
title: 'Aero Shake'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-aero-shake'
sidebar:
  order: 19
---

Prevents windows from being minimized or restored when the active window is shaken back and forth with the mouse.

![](https://www.techjunkie.com/wp-content/uploads/2018/10/windows-aero-shake-example.gif)

```json
{
  "File": "Desktop.admx",
  "CategoryName": "Desktop",
  "PolicyName": "NoWindowMinimizingShortcuts",
  "NameSpace": "Microsoft.Policies.WindowsDesktop",
  "Supported": "Windows7",
  "DisplayName": "Turn off Aero Shake window minimizing mouse gesture",
  "ExplainText": "Prevents windows from being minimized or restored when the active window is shaken back and forth with the mouse. If you enable this policy, application windows will not be minimized or restored when the active window is shaken back and forth with the mouse. If you disable or do not configure this policy, this window minimizing and restoring gesture will apply.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "NoWindowMinimizingShortcuts",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
