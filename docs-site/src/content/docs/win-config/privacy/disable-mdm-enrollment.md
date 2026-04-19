---
title: 'MDM Enrollment'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-mdm-enrollment'
sidebar:
  order: 31
---

`DisableRegistration`:  
"This policy setting specifies whether Mobile Device Management (MDM) Enrollment is allowed. When MDM is enabled, it allows the user to have the computer remotely managed by a MDM Server. If you do not configure this policy setting, MDM Enrollment will be enabled. If you enable this policy setting, MDM Enrollment will be disabled for all users. It will not unenroll existing MDM enrollments.If you disable this policy setting, MDM Enrollment will be enabled for all users."

`AutoEnrollMDM`:  
"This policy setting specifies whether to automatically enroll the device to the Mobile Device Management (MDM) service configured in Azure Active Directory (Azure AD). If the enrollment is successful, the device will remotely managed by the MDM service. Important: The device must be registered in Azure AD for enrollment to succeed. If you do not configure this policy setting, automatic MDM enrollment will not be initiated. If you enable this policy setting, a task is created to initiate enrollment of the device to MDM service specified in the Azure AD. If you disable this policy setting, MDM will be unenrolled."

## Windows Policies

```json
{
  "File": "MDM.admx",
  "CategoryName": "MDM",
  "PolicyName": "MDM_MDM_DisplayName",
  "NameSpace": "Microsoft.Policies.MDM",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Disable MDM Enrollment",
  "ExplainText": "This policy setting specifies whether Mobile Device Management (MDM) Enrollment is allowed. When MDM is enabled, it allows the user to have the computer remotely managed by a MDM Server. If you do not configure this policy setting, MDM Enrollment will be enabled. If you enable this policy setting, MDM Enrollment will be disabled for all users. It will not unenroll existing MDM enrollments. If you disable this policy setting, MDM Enrollment will be enabled for all users.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\MDM"
  ],
  "ValueName": "DisableRegistration",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "MDM.admx",
  "CategoryName": "MDM",
  "PolicyName": "MDM_JoinMDM_DisplayName",
  "NameSpace": "Microsoft.Policies.MDM",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Enable automatic MDM enrollment using default Azure AD credentials",
  "ExplainText": "This policy setting specifies whether to automatically enroll the device to the Mobile Device Management (MDM) service configured in Azure Active Directory (Azure AD). If the enrollment is successful, the device will remotely managed by the MDM service. Important: The device must be registered in Azure AD for enrollment to succeed. If you do not configure this policy setting, automatic MDM enrollment will not be initiated. If you enable this policy setting, a task is created to initiate enrollment of the device to MDM service specified in the Azure AD. If you disable this policy setting, MDM will be unenrolled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\MDM"
  ],
  "ValueName": "AutoEnrollMDM",
  "Elements": [
    { "Type": "Enum", "ValueName": "UseAADCredentialType", "Items": [
        { "DisplayName": "User Credential", "Data": "1" },
        { "DisplayName": "Device Credential", "Data": "2" }
      ]
    },
    { "Type": "Text", "ValueName": "MDMApplicationId" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
