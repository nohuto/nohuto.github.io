---
title: 'Local Security Questions'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 47
---

Prevent the use of security questions for local accounts.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "CredUI.admx",
  "CategoryName": "CredUI",
  "PolicyName": "NoLocalPasswordResetQuestions",
  "NameSpace": "Microsoft.Policies.CredentialsUI",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Prevent the use of security questions for local accounts",
  "ExplainText": "If you turn this policy setting on, local users won\u2019t be able to set up and use security questions to reset their passwords.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "NoLocalPasswordResetQuestions",
  "Elements": []
}
```
