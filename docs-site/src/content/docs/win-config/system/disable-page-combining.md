---
title: 'Page Combining'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-page-combining'
sidebar:
  order: 29
---

Page combining spots identical RAM pages across processes and merges them into a single shared page. Instead of keeping 50 copies of the same DLL/data page, the memory manager keeps one, maps it to everyone, and marks it `copy-on-write`. As long as nobody changes it, everyone shares the same physical page and RAM usage drops. If a process writes to it, Windows gives that process its own private copy and leaves the shared one intact. It's a background RAM deduplicator, basically.

Windows Internals (E7-P1, Memory combining): the memory manager can be instructed to combine identical pages across the system, and Superfetch can trigger combining when the system is idle. The feature can be disabled via `DisablePageCombining` in the memory manager settings.

`Disable-MMAgent -PageCombining` toggles the state shown in `Get-MMAgent` but does not write the `DisablePageCombining` registry value on recent builds, so it's most likely deprecated.

```c
INIT:0000000140B9C340                 dq offset aSessionManager_7 ; "Session Manager\\Memory Management"
INIT:0000000140B9C348                 dq offset aDisablepagecom ; "DisablePageCombining"
INIT:0000000140B9C350                 dq offset dword_140D1D1C8

ALMOSTRO:0000000140D1D1C8 dword_140D1D1C8 dd 0                    ; DATA XREF: MiCombineIdenticalPages:loc_1407F7E3A↑r
```

See the current page combining state on your system via:
```powershell
Get-MMAgent
```
```powershell
ApplicationLaunchPrefetching : True
ApplicationPreLaunch         : True
MaxOperationAPIFiles         : 512
MemoryCompression            : True
OperationAPI                 : True
PageCombining                : True # Enabled
PSComputerName               :
```

![](https://github.com/nohuto/win-config/blob/main/system/images/pagecomb1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/pagecomb2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/pagecomb3.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/pagecomb4.png?raw=true)

> https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf (P. 459)  
> https://learn.microsoft.com/en-us/powershell/module/mmagent/disable-mmagent?view=windowsserver2025-ps
