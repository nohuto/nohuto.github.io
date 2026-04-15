---
title: 'Trusted Path Credential Prompting'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#trusted-path-credential-prompting'
sidebar:
  order: 21
---

This policy setting requires the user to enter Microsoft Windows credentials using a trusted path, to prevent a Trojan horse or other types of malicious code from stealing the user's Windows credentials.

## Windows Policies

```json
{
  "File": "CredUI.admx",
  "CategoryName": "CredUI",
  "PolicyName": "EnableSecureCredentialPrompting",
  "NameSpace": "Microsoft.Policies.CredentialsUI",
  "Supported": "WindowsVista",
  "DisplayName": "Require trusted path for credential entry",
  "ExplainText": "This policy setting requires the user to enter Microsoft Windows credentials using a trusted path, to prevent a Trojan horse or other types of malicious code from stealing the user\u2019s Windows credentials. Note: This policy affects nonlogon authentication tasks only. As a security best practice, this policy should be enabled. If you enable this policy setting, users will be required to enter Windows credentials on the Secure Desktop by means of the trusted path mechanism. If you disable or do not configure this policy setting, users will enter Windows credentials within the user\u2019s desktop session, potentially allowing malicious code access to the user\u2019s Windows credentials.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\CredUI"
  ],
  "ValueName": "EnableSecureCredentialPrompting",
  "Elements": []
},
```
