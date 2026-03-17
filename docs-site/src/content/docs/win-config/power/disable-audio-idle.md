---
title: 'Audio Idle'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-audio-idle'
sidebar:
  order: 12
---

| Parameter              | Desc                                                                                    | Default  | Notes                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `ConservationIdleTime` | Idle timeout for the device, when the system is on battery power.                       | `0`      | `0` disables the inactivity timer for this mode, value is in seconds. |
| `PerformanceIdleTime`  | Idle timeout for the device, when the system is on AC power.                            | `0`      | `0` disables the inactivity timer for this mode, value is in seconds. |
| `IdlePowerState`       | Specifies the power state that the device will enter, when power is no longer needed.   | `3` (D3) | Valid values `1 - D1`, `2 - D2`, `3 - D3`.                            |

I currently disable it, by setting the timeouts to `ff ff ff ff` (`~4.29e9 s ≈ 136 years`) & `IdlePowerState` to `1` (`D1`).

| Parameter              | Type           | Revert Hex data     | Parsed value                      | Meaning                       |
| ---------------------- | -------------- | ------------------- | --------------------------------- | ----------------------------- |
| `ConservationIdleTime` | REG_BINARY (3) | `1e,00,00,0`        | malformed; if `1e,00,00,00` -> 30s | `10s` on battery              |
| `PerformanceIdleTime`  | REG_BINARY (3) | `00,00,00,00`       | 0 seconds                         | No idle mgmt on AC            |
| `IdlePowerState`       | REG_BINARY (3) | `03,00,00,00`       | 3                                 | Go to `D3` when idle          |

| Category   | Class | Class GUID                           | Description                                                                                       |
| ---------- | ----- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Multimedia | Media | 4d36e96c-e325-11ce-bfc1-08002be10318 | Includes Audio and DVD multimedia devices, joystick ports, and full-motion video capture devices. |

> https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/audio-device-class-inactivity-timer-implementation  
> https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/audio-subsystem-power-management-for-modern-standby-platforms  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/portcls-registry-power-settings
