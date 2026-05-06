---
title: 'Windows Defender'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 1
---

## [Current Defender Status](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/microsoft-defender-antivirus-windows.md#use-powershell-to-check-the-status-of-microsoft-defender-antivirus)

1. Select the **Start** menu, and begin typing `PowerShell`. Then open Windows PowerShell in the results.
2. Type `Get-MpComputerStatus`.
3. In the list of results, look at the **AMRunningMode** row.
   - **Normal** means Microsoft Defender Antivirus is running in active mode.
   - **Passive mode** means Microsoft Defender Antivirus running, but isn't the primary antivirus/anti-malware product on your device. Passive mode is only available for devices that are onboarded to Microsoft Defender for Endpoint and that meet certain requirements. To learn more, see [Requirements for Microsoft Defender Antivirus to run in passive mode](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/microsoft-defender-antivirus-compatibility.md#requirements-for-microsoft-defender-antivirus-to-run-in-passive-mode).
   - **EDR Block Mode** means Microsoft Defender Antivirus is running and [Endpoint detection and response (EDR) in block mode](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/edr-in-block-mode.md), a capability in Microsoft Defender for Endpoint, is enabled. Check the **ForceDefenderPassiveMode** registry key. If its value is 0, it's running in normal mode; otherwise, it's running in passive mode.
   - **SxS Passive Mode** means Microsoft Defender Antivirus is running alongside another antivirus/anti-malware product, and [limited periodic scanning is used](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/limited-periodic-scanning-microsoft-defender-antivirus.md).

## Privacy Preset (`Configured`)

This is my preset which keeps Defender enabled but turning off privacy sensitive (cloud/reporting...) parts:
- Defender core AV enabled
- Real-time / on-access / IOAV / behavior monitoring enabled
- PUA set to `Block`
- MAPS reporting disabled
- sample submission set to `Never send`
- Block at First Sight disabled
- extended cloud check disabled
- cloud block level left at default
- Network Protection disabled
- Controlled Folder Access disabled
- SmartScreen disabled
- Email scanning disabled
- Enhanced Phishing Protection disabled
- [Defender core telemetry](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/microsoft-defender-core-service-overview.md) disabled (`DisableCoreServiceTelemetry` = true: "*The Microsoft Defender Core service doesn't collect telemetry from Microsoft Defender Antivirus and other Defender software. Disabling this setting can impact Microsoft's ability to quickly recognize and address problems, such as slow performance and false positives*")
- [Defender core ECS integration](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/microsoft-defender-core-service-overview.md) disabled (ECS = Experimentation and Configuration Service)

