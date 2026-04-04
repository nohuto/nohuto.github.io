---
title: 'Windows Defender'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#windows-defender'
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

## Windows Policies

Since the tool includes a seperate `Policies` section and most of the Defender settings are controlled via them (not all SmartScreen parts are, which is why it's a suboption), I won't add them as suboptions to keep the UI clean. If you want to fine tune specific parts of Defender after applying the `Configured` preset, you can do so by copying the value name and pasting it into the search bar, it'll show the policy (or go into the Policies section and open WindowsDefender / WindowsDefenderSecurityCenter / WebThreatDefense).

### Main AV Parts

| Value name | Description |
| --- | --- |
| `PUAProtection` | Controls whether potentially unwanted applications are allowed, audited, or blocked when they are downloaded or try to install. |
| `DisableBehaviorMonitoring` | Controls whether Defender behavior monitoring stays enabled or is disabled. |
| `DisableIOAVProtection` | Controls whether downloaded files and attachments are scanned. |
| `DisableEmailScanning` | Controls whether Defender scans supported mailbox and mail-file formats for message bodies and attachments; modern email clients are not supported by this feature. |
| `DisableOnAccessProtection` | Controls whether file and program activity is monitored. |
| `DisableRealtimeMonitoring` | Controls whether Defender real-time protection is turned off or left on. |
| `DisableScanOnRealtimeEnable` | Controls whether a process scan is started when real-time protection is turned on. |

### Cloud / MAPS

| Value name | Description |
| --- | --- |
| `SpynetReporting` | Controls whether the device joins Microsoft MAPS and whether it sends basic or additional threat information to Microsoft. |
| `LocalSettingOverrideSpynetReporting` | Controls whether a local MAPS reporting preference can override Group Policy. |
| `SubmitSamplesConsent` | Controls how Defender submits file samples for further analysis when MAPS is in use. |
| `DisableBlockAtFirstSeen` | Controls whether Defender checks suspicious content with MAPS before allowing it to run or be accessed. (*Defender marks it as `DisableBlockAtFirstSeen` and deletes the value*) |
| `MpBafsExtendedTimeout` | Controls the extra time Defender can hold a suspicious file for an extended cloud check. |
| `MpCloudBlockLevel` | Controls how aggressively Defender blocks and scans suspicious files using cloud protection. |
| `SignatureDisableNotification` | Controls whether the antimalware service can receive MAPS notifications that disable security intelligence causing false positives. |

### Exploit Guard

| Value name | Description |
| --- | --- |
| `EnableNetworkProtection` | Controls whether Network Protection blocks or audits access to dangerous domains used for phishing, exploits, or other malicious content. |
| `AllowNetworkProtectionOnWinServer` | Controls whether Network Protection is allowed to run in block or audit mode on Windows Server. |
| `EnableControlledFolderAccess` | Controls whether untrusted apps can modify protected folders or write to disk sectors, and whether those actions are blocked or audited. |

### WebThreatDefense / Enhanced Phishing

| Value name | Description |
| --- | --- |
| `ServiceEnabled` | Controls whether Enhanced Phishing Protection runs in audit mode or stays off, audit mode records unsafe password entry events and sends telemetry. |
| `NotifyMalicious` | Controls whether users are warned when they enter a work or school password into phishing or invalid Microsoft sign-in scenarios. |
| `NotifyPasswordReuse` | Controls whether users are warned when they reuse their work or school password. |
| `NotifyUnsafeApp` | Controls whether users are warned when they type their work or school password into unsafe apps such as text editors or Office apps. |
| `CaptureThreatWindow` | Controls whether Enhanced Phishing Protection may collect additional security data when a password is entered into a suspicious site or app. |

### Reporting / Notifications

| Value name | Description |
| --- | --- |
| `DisableGenericRePorts` | Controls whether Watson events are sent. |
| `DisableEnhancedNotifications` | Controls whether enhanced or non-critical Defender notifications are shown on clients. |
| `DisableNotifications` | Controls whether local users can see notifications from Windows Security. |

### SmartScreen Policy Values

| Value name | Description |
| --- | --- |
| `EnableSmartScreen` | Controls whether Windows Defender SmartScreen is turned on or off for app reputation warnings and related checks. |
| `ShellSmartScreenLevel` | Controls whether SmartScreen warns users or warns and prevents bypass when the Windows Defender SmartScreen policy is enabled. |
| `EnabledV9` | Controls whether legacy Microsoft Edge SmartScreen is enforced, including phishing and malware checks against sites that are not on the allow list. |
| `SmartScreenEnabled` | Controls whether current Microsoft Edge SmartScreen is turned on or off in the browser. |

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-webthreatdefense  
> https://learn.microsoft.com/en-us/defender-endpoint/configure-real-time-protection-microsoft-defender-antivirus  
> https://learn.microsoft.com/en-us/defender-endpoint/configure-protection-features-microsoft-defender-antivirus  
> https://learn.microsoft.com/en-us/defender-endpoint/configure-block-at-first-sight-microsoft-defender-antivirus  
> https://learn.microsoft.com/en-us/defender-endpoint/specify-cloud-protection-level-microsoft-defender-antivirus  
> https://learn.microsoft.com/en-us/defender-endpoint/enable-controlled-folders  
> https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-problems-with-tamper-protection  
> [security/assets | Windows-Defender.txt](https://github.com/nohuto/win-config/blob/main/security/assets/Windows-Defender.txt)

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

## Windows Security Records

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
