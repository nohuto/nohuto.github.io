---
title: 'Bitmask Calculator'
description: 'NVIDIA option documentation from win-config.'
editUrl: false
sidebar:
  order: 1
---

This was meant to be a normal bitmask calculator, but I decided to add features to it that made it possible to directly configure and apply NVIDIA values. You may have seen people sharing NVIDIA values with uncommon looking data, e.g.:
```bat
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0001" /v RMElcg /t REG_DWORD /d 1431655765 /f
```
The tool loads all value names including their bit definitions, making it easy for you to understand what the data of `1431655765` truely does. After selecting an option, it updates the `dec`, `hex`, `bin` data and displays the bit positions. If you want to use the value, you can add it with the `Reg Add` button, which searches for the correct key.

It adds all values to the [`Display`](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors#device-categories-and-class-values) class key. There are values with the same names in the [`nvlddmkm\*`](https://github.com/nohuto/wpr-reg-records/blob/main/records/nvlddmkm.txt) key, but those won't get added via the tool. I may add a second section for `nvlddmkm` key values.
```
\Registry\Machine\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0000 : RmProfilingAdminOnly
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Global\NVTweak : RmProfilingAdminOnly
```

The calculator uses an converted `.json` version of the official NVIDIA resource manager definitions. I've built the converter myself, and it should be `100%` accurate. However, if you notice any obvious errors, please report them.

> [Preview](https://github.com/user-attachments/assets/91b241ef-5e8e-4859-8957-d3b54dc52b0e)

The tool currently has a selection of `967` values ([`nvvalues.txt`](https://github.com/nohuto/bitmask-calc/blob/main/nvvalues.txt)). It works with my own `.json` converted bitfield definitions. This doesn't mean that all of them are configurable or used by your system. See [list of values](https://github.com/nohuto/wpr-reg-records/blob/main/records/NVIDIA-DispGUID.txt, which got read on my system while boot.

## GUI Buttons

| Button | Description |
| --- | --- |
| `Reg Add` | Adds the currently selected value to the key |
| `Reg Del` | Removes the currently selected value from the key |
| `Disable All` | Enables all `DISABLE*` / `OFF` / `FALSE` bits (fallback to `DEFAULT`) |
| `Enable All` | Enables all `ENABLE*` / `ON` / `TRUE` bits (fallback to `DEFAULT`) |
| `Open Key` | Opens the registry key within the display class GUID [`4d36e968-e325-11ce-bfc1-08002be10318`](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors#device-categories-and-class-values)<br> which includes a value named `DriverDesc` with data of `*NVIDIA*` |
| `Auto Config` | Sets preconfigured **experimental** values, these aren't recommendations, only possible presumptions (grayed out, if there's no `Configured` value in the `.json` config) |
| `Clear` | Reverts bit states to `*DEFAULT*` (first fallback to `EMPTY (0)`, second to any `0` value) |

## Bitmask Calculation

Get the lower bit range (`25:24` -> `24`), shift the dec or hex x times to the left (`-shl`). Combine all results with `-bor`, and done.

Example using `RMGC6Parameters` (disabling all):
```json
"Name":  "RMGC6Parameters",
"Elements": [
  {
      "Field":  "SLEEP_AWARE_CALLBACK",
      "Bits":  "1:0",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLED", "Value":  "1" },
                      { "Name":  "ENABLED", "Value":  "3" }
                  ]
  },
  {
      "Field":  "DEFERRED_PMU_CALLBACK",
      "Bits":  "3:2",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLED", "Value":  "1" },
                      { "Name":  "ENABLED", "Value":  "3" }
                  ]
  },
  {
      "Field":  "PMU_HANDLE_MODESET",
      "Bits":  "5:4",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLED", "Value":  "1" },
                      { "Name":  "ENABLED", "Value":  "3" }
                  ]
  },
  {
      "Field":  "BSOD_MODESET",
      "Bits":  "7:6",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLED", "Value":  "1" },
                      { "Name":  "ENABLED", "Value":  "3" }
                  ]
  }
]
```
1. [`-shl`](https://discord.com/channels/836870260715028511/1361665557581140100/1362011539787481302) using the lower bit range value
```powershell
0x00000001 -shl 0
0x00000001 -shl 2
0x00000001 -shl 4
0x00000001 -shl 6
```
would result in `1`, `4`, `16`, `64`

2. Combine them with [`-bor`](https://discord.com/channels/836870260715028511/1361665557581140100/1362011218151215196)
```powershell
1 -bor 4 -bor 16 -bor 64
```
Output of `85`, which is the result.

Different common scenario would be `DisableDynamicPstate`:
```json
"Name":  "DisableDynamicPstate",
"Comment":  [
     "1 = Disable dynamic P-State/adaptive clocking",
     "0 = Do not disable dynamic P-State/adaptive clocking (default)",
 ],
"Elements":  [
      { "Name":  "DISABLE", "Value":  "0" },
      { "Name":  "ENABLE", "Value":  "1" }
  ]
```
The comment shows `1` = `Enabled`, `0` = `Disabled`, means bit 0 gets switched here.

Test yourself with the following example:
```json
"Name":  "RMClkSlowDown",
"Elements":  [
  {
      "Field":  "NV",
      "Bits":  "23:22",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLE", "Value":  "1" },
                      { "Name":  "ENABLE", "Value":  "3" }
                  ]
  },
  {
      "Field":  "HOST",
      "Bits":  "25:24",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLE", "Value":  "1" },
                      { "Name":  "ENABLE", "Value":  "3" }
                  ]
  },
  {
      "Field":  "IDLE_PSTATE",
      "Bits":  "27:26",
      "Options":  [
                      { "Name":  "DEFAULT", "Value":  "0" },
                      { "Name":  "DISABLE", "Value":  "1" },
                      { "Name":  "ENABLE", "Value":  "3" }
                  ]
  }
]
```
Try to disable all of them.

Solution:
Dec: `88080384`  
Hex: `0x05400000`  
Bin: `00000101010000000000000000000000`  

```powershell
0x00000001 -shl 22
0x00000001 -shl 24
0x00000001 -shl 26
```
```powershell
4194304 -bor 16777216 -bor 67108864
-> 88080384
```
More info about `-shl` & `-bor` can be found in [bitwise-operators.md](https://github.com/nohuto/bitmask-calc/blob/main/bitwise-operators/bitwise-operators.md).
