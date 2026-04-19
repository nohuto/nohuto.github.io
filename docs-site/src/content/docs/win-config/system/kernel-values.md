---
title: 'Kernel Values'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#kernel-values'
sidebar:
  order: 2
---

Since many people don't yet know which values exist and what default value they have, here's a list. I used IDA, WinDbg, WinObjEx, Windows Internals E7 P1 to create it. Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

## Registry Values Details

This contains details on several `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\...` keys, not only the `Session Manager\\Kernel` key.

See [session-manager-symbols](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/session-manager-symbols.txt) for reference.
> [session-manager/assets | ProcLibGlobalInit.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/ProcLibGlobalInit.c)  
> [session-manager/assets | GetRegistryQwordValue.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/GetRegistryQwordValue.c)  
> [session-manager/assets | RtlpHpApplySegmentHeapConfigurations.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/RtlpHpApplySegmentHeapConfigurations.c)

The comments of some values with more details are based on pseudocode, if so I added the function name to the end of the comment. Search for the function name in [decompiled-pseudocode/tree/main/ntoskrnl](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl).

> [!WARNING]
> Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel";
    "AdjustDpcThreshold" = 20; // KiAdjustDpcThreshold, per CPU countdown value. When it reaches 1, it's reloaded and current DPC queue depth is incremented up to DpcQueueDepth ("number of clock ticks before DpcQueueDepth is incremented if DPCs are not pending") (KeAccumulateTicks, KiInitPrcb)
    "AlwaysTrackIoBoosting" = 0; // PspAlwaysTrackIoBoosting enabling forces IO-boost tracking part in PsBoostThreadIoEx
    "AmdTprLowerInterruptDelayConfig" = 0; // KiAmdTprLowerInterruptDelayConfig
    "BoostingPeriodMultiplier" = 3; // KiNormalPriorityBoostingPeriodMultiplier clamped to 1-20 and used as multiplier in 'NormalPriority AntiStarvation' scheduling paths (KiInitializeNormalPriorityAntiStarvationPolicies, KiPrepareReadyThreadForRescheduling, KiNormalPriorityReadyScan)
    "BugCheckUnexpectedInterrupts" = 0; // KiBugCheckUnexpectedInterrupts
    "CacheAwareScheduling" = 47; // KiCacheAwareScheduling
    "CacheErrataOverride" = 0; // KiTLBCOverride, value 1 and other nonzero values set MSR 0xC0011023 differently (KiInitializeCacheErrataSupport, KiInitMachineDependent, KiDisableCacheErrataSource, KeRestoreProcessorSpecificFeatures)
    "CacheIsoBitmap" = 0; // KiCacheIsoBitmap, if nonzero and "if ( _bittest64(&KeFeatureBits, 0x2Cu) )", value is written to MSR 0xC91 (KeInitializeCatRegisters)
    "DebuggerIsStallOwner" = 0; // KiDebuggerIsStallOwner (KiSetDebuggerOwner)
    "DebugPollInterval" = 2000; // KiDebugPollInterval, debugger enabled (KdDebuggerEnabled) timer path uses 10000 * value (KiGetNextTimerExpirationDueTime)
    "DefaultDynamicHeteroCpuPolicy" = 3; // KiDefaultDynamicHeteroCpuPolicy, behavior of Dynamic hetero policy All (0) (all available) Large (1) LargeOrIdle (2) Small (3) SmallOrIdle (4) Dynamic (5) (use priority and other metrics to decide) BiasedSmall (6) (use priority and other metrics, but prefer small) BiasedLarge (7).
    "DefaultHeteroCpuPolicy" = 5; // KiDefaultHeteroCpuPolicy
    "DeviceOwnerProtectionDowngradeAllowed" = 0; // SeDeviceOwnerProtectionDowngradeAllowed
    "DisableControlFlowGuardExportSuppression" = 0; // PspDisableControlFlowGuardExportSuppression
    "DisableExceptionChainValidation" = 2; // PspSehValidationPolicy
    "DisableLightWeightSuspend" = 0; // KiDisableLightWeightSuspend, nonzero blocks lightweight suspend part in KiSuspendThread and uses the APC path (KiSuspendThread)
    "DisableLowQosTimerResolution" = 1; // KeDisableLowQosTimerResolution, uses ExpUpdateTimerResolution for specific processes etc? (PspSetProcessTimerResolutionPolicy)
    "DisablePointerParameterAlignmentValidation" = 0; // KiDisablePointerParameterAlignmentValidation
    "DisableTsx" = 0; // KiDisableTsx
    "DpcCumulativeSoftTimeout" = 120000; // KeDpcCumulativeSoftTimeoutMs, range 2000-DpcWatchdogPeriod, gets multiplied by KeVerifierDpcScalingFactor (KiInitDpcThresholds, KiApplyDpcVerificationScaleSettings)
    "DpcQueueDepth" = 4; // KiMaximumDpcQueueDepth, "Number of DPCs queued before an interrupt will be sent even for Medium or below DPCs"
    "DpcSoftTimeout" = 20000; // KeDpcSoftTimeoutMs, range 20-DPCTimeout, gets multiplied by KeVerifierDpcScalingFactor (KiInitDpcThresholds, KiApplyDpcVerificationScaleSettings)
    "DPCTimeout" = 20000; // KeDpcTimeoutMs, data 1-19 = 20, "specific DPC execution time limit control" (KiInitDpcThresholds)
    "DpcWatchdogPeriod" = 120000; // KeDpcWatchdogPeriodMs
    "DpcWatchdogProfileBufferSizeBytes" = 266240; // KeDpcWatchdogProfileBufferSizeBytes
    "DpcWatchdogProfileCumulativeDpcThreshold" = 110000; // KeDpcWatchdogProfileCumulativeDpcThresholdMs
    "DpcWatchdogProfileOffset" = 10000; // KeDpcWatchdogProfileOffsetMs
    "DpcWatchdogProfileSingleDpcThreshold" = 18333; // KeDpcWatchdogProfileSingleDpcThresholdMs
    "DriveRemappingMitigation" = 1; // ObpDriveRemappingMitigation
    "DynamicHeteroCpuPolicyExpectedRuntime" = 5200; // KiDynamicHeteroCpuPolicyExpectedRuntime
    "DynamicHeteroCpuPolicyImportant" = 2; // (LargeOrIdle)
    // Policy for a dynamic thread that is deemed important.
    "DynamicHeteroCpuPolicyImportantPriority" = 8; // KiDynamicHeteroCpuPolicyImportantPriority
    // Priority above which threads are considered important if prioritybased dynamic policy is chosen.
    "DynamicHeteroCpuPolicyImportantShort" = 3; // (Small)
    // Policy for dynamic thread that is deemed important but run a short amount of time.
    "DynamicHeteroCpuPolicyMask" = 7; //  (foreground status = 1, priority = 2, expected run time = 4)
    // Determine what is considered in assessing whether a thread is important.
    "EnablePerCpuClockTickScheduling" = 0; // KiEnableClockTimerPerCpuTickScheduling
    "EnableTickAccumulationFromAccountingPeriods" = 0; // KiEnableTickAccumulationFromAccountingPeriods
    "EnableWerUserReporting" = 1; // DbgkEnableWerUserReporting
    "ForceBugcheckForDpcWatchdog" = 0; // KiForceBugcheckForDpcWatchdog
    "ForceForegroundBoostDecay" = 0; // KiSchedulerForegroundBoostDecayPolicy
    "ForceIdleGracePeriod" = 5; // KiForceIdleGracePeriodInSec
    "ForceParkingRequested" = 1; // KiForceParkingConfiguration
    "GlobalTimerResolutionRequests" = 0; // KiGlobalTimerResolutionRequests
    "HeteroFavoredCoreFallback" = 0; // PpmHeteroFavoredCoreFallback
    "HeteroSchedulerOptions" = 0; // KiHeteroSchedulerOptions
    "HeteroSchedulerOptionsMask" = 0; // KiHeteroSchedulerOptionsMask
    "HgsPlusFeedbackUpdateThresholdNetRuntime" = 20; // dword_140FC33C0
    "HgsPlusFeedbackUpdateThresholdRuntime" = 20; // dword_140FC33B4
    "HgsPlusHigherPerfClassFeedbackThreshold" = 1; // dword_140FC33E0
    "HgsPlusInvalidFeedbackDefaultClass" = 0; // dword_140FC33D4
    "HgsPlusInvalidFeedbackDefaultClassSet" = 0; // dword_140FC33D8
    "HgsPlusInvalidFeedbackLimit" = 50; // dword_140FC33D0
    "HgsPlusLowerPerfClassFeedbackThreshold" = 4; // dword_140FC33DC
    "HgsPlusMinimumScoreDifferenceForSwap" = 25; // dword_140FC33E8
    "HgsPlusThreadCreationDefaultClass" = 0; // dword_140FC33E4
    "HotpatchTestMode" = 0; // KeHotpatchTestMode
    "HyperStartDisabled" = 0; // HvlVpStartDisabled
    "IdealDpcRate" = 20; // KiIdealDpcRate
    "IdealNodeRandomized" = 1; // PspIdealNodeRandomized
    "InterruptSteeringFlags" = 0; // KiInterruptSteeringFlags
    "LongDpcQueueThreshold" = 3; // KiLongDpcQueueThreshold
    "LongDpcRuntimeThreshold" = 100; // KiLongDpcRuntimeThreshold
    "MaxDynamicTickDuration" = 8; // KiMaxDynamicTickDurationSize
    "MaximumCooperativeIdleSearchWidth" = 16; // KiMaximumCooperativeIdleSearchWidth
    "MaximumSharedReadyQueueSize" = 260; // KiMaximumSharedReadyQueueSize
    "MinimumDpcRate" = 3; // KiMinimumDpcRate
    "MitigationAuditOptions" = 0; // PspSystemMitigationAuditOptions
    "MitigationOptions" = 0; // PspSystemMitigationOptions
    "ObCaseInsensitive" = 1; // ObpCaseInsensitive
    "ObObjectSecurityInheritance" = 0; // ObpObjectSecurityInheritance
    "ObTracePermanent" = 0; // ObpTracePermanent
    "ObTracePoolTags" = 0; // ObpTracePoolTagsBuffer / ObpTracePoolTagsLength
    "ObTraceProcessName" = 0; // ObpTraceProcessNameBuffer / ObpTraceProcessNameLength
    "ObUnsecureGlobalNames" = 6619246; // ObpUnsecureGlobalNamesBuffer / ObpUnsecureGlobalNamesLength
    "PassiveWatchdogTimeout" = 300; // KiPassiveWatchdogTimeout
    "PerfIsoEnabled" = 0; // KiPerfIsoEnabled
    "PoCleanShutdownFlags" = 0; // PopShutdownCleanly
    "PowerOffFrozenProcessors" = 1; // KiPowerOffFrozenProcessors
    "ReadyTimeTicks" = 6; // KiNormalPriorityBoostReadyTimeTicks
    "RebalanceMinPriority" = 1; // KiRebalanceMinPriority
    "ReservedCpuSets" = 0; // KiReservedCpuSets
    "ScanLatencyTicks" = 7; // KiNormalPriorityBoostScanLatencyTicks
    "SchedulerAssistThreadFlagOverride" = 0; // KiSchedulerAssistThreadFlagOverride
    "SeAllowAllApplicationAceRemoval" = 0; // SepAllowAllApplicationAceRemoval
    "SeAllowSessionImpersonationCapability" = 0; // SepAllowSessionImpersonationCap
    "SeCompatFlags" = 0; // SeCompatFlags
    "SeLpacEnableWatsonReporting" = 0; // SeLpacEnableWatsonReporting
    "SeLpacEnableWatsonThrottling" = 1; // SeLpacEnableWatsonThrottling
    "SerializeTimerExpiration" = 1; // KiSerializeTimerExpiration
    // This behavior is controlled by the kernel variable KiSerializeTimerExpiration, which is initialized based on a registry setting whose value is different between a server and client installation. By modifying or creating the value SerializeTimerExpiration under HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\kernel other than 0 or 1, serialization can be disabled, enabling timers to be distributed among processors. Deleting the value, or keeping it as 0, allows the kernel to make the decision based on Modern Standby availability, and setting it to 1 permanently enables serialization even on non-Modern Standby systems.
    "SeTokenDoesNotTrackSessionObject" = 0; // SeTokenDoesNotTrackSessionObject
    "SeTokenLeakDiag" = 0; // SeTokenLeakTracking
    "SeTokenSingletonAttributesConfig" = 3; // SepTokenSingletonAttributesConfig
    "SplitLargeCaches" = 0; // KiSplitLargeCaches
    "ThreadDpcEnable" = 1; // KeThreadDpcEnable
    "ThreadReadyCount" = 1; // KiNormalPriorityBoostMaximumThreadReadyCount
    "TimerCheckFlags" = 1; // KeTimerCheckFlags
    "VerifierDpcScalingFactor" = 1; // KeVerifierDpcScalingFactor
    "VirtualHeteroHysteresis" = 4294967295; // PpmPerfQosTransitionHysteresisOverride
    "VpThreadSystemWorkPriority" = 30; // KiVpThreadSystemWorkPriority
    "WpsSimulationOverride" = 0; // PpmWpsSimulationOverride / PpmWpsSimulationOverrideSize
    "XStateContextLookasidePerProcMaxDepth" = 0; // KiXStateContextLookasidePerProcMaxDepth

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel\\RNG";
    "RNGAuxiliarySeed" = ; // ExpRNGAuxiliarySeed - REG_DWORD, default of 1807947291? ("HKLM\System\CurrentControlSet\Control\Session Manager\kernel\RNG\RNGAuxiliarySeed","Type: REG_DWORD, Data: 1807947291", procmon boot trace)

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager";
    "AlpcMessageLog" = 0; // AlpcpMessageLogEnabled 
    "AlpcWakePolicy" = 1; // AlpcpWakePolicyDefault 
    "CriticalSectionTimeout" = 2592000; // dword_140FC3204 dd 278D00
    "CWDIllegalInDLLSearch" = 0; // PspCurDirDevicesSkippedForDlls 
    "Debugger Retries" = 20; // KdpContext (0x14) 
    "DisableIFEOCaching" = 0; // RtlpDisableIFEOCaching 
    "GlobalFlag" = 0; // CmNtGlobalFlag <> 0x7061006c ?
    "GlobalFlag2" = 0; // CmNtGlobalFlag2 <> 0x6c642e30 ?
    "HeapDeCommitFreeBlockThreshold" = 4096; // qword_140FC3210 dq 1000
    "HeapDeCommitTotalFreeThreshold" = 65536; // qword_140FC3218 dq 10000
    "HeapSegmentCommit" = 8192; // qword_140FC3220 dq 2000
    "HeapSegmentReserve" = 1048576; // qword_140FC3228 dq 100000
    "ImageExecutionOptions" = 0; // ViImageExecutionOptions 
    "InitConsoleFlags" = 0; // InitConsoleFlags 
    "MultiUsersInSessionSupported" = 0; // RtlpMultiUsersInSessionSupported 
    "ObjectSecurityMode" = 1; // ObpObjectSecurityMode 
    "PowerPolicySimulate" = 0; // PopSimulate 
    "ProtectionMode" = 1; // ObpProtectionMode , DWORD
    "ResourceCheckFlags" = 3; // ExResourceCheckFlags 
    "ResourceEnforceOwnerTransfer" = 0; // ExpResourceEnforceOwnerTransfer 
    "ResourceTimeoutCount" = 45; // ExResourceTimeoutCount (0x2d) 
    "SkipRegistryInit" = 0; // CmNtSkipRegistryInit 

    // procmon boot trace
    "ObjectDirectories" = \Windows, \RPC Control; // ? - REG_MULTI_SZ
    "BootExecute" = ?; // REG_SZ
    "BootExecuteNoPnpSync" = ?;
    "PlatformExecute" = ?;
    "SetupExecute" = ?;
    "SetupExecuteNoPnpSync" = ?;
    "S0InitialCommand" = ?;
    "NumberOfInitialSessions" = 2; // ? - REG_DWORD
    "PendingFileRenameOperations" = ?;
    "PendingFileRenameOperations2" = ?;
    "AllowProtectedRenames" = ?;
    "ClearTempFiles" = ?;
    "TempFileDirectory" = ?;
    "ExcludeFromKnownDlls" = ?; // REG_MULTI_SZ
    "BackgroundLoadKnownDlls" = ?;
    "DisableWpbtExecution" = ?; // REG_DWORD
    "RaiseExceptionOnPossibleDeadlock" = ?;
    "ResourcePolicies" = ?;
    "SafeDllSearchMode" = ?;
    "SafeProcessSearchMode" = ?;
    "SmtDelayBaseYield" = ?;
    "SmtDelayMaxYield" = ?;
    "SmtDelaySleepLoopWindowSize" = ?;
    "SmtDelaySpinCountThreshold" = ?;
    "SmtFactorYield" = ?;
    "SystemUpdateOnBoot" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Quota System";
    "ApplicationBlockedMessageLimit" = 50; // PspJobNoWakeChargeLimit (0x32) 
    "JobTimeLimitsPeriodSeconds" = 7; // PspJobTimeLimitsPeriodSeconds 
    "SystemBlockedMessageLimit" = 200; // PspSystemNoWakeChargeLimit (0xC8) 

    "DfssGenerationLengthMS" = 600; // PsDfssGenerationLengthMS dd 258
    "DfssLongTermFraction1024" = 512; // sDfssLongTermFraction1024 dd 200
    "DfssLongTermSharingMS" = 15; // PsDfssLongTermSharingMS dd 0F
    "DfssResolutionMS" = 4294967295; // PsDfssDesiredTimerResolutionMs dd 0FFFFFFFF
    "DfssShortTermSharingMS" = 30; // PsDfssShortTermSharingMS dd 1E
    "EnableCpuQuota" = 0;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management";
    "AllocationPreference" = 0; // dword_140FC3200 dd 0
    "AllowUserHotPatchWithoutVbs" = 0; // dword_140FC3250 dd 0
    "CacheUnmapBehindLengthInMB" = 8388608; // CcUnmapBehindLength (0x00800000) 
    "CustomDTPDenominator" = 8; // CcClientDTPDenominator (0x8) 
    "DeadlockRecursionDepthLimit" = 0; // ViRecursionDepthLimitFromRegistry 
    "DeadlockSearchNodesLimit" = 0; // ViSearchedNodesLimitFromRegistry 
    "DifPluginConfigData" = 635710207; // DifPluginConfigData (0x25e8007f) 
    "DifPluginConfigDataLength" = 1276097421; // DifPluginConfigDataLength (0x4c084b8d) 
    "DisableCacheTelemetry" = 2; // CcDisableTelemetryRegKeyAtInit 
    "DisablePageCombining" = 0; // dword_140FC31E8 dd 0
    "DisablePagingExecutive" = 0; // dword_140FC31E4 dd 0
    "EnableAsyncLazywrite" = 2; // CcEnableAsyncLazywriteOverride 
    "EnableAsyncLazywriteMulti" = 2; // CcEnableAsyncLazywriteMultiOverride 
    "EnableCooling" = 0; // dword_140FC31F8 dd 0
    "EnablePerVolumeLazyWriter" = 2; // CcEnablePerVolumeLazyWriterOverride 
    "ForceValidateIo" = 0; // dword_140FC31F0 dd 0
    "HighMemoryThreshold" = 0; // qword_140FC3238 dq 0
    "KernelPadSectionsOverride" = 0; // dword_140FC3248 dd 0
    "LargeWriteSize" = 0; // CcAzure_LargeWriteSize 
    "LazyWriterPercentageOfNumProcs" = 0; // CcAzure_LazyWriterPercentageOfNumProcs 
    "LowMemoryThreshold" = 0; // qword_140FC3230 dq 0
    "MaxLazyWritePages" = 0; // CcMaxLazyWritePagesOverride 
    "MinimumStackCommitInBytes" = 0; // dword_140FC3208 dd 0
    "Mirroring" = 0; // dword_140FC31F4 dd 0
    "ModifiedWriteMaximum" = ?; // dword_140FC31FC
    "MoveImages" = 1; // MmRegistryState 
    "NonPagedPoolQuota" = 4294967295; // PspDefaultResourceLimits (4294967295) 
    "PagedPoolQuota" = ?; // unk_140FD7DE4
    "PageValidationAction" = 0; // MmPageValidationAction 
    "PageValidationFrequency" = 0; // MmPageValidationFrequency 
    "PagingFileQuota" = ?; // unk_140FD7DE8
    "PhysicalMemoryMapperEnforcementMode" = 0; // dword_140FC324C dd 0
    "PoolForceFullDecommit" = 0; // PoolForceFullDecommit 
    "PoolTag" = 0; // MmSpecialPoolTag 
    "PoolTagOverruns" = 1; // MmSpecialPoolCatchOverruns 
    "PoolTagSmallTableSize" = 4097; // PoolTrackTableSize (0x1001) 
    "ProtectNonPagedPool" = 0; // MmProtectFreedNonPagedPool 
    "RemoteFileDirtyPageThreshold" = 1310720; // CcRemoteFileDPInlineFlushThreshold (0x00140000) 
    "SimulateCommitSavings" = 0; // dword_140FC3240 dd 0
    "SoftThrottleDelayInMs" = 0; // CcAzure_SoftThrottleDelayInMs 
    "SoftThrottleLargeWriteAtPct" = 0; // CcAzure_SoftThrottleLargeWriteAtPct 
    "SpecialPurposeMemoryPages" = 0; // MmSpecialPurposeMemoryPages 
    "SpecialPurposeMemoryStartPage" = 0; // MmSpecialPurposeMemoryStartPage 
    "SpecialPurposeMemoryStartPageValueSize" = 4294967295; // MmSpecialPurposeMemoryStartPageValueSize (4294967295) 
    "TopBottomDPTEqual" = 0; // CcAzure_TopBottomDPTEqual 
    "TrackLockedPages" = 0; // MmTrackLockedPages 
    "TrackPtes" = 0; // dword_140FC31EC dd 0
    "VerifierDifPoolTags" = 0; // DifpPoolTags 
    "VerifierDifPoolTagsSizeBytes" = 4294967295; // DifpPoolTagsSizeBytes (4294967295) 
    "VerifierFaultApplications" = 0; // VerifierFaultApplicationsBuffer 
    "VerifierFaultApplicationsSize" = 4294967295; // VerifierFaultApplicationsBufferSize (4294967295) 
    "VerifierFaultBootMinutes" = 8; // VfFaultInjectionBootMinutes 
    "VerifierFaultProbability" = 600; // VfFaultInjectionProbability (0x258) 
    "VerifierFaultTags" = 0; // VerifierFaultTagsBuffer 
    "VerifierFaultTagsSize" = 4294967295; // VerifierFaultTagsBufferSize (4294967295) 
    "VerifierHandleTraces" = 16384; // VfHandleTracingEntries (0x4000) 
    "VerifierIrpStackTraces" = 16384; // IovIrpTracesLength (0x4000) 
    "VerifierIrpTimeout" = 0; // VfWdIrpTimeoutMsec 
    "VerifierNewRuleWorkaround" = 0; // VerifierNewRuleWorkaround 
    "VerifierOptions" = 0; // VfOptionFlags 
    "VerifierRandomTargets" = 0; // VfRandomVerifiedDrivers 
    "VerifierSettingState" = 0; // VfRuleClasses 
    "VerifierSettingStateSize" = 4294967295; // VfRuleClassesSize (4294967295) 
    "VerifierTipDisable" = 0; // VerifierTipDisable 
    "VerifierTipLimitDenominator" = 0; // DifiPluginControlDenominator 
    "VerifierTipLimitNumerator" = 0; // DifiPluginControlNumerator 
    "VerifierTipSparseness" = 0; // DifiPluginControlSparseness 
    "VerifierTriageContext" = 0; // VfTriageContext 
    "VerifyBTSBufferSize" = 0; // ViVerifyBTSBufferSize 
    "VerifyDriverLevel" = 4294967295; // MmVerifyDriverLevel (4294967295) 
    "VerifyDrivers" = 3905129288; // MmVerifyDriverBuffer (0xE8C38B48) 
    "VerifyDriversLength" = 1207968387; // MmVerifyDriverBufferLength (0x48002283) 
    "VerifyDriversSuppress" = 276138824; // VfXdvSuppressDriversBuffer (0x10758b48) 
    "VerifyDriversSuppressLength" = 3482011648; // VfXdvSuppressDriversBufferLength (0xCF8B4800) 
    "VerifyMode" = 4; // VfVerifyMode 
    "VerifyTriage" = 4294967295; // ViVerifyTriage (4294967295) 
    "VerifyTriageRules" = 0; // ViVerifyTriageRules 
    "VerifyTriageRulesSize" = 4294967295; // ViVerifyTriageRulesSize (4294967295) 
    "VmPauseOutswapSizeCapMB" = 512; // VmPauseOutswapSizeCapMB (0x200) 
    "WorkingSetPagesQuota" = ?; // unk_140FD7DEC
    "WorkingSetSwapSharedPages" = 0; // PspOutSwapSharedPages 
    "XdvTipTag" = 0; // CarTipTag 
    "XdvVerifierOptions" = 0; // CarXdvOptions 
    "XdvVerifierOptions" = 0; // VfFlightOptions

    // procmon boot trace
    "PagingFiles" = C:\pagefile.sys <int> <int> // REG_MULTI_SZ
    "PagefileOnOsVolume" = ?; // 4,094
    "WaitForPagingFiles" = ?; // 4,094
    "ExistingPageFiles" = \??\C:\pagefile.sys; // REG_MULTI_SZ
    "DisableDedicatedMemoryCaching" = ?;
    "DedicatedMemoryPagefileSizeMB" = ?
    "PagefileHybridPriority" = ?;
    "SwapfileControl" = ?;
    "SwapFile" = ?;
    "TempPageFile" = ?;
    "FeatureSettings" = ? // DWORD

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Executive";
    "AdditionalCriticalWorkerThreads" = 0; // ExpAdditionalCriticalWorkerThreads 
    "AdditionalDelayedWorkerThreads" = 0; // ExpAdditionalDelayedWorkerThreads 
    "ForceEnableMutantAutoboost" = 0; // ExpForceEnableMutantAutoboost 
    "KernelWorkerTestFlags" = 0; // ExpWorkerQueueTestFlags 
    "MaximumKernelWorkerThreads" = 4096; // ExpMaximumKernelWorkerThreads (0x1000) 
    "MaxTimeSeparationBeforeCorrect" = 60; // ExpMaxTimeSeperationBeforeCorrect (0x3C) 
    "WorkerFactoryThreadCreationTimeout" = 10; // ExpWorkerFactoryThreadCreationTimeoutInSeconds (0x0A) 
    "WorkerFactoryThreadIdleTimeout" = 67; // ExpWorkerFactoryThreadIdleTimeoutInSeconds (0x43) 
    "WorkerThreadTimeoutInSeconds" = 600; // ExpWorkerThreadTimeoutInSeconds (0x258)
    "TickcountRolloverDelay" = 0; // ? (InitTickRolloverDelay dd 0) - InitTickRolloverDelay <> 24848b00, InitTickRolloverDelayLength <> 5e4130c4, InitTickRolloverDelayType <> e2894460

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power";
    "FlushPolicy" = 0; // PopFlushPolicy 
    "IdleScanInterval" = 30; // PopIdleScanInterval (0x1E) 
    "SkipTickOverride" = 1; // PopSkipTickPolicy
    "SleepStudyDeviceAccountingLevel" = 4; // PopSleepStudyDeviceAccountingLevel 
    "SleepStudyDisabled" = 0; // PopSleepStudyDisabled 
    "WatchdogResumeTimeout" = 120; // PopWatchdogResumeTimeout (0x78) 
    "WatchdogSleepTimeout" = 300; // PopWatchdogSleepTimeout (0x12C) 
    "Win32CalloutWatchdogBugcheckEnabled" = 0; // PopWin32CalloutWatchdogBugcheckEnabled 

    // PopOpenPowerKey
    "AwayModeEnabled" = 0; // REG_DWORD, range 0-1
    "HiberbootEnabled" = 0; // REG_DWORD, range 0-1, PopHiberbootEnabledReg
    "KernelResumeIoCpuTime" = 0; // REG_DWORD, milliseconds, range 0-4294967295
    "MaxHuffRatio" = 1; // REG_DWORD, range 1-98
    "MultiPhaseResumeDisabled" = 0; // REG_DWORD, range 0-1
    "SystemPowerPolicy" = "<STRUCT 232 BYTES>"; // REG_BINARY, Size=232

    // HybridBootAnimationTime records the boot animation duration during fast boot, HiberIoCpuTime is CPU time spent on hibernation I/O during resume, ResumeCompleteTimestamp is the system timestamp when resume from hibernation completed. So all of them are just counters and chaning their data won't affect the boot.
    "HiberIoCpuTime" = 0; // REG_DWORD, milliseconds, range 0-4294967295
    "HybridBootAnimationTime" = 1601; // REG_DWORD, milliseconds, range 0-4294967295
    "ResumeCompleteTimestamp" = 0; // REG_QWORD, range 0-4294967295FFFFFFFF

    // PpmInitIllegalThrottleLogging
    "ProcessorThrottleLogInterval" = 10000; // REG_DWORD, milliseconds, range 0-10000 (values >10000 are clamped to 10000)

    // procmon boot trace
    "SleepStudyBufferSizeInMB" = ?;
    "SleepStudyHistoryDays" = ?;
    "SleepStudyPerfTrackDripsThresholdPercentage" = ?;
    "SleepStudyTraceDirectory" = ?;

"HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Throttle";
    "PerfEnablePackageIdle" = 0;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Segment Heap";
    "Enabled" = 0; // if present with DataLength==4 and nonzero type:
                    //    RtlpLowFragHeapGlobalFlags |= 0x10;  // global segment heap enable
                    //    if (value & 0x2)                      // low byte, bit 1
                    //        RtlpLowFragHeapGlobalFlags |= 0x20; // extra option ?
                    // if the value exists but is stored as REG_NONE (type==0):
                    //    RtlpLowFragHeapGlobalFlags |= 0x8;   // global "disable/override"

// Miscellaneous values

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA";
    "AuditBaseDirectories" = 0; // ObpAuditBaseDirectories 
    "AuditBaseObjects" = 0; // ObpAuditBaseObjects 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA\\audit";
    "ProcessAccessesToAudit" = 0; // SepProcessAccessesToAudit 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation";
    "ActiveTimeBias" = ?; // dword_140FCE974
    "Bias" = 480; // ExpAltTimeZoneBias (0x000001e0) 
    "RealTimeIsUniversal" = 0; // ExpRealTimeIsUniversal 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\I/O System";
    "DisableDiskCounters" = 0; // PsDisableDiskCounters 
    "IoAllowLoadCrashDumpDriver" = 0; // IopAllowLoadCrashDumpDriver 
    "IoBlockLegacyFsFilters" = 0; // IopBlockLegacyFsFilters 
    "IoCaseInsensitive" = 1; // IopCaseInsensitive 
    "IoEnableSessionZeroAccessCheck" = 0; // IopSessionZeroAccessCheckEnabled 
    "IoFailZeroAccessCreate" = 1; // IopFailZeroAccessCreate 
    "IoIrpCompletionTimeoutInSeconds" = 300; // IopIrpCompletionTimeoutInSeconds (0x12C) 
    "IoKeepAliveTimeMs" = 5000; // IopKeepAliveTimeMs (0x1388) 
    "LargeIrpStackLocations" = 14; // IopLargeIrpStackLocations (0x0E) 
    "MediumIrpStackLocations" = 2; // IopMediumIrpStackLocations 
    "RequireDeviceAccessCheck" = 1; // IopRequireDeviceAccessCheck 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Configuration Manager";
    "BugcheckRecoveryEnabled" = 0; // CmBugcheckRecoveryEnabled 
    "CallbackMemoryFromPerProcLookaside" = 1; // CmpAllocateCallbackMemoryFromPerProcLookaside 
    "CallbackMemoryFromPool" = 0; // CmpAllocateCallbackMemoryFromPool 
    "DelayCloseSize" = 2048; // CmpDelayedCloseSize (0x800) 
    "Enabled" = 0; // CmpLKGEnabled 
    "EnablePeriodicBackup" = 0; // CmpDoIdleProcessing 
    "FastBoot" = 1; // CmFastBoot 
    "FreezeThawTimeoutInSeconds" = 60; // CmFreezeThawTimeoutInSeconds (0x3C) 
    "RegistryFlushGlobalFlags" = 0; // CmpGlobalFlushControlFlags 
    "RegistryLazyFlushBootDelay" = 60; // CmpEnableLazyFlushBootDelayInterval (0x3C) 
    "RegistryLazyFlushInterval" = 60; // CmpLazyFlushIntervalInSeconds (0x3C) 
    "RegistryLazyLocalizeInterval" = 60; // CmpLazyLocalizeIntervalInSeconds (0x3C) 
    "RegistryLazyReconcileInterval" = 3600; // CmpLazyReconcileIntervalInSeconds (0x0E10) 
    "RegistryLogFileSizeCap" = 0; // CmpLogFileSizeCap 
    "RegistryReorganizationLimit" = 1048576; // CmpReorganizeLimit (0x00100000) 
    "RegistryReorganizationLimitDays" = 7; // CmpReorganizeDelayDays 
    "SelfHealingEnabled" = 1; // CmSelfHeal 
    "SystemHiveLimitSize" = 1610612736; // CmSystemHiveLimitSize (0x60000000) 
    "VirtualizationEnabled" = 1; // CmVEEnabled 
    "VolatileBoot" = 0; // CmpVolatileBoot 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\StateSeparation\\Policy";
    "AllHivesVolatile" = 0; // CmStateSeparationAllHivesVolatile 
    "DevelopmentMode" = 0; // CmStateSeparationDevMode 
    "Enabled" = 0; // CmStateSeparationEnabled 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\ValidationRunlevels";
    "Global" = 1210938368; // CmGlobalValidationRunlevel (0x482d7400) 

