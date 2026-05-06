---
title: 'Explorer Options'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

It changes every setting, which is shown in the `Folder Options` window. Some are personal preference, see suboptions bellow for customization.

![](https://github.com/nohuto/win-config/blob/main/visibility/images/explorer.png?raw=true)

## Miscellaneous Notes

```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer": {
  "ShellState": { "Type": "REG_BINARY", "Data": "240000003e20000000000000000000000001000000130000000000000042000000" }
},
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CabinetState": {
  "Settings": { "Type": "REG_BINARY", "Data": "0c0002000a01000060000000" }
}
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Desktop.admx",
  "CategoryName": "Desktop",
  "PolicyName": "NoDesktop",
  "NameSpace": "Microsoft.Policies.WindowsDesktop",
  "Supported": "Win2k - At least Windows 2000",
  "DisplayName": "Hide and disable all items on the desktop",
  "ExplainText": "Removes icons, shortcuts, and other default and user-defined items from the desktop, including Briefcase, Recycle Bin, Computer, and Network Locations. Removing icons and shortcuts does not prevent the user from using another method to start the programs or opening the items they represent. Also, see \"Items displayed in Places Bar\" in User Configuration\\Administrative Templates\\Windows Components\\Common Open File Dialog to remove the Desktop icon from the Places Bar. This will help prevent users from saving data to the Desktop.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoDesktop",
  "Elements": []
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "NoRecentDocsHistory",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Win2k - At least Windows 2000",
  "DisplayName": "Do not keep history of recently opened documents",
  "ExplainText": "Prevents the operating system and installed programs from creating and displaying shortcuts to recently opened documents. If you enable this setting, the system and Windows programs do not create shortcuts to documents opened while the setting is in effect. Also, they retain but do not display existing document shortcuts. The system empties the Recent Items menu on the Start menu, and Windows programs do not display shortcuts at the bottom of the File menu. In addition, the Jump Lists off of programs in the Start Menu and Taskbar do not show lists of recently or frequently used files, folders, or websites. If you disable or do not configure this setting, the system will store and display shortcuts to recently and frequently used files, folders, and websites. Note: The system saves document shortcuts in the user profile in the System-drive\\Users\\User-name\\Recent folder. Also, see the \"Remove Recent Items menu from Start Menu\" and \"Clear history of recently opened documents on exit\" policies in this folder. If you enable this setting but do not enable the \"Remove Recent Items menu from Start Menu\" setting, the Recent Items menu appears on the Start menu, but it is empty. If you enable this setting, but then later disable it or set it to Not Configured, the document shortcuts saved before the setting was enabled reappear in the Recent Items menu and program File menus, and Jump Lists. This setting does not hide or prevent the user from pinning files, folders, or websites to the Jump Lists. See the \"Do not allow pinning items in Jump Lists\" setting. This policy also does not hide Tasks that the application has provided for their Jump List. This setting does not hide document shortcuts displayed in the Open dialog box. See the \"Hide the dropdown list of recent files\" setting. Note: It is a requirement for third-party applications with Windows 2000 or later certification to adhere to this setting.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoRecentDocsHistory",
  "Elements": []
},
{
  "File": "WindowsConnectNow.admx",
  "CategoryName": "WCN_Category",
  "PolicyName": "WCN_DisableWcnUi_2",
  "NameSpace": "Microsoft.Policies.WindowsConnectNow",
  "Supported": "WindowsVista - At least Windows Vista",
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
}
```
