---
title: 'Enhanced Domain NTLM Logs'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 16
---

Controls the Netlogon policy that enables or disables [enhanced domain wide NTLM logs](https://aka.ms/ntlmlogandblock) on domain controllers (includes NTLMv1 usage). Applies to domain controllers only (Windows 11 24H2+). If not configured, domain controllers default to logging these on supported builds.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Log Enhanced Domain-wide NTLM Logs](https://noverse.dev/policies?p=Netlogon*Netlogon_EnhancedDomainNtlmLogs) | `HKLM\Software\Policies\Microsoft\Netlogon\Parameters` | `EnableEnhancedDomainNtlmLogs` |
