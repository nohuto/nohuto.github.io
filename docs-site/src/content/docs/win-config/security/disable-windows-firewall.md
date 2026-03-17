---
title: 'Windows Firewall'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-windows-firewall'
sidebar:
  order: 7
---

It disables the profiles, but leaves the services/driver running.

Disabling the firewall service (`Disable Services/Driver` can break:
- Microsoft Store & UWP apps
- `winget` / app deployment
- Windows Sandbox
- Xbox networking
- Start menu
- Modern applications can fail to install or update
- Activation of Windows via phone
- Application or OS incompatibilities that depend on Windows Firewall

"The proper method to disable the Windows Firewall is to disable the Windows Firewall Profiles and leave the service running."

> https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure-with-command-line?tabs=powershell

`netsh advfirewall set allprofiles state off`/`Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False`:
```powershell
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\DomainProfile\EnableFirewall	Type: REG_DWORD, Length: 4, Data: 0
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\StandardProfile\EnableFirewall	Type: REG_DWORD, Length: 4, Data: 0
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\PublicProfile\EnableFirewall	Type: REG_DWORD, Length: 4, Data: 0
```

```json
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Domain",
  "PolicyName": "WF_EnableFirewall_Name_1",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Protect all network connections",
  "ExplainText": "Turns on Windows Defender Firewall. If you enable this policy setting, Windows Defender Firewall runs and ignores the \"Computer Configuration\\Administrative Templates\\Network\\Network Connections\\Prohibit use of Internet Connection Firewall on your DNS domain network\" policy setting. If you disable this policy setting, Windows Defender Firewall does not run. This is the only way to ensure that Windows Defender Firewall does not run and administrators who log on locally cannot start it. If you do not configure this policy setting, administrators can use the Windows Defender Firewall component in Control Panel to turn Windows Defender Firewall on or off, unless the \"Prohibit use of Internet Connection Firewall on your DNS domain network\" policy setting overrides.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\DomainProfile"
  ],
  "ValueName": "EnableFirewall",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Domain",
  "PolicyName": "WF_Notifications_Name_1",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Prohibit notifications",
  "ExplainText": "Prevents Windows Defender Firewall from displaying notifications to the user when a program requests that Windows Defender Firewall add the program to the program exceptions list. If you enable this policy setting, Windows Defender Firewall prevents the display of these notifications. If you disable this policy setting, Windows Defender Firewall allows the display of these notifications. In the Windows Defender Firewall component of Control Panel, the \"Notify me when Windows Defender Firewall blocks a new program\" check box is selected and administrators cannot clear it. If you do not configure this policy setting, Windows Defender Firewall behaves as if the policy setting were disabled, except that in the Windows Defender Firewall component of Control Panel, the \"Notify me when Windows Defender Firewall blocks a new program\" check box is selected by default, and administrators can change it.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\DomainProfile"
  ],
  "ValueName": "DisableNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Domain",
  "PolicyName": "WF_Logging_Name_1",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Allow logging",
  "ExplainText": "Allows Windows Defender Firewall to record information about the unsolicited incoming messages that it receives. If you enable this policy setting, Windows Defender Firewall writes the information to a log file. You must provide the name, location, and maximum size of the log file. The location can contain environment variables. You must also specify whether to record information about incoming messages that the firewall blocks (drops) and information about successful incoming and outgoing connections. Windows Defender Firewall does not provide an option to log successful incoming messages. If you are configuring the log file name, ensure that the Windows Defender Firewall service account has write permissions to the folder containing the log file. Default path for the log file is %WINDIR%\\system32\\LogFiles\\Firewall\\pfirewall.log. If you disable this policy setting, Windows Defender Firewall does not record information in the log file. If you enable this policy setting, and Windows Defender Firewall creates the log file and adds information, then upon disabling this policy setting, Windows Defender Firewall leaves the log file intact. If you do not configure this policy setting, Windows Defender Firewall behaves as if the policy setting were disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\DomainProfile\\Logging"
  ],
  "Elements": [
    { "Type": "Boolean", "ValueName": "LogDroppedPackets", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "LogSuccessfulConnections", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Text", "ValueName": "LogFilePath" },
    { "Type": "Decimal", "ValueName": "LogFileSize", "MinValue": "128", "MaxValue": "32767" }
  ]
},
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Standard",
  "PolicyName": "WF_EnableFirewall_Name_2",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Protect all network connections",
  "ExplainText": "Turns on Windows Defender Firewall. If you enable this policy setting, Windows Defender Firewall runs and ignores the \"Computer Configuration\\Administrative Templates\\Network\\Network Connections\\Prohibit use of Internet Connection Firewall on your DNS domain network\" policy setting. If you disable this policy setting, Windows Defender Firewall does not run. This is the only way to ensure that Windows Defender Firewall does not run and administrators who log on locally cannot start it. If you do not configure this policy setting, administrators can use the Windows Defender Firewall component in Control Panel to turn Windows Defender Firewall on or off, unless the \"Prohibit use of Internet Connection Firewall on your DNS domain network\" policy setting overrides.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\StandardProfile"
  ],
  "ValueName": "EnableFirewall",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Standard",
  "PolicyName": "WF_Notifications_Name_2",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Prohibit notifications",
  "ExplainText": "Prevents Windows Defender Firewall from displaying notifications to the user when a program requests that Windows Defender Firewall add the program to the program exceptions list. If you enable this policy setting, Windows Defender Firewall prevents the display of these notifications. If you disable this policy setting, Windows Defender Firewall allows the display of these notifications. In the Windows Defender Firewall component of Control Panel, the \"Notify me when Windows Defender Firewall blocks a new program\" check box is selected and administrators cannot clear it. If you do not configure this policy setting, Windows Defender Firewall behaves as if the policy setting were disabled, except that in the Windows Defender Firewall component of Control Panel, the \"Notify me when Windows Defender Firewall blocks a new program\" check box is selected by default, and administrators can change it.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\StandardProfile"
  ],
  "ValueName": "DisableNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsFirewall.admx",
  "CategoryName": "WF_Profile_Standard",
  "PolicyName": "WF_Logging_Name_2",
  "NameSpace": "Microsoft.Policies.WindowsFirewall",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Windows Defender Firewall: Allow logging",
  "ExplainText": "Allows Windows Defender Firewall to record information about the unsolicited incoming messages that it receives. If you enable this policy setting, Windows Defender Firewall writes the information to a log file. You must provide the name, location, and maximum size of the log file. The location can contain environment variables. You must also specify whether to record information about incoming messages that the firewall blocks (drops) and information about successful incoming and outgoing connections. Windows Defender Firewall does not provide an option to log successful incoming messages. If you are configuring the log file name, ensure that the Windows Defender Firewall service account has write permissions to the folder containing the log file. Default path for the log file is %WINDIR%\\system32\\LogFiles\\Firewall\\pfirewall.log. If you disable this policy setting, Windows Defender Firewall does not record information in the log file. If you enable this policy setting, and Windows Defender Firewall creates the log file and adds information, then upon disabling this policy setting, Windows Defender Firewall leaves the log file intact. If you do not configure this policy setting, Windows Defender Firewall behaves as if the policy setting were disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsFirewall\\StandardProfile\\Logging"
  ],
  "Elements": [
    { "Type": "Boolean", "ValueName": "LogDroppedPackets", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "LogSuccessfulConnections", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Text", "ValueName": "LogFilePath" },
    { "Type": "Decimal", "ValueName": "LogFileSize", "MinValue": "128", "MaxValue": "32767" }
  ]
},
```
