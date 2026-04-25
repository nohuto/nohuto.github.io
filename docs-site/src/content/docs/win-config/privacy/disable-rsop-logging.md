---
title: 'RSoP Logging'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 41
---

> "*This setting allows you to enable or disable Resultant Set of Policy (RSoP) logging on a client computer.RSoP logs information on Group Policy settings that have been applied to the client. This information includes details such as which Group Policy Objects (GPO) were applied where they came from and the client-side extension settings that were included.If you enable this setting RSoP logging is turned off.If you disable or do not configure this setting RSoP logging is turned on. By default RSoP logging is always on.Note: To view the RSoP information logged on a client computer you can use the RSoP snap-in in the Microsoft Management Console (MMC).*"
>
> — Windows Security Encyclopedia, [Turn off Resultant Set of Policy logging](https://www.windows-security.org/370c915e44b6a75efac0d24669aa9434/turn-off-resultant-set-of-policy-logging)

```
\Registry\Machine\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon : RsopLogging
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\SYSTEM : RsopLogging
```

## Windows Policies

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "RSoPLogging",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "WindowsXP - At least Windows Server 2003 operating systems or Windows XP Professional",
  "DisplayName": "Turn off Resultant Set of Policy logging",
  "ExplainText": "This setting allows you to enable or disable Resultant Set of Policy (RSoP) logging on a client computer. RSoP logs information on Group Policy settings that have been applied to the client. This information includes details such as which Group Policy Objects (GPO) were applied, where they came from, and the client-side extension settings that were included. If you enable this setting, RSoP logging is turned off. If you disable or do not configure this setting, RSoP logging is turned on. By default, RSoP logging is always on. Note: To view the RSoP information logged on a client computer, you can use the RSoP snap-in in the Microsoft Management Console (MMC).",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "RSoPLogging",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
}
```
