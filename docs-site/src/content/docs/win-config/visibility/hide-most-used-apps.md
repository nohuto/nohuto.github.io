---
title: 'Hide Most Used Apps'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 27
---

![](https://github.com/nohuto/win-config/blob/main/visibility/images/mostused.jpg?raw=true)

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "ShowOrHideMostUsedApps",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows_10_0_21H2 - At least Windows Server 2016, Windows 10 Version 2106",
  "DisplayName": "Show or hide \"Most used\" list from Start menu",
  "ExplainText": "If you enable this policy setting, you can configure Start menu to show or hide the list of user's most used apps, regardless of user settings. Selecting \"Show\" will force the \"Most used\" list to be shown, and user cannot change to hide it using the Settings app. Selecting \"Hide\" will force the \"Most used\" list to be hidden, and user cannot change to show it using the Settings app. Selecting \"Not Configured\", or if you disable or do not configure this policy setting, all will allow users to turn on or off the display of \"Most used\" list using the Settings app. This is default behavior. Note: configuring this policy to \"Show\" or \"Hide\" on supported versions of Windows 10 will supercede any policy setting of \"Remove frequent programs list from the Start Menu\" (which manages same part of Start menu but with fewer options).",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "ShowOrHideMostUsedApps", "Items": [
        { "DisplayName": "Not Configured", "Data": "0" },
        { "DisplayName": "Show", "Data": "1" },
        { "DisplayName": "Hide", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "NoFrequentUsedPrograms",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows7ToXPAndWindows10 - Windows Server 2008, Windows Server 2003, Windows 7, Windows Vista, Windows XP, and Windows 10",
  "DisplayName": "Remove frequent programs list from the Start Menu",
  "ExplainText": "If you enable this setting, the frequently used programs list is removed from the Start menu. If you disable this setting or do not configure it, the frequently used programs list remains on the simple Start menu.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoStartMenuMFUprogramsList",
  "Elements": []
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "NoInstrumentation",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "WindowsVistaTo2k - Windows Server 2008, Windows Server 2003, Windows Vista, Windows XP, and Windows 2000",
  "DisplayName": "Turn off user tracking",
  "ExplainText": "This policy setting allows you to turn off user tracking. If you enable this policy setting, the system does not track the programs that the user runs, and does not display frequently used programs in the Start Menu. If you disable or do not configure this policy setting, the system tracks the programs that the user runs. The system uses this information to customize Windows features, such as showing frequently used programs in the Start Menu. Also, see these related policy settings: \"Remove frequent programs liist from the Start Menu\" and \"Turn off personalized menus\". This policy setting does not prevent users from pinning programs to the Start Menu or Taskbar. See the \"Remove pinned programs list from the Start Menu\" and \"Do not allow pinning programs to the Taskbar\" policy settings.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoInstrumentation",
  "Elements": []
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "HideRecentlyAddedApps",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows_10_0_RS4 - At least Windows Server 2016, Windows 10 Version 1803",
  "DisplayName": "Remove \"Recently added\" list from Start Menu",
  "ExplainText": "This policy allows you to prevent the Start Menu from displaying a list of recently installed applications. If you enable this policy, the Start Menu will no longer display the \"Recently added\" list. The corresponding setting will also be disabled in Settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "HideRecentlyAddedApps",
  "Elements": []
},
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "NoNewAppAlert",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Do not show the 'new application installed' notification",
  "ExplainText": "This policy removes the end-user notification for new application associations. These associations are based on file types (e.g. *.txt) or protocols (e.g. http:) If this group policy is enabled, no notifications will be shown. If the group policy is not configured or disabled, notifications will be shown to the end user if a new application has been installed that can handle the file type or protocol association that was invoked.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "NoNewAppAlert",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
