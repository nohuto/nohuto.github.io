---
title: 'DWM Values'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 4
---

This option currently includes some speculations and default values. I haven't had time yet to test the behavior of the changed data.

## Registry Values Details

See [assets/dwm](https://github.com/nohuto/win-config/tree/main/system/assets/dwm) for used snippets (taken from `dwmcore.dll`, `win32full.sys`, `dwm.exe`, `dwminit.dll`, `uDWM.dll`).

Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

```c
"HKLM\\SOFTWARE\\Microsoft\\Windows\\Dwm";
    "BlackOutAllReadback" = 0;
    "ConfigureInput" = 1;
    "CpuClipAASinkEnableIntermediates" = 1;
    "CpuClipAASinkEnableOcclusion" = 1;
    "CpuClipAASinkEnableRender" = 1;
    "CpuClipAreaThreshold" = 20000;
    "CpuClipWarpPartitionThreshold" = 1024;
    "DisableDrawListCaching" = 0; // REG_DWORD
    "DisableProjectedShadows" = 0;
    "DisplayChangeTimeoutMs" = 1000;
    "EnableBackdropBlurCaching" = 1; // REG_DWORD
    "EnableCommonSuperSets" = 1;
    "EnableCpuClipping" = 1;
    "EnableDDisplayScanoutCaching" = 1;
    "EnableEffectCaching" = 1; // REG_DWORD
    "EnableFrontBufferRenderChecks" = 1;
    "EnableMegaRects" = 1;
    "EnablePrimitiveReordering" = 1;
    "ForceFullDirtyRendering" = 0;
    "GammaBlendPencil" = 1;
    "GammaBlendWithFP16" = 1;
    "InkGPUAccelOverrideVendorWhitelist" = 0;
    "LayerClippingMode" = 2;
    "LogExpressionPerfStats" = 0; // REG_DWORD
    "MajorityScreenTest_MinArea" = 80;
    "MajorityScreenTest_MinLength" = 80;
    "MaxD3DFeatureLevel" = 0;
    "MegaRectSearchCount" = 100;
    "MegaRectSize" = 100000;
    "MousewheelAnimationDurationMs" = 250;
    "MousewheelScrollingMode" = 0; // REG_DWORD
    "OptimizeForDirtyExpressions" = 1; // REG_DWORD
    "OverlayMinFPS" = 15; // If this value is present and set to zero, the Desktop Window Manager disables its minimum frame rate requirement for assigning DirectX swap chains to overlay planes in hardware that supports overlays. This makes it more likely that a low frame rate swap chain will get assigned and stay assigned to an overlay plane, if available. (https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/dwm/registry-values.md)
    "RenderThreadTimeoutMilliseconds" = 5000;
    "SuperWetExtensionTimeMicroseconds" = 1000;
    "TelemetryFramesReportPeriodMilliseconds" = 300000;
    "TelemetryFramesSequenceIdleIntervalMilliseconds" = 1000;
    "TelemetryFramesSequenceMaximumPeriodMilliseconds" = 1000;
    "UniformSpaceDpiMode" = 1;
    "UseFastestMonitorAsPrimary" = 0;
    "vBlankWaitTimeoutMonitorOffMs" = 250;
    "WarpEnableDebugColor" = 0;

    "BackdropBlurCachingThrottleMs" = 25; // 25ms if missing, clamped to <=1000ms when present?
    "CompositorClockPolicy" = 1; // range 0-1
    "CpuClipFlatteningTolerance" = 0; // scaled /1000
    "CustomRefreshRateMode" = 0; // range 0-2
    "DisableAdvancedDirectFlip" = 0; // REG_DWORD
    "DisableIndependentFlip" = 0;
    "DisableProjectedShadowsRendering" = 0;
    "FlattenVirtualSurfaceEffectInput" = 0;
    "ForceEffectMode" = 0; // range 0-2, REG_DWORD
    "FrameCounterPosition" = 0;
    "InteractionOutputPredictionDisabled" = 0;
    "OverlayTestMode" = 0; // 5 = MPO disabled, REG_DWORD
    "ParallelModePolicy" = 1; // >=3 coerced to 1
    "ParallelModeRateThreshold" = 119; // divisor for g_qpcFrequency, missing key defaults to 119 Hz (units: Hz)? 0 disables
    "ResampleInLinearSpace" = 0;
    "ResampleModeOverride" = 0;
    "SDRBoostPercentOverride" = 0; // scaled /100
    "ShowDirtyRegions" = 0;

    "AnimationsShiftKey" = 0;
    "DisableLockingMemory" = 0;
    "ModeChangeCurtainUseDebugColor" = 0;
    "UseDPIScaling" = 1;

    "ChildWindowDpiIsolation" = 1; // range 0-1
    "DisableDeviceBitmaps" = 0; // range 0-1
    "EnableResizeOptimization" = 0; // REG_DWORD (no clamp?)
    "ResizeTimeoutGdi" = 0; // range 0-4294967295 (ms)
    "ResizeTimeoutModern" = 0; // range 0-4294967295 (ms)

    "DefaultColorizationColorState" = 0;
    "DisallowAnimations" = 0;
    "DisallowColorizationColorChanges" = 0;

    "DisableSessionTermination" = 0; // range 0-1
    "ForceBasicDisplayAdapterOnDWMRestart" = 0; // range 0-1
    "OneCoreNoBootDWM" = 0; // REG_DWORD, nonzero = enabled
    "OneCoreNoDWMRawGameController" = ? // didn't look into it yet, but it's probably related to OneCoreNoBootDWM

    "DisableHologramCompositor" = 0;

    // Haven't looked into them yet
    "ForceUDwmSoftwareDevice" = ?;
    "ForceDisableModeChangeAnimation" = ?; // REG_DWORD

    // procmon boot trace
    "AccentColorInactive" = ?;
    "AnimationAttributionEnabled" = 1; // REG_DWORD
    "AnimationAttributionHashingEnabled" = 1; // REG_DWORD
    "ColorPrevalence" = ?;
    "CpuClipAASinkEnableDebugColors" = ?;
    "CpuClipAASinkForceEnable" = ?;
    "DebugFailFast" = ?;
    "DisableDeviceBitmapsForMultiAdapter" = ?;
    "DwmInitSessionActivityId_00000001" = ?; // a ID, REG_SZ
    "EnableDesktopOverlays" = ?;
    "EnableMPCPerfCounter" = ?;
    "EnableRenderPathTestMode" = ?;
    "EnableWindowColorization" = ?;
    "ForceDesktopTreeFullDirty" = ?;
    "MajorityScreenTest_MaxCoverage" = ?;
    "MarshalAllDebugInfo" = ?;
    "MPCInputRouterWaitForDebugger" = ?;
    "ShaderLinkingGPUBlacklist" = ?; // REG_SZ
    "SuperWetEnabled" = ?;
    "UseHWDrawListEntriesOnWARP" = ?;


"HKLM\\SOFTWARE\\Microsoft\\Windows\\Dwm\\Scene";
    "EnableBloom" = 0; // REG_DWORD
    "EnableDrawToBackbuffer" = 1; // REG_DWORD
    "EnableImageProcessing" = 1; // REG_DWORD
    "ImageProcessingResizeGrowth" = 200;
    "MsaaQualityMode" = 2;
    "SceneVisualCutoffCountOfConsecutiveIncidentsAllowed" = 5;
    "SceneVisualCutoffThresholdInMS" = 1000;

    "ForceNonPrimaryDisplayAdapter" = 0; // REG_DWORD
    "ImageProcessingResizeThreshold" = 0; // scaled /100

"HKLM\\SOFTWARE\\Microsoft\\Windows\\Dwm\\GpuAccelInkTiming";
    "ExtensionTimeMicroseconds" = 1000;
    "PeriodicFenceMinDifferenceMicroseconds" = 500;
    "RefreshRatePercentage" = 10;
```

## RegistryMachine_* Keys

### win32kfull

Since some values above are from `win32kfull.sys` I'll add that here. Looking at xrefs of these names is sometimes a start point when trying to find values within a binary, therefore I'm adding it (note that `aRegistryMachin_*` are IDA generated names so you won't find them in strings, nor will they be the exact same for you unless you disassemble the same binary build version).

```c
// win32kfull.sys
aRegistryMachin = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\PnP"
aRegistryMachin_1 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
aRegistryMachin_2 = "\\Registry\\Machine\\software\\microsoft\\Windows NT\\CurrentVersion\\Windows"
aRegistryMachin_3 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\EAS\\Policies"
aRegistryMachin_4 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\FontLink\\SystemLink"
aRegistryMachin_5 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\TabletPC"
aRegistryMachin_6 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Fonts"
aRegistryMachin_7 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\FontDPI"
aRegistryMachin_8 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Type 1 Installer\\Type 1 Fonts"
aRegistryMachin_9 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows"
aRegistryMachin_10 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Gre_Initialize\\SmallFont"
aRegistryMachin_11 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\DWM"
aRegistryMachin_12 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Nls\\CodePage"
aRegistryMachin_13 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Gre_Initialize"
aRegistryMachin_14 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\AutoRotation"
aRegistryMachin_15 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\FontLink\\"
aRegistryMachin_17 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\UIPI\\Clipboard\\ExceptionFormats"
aRegistryMachin_18 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Gre_Initialize\\LargeFont"
aRegistryMachin_19 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\UIPI\\Clipboard\\IntegrityLevelDef"
aRegistryMachin_20 = "\\Registry\\Machine\\System\\CurrentControlSet\\Hardware Profiles"
aRegistryMachin_22 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\TabletPC\\UserLinearityData"
aRegistryMachin_23 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\AutoRotation\\NonPreserve"
aRegistryMachin_24 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Setup\\DPI"
aRegistryMachin_25 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Edgy"
aRegistryMachin_26 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\FontMapper\\FamilyDefaults"
aRegistryMachin_27 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\TabletPC\\LinearityData"
```

### win32kbase

Added for documentational purposes and future references.

```c
// win32kbase.sys
aRegistryMachin = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\DefaultPressure"
aRegistryMachin_0 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\PrecisionTouchPad\\LegacyDevices"
aRegistryMachin_1 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Terminal Server\\Video\\"
aRegistryMachin_2 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control"
aRegistryMachin_3 = "\\Registry\\Machine\\SYSTEM\\INPUT"
aRegistryMachin_4 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\PrecisionTouchPad\\LegacyControlled"
aRegistryMachin_5 = "\\Registry\\Machine\\Hardware\\DeviceMap\\Video"
aRegistryMachin_6 = "\\Registry\\Machine\\"
aRegistryMachin_7 = "\\Registry\\Machine\\Software\\Wow6432Node\\Microsoft\\Windows\\Tablet PC"
aRegistryMachin_8 = "\\Registry\\Machine\\OSDATA\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\CIT"
aRegistryMachin_9 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\PrecisionTouchPad\\IgnoredExternalMice"
aRegistryMachin_10 = "\\REGISTRY\\MACHINE\\SOFTWARE\\MICROSOFT\\WINDOWS NT\\CURRENTVERSION\\WINDOWS"
aRegistryMachin_11 = "\\REGISTRY\\Machine\\System\\CurrentControlSet\\Services\\TSDDD\\Device0"
aRegistryMachin_12 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows"
aRegistryMachin_13 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\DWM"
aRegistryMachin_14 = "\\Registry\\Machine\\System\\Setup"
aRegistryMachin_15 = "\\Registry\\Machine\\Software\\Microsoft\\Wisp\\Pen\\Digimon"
aRegistryMachin_16 = "\\Registry\\Machine\\SYSTEM\\Setup"
aRegistryMachin_17 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Control Panel\\Theme"
aRegistryMachin_18 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\CIT"
aRegistryMachin_19 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Nls\\Language"
aRegistryMachin_20 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\GraphicsDrivers"
aRegistryMachin_21 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows\\Input\\DelayZonePalmRejection"
aRegistryMachin_22 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Setup\\State"
aRegistryMachin_23 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\Tablet PC"
aRegistryMachin_24 = "\\Registry\\Machine\\Software\\Microsoft\\Wisp\\ExcludedDEvices"
aRegistryMachin_26 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\InvalidDisplay"
aRegistryMachin_27 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\"
aRegistryMachin_28 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Setup\\DPI"
aRegistryMachin_29 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows\\Win32kWPP"
aRegistryMachin_30 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager"
aRegistryMachin_31 = "\\Registry\\Machine\\SOFTWARE\\Policies\\Microsoft\\Windows\\Control Panel\\Desktop"
aRegistryMachin_32 = "\\Registry\\Machine\\Software\\WowAA32Node\\Microsoft\\Windows\\Tablet PC"
aRegistryMachin_33 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Power"
```
