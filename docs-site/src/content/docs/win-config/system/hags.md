---
title: 'HAGS'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

[HAGS](https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/) (*Hardware-accelerated GPU scheduling*) changes who handles high frequency GPU scheduling work, classic WDDM uses a high priority CPU scheduler thread, HAGS offloads much of that scheduling/context switch work to a GPU scheduling processor. Note that `TEAS` in the dropdown = `ThreatExpimentalAsStable`.

![](https://github.com/nohuto/win-config/blob/main/system/images/HwQueue.png?raw=true)

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers";
    "HwSchMode" = 0; // range 0-2, >=3 = 0
    "HwSchOverrideBlockList" = 1; // bool
    "HwSchTreatExperimentalAsStable" = 0; // bool
```

Query the current states using the name RVAs (`dword_1C01404B8` = HwSchMode, `byte_1C01404BC` = HwSchOverrideBlockList, `byte_1C01404BD` = HwSchTreatExperimentalAsStable for the part below, obviously these names depend on the IDA auto generation so they'll unlikely be the same for you), follow the [DriverStart + RVAs](https://noverse.dev/docs/win-config/system/mmcss-values/#driverstart--rvas) guide if you want to try it.

```c
lkd> dd dxgkrnl+1404b8 L1
fffff803`72b404b8  00000000 // HwSchMode

lkd> db dxgkrnl+1404bc L2
fffff803`72b404bc  01 00 // HwSchOverrideBlockList + HwSchTreatExperimentalAsStable
```

```c
// DpiInitializeGlobalState

v41 = L"HwSchMode";
v42 = (int *)&v24;
v26 = 1; // HwSchOverrideBlockList default
v25 = 0; // HwSchTreatExperimentalAsStable default
*(_QWORD *)&v48 = L"HwSchOverrideBlockList";
*((_QWORD *)&v48 + 1) = &v26;
v53 = L"HwSchTreatExperimentalAsStable";
v54 = (unsigned int *)&v25;
v6 = RtlQueryRegistryValuesEx(2LL, L"GraphicsDrivers", &v39, 0LL, 0LL);
if ( v6 >= 0 && v24 < 3 ) // HwSchMode range 0-2
{
  dword_1C01404B8 = v24;
  goto LABEL_19;
}
else
  dword_1C01404B8 = 0; // default if missing/query failed/value >= 3
if ( v6 >= 0 )
{
LABEL_19:
  byte_1C01404BC = 0; // can't really tell what impact that would have yet
  byte_1C01404BD = v25 != 0; // HwSchTreatExperimentalAsStable
  if ( !v26 ) // HwSchOverrideBlockList == 0
    goto LABEL_21;
}
byte_1C01404BC = 1; // query failed/HwSchOverrideBlockList nonzero (default)
```

`DXGK_FEATURE_SUPPORT_*` values are returned by the driver, these registry values are basically kind of "overrides" how dxgkrnl handles that support state.

| Value | Data | Meaning |
| --- | --- | --- |
| `HwSchMode` | `0` | Default OS policy |
| `HwSchMode` | `1` | Disable stable/experimental support (`DXGK_FEATURE_SUPPORT_ALWAYS_ON` would still turn it on) |
| `HwSchMode` | `2` | Allow stable support |
| `HwSchTreatExperimentalAsStable` | `0` | Experimental stays experimental |
| `HwSchTreatExperimentalAsStable` | nonzero | Experimental = stable (used when driver returns `DXGK_FEATURE_SUPPORT_EXPERIMENTAL`, then it would be `DXGK_FEATURE_SUPPORT_STABLE`) |

## DXGK_FEATURE_SUPPORT

```c
// DXGK_FEATURE_SUPPORT constants

// When a driver doesn't support a feature, it doesn't call into QueryFeatureSupport with that feature ID.
// This value is provided for implementation convenience of enumerating possible driver support states
// for a particular feature.
#define DXGK_FEATURE_SUPPORT_ALWAYS_OFF ((UINT)0)

// Driver support for a feature is in the experimental state
#define DXGK_FEATURE_SUPPORT_EXPERIMENTAL ((UINT)1)

// Driver support for a feature is in the stable state
#define DXGK_FEATURE_SUPPORT_STABLE ((UINT)2)

// Driver support for a feature is in the always on state,
// and it doesn't operate without this feature enabled.
#define DXGK_FEATURE_SUPPORT_ALWAYS_ON ((UINT)3)
```

## DXGK_FEATURE_ID

There're more than that, but I only included these as [`DpQueryFeatureSupport`](https://github.com/nohuto/decompiled-pseudocode/blob/main/11-23H2/dxgkrnl/DpQueryFeatureSupport.c) applies the same `HwSchMode`/`HwSchTreatExperimentalAsStable` policy to them.

- [`HWFLIPQUEUE` | drivers/display/hardware-flip-queue](https://learn.microsoft.com/en-us/windows-hardware/drivers/display/hardware-flip-queue)
- [`USER_MODE_SUBMISSION` | drivers/display/user-mode-work-submission](https://learn.microsoft.com/en-us/windows-hardware/drivers/display/user-mode-work-submission)

```cpp
// For each feature in this enumeration, if the driver supports it,
// it must invoke the OS QueryFeatureSupport callback
// to report the level of support (experimental, stable, always on),
// and only enable the feature if the OS returned Enabled=TRUE.
// Drivers that don't support the feature don't have to call the OS to query its status.
//
typedef enum _DXGK_FEATURE_ID
{
    DXGK_FEATURE_HWSCH                          = DXGK_DEFINE_FEATURE_ID(DXGK_FEATURE_CATEGORY_DRIVER, DXGK_DRIVER_FEATURE_HWSCH),
    DXGK_FEATURE_HWFLIPQUEUE                    = DXGK_DEFINE_FEATURE_ID(DXGK_FEATURE_CATEGORY_DRIVER, DXGK_DRIVER_FEATURE_HWFLIPQUEUE), // A hardware flip queue allows multiple future frames to be submitted to the display controller queue. The CPU and parts of the GPU can transition to lower power states while the display controller is processing multiple queued frames, improving power efficiency of video playback scenarios on capable hardware.
    DXGK_FEATURE_USER_MODE_SUBMISSION           = DXGK_DEFINE_FEATURE_ID(DXGK_FEATURE_CATEGORY_DRIVER, DXGK_DRIVER_FEATURE_USER_MODE_SUBMISSION),
} DXGK_FEATURE_ID;
```

## query_hwsch

`query_hwsch` calls `D3DKMTQueryAdapterInfo` (`KMTQAITYPE_WDDM_2_9_CAPS`/`KMTQAITYPE_WDDM_3_0_CAPS`) to get the `DriverSupportState`/`Enabled` bits, you can either use the [prebuild binary](https://github.com/nohuto/win-config/blob/main/system/assets/query_hwsch.exe), or build it yourself from [source](https://github.com/nohuto/win-config/tree/main/system/assets/query_hwsch):

```powershell
cmake -S . -B build
cmake --build build --config Release
```

Example output:

```c
// HwSchMode = 2
\\.\DISPLAY1
  AdapterLuid=00000000:00007552 VidPnSourceId=0 hAdapter=1073741824
  WDDM_2_9 raw=0x00000006 HWSCH DriverSupportState=2 Enabled=1
  WDDM_3_0 raw=0x0000000e HWFLIPQUEUE DriverSupportState=2 Enabled=1 DisplayableSupported=1

// HwSchMode = 1
\\.\DISPLAY1
  AdapterLuid=00000000:0000759f VidPnSourceId=0 hAdapter=1073741824
  WDDM_2_9 raw=0x00000002 HWSCH DriverSupportState=2 Enabled=0
  WDDM_3_0 raw=0x0000000a HWFLIPQUEUE DriverSupportState=2 Enabled=0 DisplayableSupported=1
```

### dxdiag

You can practically also use dxdiag, but that won't show the enabled bit of e.g. `HWFLIPQUEUE` via:

```powershell
dxdiag /t .\dxdiag.txt
```

Then look for the `Display Devices` section which should include `Hardware Scheduling` & other details.
