---
title: 'Local Security Questions'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-local-security-questions'
sidebar:
  order: 49
---

Prevent the use of security questions for local accounts.

## Windows Policies

```json
{
  "File": "CredUI.admx",
  "CategoryName": "CredUI",
  "PolicyName": "NoLocalPasswordResetQuestions",
  "NameSpace": "Microsoft.Policies.CredentialsUI",
  "Supported": "Windows_10_0_RS6",
  "DisplayName": "Prevent the use of security questions for local accounts",
  "ExplainText": "If you turn this policy setting on, local users won\u2019t be able to set up and use security questions to reset their passwords.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "NoLocalPasswordResetQuestions",
  "Elements": []
},
```
