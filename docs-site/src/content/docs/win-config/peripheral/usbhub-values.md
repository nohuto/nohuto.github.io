---
title: 'USBHUB Values'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 3
---

For entries described as "any nonzero", the code treats the DWORD as a boolean, means any nonzero value is equivalent to `1`. Default data is unknown for most values as the driver code only reads the registry and handles fallbacks.

## Registry Values Details

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

> [peripheral/assets | HUBREG_QueryUxdDeviceKey.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usbhub/HUBREG_QueryUxdDeviceKey.c)  
> [peripheral/assets | HUBREG_DeleteUxdDeviceKey.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usbhub/HUBREG_DeleteUxdDeviceKey.c)  
> [peripheral/assets | HUBREG_QueryGlobalUxdSettings.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usbhub/HUBREG_QueryGlobalUxdSettings.c)  
> [peripheral/assets | HUBREG_QueryGlobalHubValues.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usbhub/HUBREG_QueryGlobalHubValues.c)  
> [peripheral/assets | HUBREG_GetUxdPnpValue.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/usbhub/HUBREG_GetUxdPnpValue.c)

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
