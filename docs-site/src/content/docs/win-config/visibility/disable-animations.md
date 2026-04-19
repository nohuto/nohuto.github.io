---
title: 'Animations'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

Minimize, Maximize, Taskbar Animations / First Sign-In Animations. These options are also changeable via `SystemPropertiesPerformance` (`WIN + R`) - first three.

`MaxAnimate` doesn't exist, windows only uses `MinAnimate`
```
SystemPropertiesAdvanced.exe	RegSetValue	HKCU\Control Panel\Desktop\WindowMetrics\MinAnimate	Type: REG_SZ, Length: 4, Data: 1
```
Disable logon animations, which would remove the animation (picture), instead shows the windows default background wallpaper: (first sign-in):
```
This policy controls whether users see the first sign-in animation when signing in for the first time, including both the initial setup user and those added later. It also determines if Microsoft account users receive the opt-in prompt for services. If enabled, Microsoft account users see the opt-in prompt and other users see the animation. If disabled, neither the animation nor the opt-in prompt appears. If not configured, the first user sees the animation during setup; later users won't see it if setup was already completed. This policy has no effect on Server editions.
```

Second one is used by Windows (`Computer Configuration > Administrative Templates > System > Logon : Show first sign-in animation`:
```c
CMachine::RegQueryDWORD(
  v62,
  L"Software\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon",
  L"EnableFirstLogonAnimation",
  0,
  &v117);
v118 = 1;

CMachine::RegQueryDWORD(
  v63,
  L"Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
  L"EnableFirstLogonAnimation",
  1u,
  &v118);
```
`AnimationAfterUserOOBE` & `SkipNextFirstLogonAnimation` (`CurrentVersion\Winlogon`) also exist.

> https://github.com/nohuto/regkit/blob/main/records/ControlPanel-Desktop.txt  
> [visibility/assets | animation-WinMain.c](https://github.com/nohuto/win-config/blob/main/visibility/assets/animation-WinMain.c)

![](https://github.com/nohuto/win-config/blob/main/visibility/images/animation.png?raw=true)

`ForceDisableModeChangeAnimation` got added in 22621.3807/22631.3807 and is used for "When you set its value to 1 (or a non-zero number), it turns off the display mode change animation. If the value is 0 or the key does not exist, the animation is set to on."

> https://blogs.windows.com/windows-insider/2024/06/13/releasing-windows-11-builds-22621-3807-and-22631-3807-to-the-release-preview-channel/

## Windows Policies

```json
{
  "File": "Explorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "TurnOffSPIAnimations",
  "NameSpace": "Microsoft.Policies.WindowsExplorer2",
  "Supported": "WindowsVista",
  "DisplayName": "Turn off common control and window animations",
  "ExplainText": "This policy is similar to settings directly available to computer users. Disabling animations can improve usability for users with some visual disabilities as well as improving performance and battery life in some scenarios.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "TurnOffSPIAnimations",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Logon.admx",
  "CategoryName": "Logon",
  "PolicyName": "EnableFirstLogonAnimation",
  "NameSpace": "Microsoft.Policies.WindowsLogon",
  "Supported": "Windows8",
  "DisplayName": "Show first sign-in animation",
  "ExplainText": "This policy setting allows you to control whether users see the first sign-in animation when signing in to the computer for the first time. This applies to both the first user of the computer who completes the initial setup and users who are added to the computer later. It also controls if Microsoft account users will be offered the opt-in prompt for services during their first sign-in. If you enable this policy setting, Microsoft account users will see the opt-in prompt for services, and users with other accounts will see the sign-in animation. If you disable this policy setting, users will not see the animation and Microsoft account users will not see the opt-in prompt for services. If you do not configure this policy setting, the user who completes the initial Windows setup will see the animation during their first sign-in. If the first user had already completed the initial setup and this policy setting is not configured, users new to this computer will not see the animation. Note: The first sign-in animation will not be shown on Server, so this policy will have no effect.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "EnableFirstLogonAnimation",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DWM.admx",
  "CategoryName": "CAT_DesktopWindowManager",
  "PolicyName": "DwmDisallowAnimations_2",
  "NameSpace": "Microsoft.Policies.DesktopWindowManager",
  "Supported": "WindowsVista",
  "DisplayName": "Do not allow window animations",
  "ExplainText": "This policy setting controls the appearance of window animations such as those found when restoring, minimizing, and maximizing windows. If you enable this policy setting, window animations are turned off. If you disable or do not configure this policy setting, window animations are turned on. Changing this policy setting requires a logoff for it to be applied.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DWM"
  ],
  "ValueName": "DisallowAnimations",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
