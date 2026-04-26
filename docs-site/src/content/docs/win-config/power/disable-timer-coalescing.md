---
title: 'Timer Coalescing'
description: 'Power option documentation from win-config.'
editUrl: false
sidebar:
  order: 5
---

"CoalesecingTimerinterval is a computer system energy-saving technique that reduces CPU power consumption by reducing the precision of software timers to allow the synchronization of process wake-ups, minimizing the number of times the CPU is forced to perform the relatively power-costly operation of entering and exiting idle states"

## InitTimerCoalescing

`TimerCoalescing` (queried by [InitTimerCoalescing](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/InitTimerCoalescing.c)) is a binary value (`v18 == 3`) with a size of 80 bytes (`v19 == 80`), interpreted as 20 DWORDs. The value is used to load two four entry timer coalescing tolerance blocks.

```c
// InitTimerCoalescing.c

if ( ZwQueryValueKey(
      KeyHandle,
      &DestinationString,
      KeyValuePartialInformation,
      KeyValueInformation,
      0x60u,
      &ResultLength) >= 0
&& v16 == 3 // registry Type must be REG_BINARY
&& v17 == 80 // data must be exactly 20 DWORDs
&& !v18 ) // DWORD 0 must be zero
```

### Data Formatting

```c
// InitTimerCoalescing.c

for ( i = &v19; !*(_DWORD *)i; i += 4 ) // DWORDs 1-3 must be zero
{
  if ( (unsigned int)++v2 >= 3 )
  {
    v4 = 0;
    for ( j = &v21; !*(_DWORD *)j; j += 4 ) // DWORDs 8-11 must be zero
    {
      if ( (unsigned int)++v4 >= 4 )
      {
        v6 = 0;
        for ( k = &v23; !*(_DWORD *)k; k += 4 ) // DWORDs 16-19 must be zero
        {
          if ( (unsigned int)++v6 >= 4 )
          {
            v8 = 0;
            for ( m = &v20; *(_DWORD *)m <= 0x7FFFFFF5u; m = (__int128 *)((char *)m + 4) ) // DWORDs 4-7 range
            {
              if ( (unsigned int)++v8 >= 4 )
              {
                for ( n = &v22; *(_DWORD *)n <= 0x7FFFFFF5u; n = (__int128 *)((char *)n + 4) ) // DWORDs 12-15 range
                {
                  if ( (unsigned int)++v0 >= 4 )
                  {
                    xmmword_1C035A178 = v20; // stores one four DWORD tolerance block
                    *(_OWORD *)&gTimerCoalescingSpec = v22; // stores the other four DWORD tolerance block
                    SetTimerCoalescingTolerance(0LL); // applies mode 0 after load
```

| DWORD | Data | Note |
| --- | --- | --- |
| `0` | `0` | Reserved value checked before the loop validation |
| `1-3` | all `0` | Reserved |
| `4-7` | each `<= 0x7FFFFFF5` | Four accepted tolerance values, copied as one block |
| `8-11` | all `0` | Reserved |
| `12-15` | each `<= 0x7FFFFFF5` | Four accepted tolerance values, copied to `gTimerCoalescingSpec` |
| `16-19` | all `0` | Reserved |

Note that this only shows the data range etc., there's more information in relation to [`SetTimerCoalescingTolerance`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/SetTimerCoalescingTolerance.c) (mode selection), `gCurrentTimerCoalescingTolerance`, [`InternalSetTimer`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/InternalSetTimer.c), coalescable timers (affected ones) etc. I might or might not add more details whenever I've time.

## InitTimerPowerSaving Details

Note that is my current interpretation, don't see this as my final answer nor as correct. All used functions are somewhere linked.

```c
// 23H2
void InitTimerPowerSaving(void)
{
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveElapse", 43200000LL, &gdwRITdaemonTimerPowerSaveElapse); // 12H
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveCoalescing", 43200000LL, &gdwRITdaemonTimerPowerSaveCoalescing); // 12H
}

// 2004
void InitTimerPowerSaving(void)
{
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveElapse", 43200000LL, &gdwRITdemonTimerPowerSaveElapse);
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveCoalescing", 43200000LL, &gdwRITdemonTimerPowerSaveCoalescing);
}
```

