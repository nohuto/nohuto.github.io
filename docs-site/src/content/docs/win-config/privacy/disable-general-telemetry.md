---
title: 'General Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 2
---

Prevents sending info about your computer to microsoft, disables the diagnostic log collection, bluetooth ads (`DataCollection.admx`), the inventory collector. It disables the ads ID ("Windows creates a unique advertising ID per user, allowing apps and ad networks to deliver targeted ads. When enabled, it works like a cookie, linking personal data to the ID for personalized ads. This setting only affects Windows apps using the advertising ID, not web-based ads or third-party methods.") which should be disabled by default, if you toggled all options off in the OS installation phase. See policy explanations below for more details.

> [decompiled-pseudocode/tree/main/11-23H2/DiagnosticDataSettings](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/DiagnosticDataSettings) (the dll seems to exist since W10 21H+)

The option applies all kind of telemetry related values including all values that you can find in diagtrack.dll/DiagnosticDataSettings.dll (TelGetNumericPolicy, TelIsRestrictivePolicySet, TelEvaluateActiveSettingAuthority, TelGetWerTelemetryMode).

```powershell
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\DataCollection : AllowTelemetry_PolicyManager
```
[Seems to be a fallback if `AllowTelemetry` isn't set.](https://github.com/TechTech512/Win11Src/blob/840a61919419c94ed24a9b079ee1029f482d29f2/NT/onecore/base/telemetry/permission/product/telemetrypermission.cpp#L106)

## Windows Policies

```json
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "AllowTelemetry",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0",
  "DisplayName": "Allow Diagnostic Data",
  "ExplainText": "By configuring this policy setting you can adjust what diagnostic data is collected from Windows. This policy setting also restricts the user from increasing the amount of diagnostic data collection via the Settings app. The diagnostic data collected under this policy impacts the operating system and apps that are considered part of Windows and does not apply to any additional apps installed by your organization. - Diagnostic data off (not recommended). Using this value, no diagnostic data is sent from the device. This value is only supported on Enterprise, Education, and Server editions. - Send required diagnostic data. This is the minimum diagnostic data necessary to keep Windows secure, up to date, and performing as expected. Using this value disables the \"Optional diagnostic data\" control in the Settings app. - Send optional diagnostic data. Additional diagnostic data is collected that helps us to detect, diagnose and fix issues, as well as make product improvements. Required diagnostic data will always be included when you choose to send optional diagnostic data. Optional diagnostic data can also include diagnostic log files and crash dumps. Use the \"Limit Dump Collection\" and the \"Limit Diagnostic Log Collection\" policies for more granular control of what optional diagnostic data is sent. If you disable or do not configure this policy setting, the device will send required diagnostic data and the end user can choose whether to send optional diagnostic data from the Settings app. Note: The \"Configure diagnostic data opt-in settings user interface\" group policy can be used to prevent end users from changing their data collection settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowTelemetry", "Items": [
        { "DisplayName": "Diagnostic data off (not recommended)", "Data": "0" },
        { "DisplayName": "Send required diagnostic data", "Data": "1" },
        { "DisplayName": "Send optional diagnostic data", "Data": "3" }
      ]
    }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffApplicationImpactTelemetry",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "Windows7",
  "DisplayName": "Turn off Application Telemetry",
  "ExplainText": "The policy controls the state of the Application Telemetry engine in the system. Application Telemetry is a mechanism that tracks anonymous usage of specific Windows system components by applications. Turning Application Telemetry off by selecting \"enable\" will stop the collection of usage data. If the customer Experience Improvement program is turned off, Application Telemetry will be turned off regardless of how this policy is set. Disabling telemetry will take effect on any newly launched applications. To ensure that telemetry collection has stopped for all applications, please reboot your machine.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "AITEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DisableOneSettingsDownloads",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7",
  "DisplayName": "Disable OneSettings Downloads",
  "ExplainText": "This policy setting controls whether Windows attempts to connect with the OneSettings service. If you enable this policy, Windows will not attempt to connect with the OneSettings Service. If you disable or don't configure this policy setting, Windows will periodically attempt to connect with the OneSettings service to download configuration settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableOneSettingsDownloads",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "LimitDiagnosticLogCollection",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7",
  "DisplayName": "Limit Diagnostic Log Collection",
  "ExplainText": "This policy setting controls whether additional diagnostic logs are collected when more information is needed to troubleshoot a problem on the device. Diagnostic logs are only sent when the device has been configured to send optional diagnostic data. By enabling this policy setting, diagnostic logs will not be collected. If you disable or do not configure this policy setting, we may occasionally collect diagnostic logs if the device has been configured to send optional diagnostic data.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "LimitDiagnosticLogCollection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DisableDiagnosticDataViewer",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS5",
  "DisplayName": "Disable diagnostic data viewer",
  "ExplainText": "This policy setting controls whether users can enable and launch the Diagnostic Data Viewer from the Diagnostic & feedback Settings page. If you enable this policy setting, the Diagnostic Data Viewer will not be enabled in Settings page, and it will prevent the viewer from showing diagnostic data collected by Microsoft from the device. If you disable or don't configure this policy setting, the Diagnostic Data Viewer will be enabled in Settings page.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableDiagnosticDataViewer",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "ConfigureTelemetryOptInSettingsUx",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Configure diagnostic data opt-in settings user interface",
  "ExplainText": "This policy setting determines whether an end user can change diagnostic data settings in the Settings app. If you set this policy setting to \"Disable diagnostic data opt-in settings\", diagnostic data settings are disabled in the Settings app. If you don't configure this policy setting, or you set it to \"Enable diagnostic data opt-in settings\", end users can change the device diagnostic settings in the Settings app. Note: To set a limit on the amount of diagnostic data that is sent to Microsoft by your organization, use the \"Allow Diagnostic Data\" policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableTelemetryOptInSettingsUx",
  "Elements": [
    { "Type": "Enum", "ValueName": "DisableTelemetryOptInSettingsUx", "Items": [
        { "DisplayName": "Disable diagnostic data opt-in settings", "Data": "1" },
        { "DisplayName": "Enable diagnostic data opt-in setings", "Data": "0" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "LimitDumpCollection",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7",
  "DisplayName": "Limit Dump Collection",
  "ExplainText": "This policy setting limits the type of dumps that can be collected when more information is needed to troubleshoot a problem. Dumps are only sent when the device has been configured to send optional diagnostic data. By enabling this setting, Windows Error Reporting is limited to sending kernel mini dumps and user mode triage dumps. If you disable or do not configure this policy setting, we may occasionally collect full or heap dumps if the user has opted to send optional diagnostic data.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "LimitDumpCollection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "LimitEnhancedDiagnosticDataWindowsAnalytics",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Limit optional diagnostic data for Desktop Analytics",
  "ExplainText": "This policy setting, in combination with the \"Allow Diagnostic Data\" policy setting, enables organizations to send the minimum data required by Desktop Analytics. To enable the behavior described above, complete the following steps: 1. Enable this policy setting 2. Set the \"Allow Diagnostic Data\" policy to \"Send optional diagnostic data\" 3. Enable the \"Limit Dump Collection\" policy 4. Enable the \"Limit Diagnostic Log Collection\" policy When these policies are configured, Microsoft will collect only required diagnostic data and the events required by Desktop Analytics, which can be viewed at https://go.microsoft.com/fwlink/?linkid=2116020. If you disable or do not configure this policy setting, diagnostic data collection is determined by the \"Allow Diagnostic Data\" policy setting or by the end user from the Settings app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "LimitEnhancedDiagnosticDataWindowsAnalytics",
  "Elements": [
    { "Type": "Enum", "ValueName": "LimitEnhancedDiagnosticDataWindowsAnalytics", "Items": [
        { "DisplayName": "Enable Desktop Analytics collection", "Data": "1" },
        { "DisplayName": "Disable Desktop Analytics collection", "Data": "0" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "AllowDeviceNameInDiagnosticData",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Allow device name to be sent in Windows diagnostic data",
  "ExplainText": "This policy allows the device name to be sent to Microsoft as part of Windows diagnostic data. If you disable or do not configure this policy setting, then device name will not be sent to Microsoft as part of Windows diagnostic data.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "AllowDeviceNameInTelemetry",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "ConfigureTelemetryOptInChangeNotification",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Configure diagnostic data opt-in change notifications",
  "ExplainText": "This policy setting controls whether notifications are shown, following a change to diagnostic data opt-in settings, on first logon and when the changes occur in settings. If you set this policy setting to \"Disable diagnostic data change notifications\", diagnostic data opt-in change notifications will not appear. If you set this policy setting to \"Enable diagnostic data change notifications\" or don't configure this policy setting, diagnostic data opt-in change notifications appear at first logon and when the changes occur in Settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableTelemetryOptInChangeNotification",
  "Elements": [
    { "Type": "Enum", "ValueName": "DisableTelemetryOptInChangeNotification", "Items": [
        { "DisplayName": "Disable diagnostic data change notifications", "Data": "1" },
        { "DisplayName": "Enable diagnostic data change notifications", "Data": "0" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffProgramInventory",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "Windows7",
  "DisplayName": "Turn off Inventory Collector",
  "ExplainText": "This policy setting controls the state of the Inventory Collector. The Inventory Collector inventories applications, files, devices, and drivers on the system and sends the information to Microsoft. This information is used to help diagnose compatibility problems. If you enable this policy setting, the Inventory Collector will be turned off and data will not be sent to Microsoft. Collection of installation data through the Program Compatibility Assistant is also disabled. If you disable or do not configure this policy setting, the Inventory Collector will be turned on. Note: This policy setting has no effect if the Customer Experience Improvement Program is turned off. The Inventory Collector will be off.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableInventory",
  "Elements": []
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DisableDeviceDelete",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS5 - At least Windows Server 2016, Windows 10 Version 1809",
  "DisplayName": "Disable deleting diagnostic data",
  "ExplainText": "This policy setting controls whether the Delete diagnostic data button is enabled in Diagnostic & feedback Settings page. If you enable this policy setting, the Delete diagnostic data button will be disabled in Settings page, preventing the deletion of diagnostic data collected by Microsoft from the device. If you disable or don't configure this policy setting, the Delete diagnostic data button will be enabled in Settings page, which allows people to erase all diagnostic data collected by Microsoft from that device.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableDeviceDelete",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatRemoveProgramCompatPropPage",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "WindowsNET - At least Windows Server 2003",
  "DisplayName": "Remove Program Compatibility Property Page",
  "ExplainText": "This policy controls the visibility of the Program Compatibility property page shell extension. This shell extension is visible on the property context-menu of any program shortcut or executable file. The compatibility property page displays a list of options that can be selected and applied to the application to resolve the most common issues affecting legacy applications. Enabling this policy setting removes the property page from the context-menus, but does not affect previous compatibility settings applied to application using this interface.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisablePropPage",
  "Elements": []
},
```

### Deprecated Policies

These [policies](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-system) are deprecated and will only work on Windows 10 version 1809. Setting this policy will have no effect for other supported versions of Windows.
```json
"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection": {
  "AllowCommercialDataPipeline": { "Type": "REG_DWORD", "Data": 0 },
  "AllowDesktopAnalyticsProcessing": { "Type": "REG_DWORD", "Data": 0 },
  "AllowUpdateComplianceProcessing": { "Type": "REG_DWORD", "Data": 0 },
  "AllowWUfBCloudProcessing": { "Type": "REG_DWORD", "Data": 0 }
},
```
