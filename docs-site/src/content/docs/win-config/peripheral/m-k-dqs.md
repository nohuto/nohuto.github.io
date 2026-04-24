---
title: 'M/K DQS'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

The value exists by default and is set to `100` decimal (`64` hex). Reducing it doesn't "reduce your latency", leave it default. E.g. setting it to `1` (MouseDataQueueSize) = queue size is 24 bytes (1 mouse packet) = one packet can be buffered, so bursts are much more likely to be dropped = worse. Decreasing it for saving memory is also very minimal, therefore there's no reason I could currently think of for decreasing it below 100.

```inf
; keyboard.inf
[KbdClass.HW]
AddReg = KbdClass_HW_AddReg

[KbdClass_HW_AddReg]
HKR,,"KeyboardDataQueueSize",0x00010003,100

; msmouse.inf
[PS2_Inst.HW]
AddReg = PS2_Inst.HW.AddReg

[PS2_Inst.HW.AddReg]
HKR,,"MouseDataQueueSize",0x00010003,100
```

"*Specifies the number of mouse events to be buffered internally by the driver, in nonpaged pool. The allocated size, in bytes, of the internal buffer is this value times the size of the MOUSE_INPUT_DATA structure (defined in NTDDMOU.H).*" [[*]](https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/102990)

## [MouseDataQueueSize](https://github.com/nohuto/win-config/blob/main/peripheral/assets/mkdata-MouConfiguration.c)

- not present = default `100` -> final `2400`
- present and `0` = forced to `100` -> final `2400`
- present and `1-0x0AAAAAAA` -> final `24 * raw`
- present and `> 0x0AAAAAAA` -> final `2400`

```c
*((_DWORD *)&WPP_MAIN_CB.Reserved + 2) = 100; // default

*(_QWORD *)(Pool2 + 16) = L"MouseDataQueueSize";
*(_QWORD *)(Pool2 + 24) = &WPP_MAIN_CB.Reserved + 1;

v10 = *((_DWORD *)&WPP_MAIN_CB.Reserved + 2);
if ( !*((_DWORD *)&WPP_MAIN_CB.Reserved + 2) )
{
  v10 = 100; // data 0 = 100
  goto LABEL_9;
}
if ( *((_DWORD *)&WPP_MAIN_CB.Reserved + 2) <= 0xAAAAAAAu )
{
LABEL_9:
  v11 = 24 * v10; // convert packet count to queue bytes
  goto LABEL_10;
}
v11 = 2400; // clamp
LABEL_10:
*((_DWORD *)&WPP_MAIN_CB.Reserved + 2) = v11;
```

## [KeyboardDataQueueSize](https://github.com/nohuto/win-config/blob/main/peripheral/assets/mkdata-KbdConfiguration.c)

- not present = default `100` -> final `1200`
- present and `0` = forced to `100` -> final `1200`
- present and `1-0x15555555` -> final `12 * raw`
- present and `> 0x15555555` -> final `1200`

```c
dword_1C000A234 = 100; // default

*(_QWORD *)(Pool2 + 16) = L"KeyboardDataQueueSize";
*(_QWORD *)(Pool2 + 24) = &dword_1C000A234;

v14 = dword_1C000A234;
if ( dword_1C000A234 )
{
  if ( (unsigned int)dword_1C000A234 > 0x15555555 )
  {
    v15 = 1200; // clamp
    goto LABEL_22;
  }
}
else
{
  v14 = 100; // data 0 = 100
}
v15 = 12 * v14; // convert packet count to queue bytes
LABEL_22:
dword_1C000A234 = v15;
```