If using [`native.winoffice.txt`](https://github.com/hagezi/dns-blocklists/blob/main/adblock/native.winoffice.txt) ECS won't function properly, since it [has to receive payload](https://github.com/MicrosoftDocs/defender-docs/blob/public/defender-endpoint/microsoft-defender-core-service-configurations-and-experimentation.md) from:

- Enterprise customers should allow the following URLs:
  - `*.events.data.microsoft.com`
  - `*.endpoint.security.microsoft.com`
  - `*.ecs.office.com`

- Enterprise U.S. Government customers should allow the following URLs:
  - `*.events.data.microsoft.com`
  - `*.endpoint.security.microsoft.us` (GCC-H & DoD)
  - `*.gccmod.ecs.office.com` (GCC-M)
  - `*.config.ecs.gov.teams.microsoft.us` (GCC-H)
  - `*.config.ecs.dod.teams.microsoft.us` (DoD)

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "MicrosoftEdge.admx",
  "CategoryName": "MicrosoftEdge",
  "PolicyName": "AllowSmartScreen",
  "NameSpace": "Microsoft.Policies.MicrosoftEdge",
  "Supported": "INTERNET_BROWSER_WIN10 - Microsoft Edge on Windows 10 or later",
  "DisplayName": "Configure Windows Defender SmartScreen",
  "ExplainText": "This policy setting lets you configure whether to turn on Windows Defender SmartScreen. Windows Defender SmartScreen provides warning messages to help protect your employees from potential phishing scams and malicious software. By default, Windows Defender SmartScreen is turned on. If you enable this setting, Windows Defender SmartScreen is turned on and employees can't turn it off. If you disable this setting, Windows Defender SmartScreen is turned off and employees can't turn it on. If you don't configure this setting, employees can choose whether to use Windows Defender SmartScreen.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\MicrosoftEdge\\PhishingFilter",
    "HKCU\\Software\\Policies\\Microsoft\\MicrosoftEdge\\PhishingFilter"
  ],
  "ValueName": "EnabledV9",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SmartScreen.admx",
  "CategoryName": "Shell",
  "PolicyName": "ShellConfigureSmartScreen",
  "NameSpace": "Microsoft.Policies.SmartScreen",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Configure Windows Defender SmartScreen",
  "ExplainText": "This policy allows you to turn Windows Defender SmartScreen on or off. SmartScreen helps protect PCs by warning users before running potentially malicious programs downloaded from the Internet. This warning is presented as an interstitial dialog shown before running an app that has been downloaded from the Internet and is unrecognized or known to be malicious. No dialog is shown for apps that do not appear to be suspicious. Some information is sent to Microsoft about files and programs run on PCs with this feature enabled. If you enable this policy, SmartScreen will be turned on for all users. Its behavior can be controlled by the following options: \u2022 Warn and prevent bypass \u2022 Warn If you enable this policy with the \"Warn and prevent bypass\" option, SmartScreen's dialogs will not present the user with the option to disregard the warning and run the app. SmartScreen will continue to show the warning on subsequent attempts to run the app. If you enable this policy with the \"Warn\" option, SmartScreen's dialogs will warn the user that the app appears suspicious, but will permit the user to disregard the warning and run the app anyway. SmartScreen will not warn the user again for that app if the user tells SmartScreen to run the app. If you disable this policy, SmartScreen will be turned off for all users. Users will not be warned if they try to run suspicious apps from the Internet. If you do not configure this policy, SmartScreen will be enabled by default, but users may change their settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableSmartScreen",
  "Elements": [
    { "Type": "Enum", "ValueName": "ShellSmartScreenLevel", "Items": [
        { "DisplayName": "Warn and prevent bypass", "Data": "Block" },
        { "DisplayName": "Warn", "Data": "Warn" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SmartScreen.admx",
  "CategoryName": "Edge",
  "PolicyName": "EdgeConfigureSmartScreen",
  "NameSpace": "Microsoft.Policies.SmartScreen",
  "Supported": "INTERNET_BROWSER_WIN10 - Microsoft Edge on Windows 10 or later",
  "DisplayName": "Configure Windows Defender SmartScreen",
  "ExplainText": "This policy setting lets you configure whether to turn on Windows Defender SmartScreen. Windows Defender SmartScreen provides warning messages to help protect your employees from potential phishing scams and malicious software. By default, Windows Defender SmartScreen is turned on. If you enable this setting, Windows Defender SmartScreen is turned on and employees can't turn it off. If you disable this setting, Windows Defender SmartScreen is turned off and employees can't turn it on. If you don't configure this setting, employees can choose whether to use Windows Defender SmartScreen.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Edge",
    "HKCU\\Software\\Policies\\Microsoft\\Edge"
  ],
  "ValueName": "SmartScreenEnabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WebThreatDefense.admx",
  "CategoryName": "WebThreatDefense",
  "PolicyName": "ServiceEnabled",
  "NameSpace": "Microsoft.Policies.WebThreatDefense",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Service Enabled",
  "ExplainText": "This policy setting determines whether Enhanced Phishing Protection in Microsoft Defender SmartScreen is in audit mode or off. Users do not see notifications for any protection scenarios when Enhanced Phishing Protection in Microsoft Defender is in audit mode. Audit mode captures unsafe password entry events and sends telemetry through Microsoft Defender. If you enable this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen is enabled in audit mode and your users are unable to turn it off. If you disable this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen is off and it will not capture events, send telemetry, or notify users. Additionally, your users are unable to turn it on. If you don\u2019t configure this setting, users can decide whether or not they will enable Enhanced Phishing Protection in Microsoft Defender SmartScreen.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WTDS\\Components"
  ],
  "ValueName": "ServiceEnabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WebThreatDefense.admx",
  "CategoryName": "WebThreatDefense",
  "PolicyName": "NotifyMalicious",
  "NameSpace": "Microsoft.Policies.WebThreatDefense",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Notify Malicious",
  "ExplainText": "This policy setting determines whether Enhanced Phishing Protection in Microsoft Defender SmartScreen warns your users if they type their work or school password into one of the following malicious scenarios: into a reported phishing site, into a Microsoft login URL with an invalid certificate, or into an application connecting to either a reported phishing site or a Microsoft login URL with an invalid certificate. If you enable this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen warns your users if they type their work or school password into one of the malicious scenarios described above and encourages them to change their password. If you disable or don\u2019t configure this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen will not warn your users if they type their work or school password into one of the malicious scenarios described above.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WTDS\\Components"
  ],
  "ValueName": "NotifyMalicious",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WebThreatDefense.admx",
  "CategoryName": "WebThreatDefense",
  "PolicyName": "NotifyPasswordReuse",
  "NameSpace": "Microsoft.Policies.WebThreatDefense",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Notify Password Reuse",
  "ExplainText": "This policy setting determines whether Enhanced Phishing Protection in Microsoft Defender SmartScreen warns your users if they reuse their work or school password. If you enable this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen warns users if they reuse their work or school password and encourages them to change it. If you disable or don\u2019t configure this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen will not warn users if they reuse their work or school password.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WTDS\\Components"
  ],
  "ValueName": "NotifyPasswordReuse",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WebThreatDefense.admx",
  "CategoryName": "WebThreatDefense",
  "PolicyName": "NotifyUnsafeApp",
  "NameSpace": "Microsoft.Policies.WebThreatDefense",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Notify Unsafe App",
  "ExplainText": "This policy setting determines whether Enhanced Phishing Protection in Microsoft Defender SmartScreen warns your users if they type their work or school passwords in Notepad, Winword, or M365 Office apps like OneNote, Word, Excel, etc. If you enable this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen warns your users if they store their password in text editor apps. If you disable or don\u2019t configure this policy setting, Enhanced Phishing Protection in Microsoft Defender SmartScreen will not warn users if they store their password in text editor apps.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WTDS\\Components"
  ],
  "ValueName": "NotifyUnsafeApp",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WebThreatDefense.admx",
  "CategoryName": "WebThreatDefense",
  "PolicyName": "AutomaticDataCollection",
  "NameSpace": "Microsoft.Policies.WebThreatDefense",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Automatic Data Collection",
  "ExplainText": "This policy setting determines whether Enhanced Phishing Protection can collect additional information-such as content displayed, sounds played, and application memory-when your users enter their work or school password into a suspicious website or app. This information is used only for security purposes and helps SmartScreen determine whether the website or app is malicious. If you enable this policy setting, Enhanced Phishing Protection may automatically collect additional content for security analysis from a suspicious website or app when your users enter their work or school password into that website or app. If you disable this policy setting, Enhanced Phishing Protection will not collect additional content for security analysis when your users enter their work or school password into a suspicious site or app. If this policy is not set, Enhanced Phishing Protection automatic data collection will honor the end user\u2019s settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WTDS\\Components"
  ],
  "ValueName": "CaptureThreatWindow",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "AntiSpywareDefender",
  "PolicyName": "Root_PUAProtection",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0_RS1 - At least Windows Server 2016, Windows 10 Version 1607",
  "DisplayName": "Configure detection for potentially unwanted applications",
  "ExplainText": "Enable or disable detection for potentially unwanted applications. You can choose to block, audit, or allow when potentially unwanted software is being downloaded or attempts to install itself on your computer. Enabled: Specify the mode in the Options section: -Block: Potentially unwanted software will be blocked. -Audit Mode: Potentially unwanted software will not be blocked, however if this feature would have blocked access if it were set to Block, then a record of the event will be in the event logs. Disabled: Potentially unwanted software will not be blocked. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "PUAProtection", "Items": [
        { "DisplayName": "Disable (Default)", "Data": "0" },
        { "DisplayName": "Block", "Data": "1" },
        { "DisplayName": "Audit Mode", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "RealtimeProtection",
  "PolicyName": "RealtimeProtection_DisableBehaviorMonitoring",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn on behavior monitoring",
  "ExplainText": "This policy setting allows you to configure behavior monitoring. If you enable or do not configure this setting, behavior monitoring will be enabled. If you disable this setting, behavior monitoring will be disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection"
  ],
  "ValueName": "DisableBehaviorMonitoring",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "RealtimeProtection",
  "PolicyName": "RealtimeProtection_DisableIOAVProtection",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Scan all downloaded files and attachments",
  "ExplainText": "This policy setting allows you to configure scanning for all downloaded files and attachments. If you enable or do not configure this setting, scanning for all downloaded files and attachments will be enabled. If you disable this setting, scanning for all downloaded files and attachments will be disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection"
  ],
  "ValueName": "DisableIOAVProtection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "RealtimeProtection",
  "PolicyName": "RealtimeProtection_DisableOnAccessProtection",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Monitor file and program activity on your computer",
  "ExplainText": "This policy setting allows you to configure monitoring for file and program activity. If you enable or do not configure this setting, monitoring for file and program activity will be enabled. If you disable this setting, monitoring for file and program activity will be disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection"
  ],
  "ValueName": "DisableOnAccessProtection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "RealtimeProtection",
  "PolicyName": "DisableRealtimeMonitoring",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Turn off real-time protection",
  "ExplainText": "This policy turns off real-time protection in Microsoft Defender Antivirus. Real-time protection consists of always-on scanning with file and process behavior monitoring and heuristics. When real-time protection is on, Microsoft Defender Antivirus detects malware and potentially unwanted software that attempts to install itself or run on your device, and prompts you to take action on malware detections. If you enable this policy setting, real-time protection is turned off. If you either disable or do not configure this policy setting, real-time protection is turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection"
  ],
  "ValueName": "DisableRealtimeMonitoring",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "RealtimeProtection",
  "PolicyName": "RealtimeProtection_DisableScanOnRealtimeEnable",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn on process scanning whenever real-time protection is enabled",
  "ExplainText": "This policy setting allows you to configure process scanning when real-time protection is turned on. This helps to catch malware which could start when real-time protection is turned off. If you enable or do not configure this setting, a process scan will be initiated when real-time protection is turned on. If you disable this setting, a process scan will not be initiated when real-time protection is turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection"
  ],
  "ValueName": "DisableScanOnRealtimeEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Reporting",
  "PolicyName": "Reporting_DisablegenericrePorts",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Configure Watson events",
  "ExplainText": "This policy setting allows you to configure whether or not Watson events are sent. If you enable or do not configure this setting, Watson events will be sent. If you disable this setting, Watson events will not be sent.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Reporting"
  ],
  "ValueName": "DisableGenericRePorts",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Reporting",
  "PolicyName": "Reporting_DisableEnhancedNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Turn off enhanced notifications",
  "ExplainText": "Use this policy setting to specify if you want Microsoft Defender Antivirus enhanced notifications to display on clients. If you disable or do not configure this setting, Microsoft Defender Antivirus enhanced notifications will display on clients. If you enable this setting, Microsoft Defender Antivirus enhanced notifications will not display on clients.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Reporting"
  ],
  "ValueName": "DisableEnhancedNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Scan",
  "PolicyName": "Scan_DisableEmailScanning",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn on e-mail scanning",
  "ExplainText": "This policy setting allows you to configure e-mail scanning. When e-mail scanning is enabled, the engine will parse the mailbox and mail files, according to their specific format, in order to analyze the mail bodies and attachments. Several e-mail formats are currently supported, for example: pst (Outlook), dbx, mbx, mime (Outlook Express), binhex (Mac). Email scanning is not supported on modern email clients. If you enable this setting, e-mail scanning will be enabled. If you disable or do not configure this setting, e-mail scanning will be disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Scan"
  ],
  "ValueName": "DisableEmailScanning",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "ExploitGuard_NetworkProtection",
  "PolicyName": "AllowNetworkProtectionOnWinServer",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "This settings controls whether Network Protection is allowed to be configured into block or audit mode on Windows Server.",
  "ExplainText": "Disabled (Default): If Not Configured or Disabled, network protection is not allowed to be configured into block or audit mode on Windows Server. Enabled: If Enabled, administrators can control whether Network Protection is allowed to be configured into block or audit mode on Windows Server. Note, that this configuration is dependent on the EnableNetworkProtection configuration. If this configuration is false, EnableNetworkProtection will be ignored, otherwise network protection will start on Windows Server depending on the value of EnableNetworkProtection.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection"
  ],
  "ValueName": "AllowNetworkProtectionOnWinServer",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "SignatureUpdate",
  "PolicyName": "SignatureUpdate_SignatureDisableNotification",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Allow notifications to disable security intelligence based reports to Microsoft MAPS",
  "ExplainText": "This policy setting allows you to configure the antimalware service to receive notifications to disable individual security intelligence in response to reports it sends to Microsoft MAPS. Microsoft MAPS uses these notifications to disable security intelligence that are causing false positive reports. You must have configured your computer to join Microsoft MAPS for this functionality to work. If you enable this setting or do not configure, the antimalware service will receive notifications to disable security intelligence. If you disable this setting, the antimalware service will not receive notifications to disable security intelligence.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Signature Updates"
  ],
  "ValueName": "SignatureDisableNotification",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Spynet",
  "PolicyName": "DisableBlockAtFirstSeen",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Configure the 'Block at First Sight' feature",
  "ExplainText": "This feature ensures the device checks in real time with the Microsoft Active Protection Service (MAPS) before allowing certain content to be run or accessed. If this feature is disabled, the check will not occur, which will lower the protection state of the device. Enabled \u2013 The Block at First Sight setting is turned on. Disabled \u2013 The Block at First Sight setting is turned off. This feature requires these Group Policy settings to be set as follows: MAPS -> The \u201cJoin Microsoft MAPS\u201d must be enabled or the \u201cBlock at First Sight\u201d feature will not function. MAPS -> The \u201cSend file samples when further analysis is required\u201d should be set to 1 (Send safe samples) or 3 (Send all samples). Setting to 0 (Always Prompt) will lower the protection state of the device. Setting to 2 (Never send) means the \u201cBlock at First Sight\u201d feature will not function. Real-time Protection -> The \u201cScan all downloaded files and attachments\u201d policy must be enabled or the \u201cBlock at First Sight\u201d feature will not function. Real-time Protection -> Do not enable the \u201cTurn off real-time protection\u201d policy or the \u201cBlock at First Sight\u201d feature will not function.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Spynet"
  ],
  "ValueName": "DisableBlockAtFirstSeen",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Spynet",
  "PolicyName": "Spynet_LocalSettingOverrideSpynetReporting",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Configure local setting override for reporting to Microsoft MAPS",
  "ExplainText": "This policy setting configures a local override for the configuration to join Microsoft MAPS. This setting can only be set by Group Policy. If you enable this setting, the local preference setting will take priority over Group Policy. If you disable or do not configure this setting, Group Policy will take priority over the local preference setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Spynet"
  ],
  "ValueName": "LocalSettingOverrideSpynetReporting",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Spynet",
  "PolicyName": "SpynetReporting",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Join Microsoft MAPS",
  "ExplainText": "This policy setting allows you to join Microsoft MAPS. Microsoft MAPS is the online community that helps you choose how to respond to potential threats. The community also helps stop the spread of new malicious software infections. You can choose to send basic or additional information about detected software. Additional information helps Microsoft create new security intelligence and help it to protect your computer. This information can include things like location of detected items on your computer if harmful software was removed. The information will be automatically collected and sent. In some instances, personal information might unintentionally be sent to Microsoft. However, Microsoft will not use this information to identify you or contact you. Possible options are: (0x0) Disabled (default) (0x1) Basic membership (0x2) Advanced membership Basic membership will send basic information to Microsoft about software that has been detected, including where the software came from, the actions that you apply or that are applied automatically, and whether the actions were successful. Advanced membership, in addition to basic information, will send more information to Microsoft about malicious software, spyware, and potentially unwanted software, including the location of the software, file names, how the software operates, and how it has impacted your computer. If you enable this setting, you will join Microsoft MAPS with the membership specified. If you disable or do not configure this setting, you will not join Microsoft MAPS. In Windows 10, Basic membership is no longer available, so setting the value to 1 or 2 enrolls the device into Advanced membership.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Spynet"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "SpynetReporting", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "Basic MAPS", "Data": "1" },
        { "DisplayName": "Advanced MAPS", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Spynet",
  "PolicyName": "SubmitSamplesConsent",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Send file samples when further analysis is required",
  "ExplainText": "This policy setting configures behaviour of samples submission when opt-in for MAPS telemetry is set. Possible options are: (0x0) Always prompt (0x1) Send safe samples automatically (0x2) Never send (0x3) Send all samples automatically",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Spynet"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "SubmitSamplesConsent", "Items": [
        { "DisplayName": "Always prompt", "Data": "0" },
        { "DisplayName": "Send safe samples", "Data": "1" },
        { "DisplayName": "Never send", "Data": "2" },
        { "DisplayName": "Send all samples", "Data": "3" }
      ]
    }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "MpEngine",
  "PolicyName": "MpEngine_MpCloudBlockLevel",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Select cloud protection level",
  "ExplainText": "This policy setting determines how aggressive Microsoft Defender Antivirus will be in blocking and scanning suspicious files. If this setting is on, Microsoft Defender Antivirus will be more aggressive when identifying suspicious files to block and scan; otherwise, it will be less aggressive and therefore block and scan with less frequency. For more information about specific values that are supported, see the Microsoft Defender Antivirus documentation site. Note: This feature requires the \"Join Microsoft MAPS\" setting enabled in order to function. Possible options are: (0x0) Default Microsoft Defender Antivirus blocking level (0x1) Moderate Microsoft Defender Antivirus blocking level, delivers verdict only for high confidence detections (0x2) High blocking level - aggressively block unknowns while optimizing client performance (greater chance of false positives) (0x4) High+ blocking level \u2013 aggressively block unknowns and apply additional protection measures (may impact client performance) (0x6) Zero tolerance blocking level \u2013 block all unknown executables",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\MpEngine"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "MpCloudBlockLevel", "Items": [
        { "DisplayName": "Default blocking level", "Data": "0" },
        { "DisplayName": "Moderate blocking level", "Data": "1" },
        { "DisplayName": "High blocking level", "Data": "2" },
        { "DisplayName": "High+ blocking level", "Data": "4" },
        { "DisplayName": "Zero tolerance blocking level", "Data": "6" }
      ]
    }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "MpEngine",
  "PolicyName": "MpEngine_MpBafsExtendedTimeout",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Configure extended cloud check",
  "ExplainText": "This feature allows Microsoft Defender Antivirus to block a suspicious file for up to 60 seconds, and scan it in the cloud to make sure it's safe. The typical cloud check timeout is 10 seconds. To enable the extended cloud check feature, specify the extended time in seconds, up to an additional 50 seconds. For example, if the desired timeout is 60 seconds, specify 50 seconds in this setting, which will enable the extended cloud check feature, and will raise the total time to 60 seconds. Note: This feature depends on three other MAPS settings - \"Configure the 'Block at First Sight' feature; \"Join Microsoft MAPS\"; \"Send file samples when further analysis is required\" all need to be enabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\MpEngine"
  ],
  "Elements": [
    { "Type": "Decimal", "ValueName": "MpBafsExtendedTimeout", "MinValue": "0", "MaxValue": "50" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "ExploitGuard_NetworkProtection",
  "PolicyName": "ExploitGuard_EnableNetworkProtection",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Prevent users and apps from accessing dangerous websites",
  "ExplainText": "Enable or disable Microsoft Defender Exploit Guard network protection to prevent employees from using any application to access dangerous domains that may host phishing scams, exploit-hosting sites, and other malicious content on the Internet. Enabled: Specify the mode in the Options section: -Block: Users and applications will not be able to access dangerous domains -Audit Mode: Users and applications can connect to dangerous domains, however if this feature would have blocked access if it were set to Block, then a record of the event will be in the event logs. Disabled: Users and applications will not be blocked from connecting to dangerous domains. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Network Protection"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "EnableNetworkProtection", "Items": [
        { "DisplayName": "Disable (Default)", "Data": "0" },
        { "DisplayName": "Block", "Data": "1" },
        { "DisplayName": "Audit Mode", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "ExploitGuard_ControlledFolderAccess",
  "PolicyName": "ExploitGuard_ControlledFolderAccess_EnableControlledFolderAccess",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Configure Controlled folder access",
  "ExplainText": "Enable or disable controlled folder access for untrusted applications. You can choose to block, audit, or allow attempts by untrusted apps to: - Modify or delete files in protected folders, such as the Documents folder - Write to disk sectors You can also choose to only block or audit writes to disk sectors while still allowing the modification or deletion of files in protected folders. Microsoft Defender Antivirus automatically determines which applications can be trusted. You can add additional trusted applications in the Configure allowed applications GP setting. Default system folders are automatically protected, but you can add folders in the Configure protected folders GP setting. Block: The following will be blocked: - Attempts by untrusted apps to modify or delete files in protected folders - Attempts by untrusted apps to write to disk sectors The Windows event log will record these blocks under Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational > ID 1123. Disabled: The following will not be blocked and will be allowed to run: - Attempts by untrusted apps to modify or delete files in protected folders - Attempts by untrusted apps to write to disk sectors These attempts will not be recorded in the Windows event log. Audit Mode: The following will not be blocked and will be allowed to run: - Attempts by untrusted apps to modify or delete files in protected folders - Attempts by untrusted apps to write to disk sectors The Windows event log will record these attempts under Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational > ID 1124. Block disk modification only: The following will be blocked: - Attempts by untrusted apps to write to disk sectors The Windows event log will record these attempts under Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational > ID 1123. The following will not be blocked and will be allowed to run: - Attempts by untrusted apps to modify or delete files in protected folders These attempts will not be recorded in the Windows event log. Audit disk modification only: The following will not be blocked and will be allowed to run: - Attempts by untrusted apps to write to disk sectors - Attempts by untrusted apps to modify or delete files in protected folders Only attempts to write to protected disk sectors will be recorded in the Windows event log (under Applications and Services Logs > Microsoft > Windows > Windows Defender > Operational > ID 1124). Attempts to modify or delete files in protected folders will not be recorded. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\Controlled Folder Access"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "EnableControlledFolderAccess", "Items": [
        { "DisplayName": "Disable (Default)", "Data": "0" },
        { "DisplayName": "Block", "Data": "1" },
        { "DisplayName": "Audit Mode", "Data": "2" },
        { "DisplayName": "Block disk modification only", "Data": "3" },
        { "DisplayName": "Audit disk modification only", "Data": "4" }
      ]
    }
  ]
},
{
  "File": "WindowsDefenderSecurityCenter.admx",
  "CategoryName": "Notifications",
  "PolicyName": "Notifications_DisableNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefenderSecurityCenter",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Hide all notifications",
  "ExplainText": "Hide notifications from Windows Security. Enabled: Local users will not see notifications from Windows Security. Disabled: Local users can see notifications from Windows Security. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender Security Center\\Notifications"
  ],
  "ValueName": "DisableNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefenderSecurityCenter.admx",
  "CategoryName": "Notifications",
  "PolicyName": "Notifications_DisableEnhancedNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefenderSecurityCenter",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Hide non-critical notifications",
  "ExplainText": "Only show critical notifications from Windows Security. If the Suppress all notifications GP setting has been enabled, this setting will have no effect. Enabled: Local users will only see critical notifications from Windows Security. They will not see other types of notifications, such as regular PC or device health information. Disabled: Local users will see all types of notifications from Windows Security. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender Security Center\\Notifications"
  ],
  "ValueName": "DisableEnhancedNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "EnableSmartScreen",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Configure Windows Defender SmartScreen",
  "ExplainText": "This policy allows you to turn Windows Defender SmartScreen on or off. SmartScreen helps protect PCs by warning users before running potentially malicious programs downloaded from the Internet. This warning is presented as an interstitial dialog shown before running an app that has been downloaded from the Internet and is unrecognized or known to be malicious. No dialog is shown for apps that do not appear to be suspicious. Some information is sent to Microsoft about files and programs run on PCs with this feature enabled. If you enable this policy, SmartScreen will be turned on for all users. Its behavior can be controlled by the following options: \u2022 Warn and prevent bypass \u2022 Warn If you enable this policy with the \"Warn and prevent bypass\" option, SmartScreen's dialogs will not present the user with the option to disregard the warning and run the app. SmartScreen will continue to show the warning on subsequent attempts to run the app. If you enable this policy with the \"Warn\" option, SmartScreen's dialogs will warn the user that the app appears suspicious, but will permit the user to disregard the warning and run the app anyway. SmartScreen will not warn the user again for that app if the user tells SmartScreen to run the app. If you disable this policy, SmartScreen will be turned off for all users. Users will not be warned if they try to run suspicious apps from the Internet. If you do not configure this policy, SmartScreen will be enabled by default, but users may change their settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableSmartScreen",
  "Elements": [
    { "Type": "Enum", "ValueName": "ShellSmartScreenLevel", "Items": [
        { "DisplayName": "Warn and prevent bypass", "Data": "Block" },
        { "DisplayName": "Warn", "Data": "Warn" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```

## Remove Defender from Image

If you want to completely remove Windows Defender for a specific reason, use DISM.

Obviously, you need to change the `mount` path before running it.

```powershell
@echo off
setlocal

set "mount=%userprofile%\Desktop\DISMT\mount"

MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthSystray.exe"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthService.exe"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthAgent.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthHost.exe"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthSSO.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthSsoUdk.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthCore.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthProxyStub.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\SecurityHealthUdk.dll"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\drivers\WdNisDrv.sys"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\Windows\System32\SecurityHealth"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\Program Files\Windows Defender Advanced Threat Protection"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\Program Files\Windows Defender"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\Program Files (x86)\Windows Defender"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\ProgramData\Microsoft\Windows Defender"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\ProgramData\Microsoft\Windows Defender Advanced Threat Protection"
MinSudo -NoL -P -TI cmd /c rd /s /q "%mount%\ProgramData\Microsoft\Windows Security Health"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\smartscreen.exe"
MinSudo -NoL -P -TI cmd /c del /f /q "%mount%\Windows\System32\smartscreenps.dll"

endlocal
```

### Task Leftovers

You can remove task leftovers after installation or in the `oobeSystem` phase with:
```batch
powershell -command "Get-ScheduledTask -TaskPath '\Microsoft\Windows\Windows Defender\' | Unregister-ScheduledTask -Confirm:$false"
reg delete "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tree\Microsoft\Windows\Windows Defender" /f
rmdir /s /q "%windir%\System32\Tasks\Microsoft\Windows\Windows Defender"
```

## Windows Security Captures

```c
// Real-time protection - 0 = On, 1 = Off
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableRealtimeMonitoring	Type: REG_DWORD

// Dev Drive protection - 0 = On, 1 = Off
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableAsyncScanOnOpen	Type: REG_DWORD

// Cloud-delivered protection - 0 = Off, 2 = On
HKLM\SOFTWARE\Microsoft\Windows Defender\Spynet\SpyNetReporting	Type: REG_DWORD

// Automatic sample submission - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows Defender\Spynet\SubmitSamplesConsent	Type: REG_DWORD

// Tamper Protection
// Off
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TamperProtection	Type: REG_DWORD, Length: 4, Data: 4	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TamperProtectionSource	Type: REG_DWORD, Length: 4, Data: 2	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TPExclusions	Type: REG_DWORD, Length: 4, Data: 0	RegSetValue
// On
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TamperProtection	Type: REG_DWORD, Length: 4, Data: 5	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TamperProtectionSource	Type: REG_DWORD, Length: 4, Data: 2	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\TPExclusions	Type: REG_DWORD, Length: 4, Data: 0	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Device Control\WddState	Type: REG_DWORD, Length: 4, Data: 1	RegSetValue
HKLM\SOFTWARE\Microsoft\Windows Defender\DisableRoutinelyTakingAction		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\MpEngine\DisableScriptScanning		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableBehaviorMonitoring		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableEarlyLaunchAntimalware		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableIntrusionPreventionSystem		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableIOAVProtection		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableOnAccessProtection		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableRealtimeMonitoring		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableScanOnRealtimeEnable		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Real-Time Protection\DisableScriptScanning		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Reporting\DisableEnhancedNotifications		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Scan\DisableArchiveScanning		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Threats\ThreatSeverityDefaultAction\1		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Threats\ThreatSeverityDefaultAction\2		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Threats\ThreatSeverityDefaultAction\4		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\Threats\ThreatSeverityDefaultAction\5		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\UX Configuration\DisablePrivacyMode		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\UX Configuration\Notification_Suppress		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\UX Configuration\SuppressRebootNotification		RegDeleteValue
HKLM\SOFTWARE\Microsoft\Windows Defender\UX Configuration\SuppressWdoNotification		RegDeleteValue

// Controlled folder access - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows Defender\Windows Defender Exploit Guard\Controlled Folder Access\EnableControlledFolderAccess	Type: REG_DWORD

// Dynamic lock - 0 = Off, 1 = On
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\EnableGoodbye	Type: REG_DWORD

// Check apps and files, "Off" = Off, "Warn" = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\SmartScreenEnabled	Type: REG_SZ

// SmartScreen for Microsoft Edge - 0 = Off, 1 = On
HKCU\Software\Microsoft\Edge\SmartScreenEnabled\(Default)	Type: REG_DWORD

// Phishing Protection - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components\ServiceEnabled	Type: REG_DWORD

// Warn me about malicious apps and sites - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components\NotifyMalicious	Type: REG_DWORD

// Warn me about password reuse - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components\NotifyPasswordReuse	Type: REG_DWORD


// Warn me about unsafe password storage - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components\NotifyUnsafeApp	Type: REG_DWORD

// Automatically collect website or app content when additional analysis is needed to help identify security threats - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components\CaptureThreatWindow	Type: REG_DWORD

// Potentially unwanted app blocking - 0 = Off, 1 = On
HKLM\SOFTWARE\Microsoft\Windows Defender\PUAProtection	Type: REG_DWORD
HKCU\Software\Microsoft\Edge\SmartScreenPuaEnabled\(Default)	Type: REG_DWORD
HKLM\SOFTWARE\Microsoft\Windows Defender\PUAProtection	Type: REG_DWORD
HKCU\Software\Microsoft\Edge\SmartScreenPuaEnabled\(Default)	Type: REG_DWORD

// SmartScreen for Microsoft Store apps - 0 = Off, 1 = On (PreventOverride = 0 for both)
HKCU\Software\Microsoft\Windows\CurrentVersion\AppHost\EnableWebContentEvaluation	Type: REG_DWORD
//HKCU\Software\Microsoft\Windows\CurrentVersion\AppHost\PreventOverride	Type: REG_DWORD

// Local Security Authority protection - 0 = Off, 2 = On
HKLM\System\CurrentControlSet\Control\Lsa\RunAsPPL	Type: REG_DWORD

// Microsoft Vulnerable Driver Blocklist - 0 = Off, 1 = On
HKLM\System\CurrentControlSet\Control\CI\Config\VulnerableDriverBlocklistEnable	Type: REG_DWORD

//  --- Miscellaneous MpPreference Records ---

// Set-MpPreference -DisableCoreServiceTelemetry $true
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1
HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1

// Set-MpPreference -DisableCoreServiceTelemetry $false
HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
```
