---
title: 'Taskbar Settings'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#taskbar-settings'
sidebar:
  order: 14
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

```json
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
},
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
```
