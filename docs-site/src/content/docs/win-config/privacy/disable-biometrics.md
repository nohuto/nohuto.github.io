---
title: 'Biometrics'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 15
---

Biometric is used for fingerprint, facial recognition, and other biometric authentication methods in Windows Hello and related security features.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Biometrics.admx",
  "CategoryName": "BiometricsConfiguration",
  "PolicyName": "Biometrics_EnableBio",
  "NameSpace": "Microsoft.Policies.Biometrics",
  "Supported": "Windows7",
  "DisplayName": "Allow the use of biometrics",
  "ExplainText": "This policy setting allows or prevents the Windows Biometric Service to run on this computer. If you enable or do not configure this policy setting, the Windows Biometric Service is available, and users can run applications that use biometrics on Windows. If you want to enable the ability to log on with biometrics, you must also configure the \"Allow users to log on using biometrics\" policy setting. If you disable this policy setting, the Windows Biometric Service is unavailable, and users cannot use any biometric feature in Windows. Note: Users who log on using biometrics should create a password recovery disk; this will prevent data loss in the event that someone forgets their logon credentials.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics"
  ],
  "ValueName": "Enabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Biometrics.admx",
  "CategoryName": "BiometricsConfiguration",
  "PolicyName": "Biometrics_EnableCredProv",
  "NameSpace": "Microsoft.Policies.Biometrics",
  "Supported": "Windows7",
  "DisplayName": "Allow users to log on using biometrics",
  "ExplainText": "This policy setting determines whether users can log on or elevate User Account Control (UAC) permissions using biometrics. By default, local users will be able to log on to the local computer, but the \"Allow domain users to log on using biometrics\" policy setting will need to be enabled for domain users to log on to the domain. If you enable or do not configure this policy setting, all users can log on to a local Windows-based computer and can elevate permissions with UAC using biometrics. If you disable this policy setting, biometrics cannot be used by any users to log on to a local Windows-based computer. Note: Users who log on using biometrics should create a password recovery disk; this will prevent data loss in the event that someone forgets their logon credentials.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics\\Credential Provider"
  ],
  "ValueName": "Enabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Biometrics.admx",
  "CategoryName": "BiometricsConfiguration",
  "PolicyName": "Biometrics_EnableDomainCredProv",
  "NameSpace": "Microsoft.Policies.Biometrics",
  "Supported": "Windows7",
  "DisplayName": "Allow domain users to log on using biometrics",
  "ExplainText": "This policy setting determines whether users with a domain account can log on or elevate User Account Control (UAC) permissions using biometrics. If you enable or do not configure this policy setting, Windows allows domain users to log on to a domain-joined computer using biometrics. If you disable this policy setting, Windows prevents domain users from logging on to a domain-joined computer using biometrics. Note: Prior to Windows 10, not configuring this policy setting would have prevented domain users from using biometrics to log on.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics\\Credential Provider"
  ],
  "ValueName": "Domain Accounts",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Biometrics.admx",
  "CategoryName": "FaceConfiguration",
  "PolicyName": "Face_EnhancedAntiSpoofing",
  "NameSpace": "Microsoft.Policies.Biometrics",
  "Supported": "Windows_10_0_NOARM",
  "DisplayName": "Configure enhanced anti-spoofing",
  "ExplainText": "This policy setting determines whether enhanced anti-spoofing is required for Windows Hello face authentication. If you enable this setting, Windows requires all users on managed devices to use enhanced anti-spoofing for Windows Hello face authentication. This disables Windows Hello face authentication on devices that do not support enhanced anti-spoofing. If you disable or don't configure this setting, Windows doesn't require enhanced anti-spoofing for Windows Hello face authentication. Note that enhanced anti-spoofing for Windows Hello face authentication is not required on unmanaged devices.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics\\FacialFeatures"
  ],
  "ValueName": "EnhancedAntiSpoofing",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
