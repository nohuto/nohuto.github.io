---
title: 'Hide Last Logged-In User'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 35
---

Note that if you use this option and don't have a password, you'll have to enter your username at each boot.

"This security setting determines whether the Windows sign-in screen will show the username of the last person who signed in on this PC."

```c
// Enabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayLastUserName	Type: REG_DWORD, Length: 4, Data: 1

// Disabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayLastUserName	Type: REG_DWORD, Length: 4, Data: 0
```

`Hide Username at Sign-In`:  
"This security setting determines whether the username of the person signing in to this PC appears at Windows sign-in, after credentials are entered, and before the PC desktop is shown."

```c
// Enabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayUserName	Type: REG_DWORD, Length: 4, Data: 1

// Disabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayUserName	Type: REG_DWORD, Length: 4, Data: 0
```

> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/interactive-logon-do-not-display-last-user-name

## Windows Policies

```json
{
  "File": "WinLogon.admx",
  "CategoryName": "Logon",
  "PolicyName": "DisplayLastLogonInfoDescription",
  "NameSpace": "Microsoft.Policies.WindowsLogon2",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Display information about previous logons during user logon",
  "ExplainText": "This policy setting controls whether or not the system displays information about previous logons and logon failures to the user. For local user accounts and domain user accounts in domains of at least a Windows Server 2008 functional level, if you enable this setting, a message appears after the user logs on that displays the date and time of the last successful logon by that user, the date and time of the last unsuccessful logon attempted with that user name, and the number of unsuccessful logons since the last successful logon by that user. This message must be acknowledged by the user before the user is presented with the Microsoft Windows desktop. For domain user accounts in Windows Server 2003, Windows 2000 native, or Windows 2000 mixed functional level domains, if you enable this setting, a warning message will appear that Windows could not retrieve the information and the user will not be able to log on. Therefore, you should not enable this policy setting if the domain is not at the Windows Server 2008 domain functional level. If you disable or do not configure this setting, messages about the previous logon or logon failures are not displayed.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "DisplayLastLogonInfo",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WinLogon.admx",
  "CategoryName": "Logon",
  "PolicyName": "LogonHoursNotificationPolicyDescription",
  "NameSpace": "Microsoft.Policies.WindowsLogon2",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Remove logon hours expiration warnings",
  "ExplainText": "This policy controls whether the logged on user should be notified when his logon hours are about to expire. By default, a user is notified before logon hours expire, if actions have been set to occur when the logon hours expire. If you enable this setting, warnings are not displayed to the user before the logon hours expire. If you disable or do not configure this setting, users receive warnings before the logon hours expire, if actions have been set to occur when the logon hours expire. Note: If you configure this setting, you might want to examine and appropriately configure the \u201cSet action to take when logon hours expire\u201d setting. If \u201cSet action to take when logon hours expire\u201d is disabled or not configured, the \u201cRemove logon hours expiration warnings\u201d setting will have no effect, and users receive no warnings about logon hour expiration",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "DontDisplayLogonHoursWarnings",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
