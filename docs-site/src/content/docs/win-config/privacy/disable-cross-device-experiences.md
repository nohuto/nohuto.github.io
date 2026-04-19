---
title: 'Cross-Device Experiences'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-cross-device-experiences'
sidebar:
  order: 28
---

Disables Cross-Device experiences (allows you to use `Share Across Devices`/`Nearby Sharing` functionalities) & share accross devices. With `Share across devices`, you can continue app experiences on other devices connected to your account (set to `My device only` by default).

## SystemSettings Captures

Changing "Share across devices" option via `SystemSettings`:
```c
// Off
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 0

// My device only
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\SettingsPage\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1

// Everyone nearby
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\SettingsPage\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2

// Miscellaneous note
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\EnableRemoteLaunchToast  Type: REG_DWORD, Length: 4, Data: 1
```

`RomeSdkChannelUserAuthzPolicy` (`CDP\SettingsPage`) is only used for "My device only"/"Everyone nearby" (it's still getting changed to `0` in this option).

```c
L"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\\SettingsPage",
L"BluetoothLastDisabledNearShare",

L"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\\SettingsPage",
L"WifiLastDisabledNearShare",
```

> [privacy/assets | crossdev-SharedExperiencesSingleton.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crossdev-SharedExperiencesSingleton.c)

## Windows Policies

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "EnableCDP",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "Windows_10_0",
  "DisplayName": "Continue experiences on this device",
  "ExplainText": "This policy setting determines whether the Windows device is allowed to participate in cross-device experiences (continue experiences). If you enable this policy setting, the Windows device is discoverable by other Windows devices that belong to the same user, and can participate in cross-device experiences. If you disable this policy setting, the Windows device is not discoverable by other devices, and cannot participate in cross-device experiences. If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableCdp",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
