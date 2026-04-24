---
title: 'WER'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 37
---

[WER](https://learn.microsoft.com/en-us/windows/win32/wer/wer-settings) (Windows Error Reporting) sends error logs to Microsoft, disabling it keeps error data local.

Windows Internals (E7-P2, WER): WER is implemented by the WerSvc service and Wer.dll/Faultrep.dll, crashed processes connect to the service over an ALPC port to generate reports and dumps. Disabling WER stops that reporting pipeline.

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

> [privacy/assets | wer-PciGetSystemWideHackFlagsFromRegistry.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/wer-PciGetSystemWideHackFlagsFromRegistry.c)

## Suboption

`Disable DHA Report`:  
"This group policy enables Device Health Attestation reporting (DHA-report) on supported devices. It enables supported devices to send Device Health Attestation related information (device boot logs, PCR values, TPM certificate, etc.) to Device Health Attestation Service (DHA-Service) every time a device starts. Device Health Attestation Service validates the security state and health of the devices, and makes the findings accessible to enterprise administrators via a cloud based reporting portal. This policy is independent of DHA reports that are initiated by device manageability solutions (like MDM or SCCM), and will not interfere with their workflows."

## Miscellaneous Notes  

```c
`EnableWerUserReporting`  
Default: `1` (`DbgkEnableWerUserReporting dd 1`)

"Session Manager\Kernel","EnableWerUserReporting","0xFFFFF800CF1C335C","0x00000000","0x00000000","0x00000000"
```

Related to [PCIe advanced error reporting](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ns-wdm-_pci_express_rootport_aer_capability)? Haven't found anything on this and haven't done much research myself:
```
\Registry\Machine\SYSTEM\ControlSet001\Control\PnP\pci : AerMultiErrorDisabled
```
Default is `0`, non zero would enable the behaviour? The value doesn't exist by default.

```
\Registry\Machine\SYSTEM\ControlSet001\Control\StorPort : TelemetryErrorDataEnabled
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager\Memory Management : PeriodicTelemetryReportFrequency
```

## Windows Policies

```json
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "PCH_ShowUI",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsNET_XP",
  "DisplayName": "Display Error Notification",
  "ExplainText": "This policy setting controls whether users are shown an error dialog box that lets them report an error. If you enable this policy setting, users are notified in a dialog box that an error has occurred, and can display more details about the error. If the Configure Error Reporting policy setting is also enabled, the user can also report the error. If you disable this policy setting, users are not notified that errors have occurred. If the Configure Error Reporting policy setting is also enabled, errors are reported, but users receive no notification. Disabling this policy setting is useful for servers that do not have interactive users. If you do not configure this policy setting, users can change this setting in Control Panel, which is set to enable notification by default on computers that are running Windows XP Personal Edition and Windows XP Professional Edition, and disable notification by default on computers that are running Windows Server. See also the Configure Error Reporting policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\PCHealth\\ErrorReporting"
  ],
  "ValueName": "ShowUI",
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
  "Supported": "WindowsVista",
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
  "PolicyName": "WerAutoApproveOSDumps_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3only",
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
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerNoLogging_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Disable logging",
  "ExplainText": "This policy setting controls whether Windows Error Reporting saves its own events and error messages to the system event log. If you enable this policy setting, Windows Error Reporting events are not recorded in the system event log. If you disable or do not configure this policy setting, Windows Error Reporting events and errors are logged to the system event log, as with other Windows-based programs.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
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
  "PolicyName": "WerNoSecondLevelData_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Do not send additional data",
  "ExplainText": "This policy setting controls whether additional data in support of error reports can be sent to Microsoft automatically. If you enable this policy setting, any additional data requests from Microsoft in response to a Windows Error Reporting report are automatically declined, without notification to the user. If you disable or do not configure this policy setting, then consent policy settings in Computer Configuration/Administrative Templates/Windows Components/Windows Error Reporting/Consent take precedence.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "DontSendAdditionalData",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingConsent",
  "PolicyName": "WerDefaultConsent_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3ToVista",
  "DisplayName": "Configure Default consent",
  "ExplainText": "This policy setting determines the default consent behavior of Windows Error Reporting. If you enable this policy setting, you can set the default consent handling for error reports. The following list describes the Consent level settings that are available in the pull-down menu in this policy setting: - Always ask before sending data: Windows prompts users for consent to send reports. - Send parameters: Only the minimum data that is required to check for an existing solution is sent automatically, and Windows prompts users for consent to send any additional data that is requested by Microsoft. - Send parameters and safe additional data: the minimum data that is required to check for an existing solution, along with data which Windows has determined (within a high probability) does not contain personally-identifiable information is sent automatically, and Windows prompts the user for consent to send any additional data that is requested by Microsoft. - Send all data: any error reporting data requested by Microsoft is sent automatically. If this policy setting is disabled or not configured, then the consent level defaults to the highest-privacy setting: Always ask before sending data.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting\\Consent"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "DefaultConsent", "Items": [
        { "DisplayName": "Always ask before sending data", "Data": "1" },
        { "DisplayName": "Send parameters", "Data": "2" },
        { "DisplayName": "Send parameters and safe additional data", "Data": "3" },
        { "DisplayName": "Send all data", "Data": "4" }
      ]
    }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingConsent",
  "PolicyName": "WerConsentOverride_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Ignore custom consent settings",
  "ExplainText": "This policy setting determines the behavior of the Configure Default Consent setting in relation to custom consent settings. If you enable this policy setting, the default consent levels of Windows Error Reporting always override any other consent policy setting. If you disable or do not configure this policy setting, custom consent policy settings for error reporting determine the consent level for specified event types, and the default consent setting determines only the consent level of any other error reports.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting\\Consent"
  ],
  "ValueName": "DefaultOverrideBehavior",
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
  "Supported": "Windows_10_0_RS3ToWindows7",
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
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceInstall_GenericDriverSendToWER",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows_10_0_RS3ToVista",
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
  "File": "TPM.admx",
  "CategoryName": "DSHACategory",
  "PolicyName": "OptIntoDSHA_Name",
  "NameSpace": "Microsoft.Policies.TrustedPlatformModule",
  "Supported": "Windows_10_0_RS3",
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
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingAdvanced",
  "PolicyName": "WerArchive_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Configure Report Archive",
  "ExplainText": "This policy setting controls the behavior of the Windows Error Reporting archive. If you enable this policy setting, you can configure Windows Error Reporting archiving behavior. If Archive behavior is set to Store all, all data collected for each error report is stored in the appropriate location. If Archive behavior is set to Store parameters only, only the minimum information required to check for an existing solution is stored. The Maximum number of reports to store setting determines how many reports are stored before older reports are automatically deleted. If you disable or do not configure this policy setting, no Windows Error Reporting information is stored.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "DisableArchive",
  "Elements": [
    { "Type": "Enum", "ValueName": "ConfigureArchive", "Items": [
        { "DisplayName": "Store all", "Data": "2" },
        { "DisplayName": "Store parameters only", "Data": "1" }
      ]
    },
    { "Type": "Decimal", "ValueName": "MaxArchiveCount", "MinValue": null, "MaxValue": "5000" },
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```
