---
title: 'USB/USBHUB/USBFLAGS Values'
description: 'Generated from win-registry README section: USB/USBHUB/USBFLAGS Values.'
editUrl: 'https://github.com/nohuto/win-registry/blob/main/README.md#usbusbhubusbflags-values'
sidebar:
  order: 10
---

For entries described as "any nonzero", the code treats the DWORD as a boolean, means any nonzero value is equivalent to `1`. Default data is unknown for most values as the driver code only reads the registry and handles fallbacks, note that this is currently based on USBHUB3.sys only, means it's not complete (USBXHCI.sys was used for DisableHCS0Idle & TestRunEsmInWorkItem, Ucx01000.sys for Allow64KLowOrFullSpeedControlTransfers, usbccgp.sys for GenericCompositeUSBDeviceString).

This documentation doesn't include all details, since the repo is used for showing registry values, their default data, ranges and miscellaneous information. See [desc.md#usbflags-values](/docs/win-config/peripheral/usbflags-values/), [desc.md#usb-values](/docs/win-config/peripheral/usb-values/), [desc.md#usbhub-values](/docs/win-config/peripheral/usbhub-values/) for more details. The USBHUB3.sys included some values located in the device hardware key like `DeviceIdleEnabled`, `DefaultIdleState`, `DeviceIdleIgnoreWakeEnable`, I didn't add them here since it lacks on details, see [desc.md#disable-device-powersavings](https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-device-powersavings).

You can use `!usb3kd.device_info` to get more information on a USB device in the USB 3.0 tree, example:
```c
lkd> !usb3.usb_tree

4) !device_info 0xffffb009127ca1f0, !devstack ffffb009127e1d80
    Current Device State: ConfiguredInD0
    Desc: USB Receiver
    USB\VID_046D&PID_C547&REV_0402 Logitech Inc.
    !ucx_device 0xffffb009127cad00 !xhci_deviceslots 0xffffb0090bc17db0 1 !xhci_info 0xffffb0090bc17db0

lkd> !usb3kd.device_info 0xffffb009127ca1f0

U1Timeout: 0, U2Timeout: 0
DeviceFlags: DeviceIsComposite MsOsDescriptorNotSupported UsbWakeupSupport 
DeviceStateFlags: DeviceAttachSuccessful DeviceIsKnown ConfigurationIsValid ConfigDescIsValid 
                  DeviceStarted InstallMSOSExtEventProcessed IsNative 
DeviceHackFlags: DisableOnSoftRemove DisableLpm
```
The `DisableLpm` DeviceHackFlags exists if the value is set (DisableLPM).

You can see existing `_USB_DEVICE_HACKS` using the dt command:
```c
lkd> .load usb3kd
lkd> dt USBHUB3!_USB_DEVICE_HACKS
   +0x000 AsUlong32        : Uint4B
   +0x000 DisableSerialNumber : Pos 0, 1 Bit
   +0x000 DontSkipMsOsDescriptor : Pos 1, 1 Bit
   +0x000 ResetOnResumeSx  : Pos 2, 1 Bit
   +0x000 DisableOnSoftRemove : Pos 3, 1 Bit
   +0x000 RequestConfigDescOnReset : Pos 4, 1 Bit
   +0x000 SkipContainerIdQuery : Pos 5, 1 Bit
   +0x000 IgnoreBOSDescriptorValidationFailure : Pos 6, 1 Bit
   +0x000 DisableLpm       : Pos 7, 1 Bit
   +0x000 SkipSetSel       : Pos 8, 1 Bit
   +0x000 ResetOnResumeInSuperSpeed : Pos 9, 1 Bit
   +0x000 AllowInvalidPipeHandles : Pos 10, 1 Bit
   +0x000 DisableUASP      : Pos 11, 1 Bit
   +0x000 SkipSetIsochDelay : Pos 12, 1 Bit
   +0x000 ResetOnResumeS0  : Pos 13, 1 Bit
   +0x000 DisableHotReset  : Pos 14, 1 Bit
   +0x000 SkipBOSDescriptorQuery : Pos 15, 1 Bit
   +0x000 NonFunctional    : Pos 16, 1 Bit
   +0x000 DisableUsb20HardwareLpm : Pos 17, 1 Bit
   +0x000 DisableRemoteWakeForUsb20HardwareLpm : Pos 18, 1 Bit
   +0x000 DisableSuperSpeed : Pos 19, 1 Bit
   +0x000 IncompatibleWithWindows : Pos 20, 1 Bit
   +0x000 UseWin8DescriptorValidation : Pos 21, 1 Bit
   +0x000 DisableFastEnumeration : Pos 22, 1 Bit
   +0x000 DisableRecoveryFromPowerDrain : Pos 23, 1 Bit
   +0x000 AddControllerSuffixedCompatIdToAudioDevices : Pos 24, 1 Bit
   +0x000 AddMausbSuffixToHardwareId : Pos 25, 1 Bit
   +0x000 EnablePLDRDuringCyclePort : Pos 26, 1 Bit
   +0x000 ResetOnErrorInD2Resume : Pos 27, 1 Bit
```

> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/debuggercmds/-usb3kd-device-info.md

`HUBDSM_QueryingRegistryValuesForDevice` -> `HUBMISC_QueryAndCacheRegistryValuesForDevice` -> `HUBREG_QueryUsbflagsValuesForDevice`

> [!WARNING]
> Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

Note on some usbflag values ("queried as 4-byte boolean"), `USBHUB3` reads a 4-byte and handles any nonzero value as enabled. The value type is not enforced, so both `REG_DWORD` and `REG_BINARY` should work if they're a 4-byte nonzero value (that's my current assumption). I would personally use `REG_BINARY` instead of `REG_DWORD` for now, as for example `osvc`, `IgnoreHWSerNum`, `ResetOnResume` are `REG_BINARY` ([usb-device-specific-registry-settings.md](https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/usbcon/usb-device-specific-registry-settings.md)).

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usbflags";
    "Allow64KLowOrFullSpeedControlTransfers" = ?; // REG_DWORD, only value 1 enables, 0/other values disable
    "DisableHCS0Idle" = 0; // REG_DWORD, nonzero disables S0 idle, missing/read failure behaves as 0
    "GenericCompositeUSBDeviceString" = ?; // REG_SZ
    "SetMultiTTBitDuringConfigureEndpoint" = ?; // REG_DWORD, 1 enables override, 0 disables override
    "TestRunEsmInWorkItem" = 0; // REG_DWORD, 1 enables test mode bit, 0 clears it

