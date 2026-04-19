---
title: 'OneDrive'
description: 'Misc option documentation from win-config.'
editUrl: false
sidebar:
  order: 10
---

`DisableLibrariesDefaultSaveToOneDrive` sets local storage as the default save location, `DisableFileSync` disables OneDrive on Windows 8.1 including app and picker access removal and stops sync and hides the Explorer entry, `DisableFileSyncNGSC` disables OneDrive via the Next-Gen Sync Client with the same effect, `DisableMeteredNetworkFileSync` set to `0` blocks syncing on all metered connections, `PreventNetworkTrafficPreUserSignIn` stops the OneDrive client from generating network traffic until the user signs in, `System.IsPinnedToNameSpaceTree` set to `0` hides OneDrive from File Explorer's navigation pane.

See `json` block below for more details.

Uninstall runs `OneDriveSetup.exe /uninstall` and removes leftovers:
```c
// paths
%LOCALAPPDATA%\Microsoft\OneDrive
%LOCALAPPDATA%\OneDrive
%PROGRAMDATA%\Microsoft OneDrive
%SYSTEMDRIVE%\OneDriveTemp
%APPDATA%\Microsoft\Windows\Start Menu\Programs\OneDrive.lnk
// if empty
%USERPROFILE%\OneDrive

// registry keys/values
HKCU\Environment : OneDrive
HKCU\Software\RegisteredApplications : OneDrive
HKCU\Software\Microsoft\Windows\CurrentVersion\Run\AutorunsDisabled : OneDrive
HKCU\Software\Microsoft\OneDrive
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\StorageProvider\OneDrive
HKLM\SOFTWARE\Microsoft\OneDrive
HKLM\SOFTWARE\WOW6432Node\Policies\Microsoft\Windows\OneDrive

// scheduled tasks
\\OneDrive*
```

```json
{
  "File": "SkyDrive.admx",
  "CategoryName": "OneDrive",
  "PolicyName": "DisableLibrariesDefaultSaveToOneDrive",
  "NameSpace": "Microsoft.Policies.OneDrive",
  "Supported": "Windows_6_3only",
  "DisplayName": "Save documents to OneDrive by default",
  "ExplainText": "This policy setting lets you disable OneDrive as the default save location. It does not prevent apps and users from saving files on OneDrive. If you disable this policy setting, files will be saved locally by default. Users will still be able to change the value of this setting to save to OneDrive by default. They will also be able to open and save files on OneDrive using the OneDrive app and file picker, and packaged Microsoft Store apps will still be able to access OneDrive using the WinRT API. If you enable or do not configure this policy setting, users with a connected account will save documents to OneDrive by default.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\OneDrive"
  ],
  "ValueName": "DisableLibrariesDefaultSaveToOneDrive",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SkyDrive.admx",
  "CategoryName": "OneDrive",
  "PolicyName": "PreventOnedriveFileSyncForBlue",
  "NameSpace": "Microsoft.Policies.OneDrive",
  "Supported": "Windows_6_3only",
  "DisplayName": "Prevent the usage of OneDrive for file storage on Windows 8.1",
  "ExplainText": "This policy setting lets you prevent apps and features from working with files on OneDrive for Windows 8.1. If you enable this policy setting: * Users can\u2019t access OneDrive from the OneDrive app and file picker. * Packaged Microsoft Store apps can\u2019t access OneDrive using the WinRT API. * OneDrive doesn\u2019t appear in the navigation pane in File Explorer. * OneDrive files aren\u2019t kept in sync with the cloud. * Users can\u2019t automatically upload photos and videos from the camera roll folder. If you disable or do not configure this policy setting, apps and features can work with OneDrive file storage.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\OneDrive"
  ],
  "ValueName": "DisableFileSync",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SkyDrive.admx",
  "CategoryName": "OneDrive",
  "PolicyName": "PreventOnedriveFileSync",
  "NameSpace": "Microsoft.Policies.OneDrive",
  "Supported": "Windows7",
  "DisplayName": "Prevent the usage of OneDrive for file storage",
  "ExplainText": "This policy setting lets you prevent apps and features from working with files on OneDrive. If you enable this policy setting: * Users can\u2019t access OneDrive from the OneDrive app and file picker. * Packaged Microsoft Store apps can\u2019t access OneDrive using the WinRT API. * OneDrive doesn\u2019t appear in the navigation pane in File Explorer. * OneDrive files aren\u2019t kept in sync with the cloud. * Users can\u2019t automatically upload photos and videos from the camera roll folder. If you disable or do not configure this policy setting, apps and features can work with OneDrive file storage.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\OneDrive"
  ],
  "ValueName": "DisableFileSyncNGSC",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SkyDrive.admx",
  "CategoryName": "OneDrive",
  "PolicyName": "PreventOneDriveFileSyncOnMeteredNetwork",
  "NameSpace": "Microsoft.Policies.OneDrive",
  "Supported": "Windows_6_3only",
  "DisplayName": "Prevent OneDrive files from syncing over metered connections",
  "ExplainText": "This policy setting allows configuration of OneDrive file sync behavior on metered connections.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\OneDrive"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "DisableMeteredNetworkFileSync", "Items": [
        { "DisplayName": "Block syncing on all metered connections", "Data": "0" },
        { "DisplayName": "Block syncing on metered connections only when roaming", "Data": "1" }
      ]
    }
  ]
},
{
  "File": "SkyDrive.admx",
  "CategoryName": "OneDrive",
  "PolicyName": "PreventNetworkTrafficPreUserSignIn",
  "NameSpace": "Microsoft.Policies.OneDrive",
  "Supported": "Windows7",
  "DisplayName": "Prevent OneDrive from generating network traffic until the user signs in to OneDrive",
  "ExplainText": "Enable this setting to prevent the OneDrive sync client (OneDrive.exe) from generating network traffic (checking for updates, etc.) until the user signs in to OneDrive or starts syncing files to the local computer. If you enable this setting, users must sign in to the OneDrive sync client on the local computer, or select to sync OneDrive or SharePoint files on the computer, for the sync client to start automatically. If this setting is not enabled, the OneDrive sync client will start automatically when users sign in to Windows. If you enable or disable this setting, do not return the setting to Not Configured. Doing so will not change the configuration and the last configured setting will remain in effect.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Microsoft\\OneDrive"
  ],
  "ValueName": "PreventNetworkTrafficPreUserSignIn",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
