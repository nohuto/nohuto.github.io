---
title: 'AutoPlay/Autorun'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 12
---

AutoRun is a mechanism that uses an `autorun.inf` file on removable media (like CDs or old USB sticks) to specify a program that should start automatically when the media is inserted. Typical use case was auto starting setup programs on software CDs. Because malware abused this behavior, Windows now strongly restricts or disables automatic execution from `autorun.inf` on most removable drives.

AutoPlay is a feature that detects the type of content on newly inserted media or connected devices and then offers actions such as "Open folder, Play media, Import photos". It can read some information from `autorun.inf`, but it doesn't automatically run programs without user confirmation.

Disabling `ShellHWDetection` causes CmdPal to not start directly after boot for whatever reason, which is why I added a suboption to enable the service.

Example `autorun.inf` content:
```inf
[autorun]
open=Launch.exe
icon=Launch.exe
```

| Service | Description |
| --- | --- |
| `ShellHWDetection` | Provides notifications for AutoPlay hardware events. |

```c
// Bluetooth & devices > AutoPlay (same for Control Panel > All Control Panel Items > AutoPlay)
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\DisableAutoplay	Type: REG_DWORD, Length: 4, Data: 1

// Removeable drive
// Configure storage settings (Settings) = MSStorageSense
// Take no action = MSTakeNoAction
// Open folder to view files (File Explorer) = MSOpenFolder
// Ask me every time = MSPromptEachTime
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\StorageOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\StorageOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction

// Memory card
// Import Photos and Videos (Photos) = dsd9eksajf9re3669zh5z2jykhws2jy42gypaqjh1qe66nyek1hg!desktopappxcontent!showshowpicturesonarrival
// Play (Windows Media Player) = MSPlayMediaOnArrival
// Take no action = MSTakeNoAction
// Open folder to view files (File Explorer) = MSOpenFolder
// Ask me every time = MSPromptEachTime
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\CameraAlternate\ShowPicturesOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\CameraAlternate\ShowPicturesOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction

// Changing all available ones to 'Take no action'
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\StorageOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\StorageOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\CameraAlternate\ShowPicturesOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\CameraAlternate\ShowPicturesOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayDVDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayDVDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayEnhancedDVDOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayEnhancedDVDOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\HandleDVDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\HandleDVDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayDVDAudioOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayDVDAudioOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayBluRayOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayBluRayOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\HandleBDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\HandleBDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayCDAudioOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayCDAudioOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayEnhancedCDOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayEnhancedCDOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\HandleCDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\HandleCDBurningOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlayVideoCDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlayVideoCDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\PlaySuperVideoCDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\PlaySuperVideoCDMovieOnArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\UserChosenExecuteHandlers\AutorunINFLegacyArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers\EventHandlersDefaultSelection\AutorunINFLegacyArrival\(Default)	Type: REG_SZ, Length: 30, Data: MSTakeNoAction
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "AutoPlay.admx",
  "CategoryName": "AutoPlay",
  "PolicyName": "NoAutorun",
  "NameSpace": "Microsoft.Policies.AutoPlay",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Set the default behavior for AutoRun",
  "ExplainText": "This policy setting sets the default behavior for Autorun commands. Autorun commands are generally stored in autorun.inf files. They often launch the installation program or other routines. Prior to Windows Vista, when media containing an autorun command is inserted, the system will automatically execute the program without user intervention. This creates a major security concern as code may be executed without user's knowledge. The default behavior starting with Windows Vista is to prompt the user whether autorun command is to be run. The autorun command is represented as a handler in the Autoplay dialog. If you enable this policy setting, an Administrator can change the default Windows Vista or later behavior for autorun to: a) Completely disable autorun commands, or b) Revert back to pre-Windows Vista behavior of automatically executing the autorun command. If you disable or not configure this policy setting, Windows Vista or later will prompt the user whether autorun command is to be run.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "NoAutorun", "Items": [
        { "DisplayName": "Do not execute any autorun commands", "Data": "1" },
        { "DisplayName": "Automatically execute autorun commands", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AutoPlay.admx",
  "CategoryName": "AutoPlay",
  "PolicyName": "DontSetAutoplayCheckbox",
  "NameSpace": "Microsoft.Policies.AutoPlay",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Prevent AutoPlay from remembering user choices.",
  "ExplainText": "This policy setting allows you to prevent AutoPlay from remembering user's choice of what to do when a device is connected. If you enable this policy setting, AutoPlay prompts the user to choose what to do when a device is connected. If you disable or do not configure this policy setting, AutoPlay remembers user's choice of what to do when a device is connected.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "DontSetAutoplayCheckbox",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AutoPlay.admx",
  "CategoryName": "AutoPlay",
  "PolicyName": "Autorun",
  "NameSpace": "Microsoft.Policies.AutoPlay",
  "Supported": "Win2k - At least Windows 2000",
  "DisplayName": "Turn off Autoplay",
  "ExplainText": "This policy setting allows you to turn off the Autoplay feature. Autoplay begins reading from a drive as soon as you insert media in the drive. As a result, the setup file of programs and the music on audio media start immediately. Prior to Windows XP SP2, Autoplay is disabled by default on removable drives, such as the floppy disk drive (but not the CD-ROM drive), and on network drives. Starting with Windows XP SP2, Autoplay is enabled for removable drives as well, including Zip drives and some USB mass storage devices. If you enable this policy setting, Autoplay is disabled on CD-ROM and removable media drives, or disabled on all drives. This policy setting disables Autoplay on additional types of drives. You cannot use this setting to enable Autoplay on drives on which it is disabled by default. If you disable or do not configure this policy setting, AutoPlay is enabled. Note: This policy setting appears in both the Computer Configuration and User Configuration folders. If the policy settings conflict, the policy setting in Computer Configuration takes precedence over the policy setting in User Configuration.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "NoDriveTypeAutoRun", "Items": [
        { "DisplayName": "CD-ROM and removable media drives", "Data": "181" },
        { "DisplayName": "All drives", "Data": "255" }
      ]
    }
  ]
},
{
  "File": "AutoPlay.admx",
  "CategoryName": "AutoPlay",
  "PolicyName": "NoAutoplayfornonVolume",
  "NameSpace": "Microsoft.Policies.AutoPlay",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Disallow Autoplay for non-volume devices",
  "ExplainText": "This policy setting disallows AutoPlay for MTP devices like cameras or phones. If you enable this policy setting, AutoPlay is not allowed for MTP devices like cameras or phones. If you disable or do not configure this policy setting, AutoPlay is enabled for non-volume devices.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "NoAutoplayfornonVolume",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
