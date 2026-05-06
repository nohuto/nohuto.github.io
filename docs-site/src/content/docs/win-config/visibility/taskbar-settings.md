---
title: 'Taskbar Settings'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 9
---

Removes the search box, moves the taskbar to the left, removes badges, disables the flashes on the app icons, removes the "Task View" button. (`Personalization > Taskbar`)

`TaskbarSd` adds/removes the block in the right corner, which shows the desktop (picture).

![](https://github.com/nohuto/win-config/blob/main/visibility/images/taskbar.png?raw=true)

```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced": {
  "TaskbarDa": { "Type": "REG_DWORD", "Data": 0, "Elevated": true },
```
I removed the value since you can't apply it even with `TrustedInstaller`/`SYSTEM` previledges. Note that the value is still actively used by `SystemSettings`:
```c
// Personalization > Taskbar - Widgets (off)
SystemSettings.exe	HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\TaskbarDa	Type: REG_DWORD, Length: 4, Data: 0
```
Disallowing it via the `AllowNewsAndInterests` policy won't set `TaskbarDa` to 0, but it grays out & disables the option.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "NewsAndInterests.admx",
  "CategoryName": "NewsAndInterests",
  "PolicyName": "AllowNewsAndInterests",
  "NameSpace": "Microsoft.Policies.NewsAndInterests",
  "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
  "DisplayName": "Allow widgets",
  "ExplainText": "This policy specifies whether the widgets feature is allowed on the device. Widgets will be turned on by default unless you change this in your settings. If you turned this feature on before, it will stay on automatically unless you turn it off.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh"
  ],
  "ValueName": "AllowNewsAndInterests",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "NewsAndInterests.admx",
  "CategoryName": "NewsAndInterests",
  "PolicyName": "DisableWidgetsOnLockScreen",
  "NameSpace": "Microsoft.Policies.NewsAndInterests",
  "Supported": "Windows_11_0_22H2_NOSERVER - At least Windows 11 Version 22H2",
  "DisplayName": "Disable Widgets On Lock Screen",
  "ExplainText": "This policy specifies whether to disable the Widgets feature on the lock screen. If you disable or do not configure this policy setting, widgets will appear on the lock screen and can be managed in the Windows Settings app. If you enable this policy setting, widgets will not appear on the lock screen.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh"
  ],
  "ValueName": "DisableWidgetsOnLockScreen",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "NewsAndInterests.admx",
  "CategoryName": "NewsAndInterests",
  "PolicyName": "DisableWidgetsBoard",
  "NameSpace": "Microsoft.Policies.NewsAndInterests",
  "Supported": "Windows_11_0_22H2_NOSERVER - At least Windows 11 Version 22H2",
  "DisplayName": "Disable Widgets Board",
  "ExplainText": "This policy specifies whether to disable the Widgets Board experience. If you disable or do not configure this policy setting, you will be able to invoke the Widgets Board and see its entry point on the taskbar. The Widgets Board experience can be managed in Widgets Settings whose entry-point is located on the Widgets Board. If you enable this policy setting, you will not be able to invoke the Widgets board and its entry point will no longer appear on the taskbar.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh"
  ],
  "ValueName": "DisableWidgetsBoard",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "HidePeopleBar",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows_10_0_RS2 - At least Windows Server 2016, Windows 10 Version 1703",
  "DisplayName": "Remove the People Bar from the taskbar",
  "ExplainText": "This policy allows you to remove the People Bar from the taskbar and disables the My People experience. If you enable this policy the people icon will be removed from the taskbar, the corresponding settings toggle is removed from the taskbar settings page, and users will not be able to pin people to the taskbar.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "HidePeopleBar",
  "Elements": []
}
```