// built by HUBREG_OpenCreateUsbflagsDeviceKey

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\usbflags\\<vvvvpppprrrr>";
    "IgnoreHWSerNum" = ?; // REG_BINARY, Indicates whether the USB driver stack must ignore the serial number of the device.
                          // 0x00: The setting is disabled.
                          // 0x01: Forces the USB driver stack to ignore the serial number of the device. Therefore, the device instance is tied to the port to which the device is attached.
    "UseWin8DescriptorValidation" = ?; // queried as 4-byte boolean
    "ResetOnResume" = ?; // REG_BINARY, indicates whether the USB driver stack must reset the device when the port resumes from a sleep cycle.
                         // 0x0000: The setting is disabled.
                         // 0x0001: Forces the USB driver stack to reset a device on port resume.
    "DisableOnSoftRemove" = 1; // queried as 4-byte boolean
    "RequestConfigDescOnReset" = ?; // queried as 4-byte boolean
    "DisableRecoveryFromPowerDrain" = ?; // queried as 4-byte boolean
    "DisableLpm" = ?; // queried as 4-byte boolean. When enabled, link power management is disabled for the device.
                      // "A link enters a low power state (consuming less power than the working state) only when the downstream device enters the suspended state through the selective suspend mechanism", "After remaining idle for a certain period of time, link partners progressively enter U1 (standby with fast exit) and then U2 (standby with slower exit)"
                      // https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-3-0-lpm-mechanism- https://learn.microsoft.com/en-us/windows-hardware/drivers/usbcon/u1-and-u2-transitions
    "SkipBOSDescriptorQuery" = ?; // queried as 4-byte boolean
    "AlternateSettingFilter" = ?; // REG_BINARY, size must be even and > 0 (data is cached as 16 bit entries "count = byte_size/2")
    "ResetTTOnCancel" = ?; // REG_DWORD
    "NoClearTTBufferOnCancel" = ?; // REG_DWORD, has priority over ResetTTOnCancel
    "PowerUpDelay" = ?; // REG_DWORD?

    "osvc" = ?; // REG_BINARY, "Indicates whether the operating system queried the device for Microsoft-defined USB descriptors. If the previously attempted OS descriptor query was successful, the value contains the vendor code from the OS string descriptor."
                // 0x0000: The device didn't provide a valid response to the Microsoft OS string descriptor request.
                // 0x01xx: The device provided a valid response to the Microsoft OS string descriptor request, where xx is the bVendorCode contained in the response.
    "SkipContainerIdQuery" = ?; // queried as 4-byte boolean
    "MsOs20DescriptorSetInfo" = ?; // queried as 8-byte

    //"DontSkipMsOsDescriptor"
    //"IgnoreBOSDescriptorValidationFailure"
    //"SkipSetSel"
    //"ResetOnResumeInSuperSpeed"
    //"AllowInvalidPipeHandles"
    //"DisableUASP"
    //"SkipSetIsochDelay"
    //"ResetOnResumeS0"
    //"DisableHotReset"
    //"NonFunctional"
    //"DisableUsb20HardwareLpm"
    //"DisableRemoteWakeForUsb20HardwareLpm"
    "DisableSuperSpeed" // "There are certains hubs that we just don't want to support as they are too buggy. We will completely disable SuperSpeed for them."
    //"IncompatibleWithWindows"
    //"DisableFastEnumeration"
    //"AddControllerSuffixedCompatIdToAudioDevices"
    //"AddMausbSuffixToHardwareId"
    //"EnablePLDRDuringCyclePort"
    //"ResetOnErrorInD2Resume"
