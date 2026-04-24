---
title: 'Page File'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 36
---

Several notes I took while reading through [`Windows Internals Part 1, Edition 7`](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf), everything written below is based on it.

**You should calculate it while daily workload, or your peak value won't be accurate.**

Paging files are configured via `System > Advanced system settings > Performance > Advanced > Virtual memory`, but they are only one component of virtual memory. Even with no paging file, every process still uses virtual address space managed by the memory manager. Private pages must always live somewhere. RAM holds them while they are in use, and paging files act as disk backed storage so the memory manager can reclaim physical pages when demand grows.

Windows tracks private committed memory as the "commit charge" and enforces a "commit limit" equal to available RAM plus the total size of all paging files. This ensures Windows never promises more pageable storage than it can keep either in memory or in paging files. When commit charge climbs toward the limit, the modified page writer (`MiModifiedPageWriter`) flushes dirty pages to paging files so their physical frames can be reused. If the limit is reached and paging files can't grow, further private allocations fail until memory is freed. Task manager's performance tab/process explorer's system information window/system informers system information display current commit, the commit limit, and the peak value so you can see how much paging file space recent workloads required.

Size calculation if leaving it system managed and RAM as base would be if RAM <= 1 GB, then size = 1 GB. If RAM > 1 GB, then add 1/8 GB for every extra gigabyte of RAM, up to a maximum of 32 GB.

## How the option calculates it

If peak commit is below physical memory, no paging file would have been necessary (the option won't set it to 0, if you do there's literally nowhere to place additional committed pages, so allocations fail and you can even hit a bugcheck). If it exceeds RAM, the difference is the minimum disk backed capacity needed so the commit limit (RAM + paging files) stays above demand. Reads `\Process(_Total)\Page File Bytes Peak`, computes the Smss RAM baseline (`1 GB + 1/8 GB per extra GB of RAM`, capped at 32 GB), and checks whether `peak – RAM` is positive. If the workload never exceeded RAM, it keeps the Smss baseline. Otherwise, it uses the excess value (and currently a safety buffer of 10%, clamped to 1GB if RAM is >= 10 GB).

## Clearing Page File on Shutdown

Windows Internals: Paging files can contain fragments of process or kernel data. Enabling the option mitigates offline data exposure at the cost of longer shutdowns.

Local Security Policy:
"This security setting determines whether the virtual memory pagefile is cleared when the system is shut down.

Virtual memory support uses a system pagefile to swap pages of memory to disk when they are not used. On a running system, this pagefile is opened exclusively by the operating system, and it is well protected. However, systems that are configured to allow booting to other operating systems might have to make sure that the system pagefile is wiped clean when this system shuts down. This ensures that sensitive information from process memory that might go into the pagefile is not available to an unauthorized user who manages to directly access the pagefile.

When this policy is enabled, it causes the system pagefile to be cleared upon clean shutdown. If you enable this security option, the hibernation file (hiberfil.sys) is also zeroed out when hibernation is disabled."
