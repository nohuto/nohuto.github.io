---
title: 'PM in Standby Mode'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-pm-in-standby-mode'
sidebar:
  order: 13
---

This policy setting specifies that power management is disabled when the machine enters connected standby mode.
- If this policy setting is enabled, Windows Connection Manager doesn't manage adapter radios to reduce power consumption when the machine enters connected standby mode.
- If this policy setting isn't configured or is disabled, power management is enabled when the machine enters connected standby mode.

## Suboption

`Disable Modern Standby`:
```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power"; 
    "MSDisabled" = 1; // PopModernStandbyDisabled

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\ModernSleep";
    "EnabledActions" = 0; // PopAggressiveStandbyActionsRegValue 
    "EnableDsNetRefresh" = 0; // PopEnableDsNetRefresh 
```
> https://www.noverse.dev/docs/win-config/power/power-values/#registry-values-details

## Windows Policies

```json
{
  "File": "WCM.admx",
  "CategoryName": "WCM_Category",
  "PolicyName": "WCM_DisablePowerManagement",
  "NameSpace": "Microsoft.Policies.WindowsConnectionManager",
  "Supported": "Windows8",
  "DisplayName": "Disable power management in connected standby mode",
  "ExplainText": "This policy setting specifies that power management is disabled when the machine enters connected standby mode. If this policy setting is enabled, Windows Connection Manager does not manage adapter radios to reduce power consumption when the machine enters connected standby mode. If this policy setting is not configured or is disabled, power management is enabled when the machine enters connected standby mode.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WcmSvc\\GroupPolicy"
  ],
  "ValueName": "fDisablePowerManagement",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
```powershell
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fAllowFailoverToCellular
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fBlockNonDomain
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fBlockRoaming
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fDisablePowerManagement
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fMinimizeConnections
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\GroupPolicy : fSoftDisconnectConnections
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fAllowFailoverToCellular
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fBlockNonDomain
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fBlockRoaming
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fDisablePowerManagement
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fMinimizeConnections
\Registry\Machine\SOFTWARE\Policies\Microsoft\WINDOWS\Wcmsvc\Local : fSoftDisconnectConnections
```
