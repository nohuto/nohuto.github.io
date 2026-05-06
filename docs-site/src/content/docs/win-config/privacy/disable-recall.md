---
title: 'Recall'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 15
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
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX - At least Windows 11 Pro, Enterprise, or Education with Windows Sandbox",
  "DisplayName": "Turn off saving snapshots for use with Recall",
  "ExplainText": "This policy setting allows you to determine whether snapshots of the screen can be saved for use with Recall. For managed devices, snapshots for Recall are not enabled by default. IT administrators cannot, on their own, enable saving snapshots on behalf of their users. The choice to enable saving snapshots requires individual user opt-in consent. If the policy is not configured, snapshots won't be saved for use with Recall. If you enable this policy, snapshots won't be saved for use with Recall. If snapshots were previously saved on the device, they will be deleted when this policy is enabled. If you set this policy to disabled, end users will have a choice to save snapshots of their screen and use Recall to find things they've seen on their device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
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
  "PolicyName": "AllowRecallEnablement",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX - At least Windows 11 Pro, Enterprise, or Education with Windows Sandbox",
  "DisplayName": "Allow Recall to be enabled",
  "ExplainText": "This policy setting allows you to determine whether the Recall optional component is available for end users to enable on their device. By default, Recall is disabled for managed commercial devices. Recall isn't available on managed devices by default, and individual users can't enable Recall on their own. If this policy is not configured, end users will have the Recall component in a disabled state. If this policy is disabled, the Recall component will be in disabled state and the bits for Recall will be removed from the device. If snapshots were previously saved on the device, they will be deleted when this policy is disabled. Removing Recall requires a device restart. If the policy is enabled, end users will have Recall available on their device. Depending on the state of the DisableAIDataAnalysis policy (Turn off saving snapshots for use with Recall), end users will be able to choose if they want to save snapshots of their screen and use Recall to find things they've seen on their device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI"
  ],
  "ValueName": "AllowRecallEnablement",
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
}
```
