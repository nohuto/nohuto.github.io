---
title: 'Enhanced Domain NTLM Logs'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 17
---

Controls the Netlogon policy that enables or disables [enhanced domain wide NTLM logs](https://aka.ms/ntlmlogandblock) on domain controllers (includes NTLMv1 usage). Applies to domain controllers only (Windows 11 24H2+). If not configured, domain controllers default to logging these on supported builds.

## Windows Policies

```json
{
  "File": "Netlogon.admx",
  "CategoryName": "Netlogon",
  "PolicyName": "Netlogon_EnhancedDomainNtlmLogs",
  "NameSpace": "Microsoft.Policies.NetLogon",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Log Enhanced Domain-wide NTLM Logs",
  "ExplainText": "This policy setting configures whether the domain controllers to which this setting is applied will log the new, enhanced domain-wide NTLM logs. These logs contain more information about NTLM authentication on a domain-wide level, including NTLMv1 usage. If enabled, domain controllers will log the new domain-wide NTLM logs. If disabled, domain controllers will not log the new domain-wide NTLM logs. If not configured, domain controllers will default to logging the new domain-wide NTLM logs. More information is available at aka.ms/ntlmlogandblock.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Netlogon\\Parameters"
  ],
  "ValueName": "EnableEnhancedDomainNtlmLogs",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
