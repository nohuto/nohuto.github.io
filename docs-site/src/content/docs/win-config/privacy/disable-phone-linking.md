---
title: 'Phone Linking'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 29
---

"This policy allows IT admins to turn off the ability to Link a Phone with a PC to continue reading, emailing and other tasks that requires linking between Phone and PC.If you enable this policy setting, the Windows device will be able to enroll in Phone-PC linking functionality and participate in Continue on PC experiences.If you disable this policy setting, the Windows device is not allowed to be linked to Phones, will remove itself from the device list of any linked Phones, and cannot participate in Continue on PC experiences.If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot."

## SystemSettings Captures

This option will also disable resume ("Start something on one device and continue on this PC") - `System Settings > Apps > Resume`.

```c
// Off
HKCU\Software\Microsoft\Windows\CurrentVersion\CrossDeviceResume\Configuration\IsResumeAllowed	Type: REG_DWORD, Length: 4, Data: 0

// On
HKCU\Software\Microsoft\Windows\CurrentVersion\CrossDeviceResume\Configuration\IsResumeAllowed	Type: REG_DWORD, Length: 4, Data: 1
```

By default resume is enabled, OneDrive is the only app which exists under the "Control which apps can use Resume" on a stock 25H2 installation and can be toggled via `IsOneDriveResumeAllowed` (same key as `IsResumeAllowed`). Disabling resume will disallow all apps to use Resume (doesn't set `IsXResumeAllowed` to `0`).

## Windows Policies

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "EnableMMX",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Phone-PC linking on this device",
  "ExplainText": "This policy allows IT admins to turn off the ability to Link a Phone with a PC to continue reading, emailing and other tasks that requires linking between Phone and PC. If you enable this policy setting, the Windows device will be able to enroll in Phone-PC linking functionality and participate in Continue on PC experiences. If you disable this policy setting, the Windows device is not allowed to be linked to Phones, will remove itself from the device list of any linked Phones, and cannot participate in Continue on PC experiences. If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableMmx",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
