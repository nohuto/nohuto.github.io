---
title: 'General Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 2
---

Prevents sending info about your computer to microsoft, disables the diagnostic log collection, bluetooth ads (`DataCollection.admx`), the inventory collector. It disables the ads ID ("Windows creates a unique advertising ID per user, allowing apps and ad networks to deliver targeted ads. When enabled, it works like a cookie, linking personal data to the ID for personalized ads. This setting only affects Windows apps using the advertising ID, not web-based ads or third-party methods.") which should be disabled by default, if you toggled all options off in the OS installation phase. See policy explanations below for more details.

It's also recommended to apply the '[Microsoft (Windows, Office, MSN)](https://github.com/hagezi/dns-blocklists#calling-native-tracker---broadband-tracker-of-devices-services-and-operating-systems-)' blocklist via the hosts file (you can use [blocklist-mgr](https://github.com/nohuto/blocklist-mgr) for that), or if you've a private DNS server, add that list to it.

## DiagnosticDataSettings Values

Based on 23H2 [`DiagnosticDataSettings`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/DiagnosticDataSettings) pseudocode (see list below). I've also looked through values within `DiagSvc.dll`/`DiagTrack.dll` but beside `CEIPEnable`/`EnableDiagnostics` they don't include anything interesting.

```c
"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack";
    "RedirectedRegistryRoot" = "Software\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack"; // REG_SZ

"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack\\RegionalSettings";
    "IsProcessorMode" = 0; // REG_QWORD, only lets Windows report diagnostic data processor mode when data is exactly 1

"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection";
    "AllowTelemetry" = 1; // REG_DWORD, 2 normalized to 1, 3  = diagnostic, >3 not clamped
    "MaxTelemetryAllowed" = ?; // REG_DWORD

"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection\\Users\\<subkey>";
    "AllowTelemetry" = ?; // REG_DWORD, per user group policy value
    "AllowTelemetry_PolicyManager" = ?; // REG_DWORD

"HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection";
    "AllowTelemetry" = ?; // REG_DWORD, data 0/1/2/3 as above, >3 not clamped
    "LimitDumpCollection" = 0; // REG_DWORD, used when active telemetry is 2/3
    "LimitEnhancedDiagnosticDataWindowsAnalytics" = 0; // REG_DWORD
    "DisableTelemetryOptInChangeNotification" = 0; // REG_DWORD
    "DisableTelemetryOptInSettingsUx" = 0; // REG_DWORD
    "DisableDeviceDelete" = 0; // REG_DWORD
    "DisableDiagnosticDataViewer" = 0; // REG_DWORD
    "AllowCommercialDataPipeline" = 0; // REG_DWORD
    "LimitDiagnosticLogCollection" = 0; // REG_DWORD
    "DisableEnterpriseAuthProxy" = 0; // REG_DWORD
    "AllowDeviceNameInDiagnosticData" = 0; // REG_DWORD
    "DisableOneSettingsDownloads" = 0; // REG_DWORD
    "EnableOneSettingsAuditing" = 0; // REG_DWORD
    "ConfigureMicrosoft365UploadEndpoint" = ?; // REG_SZ

"HKLM\\OFFLINE_AUTH\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack";
    "DiagTrackAuthorization" = 0; // REG_DWORD

"HKLM\\OFFLINE_AUTH\\Policies\\Microsoft\\Windows\\DataCollection";
    "LimitDumpCollection" = 0; // REG_DWORD
```

- [`TelpReadLocalSetting`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelpReadLocalSetting.c)
- [`TelpReadGroupPolicySetting`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelpReadGroupPolicySetting.c)
- [`TelpReadMdmSetting`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelpReadMdmSetting.c)
- [`TelpReadUsersPolicySetting`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelpReadUsersPolicySetting.c)
- [`TelEvaluateActiveSettingAuthority`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelEvaluateActiveSettingAuthority.c)
- [`TelGetMaximumAllowedTelemetryLevel`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelGetMaximumAllowedTelemetryLevel.c)
- [`TelGetNumericPolicy`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelGetNumericPolicy.c)
- [`TelGetWerTelemetryMode`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelGetWerTelemetryMode.c)
- [`TelpGetTelemetryClientRegPath`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/-TelpGetTelemetryClientRegPath@@YAPEAGXZ.c)
- [`TelIsOsInProcessorMode`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelIsOsInProcessorMode.c)
- [`TelpReadOfflineOsPolicySetting`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelpReadOfflineOsPolicySetting.c)
- [`TelGetWerTelemetryModeWinRE`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/DiagnosticDataSettings/TelGetWerTelemetryModeWinRE.c)

### Boot Capture

See [23H2.txt](https://raw.githubusercontent.com/nohuto/regkit/refs/heads/main/records/23H2.txt) ([24H2](https://raw.githubusercontent.com/nohuto/regkit/refs/heads/main/records/24H2.txt)/[25H2](https://raw.githubusercontent.com/nohuto/regkit/refs/heads/main/records/25H2.txt) don't include more than that).

```
\Registry\Machine\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection : AllowTelemetry
\Registry\Machine\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection : CommercialId
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : AllowDeviceNameInTelemetry
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : AllowTelemetry
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : AllowTelemetry_PolicyManager
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : CommercialId
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : DisableEnterpriseAuthProxy
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : DisableTelemetryOptInChangeNotification
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : LimitDiagnosticLogCollection
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : LimitDumpCollection
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : TelemetryProxyServer
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\DataCollection : TelemetryProxyServer_PolicyManager
\Registry\User\<CURRENT_USER_SID>\SOFTWARE\Policies\Microsoft\Windows\DataCollection : AllowTelemetry
\Registry\User\<CURRENT_USER_SID>\SOFTWARE\Policies\Microsoft\Windows\DataCollection : AllowTelemetry_PolicyManager
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off Application Telemetry](https://noverse.dev/policies?p=AppCompat*AppCompatTurnOffApplicationImpactTelemetry) | `HKLM\Software\Policies\Microsoft\Windows\AppCompat` | `AITEnable` |
| [Turn off Inventory Collector](https://noverse.dev/policies?p=AppCompat*AppCompatTurnOffProgramInventory) | `HKLM\Software\Policies\Microsoft\Windows\AppCompat` | `DisableInventory` |
| [Allow Diagnostic Data](https://noverse.dev/policies?p=DataCollection*AllowTelemetry) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection`<br>`HKCU\Software\Policies\Microsoft\Windows\DataCollection` | `AllowTelemetry` |
| [Configure Authenticated Proxy usage for the Connected User Experience and Telemetry service](https://noverse.dev/policies?p=DataCollection*DisableEnterpriseAuthProxy) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DisableEnterpriseAuthProxy` |
| [Limit optional diagnostic data for Desktop Analytics](https://noverse.dev/policies?p=DataCollection*LimitEnhancedDiagnosticDataWindowsAnalytics) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `LimitEnhancedDiagnosticDataWindowsAnalytics` |
| [Allow device name to be sent in Windows diagnostic data](https://noverse.dev/policies?p=DataCollection*AllowDeviceNameInDiagnosticData) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `AllowDeviceNameInTelemetry` |
| [Configure diagnostic data opt-in settings user interface](https://noverse.dev/policies?p=DataCollection*ConfigureTelemetryOptInSettingsUx) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DisableTelemetryOptInSettingsUx` |
| [Configure diagnostic data opt-in change notifications](https://noverse.dev/policies?p=DataCollection*ConfigureTelemetryOptInChangeNotification) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DisableTelemetryOptInChangeNotification` |
| [Disable deleting diagnostic data](https://noverse.dev/policies?p=DataCollection*DisableDeviceDelete) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DisableDeviceDelete` |
| [Disable diagnostic data viewer](https://noverse.dev/policies?p=DataCollection*DisableDiagnosticDataViewer) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DisableDiagnosticDataViewer` |
| [Limit Diagnostic Log Collection](https://noverse.dev/policies?p=DataCollection*LimitDiagnosticLogCollection) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `LimitDiagnosticLogCollection` |
| [Limit Dump Collection](https://noverse.dev/policies?p=DataCollection*LimitDumpCollection) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `LimitDumpCollection` |
| [Configure the Commercial ID](https://noverse.dev/policies?p=DataCollection*CommercialIdPolicy) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `CommercialId` |
| [Turn off the advertising ID](https://noverse.dev/policies?p=UserProfiles*DisableAdvertisingId) | `HKLM\Software\Policies\Microsoft\Windows\AdvertisingInfo` | `DisabledByGroupPolicy` |
