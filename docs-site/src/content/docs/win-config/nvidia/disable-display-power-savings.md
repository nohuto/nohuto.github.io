---
title: 'Display Power Savings'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#disable-display-power-savings'
sidebar:
  order: 9
---

```
\Registry\Machine\SOFTWARE\NVIDIA Corporation\Global\NVTweak : DisplayPowerSaving
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Global\NVTweak : DisplayPowerSaving
```

Since there's no documentation on this value, I'll assume that it's related to `NvAPI_SYS_GetDisplayPowerSavingState()` and `NvAPI_SYS_SetDisplayPowerSavingState()`, means it's only for LVDS/internal panels (not HDMI/DP externals). And to make the API work `nvDPSSettings` (DWORD 0x786002B) has to be added to the same key as `RMGpuId` (BINARY) which is located in the display adapter subkey.

```
\Registry\Machine\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\XXXX : RMGpuId
```

```h
{
    NV_DISPLAY_POWER_SAVING_NOT_SUPPORTED = -1,
    NV_DISPLAY_POWER_SAVING_DISABLED = 0,
    NV_DISPLAY_POWER_SAVING_ENABLED = 1
} NV_DISPLAY_POWER_SAVING;

///////////////////////////////////////////////////////////////////////////////
//
// Notes about Display Power Saving feature :
//
// This feature works only on LVDS panels and requires that to be active.
// The feature is system specific and can be controlled independent
// of whether the LVDS panel is active.
//
// To control the nvDPS through NVAPI interface, the following registry value
// has to be added:
// only for internal use - DWORD nvDPSSettings = 0x786002B in the same location where BINARY RMGpuId exists.
//
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//
// FUNCTION NAME:  NvAPI_SYS_GetDisplayPowerSavingState
//
//! DESCRIPTION:    This API queries the current Display Power Saving state.
//!
//! HOW TO USE:
//!                 - NV_DISPLAY_POWER_SAVING State;
//!                 - ret = NvAPI_SYS_GetDisplayPowerSavingState(&State);
//!                 - On call success:
//!                 - State would either be NV_DISPLAY_POWER_SAVING_ENABLED or NV_DISPLAY_POWER_SAVING_DISABLED
//!
//! SUPPORTED OS:  Windows 7 and higher
//!
//!
//! \since Release: 180
//!
//! \param  pState  Pointer to NV_DISPLAY_POWER_SAVING variable receiving Power Saving State
//!
//! \retval ::NVAPI_OK
//! \retval ::NVAPI_ERROR
//! \retval ::NVAPI_NOT_SUPPORTED       Display Power Saving feature is not available on the target hardware,
//! \retval ::NVAPI_INVALID_ARGUMENT
//! \retval ::NVAPI_API_NOT_INTIALIZED
//! \retval ::NVAPI_HANDLE_INVALIDATED
//!
//! \ingroup sysdps
///////////////////////////////////////////////////////////////////////////////
NVAPI_INTERFACE NvAPI_SYS_GetDisplayPowerSavingState(NV_DISPLAY_POWER_SAVING *pState);


///////////////////////////////////////////////////////////////////////////////
//
// FUNCTION NAME:  NvAPI_SYS_SetDisplayPowerSavingState
//
//! DESCRIPTION:    This API sets the current Display Power Saving state.
//!
//! HOW TO USE:
//!                 - NV_DISPLAY_POWER_SAVING State = either NV_DISPLAY_POWER_SAVING_ENABLED or NV_DISPLAY_POWER_SAVING_DISABLED;
//!                 - ret = NvAPI_SYS_SetDisplayPowerSavingState(State);
//!                 - On call success:
//!                 - Display Power Saving feature would be enabled or disabled
//!
//! SUPPORTED OS:  Windows 7 and higher
//!
//!
//! \since Release: 180
//!
//! \param   State  NV_DISPLAY_POWER_SAVING_DISABLED or NV_DISPLAY_POWER_SAVING_ENABLED
//!
//! \retval ::NVAPI_OK
//! \retval ::NVAPI_ERROR
//! \retval ::NVAPI_NOT_SUPPORTED  Display Power Saving feature is not available on the target hardware
//! \retval ::NVAPI_INVALID_ARGUMENT
//! \retval ::NVAPI_API_NOT_INTIALIZED
//! \retval ::NVAPI_HANDLE_INVALIDATED
//!
//! \ingroup sysdps
///////////////////////////////////////////////////////////////////////////////
NVAPI_INTERFACE NvAPI_SYS_SetDisplayPowerSavingState(NV_DISPLAY_POWER_SAVING State);
```

You can find it in `nvsvc64.dll`.

> [nvidia/assets | disppower-nvsvc64.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/disppower-nvsvc64.c)  
> [nvidia/assets | disppower-nvsvc64gv.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/disppower-nvsvc64gv.c)
