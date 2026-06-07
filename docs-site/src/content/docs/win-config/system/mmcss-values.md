---
title: 'MMCSS Values'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 3
---

Everything below is based on the 11-23H2 mmcss driver pseudocode (see [bin-diff](https://noverse.dev/bin-diff?left=11-23H2&right=11-25H2&module=mmcss&function=CiConfigInitialize.c&mode=side-by-side) if you want to see changes on newer builds)/ WPR (`Microsoft-Windows-MMCSS` provider).

> "*The Multimedia Class Scheduler service (MMCSS) enables multimedia applications to ensure that their time-sensitive processing receives prioritized access to CPU resources. This service enables multimedia applications to utilize as much of the CPU as possible without denying CPU resources to lower-priority applications.*
>
> — Microsoft, [Multimedia Class Scheduler Service](https://learn.microsoft.com/en-us/windows/win32/procthread/multimedia-class-scheduler-service)

The MMCSS scheduler thread is set to priority `27`, as it must preempt Pro Audio threads so it can lower them to the exhausted category when their guaranteed period is over.

```c
// CiSchedulerThreadFunction
CurrentThread = KeGetCurrentThread();
CiThreadsMovedUp = 1;
CiSchedulerThread = CurrentThread;
CiSchedulerInLazyMode = 0;
KeSetActualBasePriorityThread(CurrentThread, 27LL); // scheduler thread priority
```

![](https://github.com/nohuto/win-config/blob/main/system/images/mmcssprio.png?raw=true)

You can practically also see the priority of `CiSchedulerThread` using WinDbg:

```c
lkd> dq mmcss!CiSchedulerThread L1
fffff800`3aee8298  ffffe409`67145040

lkd> !thread ffffe409`67145040
THREAD ffffe40967145040  Cid 0004.0a2c  Teb: 0000000000000000 Win32Thread: 0000000000000000 WAIT: (Executive) KernelMode Alertable
    ffffe409634683b0  Timer2SynchronizationObject
Not impersonating
DeviceMap                 ffff840575e1a610
Owning Process            ffffe4095d502080       Image:         System
Attached Process          N/A            Image:         N/A
Wait Start TickCount      224914         Ticks: 28 (0:00:00:00.437)
Context Switch Count      376449         IdealProcessor: 2             
UserTime                  00:00:00.000
KernelTime                00:00:00.000
Win32 Start Address 0xfffff8003aee2e60
Stack Init fffffa80b5f7fc30 Current fffffa80b5f7f350
Base fffffa80b5f80000 Limit fffffa80b5f79000 Call 0000000000000000
Priority 27  BasePriority 27  Priority Floor 27  IoPriority 2  PagePriority 5
```

## Registry Values

All values below are read via [`CiConfigReadDWORD`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiConfigReadDWORD.c), means the accepted type is `REG_DWORD`.  The values shown below are fallbacks used when the value is missing/not in range/not a `REG_DWORD` (`SystemResponsiveness` = `20`, `NetworkThrottlingIndex` = `10` exist on a new installation, so beside these the data listed below is used).

```c
"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile";
    "SystemResponsiveness" = 100; // clamped to 10-100, 100 disables MMCSS, <10 or >100 = 20
    "NetworkThrottlingIndex" = 10; // 0 = 1, 1-70 stay, 71-0xFFFFFFFE = 70, 0xFFFFFFFF disables NDIS throttle
    "NoLazyMode" = 0; // bool
    "IdleDetectionCycles" = 2; // range 1-31
    "LazyModeTimeout" = 1000000; // 0 replaced with 1000000, no upper clamp?
    "SchedulerTimerResolution" = 10000; // values above 10000 capped to 10000
    "SchedulerPeriod" = 100000; // range 50000-1000000
    "MaxThreadsPerProcess" = 32; // range 8-128
    "MaxThreadsTotal" = 256; // range 64-65535
```

### DriverStart + RVAs

Everything below isn't needed when reloading the MMCSS module, simple way:

```c
lkd> .reload /f mmcss.sys
lkd> lm m mmcss
Browse full module list
start             end                 module name
fffff801`890e0000 fffff801`890f6000   mmcss      (pdb symbols)          C:\ProgramData\Dbg\sym\mmcss.pdb\9E36707273FDF82AB362DBA6ACCC09671\mmcss.pdb
lkd> dd mmcss!CiSystemResponsiveness L1
fffff801`890e82f8  00000014
lkd> dd mmcss!CiNetworkThrottlingIndex L1
fffff801`890e81c0  0000000a
lkd> db mmcss!CiSchedulerDisallowLazyMode L1
fffff801`890e82d5  00                                               .
lkd> dd mmcss!CiSchedulerIdleDetectionCycles L1
fffff801`890e828c  00000002
lkd> dd mmcss!CiSchedulerLazyModeTimeout L1
fffff801`890e81c4  000f4240
lkd> dd mmcss!CiSchedulerTimerResolution L1
fffff801`890e81c8  00002710
lkd> dd mmcss!CiSchedulerPeriod L1
fffff801`890e81cc  000186a0
lkd> dd mmcss!CiMaxThreadsTotal L1
fffff801`890e8090  00000100
lkd> dd mmcss!CiMaxThreadsPerProcess L1
fffff801`890e8094  00000020
```

A different way to read current values is via RVAs (*Relative Virtual Address*, means an address relative to the modules image base), to do so get the `DriverStart` address + the RVA of whatever you want to read.

```c
lkd> !drvobj MMCSS
Driver object (ffffb68b3754ba70) is for:
 \Driver\MMCSS

Driver Extension List: (id , addr)

Device Object list:
ffffb68b375dfca0  
lkd> dt nt!_DRIVER_OBJECT ffffb68b3754ba70 DriverStart
   +0x018 DriverStart : 0xfffff801`890e0000 Void

// or just via lm

lkd> lm m mmcss
Browse full module list
start             end                 module name
fffff801`890e0000 fffff801`890f6000   mmcss      (pdb symbols)          C:\ProgramData\Dbg\sym\mmcss.pdb\9E36707273FDF82AB362DBA6ACCC09671\mmcss.pdb
```

So for example you want to read the current value of `CiSystemResponsiveness` (IDA):

```asm
.data:00000001C00082F8 CiSystemResponsiveness dd 0
```

Get the current image base from `Edit > Segments > Rebase program` (`0x1C0000000` for me), and subtract it from the address above, means `0x1C00082F8 - 0x1C0000000 = 0x82F8` which is the RVA for `CiSystemResponsiveness`.

Then use the `DriverStart` address + RVA:

```c
lkd> dd 0xfffff801`890e82F8 L1
fffff800`3aee82f8  0000000a // 10
```

## SystemResponsiveness

If `SystemResponsiveness == 100`, [`CiConfigInitialize`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiConfigInitialize.c) returns before the rest of the values and the `Tasks` key are read, it also prevents scheduler initialization later in [`CsInitialize`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CsInitialize.c), means as written above it disables MMCSS.

![](https://github.com/nohuto/win-config/blob/main/system/images/mmcss-10-100.png?raw=true)

For other values than 100, [`CiSchedulerInitialize`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerInitialize.c) splits `SchedulerPeriod` with `CiSystemResponsiveness`, see [`SchedulerPeriod`](https://noverse.dev/docs/win-config/system/mmcss-values/#schedulerperiod) section for more details on that.

> "*Determines the percentage of CPU resources that should be guaranteed to low-priority tasks. For example, if this value is 20, then 20% of CPU resources are reserved for low-priority tasks. Note that values that are not evenly divisible by 10 are rounded down to the nearest multiple of 10. Values below 10 and above 100 are clamped to 20. A value of 100 disables MMCSS (driver returns `STATUS_SERVER_DISABLED`).*"
>
> — Microsoft, [Multimedia Class Scheduler Service](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/ProcThread/multimedia-class-scheduler-service.md#registry-settings)

```c
// CiConfigInitialize
DWORD = CiConfigReadDWORD(KeyHandle, 0x1C0011090LL, 100LL); // SystemResponsiveness, fallback = 100
if ( DWORD - 10 > 0x5A )
  v2 = 20; // <10 or >100
else
  v2 = 10 * (DWORD / 0xA); // round down to multiple of 10
CiSystemResponsiveness = v2;

if ( CiSystemResponsiveness == 100 )
{
  v0 = -1073741696; // STATUS_SERVER_DISABLED
}
else
{
// values and Tasks
}
```

### Calculation

```c
CiSystemResponsiveness = 10 * (value / 10);

< 10 -> 20 // fallback since not in range
10-19 -> 10
20-29 -> 20
30-39 -> 30
40-49 -> 40
50-59 -> 50
60-69 -> 60
70-79 -> 70
80-89 -> 80
90-99 -> 90
== 100 -> 100 // STATUS_SERVER_DISABLED
> 100 -> 20 // fallback since not in range
```

## NetworkThrottlingIndex

When at least one scheduled MMCSS thread (thread that registers with MMCSS task) exists, [`CiNdisThrottle`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiNdisThrottle.c) sends the value to NDIS. When the last scheduled MMCSS thread leaves, it would send `-1` to remove the throttle again.

> "*MMCSS functionality does not stop at simple priority boosting, however. Because of the nature of network drivers on Windows and the NDIS stack, DPCs are quite common mechanisms for delaying work after an interrupt has been received from the network card. Because DPCs run at an IRQL level higher than user-mode code, long-running network card driver code can still interrupt media playback—for example, during network transfers or when playing a game.*
>
> *MMCSS sends a special command to the network stack, telling it to throttle network packets during the duration of the media playback. This throttling is designed to maximize playback performance at the cost of some small loss in network throughput (which would not be noticeable for network operations usually performed during playback, such as playing an online game).*"
>
> — Windows Internals, [E7, P1: 'Priority boosts for multimedia applications and games'](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

```c
// CiConfigInitialize
v3 = CiConfigReadDWORD(KeyHandle, 0x1C00110A0LL, 10LL); // NetworkThrottlingIndex, fallback = 10
LODWORD(WPP_MAIN_CB.Dpc.DpcData) = v3;
v4 = v3;
if ( v3 )
{
  if ( (unsigned int)(v3 - 71) <= 0xFFFFFFB7 )
  {
    v4 = 70;
    LODWORD(WPP_MAIN_CB.Dpc.DpcData) = 70; // 71-0xFFFFFFFE = 70
  }
}
else
{
  v4 = 1;
  LODWORD(WPP_MAIN_CB.Dpc.DpcData) = 1; // 0 = 1
}
```

Note that [`CsInitialize`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CsInitialize.c) only opens the NDIS part when the value isn't `-1` (`0xFFFFFFFF`) and MMCSS wasn't disabled by `SystemResponsiveness == 100`.

```c
// CsInitialize
if ( LODWORD(WPP_MAIN_CB.Dpc.DpcData) != -1 && CiSystemResponsiveness != 100 )
{
  CiNdisThrottleWorkItem = IoAllocateWorkItem(CiDeviceObject);
  if ( CiNdisThrottleWorkItem )
    CiNdisOpenDevice();
}
```

## NoLazyMode

MMCSS samples CPU idle/starvation (`CiPotentiallyStarvedProcessors`) state and increases `CiProcessorIdleHistoryBits`, whenever the history reaches `(1 << IdleDetectionCycles) - 1` it enters lazy mode and uses `LazyModeTimeout` for lazy mode sleeps.

`NoLazyMode = 1` only disables idle detection, causing `IdleDetection` & `IdleDetectionLazy` to disappear. It doesn't disable the normal boosted/exhausted sleeps (`Realtime`/`SleepResponsiveness`), `DeepSleep`, or an already set lazy state sleep (`SleepRealtimeLazy`). That's also why the `SchedulerPeriod` split is visible with `NoLazyMode = 1`, as `Realtime`/`SleepResponsiveness` use the boosted/exhausted durations (with `NoLazyMode = 0` it would show that as `IdleDetection`).

You can see that in the picture of the [SchedulerPeriod](https://noverse.dev/docs/win-config/system/mmcss-values/#schedulerperiod) section.

```c
// CiConfigInitialize
v5 = (unsigned __int8)CiConfigReadDWORD(KeyHandle, 0x1C0011080LL, 0LL) != 0;
CiSchedulerDisallowLazyMode = v5; // '!= 0' = DisallowLazyMode
```

```c
// CiSchedulerWait
if ( !CiSchedulerDisallowLazyMode )
{
// CPU idle stats, update CiProcessorIdleHistoryBits
}
```

### Scheduler_Sleep Reasons

| Reason | Meaning | Duration |
| --- | --- | --- |
| `Realtime` | boosted sleep | boosted duration `SchedulerPeriod - (SchedulerPeriod * SystemResponsiveness / 100)` |
| `SleepResponsiveness` | exhaused sleep | exhausted duration `SchedulerPeriod * SystemResponsiveness / 100` |
| `SleepRealtimeLazy` | when `CiSchedulerInLazyMode` was already set before the normal boosted sleep | `LazyModeTimeout` |
| `IdleDetection` | idle history exists but hasn't reached `CiSchedulerIdleCycleBitMask` | `SchedulerPeriod` |
| `IdleDetectionLazy` | idle history reached `CiSchedulerIdleCycleBitMask` | `LazyModeTimeout` |
| `DeepSleep` | [`CiSchedulerDeepSleep`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerDeepSleep.c) | `4,294,967,295` |

## IdleDetectionCycles

[`CiSchedulerWait`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerWait.c) compares `CiProcessorIdleHistoryBits` against `CiSchedulerIdleCycleBitMask`, so larger values need more idle detection passes before lazy mode can be entered. While the history is nonzero but still below the mask, it logs `IdleDetection` and sleeps for `SchedulerPeriod`. Once the history reaches the mask, it logs `IdleDetectionLazy` and sleeps for `LazyModeTimeout`.

This can be seen in `Scheduler_Sleep` (always `IdleDetectionCycles - 1`, as `IdleDetectionLazy` is only logged on the pass where `CiProcessorIdleHistoryBits` first reaches the full mask):

![](https://github.com/nohuto/win-config/blob/main/system/images/IdleDetectionCycles.png?raw=true)

```c
// CiConfigInitialize
v6 = CiConfigReadDWORD(KeyHandle, 0x1C00110B0LL, 2LL); // fallback = 2
CiSchedulerIdleDetectionCycles = v6;
if ( (unsigned int)(v6 - 1) > 0x1E )
  CiSchedulerIdleDetectionCycles = 2; // range 1-31

CiSchedulerIdleCycleBitMask = (1 << CiSchedulerIdleDetectionCycles) - 1;
```

## LazyModeTimeout

Sleep duration used when MMCSS is in lazy mode. This is used for `IdleDetectionLazy` (or `SleepRealtimeLazy`):

![](https://github.com/nohuto/win-config/blob/main/system/images/LazyModeTimeout.png?raw=true)

```c
// CiConfigInitialize
HIDWORD(WPP_MAIN_CB.Dpc.DpcData) =
  CiConfigReadDWORD(KeyHandle, 0x1C00110C0LL, 1000000LL); // LazyModeTimeout, fallback = 1000000

if ( !HIDWORD(WPP_MAIN_CB.Dpc.DpcData) )
  HIDWORD(WPP_MAIN_CB.Dpc.DpcData) = 1000000; // 0 replaced
```

[`CiSchedulerWait`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerWait.c) passes this value to [`CiSchedulerSleep`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerSleep.c) when `CiSchedulerInLazyMode` is true.

```c
// CiSchedulerWait
if ( CiSchedulerInLazyMode )
{
  DpcData_high = HIDWORD(WPP_MAIN_CB.Dpc.DpcData); // LazyModeTimeout
  v4 = 2;
}

CiSchedulerSleep(v4, DpcData_high, v2);
```

## SchedulerTimerResolution

Clamps the requested yield/deadline times so they aren't shorter than this value. With `SchedulerTimerResolution = 10000` (`1 ms`), a request like `0.5 ms` is raised to `1 ms`, so the deadline/yield part won't schedule the thread back to its higher priority sooner than `1 ms` after the yield request.

This is used by [`CiSchedulerTaskIndexYield`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerTaskIndexYield.c), the requested `Duration` and `PreDuration` are raised to `SchedulerTimerResolution` if they're smaller (changed values are logged by `TaskIndex_Yield`).

While doing several captures I didn't see any request below `1 ms` so from my current state I would say that this has no actual use.

> "*MMCSS also supports a feature called deadline scheduling. The idea is that an audio-playing program does not always need the highest priority level in its category. If such a program uses buffering (obtaining audio data from disk or network) and then plays the buffer while building the next buffer, deadline scheduling allows a client thread to indicate a time when it must get the high priority level to avoid glitches, but live with a slightly lower priority (within its category) in the meantime. A thread can use the AvTaskIndexYield function to indicate the next time it must be allowed to run, specifying the time it needs to get the highest priority within its category. Until that time arrives, it gets the lowest priority within its category, potentially freeing more CPU time to the system*"
>
> — Windows Internals, [E7, P1: 'Priority boosts for multimedia applications and games'](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

```c
// CiConfigInitialize
WPP_MAIN_CB.ActiveThreadCount =
  CiConfigReadDWORD(KeyHandle, 0x1C00110D0LL, 10000LL); // SchedulerTimerResolution, fallback = 10000

if ( WPP_MAIN_CB.ActiveThreadCount > 0x2710 ) // 0x2710 = 10000
  WPP_MAIN_CB.ActiveThreadCount = 10000; // upper clamp
```

```c
// CiSchedulerTaskIndexYield
if ( a2 < WPP_MAIN_CB.ActiveThreadCount )
  ActiveThreadCount = WPP_MAIN_CB.ActiveThreadCount;

if ( a3 < WPP_MAIN_CB.ActiveThreadCount )
  v4 = WPP_MAIN_CB.ActiveThreadCount;
```

## SchedulerPeriod

As the name says it's the MMCSS scheduler period where registered multimedia threads run at their category priority for a guaranteed part, then get lowered (`1-7`) so other threads can run.

```c
// CiConfigInitialize
v9 = CiConfigReadDWORD(KeyHandle, 0x1C00110E0LL, 100000LL); // SchedulerPeriod, fallback = 100000
*(&WPP_MAIN_CB.ActiveThreadCount + 1) = v9;
if ( (unsigned int)(v9 - 50000) > 0xE7EF0 )
  *(&WPP_MAIN_CB.ActiveThreadCount + 1) = 100000; // range 50000-1000000
```

Used by [`CiSchedulerInitialize`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiSchedulerInitialize.c), where `SystemResponsiveness` splits the period into two durations:

```c
// CiSchedulerInitialize
HIDWORD(WPP_MAIN_CB.SecurityDescriptor) =
  SchedulerPeriod * CiSystemResponsiveness / 100; // exhausted duration

LODWORD(WPP_MAIN_CB.SecurityDescriptor) =
  SchedulerPeriod - SchedulerPeriod * CiSystemResponsiveness / 100; // boosted duration
```

With `SchedulerPeriod = 50000` & `SystemResponsiveness = 30`, this would mean:

```c
exhausted duration = 50000 * 30 / 100 = 15000
boosted duration = 50000 - (50000 * 30 / 100) = 35000
```

You can see that split (when `NoLazyMode` is 1) in `Scheduler_Sleep` via `Realtime` (boosted)/`SleepResponsiveness` (exhausted) reasons:

![](https://github.com/nohuto/win-config/blob/main/system/images/SchedulerPeriod.png?raw=true)

### Calculation Examples

> "*By default, multimedia threads get 80 percent of the CPU time available, while other threads receive 20 percent. (Based on a sample of 10 ms, that would be 8 ms and 2 ms, respectively.)*"
>
> — Windows Internals, [E7, P1: 'Priority boosts for multimedia applications and games'](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

The "*10 ms*" in that quote = `SchedulerPeriod = 100000`.

```c
// SchedulerPeriod = 100000 (default)
SystemResponsiveness = 10
exhausted = 100000 * 10 / 100 = 10000 // 1ms
boosted = 100000 - 10000 = 90000 // 9ms

// Windows Internals example (both default data)
SystemResponsiveness = 20
exhausted = 100000 * 20 / 100 = 20000 // 2ms
boosted = 100000 - 20000 = 80000 // 8ms

// SchedulerPeriod = 50000 (min)
SystemResponsiveness = 20
exhausted = 50000 * 20 / 100 = 10000 // 1ms
boosted = 50000 - 10000 = 40000 // 4ms

// SchedulerPeriod = 1000000 (max)
SystemResponsiveness = 20
exhausted = 1000000 * 20 / 100 = 200000 // 20ms
boosted = 1000000 - 200000 = 800000 // 80ms
```

## MaxThreadsPerProcess / MaxThreadsTotal

Limits how many MMCSS threads can exist, `MaxThreadsTotal` is checked against `CiTotalThreads` (MMCSS threads of all processes), `MaxThreadsPerProcess` after that against the MMCSS thread count of the current process.

```c
// CiConfigInitialize
v10 = CiConfigReadDWORD(KeyHandle, 0x1C00110F0LL, 32LL); // MaxThreadsPerProcess, fallback = 32
CiMaxThreadsPerProcess = v10;
if ( (unsigned int)(v10 - 8) > 0x78 )
  CiMaxThreadsPerProcess = 32; // range 8-128

v11 = CiConfigReadDWORD(KeyHandle, 0x1C0011100LL, 256LL); // MaxThreadsTotal, fallback = 256
CiMaxThreadsTotal = v11;
if ( (unsigned int)(v11 - 64) > 0xFFBF )
  CiMaxThreadsTotal = 256; // range 64-65535
```

[`CiTryIncrementTotalThreadCount`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiTryIncrementTotalThreadCount.c) would return an error (`STATUS_TOO_MANY_THREADS`) whenever the count is at or above the maximum.

```c
// CiThreadCreate
v9 = CiTryIncrementTotalThreadCount(&CiTotalThreads, CiMaxThreadsTotal);

v9 = CiTryIncrementTotalThreadCount((volatile signed __int32 *)(v8 + 92), CiMaxThreadsPerProcess);
```

You can use WinDbg to see the current total:

```c
lkd> dd mmcss!CiTotalThreads L1
fffff800`3aee82d0  00000004
```

You can also get MMCSS thread counts from processes via WinDbg but thats not as simple which is why I won't add it here.

## Tasks

> *MMCSS uses information stored in the registry to identify supported tasks and determine the relative priority of threads performing these tasks. Each thread that is performing work related to a particular task calls the [AvSetMmMaxThreadCharacteristics](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmmaxthreadcharacteristicsa) or [AvSetMmThreadCharacteristics](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadcharacteristicsa) function to inform MMCSS that it is working on that task.*"
>
> — Microsoft, [Multimedia Class Scheduler Service](https://learn.microsoft.com/en-us/windows/win32/procthread/multimedia-class-scheduler-service)

Task keys are read only if `SystemResponsiveness != 100` as already shown above. These are the default tasks:

- `Audio`
- `Capture`
- `Distribution`
- `Games`
- `Playback`
- `Pro Audio`
- `Window Manager`

You can see in `Thread_SetChars` (or `Thread_Join`) which task a thread registered with. I didn't see any app registering with other tasks than `Audio`/`Pro Audio` yet.

![](https://github.com/nohuto/win-config/blob/main/system/images/Thread_SetChars.png?raw=true)

### [Task Values](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/ProcThread/multimedia-class-scheduler-service.md#registry-settings)

| Value | Format | Possible values |
| --- | --- | --- |
| **Affinity** | `REG_DWORD` | A bitmask that indicates the processor affinity. Both `0x00` and `0xFFFFFFFF` indicate that processor affinity is not used. |
| **Background Only** | `REG_SZ` | Indicates whether this is a background task (no user interface). The threads of a background task do not change because of a change in window focus. This value can be set to `True` or `False`. |
| **BackgroundPriority** | `REG_DWORD` | The background priority. The range of values is `1-8`. |
| **Clock Rate** | `REG_DWORD` | A hint used by MMCSS to determine the granularity of processor resource scheduling. **Windows Server 2008 and Windows Vista:** The maximum guaranteed clock rate the system uses if a thread joins this task, in 100-nanosecond intervals. Starting with Windows 7 and Windows Server 2008 R2, this guarantee was removed to reduce system power consumption.<br/> |
| **GPU Priority** | `REG_DWORD` | The GPU priority. The range of values is `0-31`. This priority is not yet used. |
| **Priority** | `REG_DWORD` | The task priority. The range of values is `1` (low) to `8` (high). For tasks with a **Scheduling Category** of High, this value is always treated as `2`. |
| **Scheduling Category** | `REG_SZ` | The scheduling category. This value can be set to High, Medium, or Low. |
| **SFIO Priority** | `REG_SZ` | The scheduled I/O priority. This value can be set to Idle, Low, Normal, or High. This value is not used. |

Some additional notes:
- `Clock Rate` range `5000-10000`, default of `10000`
- `Latency Sensitive` (`REG_SZ`, can be `True`/`False`) also exists (is visible in logging), but I didn't find any point where this is used
- `Priority When Yielded` (`REG_DWORD`) range `1-19`, default of `16`
- MS adding "not used" to `GPU Priority`/`SFIO Priority` isn't really accurate, as it's not even possible to "use" them as they don't exist in the driver

### Boosted/Exhausted Priorities

This part `For tasks with a Scheduling Category of High, this value is always treated as 2.` doesn't refer to the exhausted priority, only to the boosted priority. `Priority` gets stored as `prio - 1`, means 2 = 1, 3 = 2 etc., value 1 (which would be 0) gets clamped to 1 when calculating the exhausted priority. This doesn't mean that 1 and 2 are the same (they've the same exhaused priority), but boosted priority still differs.

The boosted priority gets calculated using the `Scheduling Category` and the `Priority` value (after subtraction), so if using category `Medium` + priority of `6` the boosted priority would be `16 + 5 = 21`. If using category `High` and `Priority = 6`, the exhausted priority would be `5`, but the boosted base is forced to `24` (by [`CiConfigTaskPolicy`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/mmcss/CiConfigTaskPolicy.c)). Relative priority can then move that boosted value within `23-26` (see [relative-priorities](https://noverse.dev/docs/win-config/system/mmcss-values/#relative-priorities)), means:

```c
// Low/Medium
boosted = categoryBase + (Priority - 1) + relativePriority

// High
boosted = 24 // with relative priority it can be 23-26
```

### [Thread Priorities](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/ProcThread/multimedia-class-scheduler-service.md#thread-priorities)

The MMCSS boosts the priority of threads that are working on high-priority multimedia tasks. MMCSS determines the priority of a thread using the following factors:

- The base priority of the task.
- The *Priority* parameter of the [**AvSetMmThreadPriority**](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadpriority) function.
- Whether the application is in the foreground.
- How much CPU time is being consumed by the threads in each category.

MMCSS sets the priority of client threads depending on their scheduling category.

| Category | Priority | Description |
| --- | --- | --- |
| High | 23-26 | These threads run at a thread priority that is lower than only certain system-level tasks. This category is designed for Pro Audio tasks. |
| Medium | 16-22 | These threads are part of the application that is in the foreground. |
| Low | 8-15 | This category contains the remainder of the threads. They are guaranteed a minimum percentage of the CPU resources if required. |
| | 1-7 | These threads have used their quota of CPU resource. They can continue to run if no low-priority threads are ready to run. |

## Watching the MMCSS Boost

> "*The main mechanism behind MMCSS boosts the priority of threads inside a registered process to the priority level matching their scheduling category and relative priority within this category for a guaranteed period. It then lowers those threads to the exhausted category so that other, non-multimedia threads on the system can also get a chance to execute.*"
>
> *As discussed, changing the relative thread priorities within a process does not usually make sense, and no tool allows this because only developers understand the importance of the various threads in their programs. On the other hand, because applications must manually register with MMCSS and provide it with information about what kind of thread this is, MMCSS does have the necessary data to change these relative thread priorities—and developers are well aware that this will happen.*
>
> — Windows Internals, [E7, P1: 'Priority boosts for multimedia applications and games'](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

[`mmcss_task`](https://github.com/nohuto/win-config/blob/main/system/assets/mmcss_task) calls [`AvSetMmThreadCharacteristicsW`](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadcharacteristicsw) for the used MMCSS task, optionally calls [`AvSetMmThreadPriority`](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadpriority), then keeps the thread busy (loop), this also means that the examples below make it easy to see the changes, but when capturing Spotify/audiodg it won't look the same.

This follows the `EXPERIMENT: MMCSS priority boosting` guide of [Windows Internals E7, P1](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf), but uses `mmcss_task` instead of Media Player/CPUSTRES.

Perfmon has a minumum sample rate of 1 second which isn't optimal for looking at priority switches, as the default MMCSS scheduler period is `10 ms` (`SchedulerPeriod = 100000`, means one PerfMon point can cover ~100 MMCSS cycles), which is why I used WPA & MXA to show examples. You can still use it but don't use the graph as "accurate priority changes".

1. Download [mmcss_task](https://github.com/nohuto/win-config/blob/main/system/assets/mmcss_task.exe), or build it yourself from [source](https://github.com/nohuto/win-config/blob/main/system/assets/mmcss_task):

```powershell
cmake -S . -B build
cmake --build build --config Release

.\build\Release\mmcss_task.exe
```

2. Run it with the MMCSS task you want to test, e.g.:

```powershell
.\mmcss_task.exe Audio
```

3. Start Performance Monitor & set it's priority class to `Realtime`
4. In Performance Monitor, click `Add Counter` or press `Ctrl+I`
5. Select the `Thread` object, then add `Priority Current`
6. In `Instances`, search for `mmcss_task` and select `mmcss_task/0`
7. Open graph properties and set the maximum vertical scale to `32`
8. Watch `Priority Current`

You can also change the relative priority by adding an argument (the number):

```c
// avrt.h

typedef enum _AVRT_PRIORITY
{
    AVRT_PRIORITY_VERYLOW = -2,
    AVRT_PRIORITY_LOW, // -1
    AVRT_PRIORITY_NORMAL, // 0 or nothing
    AVRT_PRIORITY_HIGH, // 1
    AVRT_PRIORITY_CRITICAL // 2
} AVRT_PRIORITY, *PAVRT_PRIORITY;
```

[MS doc](https://learn.microsoft.com/en-us/windows/win32/api/avrt/nf-avrt-avsetmmthreadpriority) doesn't define `-2`, SDK does and it works so I'll leave it.

```powershell
.\mmcss_task.exe Audio 1 # AVRT_PRIORITY_HIGH
.\mmcss_task.exe Audio -1 # AVRT_PRIORITY_LOW
```

### Relative Priorities

Spotify/audiodg seem to use `AVRT_PRIORITY_HIGH`.

Example using `Scheduling Category = High` and `Priority = 6` (this would normally always use boosted priority of 24):

| Relative priority | Range |
| --- | --- |
| `-2` | `3-23` |
| `-1` | `4-23` |
| `0` | `5-24` |
| `1` | `6-25` |
| `2` | `7-26` |

`-2` and `-1` have the same boosted priority as *High category* is clamped to `23`.

![](https://github.com/nohuto/win-config/blob/main/system/images/relativeprios.png?raw=true)

### Scheduling Category / Priority

| Color | Scheduling Category | Priority | Range |
| --- | --- | --- | --- |
| Green | `Medium` | `2` | `1-17` |
| Red | `Medium` | `3` | `2-18` |
| Purple | `Medium` | `5` | `4-20` |
| Yellow | `High` | `1` | `1-24` |

![](https://github.com/nohuto/win-config/blob/main/system/images/categories.png?raw=true)
