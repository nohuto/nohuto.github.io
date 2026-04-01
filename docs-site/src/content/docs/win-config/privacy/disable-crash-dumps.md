---
title: 'Crash Dumps'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-crash-dumps'
sidebar:
  order: 38
---

Disables the crash dump, logging. Not all values may be read on your system.

```c
CrashDumpEnabled REG_DWORD 0x0 = None
CrashDumpEnabled REG_DWORD 0x1 = Complete memory dump
CrashDumpEnabled REG_DWORD 0x2 = Kernel memory dump
CrashDumpEnabled REG_DWORD 0x3 = Small memory dump (64 KB)
CrashDumpEnabled REG_DWORD 0x7 = Automatic memory dump
CrashDumpEnabled REG_DWORD 0x1 and FilterPages REG_DWORD 0x1 = Active memory dump
```

There're two values named `CrashDumpEnabled.New` & `CrashDumpEnabled.Old`, I haven't looked into them yet, see this as note for future reference.
```
\Registry\Machine\SYSTEM\ControlSet001\Control\CrashControl : CrashDumpEnabled.New
\Registry\Machine\SYSTEM\ControlSet001\Control\CrashControl : CrashDumpEnabled.Old
```

> https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/memory-dump-file-options#registry-values-for-startup-and-recovery  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/automatic-memory-dump  
> https://github.com/nohuto/win-registry/blob/main/records/CrashControl.txt  
> [privacy/assets | crashdmp.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crashdmp.c)  
> [privacy/assets | crashdmp-SecureDump_PrepareForInit.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crashdmp-SecureDump_PrepareForInit.c)
