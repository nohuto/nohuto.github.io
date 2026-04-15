---
title: 'Hide Lock Screen'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#hide-lock-screen'
sidebar:
  order: 26
---

Disables the lock screen (skips the lock screen and go directly to the login screen). See content below for details on the suboptions.

Add a custom text to the sign in screen via:
```c
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
// legalnoticecaption -	Type: REG_SZ - Data: Noverse
// legalnoticetext	- Type: REG_SZ - Data: https://nohuto.github.io
```
By adding them, you'll have to click `OK` every time you boot/log in:

![](https://github.com/nohuto/win-config/blob/main/visibility/images/legalnotice.png?raw=true)

## Windows Policies

```json
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_NoLockScreen",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows8",
  "DisplayName": "Do not display the lock screen",
  "ExplainText": "This policy setting controls whether the lock screen appears for users. If you enable this policy setting, users that are not required to press CTRL + ALT + DEL before signing in will see their selected tile after locking their PC. If you disable or do not configure this policy setting, users that are not required to press CTRL + ALT + DEL before signing in will see a lock screen after locking their PC. They must dismiss the lock screen using touch, the keyboard, or by dragging it with the mouse.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "NoLockScreen",
  "Elements": []
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_ForceDefaultLockScreen",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows8",
  "DisplayName": "Force a specific default lock screen and logon image",
  "ExplainText": "This setting allows you to force a specific default lock screen and logon image by entering the path (location) of the image file. The same image will be used for both the lock and logon screens. This setting lets you specify the default lock screen and logon image shown when no user is signed in, and also sets the specified image as the default for all users (it replaces the inbox default image). To use this setting, type the fully qualified path and name of the file that stores the default lock screen and logon image. You can type a local path, such as C:\\Windows\\Web\\Screen\\img104.jpg or a UNC path, such as \\\\Server\\Share\\Corp.jpg. This can be used in conjunction with the \"Prevent changing lock screen and logon image\" setting to always force the specified lock screen and logon image to be shown. Note: This setting only applies to Enterprise, Education, and Server SKUs.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "Elements": [
    { "Type": "Text", "ValueName": "LockScreenImage" },
    { "Type": "Boolean", "ValueName": "LockScreenOverlaysDisabled", "TrueValue": "1", "FalseValue": "0" }
  ]
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_AnimateLockScreenBackground",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Prevent lock screen background motion",
  "ExplainText": "This policy setting controls whether the lock screen image is static or has a subtle panning effect driven by the device's accelerometer output. If you enable this setting, motion will be prevented and the user will see the traditional static lock screen background image. If you disable this setting (and the device has an accelerometer), the user will see the lock screen background pan around a still image as they physically move their device.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "AnimateLockScreenBackground",
  "Elements": []
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_NoLockScreenSlideshow",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows_6_3",
  "DisplayName": "Prevent enabling lock screen slide show",
  "ExplainText": "Disables the lock screen slide show settings in PC Settings and prevents a slide show from playing on the lock screen. By default, users can enable a slide show that will run after they lock the machine. If you enable this setting, users will no longer be able to modify slide show settings in PC Settings, and no slide show will ever start.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "NoLockScreenSlideshow",
  "Elements": []
},
{
  "File": "Logon.admx",
  "CategoryName": "Logon",
  "PolicyName": "DisableAcrylicBackgroundOnLogon",
  "NameSpace": "Microsoft.Policies.WindowsLogon",
  "Supported": "Windows_10_0_RS6",
  "DisplayName": "Show clear logon background",
  "ExplainText": "This policy setting disables the acrylic blur effect on logon background image. If you enable this policy, the logon background image shows without blur. If you disable or do not configure this policy, the logon background image adopts the acrylic blur effect.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "DisableAcrylicBackgroundOnLogon",
  "Elements": []
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_NoChangingLockScreen",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows8",
  "DisplayName": "Prevent changing lock screen and logon image",
  "ExplainText": "Prevents users from changing the background image shown when the machine is locked or when on the logon screen. By default, users can change the background image shown when the machine is locked or displaying the logon screen. If you enable this setting, the user will not be able to change their lock screen and logon image, and they will instead see the default image.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "NoChangingLockScreen",
  "Elements": []
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_NoLockScreenCamera",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows_6_3",
  "DisplayName": "Prevent enabling lock screen camera",
  "ExplainText": "Disables the lock screen camera toggle switch in PC Settings and prevents a camera from being invoked on the lock screen. By default, users can enable invocation of an available camera on the lock screen. If you enable this setting, users will no longer be able to enable or disable lock screen camera access in PC Settings, and the camera cannot be invoked on the lock screen.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "NoLockScreenCamera",
  "Elements": []
},
```

## Accounts Captures

`Accounts > Sign-in options` - `Automatically save my restartable apps and restart them when I sign back in`:
```c
// Off
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\RestartApps    Type: REG_DWORD, Length: 4, Data: 0

// On
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\RestartApps    Type: REG_DWORD, Length: 4, Data: 1
```

`Accounts > Sign-in options` - `Show account details such as my email address on the sign-in screen`:
```c
// On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-{ID}\AnyoneRead\Logon\ShowEmail	Type: REG_DWORD, Length: 4, Data: 1

// Off
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-{ID}\AnyoneRead\Logon\ShowEmail	Type: REG_DWORD, Length: 4, Data: 0
```

## Personalization Captures

`Personalization > Lock screen` - `Personalize your lock screen`:
```c
// Windows spotlight
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenEnabled	Type: REG_DWORD, Length: 4, Data: 1
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\Creative\S-{ID}\RotatingLockScreenEnabled	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\Subscriptions\338387\SubscriptionContext	Type: REG_SZ, Length: 20, Data: sc-mode=0
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Control Panel\Desktop\LockScreenAutoLockActive	Type: REG_SZ, Length: 4, Data: 0

// Picture
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\Creative\S-{ID}\RotatingLockScreenEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\Subscriptions\338387\SubscriptionContext	Type: REG_SZ, Length: 20, Data: sc-mode=1
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Control Panel\Desktop\LockScreenAutoLockActive	Type: REG_SZ, Length: 4, Data: 0
HKCU\Control Panel\Desktop\DelayLockInterval // deletevalue

// Slideshow
HKCU\Control Panel\Desktop\SCRNSAVE.EXE	// deletevalue
HKCU\Control Panel\Desktop\LockScreenAutoLockActive	Type: REG_SZ, Length: 4, Data: 1
HKCU\Control Panel\Desktop\DelayLockInterval	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowEnabled	Type: REG_DWORD, Length: 4, Data: 1
// Include camera roll folders from this PC and OneDrive (Slideshow only)
// Enabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowIncludeCameraRoll	Type: REG_DWORD, Length: 4, Data: 1
// Disabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowIncludeCameraRoll	Type: REG_DWORD, Length: 4, Data: 0
// Only use pictures that fit my screen
// Enabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowOptimizePhotoSelection	Type: REG_DWORD, Length: 4, Data: 1
// Disabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowOptimizePhotoSelection	Type: REG_DWORD, Length: 4, Data: 0
// When my PC is inactive, show the lock screen instead of turning off the screen
// Enabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowAutoLock	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Control Panel\Desktop\LockScreenAutoLockActive	Type: REG_SZ, Length: 4, Data: 1
// Disabled
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowAutoLock	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Control Panel\Desktop\LockScreenAutoLockActive	Type: REG_SZ, Length: 4, Data: 0
// Turn off the screen after the slidshow has played for
// Don't turn off
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowDuration	Type: REG_DWORD, Length: 4, Data: 0
// 3H
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowDuration	Type: REG_DWORD, Length: 4, Data: 10800000
// 1H
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowDuration	Type: REG_DWORD, Length: 4, Data: 3600000
// 30min
HKCU\Software\Microsoft\Windows\CurrentVersion\Lock Screen\SlideshowDuration	Type: REG_DWORD, Length: 4, Data: 1800000

// Get fun facts, tips, tricks, and more on your lock screen (for Picture/Slideshow)
// Enabled
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenOverlayEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\Creative\S-{ID}\RotatingLockScreenOverlayEnabled	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-338387Enabled	Type: REG_DWORD, Length: 4, Data: 0
// Disabled
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenOverlayEnabled	Type: REG_DWORD, Length: 4, Data: 1
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\Creative\S-{ID}\RotatingLockScreenOverlayEnabled	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-338387Enabled	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\Subscriptions\338387\SubscriptionContext	Type: REG_SZ, Length: 20, Data: sc-mode=1
```
