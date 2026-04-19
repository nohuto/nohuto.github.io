---
title: 'USB Values'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 2
---

For entries described as "any nonzero", the code treats the DWORD as a boolean, means any nonzero value is equivalent to `1`. Default data is unknown for most values as the driver code only reads the registry and handles fallbacks.

## Registry Values Details

```c
// HUBREG_QueryGlobalUsb20HardwareLpmSettings
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\Usb20HardwareLpm"; // g_Usb20HardwareLpmKeyName (aRegistryMachin_8)
    "Usb20HardwareLpmOverride" = 1; // REG_DWORD, default behavior enabled, 0 disables it
    "Usb20HardwareLpmTimeout" = 2; // REG_DWORD, accepted range 0-255

// HUBREG_OpenQueryAttemptRecoveryFromUsbPowerDrainValue
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\AutomaticSurpriseRemoval"; // g_UsbAutomaticSurpriseRemovalKeyName (aRegistryMachin_6)
    "AttemptRecoveryFromUsbPowerDrain" = 0; // REG_DWORD, is used to stop USB devices when your screen is off, obviously only for laptop users

// HUBREG_QueryUsbHardwareVerifierValue
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\HardwareVerifier"; // g_HwVerifierKeyName (aRegistryMachin_7)
    "<VID><PID><REV>\\usbUpto20|usb2X|usb30\\device" = ?; // REG_DWORD, first lookup
    "<VID><PID>\\usbUpto20|usb2X|usb30\\device" = ?; // REG_DWORD, fallback
    "global\\usbUpto20|usb2X|usb30\\device" = ?; // REG_DWORD, last fallback

// HUBREG_QueryGlobalUsbLtmSettings
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\UsbLtm"; // g_UsbLtmKeyName (aRegistryMachin_4)
    "UsbLtmEnable" = 0; // REG_DWORD, nonzero enables USB LTM

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\USB";
    "DualRoleFeaturesTestOverride" = ?; // REG_DWORD, queried from GetPersistedKeyPath
    "UcmIsPresent" = ?; // REG_DWORD

// these are taken from the W10 source, they seem to exist on latest builds (they do exist in usbport.sys on 23H2)

"HKLM\\SYSTEM\\CurrentControlSet\\Services\\usb";
    "debuglevel" = 0; // REG_DWORD, default to 1/2 when DEBUG1/DEBUG2 builds, higher numbers enable more logs
    "debuglogmask" = 0xFFFFFFFE; // REG_DWORD, bitmask for log categories
    "debuglogenable" = 1; // REG_DWORD (bool), enables debug log output
    "debugcatc" = 0; // REG_DWORD (bool), enables CATC analyzer trigger
    "DisableSelectiveSuspend" = 0; // REG_DWORD (bool), global disable for selective suspend (GlobalUsbhubLegacyValues?)
    "DisableCcDetect" = 0; // REG_DWORD (bool), global disable for CC detection
    "EnPMDebug" = 0; // REG_DWORD (bool), for debugging power management
    "ForceHcD3NoWakeArm" = 0 // REG_DWORD (bool), prevents wake-arming when forcing HC to D3
    "EnableDCA" = 0 // REG_DWORD (bool), enables direct controller access (HCT diagnostics)
    "ForcePortsHighSpeed" = 0; // REG_DWORD (bool), forces ports to remain under EHCI (HCT compatibility)

// "This class is reserved for USB host controllers and USB hubs", I'll add them here as they're also in usbport.sys and also taken from the W10 source

"HKLM\\System\\CurrentControlSet\\Control\\Class\\{36FC9E60-C465-11CF-8056-444553540000}\\<instance>";
    "HcFlavor" = ? // REG_DWORD, auto detect
    "TotalBusBandwidth" = ? // REG_DWORD, calculated from miniport registration (bits/ms), overrides bus bandwidth accounting
    "HcDisableAllSelectiveSuspend" = 0 (non-IA64), 1 (IA64); // REG_DWORD, nonzero disables selective suspend
    "CommonBuffer2GBLimit" = 0; // REG_DWORD, when nonzero, forces common buffers below 2GB ("Limit common buffer allocations for the miniport to the physical address range below 2GB.  Only bits 0 through 30 of the physical address can be set.  Bit 31 of the physical address cannot be set.")
    "ForceHCResetOnResume" = 0; // REG_DWORD, forces controller reset on resume
    "FastResumeEnable" = 0; // REG_DWORD, enables fast S0 resume

    //HcDisableSelectiveSuspend

// miscellaneous note for future reference
"\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Usb\\Ceip" // UsbhUpdateRegSurpriseRemovalCount
    "BootPathSurpriseRemovalCount" = ?;
```

> [peripheral/assets | GetPersistedKeyPath.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/GetPersistedKeyPath.c)  
> [peripheral/assets | HUBREG_OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/HUBREG_OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c)  
> [peripheral/assets | HUBREG_QueryGlobalUsb20HardwareLpmSettings.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/HUBREG_QueryGlobalUsb20HardwareLpmSettings.c)  
> [peripheral/assets | HUBREG_QueryGlobalUsbLtmSettings.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/HUBREG_QueryGlobalUsbLtmSettings.c)  
> [peripheral/assets | HUBREG_QueryUsbHardwareVerifierValue.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/HUBREG_QueryUsbHardwareVerifierValue.c)  
> [peripheral/assets | ReadManifestAssignedValue.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/ReadManifestAssignedValue.c)  
> [peripheral/assets | UsbDualRoleFeaturesQueryLocalMachine.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usb/UsbDualRoleFeaturesQueryLocalMachine.c)

## RegistryMachin_* Keys

```c
aRegistryMachin_1 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\USBFN";
aRegistryMachin_2 = // doesn't exist
aRegistryMachin_3 = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\pnp";
aRegistryMachin_4 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\UsbLtm";
aRegistryMachin_5 = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\devices";
aRegistryMachin_6 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\AutomaticSurpriseRemoval";
aRegistryMachin_7 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\HardwareVerifier";
aRegistryMachin_8 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb\\Usb20HardwareLpm";
aRegistryMachin_9 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usbflags";
aRegistryMachin_10 = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBHUB\\hubg";
aRegistryMachin_11 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\USB";
aRegistryMachin_12 = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\policy";
aRegistryMachin_13 = "HKLM\\SYSTEM\\CurrentControlSet\\Control\\usb";
```

## Miscellaneous Notes

`AttemptRecoveryFromUsbPowerDrain` is used to stop USB devices when your screen is off, obviously only for laptop users.

```
Stop USB devices when my screen is off to help battery.
```
`Bluetooth & devices` > `USB` > `USB battery saver`

> [power/assets | usbbattery-OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c](https://github.com/nohuto/win-config/blob/main/power/assets/usbbattery-OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c)