Looks like a typo from MS (`demon` = `daemon`), which got probably fixed within the first W11 builds, see  [bin-diff 2004 & 21H2](https://www.noverse.dev/bin-diff.html?left=2004&right=11-21H2&module=win32kfull&function=-InitTimerPowerSaving%40%40YAXXZ.c&mode=side-by-side) comparision (the value name didn't change).

### When TimerPowerSaving Applies

`RITdemonTimerPowerSaveElapse` is the base timer interval. `RITdemonTimerPowerSaveCoalescing` is a kind of extra coalescing related parameter passed into the timer setup path.

At [RawInputThread](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/RawInputThread.c) start it does call `InitTimerPowerSaving();` but also directly calls `ConfigureRITDelayableTimers(0);` which isn't the "TimerPowerSave" mode. So [`ConfigureRITDelayableTimers`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/-ConfigureRITDelayableTimers@@YAXW4RitTimerRate@@@Z.c) uses these values as we can see here:

```c
// ConfigureRITDelayableTimers
if ( !a1 ) goto LABEL_4;
if ( gnRITdaemonTimerId ) {
    if ( a1 != 1 ) {
        v2 = InternalSetTimer(
            0,
            gnRITdaemonTimerId,
            gdwRITdaemonTimerPowerSaveElapse,
            gdwRITdaemonTimerPowerSaveCoalescing,
            4);
    } else {
LABEL_4:
        v2 = SetRITTimer(gnRITdaemonTimerId, 1000LL, ..., 0LL);
    }
}
```

This shows `a1 == 0` & `a1 == 1` don't go into the [`InternalSetTimer`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/InternalSetTimer.c) part, so any other than `0`/`1` would use the TimerPowerSave values. When does it get anything else than `0`/`1`?

```c
// SetTimerCoalescingTolerance
if ( !(_DWORD)v1 ) {
    gdwRITdaemonLockState = 0;
    return ConfigureRITDelayableTimers(1); // goes to LABEL_4
}

v7 = 2; // either 2
v8 = v1 - 2;
if ( !v8 ) {
    gdwRITdaemonLockState |= 1u;
    if ( (gdwRITdaemonLockState & 2) == 0
      && giScreenSaveTimeOutMs > 0
      && (gbLockConsoleActive || (*gpsi & 0x200) != 0) ) {
        v7 = 1; // or 1
    }
    return ConfigureRITDelayableTimers(v7);
}

if ( v8 == 1 ) {
    gdwRITdaemonLockState |= 2u;
    if ( (gdwRITdaemonLockState & 1) != 0 )
        return ConfigureRITDelayableTimers(2); // always 2 but only if bit 1 isn't 0
}
```

Note that only applies to non service sessions (`if ( v3 != gServiceSessionId )`, [SetTimerCoalescingTolerance](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/SetTimerCoalescingTolerance.c)).

So this whole TimerPowerSave part only applies only applies when [`SetTimerCoalescingTolerance`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/win32kfull/SetTimerCoalescingTolerance.c) returns `ConfigureRITDelayableTimers(2)` which happens through lock/screensaver (`giScreenSaveTimeOutMs`)/session state transitions.

### Default Data

```c
// ConfigureRITDelayableTimers
v2 = InternalSetTimer(
        0,
        gnRITdaemonTimerId,
        gdwRITdaemonTimerPowerSaveElapse, // a3
        (unsigned int)lambda_2bb7a2ff8864d6893c712a9e9ac801fb_::_lambda_invoker_cdecl_,
        gdwRITdaemonTimerPowerSaveCoalescing, // a5
);

// InternalSetTimer
v10 = 10;
if ( a3 >= 0xA )
    v10 = a3;
if ( v10 > 0x7FFFFFFF )
    v10 = 0x7FFFFFFF;
*(_DWORD *)(v22 + 40) = v10;
*(_DWORD *)(v22 + 52) = v10;

// RITdemonTimerPowerSaveCoalescing
if ( a5 == -1 || !a5 && v14 && _bittest64((const signed __int64 *)(v14 + 648), 0x23u) )
    v15 = a6 & 0xFFFFFDFF;
else
    v15 = a6 | 0x200;
if ( (v15 & 0x200) != 0 )
    *(_DWORD *)(v22 + 44) = a5;

// false if bit 0x200 cleared
if ( (v32 & 0x200) != 0 )
{
    v34 = *(_DWORD *)(v22 + 44);
    v35 = gCurrentTimerCoalescingTolerance;
    v36 = gCurrentTimerCoalescingTolerance;
    v37 = *(_DWORD *)(v22 + 52);
    if ( v34 > gCurrentTimerCoalescingTolerance )
        v36 = *(_DWORD *)(v22 + 44);
    if ( v37 + v36 >= 0x7FFFFFFF )
    {
        v38 = 0x7FFFFFFF;
    }
    else
    {
        if ( v34 > gCurrentTimerCoalescingTolerance )
            v35 = *(_DWORD *)(v22 + 44);
        v38 = v37 + v35;
    }
}
else
{
    v38 = *(_DWORD *)(v22 + 52);
}
```

`RITdemonTimerPowerSaveElapse`:
- Default = `43200000`
- Minimum = `10`
- Maximum = `0x7FFFFFFF`

`RITdemonTimerPowerSaveCoalescing`:
- Default = `43200000`
- Any value beside `0` & `-1` are valid (these 2 are special cases as shown above, `-1` clears bit `0x200` and skips some part)

So practically `RITdemonTimerPowerSaveElapse` = `10` & `RITdemonTimerPowerSaveCoalescing` = `4294967295` should cause the least power saving.

## Miscellaneous Values

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "CoalescingTimerInterval" = 1500; // PopCoalescingTimerInterval (0x000005DC) - Units: seconds (multiplies value by -10,000,000, one second in 100 ns units, so the default corresponds to a 25min cadence)
    "DeepIoCoalescingEnabled" = 0; // PopDeepIoCoalescingEnabled 
```

The `CoalescingTimerInterval` value exist (takes a default of `1500` dec, `DeepIoCoalescingEnabled` one is set to `0` by default - both are located in `ntoskrnl.exe`), but doesn't get read on 24H2, the `RITdemonTimerPowerSave...` & `TimerCoalescing` ones get read.

- [power/assets | coalesc-InitTimerCoalescing.c](https://github.com/nohuto/win-config/blob/main/power/assets/coalesc-InitTimerCoalescing.c)

![](https://github.com/nohuto/win-config/blob/main/power/images/coalesc.png?raw=true)
