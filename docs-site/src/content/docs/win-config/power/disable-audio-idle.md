---
title: 'Audio Idle'
description: 'Power option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

| Parameter | Description | Default | Type | Notes |
| --- | --- | --- | --- |
| `ConservationIdleTime` | Idle timeout for the device, when the system is on battery power. | `0` | REG_BINARY | `0` disables the inactivity timer for this mode, value is in seconds. |
| `PerformanceIdleTime` | Idle timeout for the device, when the system is on AC power. | `0` | REG_BINARY | `0` disables the inactivity timer for this mode, value is in seconds. |
| `IdlePowerState` | Specifies the power state that the device will enter, when power is no longer needed. | `3` (D3) | REG_BINARY | Valid values `1 - D1`, `2 - D2`, `3 - D3`.                            |

I currently disable it, by setting the timeouts to `ff ff ff ff` (`~4.29e9 s ≈ 136 years`) & `IdlePowerState` to `1` (`D1`).

| Category   | Class | Class GUID                           | Description                                                                                       |
| ---------- | ----- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Multimedia | Media | [4d36e96c-e325-11ce-bfc1-08002be10318](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/system-defined-device-setup-classes-available-to-vendors) | Includes Audio and DVD multimedia devices, joystick ports, and full-motion video capture devices. |

> [drivers/audio/audio-device-class-inactivity-timer-implementation](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/audio-device-class-inactivity-timer-implementation)  
> [design/device-experiences/audio-subsystem-power-management-for-modern-standby-platforms](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/audio-subsystem-power-management-for-modern-standby-platforms)  
> [drivers/audio/portcls-registry-power-settings](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/portcls-registry-power-settings)
