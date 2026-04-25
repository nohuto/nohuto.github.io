---
title: 'Wake on Input'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 17
---

```bat
powercfg /devicequery wake_programmable
powercfg /devicequery wake_armed
```
[`powercfg /devicequery wake_programmable`](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options#availablesleepstates-or-a) -> devices that are user-configurable to wake the system from a sleep state
[`powercfg /devicequery wake_armed`](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options#availablesleepstates-or-a) -> currently configured to wake the system from any sleep state

```bat
powercfg /devicedisablewake device
```
Disables the device (replace '*Device*' with the device name) from waking the system from any sleep state. 

[`WakeOnInputDeviceTypes`](https://github.com/nohuto/regkit/blob/main/records/Input.txt) probably handles wake on input behavior for all input devices - each bit represents a input device type? Since `\SYSTEM\INPUT` only queries two values I'll add the second on in here.
```
\Registry\Machine\SYSTEM\INPUT : UnDimOnInputDeviceTypes
\Registry\Machine\SYSTEM\INPUT : WakeOnInputDeviceTypes
```
`UnDimOnInputDeviceTypes` probably refers to any dimmed elemets (pure speculation)? Disabling it wouldn't make sense. Values named `ButtonsAsVKeys` & `HardwareButtonsAsVKeys` may exist in `SYSTEM\\INPUT\\BUTTONS`, but I haven't looked further into it.

Default values:
```c
WakeOnInputDeviceTypes = 46
UnDimOnInputDeviceTypes = -1  // 0xFFFFFFFF
```

- [peripheral/assets | wakedev-WakeOnInputDeviceTypes.c](https://github.com/nohuto/win-config/blob/main/peripheral/assets/wakedev-WakeOnInputDeviceTypes.c)

## query_flag

All available flags (`powercfg /devicequery query_flag`):

| `query_flag`             | Description                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| `wake_from_S1_supported` | Returns all devices that support waking the system from a light sleep state.     |
| `wake_from_S2_supported` | Returns all devices that support waking the system from a deeper sleep state.    |
| `wake_from_S3_supported` | Returns all devices that support waking the system from the deepest sleep state. |
| `wake_from_any`          | Returns all devices that support waking the system from any sleep state.         |
| `S1_supported`           | Lists devices supporting light sleep.                                            |
| `S2_supported`           | Lists devices supporting deeper sleep.                                           |
| `S3_supported`           | Lists devices supporting deepest sleep.                                          |
| `S4_supported`           | Lists devices supporting hibernation.                                            |
| `wake_programmable`      | Lists devices that are user-configurable to wake the system from a sleep state.  |
| `wake_armed`             | Lists devices currently configured to wake the system from any sleep state.      |
| `all_devices`            | Returns all devices present in the system.                                       |