"HKLM\\System\\CurrentControlSet\\Control\\Processor";
    "AllowGuestPerfStates" = 0;
    "AllowPepPerfStates" = 0;
    "Capabilities" = 4294967288; // Fallback of 0 ?
    "DisableAsserts" = 0;
    "Overrides" = 0;
```

## Windows Internals

![](https://github.com/nohuto/win-config/blob/main/system/images/kernel0.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/kernel1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/kernel2.png?raw=true)

## Notes on SerializeTimerExpiration

`0` = depends on `HalpAcpiAoacCapable`, can end up with `0`/`1`. `HalpSetPlatformFlags` checks if bit 21
```c
if ( (*(_DWORD *)(a1 + 112) & 0x200000) != 0 )
  HalpPlatformFlags |= 8u;
```
is set or not, if set it's `1`, if not `0`.
```
LOW_POWER_S0_IDLE_CAPABLE Bit offset 21. Indicates that the platform supports low-power idle states within the ACPI S0 system power state that are more energy efficient than any Sx sleep state. If this flag is set, Windows won't try to sleep and resume, but will instead use platform idle states and connected standby.
```
Means for desktops/servers it's usually `0`, since "S0 Low‑Power Idle/Modern Standby" is more of a laptop/tablet thing.

You can check if the bit is true or false using [iasl & acpidump](https://github.com/acpica/acpica).

`1` = forced on (uses CPU 0 `KiProcessorBlock[0]`)
`>=2` = forced `0`

This isn't completey, it's currently only for the data ranges.

![](https://github.com/nohuto/win-config/blob/main/system/images/kernel-ste.png?raw=true)

Read more about 'Timer expiration' in [Windows Interals E7, P1, P.66f](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).
