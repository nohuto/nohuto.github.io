---
title: 'Troubleshooter Preference'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 4
---

It's set to `Ask me before running` by default.

| Option | Description |
| ---- | ---- |
| Run automatically, don't notify me | Windows will automatically run recommended troubleshooters for problems detected on your device without bothering you. |
| Run automatically, then notify me | Windows will tell you after recommended troubleshooters have solved a problem so you know what happened. |
| Ask me before running (default) | We'll let you know when recommended troubleshooting is available. You can review the problem and changes before running the troubleshooters. |
| Don't run any | Windows will automatically run critical troubleshooters but won't recommend troubleshooting for other problems. You will not get notifications for known problems, and you will need to manually troubleshoot these problems on your device. |

| Service | Description |
| ---- | ---- |
| `DPS` | The Diagnostic Policy Service enables problem detection, troubleshooting and resolution for Windows components. If this service is stopped, diagnostics will no longer function. |
| `TroubleshootingSvc` | Enables automatic mitigation for known problems by applying recommended troubleshooting. If stopped, your device will not get recommended troubleshooting for problems on your device. |
| `diagsvc` | Executes diagnostic actions for troubleshooting support |

These get disabled in the `Don't run any` option.

## SystemSettings Captures

`System > Troubleshoot` - `Recommended troubleshooter preferences`:
```c
// Don't run any
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 1

// Ask me before running (default)
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 2

// Run automatically, then notify me
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 3

// Run automatically, don't notify me
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 4
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "MSDT.admx",
  "CategoryName": "WdiScenarioCategory",
  "PolicyName": "MsdtSupportProvider",
  "NameSpace": "Microsoft.Policies.MSDT",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Microsoft Support Diagnostic Tool: Turn on MSDT interactive communication with support provider",
  "ExplainText": "This policy setting configures Microsoft Support Diagnostic Tool (MSDT) interactive communication with the support provider. MSDT gathers diagnostic data for analysis by support professionals. If you enable this policy setting, users can use MSDT to collect and send diagnostic data to a support professional to resolve a problem. By default, the support provider is set to Microsoft Corporation. If you disable this policy setting, MSDT cannot run in support mode, and no data can be collected or sent to the support provider. If you do not configure this policy setting, MSDT support mode is enabled by default. No reboots or service restarts are required for this policy setting to take effect. Changes take effect immediately.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScriptedDiagnosticsProvider\\Policy"
  ],
  "ValueName": "DisableQueryRemoteServer",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "sdiageng.admx",
  "CategoryName": "ScriptedDiagnosticsCategory",
  "PolicyName": "ScriptedDiagnosticsExecutionPolicy",
  "NameSpace": "Microsoft.Policies.ScriptedDiagnostics",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Troubleshooting: Allow users to access and run Troubleshooting Wizards",
  "ExplainText": "This policy setting allows users to access and run the troubleshooting tools that are available in the Troubleshooting Control Panel and to run the troubleshooting wizard to troubleshoot problems on their computers. If you enable or do not configure this policy setting, users can access and run the troubleshooting tools from the Troubleshooting Control Panel. If you disable this policy setting, users cannot access or run the troubleshooting tools from the Control Panel. Note that this setting also controls a user's ability to launch standalone troubleshooting packs such as those found in .diagcab files.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScriptedDiagnostics"
  ],
  "ValueName": "EnableDiagnostics",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "sdiageng.admx",
  "CategoryName": "ScriptedDiagnosticsCategory",
  "PolicyName": "BetterWhenConnected",
  "NameSpace": "Microsoft.Policies.ScriptedDiagnostics",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Troubleshooting: Allow users to access online troubleshooting content on Microsoft servers from the Troubleshooting Control Panel (via the Windows Online Troubleshooting Service - WOTS)",
  "ExplainText": "This policy setting allows users who are connected to the Internet to access and search troubleshooting content that is hosted on Microsoft content servers. Users can access online troubleshooting content from within the Troubleshooting Control Panel UI by clicking \"Yes\" when they are prompted by a message that states, \"Do you want the most up-to-date troubleshooting content?\" If you enable or do not configure this policy setting, users who are connected to the Internet can access and search troubleshooting content that is hosted on Microsoft content servers from within the Troubleshooting Control Panel user interface. If you disable this policy setting, users can only access and search troubleshooting content that is available locally on their computers, even if they are connected to the Internet. They are prevented from connecting to the Microsoft servers that host the Windows Online Troubleshooting Service.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScriptedDiagnosticsProvider\\Policy"
  ],
  "ValueName": "EnableQueryRemoteServer",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "MSDT.admx",
  "CategoryName": "WdiScenarioCategory",
  "PolicyName": "TroubleshootingAllowRecommendations",
  "NameSpace": "Microsoft.Policies.MSDT",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Troubleshooting: Allow users to access recommended troubleshooting for known problems",
  "ExplainText": "This policy setting configures how troubleshooting for known problems can be applied on the device and lets administrators configure how it's applied to their domains/IT environments. Not configuring this policy setting will allow the user to configure how troubleshooting is applied. Enabling this policy allows you to configure how troubleshooting is applied on the user's device. You can select from one of the following values: 0 = Do not allow users, system features, or Microsoft to apply troubleshooting. 1 = Only automatically apply troubleshooting for critical problems by system features and Microsoft. 2 = Automatically apply troubleshooting for critical problems by system features and Microsoft. Notify users when troubleshooting for other problems is available and allow users to choose to apply or ignore. 3 = Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Notify users when troubleshooting has solved a problem. 4 = Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Do not notify users when troubleshooting has solved a problem. 5 = Allow the user to choose their own troubleshooting settings. After setting this policy, you can use the following instructions to check devices in your domain for available troubleshooting from Microsoft: 1. Create a bat script with the following contents: rem The following batch script triggers Recommended Troubleshooting schtasks /run /TN \"\\Microsoft\\Windows\\Diagnosis\\RecommendedTroubleshootingScanner\" 2. To create a new immediate task, navigate to the Group Policy Management Editor > Computer Configuration > Preferences and select Control Panel Settings. 3. Under Control Panel settings, right-click on Scheduled Tasks and select New. Select Immediate Task (At least Windows 7). 4. Provide name and description as appropriate, then under Security Options set the user account to System and select the Run with highest privileges checkbox. 5. In the Actions tab, create a new action, select Start a Program as its type, then enter the file created in step 1. 6. Configure the task to deploy to your domain.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Troubleshooting\\AllowRecommendations"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "TroubleshootingAllowRecommendations", "Items": [
        { "DisplayName": "Do not allow users, system features, or Microsoft to apply troubleshooting.", "Data": "0" },
        { "DisplayName": "Only automatically apply troubleshooting for critical problems by system features and Microsoft.", "Data": "1" },
        { "DisplayName": "Automatically apply troubleshooting for critical problems by system features and Microsoft. Notify users when troubleshooting for other problems is available and allow users to choose to apply or ignore.", "Data": "2" },
        { "DisplayName": "Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Notify users when troubleshooting has solved a problem.", "Data": "3" },
        { "DisplayName": "Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Do not notify users when troubleshooting has solved a problem.", "Data": "4" },
        { "DisplayName": "Allow the user to choose their own troubleshooting settings.", "Data": "5" }
      ]
    }
  ]
},
{
  "File": "sdiagschd.admx",
  "CategoryName": "ScheduledDiagnosticsCategory",
  "PolicyName": "ScheduledDiagnosticsExecutionPolicy",
  "NameSpace": "Microsoft.Policies.ScheduledDiagnostics",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Configure Scheduled Maintenance Behavior",
  "ExplainText": "Determines whether scheduled diagnostics will run to proactively detect and resolve system problems. If you enable this policy setting, you must choose an execution level. If you choose detection and troubleshooting only, Windows will periodically detect and troubleshoot problems. The user will be notified of the problem for interactive resolution. If you choose detection, troubleshooting and resolution, Windows will resolve some of these problems silently without requiring user input. If you disable this policy setting, Windows will not be able to detect, troubleshoot or resolve problems on a scheduled basis. If you do not configure this policy setting, local troubleshooting preferences will take precedence, as configured in the control panel. If no local troubleshooting preference is configured, scheduled diagnostics are enabled for detection, troubleshooting and resolution by default. No reboots or service restarts are required for this policy to take effect: changes take effect immediately. This policy setting will only take effect when the Task Scheduler service is in the running state. When the service is stopped or disabled, scheduled diagnostics will not be executed. The Task Scheduler service can be configured with the Services snap-in to the Microsoft Management Console.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScheduledDiagnostics"
  ],
  "ValueName": "EnabledExecution",
  "Elements": [
    { "Type": "Enum", "ValueName": "EnabledExecutionLevel", "Items": [
        { "DisplayName": "Troubleshooting Only", "Data": "1" },
        { "DisplayName": "Regular", "Data": "2" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WDI.admx",
  "CategoryName": "Troubleshooting",
  "PolicyName": "WdiDpsScenarioExecutionPolicy",
  "NameSpace": "Microsoft.Policies.WindowsDiagnostics",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Diagnostics: Configure scenario execution level",
  "ExplainText": "This policy setting determines the execution level for Diagnostic Policy Service (DPS) scenarios. If you enable this policy setting, you must select an execution level from the drop-down menu. If you select problem detection and troubleshooting only, the DPS will detect problems and attempt to determine their root causes. These root causes will be logged to the event log when detected, but no corrective action will be taken. If you select detection, troubleshooting and resolution, the DPS will attempt to automatically fix problems it detects or indicate to the user that assisted resolution is available. If you disable this policy setting, Windows cannot detect, troubleshoot, or resolve any problems that are handled by the DPS. If you do not configure this policy setting, the DPS enables all scenarios for resolution by default, unless you configure separate scenario-specific policy settings. This policy setting takes precedence over any scenario-specific policy settings when it is enabled or disabled. Scenario-specific policy settings only take effect if this policy setting is not configured. No reboots or service restarts are required for this policy setting to take effect: changes take effect immediately.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WDI"
  ],
  "ValueName": "ScenarioExecutionEnabled",
  "Elements": [
    { "Type": "Enum", "ValueName": "EnabledScenarioExecutionLevel", "Items": [
        { "DisplayName": "Detection and Troubleshooting Only", "Data": "1" },
        { "DisplayName": "Detection, Troubleshooting and Resolution", "Data": "2" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
