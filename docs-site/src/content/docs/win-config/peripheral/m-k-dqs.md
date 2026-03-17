---
title: 'M/K DQS'
description: 'Peripheral option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/peripheral/desc.md#mk-dqs'
sidebar:
  order: 14
---

The value exists by default and is set to `100` decimal (`64` hex). Reducing it doesn't reduce your latency, leave it default.

"Specifies the number of mouse events to be buffered internally by the driver, in nonpaged pool. The allocated size, in bytes, of the internal buffer is this value times the size of the MOUSE_INPUT_DATA structure (defined in NTDDMOU.H)."

```c
v11 = *((_DWORD *)&WPP_MAIN_CB.Reserved + 2); // MouseDataQueueSize value
if (!v11)
{
    // Set default to 100 if value was 0
    v11 = 100;
}
else if (v11 > 0xAAAAAAA) // ≈ 178956970
{
    v12 = 2400;
}
else
{
    v12 = 24 * v11;
}
*((_DWORD *)&WPP_MAIN_CB.Reserved + 2) = v12;

```
__Scenarios:__
Exists & > 0 -> `v11 = reg value`
Value == 0 -> `v11 = 100`
Value not present -> `v11 = 288` ?
Value > `0xAAAAAAA` ->  Clamped to `2400`
Otherwise `v11 * 24`

> https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/102990  
> [peripheral/assets | mkdata-MouConfiguration.c](https://github.com/nohuto/win-config/blob/main/peripheral/assets/mkdata-MouConfiguration.c)  
> [peripheral/assets | mkdata-KbdConfiguration.c](https://github.com/nohuto/win-config/blob/main/peripheral/assets/mkdata-KbdConfiguration.c)
