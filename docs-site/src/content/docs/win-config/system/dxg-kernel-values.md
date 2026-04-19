---
title: 'DXG Kernel Values'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#dxg-kernel-values'
sidebar:
  order: 3
---

`dxgkrnl.sys` is Windows DirectX/WDDM graphics kernel driver that mediates between apps and the GPU to schedule work, manage graphics memory, present frames, and handle TDR hang recovery.

> https://github.com/nohuto/regkit/blob/main/records/Graphics-Drivers.txt

Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

## Registry Values Details

These are default values I found in `dxgkrnl.sys`, see [assets/dxg-values](https://github.com/nohuto/win-config/tree/main/system/assets/dxg-values) for pseudocode snippets I used / [records/Graphics-Drivers.txt](https://github.com/nohuto/regkit/blob/main/records/Graphics-Drivers.txt) for all values that get read on boot.

The `GraphicsDrivers\Scheduler` / `GraphicsDrivers\MemoryManager` values are from `dxgmms2.sys`, I used the drivers from 23H2/25H2 since they differ at some point. See [dxgmms2](https://github.com/nohuto/win-config/tree/main/system/assets/dxg-values/dxgmms2) for all used files.

> [!WARNING]
> Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"
    "MiracastForceDisable" = 2;
    "MiracastUseIhvDriver" = 2;

    "ContextNoPatchMode" = 0;
    "CreateGdiPrimaryOnSlaveGpu" = 0;
    "CrtcPhaseFrames" = 2;
    "DeadlockPulse" = 5000;
    "DeadlockPulseTolerance" = 500;
    "DeadlockTimeout" = 30000;
    "DisableBadDriverCheckForHwProtection" = 0; // REG_DWORD
    "DisableBoostedVSyncVirtualization" = 0; // REG_DWORD
    "DisableGdiContextGpuVa" = 0;
    "DisableIndependentVidPnVSync" = 0; // REG_DWORD
    "DisableMonitoredFenceGpuVa" = 0;
    "DisableMultiSourceMPOCheck" = 0;
    "DisableOverlays" = 0;
    "DisablePagingContextGpuVa" = 0;
    "DisableSecondaryIFlipSupport" = 0;
    "DriverManagesResidencyOverride" = 1;
    "DriverStoreCopyMode" = 1;
    "EnableBasicRenderGpuPv" = 0;
    "EnableDecodeMPO" = 1;
    "EnableFbrValidation" = 1;
    "EnableMultiPlaneOverlay3DDIs" = 0;
    "EnableOfferReclaimOnDriver" = 1;
    "EnablePanelFitterSupport" = 0;
    "EnableTimedCalls" = 0;
    "EnableWDDM23Synchronization" = 0;
    "Force32BitFences" = 0;
    "ForceDirectFlip" = 0;
    "ForceEnableDxgMms2" = 0;
    "ForceExplicitResidencyNotification" = 0; // REG_DWORD
    "ForceInitPagingProcessVaSpace" = 0;
    "ForceReplicateGdiContent" = 0;
    "ForceSecondaryIFlipSupport" = 0;
    "ForceSecondaryMPOSupport" = 0;
    "ForceSurpriseRemovalSupport" = 0;
    "ForceVariableRefresh" = 0;
    "GdiPhysicalAdapterIndex" = 0;
    "GpuPriorityChangeMode" = 1;
    "HighPriorityCompletionMode" = 1;
    "InitialPagingQueueFenceValue" = 7000;
    "IoMmuFlags" = 0;
    "KnownProcessBoostMode" = 1;
    "LeanMemoryLimit" = ?; // REG_QWORD
    "NumVirtualFunctions" = 0;
    "SmallQuantumMode" = 1;

    "DefaultActiveIdleThreshold" = 2000;
    "DefaultD3TransitionIdleLongTimeThreshold" = 60000;
    "DefaultD3TransitionIdleShortTimeThreshold" = 10000;
    "DefaultD3TransitionIdleVeryLongTimeThreshold" = 60000;
    "DefaultD3TransitionLatencyActivelyUsed" = 80;
    "DefaultD3TransitionLatencyIdleLongTime" = 140000;
    "DefaultD3TransitionLatencyIdleMonitorOff" = 250000;
    "DefaultD3TransitionLatencyIdleNoContext" = 250000;
    "DefaultD3TransitionLatencyIdleShortTime" = 80000;
    "DefaultD3TransitionLatencyIdleVeryLongTime" = 200000;
    "DefaultExpectedResidency" = 2000;
    "DefaultIdleThresholdIdle0" = 200;
    "DefaultIdleThresholdIdle0MonitorOff" = 100;
    "DefaultLatencyToleranceIdle0" = 80;
    "DefaultLatencyToleranceIdle0MonitorOff" = 2000;
    "DefaultLatencyToleranceIdle1" = 15000;
    "DefaultLatencyToleranceIdle1MonitorOff" = 50000;
    "DefaultLatencyToleranceMemory" = 15000;
    "DefaultLatencyToleranceMemoryNoContext" = 30000;
    "DefaultLatencyToleranceNoContext" = 35000;
    "DefaultLatencyToleranceNoContextMonitorOff" = 100000;
    "DefaultLatencyToleranceOther" = -1;
    "DefaultLatencyToleranceTimerPeriod" = 200;
    "DefaultMemoryRefreshLatencyToleranceActivelyUsed" = 80;
    "DefaultMemoryRefreshLatencyToleranceIdleShortTime" = 15000;
    "DefaultMemoryRefreshLatencyToleranceMonitorOff" = 80000;
    "DefaultMemoryRefreshLatencyToleranceNoContext" = 30000;
    "DefaultPowerNotRequiredTimeout" = 25000;
    "DisableDevicePowerRequired" = 0;
    "DisablePStateManagement" = 0;
    "EnablePODebounce" = 0;
    "EnableRuntimePowerManagement" = 1;
    "lowdebounce" = 3;
    "MonitorLatencyTolerance" = 300000;
    "MonitorRefreshLatencyTolerance" = 17000;
    "uglitch" = 900;
    "uhigh" = 700;
    "uideal" = 500;
    "ulow" = 300;

    "AllowAdvancedEtwLogging" = 0;
    "DiagnosticsBufferExpansionTime" = 300;
    "EnableFuzzing" = 0;
    "EnableHMDTestMode" = 0;
    "EnableIgnoreWin32ProcessStatus" = 0;
    "ExternalDiagnosticsBufferMultiplier" = 1;
    "ExternalDiagnosticsBufferSize" = 16384;
    "ForceUsb4MonitorSupport" = 0;
    "InternalDiagnosticsBufferMultiplier" = 2;
    "InternalDiagnosticsBufferSize" = 65536;
    "InvestigationDebugParameter" = 0;
    "MaximumAdapterCount" = 32;
    "NodeUsageTelemetryTimerInterval" = ?; // REG_DWORD
    "PreserveFirmwareMode" = 0;
    "PreventFullscreenWireFormatChange" = 0;
    "RapidHpdMaxChainInMilliseconds" = 0;
    "RapidHpdTimeoutInMilliseconds" = 0;
    "TerminationListSizeLimit" = 67108864;
    "TreatUsb4MonitorAsNormal" = 0;
    "Usb4MonitorDpcdDP_IN_Adapter_Number" = 0;
    "Usb4MonitorDpcdUSB4_Driver_ID" = 0;
    "Usb4MonitorPowerOnDelayInSeconds" = 0;
    "Usb4MonitorTargetId" = 0;
    "ValidateWDDMCaps" = 0;
    "WDDM2LockManagement" = 1;

    "DisableVaBackedVm" = 0;
    "DisableVersionMismatchCheck" = 0;
    "GpuVirtualizationFlags" = ?; // REG_DWORD
    "LimitNumberOfVfs" = 0;
    "VirtualGpuOnly" = 0;

    "ForceBddFallbackOnly" = ?;
    "HwSchMode" = ?;
    "HwSchOverrideBlockList" = ?;
    "HwSchTreatExperimentalAsStable" = ?;
    "MiracastDefaultRtspPort" = ?;
    "PlatformSupportMiracast" = ?;
    "SupportMultipleIntegratedDisplays" = ?;
    "SuspendAdapterTimerPeriod" = ?;

    "EnableExperimentalRefreshRates" = 0;
    "RapidHPDThresholdCount" = 5;
    "RapidHPDTime" = 1000;

    "TdrDdiDelay" = 5;
    "TdrDebugMode" = 2;
    "TdrDelay" = 2;
    "TdrDodPresentDelay" = 2;
    "TdrDodVSyncDelay" = 2;
    "TdrLevel" = 3;
    "TdrLimitCount" = 5;
    "TdrLimitTime" = 60;

    "DRTTestEnable" = 0; // 1484026436 = Enabled ?
    "EnableAcmSupportDeveloperPreview" = 0;
    "ForceEnableDWMClone" = ?; // REG_DWORD, default is adapter capability flag
    "HybridInternalPanelOverrideEnable" = 0;
    "IsInternalRelease" = 0;
    "MultiMonSupport" = 1;
    "OutputDuplicationSessionApplicationLimit" = 4;
    "TdrTestMode" = 0;
    "UnsupportedMonitorModesAllowed" = ?;

    "PageFaultDebugMode" = 1; // REG_DWORD, missing/invalid or >1 -> 1

    // from procmon boot trace
    "DisableCABC" = ?;
    "ForceAccessedPhysically" = ?;
    "ForceToMapGpuVa" = ?;
    "WarpOverrideWDDMVersion" = ?;
    "WarpSupportHybridDiscrete" = ?;
    "WarpSupportsResourceResidency" = ?;

    // miscellaneous
    "CddBootImageMode" = ?;
    "CddBootScreenMode" = ?;
    "DisableLddmSpriteTearDown" = ?;
    "DisplayBrokerShouldNotBeActive" = ?;
    "DODPreferredPresentMoveRegeionsOverride" = ?;
    "DxgKrnlVersion" = ?;
    "MinDxgKrnlVersion" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Scheduler";
    "AdjustWorkerThreadPriority" = 1; // REG_DWORD
    "AudioDgAutoBoostPriority" = 24; // REG_DWORD, found in 25H2 (not in 23H2)
    "AutoSyncToCPUPriority" = 0; // REG_DWORD
    "BackgroundProcessMaximumAllowedPreemptionDelay" = 8; // REG_DWORD
    "CarryOverUsedQuantum" = 0; // REG_DWORD
    "ContextSchedulingPenaltyDelay" = 1000; // REG_DWORD
    "CountFlipTowardHwLimit" = 0; // REG_DWORD
    "CountPresentTowardHwLimit" = 0; // REG_DWORD
    "DdiSuspendMode" = 0; // REG_DWORD, values 0-2, found in 23H2 (not in 25H2)
    "DebugLargeSmoothenedDuration" = 1; // REG_DWORD, found in 25H2 (not in 23H2)
    "EnableContextDelay" = 1; // REG_DWORD, found in 23H2 (not in 25H2)
    "EnableDirectSubmission" = ?; // REG_DWORD, found in 25H2 (not in 23H2), default from adapter cap
    "EnableFlipImmediateSwFlipQueue" = 1; // REG_DWORD, found in 23H2 (not in 25H2)
    "EnablePreemption" = 1; // REG_DWORD
    "FlipDoNotFlipMode" = 0; // REG_DWORD, values 0-2
    "FlipOverrideMode" = 0; // REG_DWORD, 1 or 2 override device mode
    "ForceEnableFlipFenceModel" = 0; // REG_DWORD
    "ForceFlipTrueImmediateMode" = 0; // REG_DWORD, values 0-2
    "ForegroundPriorityBoost" = 1; // REG_DWORD
    "FrameServerAutoBoostPriority" = 17; // REG_DWORD, found in 25H2 (not in 23H2)
    "HistoryLogSize" = 64; // REG_DWORD, clamped 16-0x10000, must be 16, 32, 64, 128, ... (doubling sequence)
    "HwQueuedRenderPacketGroupLimit" = 2; // REG_DWORD
    "HwQueuePacketCap" = ?; // REG_DWORD, default from adapter cap, clamped 1-14
    "HwSchThreadOffloadMode" = 2; // REG_DWORD, found in 25H2 (not in 23H2)
    "InitDriverFenceId" = 0; // REG_DWORD
    "LogDriverVSyncCallback" = 0; // REG_DWORD, found in 23H2 (not in 25H2)
    "MaxFocusGpuQuantumWithoutPresent" = 100; // REG_DWORD, 25H2 default 10 when flag set
    "MaximumAllowedPreemptionDelay" = 900; // REG_DWORD
    "MaxYieldInterval" = 16; // REG_DWORD
    "MinYieldInterval" = 8000; // REG_DWORD, found in 25H2 (not in 23H2)
    "NpuContextSwitchQuantum" = 30000; // REG_DWORD, found in 25H2 (not in 23H2)
    "NpuPreemptionQuantum" = 60000; // REG_DWORD, found in 25H2 (not in 23H2)
    "NumberOfDmaPacketPool" = 20; // REG_DWORD
    "PerSourceCustomDuration" = ?; // REG_DWORD, default 1 when adapter version >= 2000
    "PfnCpuOverride" = 0; // REG_DWORD, values 0-3
    "PreemptionQuantumUnit" = 50000; // REG_DWORD
    "ProfileLevel" = 2; // REG_DWORD
    "QuantumUnit" = 25000; // REG_DWORD
    "QueuedPresentLimit" = 3; // REG_DWORD
    "VSyncIdleTimeout" = 7; // REG_DWORD, becomes 1 when adapter version >= 1300 and flag set, <1300 min 4
    "YieldPercentage" = 10; // REG_DWORD, valid 1-0x53 else default 10

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\MemoryManager";
    // ReadConfiguration
    "BugcheckOnApertureCorruption" = 0; // REG_DWORD
    "CommitProcessHeapOnDemand" = 1; // REG_DWORD
    "DirectFlipMemoryRequirement" = 200; // REG_DWORD
    "DisablePrefetching" = 0; // REG_DWORD
    "DmaBufferBytesLimitAllDevices" = 0x800000; // REG_DWORD, 0x2000000 if system memory > 0x20000000
    "DmaBufferListBytesLimitAllDevices" = 0x400000; // REG_DWORD, 0x1000000 if system memory > 0x20000000
    "EventThrottleThreshold" = 300; // REG_DWORD
    "EvictTemporaryPeriod" = 60; // REG_DWORD
    "EvictUnusedPeriod" = 60; // REG_DWORD
    "ExcessiveMemTransferFlipThreshold" = 15; // REG_DWORD
    "ExcessiveMemTransferPenalty" = 5; // REG_DWORD
    "MaxSegmentSize<0-31>" = 0; // REG_DWORD, if set, aligns to 4K and clamps to 0x800000
    "MemTransferThreshold" = 10; // REG_DWORD
    "NbCddDmaBufferLimitPerDevice" = 4; // REG_DWORD
    "NbDmaBufferLimitCompareWatermark" = 10; // REG_DWORD
    "NbDmaBufferLimitPerDevice" = 256; // REG_DWORD, 1024 if system memory > 0x20000000
    "NbPagingHistoryRecords" = 0; // REG_DWORD, 0x40 if internal release
    "PagesHistory" = 0; // REG_DWORD, max 0x7FFFFFF
    "PinDWMAllocationBackingStore" = 1; // REG_DWORD
    "PinnedApertureMemoryLimit" = 40; // REG_DWORD, >= 0x5A -> default 40
    "PinnedMemoryLimit" = 25; // REG_DWORD, >= 0x5A -> default 25
    "PrivateHeapPackingBlockSize" = 0x800000; // REG_DWORD
    "PrivateHeapPackingThreshold" = 0x100000; // REG_DWORD
    "ProcessPendingOfferPeriod" = 1; // REG_DWORD
    "ProcessSysmemOfferPeriod" = 8; // REG_DWORD
    "QuickApertureCorruptionCheck" = 0; // REG_DWORD
    "RemovePagesFromWorkingSetOnPagingForDwm" = 1; // REG_DWORD
    "SegmentBalancingPolicy" = 2; // REG_DWORD
    "SegmentCleanupCountThreshold" = 6; // REG_DWORD
    "SegmentCleanupSizeThreshold" = 4096; // REG_DWORD
    "SegmentCleanupTime" = 20; // REG_DWORD
    "SelfRefreshVramForceEvictionTimer" = 900; // REG_DWORD
    "UseUnreset" = 1; // REG_DWORD

    // unsure about the decomp defaults here
    "PhysicalHeapHighestAddress" = ?; // REG_QWORD
    "PhysicalHeapLowestAddress" = ?; // REG_QWORD
    "PhysicalHeapSize" = ?; // REG_QWORD

    // ReadCommitLimitInformation
    "MinimumSystemMemoryCommitLimit" = 0; // REG_DWORD, MB (<< 20), min 0x4000000
    "PinnedBackingStoreLimit" = 0; // REG_DWORD, MB (<< 20), 0 -> system memory / 8
    "SecondaryPartitionCommitLimitPercentage" = 80; // REG_DWORD, clamped to 5-100
    "SmallSystemMemorySize" = 0; // REG_DWORD, MB (<< 20)
    "SystemPartitionCommitLimitPercentage" = 50; // REG_DWORD, clamped to 5-100

    // ReadWorkingSetConfiguration
    "WorkingSet.DefaultMaximumPercentile" = 90; // REG_DWORD
    "WorkingSet.DefaultMinimumPercentile" = 65; // REG_DWORD

    // ReadUnusedAllocationConfiguration
    "Unused.EvictApertureOfferHighThreshold" = 30; // REG_DWORD
    "Unused.EvictApertureOfferLowThreshold" = 15; // REG_DWORD
    "Unused.EvictApertureOfferMaximumThreshold" = 30; // REG_DWORD
    "Unused.EvictApertureOfferNormalThreshold" = 15; // REG_DWORD
    "Unused.HighThreshold" = 120; // REG_DWORD
    "Unused.LowThreshold" = 15; // REG_DWORD
    "Unused.MaximumThreshold" = 1000000; // REG_DWORD
    "Unused.MinimumThreshold" = 0; // REG_DWORD
    "Unused.NormalThreshold" = 45; // REG_DWORD
    "Unused.SelfTrimHighThreshold" = 5; // REG_DWORD
    "Unused.SelfTrimLowThreshold" = 1; // REG_DWORD
    "Unused.SelfTrimMaximumThreshold" = 1000000; // REG_DWORD
    "Unused.SelfTrimMinimumThreshold" = 0; // REG_DWORD
    "Unused.SelfTrimNormalThreshold" = 2; // REG_DWORD
    "UnusedTrimmingPeriod" = 1; // REG_DWORD

    // ReadPreparationPeriodConfiguration
    "Period.AlwaysForceMemReset" = 1; // REG_DWORD
    "Period.EvictionThresholdForMemReset" = 32; // REG_DWORD, post query << 20
    "Period.MaximumPolicyHeldPeriod" = 64; // REG_DWORD
    "Period.MinimumPolicyHeldPeriod" = 4; // REG_DWORD
    "Period.NbOfAllocationsThresholdToMRU" = 0x7FFFFFFF; // REG_DWORD
    "PreparationPeriod" = 1; // REG_DWORD, scaled to 100ns

    // ReadHeapConfiguration
    "DebouncedDecommitAge" = 15; // REG_DWORD
    "DebouncedPageManagement" = 1; // REG_DWORD
    "DebouncedUnlockAge" = 15; // REG_DWORD
    "LeanRecycleHeapPackingBlockSize" = 8; // REG_DWORD
    "LeanRecycleHeapPackingThreshold" = 4; // REG_DWORD
    "LeanRecycleHeapPTDBlockSize" = 64; // REG_DWORD
    "MaximumDecommitDebounce" = 256; // REG_DWORD, 64 if system memory <= 0x53333333
    "MaximumUnlockDebounce" = 256; // REG_DWORD, 64 if system memory <= 0x53333333
    "RecycleHeapPackingBlockSize" = 32; // REG_DWORD
    "RecycleHeapPackingThreshold" = 4; // REG_DWORD
    "RecycleHeapPTDBlockSize" = 1024; // REG_DWORD
    "RecycleHistory" = 0; // REG_DWORD
    "RecycleHistorySize" = 64; // REG_DWORD
    "ZeroedRecyclePages" = 1; // REG_DWORD
    "ZeroPageLockThreshold" = 0x200000; // REG_DWORD, found in 25H2 (not in 23H2)

    // ReadPowerConfiguration
    "MemoryComponentActiveThreshold" = 300; // REG_DWORD, MB (<< 20)
    "SelfRefreshMemoryEvictionThreshold" = 300; // REG_DWORD, MB (<< 20)

    // ReadGpuVaConfiguration
    "AllocateGpuVaFromHighAddresses" = 0; // REG_DWORD
    "CompanionContextMaxPendingOperations" = 128; // REG_DWORD, found in 25H2 (not in 23H2)
    "DisableMakeIoMmuAddressValid" = 0; // REG_DWORD
    "DisableUncommitGpuVaInPagingProcess" = 0; // REG_DWORD
    "EnableGpuVaGuardPages" = 0; // REG_DWORD
    "EnableZeroFlagInPde" = 0; // REG_DWORD
    "GpuVaFirstValidAddress" = 0x10000; // REG_DWORD, masked to 4K
    "PagingProcessVaSpaceBitCount" = 30; // REG_DWORD

    // ReadGpuVaPagingHistoryConfiguration
    "GpuVaPagingHistoryMask" = 391174; // REG_DWORD, derived, min 0x1000
    "GpuVaPagingHistorySize" = ?; // REG_DWORD, default 0x40 if system memory > 0x53333333 else 0

    // ReadPagingConfiguration
    "BreakOnPagingFailure" = 0; // REG_DWORD
    "DemotionWithinDeviceEnabled" = 1; // REG_DWORD
    "DeviceResumePeriodMax" = 1000; // REG_DWORD
    "DeviceResumePeriodMin" = 1000; // REG_DWORD
    "DeviceSuspendPeriodMax" = 500; // REG_DWORD
    "DeviceSuspendPeriodMin" = 500; // REG_DWORD
    "EnableAsyncResidency" = 1; // REG_DWORD
    "EnablePromotion" = 1; // REG_DWORD, found in 25H2 (not in 23H2)
    "ForceSynchronousEvict" = 0; // REG_DWORD
    "ForceUncommitGpuVAOnEvict" = 0; // REG_DWORD
    "InitialPromotionInterval" = 48; // REG_DWORD
    "MaximumPromotionInterval" = 5000; // REG_DWORD
    "PagingQueueProcessingPeriodTime" = 50; // REG_DWORD, clamped 16-300
    "PromotionNumberCapPerInterval" = 50; // REG_DWORD
    "PromotionTargetSizePerInterval" = 0x2000000; // REG_QWORD
    "TemporaryResourcePolicy" = 0; // REG_DWORD, found in 25H2 (not in 23H2)
    "TransferFlushThreshold" = 1; // REG_DWORD, MB (<< 20)

    // ReadTestAndStagingConfiguration
    "AlwaysDecommitOnOffer" = 0; // REG_DWORD
    "BudgetThreshold" = 25; // REG_DWORD, clamped to <= 100
    "DecommitRepurposeMode" = 1; // REG_DWORD, values 0-2 else 0, found in 23H2 (not in 25H2)
    "DxgMms2OfferReclaim" = 4294967295; // REG_DWORD, allowed 0/1/2/4294967295, others = 0
    "ExpandTo64KBAllocationSizeThreshold" = 0x400000; // REG_DWORD
    "LargifyUpgradeThresholdBytes" = 0; // REG_DWORD, found in 25H2 (not in 23H2)
    "LargifyUpgradeThresholdPercent" = 0; // REG_DWORD, found in 25H2 (not in 23H2)
    "LazyDecommitChunkSizeMB" = 32; // REG_DWORD, max 512
    "PagingQueueFenceIncrement" = 1; // REG_DWORD, 0 = 1, upper bound 0x51EB851
    "RestrictToPreferredSegment" = 0; // REG_DWORD
    "Use64KPages" = 0; // REG_DWORD

    // ReadVPRConfiguration
    "VPRCapacityRatioDenominator" = 5; // REG_DWORD, if denominator <= numerator or numerator == 0 -> 4/5
    "VPRCapacityRatioNumerator" = 1; // REG_DWORD
    "VPRGrowRatioDenominator" = 5; // REG_DWORD, if denominator <= numerator or numerator == 0 -> 4/5
    "VPRGrowRatioNumerator" = 4; // REG_DWORD

    // ReadBudgetConfiguration
    "CriticalPeriodicTrimThreshold" = 10; // REG_DWORD
    "EnableTrimWnfCallback" = 1; // REG_DWORD
    "ForegroundTrimInterval" = 90000; // REG_DWORD
    "GlobalCommitmentBudget" = 0; // REG_QWORD
    "IdleTrimInterval" = 90000; // REG_DWORD
    "L_LocalMemoryBudgetDWMTarget" = 30; // REG_DWORD
    "L_LocalMemoryBudgetFocusTarget" = 50; // REG_DWORD
    "LNL_LocalMemoryBudgetDWMTarget" = 30; // REG_DWORD
    "LNL_LocalMemoryBudgetFocusTarget" = 50; // REG_DWORD
    "LNL_NonLocalMemoryBudgetDWMTarget" = 30; // REG_DWORD
    "LNL_NonLocalMemoryBudgetFocusTarget" = 50; // REG_DWORD
    "MaximumTrimInterval" = 10000; // REG_DWORD
    "MaxProcessBudgetCapBuffer" = 256; // REG_DWORD
    "MaxVideoMemoryFragmentationBuffer" = 512; // REG_DWORD
    "MinimumTrimInterval" = 2000; // REG_DWORD
    "ProcessBudgetCapBuffer" = 5; // REG_DWORD
    "StartPeriodicTrimThreshold" = 40; // REG_DWORD
    "SystemMemoryFragmentationBuffer" = 5; // REG_DWORD
    "VideoMemoryFragmentationBuffer" = 10; // REG_DWORD

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Power";
    "UseSelfRefreshVRAMInS3" = 1;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\BasicDisplay";
    "BasicDisplayUserNotified" = 0;

    "DisableBasicDisplayFallback" = ?;
    "EnableBasicDisplayFallback" = ?;
    "ForcePreserveBootDisplay" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Smm";
    "DebugMode" = 0;
    "EnablePageTracking" = 0;
    "ForceDmaRemapping" = 0;
    "ForceEnableIommu" = 0;
    "IdentityMappedPassthrough" = 0;
    "LogicalAddressMode" = 0;
    "PreferHighLogicalAddresses" = 0;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\DMM";
    "AssertOnDdiViolation" = 0;
    "BadMonitorModeDiag" = 2;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\DMM";
    "EnableVirtualRefreshRateOnExternalMonitor" = 0;
    "HPDFilterLimit" = 20000000;
    "LongLinkTrainingTimeout" = 1000;
    "ModeListCaching" = 1;
    "SetTimingsFlags" = 0;
    "ShortLinkTrainingTimeout" = 200;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Validation";
    "FailEscapeDDI" = 0;
    "FailRenderDDI" = 0;
    "FailReserveGPUVA" = 0;
    "Level" = 0;
    "ReportVirtualMachine" = 0;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\MonitorDataStore\\MONITOR-ID"
    "AdvancedColorEnabled" = 0;
    "AutoColorManagementEnabled" = 0;
    "AutoColorManagementSupported" = ?; // REG_DWORD, bool?
    "DockedOrientation" = ?;
    "EnableBoostRefreshRateByDefault" = ?;
    "EnableIntegratedPanelAcmByDefault" = 0;
    "EnableIntegratedPanelHdrByDefault" = 0;
    "HDREnabled" = 0;
    "MicrosoftApprovedAcmSupport" = 0;
    "MonitorOrientation" = ?;
    "OverrideWCGCapabilities" = ?;
    "PreferredScaleFactor" = ?;
    "SDRWhiteLevel" = ?;
    "VMSDisabled" = ?;

// the 3 keys below are based on a testing system monitor, therefore the defaults will be different for you

"HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\Configuration"; // from LGPE
    "DefaultCloneResolutionSetting" = 0; // range 0 (default), 1 (internal), 2 (external), "Set Cloned Monitor Preferred Resolution Source", "Enabling this policy allows to override the default behavior when connecting an additional monitor. It allows control over whether a cloned display prioritizes the internal or external monitor i.e. setting its preferred resolution source. Internal sets the resolution of the main display as the source on both screens. External sets the resolution of the connected (external) display as the source on both screens. Default uses the system's default behavior determined by Windows Settings." This policy is supported on 24H2+

"HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\Configuration\\<CONFIG_ID>";
    "SetId" = ?; // REG_SZ
    "Timestamp" = ?; // REG_QWORD

"HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\Configuration\\<CONFIG_ID>\\00\\00";
    "ActiveSize.cx" = ?; // REG_DWORD, horizontal pixels
    "ActiveSize.cy" = ?; // REG_DWORD, vertical lines
    "BoostRefreshRateMultiplier" = ?; // REG_DWORD
    "ColorBasis" = ?; // REG_DWORD
    "DwmClipBox.bottom" = ?; // REG_DWORD
    "DwmClipBox.left" = ?; // REG_DWORD
    "DwmClipBox.right" = ?; // REG_DWORD
    "DwmClipBox.top" = ?; // REG_DWORD
    "Flags" = ?; // REG_DWORD
    "HSyncFreq.Denominator" = ?; // REG_DWORD
    "HSyncFreq.Numerator" = ?; // REG_DWORD
    "PixelFormat" = ?; // REG_DWORD
    "PixelRate" = ?; // REG_DWORD
    "PrimSurfSize.cx" = ?; // REG_DWORD
    "PrimSurfSize.cy" = ?; // REG_DWORD
    "Rotation" = ?; // REG_DWORD
    "Scaling" = ?; // REG_DWORD
    "ScanlineOrdering" = ?; // REG_DWORD
    "Stride" = ?; // REG_DWORD
    "VideoStandard" = ?; // REG_DWORD
    "VirtualRefreshRate.Denominator" = ?; // REG_DWORD
    "VirtualRefreshRate.Numerator" = ?; // REG_DWORD
    "VSyncFreq.Denominator" = ?; // REG_DWORD
    "VSyncFreq.Numerator" = ?; // REG_DWORD, refresh rate

"HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers\\Configuration\\<CONFIG_ID>\\00";
    "CcdDbVersion" = ?; // REG_DWORD
    "ColorBasis" = ?; // REG_DWORD
    "PixelFormat" = ?; // REG_DWORD
    "Position.cx" = ?; // REG_DWORD
    "Position.cy" = ?; // REG_DWORD
    "PrimSurfSize.cx" = ?; // REG_DWORD
    "PrimSurfSize.cy" = ?; // REG_DWORD
    "Stride" = ?; // REG_DWORD
```
