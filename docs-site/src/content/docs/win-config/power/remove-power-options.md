---
title: 'Remove Power Options'
description: 'Power option documentation from win-config.'
editUrl: false
sidebar:
  order: 7
---

Removes the `Hibernate`, `Lock`, `Sleep` power options.

If hiding `Lock` for example via `Control Panel > All Control Panel Items > Power Options > Choose what the power buttons do > Change settings that are currently unavailable`, it sets:
```c
DllHost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FlyoutMenuSettings\ShowLockOption	Type: REG_DWORD, Length: 4, Data: 1
```

## Windows Policies

LGPE would set the values in `HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer`:
```json
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "ShowLockOption",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows8",
  "DisplayName": "Show lock in the user tile menu",
  "ExplainText": "Shows or hides lock from the user tile menu. If you enable this policy setting, the lock option will be shown in the User Tile menu. If you disable this policy setting, the lock option will never be shown in the User Tile menu. If you do not configure this policy setting, users will be able to choose whether they want lock to show through the Power Options Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "ShowLockOption",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "ShowSleepOption",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows8",
  "DisplayName": "Show sleep in the power options menu",
  "ExplainText": "Shows or hides sleep from the power options menu. If you enable this policy setting, the sleep option will be shown in the Power Options menu (as long as it is supported by the machine's hardware). If you disable this policy setting, the sleep option will never be shown in the Power Options menu. If you do not configure this policy setting, users will be able to choose whether they want sleep to show through the Power Options Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "ShowSleepOption",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "ShowHibernateOption",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows8",
  "DisplayName": "Show hibernate in the power options menu",
  "ExplainText": "Shows or hides hibernate from the power options menu. If you enable this policy setting, the hibernate option will be shown in the Power Options menu (as long as it is supported by the machine's hardware). If you disable this policy setting, the hibernate option will never be shown in the Power Options menu. If you do not configure this policy setting, users will be able to choose whether they want hibernate to show through the Power Options Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "ShowHibernateOption",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

---

Miscellaneous keys:
```powershell
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HidePowerButton
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideRestart
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideShutDown
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideSignOut
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideSwitchAccount
```
