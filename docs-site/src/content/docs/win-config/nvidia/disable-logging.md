---
title: 'Logging'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#disable-logging'
sidebar:
  order: 10
---

```cpp
{ L"LogEventEntries", NV_DECLARE_REG_VAR(logSizes[LOG_EVENT]) },  // Maximum number of event log entries (global)
{ L"LogErrorEntries", NV_DECLARE_REG_VAR(logSizes[LOG_ERROR]) },  // Maximum number of error log entries (global)
{ L"LogWarningEntries", NV_DECLARE_REG_VAR(logSizes[LOG_WARNING]) },  // Maximum number of warning log entries (global)
{ L"LogPagingEntries", NV_DECLARE_REG_VAR(logSizes[LOG_PAGING]) },  // Maximum number of paging log entries (global)
```
```c
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : LogErrorEntries
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : LogEventEntries
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : LogPagingEntries
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : LogWarningEntries
```
```h
// Whenever new LOG is Created, add corresponding RegKey from nvdm.cpp in the comment in front of it.
#if DEBUG
LOG_EVENT_SIZE      0x2000                  // 8192 event entries (debug) L"LogEventEntries" 
LOG_WARNING_SIZE    0x1000                  // 4096 warning entries (debug) L"LogWarningEntries"
LOG_ERROR_SIZE      0x1000                  // 4096 error entries (debug) L"LogErrorEntries"
LOG_PAGING_SIZE     0x0600                  // 1536 paging entries (debug)  L"LogPagingEntries"
#else
// Microsoft has complained about the size of the logging data, so whereas
// we used to have more by default (2048, 1024, 1024, and 1536 for below,
// respectively) now we go with smaller sizes at the expense of less
// debuggability.  Upside is we use about 300K less memory than before.
LOG_EVENT_SIZE      0x0200                  // 512 event entries (retail)  L"LogEventEntries" 
LOG_WARNING_SIZE    0x0200                  // 512 warning entries (retail)  L"LogWarningEntries"
LOG_ERROR_SIZE      0x0200                  // 512 error entries (retail)  L"LogErrorEntries"
LOG_PAGING_SIZE     0x0200                  // 512 paging entries (retail) L"LogPagingEntries"
#endif // DEBUG
```
