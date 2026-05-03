---
title: 'Recall'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 23
---

"Allows you to control whether Windows saves snapshots of the screen and analyzes the user's activity on their device. If you enable this policy setting, Windows will not be able to save snapshots and users won't be able to search for or browse through their historical device activity using Recall. If you disable or do not configure this policy setting, Windows will save snapshots of the screen and users will be able to search for or browse through a timeline of their past activities using Recall." (`WindowsCopilot.admx`)

## Suboption

`Disable ClickToDo`:  
"Click to Do lets people take action on content on their screens. When activated, it takes a screenshot of their screen and analyzes it to present actions. Click to Do ends when they exit it, and it can't take screenshots while closed. Screenshot analysis is always performed locally on their device. By default, Click to Do is enabled for users. This policy setting allows you to determine whether Click to Do is available for users on their device. When the policy is enabled, the Click to Do component and entry points will not be available to users. When the policy is disabled, users will have Click to Do available on their device."

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "WindowsCopilot.admx",
  "CategoryName": "WindowsAI",
  "PolicyName": "DisableAIDataAnalysis",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX",
  "DisplayName": "Turn off Saving Snapshots for Windows",
  "ExplainText": "This policy setting allows you to control whether Windows saves snapshots of the screen and analyzes the user's activity on their device. If you enable this policy setting, Windows will not be able to save snapshots and users won't be able to search for or browse through their historical device activity using Recall. If you disable or do not configure this policy setting, Windows will save snapshots of the screen and users will be able to search for or browse through a timeline of their past activities using Recall.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI"
  ],
  "ValueName": "DisableAIDataAnalysis",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsCopilot.admx",
  "CategoryName": "WindowsAI",
  "PolicyName": "DisableClickToDo",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX - At least Windows 11 Pro, Enterprise, or Education with Windows Sandbox",
  "DisplayName": "Disable Click to Do",
  "ExplainText": "Click to Do lets people take action on content on their screens. When activated, it takes a screenshot of their screen and analyzes it to present actions. Click to Do ends when they exit it, and it can't take screenshots while closed. Screenshot analysis is always performed locally on their device. By default, Click to Do is enabled for users. This policy setting allows you to determine whether Click to Do is available for users on their device. When the policy is enabled, the Click to Do component and entry points will not be available to users. When the policy is disabled, users will have Click to Do available on their device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI"
  ],
  "ValueName": "DisableClickToDo",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
