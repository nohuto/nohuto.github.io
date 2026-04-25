---
title: 'Kernel Values'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 2
---

Since many people don't yet know which values exist and what default value they have, here's a list. I used IDA, WinDbg, WinObjEx, Windows Internals E7 P1 to create it. Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

## Registry Values Details

This contains details on several `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\...` keys, not only the `Session Manager\\Kernel` key.

See [session-manager-symbols](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/session-manager-symbols.txt) for reference ([sym-dump](https://github.com/nohuto/sym-dump)).

- [session-manager/assets | ProcLibGlobalInit.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/ProcLibGlobalInit.c)
- [session-manager/assets | GetRegistryQwordValue.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/GetRegistryQwordValue.c)
- [session-manager/assets | RtlpHpApplySegmentHeapConfigurations.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/RtlpHpApplySegmentHeapConfigurations.c)

The comments of some values with more details are based on pseudocode, if so I added the function name to the end of the comment. Search for the function name in [decompiled-pseudocode/tree/main/ntoskrnl](https://github.com/nohuto/decompiled-pseudocode/tree/main/ntoskrnl).

Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

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

## [Windows Internals](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P2.pdf)

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

## RegistryMachin_* Keys

These are from `ntoskrnl.exe`. Looking at xrefs of these names is sometimes a start point when trying to find values within a binary or to see what keys are somewhere used, therefore I'm adding it (note that `aRegistryMachin_*` are IDA generated names so you won't find them in strings, nor will they be the exact same for you unless you disassemble the same binary build version).

```c
// ntoskrnl.exe
aRegistryMachin = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\WMI\\Restrictions"
aRegistryMachin_0 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Arbiters"
aRegistryMachin_1 = "\\Registry\\Machine\\HARDWARE"
aRegistryMachin_2 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\FileSystems\\NTFS"
aRegistryMachin_3 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\StoreParameters\\CacheInfo"
aRegistryMachin_4 = "\\Registry\\Machine\\SAM\\SAM"
aRegistryMachin_5 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache"
aRegistryMachin_6 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa"
aRegistryMachin_7 = "\\Registry\\Machine\\Software\\Microsoft\\SQMClient\\Windows"
aRegistryMachin_8 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Storage"
aRegistryMachin_9 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control"
aRegistryMachin_10 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Nls\\CodePage"
aRegistryMachin_11 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CommonGlobUserSettings\\"
aRegistryMachin_12 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Class"
aRegistryMachin_13 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WHEA"
aRegistryMachin_14 = "\\Registry\\Machine\\System\\LastKnownGoodRecovery\\LastGood.Tmp"
aRegistryMachin_15 = "\\Registry\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management"
aRegistryMachin_16 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon"
aRegistryMachin_17 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa\\CentralizedAccessPolicies\\CAPs"
aRegistryMachin_18 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\EventLog\\Security"
aRegistryMachin_19 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\"
aRegistryMachin_20 = "\\Registry\\Machine\\OSBOOT\\System\\CurrentControlSet\\Control\\CrashControl"
aRegistryMachin_21 = "\\REGISTRY\\MACHINE"
aRegistryMachin_22 = "\\REGISTRY\\MACHINE\\HARDWARE\\RESOURCEMAP"
aRegistryMachin_23 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\WMI"
aRegistryMachin_24 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_25 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\RemovableStorageDevices"
aRegistryMachin_26 = "\\Registry\\Machine\\System\\Setup"
aRegistryMachin_27 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI\\ProfileSource"
aRegistryMachin_28 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FirmwareResources"
aRegistryMachin_29 = "\\Registry\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel\\KGroups"
aRegistryMachin_30 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Compatibility"
aRegistryMachin_31 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\CONTROL\\SESSION MANAGER\\MEMORY MANAGEMENT"
aRegistryMachin_32 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl"
aRegistryMachin_33 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\ApiSetSchemaExtensions"
aRegistryMachin_34 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server"
aRegistryMachin_35 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\DeviceOverrides"
aRegistryMachin_36 = "\\registry\\machine\\system\\currentcontrolset\\control\\hiveredirectionlist"
aRegistryMachin_37 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\ProductOptions"
aRegistryMachin_38 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\Control\\HAL\\OriginalImageFeatures"
aRegistryMachin_39 = "\\Registry\\Machine\\OSBOOT\\System\\CurrentControlSet\\Control\\LiveDump"
aRegistryMachin_40 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\PnP"
aRegistryMachin_41 = "\\Registry\\Machine\\System\\LastKnownGoodRecovery\\LastGood"
aRegistryMachin_42 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\StoreParameters"
aRegistryMachin_43 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa\\CentralizedAccessPolicies\\CAPEs"
aRegistryMachin_44 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\TieredStorage"
aRegistryMachin_45 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control"
aRegistryMachin_46 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\FileSystem"
aRegistryMachin_47 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel\\CPU Partitions"
aRegistryMachin_48 = "\\Registry\\MACHINE\\System\\CurrentControlSet\\Control\\CI\\NGEN"
aRegistryMachin_49 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Nls\\Language"
aRegistryMachin_50 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Microsoft"
aRegistryMachin_51 = "\\Registry\\Machine\\Software\\Microsoft\\SecurityManager\\AdminCapabilities"
aRegistryMachin_52 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\Control\\WDI\\Config"
aRegistryMachin_53 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\VolatileNotifications"
aRegistryMachin_54 = "\\REGISTRY\\MACHINE\\HARDWARE\\DESCRIPTION\\SYSTEM"
aRegistryMachin_55 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\StateSeparation\\RedirectionMap\\Keys"
aRegistryMachin_56 = "\\REGISTRY\\MACHINE\\OSBOOT\\ControlSetOverride\\Session Manager\\Memory Management"
aRegistryMachin_57 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\GroupOrderList"
aRegistryMachin_58 = "\\REGISTRY\\MACHINE\\SYSTEM\\CONTROLSET001"
aRegistryMachin_59 = "\\Registry\\Machine\\%ws\\ControlSet%03d"
aRegistryMachin_60 = "\\Registry\\Machine\\System\\Select"
aRegistryMachin_61 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI\\GlobalLogger"
aRegistryMachin_62 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\DedupChange"
aRegistryMachin_63 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Update\\TargetingInfo\\DynamicInstalled"
aRegistryMachin_64 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_65 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\.NETFramework"
aRegistryMachin_66 = "\\Registry\\Machine\\SYSTEM"
aRegistryMachin_67 = "\\REGISTRY\\MACHINE"
aRegistryMachin_68 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control"
aRegistryMachin_69 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters"
aRegistryMachin_70 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\Control\\HAL"
aRegistryMachin_71 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management"
aRegistryMachin_72 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\ENUM\\ROOT"
aRegistryMachin_73 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl\\FullLiveKernelReports"
aRegistryMachin_74 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\FileSystems\\NTFS"
aRegistryMachin_75 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl"
aRegistryMachin_76 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services"
aRegistryMachin_77 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Notifications"
aRegistryMachin_78 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\NLS\\Language"
aRegistryMachin_79 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\CONTROL\\BOOTLOG"
aRegistryMachin_80 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\MUI\\UILanguages\\PendingDelete"
aRegistryMachin_81 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl\\EncryptionCertificates\\Certificate.1"
aRegistryMachin_82 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI"
aRegistryMachin_83 = "\\registry\\machine\\system\\CurrentControlSet\\Control\\Session Manager\\Configuration Manager\\Defrag"
aRegistryMachin_84 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\MUI\\Settings"
aRegistryMachin_85 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\LsaInformation"
aRegistryMachin_86 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\NLS\\Language"
aRegistryMachin_87 = "\\REGISTRY\\MACHINE\\HARDWARE\\DESCRIPTION"
aRegistryMachin_88 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI\\AutoLogger"
aRegistryMachin_89 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa\\CentralizedAccessPolicies\\CAPs"
aRegistryMachin_90 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\EarlyLaunch"
aRegistryMachin_91 = "\\Registry\\Machine\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
aRegistryMachin_92 = "\\Registry\\Machine\\System\\CurrentControlSet\\Policies\\EarlyLaunch"
aRegistryMachin_93 = "\\REGISTRY\\MACHINE\\SOFTWARE"
aRegistryMachin_94 = "\\REGISTRY\\MACHINE"
aRegistryMachin_95 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\LiveDump"
aRegistryMachin_96 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET"
aRegistryMachin_97 = "\\Registry\\Machine\\%wZ\\CurrentControlSet\\Hardware Profiles\\%04d"
aRegistryMachin_98 = "\\REGISTRY\\MACHINE\\SOFTWARE\\CLASSES"
aRegistryMachin_99 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Executive"
aRegistryMachin_100 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\FileInfo"
aRegistryMachin_101 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\condrv"
aRegistryMachin_102 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\WindowsTrustedRT\\Parameters"
aRegistryMachin_103 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\FileSystem"
aRegistryMachin_104 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\MCUpdate\\PatchConfig"
aRegistryMachin_105 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl\\LastCrashdump"
aRegistryMachin_106 = "\\registry\\machine\\"
aRegistryMachin_107 = "\\REGISTRY\\MACHINE\\HARDWARE\\UEFI"
aRegistryMachin_108 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\FileSystem\\GroupPolicyKeys"
aRegistryMachin_109 = "\\Registry\\Machine\\HARDWARE\\UEFI"
aRegistryMachin_110 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"
aRegistryMachin_111 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\WDI"
aRegistryMachin_112 = "\\Registry\\Machine\\Hardware\\Description\\System"
aRegistryMachin_113 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Errata\\Dynamic"
aRegistryMachin_114 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET"
aRegistryMachin_115 = "\\REGISTRY\\MACHINE\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\SHUTDOWN"
aRegistryMachin_116 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\ProductOptions"
aRegistryMachin_117 = "\\REGISTRY\\MACHINE\\HARDWARE\\DEVICEMAP"
aRegistryMachin_118 = "\\Registry\\Machine\\SOFTWARE"
aRegistryMachin_119 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\FeatureManagement\\EnterpriseTempControls\\Active"
aRegistryMachin_120 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\Control\\WDI\\Scenarios"
aRegistryMachin_121 = "\\Registry\\Machine\\System\\Setup"
aRegistryMachin_122 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa\\CentralizedAccessPolicies\\CAPEs"
aRegistryMachin_123 = "\\Registry\\Machine\\System\\DriverDatabase\\Policies"
aRegistryMachin_124 = "\\REGISTRY\\MACHINE\\OSDATA"
aRegistryMachin_125 = "\\Registry\\Machine\\SOFTWARE\\Policies\\Microsoft\\Windows\\Appx"
aRegistryMachin_126 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"
aRegistryMachin_127 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_128 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\CAD"
aRegistryMachin_129 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppModelUnlock"
aRegistryMachin_130 = "\\Registry\\Machine\\Hardware\\Description\\System\\CentralProcessor"
aRegistryMachin_131 = "\\Registry\\Machine\\System\\CurrentControlSet\\Policies\\Microsoft\\Compatibility"
aRegistryMachin_132 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\InstalledSDB"
aRegistryMachin_133 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\SERVICES\\EVENTLOG"
aRegistryMachin_134 = "\\Registry\\Machine\\%wZ\\CurrentControlSet"
aRegistryMachin_135 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\CMF\\SqmData"
aRegistryMachin_136 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Windows"
aRegistryMachin_137 = "\\registry\\machine\\SYSTEM\\CurrentControlSet\\Control\\NUMA"
aRegistryMachin_138 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion"
aRegistryMachin_139 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl"
aRegistryMachin_140 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\FsDepends\\Parameters"
aRegistryMachin_141 = "\\Registry\\Machine\\%wZ\\CurrentControlSet\\Hardware Profiles\\%04d"
aRegistryMachin_142 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Compatibility\\Device"
aRegistryMachin_143 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\DeviceGuard"
aRegistryMachin_144 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\DeviceContainerPropertyUpdateEvents"
aRegistryMachin_145 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Syspart"
aRegistryMachin_146 = "\\Registry\\Machine\\%ws"
aRegistryMachin_147 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\HARDWARE PROFILES\\CURRENT"
aRegistryMachin_148 = "\\REGISTRY\\MACHINE\\SOFTWARE\\WowAA32Node"
aRegistryMachin_149 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall"
aRegistryMachin_150 = "\\Registry\\Machine\\System\\ControlSet%03d"
aRegistryMachin_151 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Quota System"
aRegistryMachin_152 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\LeapSecondInformation"
aRegistryMachin_153 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options"
aRegistryMachin_154 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\IPT"
aRegistryMachin_155 = "\\REGISTRY\\MACHINE\\SOFTWARE\\Wow6432Node"
aRegistryMachin_156 = "\\registry\\machine\\system\\currentcontrolset\\control\\hivelist"
aRegistryMachin_157 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PXE"
aRegistryMachin_158 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\OneCore"
aRegistryMachin_159 = "\\REGISTRY\\MACHINE\\"
aRegistryMachin_160 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Compatibility\\Driver"
aRegistryMachin_161 = "\\Registry\\Machine\\Hardware\\Description\\System"
aRegistryMachin_162 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\SQMClient\\Windows"
aRegistryMachin_163 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\LicenseInfoSuites"
aRegistryMachin_164 = "\\REGISTRY\\MACHINE\\%s"
aRegistryMachin_165 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\FeatureManagement"
aRegistryMachin_166 = "\\Registry\\Machine"
aRegistryMachin_167 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI\\Security"
aRegistryMachin_168 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\CONTROL\\SESSION MANAGER\\Configuration Manager"
aRegistryMachin_169 = "\\Registry\\Machine\\SOFTWARE\\Microsoft\\WindowsUpdate"
aRegistryMachin_170 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Diagnostics\\Performance"
aRegistryMachin_171 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\SecureBoot"
aRegistryMachin_172 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\AutoAttachVirtualDisks"
aRegistryMachin_173 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\MUI\\UILanguages"
aRegistryMachin_174 = "\\Registry\\Machine\\Hardware\\DeviceMap"
aRegistryMachin_175 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\StateSeparation\\RedirectionMap\\Files"
aRegistryMachin_176 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\FeatureManagement\\EnterpriseTempControls"
aRegistryMachin_177 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\FileSystemVolumes\\{%08x-%04x-%04x-%02x%02x-%02x%02x%02x%02x%02x%02x}"
aRegistryMachin_178 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\HARDWARE PROFILES\\CURRENT"
aRegistryMachin_179 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Nls\\Normalization"
aRegistryMachin_180 = "\\REGISTRY\\MACHINE\\SYSTEM"
aRegistryMachin_181 = "\\Registry\\Machine\\Security\\SAM"
aRegistryMachin_182 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\NLS\\Language"
aRegistryMachin_183 = "\\REGISTRY\\MACHINE\\HARDWARE\\OWNERMAP"
aRegistryMachin_184 = "\\Registry\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_185 = "\\Registry\\Machine\\System\\LastKnownGoodRecovery\\LastGood.Tmp"
aRegistryMachin_186 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\Session Manager\\Quota System"
aRegistryMachin_187 = "\\Registry\\Machine\\ELAM"
aRegistryMachin_188 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa"
aRegistryMachin_189 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_190 = "\\Registry\\Machine\\System\\CurrentControlSet\\ServiceState"
aRegistryMachin_191 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\CONTROL\\SAFEBOOT"
aRegistryMachin_192 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Arbiters"
aRegistryMachin_193 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\WMI\\Restrictions"
aRegistryMachin_194 = "\\Registry\\Machine\\"
aRegistryMachin_195 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\MUI\\Settings"
aRegistryMachin_196 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\SERVICES"
aRegistryMachin_197 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control\\BitlockerStatus"
aRegistryMachin_198 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\IDConfigDB"
aRegistryMachin_199 = "\\REGISTRY\\MACHINE\\SOFTWARE\\MICROSOFT\\WINDOWS NT\\CURRENTVERSION\\PERFLIB"
aRegistryMachin_200 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\MiniNT"
aRegistryMachin_201 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Compatibility"
aRegistryMachin_202 = "\\REGISTRY\\MACHINE\\SYSTEM"
aRegistryMachin_203 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\DeviceOverrides"
aRegistryMachin_204 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\CrashControl\\ForceDumpsDisabled"
aRegistryMachin_205 = "\\Registry\\Machine\\System\\CurrentControlSet\\Services\\ACPI\\Parameters"
aRegistryMachin_206 = "\\REGISTRY\\MACHINE\\HARDWARE"
aRegistryMachin_207 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\ENUM"
aRegistryMachin_208 = "\\REGISTRY\\MACHINE\\SOFTWARE"
aRegistryMachin_209 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\WMI"
aRegistryMachin_210 = "\\REGISTRY\\MACHINE\\SYSTEM\\Software\\Microsoft"
aRegistryMachin_211 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\International"
aRegistryMachin_212 = "\\Registry\\Machine\\System\\Setup"
aRegistryMachin_213 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\ValidationRunlevels"
aRegistryMachin_214 = "\\REGISTRY\\MACHINE\\"
aRegistryMachin_215 = "\\REGISTRY\\MACHINE\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_216 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\StoreParameters"
aRegistryMachin_217 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\kernel"
aRegistryMachin_218 = "\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\Kernel DMA Protection"
aRegistryMachin_219 = "\\Registry\\Machine\\System\\LastKnownGoodRecovery\\LastGood"
aRegistryMachin_220 = "\\Registry\\Machine"
aRegistryMachin_221 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\FileSystem"
aRegistryMachin_222 = "\\Registry\\Machine\\OSDATA\\System\\CurrentControlSet\\Control\\CrashControl"
aRegistryMachin_223 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control"
aRegistryMachin_224 = "\\REGISTRY\\MACHINE\\SYSTEM\\CURRENTCONTROLSET\\CONTROL\\CLASS"
aRegistryMachin_225 = "\\REGISTRY\\MACHINE\\SOFTWARE\\MICROSOFT\\WINDOWS NT\\CURRENTVERSION"
aRegistryMachin_226 = "\\Registry\\Machine\\System\\DriverDatabase\\Updates"
aRegistryMachin_227 = "\\Registry\\Machine\\%wZ\\CurrentControlSet\\%wZ"
aRegistryMachin_228 = "\\Registry\\Machine\\OSDATA\\System\\CurrentControlSet\\Control\\LiveDump"
aRegistryMachin_229 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Power"
aRegistryMachin_230 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\"
aRegistryMachin_231 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\ServiceGroupOrder"
aRegistryMachin_232 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters"
aRegistryMachin_233 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Lsa\\CentralizedAccessPolicies"
aRegistryMachin_234 = "\\Registry\\Machine\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Notifications"
aRegistryMachin_235 = "\\Registry\\Machine\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"
aRegistryMachin_236 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\7503491f-4a39-4f84-b231-8aca3e203b94"
aRegistryMachin_237 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\MUI\\Settings\\LanguageConfiguration"
aRegistryMachin_238 = "\\REGISTRY\\MACHINE\\OSDATA\\Notifications"
aRegistryMachin_239 = "\\Registry\\Machine\\System\\CurrentControlSet\\Control\\Windows"
aRegistryMachin_240 = "\\Registry\\Machine\\System\\Select"
```
