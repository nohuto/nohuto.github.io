---
title: 'WER'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 3
---

[WER](https://learn.microsoft.com/en-us/windows/win32/wer/wer-settings) (Windows Error Reporting) sends error logs to Microsoft, disabling it keeps error data local.

WER is implemented by the WerSvc service and Wer.dll/Faultrep.dll, crashed processes connect to the service over an ALPC port to generate reports and dumps. Disabling WER stops that reporting part.

`\Microsoft\Windows\Windows Error Reporting : QueueReporting` would run `%windir%\system32\wermgr.exe -upload`. `Error-Reporting.txt` shows a trace of `\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting`.

[WER network endpoints](https://learn.microsoft.com/en-us/troubleshoot/windows-client/system-management-components/windows-error-reporting-diagnostics-enablement-guidance#configure-network-endpoints-to-be-allowed):
```
0.0.0.0 watson.microsoft.com
0.0.0.0 watson.telemetry.microsoft.com
0.0.0.0 umwatsonc.events.data.microsoft.com
0.0.0.0 ceuswatcab01.blob.core.windows.net
0.0.0.0 ceuswatcab02.blob.core.windows.net
0.0.0.0 eaus2watcab01.blob.core.windows.net
0.0.0.0 eaus2watcab02.blob.core.windows.net
0.0.0.0 weus2watcab01.blob.core.windows.net
0.0.0.0 weus2watcab02.blob.core.windows.net
```
`DisableSendRequestAdditionalSoftwareToWER`: "Prevent Windows from sending an error report when a device driver requests additional software during installation"
`DisableSendGenericDriverNotFoundToWER`: "Do not send a Windows error report when a generic driver is installed on a device"

- [privacy/assets | wer-PciGetSystemWideHackFlagsFromRegistry.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/wer-PciGetSystemWideHackFlagsFromRegistry.c)

## Suboption

`Disable DHA Report`:  
> "*This group policy enables Device Health Attestation reporting (DHA-report) on supported devices. It enables supported devices to send Device Health Attestation related information (device boot logs, PCR values, TPM certificate, etc.) to Device Health Attestation Service (DHA-Service) every time a device starts. Device Health Attestation Service validates the security state and health of the devices, and makes the findings accessible to enterprise administrators via a cloud based reporting portal. This policy is independent of DHA reports that are initiated by device manageability solutions (like MDM or SCCM), and will not interfere with their workflows.*"

`Disable Persistent System Timestamp`:

Disables the Reliability policy that periodically writes the current system time to disk. Windows uses that persistent timestamp as a "last known alive" time so Reliability Monitor / WER can estimate when an unexpected shutdown, power loss, hard reset, or crash happened (see policies below).

> "*This policy setting allows the system to detect the time of unexpected shutdowns by writing the current time to disk on a schedule controlled by the Timestamp Interval. If you enable this policy setting, you are able to specify how often the Persistent System Timestamp is refreshed and subsequently written to the disk. You can specify the Timestamp Interval in seconds. If you disable this policy setting, the Persistent System Timestamp is turned off and the timing of unexpected shutdowns is not recorded. If you do not configure this policy setting, the Persistent System Timestamp is refreshed according the default, which is every 60 seconds beginning with Windows Server 2003. Note: This feature might interfere with power configuration settings that turn off hard disks after a period of inactivity. These power settings may be accessed in the Power Options Control Panel.*"

```c
if ( !RegQueryValueExW(hKey[0], "TimeStampEnabled", 0LL, 0LL, (LPBYTE)&Data, &cbData) )
if ( !RegQueryValueExW(hKey[0], "TimeStampInterval", 0LL, 0LL, (LPBYTE)&v4, &cbData) && v4 <= 0x15180 ) // 86400 seconds = 24h?
```

`TimeStampInterval` under `HKLM\Software\Policies\Microsoft\Windows NT\Reliability` is in seconds, the value under `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Reliability` is read as minutes and multiplied by 60.

- [system/assets | timestamp-OsEventsTimestampInterval.c](https://github.com/nohuto/win-config/blob/main/system/assets/timestamp-OsEventsTimestampInterval.c)

## Miscellaneous Notes

`EnableWerUserReporting`  
Default: `1` (`DbgkEnableWerUserReporting dd 1`)

```powershell
"Session Manager\Kernel","EnableWerUserReporting","0xFFFFF800CF1C335C","0x00000000","0x00000000","0x00000000"
```

Related to [PCIe advanced error reporting](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ns-wdm-_pci_express_rootport_aer_capability)? Haven't informed myself about it yet, therefore ignore it:
```
\Registry\Machine\SYSTEM\ControlSet001\Control\PnP\pci : AerMultiErrorDisabled
```
Default is `0`, non zero would enable the behaviour? The value doesn't exist by default.

```
\Registry\Machine\SYSTEM\ControlSet001\Control\StorPort : TelemetryErrorDataEnabled
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager\Memory Management : PeriodicTelemetryReportFrequency
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceInstall_GenericDriverSendToWER",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows_10_0_RS3ToVista - Windows Server 2016 Version 1709, Windows 10 Version 1709, Windows Server 2016 Version 1703, Windows 10 Version 1703, Windows 10, Windows 8.1, Windows 8, Windows 7, and Windows Vista only",
  "DisplayName": "Do not send a Windows error report when a generic driver is installed on a device",
  "ExplainText": "Windows has a feature that sends \"generic-driver-installed\" reports through the Windows Error Reporting infrastructure. This policy allows you to disable the feature. If you enable this policy setting, an error report is not sent when a generic driver is installed. If you disable or do not configure this policy setting, an error report is sent when a generic driver is installed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall\\Settings"
  ],
  "ValueName": "DisableSendGenericDriverNotFoundToWER",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceInstall_RequestAdditionalSoftwareSendToWER",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows_10_0_RS3ToWindows7 - Windows Server 2016 Version 1709, Windows 10 Version 1709, Windows Server 2016 Version 1703, Windows 10 Version 1703, Windows 10, Windows 8.1, Windows 8, and Windows 7 only",
  "DisplayName": "Prevent Windows from sending an error report when a device driver requests additional software during installation",
  "ExplainText": "Windows has a feature that allows a device driver to request additional software through the Windows Error Reporting infrastructure. This policy allows you to disable the feature. If you enable this policy setting, Windows will not send an error report to request additional software even if this is specified by the device driver. If you disable or do not configure this policy setting, Windows sends an error report when a device driver that requests additional software is installed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall\\Settings"
  ],
  "ValueName": "DisableSendRequestAdditionalSoftwareToWER",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerDisable_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Disable Windows Error Reporting",
  "ExplainText": "This policy setting turns off Windows Error Reporting, so that reports are not collected or sent to either Microsoft or internal servers within your organization when software unexpectedly stops working or fails. If you enable this policy setting, Windows Error Reporting does not send any problem information to Microsoft. Additionally, solution information is not available in Security and Maintenance in Control Panel. If you disable or do not configure this policy setting, the Turn off Windows Error Reporting policy setting in Computer Configuration/Administrative Templates/System/Internet Communication Management/Internet Communication settings takes precedence. If Turn off Windows Error Reporting is also either disabled or not configured, user settings in Control Panel for Windows Error Reporting are applied.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "Disabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerNoLogging_1",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Disable logging",
  "ExplainText": "This policy setting controls whether Windows Error Reporting saves its own events and error messages to the system event log. If you enable this policy setting, Windows Error Reporting events are not recorded in the system event log. If you disable or do not configure this policy setting, Windows Error Reporting events and errors are logged to the system event log, as with other Windows-based programs.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "LoggingDisabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerAutoApproveOSDumps_1",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3only - Windows Server 2012 R2, Windows 8.1 or Windows RT 8.1 only",
  "DisplayName": "Automatically send memory dumps for OS-generated error reports",
  "ExplainText": "This policy setting controls whether memory dumps in support of OS-generated error reports can be sent to Microsoft automatically. This policy does not apply to error reports generated by 3rd-party products, or additional data other than memory dumps. If you enable or do not configure this policy setting, any memory dumps generated for error reports by Microsoft Windows are automatically uploaded, without notification to the user. If you disable this policy setting, then all memory dumps are uploaded according to the default consent and notification settings.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "AutoApproveOSDumps",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerAutoApproveOSDumps_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3only - Windows Server 2012 R2, Windows 8.1 or Windows RT 8.1 only",
  "DisplayName": "Automatically send memory dumps for OS-generated error reports",
  "ExplainText": "This policy setting controls whether memory dumps in support of OS-generated error reports can be sent to Microsoft automatically. This policy does not apply to error reports generated by 3rd-party products, or additional data other than memory dumps. If you enable or do not configure this policy setting, any memory dumps generated for error reports by Microsoft Windows are automatically uploaded, without notification to the user. If you disable this policy setting, then all memory dumps are uploaded according to the default consent and notification settings.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "AutoApproveOSDumps",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "TPM.admx",
  "CategoryName": "DSHACategory",
  "PolicyName": "OptIntoDSHA_Name",
  "NameSpace": "Microsoft.Policies.TrustedPlatformModule",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Enable Device Health Attestation Monitoring and Reporting",
  "ExplainText": "This group policy enables Device Health Attestation reporting (DHA-report) on supported devices. It enables supported devices to send Device Health Attestation related information (device boot logs, PCR values, TPM certificate, etc.) to Device Health Attestation Service (DHA-Service) every time a device starts. Device Health Attestation Service validates the security state and health of the devices, and makes the findings accessible to enterprise administrators via a cloud based reporting portal. This policy is independent of DHA reports that are initiated by device manageability solutions (like MDM or SCCM), and will not interfere with their workflows.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\DeviceHealthAttestationService"
  ],
  "ValueName": "EnableDeviceHealthAttestationService",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Reliability.admx",
  "CategoryName": "System",
  "PolicyName": "EE_EnablePersistentTimeStamp",
  "NameSpace": "Microsoft.Policies.Reliability",
  "Supported": "WindowsNET - At least Windows Server 2003",
  "DisplayName": "Enable Persistent Time Stamp",
  "ExplainText": "This policy setting allows the system to detect the time of unexpected shutdowns by writing the current time to disk on a schedule controlled by the Timestamp Interval. If you enable this policy setting, you are able to specify how often the Persistent System Timestamp is refreshed and subsequently written to the disk. You can specify the Timestamp Interval in seconds. If you disable this policy setting, the Persistent System Timestamp is turned off and the timing of unexpected shutdowns is not recorded. If you do not configure this policy setting, the Persistent System Timestamp is refreshed according the default, which is every 60 seconds beginning with Windows Server 2003. Note: This feature might interfere with power configuration settings that turn off hard disks after a period of inactivity. These power settings may be accessed in the Power Options Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Reliability"
  ],
  "ValueName": "TimeStampEnabled",
  "Elements": [
    { "Type": "Decimal", "ValueName": "TimeStampInterval", "MinValue": "1", "MaxValue": "86400" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
