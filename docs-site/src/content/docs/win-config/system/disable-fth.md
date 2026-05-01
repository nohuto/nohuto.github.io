---
title: 'FTH'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 16
---

Used for preventing legacy or unstable applications from crashing, read through the picture below for more detailed information ([`Windows Internals 7th Edition, Part 1, Page 347`](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)).

In [Exploit Protection](https://learn.microsoft.com/en-us/defender-endpoint/customize-exploit-protection#powershell-reference-table) you can see the `Heap` mitigation with `TerminateOnError`, Windows Internals names the same heap termination behavior `Heap Terminate On Corruption`, so the FTH note below refers to that.

> "*causing the application to terminate if a heap corruption is detected*"
>
> — Microsoft, [Exploit protection reference](https://learn.microsoft.com/en-us/defender-endpoint/exploit-protection-reference)

> "*disables the Fault Tolerant Heap (FTH)... by terminating the process instead*"
>
> — Windows Internals, [E7, P1: 'Exploit mitigations'](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

I'll keep the option for documentation purposes for now (and might move it to the Process Mitigation in the security section soon).

## [Windows Internals](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

![](https://github.com/nohuto/win-config/blob/main/system/images/fth.png?raw=true)

[YouTube Video](https://www.youtube.com/watch?v=4SvNNXAwoqE).