```

> [peripheral/assets | HUBDSM_QueryingRegistryValuesForDevice.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBDSM_QueryingRegistryValuesForDevice.c)  
> [peripheral/assets | HUBMISC_QueryAndCacheRegistryValuesForDevice.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBMISC_QueryAndCacheRegistryValuesForDevice.c)  
> [peripheral/assets | HUBREG_OpenCreateUsbflagsDeviceKey.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBREG_OpenCreateUsbflagsDeviceKey.c)  
> [peripheral/assets | HUBREG_QueryUsbflagsValuesForDevice.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBREG_QueryUsbflagsValuesForDevice.c)  
> [peripheral/assets | HUBREG_QueryHubErrataFlags.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBREG_QueryHubErrataFlags.c)  
> [peripheral/assets | HUBREG_QueryUsbflagsAlternateSettingFilter.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/HUBREG_QueryUsbflagsAlternateSettingFilter.c)  
> [peripheral/assets | RegQueryGenericCompositeUSBDeviceString.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/RegQueryGenericCompositeUSBDeviceString.c)  
> [peripheral/assets | GetConfigValue.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/GetConfigValue.c)  
> [peripheral/assets | Controller_IsRegKeySetToDisableS0Idle.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/Controller_IsRegKeySetToDisableS0Idle.c)  
> [peripheral/assets | Controller_PopulateRegistryOverrideForSetMultiTTBitFlag.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/Controller_PopulateRegistryOverrideForSetMultiTTBitFlag.c)  
> [peripheral/assets | Controller_PopulateTestRegistrySettings.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/Controller_PopulateTestRegistrySettings.c)  
> [peripheral/assets | Registry_InitializeAllow64KLowOrFullSpeedControlTransfersFlag.c](https://github.com/nohuto/win-registry/blob/main/assets/usbflags/Registry_InitializeAllow64KLowOrFullSpeedControlTransfersFlag.c)

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

> [peripheral/assets | GetPersistedKeyPath.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/GetPersistedKeyPath.c)  
> [peripheral/assets | HUBREG_OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/HUBREG_OpenQueryAttemptRecoveryFromUsbPowerDrainValue.c)  
> [peripheral/assets | HUBREG_QueryGlobalUsb20HardwareLpmSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/HUBREG_QueryGlobalUsb20HardwareLpmSettings.c)  
> [peripheral/assets | HUBREG_QueryGlobalUsbLtmSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/HUBREG_QueryGlobalUsbLtmSettings.c)  
> [peripheral/assets | HUBREG_QueryUsbHardwareVerifierValue.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/HUBREG_QueryUsbHardwareVerifierValue.c)  
> [peripheral/assets | ReadManifestAssignedValue.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/ReadManifestAssignedValue.c)  
> [peripheral/assets | UsbDualRoleFeaturesQueryLocalMachine.c](https://github.com/nohuto/win-registry/blob/main/assets/usb/UsbDualRoleFeaturesQueryLocalMachine.c)

```c
// HUBREG_QueryGlobalHubValues
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBHUB\\hubg"; // g_HubGlobalKeyName (aRegistryMachin_10)
    "DisableSelectiveSuspendUI" = ?; // REG_DWORD
    "MsOsDescriptorMode" = ?; // REG_DWORD, valid values are 0-2
    "EnableDiagnosticMode" = ?; // REG_DWORD, nonzero enables diagnostic mode
    "DisableOnSoftRemove" = 1; // REG_DWORD, default behavior enabled, 0 disables it
    "DisableUxdSupport" = ?; // REG_DWORD, nonzero disables UXD support
    "EnableExtendedValidation" = ?; // REG_DWORD
    "WakeOnConnectUI" = ?; // REG_DWORD, nonzero enables wake on connect UI ("This controls the UI check box 'Allow this device to wake the system'. Essentially this is control for the wake on connect feature.")
    "PreventDebounceTimeForSuperSpeedDevices" = ?; // REG_DWORD, nonzero enables extra debounce handling ("Checks if we need to give extra time to SuperSpeed devices before talking to them")

    // miscellaneous ones from GlobalUsbhubValues
    "UsbDebugModeEnable" = ?;
    "BreakOnHubException" = ?;
    "debuglevel" = ?;
    "DebugLogMask" = ?;
    "DebugLogEnable" = ?;
    "DisableHardReset" = ?;
    "BreakOnReplicant" = ?;
    "BreakOnEnumFailure" = ?;
    "UseIoErrorLog" = ?;
    "ForceResetOnResume" = ?;
    "DisableFastResume" = ?;
    "LogSize" = ?;
    "IdleTimeout" = ?;

