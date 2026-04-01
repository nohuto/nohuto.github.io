---
title: 'Camera'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-camera'
sidebar:
  order: 23
---

Disallows the use of a camera on your system, by denying access via `LetAppsAccessCamera`/`AllowCamera`/services (and app permission).

| Service | Description |
| --- | --- |
| `FrameServer` | Enables multiple clients to access video frames from camera devices. |
| `FrameServerMonitor` | Monitors the health and state for the Windows Camera Frame Server service. |

`Disable Lock Screen Camera`:  
"Disables the lock screen camera toggle switch in PC Settings and prevents a camera from being invoked on the lock screen.By default, users can enable invocation of an available camera on the lock screen.If you enable this setting, users will no longer be able to enable or disable lock screen camera access in PC Settings, and the camera cannot be invoked on the lock screen." (`ControlPanelDisplay.admx`)

> https://support.microsoft.com/en-us/windows/manage-cameras-with-camera-settings-in-windows-11-97997ed5-bb98-47b6-a13d-964106997757

```json
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessCamera",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access the camera",
  "ExplainText": "This policy setting specifies whether Windows apps can access the camera. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the camera by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the camera and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the camera and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the camera by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessCamera", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
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
{
  "File": "Camera.admx",
  "CategoryName": "L_Camera_GroupPolicyCategory",
  "PolicyName": "L_AllowCamera",
  "NameSpace": "Microsoft.Policies.Camera",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Use of Camera",
  "ExplainText": "This policy setting allow the use of Camera devices on the machine. If you enable or do not configure this policy setting, Camera devices will be enabled. If you disable this property setting, Camera devices will be disabled.",
  "KeyPath": [
    "HKLM\\software\\Policies\\Microsoft\\Camera"
  ],
  "ValueName": "AllowCamera",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
