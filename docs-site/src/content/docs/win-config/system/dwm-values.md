---
title: 'DWM Values'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#dwm-values'
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