// HUBREG_QueryGlobalUxdSettings (the defaults were taken from the W10 source)
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\policy"; // g_UxdGlobalSettingsKey (aRegistryMachin_12)
    "UxdGlobalDeleteOnShutdown" = 0; // REG_DWORD, nonzero enables delete on shutdown
    "UxdGlobalDeleteOnReload" = 0; // REG_DWORD, nonzero enables delete on reload
    "UxdGlobalDeleteOnDisconnect" = 0; // REG_DWORD, nonzero enables delete on disconnect
    "UxdGlobalEnable" = 0; // REG_DWORD, nonzero enables UXD globally

// HUBREG_QueryUxdDeviceKey / HUBREG_DeleteUxdDeviceKey
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\devices"; // g_UxdDeviceSettingsKey (aRegistryMachin_5)
    "%04X%04X%04X" = ?; // value name from VID/PID/REV

// HUBREG_GetUxdPnpValue
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\usbhub\\uxd_control\\pnp"; // g_UxdGuidSettingsKey (aRegistryMachin_3)
    "{GUID}" = ?; // value name from RtlStringFromGUID
```

> [peripheral/assets | HUBREG_QueryUxdDeviceKey.c](https://github.com/nohuto/win-registry/blob/main/assets/usbhub/HUBREG_QueryUxdDeviceKey.c)  
> [peripheral/assets | HUBREG_DeleteUxdDeviceKey.c](https://github.com/nohuto/win-registry/blob/main/assets/usbhub/HUBREG_DeleteUxdDeviceKey.c)  
> [peripheral/assets | HUBREG_QueryGlobalUxdSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/usbhub/HUBREG_QueryGlobalUxdSettings.c)  
> [peripheral/assets | HUBREG_QueryGlobalHubValues.c](https://github.com/nohuto/win-registry/blob/main/assets/usbhub/HUBREG_QueryGlobalHubValues.c)  
> [peripheral/assets | HUBREG_GetUxdPnpValue.c](https://github.com/nohuto/win-registry/blob/main/assets/usbhub/HUBREG_GetUxdPnpValue.c)

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
