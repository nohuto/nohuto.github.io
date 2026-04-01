---
title: 'Defender Core Service Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-defender-core-service-telemetry'
sidebar:
  order: 53
---

`Get-Help Set-MpPreference -Full` exposes the command:
```powershell
-DisableCoreServiceTelemetry <bool>
    Required?                    false
    Position?                    Named
    Accept pipeline input?       false
    Parameter set name           Set0
    Aliases                      dcst
    Dynamic?                     false
```

Using the command sets:
```c
// Set-MpPreference -DisableCoreServiceTelemetry $true
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1

// Set-MpPreference -DisableCoreServiceTelemetry $false
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
```

This flag blocks the Defender Core service from the One Data Service (1DS) telemetry pipeline that the MDEP telemetry framework uses for text-based health events, so the new `MdCoreSvc` no longer reports status back to Microsofts Cosmos/Kusto backend.

> https://learn.microsoft.com/en-us/mdep/architecture/core-os/telemetry/  
> https://github.com/MicrosoftDocs/defender-docs/blob/18b1904eda7048bff8111b10b12852d692047d6f/defender-endpoint/microsoft-defender-core-service-overview.md

---

```powershell
-DisableCoreServiceECSIntegration <bool>
    Required?                    false
    Position?                    Named
    Accept pipeline input?       false
    Parameter set name           Set0
    Aliases                      dcsei
    Dynamic?                     false
```

```c
// Set-MpPreference -DisableCoreServiceECSIntegration $true
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 1
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 1

// Set-MpPreference -DisableCoreServiceECSIntegration $false
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 0
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 0
```

ECS stands for Experimentation and Configuration Service, so changing this on stops the Defender Core service from taking part in remote flights or config updates that come from that service.
