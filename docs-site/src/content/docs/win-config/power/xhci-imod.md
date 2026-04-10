---
title: 'xHCI IMOD'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#xhci-imod'
sidebar:
  order: 1
---

| Flag | Description |
| --- | --- |
| `--rw-path PATH` | Override the default `%LOCALAPPDATA%\Noverse\IMOD\RwPortable\Win64\Portable\Rw.exe` location |
| `--bdf BB:DD.F` | Use a specific controller by Bus:Device.Function (hex). Mutually exclusive with `--xhci-index`/`--all` |
| `--xhci-index N` | Use the Nth xHCI controller reported by `FPciClass` (defaults to 0 when `--bdf/--all` absent) |
| `--all` | Iterate through every xHCI controller and apply the same IMOD changes to each |
| `--interrupter ID` / `-i ID` | Restrict the operation to specific interrupter IDs, repeat the flag for multiple IDs (defaults to all) |
| `--interval VALUE` | Set a custom IMOD interval (0–0xFFFF, in 250 ns ticks). Use for example `0xC800` (~48 Hz) to see if chaning the interval works |
| `--no-write` | Only read and print IMOD registers (skip the write for information only) |
| `--startup` | Copy the script or exe to `%LOCALAPPDATA%\Noverse\IMOD\` and creates a scheduled task that runs the command at each logon |
| `--delete` | Delete the scheduled task created by `--startup` |
| `--no-exit` | Keep the console open after completion |
| `--verbose` | Output all `rw.exe` commands/results |

```c
--all --no-write --no-exit // information only
--all --no-write --verbose --no-exit // rw commands/output
--all // 0 for all controllers
--all --interval 0xC800 // testing (~48hz)
--all --startup // 0 for all controllers, creates scheduled task
--delete // removes the task
```

You can download the executeable from my repository, I packed it into one package since some may not have python installed on their system.
> https://github.com/nohuto/win-config/blob/main/power/assets/NV-IMOD.exe

## xHCI Interrupt Moderation Notes

Interrupt Moderation (IMOD) is the pacing logic inside an xHCI controller that decides how quickly hardware interrupts are sent up to the CPU. Every time the host controller has new events to report, it can either raise an interrupt immediately or wait for a programmable delay. IMOD is that programmable timer, you choose an interval value, the controller loads a counter, and no second interrupt is allowed until the counter has expired and the Event Handler is ready again.

Note that everything written below is based on the [`eXtensible Host Controller Interfact for Universal Serial Bus`](https://www.intel.com/content/dam/www/public/us/en/documents/technical-specifications/extensible-host-controler-interface-usb-xhci.pdf) document. See pages `289f.`, `295`, `383`, `388`, `425`, `426`.

`HCSPARAMS1` (Base + 0x04) reports the number of interrupters (`MaxIntrs`). Each *Interrupter Register Set* has its own moderation and the range is 0x1-0x400, so the field must be non zero for a usable controller. The *Runtime Register Base* address equals the *Operational Base* plus the *Runtime Register Space Offset* (`RTSOFF`). `RTSOFF` is at Base + 0x18 and bits [31:5] provide the aligned offset (bits [4:0] are reserved). Every *Interrupter Register Set* has 32 bytes starting at Runtime Base + 0x20. `IMAN` is at `Runtime Base + 0x20 + 32*n`, `IMOD` at `+0x24 + 32*n`, followed by the *Event Ring* registers (`ERSTSZ`, `ERSTBA`, `ERDP`).

When a TRB event triggers the Interrupt Pending (`IP`) flag, host notification is throttled according to the Interrupter's Moderation (`IMOD`) register. `IMOD` combines the Interrupt Moderation Interval (`IMODI`) and the Interrupt Moderation Counter (`IMODC`). Software programs `IMODI` in 250 ns units, the hardware copies it into `IMODC`, counts down, and only raises the interrupt once the counter reaches zero and the *Event Handler Busy* (`EHB`) flag has been cleared. `interrupts/sec = 1 / (250 ns * IMODI)` and `inter-interrupt interval = 250 ns * (interrupts/sec)^-1`. "Recommended tuning values" are 0x28B-0x15CC with a default of 0x4000 (~1ms). For example, `IMODI = 512` guarantees at least 128 us between interrupts, so the maximum rate stays under 8kHz. Writing `IMODI = 0` disables throttling and interrupts are delivered immediately once `EHB` is clear and the *Event Ring* is non empty. Blocking Event handling ensures `IPE` (an internal flag) and `EHB` cooperate with `IMODC`. A new interrupt is prevented until `IMODC` reaches zero, `IPE` is asserted, and `EHB` is cleared, when those conditions hold, the counter reloads from `IMODI` so the pacing cycle repeats.

## Bit Descriptions (taken from document)

**Interrupter Moderation Register (IMOD):**

| Bit   | Description|
| :---: | --- |
| 15:0 | **Interrupt Moderation Interval (IMODI) – RW.** Default = '4000' (~1ms). Minimum inter-interrupt interval. The interval is specified in 250ns increments. A value of '0' disables interrupt throttling logic and interrupts shall be generated immediately if IP = '0', EHB = '0', and the *Event Ring* is not empty. |
| 31:16 | **Interrupt Moderation Counter (IMODC) – RW.** Default = undefined. Down counter. Loaded with the IMODI value whenever IP is cleared to '0', counts down to '0', and stops. The associated interrupt shall be signaled whenever this counter is '0', the *Event Ring* is not empty, the IE and IP flags = '1', and EHB = '0'. This counter may be directly written by software at any time to alter the interrupt rate. |

---

**Host Controller Structural Parameters 2 (HCSPARAMS2):**

| Bit  | Description |
| :---: | --- |
| 0:3 | **Isochronous Scheduling Threshold (IST).** Default = implementation dependent. The value in this field indicates to system software the minimum distance (in time) that it is required to stay ahead of the host controller while adding TRBs, in order to have the host controller process them at the correct time. The value shall be specified in terms of number of frames/microframes.<br><br>If bit [3] of IST is cleared to '0', software can add a TRB no later than IST[2:0] Microframes before that TRB is scheduled to be executed.<br><br>If bit [3] of IST is set to '1', software can add a TRB no later than IST[2:0] Frames before that TRB is scheduled to be executed.<br><br>Refer to Section 4.14.2 for details on how software uses this information for scheduling isochronous transfers. |
| 7:4 | ***Event Ring* Segment Table Max (ERST Max).** Default = implementation dependent. Valid values are 0 – 15. This field determines the maximum value supported the **Event Ring* Segment Table Base Size* registers (5.5.2.3.1), where:<br><br>  The maximum number of *Event Ring* Segment Table entries = 2 ERST Max.<br><br>e.g. if the ERST Max = 7, then the xHC **Event Ring* Segment Table(s)* supports up to 128 entries, 15 then 32K entries, etc. |
| 20:8 | Reserved. |

![](https://github.com/nohuto/win-config/blob/main/power/images/HCSPARAMS2-structure.png?raw=true)

---

**Runtime Register Space Offset Register (RTSOFF):**

| Bit  | Description |
| :---: | --- |
| 0 | **Interrupt Pending (IP) – RW1C.** Default = '0'. This flag represents the current state of the Interrupter. If IP = '1', an interrupt is pending for this Interrupter. A '0' value indicates that no interrupt is pending for the Interrupter. Refer to section 4.17.3 for the conditions that modify the state of this flag.                                    |
| 1 | **Interrupt Enable (IE) – RW.** Default = '0'. This flag specifies whether the Interrupter is capable of generating an interrupt. When this bit and the IP bit are set ('1'), the Interrupter shall generate an interrupt when the Interrupter Moderation Counter reaches '0'. If this bit is '0', then the Interrupter is prohibited from generating interrupts. |
| 31:2 | Reserved and Preserved. |

![](https://github.com/nohuto/win-config/blob/main/power/images/RTSOFF-structure.png?raw=true)

---

**Interrupter Management Register Bit Definitions (IMAN):**

| Bit  | Description |
| :---: | --- |
| 0 | **Interrupt Pending (IP) – RW1C.** Default = '0'. This flag represents the current state of the Interrupter. If IP = '1', an interrupt is pending for this Interrupter. A '0' value indicates that no interrupt is pending for the Interrupter. Refer to section 4.17.3 for the conditions that modify the state of this flag. |
| 1 | **Interrupt Enable (IE) – RW.** Default = '0'. This flag specifies whether the Interrupter is capable of generating an interrupt. When this bit and the IP bit are set ('1'), the Interrupter shall generate an interrupt when the Interrupter Moderation Counter reaches '0'. If this bit is '0', then the Interrupter is prohibited from generating interrupts. |
| 31:2 | Reserved and Preserved. |
