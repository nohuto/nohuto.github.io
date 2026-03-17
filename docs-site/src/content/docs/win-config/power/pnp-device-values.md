---
title: 'PnP Device Values'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#pnp-device-values'
sidebar:
  order: 3
---

This currently applies the values for the `USB` enumerator only, since most values were found in USB related drivers and kind of all of them (which I use in the option) only get read in the USB enumerator.

Disables USB selective suspend, idle states, and related LP features if supported.

Note that the known `MSPower_DeviceEnable` command does nothing more than recursively setting `IdleInWorkingState` & `SelectiveSuspendOn` to `0`.
```c
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\ROOT_HUB30\5&2c35141&0&0\Device Parameters\WDF\IdleInWorkingState	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\ROOT_HUB30\5&2bce96aa&0&0\Device Parameters\WDF\IdleInWorkingState	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_046D&PID_0ABA&MI_03\7&41505d0&0&0003\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_05E3&PID_0610\6&3365fbaf&0&11\Device Parameters\WDF\IdleInWorkingState	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_0B05&PID_1939&MI_02\7&40fe908&0&0002\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_046D&PID_C547&MI_00\7&1fc2034b&0&0000\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_046D&PID_C547&MI_01\7&1fc2034b&0&0001\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_046D&PID_C547&MI_02\7&1fc2034b&0&0002\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_1038&PID_161E&MI_00\7&a6e656e&0&0000\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_1038&PID_161E&MI_01\7&a6e656e&0&0001\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_1038&PID_161E&MI_02\7&a6e656e&0&0002\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_1038&PID_161E&MI_03\7&a6e656e&0&0003\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_1038&PID_161E&MI_04\7&a6e656e&0&0004\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Enum\USB\VID_0CF2&PID_A102&MI_01\8&7b0cf2a&0&0001\Device Parameters\SelectiveSuspendOn	Type: REG_DWORD, Length: 4, Data: 0
```

On my 25H2 VM it also switched `PnPCapabilities`:
```c
// MSPower_DeviceEnable enabled
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\0000\PnPCapabilities	Type: REG_DWORD, Length: 4, Data: 16

// MSPower_DeviceEnable disabled
wmiprvse.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\0000\PnPCapabilities	Type: REG_DWORD, Length: 4, Data: 24
```

---

## Storport Idle (`Device Parameters\\StorPort`)

"Storport provides support for idle power management to allow storage devices to enter a low power state when not in use. Storport's idle power management (IPM) support includes handling idle power management for storage devices under its management, in coordination with the Power Manager in Windows.

Storport IPM allows the classpnp and disk class drivers to send the SCSI Stop Unit command to the storage device when it's idle for some period of time. The idle period is configurable by the system administrator. The Storport miniport driver is responsible for how the command is used by the Storport miniport driver to conserve power.

Storport Idle Power Management (IPM) isn't enabled by default. It can be enabled in the registry by setting the "EnableIdlePowerManagement" value in the "StorPort" subkey of the device's hardware key to any nonzero value. To do so, use the device INF file or manually edit the registry using the registry editor."

> https://learn.microsoft.com/en-us/windows-hardware/drivers/storage/registry-entries-for-storport-miniport-drivers  
> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/standardized-inf-keywords-for-power-management.md  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/storage/ipm-configuration-and-usage  
> https://github.com/nohuto/win-registry/blob/main/records/pci.txt  
> [power/assets | storport.c](https://github.com/nohuto/win-config/blob/main/power/assets/storport.c)

See win-registry repo for a list of `CCS\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\...` values/defaults/notes:
> [/docs/win-registry/sections/registry-values-research/pnp-device-values/](/docs/win-registry/sections/registry-values-research/pnp-device-values/)
