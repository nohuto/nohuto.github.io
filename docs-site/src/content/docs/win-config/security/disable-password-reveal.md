---
title: 'Password Reveal'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 13
---

"This policy setting allows you to configure the display of the password reveal button in password entry user experiences. If you enable this policy setting, the password reveal button won't be displayed after a user types a password in the password entry text box. If you disable or don't configure this policy setting, the password reveal button will be displayed after a user types a password in the password entry text box. By default, the password reveal button is displayed after a user types a password in the password entry text box."

## Suboption

`Disable Picture Password Sign-In`: "This policy setting allows you to control whether a domain user can sign in using a picture password. If you enable this policy setting, a domain user can't set up or sign in with a picture password. If you disable or don't configure this policy setting, a domain user can set up and use a picture password. Note that the user's domain password will be cached in the system vault when using this feature."

## Windows Policies

```json
{
  "File": "CredUI.admx",
  "CategoryName": "CredUI",
  "PolicyName": "DisablePasswordReveal",
  "NameSpace": "Microsoft.Policies.CredentialsUI",
  "Supported": "Windows8_Or_IE10",
  "DisplayName": "Do not display the password reveal button",
  "ExplainText": "This policy setting allows you to configure the display of the password reveal button in password entry user experiences. If you enable this policy setting, the password reveal button will not be displayed after a user types a password in the password entry text box. If you disable or do not configure this policy setting, the password reveal button will be displayed after a user types a password in the password entry text box. By default, the password reveal button is displayed after a user types a password in the password entry text box. To display the password, click the password reveal button. The policy applies to all Windows components and applications that use the Windows system controls, including Internet Explorer.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CredUI",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CredUI"
  ],
  "ValueName": "DisablePasswordReveal",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CredentialProviders.admx",
  "CategoryName": "Logon",
  "PolicyName": "BlockDomainPicturePassword",
  "NameSpace": "Microsoft.Policies.CredentialProviders",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn off picture password sign-in",
  "ExplainText": "This policy setting allows you to control whether a domain user can sign in using a picture password. If you enable this policy setting, a domain user can't set up or sign in with a picture password. If you disable or don't configure this policy setting, a domain user can set up and use a picture password. Note that the user's domain password will be cached in the system vault when using this feature.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "BlockDomainPicturePassword",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
