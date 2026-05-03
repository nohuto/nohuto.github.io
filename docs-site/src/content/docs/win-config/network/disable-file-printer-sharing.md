---
title: 'File/Printer Sharing'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

Disables "Allow other on the network to access shared files and printers on this device" via `@FirewallAPI.dll,-28502` & `ms_server`.

```powershell
PS C:\Users\Nohuto> Get-NetFirewallRule | sort -unique Group | sort DisplayGroup | ft DisplayGroup, Group

DisplayGroup                                                                      Group
------------                                                                      -----
File and Printer Sharing                                                          @FirewallAPI.dll,-28502
File and Printer Sharing (Restrictive)                                            @FirewallAPI.dll,-28672

PS C:\Users\Nohuto> Get-NetAdapterBinding -Name *

Name                           DisplayName                                        ComponentID          Enabled
----                           -----------                                        -----------          -------
Ethernet                       File and Printer Sharing for Microsoft Networks    ms_server            False
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "WindowsSandbox.admx",
  "CategoryName": "WindowsSandbox",
  "PolicyName": "AllowPrinterRedirection",
  "NameSpace": "Microsoft.Policies.WindowsSandbox",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX",
  "DisplayName": "Allow printer sharing with Windows Sandbox",
  "ExplainText": "This policy setting enables or disables printer sharing from the host into the Sandbox. If you enable this policy setting, host printers will be shared into Windows Sandbox. If you disable this policy setting, Windows Sandbox will not be able to view printers from the host. If you do not configure this policy setting, printer redirection will be disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Sandbox"
  ],
  "ValueName": "AllowPrinterRedirection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
