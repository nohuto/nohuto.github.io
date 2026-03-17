---
title: 'Application Compatibility'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-application-compatibility'
sidebar:
  order: 31
---

Disables Windows Application Experience telemetry and compatibility components, Microsoft Compatibility Appraiser (including its daily task and `CompatTelRunner.exe`) and the Application Experience tasks. It reduces telemetry, and some attack surface, but removes most automatic compatibility checks, upgrade assessments and some app related backup/recovery features.

`DisableAPISamping`, `DisableApplicationFootprint`, `DisableInstallTracing`, `DisableWin32AppBackup` will only work on 24H2 and above.

Currently includes all existing tasks in `\\Microsoft\\Windows\\Application Experience\\` (LTSC IoT Enterprise 2024):
```c
"\\Microsoft\\Windows\\Application Experience\\MareBackup",
"\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser",
"\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser Exp",
"\\Microsoft\\Windows\\Application Experience\\PcaPatchDbTask",
"\\Microsoft\\Windows\\Application Experience\\SdbinstMergeDbTask",
"\\Microsoft\\Windows\\Application Experience\\StartupAppTask"

//"\\Microsoft\\Windows\\Application Experience\\AitAgent",
//"\\Microsoft\\Windows\\Application Experience\\PcaWallpaperAppDetect",
```
```json
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffAPISamping",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off API Sampling",
  "ExplainText": "This policy controls the state of API Sampling. API Sampling monitors the sampled collection of application programming interfaces used during system runtime to help diagnose compatibility problems. If you enable this policy, API Sampling will not be run. If you disable or do not configure this policy, API Sampling will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableAPISamping",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffApplicationFootprint",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off Application Footprint",
  "ExplainText": "This policy controls the state of Application Footprint. Application Footprint monitors the sampled collection of registry and file usage to help diagnose compatibility problems. If you enable this policy, Application Footprint will not be run. If you disable or do not configure this policy, Application Footprint will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableApplicationFootprint",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffEngine",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "WindowsNET - At least Windows Server 2003",
  "DisplayName": "Turn off Application Compatibility Engine",
  "ExplainText": "This policy controls the state of the application compatibility engine in the system. The engine is part of the loader and looks through a compatibility database every time an application is started on the system. If a match for the application is found it provides either run-time solutions or compatibility fixes, or displays an Application Help message if the application has a know problem. Turning off the application compatibility engine will boost system performance. However, this will degrade the compatibility of many popular legacy applications, and will not block known incompatible applications from installing. (For Instance: This may result in a blue screen if an old anti-virus application is installed.) The Windows Resource Protection and User Account Control features of Windows use the application compatibility engine to provide mitigations for application problems. If the engine is turned off, these mitigations will not be applied to applications and their installers and these applications may fail to install or run properly. This option is useful to server administrators who require faster performance and are aware of the compatibility of the applications they are using. It is particularly useful for a web server where applications may be launched several hundred times a second, and the performance of the loader is essential. NOTE: Many system processes cache the value of this setting for performance reasons. If you make changes to this setting, please reboot to ensure that your system accurately reflects those changes.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableEngine",
  "Elements": []
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffInstallTracing",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off Install Tracing",
  "ExplainText": "This policy controls the state of Install Tracing. Install Tracing is a mechanism that tracks application installs to help diagnose compatibility problems. If you enable this policy, Install Tracing will not be run. If you disable or do not configure this policy, Install Tracing will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableInstallTracing",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffProgramCompatibilityAssistant_1",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Turn off Program Compatibility Assistant",
  "ExplainText": "This setting exists only for backward compatibility, and is not valid for this version of Windows. To configure the Program Compatibility Assistant, use the 'Turn off Program Compatibility Assistant' setting under Computer Configuration\\Administrative Templates\\Windows Components\\Application Compatibility.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisablePCA",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "pca.admx",
  "CategoryName": "PcaScenarioCategory",
  "PolicyName": "DisablePcaUIPolicy",
  "NameSpace": "Microsoft.Policies.ApplicationDiagnostics",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Detect compatibility issues for applications and drivers",
  "ExplainText": "This policy setting configures the Program Compatibility Assistant (PCA) to diagnose failures with application and driver compatibility. If you enable this policy setting, the PCA is configured to detect failures during application installation, failures during application runtime, and drivers blocked due to compatibility issues. When failures are detected, the PCA will provide options to run the application in a compatibility mode or get help online through a Microsoft website. If you disable this policy setting, the PCA does not detect compatibility issues for applications and drivers. If you do not configure this policy setting, the PCA is configured to detect failures during application installation, failures during application runtime, and drivers blocked due to compatibility issues. Note: This policy setting has no effect if the \"Turn off Program Compatibility Assistant\" policy setting is enabled. The Diagnostic Policy Service (DPS) and Program Compatibility Assistant Service must be running for the PCA to run. These services can be configured by using the Services snap-in to the Microsoft Management Console.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisablePcaUI",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffWin32AppBackup",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off compatibility scan for backed up applications",
  "ExplainText": "This policy controls the state of the compatibility scan for backed up applications. The compatibility scan for backed up applications evaluates for compatibility problems in installed applications. If you enable this policy, the compatibility scan for backed up applications will not be run. If you disable or do not configure this policy, the compatibility scan for backed up applications will be run.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableWin32AppBackup",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffSwitchBack",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Turn off SwitchBack Compatibility Engine",
  "ExplainText": "The policy controls the state of the Switchback compatibility engine in the system. Switchback is a mechanism that provides generic compatibility mitigations to older applications by providing older behavior to old applications and new behavior to new applications. Switchback is on by default. If you enable this policy setting, Switchback will be turned off. Turning Switchback off may degrade the compatibility of older applications. This option is useful for server administrators who require performance and are aware of compatibility of the applications they are using. If you disable or do not configure this policy setting, the Switchback will be turned on. Please reboot the system after changing the setting to ensure that your system accurately reflects those changes.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "SbEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```
