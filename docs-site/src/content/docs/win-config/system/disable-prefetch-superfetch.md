---
title: 'Prefetch & Superfetch'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-prefetch--superfetch'
sidebar:
  order: 25
---

Disables prefetcher (includes disabling `ApplicationLaunchPrefetching` & `ApplicationPreLaunch`) features, used to speed up the boot process and application startup by preloading data - **shouldn't be disabled**, leaving it for documentation reasons. Read through the pictures for more detailed information.

Windows Internals (E7-P1, Prefetcher): the prefetcher traces roughly the first 10 seconds of app startup and writes trace files to `%SystemRoot%\\Prefetch`. The Superfetch service consumes those traces and issues clustered reads on subsequent starts. `EnablePrefetcher` controls the boot/app prefetch modes.

"`EnablePrefetcher` is a setting in the File-Based Write Filter (FBWF) and Enhanced Write Filter with HORM (EWF) packages. It specifies how to run Prefetch, a tool that can load application data into memory before it is demanded."

"`EnableSuperfetch` is a setting in the File-Based Write Filter (FBWF) and Enhanced Write Filter with HORM (EWF) packages. It specifies how to run SuperFetch, a tool that can load application data into memory before it is demanded. SuperFetch improves on Prefetch by monitoring which applications that you use the most and preloading those into system memory."

"`SfTracingState` belongs to `sftracing.exe`. This file most often belongs to product Office Server Search. This file most often has  description Office Server Search."

`EnableBoottrace` is used to trace the startup, `1`= enabled, `0` = disabled.

```
0 - Disables Prefetch
1 - Enables Prefetch when the application starts
2 - Enables Prefetch when the device starts up
3 - Enables Prefetch when the application or device starts up
```
The same applies to superfetch.

> https://learn.microsoft.com/en-us/previous-versions/windows/embedded/ff794235(v=winembedded.60)?redirectedfrom=MSDN  
> https://learn.microsoft.com/en-us/previous-versions/windows/embedded/ff794183(v=winembedded.60)?redirectedfrom=MSDN  
> https://learn.microsoft.com/en-us/powershell/module/mmagent/disable-mmagent?view=windowsserver2025-ps

More detailed information about prefetch and superfetch on page `413`f & `472`f.
> https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf

![](https://github.com/nohuto/win-config/blob/main/system/images/prefetch1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/prefetch2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/prefetch3.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/prefetch4.png?raw=true)
