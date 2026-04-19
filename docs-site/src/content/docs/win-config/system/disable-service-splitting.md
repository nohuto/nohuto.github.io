---
title: 'Service Splitting'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-service-splitting'
sidebar:
  order: 6
---

Prevents services running under `svchost.exe` from being split into separate processes, keeping all grouped services within the same instance. This simplifies process management but increases the risk of system instability and reduces service isolation.

`Windows Internals 7th Edition, Part 2` handpicked snippets (shortened):
If system physical memory, obtained via `GlobalMemoryStatusEx`, exceeds the SvcHostSplitThresholdInKB registry value (default is `3.5 GB` on client systems and `3.7 GB` on server systems), Svchost service splitting is enabled.

Service splitting is allowed only if:  
- Splitting is globally enabled
- The service is not marked as critical (i.e., it doesn't reboot the machine on failure)
- The service is hosted in `svchost.exe`
- `SvcHostSplitDisable` is not set to `1` in the service registry key

Setting `SvcHostSplitDisable` to `0` for a critical service forces it to be split, but this can lead to issues.

Get the current amount of `svchost` process instances with:
```cmd
(get-process -Name "svchost" | measure).Count
```
```
\Registry\Machine\SYSTEM\ControlSet001\Control : SvcHostDebug
\Registry\Machine\SYSTEM\ControlSet001\Control : SvcHostSplitThresholdInKB
```
`SvcHostDebug` is set to `0` by default:
```c
v1 = 0;
if ( !RegistryValueWithFallbackW && Type == 4 )
    LOBYTE(v1) = Data != 0;
return v1;
```

> [system/assets | servicesplitting-ScReadSCMConfiguration.c](https://github.com/nohuto/win-config/blob/main/system/assets/servicesplitting-ScReadSCMConfiguration.c)  
> https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P2.pdf (page `467`f)  
> https://learn.microsoft.com/en-us/windows/application-management/svchost-service-refactoring  
> https://learn.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-globalmemorystatusex

![](https://github.com/nohuto/win-config/blob/main/system/images/servicesplitting1.png?raw=true)

## Windows Internals

![](https://github.com/nohuto/win-config/blob/main/system/images/servicesplitting2.png?raw=true)
