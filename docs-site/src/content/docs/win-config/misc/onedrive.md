---
title: 'OneDrive'
description: 'Misc option documentation from win-config.'
editUrl: false
sidebar:
  order: 9
---

`DisableLibrariesDefaultSaveToOneDrive` sets local storage as the default save location, `DisableFileSync` disables OneDrive on Windows 8.1 including app and picker access removal and stops sync and hides the Explorer entry, `DisableFileSyncNGSC` disables OneDrive via the Next-Gen Sync Client with the same effect, `DisableMeteredNetworkFileSync` set to `0` blocks syncing on all metered connections, `PreventNetworkTrafficPreUserSignIn` stops the OneDrive client from generating network traffic until the user signs in, `System.IsPinnedToNameSpaceTree` set to `0` hides OneDrive from File Explorer's navigation pane.

See the Windows Policies table below for policy links and registry details.

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

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Save documents to OneDrive by default](https://noverse.dev/policies?p=SkyDrive*DisableLibrariesDefaultSaveToOneDrive) | `HKLM\Software\Policies\Microsoft\Windows\OneDrive` | `DisableLibrariesDefaultSaveToOneDrive` |
| [Prevent the usage of OneDrive for file storage on Windows 8.1](https://noverse.dev/policies?p=SkyDrive*PreventOnedriveFileSyncForBlue) | `HKLM\Software\Policies\Microsoft\Windows\OneDrive` | `DisableFileSync` |
| [Prevent the usage of OneDrive for file storage](https://noverse.dev/policies?p=SkyDrive*PreventOnedriveFileSync) | `HKLM\Software\Policies\Microsoft\Windows\OneDrive` | `DisableFileSyncNGSC` |
| [Prevent OneDrive files from syncing over metered connections](https://noverse.dev/policies?p=SkyDrive*PreventOneDriveFileSyncOnMeteredNetwork) | `HKLM\Software\Policies\Microsoft\Windows\OneDrive` | `DisableMeteredNetworkFileSync` |
| [Prevent OneDrive from generating network traffic until the user signs in to OneDrive](https://noverse.dev/policies?p=SkyDrive*PreventNetworkTrafficPreUserSignIn) | `HKLM\SOFTWARE\Microsoft\OneDrive` | `PreventNetworkTrafficPreUserSignIn` |
