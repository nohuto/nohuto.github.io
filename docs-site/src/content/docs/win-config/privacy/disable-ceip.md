---
title: 'CEIP'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 33
---

Voluntary program that collects usage data to help improve the quality and performance of its products.

## Windows Policies

```json
{
  "File": "appv.admx",
  "CategoryName": "CAT_CEIP",
  "PolicyName": "CEIP_Enable",
  "NameSpace": "Microsoft.Policies.AppV",
  "Supported": "Windows7",
  "DisplayName": "Microsoft Customer Experience Improvement Program (CEIP)",
  "ExplainText": "The program collects information about computer hardware and how you use Microsoft Application Virtualization without interrupting you. This helps Microsoft identify which Microsoft Application Virtualization features to improve. No information collected is used to identify or contact you. For more details, read about the program online at http://go.microsoft.com/fwlink/?LinkID=184686.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\AppV\\CEIP"
  ],
  "ValueName": "CEIPEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "CEIPEnable",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsVista",
  "DisplayName": "Turn off Windows Customer Experience Improvement Program",
  "ExplainText": "This policy setting turns off the Windows Customer Experience Improvement Program. The Windows Customer Experience Improvement Program collects information about your hardware configuration and how you use our software and services to identify trends and usage patterns. Microsoft will not collect your name, address, or any other personally identifiable information. There are no surveys to complete, no salesperson will call, and you can continue working without interruption. It is simple and user-friendly. If you enable this policy setting, all users are opted out of the Windows Customer Experience Improvement Program. If you disable this policy setting, all users are opted into the Windows Customer Experience Improvement Program. If you do not configure this policy setting, the administrator can use the Problem Reports and Solutions component in Control Panel to enable Windows Customer Experience Improvement Program for all users.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\SQMClient\\Windows"
  ],
  "ValueName": "CEIPEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "WinMSG_NoInstrumentation_2",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2_Or_WindowsNET",
  "DisplayName": "Turn off the Windows Messenger Customer Experience Improvement Program",
  "ExplainText": "This policy setting specifies whether Windows Messenger collects anonymous information about how Windows Messenger software and service is used. With the Customer Experience Improvement program, users can allow Microsoft to collect anonymous information about how the product is used. This information is used to improve the product in future releases. If you enable this policy setting, Windows Messenger does not collect usage information, and the user settings to enable the collection of usage information are not shown. If you disable this policy setting, Windows Messenger collects anonymous usage information, and the setting is not shown. If you do not configure this policy setting, users have the choice to opt in and allow information to be collected.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Messenger\\Client"
  ],
  "ValueName": "CEIP",
  "Elements": [
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "inetres.admx",
  "CategoryName": "InternetExplorer",
  "PolicyName": "SQM_DisableCEIP",
  "NameSpace": "Microsoft.Policies.InternetExplorer",
  "Supported": "IE7_NONVISTA - At least Internet Explorer 7.0. Not supported on Windows Vista",
  "DisplayName": "Prevent participation in the Customer Experience Improvement Program",
  "ExplainText": "This policy setting prevents the user from participating in the Customer Experience Improvement Program (CEIP). If you enable this policy setting, the user cannot participate in the CEIP, and the Customer Feedback Options command does not appear on the Help menu. If you disable this policy setting, the user must participate in the CEIP, and the Customer Feedback Options command does not appear on the Help menu. If you do not configure this policy setting, the user can choose to participate in the CEIP.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Internet Explorer\\SQM",
    "HKCU\\Software\\Policies\\Microsoft\\Internet Explorer\\SQM"
  ],
  "ValueName": "DisableCustomerImprovementProgram",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```
