---
title: 'Mouse Values'
description: 'Peripheral option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/peripheral/desc.md#mouse-values'
sidebar:
  order: 4
---

`RawMouseThrottleDuration` controls the throttle interval (in ms) for delivering raw mouse input to background windows. "We set out to reduce the amount of processing time it took to handle input requests by throttling and coalescing background raw mouse listeners and capping their message rate."

Validate the changes with [MouseTester](https://github.com/valleyofdoom/MouseTester), move `MouseTester.exe` to the background after starting it by opening a different window.
```c
*(_QWORD *)&v13 = 0LL;                      // Forced = 0 (default)
*((_QWORD *)&v11 + 1) = 1LL;                // Enabled = 1 (default) - Forced to 1
*(_QWORD *)&v11 = L"RawMouseThrottleEnabled";
*((_QWORD *)&v12 + 1) = L"RawMouseThrottleForced";
*(_QWORD *)&v14 = L"RawMouseThrottleDuration";
*(_QWORD *)&v12 = 1LL;                      // Enabled = 1 (maximum)
*((_QWORD *)&v13 + 1) = 1LL;                // Forced = 1
*((_QWORD *)&v14 + 1) = 0x100000008LL;      // Duration = 8 (default, 125Hz)
*(_QWORD *)&v15 = 20LL;                     // Duration = 20 (maximum)
*((_QWORD *)&v15 + 1) = L"RawMouseThrottleLeeway";
*(_QWORD *)&v16 = 2LL;                      // Leeway = 2 (default)
*((_QWORD *)&v16 + 1) = 5LL;                // Leeway = 5 (maximum)
```
`GetRawMouseThrottlingThresholds.c` includes more detail and my notes. `RawMouseThrottleDuration` has a minumum of `1` (`1000` Hz).

> https://blogs.windows.com/windowsdeveloper/2023/05/26/delivering-delightful-performance-for-more-than-one-billion-users-worldwide/  
> https://github.com/valleyofdoom/PC-Tuning#1150-background-window-message-rate-permalink  
> [peripheral/assets | mouse-GetRawMouseThrottlingThresholds.c](https://github.com/nohuto/win-config/blob/main/peripheral/assets/mouse-GetRawMouseThrottlingThresholds.c)

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/mousevalues.png?raw=true)

---

Enabling/disabling `Enhance pointer precision` sets:
```c
// Enabled
HKCU\Control Panel\Mouse\MouseTrails	Type: REG_SZ, Length: 4, Data: 0
HKCU\Control Panel\Mouse\MouseThreshold1	Type: REG_SZ, Length: 4, Data: 6
HKCU\Control Panel\Mouse\MouseThreshold2	Type: REG_SZ, Length: 6, Data: 10
HKCU\Control Panel\Mouse\MouseSpeed	Type: REG_SZ, Length: 4, Data: 1
//HKCU\Control Panel\Mouse\MouseSensitivity	Type: REG_SZ, Length: 6, Data: 10 // pointer speed, reapplies current active speed

// Disabled
HKCU\Control Panel\Mouse\MouseTrails	Type: REG_SZ, Length: 4, Data: 0
HKCU\Control Panel\Mouse\MouseThreshold1	Type: REG_SZ, Length: 4, Data: 0
HKCU\Control Panel\Mouse\MouseThreshold2	Type: REG_SZ, Length: 4, Data: 0
HKCU\Control Panel\Mouse\MouseSpeed	Type: REG_SZ, Length: 4, Data: 0
//HKCU\Control Panel\Mouse\MouseSensitivity	Type: REG_SZ, Length: 6, Data: 10 // pointer speed, reapplies current active speed
```

The main option doesn't change `MouseSensitivity` (leaves it at `10`).

It's recommended to change the pointer speed via `Bluetooth & devices > Mouse`, instead of `Mouse Properties`. Reason is simply that via `Mouse Properties` is only exposes 1, 2, 4, 6, 8, 10... 20 (step = 2 steps), the system settings exposes every single step (they both do the exact same, apart from the fact that four other values are reapplied via mouse properties, see above).

---

`Ease Cursor Movement between Displays`:  
Controls whether the pointer jumps over the non-overlapping seam between misaligned monitors so that it doesn't get stuck on edges/corners when switching between screens. If this option is disabled, the cursor will stop at these seams instead of crossing them.

## Scrolling Values

```c
// Roll the mouse whell to scroll (just a toggle to let users use 'Lines to scroll at a time')
// One screen at a time (this data would gray out 'Lines to scroll at a time') = -1
// Lines to scroll at a time =  1-100
HKCU\Control Panel\Desktop\WheelScrollLines	Type: REG_SZ

// Scroll inactive windows when hovering over them
// On = 2
// Off = 0
HKCU\Control Panel\Desktop\MouseWheelRouting	Type: REG_DWORD

// Scroll direction
// Down motion scrolls down = 0
// Down motion scrolls up = 1
HKCU\Control Panel\Mouse\ReverseMouseWheelDirection	Type: REG_DWORD
```
