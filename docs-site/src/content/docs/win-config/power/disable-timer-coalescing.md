---
title: 'Timer Coalescing'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-timer-coalescing'
sidebar:
  order: 11
---

"CoalesecingTimerinterval is a computer system energy-saving technique that reduces CPU power consumption by reducing the precision of software timers to allow the synchronization of process wake-ups, minimizing the number of times the CPU is forced to perform the relatively power-costly operation of entering and exiting idle states"

`TimerCoalescing` is a binary value (`v18 == 3`) with a size of 80 bytes (`v19 == 80`).

```c
"HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows\TimerCoalescing","Length: 96" // 0x60u
```

```c
if (v18 == 3 && v19 == 80 && !v20[0]) // type REG_BINARY, length 80 bytes, leading dword zero
{
  for (i = 0; i < 3; ++i)
    if (v20[i + 1]) return ZwClose(KeyHandle); // v20[1..3] must be zero

  for (j = 0; j < 4; ++j)
    if (v20[j + 8]) return ZwClose(KeyHandle); // v20[8..11] must be zero

  for (k = 0; k < 4; ++k)
    if (v20[k + 16]) return ZwClose(KeyHandle); // v20[16..19] must be zero

  for (m = 0; (unsigned int)m < 4; ++m)
    if (v20[m + 4] > 0x7FFFFFF5) return ZwClose(KeyHandle); // clamp tolerance index 0 entries

  while (v0 < 4)
  {
    if (v20[v0 + 12] > 0x7FFFFFF5) return ZwClose(KeyHandle); // clamp tolerance index 3 entries
    ++v0;
  }
}
```

As the pseudocode shows eight values have data, all other ones are forced to `0` (four dwords of zeros, four dwords for tolerance index 0, four more zeros, four dwords for tolerance index 3, and zeros).

```json
"HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows": {
  "TimerCoalescing": { "Type": "REG_BINARY", "Data": "00000000000000000000000000000000F5FFFF7FF5FFFF7FF5FFFF7FF5FFFF7F00000000000000000000000000000000F5FFFF7FF5FFFF7FF5FFFF7FF5FFFF7F00000000000000000000000000000000" }
}
```
Using the highest clamp as shown above will end up with a BSoD (same goes for `0x7FFFFFF4`/`0` and probably any other data).

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "CoalescingTimerInterval" = 1500; // PopCoalescingTimerInterval (0x000005DC) - Units: seconds (multiplies value by -10,000,000, one second in 100 ns units, so the default corresponds to a 25min cadence)
    "DeepIoCoalescingEnabled" = 0; // PopDeepIoCoalescingEnabled 
```
> [/docs/win-config/power/power-values/#registry-values-details](/docs/win-config/power/power-values/#registry-values-details)

```c
void InitTimerPowerSaving(void)
{
  UserSessionState = W32GetUserSessionState();
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveElapse", 43200000LL, UserSessionState + 62692); // 12H?
  v1 = W32GetUserSessionState();
  FastGetProfileDword(0LL, 2LL, L"RITdemonTimerPowerSaveCoalescing", 43200000LL, v1 + 62696); // 12H?
}
```

The `CoalescingTimerInterval` value exist (takes a default of `1500` dec, `DeepIoCoalescingEnabled` one is set to `0` by default - both are located in `ntoskrnl.exe`), but doesn't get read on 24H2, the `RITdemonTimerPowerSave...` & `TimerCoalescing` ones get read.

> [power/assets | coalesc-InitTimerCoalescing.c](https://github.com/nohuto/win-config/blob/main/power/assets/coalesc-InitTimerCoalescing.c)  
> https://github.com/nohuto/regkit/blob/main/records/Winows-NT.txt

![](https://github.com/nohuto/win-config/blob/main/power/images/coalesc.png?raw=true)
