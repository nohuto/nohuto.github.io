---
title: 'Quantum/Priority Separation'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 1
---

A quantum is the amount of time a thread is permitted to run before Windows checks to see whether another thread at the same priority is waiting to run. If a thread completes its quantum and there are no other threads at its priority, Windows permits the thread to run for another quantum.

You can calculate the clock cycles per quantum by dumping the value of `KiCyclesPerClockQuantum` (`dd nt!KiCyclesPerClockQuantum L1`), or follow the 'EXPERIMENT: Determining the clock cycles per quantum' in [Windows Internals E7, P1](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).

Gets applied with:
```c
PsChangeQuantumTable(0, PsRawPrioritySeparation);
```

Only the first 6 bits are used (`PsChangeQuantumTable` = `a2 & 3` (bit 0/1), `a2 & 0xC` (bit 2/3), `a2 & 0x30` (bit 4/5)).

Client defaults are short + variable. Server defaults are long + fixed.

## Bits 0/1

For each extra priority level (up to 2), another quantum is given to the thread. For example, if the thread receives a boost of one priority level, it receives an extra quantum as well. By default, Windows sets the maximum possible priority boost to foreground threads, meaning that the priority separation will be 2, which means quantum index 2 is selected in the variable quantum table. This leads to the thread receiving two extra quantums, for a total of three quantums.

Clamped to `2`:
```c
v3 = a2 & 3;
if ( v3 >= 2 )
  v3 = 2;
PsPrioritySeparation = v3;
```

`00` = `0`: no foreground quantum advantage, foreground priority adds `+0` in boost part ("*The threads of foreground processes get the same amount of processor time as the threads of background processes and as the threads of processes with a priority class of Idle.*")  
`01` = `1`: foreground priority adds `+1` ("*2:1. The threads of foreground processes get twice the processor time as the threads of background processes each time they are scheduled for the processor.*")  
`10` = `2`: foreground priority adds `+2` ("*3:1. The threads of foreground processes get three times the processor time as the threads of background processes each time they are scheduled for the processor.*")  
`11` = `2`: same behavior as `10` because of the clamp.

### Watching the Boost

This follows the 'EXPERIMENT: Watching foreground priority boosts and decays' guide of [Windows Internals E7, P1](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).

1. Download [CPUSTRES](https://live.sysinternals.com/CPUSTRES.EXE)
2. Set bits 1/0 to the state you want to look at, in this test we will use `PsPrioritySeparation` = `2` (means bit `10`/`11`)
3. Open CPUSTRES & `perfmon`, change activity lebel of first thread to '*Busy*'
4. Open '*Performance Monitor*' tab in perfmon
5. Right click on the graph -> `Add Counters` -> `Thread` -> `Priority Current`
6. Select `<All instances>` in the combobox, click '*Search*'
7. Select `CPUSTRES/1` (`CPUSTRES/0` = GUI thread) -> '*Add*' -> '*OK*'
8. Right click graph -> Properties -> Graph -> Verical scale maximum to `16`
9. Unselect `Processor Time` counter, move CPUSTRES to FG/BG

By doing so you'll see that `PsPrioritySeparation` = `2` causes the priority of the first thread to get boosted by `2`:

![](https://github.com/nohuto/win-config/blob/main/system/images/PsPrioritySeparation2.png?raw=true)

If doing the same but with `PsPrioritySeparation` = `0` (e.g. `Win32PrioritySeparation` = `0x18`), the priority will stay the same (doesn't get a boost when being moved to FG):

![](https://github.com/nohuto/win-config/blob/main/system/images/PsPrioritySeparation0.png?raw=true)

## Bits 2/3

Determine whether the length of processor time varies or is fixed. It also determines whether the threads of foreground processes have longer processor intervals than those of background processes. If the processor interval is fixed, that interval applies equally to the threads of foreground and background processes. If the processor interval varies, the length of time each thread runs varies, but the ratio of processor time of foreground threads to background threads is fixed.

If a variable interval is specified, the ratio of foreground thread processor time to background thread processor time is determined by the value of the lowest set of bits.

```c
v5 = a2 & 0xC;
if ( (a2 & 0xC) != 0 )
{
  if ( v5 == 4 ) // 01
  {
    v8 = (char *)&PspVariableQuantums;
    goto LABEL_7;
  }
  if ( v5 == 8 ) // 10
  {
    v8 = PspFixedQuantums;
    goto LABEL_7;
  }
}
IsThisAnNtAsSystem = MmIsThisAnNtAsSystem();
v7 = (__int64 *)PspFixedQuantums;
if ( !IsThisAnNtAsSystem )
  v7 = &PspVariableQuantums;
v8 = (char *)v7;
```

`00` (`0x0`): server selects fixed table, client selects variable table.  
`01` (`0x4`): forces PspVariableQuantums.  
`10` (`0x8`): forces PspFixedQuantums.  
`11` (`0xC`): same as `00`.

## Bits 4/5

Determine how long the threads of processes are permitted to run each time they are scheduled. This interval is specified as a range because threads can be preempted and processor time is not precisely determined.

```c
LABEL_7:
  v9 = a2 & 0x30;
  if ( !v9 )
  {
LABEL_8:
    if ( !MmIsThisAnNtAsSystem() )
      goto LABEL_9;
    goto LABEL_22;
  }
  if ( v9 != 16 )
  {
    if ( v9 == 32 )
      goto LABEL_9;
    goto LABEL_8;
  }
LABEL_22:
  v8 += 3;
LABEL_9:
  PspForegroundQuantum = *(_WORD *)v8;
  result = v8[2];
```

`00` (`0x0`): server `goto LABEL_22` (longer intervals), client `goto LABEL_9` (shorter intervals).  
`01` (`0x10`): longer intervals.  
`10` (`0x20`): goes directly to `LABEL_9` = shorter intervals.  
`11` (`0x30`): falls to `LABEL_8`, so same behavior as `00`.

Note that everything above is based on 23H2 and is not complete yet.

I won't add much more details here since [Windows Internals E7, P1](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf) contains details, see 'Quantum / Priority Boosts' (Chapter 3).

- [ntoskrnl/PsChangeQuantumTable.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/PsChangeQuantumTable.c)
- [ntoskrnl/PspComputeQuantum.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/PspComputeQuantum.c)
- [ntoskrnl/PspInitPhase0.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/PspInitPhase0.c)
- [ntoskrnl/MmIsThisAnNtAsSystem.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/MmIsThisAnNtAsSystem.c)
- [ntoskrnl/KeSetQuantumProcess.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/KeSetQuantumProcess.c)
- [ntoskrnl/KeStartThread.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/KeStartThread.c)
- [ntoskrnl/KiSetQuantumTargetThread.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/KiSetQuantumTargetThread.c)
- [ntoskrnl/KiInitializeForegroundBoostThread.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/KiInitializeForegroundBoostThread.c)
- [ntoskrnl/NtSetSystemInformation.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/KiComputeEffectivePriority.c)
- [ntoskrnl/NtSetSystemInformation.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/NtSetSystemInformation.c)
- [ntoskrnl/CmInitSystem0.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/CmInitSystem0.c)
- [ntoskrnl/CmpGetSystemControlValues.c](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl/CmpGetSystemControlValues.c)

---

Miscellaneous notes:
```c
// from procmon boot trace
"HKLM\\System\\CurrentControlSet\\Control\\PriorityControl";
    "ConvertibilityEnabled" = ?;
    "ConvertibleSlateMode" = 0; // REG_DWORD
    "SystemDockMode" = ?;
    "Win32PrioritySeparation" = 2;
```
