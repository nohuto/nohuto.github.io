---
title: 'Background Apps'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 36
---

"This policy setting specifies whether Windows apps can run in the background.You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting.If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can run in the background by using Settings Privacy on the device.If you choose the "Force Allow" option, Windows apps are allowed to run in the background and employees in your organization cannot change it.If you choose the "Force Deny" option, Windows apps are not allowed to run in the background and employees in your organization cannot change it.If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can run in the background by using Settings Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app."

```
Computer Configuration\Administrative Templates\Windows Components\App Privacy
```
`Enabled` -> `Deny All changes`:
```powershell
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground	Type: REG_DWORD, Length: 4, Data: 2
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_UserInControlOfTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_ForceAllowTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_ForceDenyTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
```

## Suboption

`Disable Background Task Host`:  
Renames `backgroundTaskHost.exe` to prevent UWP background tasks from running (notifications, live tiles, background sync). Use only if you do not rely on Store apps.

Windows Internals (E7-P1, Modern Standby): when the system is in Modern Standby, desktop apps are suspended and UWP apps are typically suspended, but background tasks created by UWP apps are allowed to execute. `backgroundTaskHost.exe` is the host for those tasks.

## Windows Policies

```json
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsRunInBackground",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0",
  "DisplayName": "Let Windows apps run in the background",
  "ExplainText": "This policy setting specifies whether Windows apps can run in the background. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can run in the background by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to run in the background and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to run in the background and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can run in the background by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsRunInBackground", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
```
