---
title: 'Memory Compression'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-memory-compression'
sidebar:
  order: 28
---

Memory compression compresses rarely used or less frequently accessed data in RAM so it takes up less space. Windows does this to keep more data in physical memory and avoid writing to the pagefile, which reduces disk I/O. When the data is needed again, it's decompressed. It's faster than paging to disk, but it costs CPU.

Windows Internals (E7-P1, Memory compression): compressed pages are stored in a dedicated "Memory Compression" process managed by the Store Manager. The memory manager compresses modified list pages into that store and later decompresses them on demand, this is enabled by default on client SKUs.

Example:  
1. System looks for cold/rarely used data in RAM
2. It compresses that data, e.g. 24 MB -> 7 MB
3. The 17 MB saved is used for active apps
4. When the data is needed again, it's decompressed back to 24 MB

See the current memory compresstion state on your system via:
```powershell
Get-MMAgent
```
```powershell
ApplicationLaunchPrefetching : True
ApplicationPreLaunch         : True
MaxOperationAPIFiles         : 512
MemoryCompression            : True # Enabled
OperationAPI                 : True
PageCombining                : True
PSComputerName               :
```

## Windows Internals

![](https://github.com/nohuto/win-config/blob/main/system/images/memcompress1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/memcompress2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/memcompress3.png?raw=true)

> https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf (P. 449)  
> https://learn.microsoft.com/en-us/powershell/module/mmagent/disable-mmagent?view=windowsserver2025-ps
