---
title: 'MMCSS Values'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 5
---

"*The Multimedia Class Scheduler service (MMCSS) enables multimedia applications to ensure that their time-sensitive processing receives prioritized access to CPU resources. This service enables multimedia applications to utilize as much of the CPU as possible without denying CPU resources to lower-priority applications.*

*MMCSS uses information stored in the registry to identify supported tasks and determine the relative priority of threads performing these tasks. Each thread that is performing work related to a particular task calls the [AvSetMmMaxThreadCharacteristics](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmmaxthreadcharacteristicsa) or [AvSetMmThreadCharacteristics](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadcharacteristicsa) function to inform MMCSS that it is working on that task.*"

Client applications can register with MMCSS by calling AvSetMmThreadCharacteristics with a task name that must match one of the subkeys under `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks`, see [task-details](https://www.noverse.dev/docs/win-config/system/mmcss-values/#tasks-details).

MCSS scheduling thread runs at priority 27 because they need to preempt any Pro Audio threads to lower their priority to the exhausted category.

![](https://github.com/nohuto/win-config/blob/main/system/images/mmcssprio.png?raw=true)

## Registry Values Details

All values are read via `CiConfigReadDWORD()`, so the type is `REG_DWORD` for all listed ones. If `\Tasks` opens successfully, `CiConfigInitializeFromRegistry()` handles that part?

See [mmcss-CiConfigInitialize.c](https://github.com/nohuto/win-config/tree/main/system/assets/mmcss-CiConfigInitialize.c) for notes.

```c
"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\multimedia\\systemprofile";
    "SystemResponsiveness" = 20; // see section below
    "NetworkThrottlingIndex" = 10; // see section below
    "NoLazyMode" = 0; // any nonzero value = enabled
    "IdleDetectionCycles" = 2; // valid range is 1-31, otherwise 2 is used
    "LazyModeTimeout" = 1000000; // 0 is replaced with 1000000
    "SchedulerTimerResolution" = 10000; // values above 10000 are capped to 10000
    "SchedulerPeriod" = 100000; // valid range is 50000-1000000, otherwise 100000 is used
    "MaxThreadsPerProcess" = 32; // valid range is 8-128, otherwise 32 is used
    "MaxThreadsTotal" = 256; // valid range is 64-65535, otherwise 256 is used
```

## SystemResponsiveness Details

By default, multimedia threads get 80 percent of the CPU time available, while other threads receive 20 percent ("*(Based on a sample of 10 ms, that would be 8 ms and 2 ms, respectively.)*).

Note that when `SystemResponsiveness == 100` it would end up with skipping the part after `if ( CiSystemResponsiveness == 100 )`, the task init (`CiConfigInitializeFromRegistry`), thread priorities (didn't look futher into it yet, see [CiThreadUpdatePriorities](https://github.com/nohuto/decompiled-pseudocode/blob/main/mmcss/CiThreadUpdatePriorities.c)/[CiSchedulerSetPriority](https://github.com/nohuto/decompiled-pseudocode/blob/main/mmcss/CiSchedulerSetPriority.c)), but seems like that it would use a specific priority for the MMCSS thread instead of switching levels? It would also block CiNdisThrottleWorkItem (see below) and cause the [`CiSchedulerWait`](https://github.com/nohuto/decompiled-pseudocode/blob/main/mmcss/CiSchedulerWait.c) starvation threshold down to 0, so any busy-time increase can mark CPUs as starved (see [CiSchedulerWait](https://github.com/nohuto/decompiled-pseudocode/blob/main/mmcss/CiSchedulerWait.c) at line 118 and the bracket block of it).

Basically means MMCSS initialization fails if `SystemResponsiveness == 100`.

And as we can see here the MMCSS thread isn't present anymore if `100 (0x64)`:

![](https://github.com/nohuto/win-config/blob/main/system/images/mmcss-10-100.png?raw=true)

"*Determines the percentage of CPU resources that should be guaranteed to low-priority tasks. For example, if this value is 20, then 20% of CPU resources are reserved for low-priority tasks. Note that values that are not evenly divisible by 10 are rounded down to the nearest multiple of 10. Values below 10 and above 100 are clamped to 20. A value of 100 disables MMCSS (driver returns `STATUS_SERVER_DISABLED`).*" [[*]](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/ProcThread/multimedia-class-scheduler-service.md#registry-settings) (`mmcss.sys`)

```c
// CiConfigInitialize
{
  DWORD = CiConfigReadDWORD(KeyHandle, 0x1C0011090LL, 100LL); // SystemResponsiveness, missing = 100
  if ( DWORD - 10 > 0x5A ) // data - 10 > 90 = 20
    v2 = 20LL;
  else
    v2 = 10 * (DWORD / 0xA); // 10 step
  CiSystemResponsiveness = v2;
  if ( (HIDWORD(WPP_GLOBAL_Control->Timer) & 1) != 0 && BYTE1(WPP_GLOBAL_Control->Timer) >= 4u )
    WPP_SF_d(WPP_GLOBAL_Control->AttachedDevice, 18LL, &WPP_350503daac883abe7be9cf63f89038d9_Traceguids, v2);
  if ( CiSystemResponsiveness == 100 )
  {
    if ( (HIDWORD(WPP_GLOBAL_Control->Timer) & 1) != 0 && BYTE1(WPP_GLOBAL_Control->Timer) >= 2u )
      WPP_SF_(WPP_GLOBAL_Control->AttachedDevice, 19LL, &WPP_350503daac883abe7be9cf63f89038d9_Traceguids);
    v0 = -1073741696; // STATUS_SERVER_DISABLED
  }
  else // only if CiSystemResponsiveness =! 100
  {
  // all other values
  }
  ZwClose(KeyHandle);
}

// CsIntialize (blocking CiNdisThrottleWorkItem if 100)
if ( LODWORD(WPP_MAIN_CB.Dpc.DpcData) != -1 && CiSystemResponsiveness != 100 )
{
  CiNdisThrottleWorkItem = IoAllocateWorkItem(CiDeviceObject);
  if ( CiNdisThrottleWorkItem )
    CiNdisOpenDevice();
}
```
```c
// -1073741696 = 0xC0000080
0xC0000080 // STATUS_SERVER_DISABLED

The GUID allocation server is disabled at the moment.
```

> [ms-erref#0xC0000080](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55)

Calculation:
```c
CiSystemResponsiveness = 10 * (value / 10);

// Examples
< 10   -> 20   (fallback)
10-19  -> 10
20-29  -> 20
30-39  -> 30
40-49  -> 40
50-59  -> 50
60-69  -> 60
70-79  -> 70
80-89  -> 80
90-99  -> 90
== 100 -> 100  (STATUS_SERVER_DISABLED)
> 100  -> 20   (fallback)
```

## NetworkThrottlingIndex Details

"*MMCSS sends a special command to the network stack, telling it to throttle network packets during the duration of the media playback. This throttling is designed to maximize playback performance at the cost of some small loss in network throughput (which would not be noticeable for network operations usually performed during playback, such as playing an online game).*"

`0` becomes `1`, `1`-`70` stay unchanged, `71`-`4294967294` become `70`, `4294967295` (`0xFFFFFFFF`) stays unchanged.

As shown above (and again below), if `CiSystemResponsiveness == 100` it doesn't even get to this part = blocking `CiNdisThrottleWorkItem`.

```c
// CiConfigInitialize
v3 = CiConfigReadDWORD(KeyHandle, 0x1C00110A0LL, 10LL); // NetworkThrottlingIndex, missing = 10
LODWORD(WPP_MAIN_CB.Dpc.DpcData) = v3;
v4 = v3;
if ( v3 )
{
  if ( v3 - 71 <= 0xFFFFFFB7 ) // >=71 = 70
  {
    v4 = 70LL;
    LODWORD(WPP_MAIN_CB.Dpc.DpcData) = 70; // range 1-70
  }
}
else
{
  v4 = 1LL; // zero -> force 1
  LODWORD(WPP_MAIN_CB.Dpc.DpcData) = 1;
}

// CsIntialize
if ( LODWORD(WPP_MAIN_CB.Dpc.DpcData) != -1 && CiSystemResponsiveness != 100 )
{
  CiNdisThrottleWorkItem = IoAllocateWorkItem(CiDeviceObject);
  if ( CiNdisThrottleWorkItem )
    CiNdisOpenDevice();
}
```

## [Tasks Details](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/ProcThread/multimedia-class-scheduler-service.md#registry-settings)

Existing tasks (OEMs can add additional tasks):
- Audio
- Capture
- Distribution
- Games
- Playback
- Pro Audio
- Window Manager

| Value | Format | Possible values |
| --- | --- | --- |
| **Affinity** | **REG\_DWORD** | A bitmask that indicates the processor affinity. Both 0x00 and 0xFFFFFFFF indicate that processor affinity is not used. |
| **Background Only** | **REG\_SZ**    | Indicates whether this is a background task (no user interface). The threads of a background task do not change because of a change in window focus. This value can be set to True or False. |
| **BackgroundPriority** | **REG\_DWORD** | The background priority. The range of values is 1-8. |
| **Clock Rate** | **REG\_DWORD** | A hint used by MMCSS to determine the granularity of processor resource scheduling.**Windows Server 2008 and Windows Vista:** The maximum guaranteed clock rate the system uses if a thread joins this task, in 100-nanosecond intervals. Starting with Windows 7 and Windows Server 2008 R2, this guarantee was removed to reduce system power consumption.<br/> |
| **GPU Priority** | **REG\_DWORD** | The GPU priority. The range of values is 0-31. This priority is not yet used. |
| **Priority** | **REG\_DWORD** | The task priority. The range of values is 1 (low) to 8 (high).For tasks with a **Scheduling Category** of High, this value is always treated as 2.<br/> |
| **Scheduling Category** | **REG\_SZ**    | The scheduling category. This value can be set to High, Medium, or Low. |
| **SFIO Priority** | **REG\_SZ** | The scheduled I/O priority. This value can be set to Idle, Low, Normal, or High. This value is not used. |

![](https://github.com/nohuto/win-config/blob/main/system/images/mmcss1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/mmcss2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/mmcss3.png?raw=true)

## NoLazyMode Details

`NoLazyMode` = `0` (default)
`LazyModeTimeout` = `1000000` (default)

It sets `NoLazyMode` to `0`, don't set it to `1`. This is currently more likely a placeholder for future documentation. Instead of using `NoLazyMode`, change `LazyModeTimeout`.

```
\Registry\Machine\SOFTWARE\Microsoft\Windows NT\CurrentVersion\MultiMedia\systemprofile : NoLazyMode
```

`AlwaysOn` value exists in W7 and W8, but doesn't exist in W10 and W11 anymore.

"*The screenshot below demonstrates some of the initial differences between each mode enabled (0x1) vs off (x0, Non-Present), during these tests MMCSS tasks were engaged and the same pattern reoccurred each time e.g. the Idle related conditions were no longer present leaving only System Responsiveness, Deep Sleep and Realtime MMCSS scheduler task results.*" [[*]](https://github.com/djdallmann/GamingPCSetup/blob/master/CONTENT/RESEARCH/WINSERVICES/README.md#q-what-the-heck-is-nolazymode-is-it-real-what-does-it-do)

![](https://github.com/nohuto/win-config/blob/main/system/images/nolazymode.png?raw=true)
