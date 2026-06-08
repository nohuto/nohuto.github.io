---
title: 'Kernel Values'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 6
---

Since many people don't yet know which values exist and what default value they have, here's a list. I used [IDA](https://discord.com/channels/836870260715028511/836896618410278952/1492546690413236425), WinDbg, [WinObjEx](https://github.com/hfiref0x/WinObjEx64), [Windows Internals E7 P1](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf) to create it. Many applied values are defaults, some not. See documentation below for details. The applied data is sometimes pure speculation.

## Registry Values

This contains details on several `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\...` keys, not only the `Session Manager\\Kernel` key.

See [session-manager-symbols](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/session-manager-symbols.txt) for reference ([sym-dump](https://github.com/nohuto/sym-dump)).

- [session-manager/assets | ProcLibGlobalInit.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/ProcLibGlobalInit.c)
- [session-manager/assets | GetRegistryQwordValue.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/GetRegistryQwordValue.c)
- [session-manager/assets | RtlpHpApplySegmentHeapConfigurations.c](https://github.com/nohuto/win-config/tree/main/system/assets/session-manager/RtlpHpApplySegmentHeapConfigurations.c)

The comments of some values with more details are based on pseudocode, if so I added the function name to the end of the comment. Search for the function name in [decompiled-pseudocode/tree/main/11-23H2/ntoskrnl](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl).

Everything listed below is based on personal findings, mistakes may exist.

| Prefix | Component |
| --- | --- |
| `Alpcp` | Advanced Local Procedure Calls |
| `Cc` | Common Cache |
| `Cm` / `Cmp` | Configuration manager |
| `Dbgk` | Debugging Framework for user mode |
| `Ex` / `Exp` | Executive support routines |
| `Hvl` | Hypervisor library |
| `Io` / `Iop` | I/O manager |
| `Kd` / `Kdp` | Kernel debugger |
| `Ke` / `Ki` | Kernel / Kernel internal |
| `Mm` | Memory manager |
| `Ob` / `Obp` | Object manager |
| `Po` / `Pop` | Power manager |
| `Ppm` | Processor power manager |
| `Ps` / `Psp` | Process support |
| `Rtlp` | Run-time library |
| `Se` / `Sep` | Security Reference Monitor |
| `Vf` / `Vi` / `Dif*` | Driver Verifier |

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel";
    "AdjustDpcThreshold" = 20; // KiAdjustDpcThreshold, per CPU countdown value. When it reaches 1, it's reloaded and current DPC queue depth is incremented up to DpcQueueDepth ("number of clock ticks before DpcQueueDepth is incremented if DPCs are not pending") (KeAccumulateTicks, KiInitPrcb)
    "AlwaysTrackIoBoosting" = 0; // PspAlwaysTrackIoBoosting enabling forces IO-boost tracking part in PsBoostThreadIoEx
    "AmdTprLowerInterruptDelayConfig" = 0; // KiAmdTprLowerInterruptDelayConfig
    "BoostingPeriodMultiplier" = 3; // KiNormalPriorityBoostingPeriodMultiplier clamped to 1-20 and used as multiplier in 'NormalPriority AntiStarvation' scheduling parts (KiInitializeNormalPriorityAntiStarvationPolicies, KiPrepareReadyThreadForRescheduling, KiNormalPriorityReadyScan)
    "BugCheckUnexpectedInterrupts" = 0; // KiBugCheckUnexpectedInterrupts
    "CacheAwareScheduling" = 47; // KiCacheAwareScheduling
    "CacheErrataOverride" = 0; // KiTLBCOverride
    "CacheIsoBitmap" = 0; // KiCacheIsoBitmap
    "DebuggerIsStallOwner" = 0; // KiDebuggerIsStallOwner (KiSetDebuggerOwner)
    "DebugPollInterval" = 2000; // KiDebugPollInterval, if debugger enabled (KdDebuggerEnabled) timer path uses 10000 * value (KiGetNextTimerExpirationDueTime)
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
    "DynamicHeteroCpuPolicyMask" = 7; // (foreground status = 1, priority = 2, expected run time = 4)
    // Determine what is considered in assessing whether a thread is important.
    "EnablePerCpuClockTickScheduling" = 0; // KiEnableClockTimerPerCpuTickScheduling, https://noverse.dev/docs/win-config/system/timer-expiration/#enablepercpuclocktickscheduling
    "EnableTickAccumulationFromAccountingPeriods" = 0; // KiEnableTickAccumulationFromAccountingPeriods, controls how CPU time used by threads etc. get counted?
                                                       // >= 2 = disabled (adds CPU time when clock ticks happen)
                                                       // 0/1/missing = enabled (measure time between accounting points)
    "EnableWerUserReporting" = 1; // DbgkEnableWerUserReporting, REG_DWORD, range 0 = disabled, any nonzero = enabled
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
    "PowerOffFrozenProcessors" = 1; // KiPowerOffFrozenProcessors, seems unused (but initialized), was probably used to "power off" processors that are frozen (see windbg !frozen)
    "ReadyTimeTicks" = 6; // KiNormalPriorityBoostReadyTimeTicks
    "RebalanceMinPriority" = 1; // KiRebalanceMinPriority
    "ReservedCpuSets" = 0; // KiReservedCpuSets
    "ScanLatencyTicks" = 7; // KiNormalPriorityBoostScanLatencyTicks
    "SchedulerAssistThreadFlagOverride" = 0; // KiSchedulerAssistThreadFlagOverride
    "SeAllowAllApplicationAceRemoval" = 0; // SepAllowAllApplicationAceRemoval
    "SeAllowSessionImpersonationCapability" = 0; // SepAllowSessionImpersonationCap
    "SeCompatFlags" = 0; // SeCompatFlags
    "SeLpacEnableWatsonReporting" = 0; // SeLpacEnableWatsonReporting, REG_DWORD, 0 disables, nonzero enables
    "SeLpacEnableWatsonThrottling" = 1; // SeLpacEnableWatsonThrottling
    "SerializeTimerExpiration" = 1; // KiSerializeTimerExpiration, https://noverse.dev/docs/win-config/system/timer-expiration/#serializetimerexpiration
    "SeTokenDoesNotTrackSessionObject" = 0; // SeTokenDoesNotTrackSessionObject
    "SeTokenLeakDiag" = 0; // SeTokenLeakTracking
    "SeTokenSingletonAttributesConfig" = 3; // SepTokenSingletonAttributesConfig
    "SplitLargeCaches" = 0; // KiSplitLargeCaches
    "ThreadDpcEnable" = 1; // KeThreadDpcEnable, https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-threaded-dpcs
    "ThreadReadyCount" = 1; // KiNormalPriorityBoostMaximumThreadReadyCount
    "TimerCheckFlags" = 1; // KeTimerCheckFlags
    "VerifierDpcScalingFactor" = 1; // KeVerifierDpcScalingFactor
    "VirtualHeteroHysteresis" = 4294967295; // PpmPerfQosTransitionHysteresisOverride
    "VpThreadSystemWorkPriority" = 30; // KiVpThreadSystemWorkPriority
    "WpsSimulationOverride" = 0; // PpmWpsSimulationOverride / PpmWpsSimulationOverrideSize
    "XStateContextLookasidePerProcMaxDepth" = 0; // KiXStateContextLookasidePerProcMaxDepth

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel\\RNG";
    "RNGAuxiliarySeed" = ; // ExpRNGAuxiliarySeed, REG_DWORD

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager";
    "AlpcMessageLog" = 0; // AlpcpMessageLogEnabled
    "AlpcWakePolicy" = 1; // AlpcpWakePolicyDefault
    "CriticalSectionTimeout" = 2592000; // dword_140FC3204
    "CWDIllegalInDLLSearch" = 0; // PspCurDirDevicesSkippedForDlls, can cause "There was a problem starting PolicyAgentProvider.dll The specified module could not be found" if set to 0xFFFFFFFF (https://learn.microsoft.com/en-us/troubleshoot/mem/configmgr/client-installation/client-installation-fails-with-policyagentprovider-dll)
    "Debugger Retries" = 20; // KdpContext
    "DisableIFEOCaching" = 0; // RtlpDisableIFEOCaching
    "GlobalFlag" = 0; // CmNtGlobalFlag <> 0x7061006c ? https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-details
    "GlobalFlag2" = 0; // CmNtGlobalFlag2 <> 0x6c642e30 ?
    // lkd> !gflag
    // Current NtGlobalFlag contents: 0x00000000
    // Current NtGlobalFlag2 contents: 0x00000000
    "HeapSegmentReserve" = 1048576; // REG_DWORD, range 65536-16580608, 65536 steps
    "HeapSegmentCommit" = 8192; // REG_DWORD, range 4096-16580608, 4096 steps
    "HeapDeCommitFreeBlockThreshold" = 4096; // REG_DWORD, range 0-4294967280, 16 steps
    "HeapDeCommitTotalFreeThreshold" = 65536; // REG_DWORD, range 0-4294967280, 16 steps
    "ImageExecutionOptions" = 0; // ViImageExecutionOptions
    "InitConsoleFlags" = 0; // InitConsoleFlags
    "MultiUsersInSessionSupported" = 0; // RtlpMultiUsersInSessionSupported
    "ObjectSecurityMode" = 1; // ObpObjectSecurityMode
    "PowerPolicySimulate" = 0; // PopSimulate
    "ProtectionMode" = 1; // ObpProtectionMode, REG_DWORD
    "ResourceCheckFlags" = 3; // ExResourceCheckFlags
    "ResourceEnforceOwnerTransfer" = 0; // ExpResourceEnforceOwnerTransfer
    "ResourceTimeoutCount" = 45; // ExResourceTimeoutCount
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
    "SafeDllSearchMode" = ?; // https://learn.microsoft.com/en-us/windows/win32/dlls/dynamic-link-library-search-order#standard-search-order-for-unpackaged-apps
    "SafeProcessSearchMode" = ?;
    "SmtDelayBaseYield" = ?;
    "SmtDelayMaxYield" = ?;
    "SmtDelaySleepLoopWindowSize" = ?;
    "SmtDelaySpinCountThreshold" = ?;
    "SmtFactorYield" = ?;
    "SystemUpdateOnBoot" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Quota System";
    "ApplicationBlockedMessageLimit" = 50; // PspJobNoWakeChargeLimit
    "JobTimeLimitsPeriodSeconds" = 7; // PspJobTimeLimitsPeriodSeconds
    "SystemBlockedMessageLimit" = 200; // PspSystemNoWakeChargeLimit

    "DfssGenerationLengthMS" = 600; // PsDfssGenerationLengthMS
    "DfssLongTermFraction1024" = 512; // sDfssLongTermFraction1024
    "DfssLongTermSharingMS" = 15; // PsDfssLongTermSharingMS
    "DfssResolutionMS" = 4294967295; // PsDfssDesiredTimerResolutionMs
    "DfssShortTermSharingMS" = 30; // PsDfssShortTermSharingMS
    "EnableCpuQuota" = 0;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management";
    "AllocationPreference" = 0; // dword_140FC3200
    "AllowUserHotPatchWithoutVbs" = 0; // dword_140FC3250
    "CacheUnmapBehindLengthInMB" = 8388608; // CcUnmapBehindLength
    "CustomDTPDenominator" = 8; // CcClientDTPDenominator
    "DeadlockRecursionDepthLimit" = 0; // ViRecursionDepthLimitFromRegistry
    "DeadlockSearchNodesLimit" = 0; // ViSearchedNodesLimitFromRegistry
    "DifPluginConfigData" = 635710207; // DifPluginConfigData
    "DifPluginConfigDataLength" = 1276097421; // DifPluginConfigDataLength
    "DisableCacheTelemetry" = 2; // CcDisableTelemetryRegKeyAtInit
    "DisablePageCombining" = 0; // dword_140FC31E8
    "DisablePagingExecutive" = 0; // dword_140FC31E4
    "EnableAsyncLazywrite" = 2; // CcEnableAsyncLazywriteOverride
    "EnableAsyncLazywriteMulti" = 2; // CcEnableAsyncLazywriteMultiOverride
    "EnableCooling" = 0; // dword_140FC31F8
    "EnablePerVolumeLazyWriter" = 2; // CcEnablePerVolumeLazyWriterOverride
    "ForceValidateIo" = 0; // dword_140FC31F0
    "HighMemoryThreshold" = 0; // qword_140FC3238
    "KernelPadSectionsOverride" = 0; // dword_140FC3248
    "LargeWriteSize" = 0; // CcAzure_LargeWriteSize
    "LazyWriterPercentageOfNumProcs" = 0; // CcAzure_LazyWriterPercentageOfNumProcs
    "LowMemoryThreshold" = 0; // qword_140FC3230
    "MaxLazyWritePages" = 0; // CcMaxLazyWritePagesOverride
    "MinimumStackCommitInBytes" = 0; // dword_140FC3208
    "Mirroring" = 0; // dword_140FC31F4
    "ModifiedWriteMaximum" = ?; // dword_140FC31FC
    "MoveImages" = 1; // MmRegistryState
    "NonPagedPoolQuota" = 4294967295; // PspDefaultResourceLimits
    "PagedPoolQuota" = ?; // unk_140FD7DE4
    "PageValidationAction" = 0; // MmPageValidationAction
    "PageValidationFrequency" = 0; // MmPageValidationFrequency
    "PagingFileQuota" = ?; // unk_140FD7DE8
    "PhysicalMemoryMapperEnforcementMode" = 0; // dword_140FC324C
    "PoolForceFullDecommit" = 0; // PoolForceFullDecommit
    "PoolTag" = 0; // MmSpecialPoolTag, https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/gflags-details
    "PoolTagOverruns" = 1; // MmSpecialPoolCatchOverruns
    "PoolTagSmallTableSize" = 4097; // PoolTrackTableSize
    "ProtectNonPagedPool" = 0; // MmProtectFreedNonPagedPool
    "RemoteFileDirtyPageThreshold" = 1310720; // CcRemoteFileDPInlineFlushThreshold, "This value determines the maximum number of dirty pages in the cache (on a per file basis) for a remote write before an inline flush is performed."
    "SimulateCommitSavings" = 0; // dword_140FC3240
    "SoftThrottleDelayInMs" = 0; // CcAzure_SoftThrottleDelayInMs
    "SoftThrottleLargeWriteAtPct" = 0; // CcAzure_SoftThrottleLargeWriteAtPct
    "SpecialPurposeMemoryPages" = 0; // MmSpecialPurposeMemoryPages
    "SpecialPurposeMemoryStartPage" = 0; // MmSpecialPurposeMemoryStartPage
    "SpecialPurposeMemoryStartPageValueSize" = 4294967295; // MmSpecialPurposeMemoryStartPageValueSize
    "TopBottomDPTEqual" = 0; // CcAzure_TopBottomDPTEqual
    "TrackLockedPages" = 0; // MmTrackLockedPages
    "TrackPtes" = 0; // dword_140FC31EC
    "VerifierDifPoolTags" = 0; // DifpPoolTags
    "VerifierDifPoolTagsSizeBytes" = 4294967295; // DifpPoolTagsSizeBytes
    "VerifierFaultApplications" = 0; // VerifierFaultApplicationsBuffer
    "VerifierFaultApplicationsSize" = 4294967295; // VerifierFaultApplicationsBufferSize
    "VerifierFaultBootMinutes" = 8; // VfFaultInjectionBootMinutes
    "VerifierFaultProbability" = 600; // VfFaultInjectionProbability
    "VerifierFaultTags" = 0; // VerifierFaultTagsBuffer
    "VerifierFaultTagsSize" = 4294967295; // VerifierFaultTagsBufferSize
    "VerifierHandleTraces" = 16384; // VfHandleTracingEntries
    "VerifierIrpStackTraces" = 16384; // IovIrpTracesLength
    "VerifierIrpTimeout" = 0; // VfWdIrpTimeoutMsec
    "VerifierNewRuleWorkaround" = 0; // VerifierNewRuleWorkaround
    "VerifierOptions" = 0; // VfOptionFlags
    "VerifierRandomTargets" = 0; // VfRandomVerifiedDrivers
    "VerifierSettingState" = 0; // VfRuleClasses
    "VerifierSettingStateSize" = 4294967295; // VfRuleClassesSize
    "VerifierTipDisable" = 0; // VerifierTipDisable
    "VerifierTipLimitDenominator" = 0; // DifiPluginControlDenominator
    "VerifierTipLimitNumerator" = 0; // DifiPluginControlNumerator
    "VerifierTipSparseness" = 0; // DifiPluginControlSparseness
    "VerifierTriageContext" = 0; // VfTriageContext
    "VerifyBTSBufferSize" = 0; // ViVerifyBTSBufferSize
    "VerifyDriverLevel" = 4294967295; // MmVerifyDriverLevel
    "VerifyDrivers" = 3905129288; // MmVerifyDriverBuffer
    "VerifyDriversLength" = 1207968387; // MmVerifyDriverBufferLength
    "VerifyDriversSuppress" = 276138824; // VfXdvSuppressDriversBuffer
    "VerifyDriversSuppressLength" = 3482011648; // VfXdvSuppressDriversBufferLength
    "VerifyMode" = 4; // VfVerifyMode
    "VerifyTriage" = 4294967295; // ViVerifyTriage
    "VerifyTriageRules" = 0; // ViVerifyTriageRules
    "VerifyTriageRulesSize" = 4294967295; // ViVerifyTriageRulesSize
    "VmPauseOutswapSizeCapMB" = 512; // VmPauseOutswapSizeCapMB
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
    "MaximumKernelWorkerThreads" = 4096; // ExpMaximumKernelWorkerThreads
    "MaxTimeSeparationBeforeCorrect" = 60; // ExpMaxTimeSeperationBeforeCorrect
    "WorkerFactoryThreadCreationTimeout" = 10; // ExpWorkerFactoryThreadCreationTimeoutInSeconds
    "WorkerFactoryThreadIdleTimeout" = 67; // ExpWorkerFactoryThreadIdleTimeoutInSeconds
    "WorkerThreadTimeoutInSeconds" = 600; // ExpWorkerThreadTimeoutInSeconds
    "TickcountRolloverDelay" = 0; // ? (InitTickRolloverDelay) - InitTickRolloverDelay <> 24848b00, InitTickRolloverDelayLength <> 5e4130c4, InitTickRolloverDelayType <> e2894460

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power";
    "FlushPolicy" = 0; // PopFlushPolicy
    "IdleScanInterval" = 30; // PopIdleScanInterval
    "SkipTickOverride" = 1; // PopSkipTickPolicy
    "SleepStudyDeviceAccountingLevel" = 4; // PopSleepStudyDeviceAccountingLevel
    "SleepStudyDisabled" = 0; // PopSleepStudyDisabled
    "WatchdogResumeTimeout" = 120; // PopWatchdogResumeTimeout
    "WatchdogSleepTimeout" = 300; // PopWatchdogSleepTimeout
    "Win32CalloutWatchdogBugcheckEnabled" = 0; // PopWin32CalloutWatchdogBugcheckEnabled

    // PopOpenPowerKey
    "AwayModeEnabled" = 0; // REG_DWORD, range 0-1
    "HiberbootEnabled" = 1; // REG_DWORD, range 0-1
    "KernelResumeIoCpuTime" = 0; // REG_DWORD, milliseconds, range 0-4294967295
    "MaxHuffRatio" = 1; // REG_DWORD, range 1-98
    "MultiPhaseResumeDisabled" = 0; // REG_DWORD, range 0-1
    "SystemPowerPolicy" = "<STRUCT 232 BYTES>"; // REG_BINARY

    // HybridBootAnimationTime records the boot animation duration during fast boot, HiberIoCpuTime is CPU time spent on hibernation I/O during resume, ResumeCompleteTimestamp is the system timestamp when resume from hibernation completed. So all of them are just counters and changing their data won't affect the boot.
    "HybridBootAnimationTime" = 1601; // REG_DWORD, milliseconds, range: 0-0xFFFFFFFF
    "HiberIoCpuTime" = 0; // REG_DWORD, milliseconds, range: 0-0xFFFFFFFF
    "ResumeCompleteTimestamp" = 0; // REG_QWORD, range: 0-0xFFFFFFFFFFFFFFFF

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
  "Enabled"; // REG_DWORD, 0 = disable, nonzero = enable (global)

// Miscellaneous values

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA";
    "AuditBaseDirectories" = 0; // ObpAuditBaseDirectories
    "AuditBaseObjects" = 0; // ObpAuditBaseObjects

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA\\audit";
    "ProcessAccessesToAudit" = 0; // SepProcessAccessesToAudit

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation";
    "ActiveTimeBias" = ?; // dword_140FCE974
    "Bias" = 480; // ExpAltTimeZoneBias
    "RealTimeIsUniversal" = 0; // ExpRealTimeIsUniversal

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\I/O System";
    "DisableDiskCounters" = 0; // PsDisableDiskCounters
    "IoAllowLoadCrashDumpDriver" = 0; // IopAllowLoadCrashDumpDriver
    "IoBlockLegacyFsFilters" = 0; // IopBlockLegacyFsFilters
    "IoCaseInsensitive" = 1; // IopCaseInsensitive
    "IoEnableSessionZeroAccessCheck" = 0; // IopSessionZeroAccessCheckEnabled
    "IoFailZeroAccessCreate" = 1; // IopFailZeroAccessCreate
    "IoIrpCompletionTimeoutInSeconds" = 300; // IopIrpCompletionTimeoutInSeconds
    "IoKeepAliveTimeMs" = 5000; // IopKeepAliveTimeMs
    "LargeIrpStackLocations" = 14; // IopLargeIrpStackLocations
    "MediumIrpStackLocations" = 2; // IopMediumIrpStackLocations
    "RequireDeviceAccessCheck" = 1; // IopRequireDeviceAccessCheck

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Configuration Manager";
    "BugcheckRecoveryEnabled" = 0; // CmBugcheckRecoveryEnabled
    "CallbackMemoryFromPerProcLookaside" = 1; // CmpAllocateCallbackMemoryFromPerProcLookaside
    "CallbackMemoryFromPool" = 0; // CmpAllocateCallbackMemoryFromPool
    "DelayCloseSize" = 2048; // CmpDelayedCloseSize
    "Enabled" = 0; // CmpLKGEnabled
    "EnablePeriodicBackup" = 0; // CmpDoIdleProcessing, https://learn.microsoft.com/en-us/troubleshoot/windows-client/installing-updates-features-roles/system-registry-no-backed-up-regback-folder#more-information
    "FastBoot" = 1; // CmFastBoot
    "FreezeThawTimeoutInSeconds" = 60; // CmFreezeThawTimeoutInSeconds
    "RegistryFlushGlobalFlags" = 0; // CmpGlobalFlushControlFlags
    "RegistryLazyFlushBootDelay" = 60; // CmpEnableLazyFlushBootDelayInterval
    "RegistryLazyFlushInterval" = 60; // CmpLazyFlushIntervalInSeconds
    "RegistryLazyLocalizeInterval" = 60; // CmpLazyLocalizeIntervalInSeconds
    "RegistryLazyReconcileInterval" = 3600; // CmpLazyReconcileIntervalInSeconds
    "RegistryLogFileSizeCap" = 0; // CmpLogFileSizeCap
    "RegistryReorganizationLimit" = 1048576; // CmpReorganizeLimit
    "RegistryReorganizationLimitDays" = 7; // CmpReorganizeDelayDays
    "SelfHealingEnabled" = 1; // CmSelfHeal
    "SystemHiveLimitSize" = 1610612736; // CmSystemHiveLimitSize
    "VirtualizationEnabled" = 1; // CmVEEnabled
    "VolatileBoot" = 0; // CmpVolatileBoot

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\StateSeparation\\Policy";
    "AllHivesVolatile" = 0; // CmStateSeparationAllHivesVolatile
    "DevelopmentMode" = 0; // CmStateSeparationDevMode
    "Enabled" = 0; // CmStateSeparationEnabled

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\ValidationRunlevels";
    "Global" = 1210938368; // CmGlobalValidationRunlevel

"HKLM\\System\\CurrentControlSet\\Control\\Processor";
    "AllowGuestPerfStates" = 0;
    "AllowPepPerfStates" = 0;
    "Capabilities" = 0; // capability mask
    "DisableAsserts" = 0;
    "Overrides" = 0;
```

## Capabilities

`Globals[0]` is the capability mask that shows what the system supports, `qword_1C00124C8` = `Capabilities` value. `Globals[0] &= ~qword_1C00124C8` removes active capability bits which are set in the registry value, so `Capabilities` is a kind of disable mask.

```c
// ProcLibGlobalInit

GetRegistryQwordValue(v13, v12, &qword_1C00124C8); // Capabilities var


if ( qword_1C00124C8 )
{
  DisplayPPMFlags(~qword_1C00124C8, 5u);
  Globals[0] &= ~qword_1C00124C8;
}
```

### DisplayPPMFlags

Most masks below are the same for `amdppm`/`intelppm`, the labels are from [`DisplayPPMFlags`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/amdppm/DisplayPPMFlags.c) WPP metadata extracted via [`tracepdb`](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/tracepdb).

| Mask | `DisplayPPMFlags` label |
| --- | --- |
| `0x0000000000000001` | ACPI 1.0 C1 |
| `0x0000000000000002` | ACPI 1.0 C2 |
| `0x0000000000000004` | ACPI 1.0 C3 |
| `0x0000000000100000` | ACPI 1.0 IO TStates |
| `0x0000000000200000` | ACPI 1.0 MP TStates |
| `0x0000000000000010` | ACPI 2.0+ C1 |
| `0x0000000000000020` | ACPI 2.0+ C2 |
| `0x0000000000000040` | ACPI 2.0+ C3 |
| `0x000000000007F000` | ACPI 2.0+ MWAIT C-States |
| `0x0000080000000000` | ACPI 2.0+ LPI states IO |
| `0x0000020000000000` | ACPI 2.0+ LPI states MW |
| `0x0000040000000000` | ACPI 2.0+ LPI states PSCI |
| `0x00000E0000000000` | ACPI 2.0+ LPI states |
| `0x0000000001000000` | ACPI 2.0+ TStates IO |
| `0x0000000002000000` | ACPI 2.0+ TStates FFH |
| `0x0000000010000000` | ACPI 2.0+ PStates IO |
| `0x0000000020000000` | ACPI 2.0+ PStates FFH |
| `0x0000000040000000` | ACPI 2.0+ PStates XPSS |
| `0x0000000080000000` | ACPI 2.0+ Legacy PCC |
| `0x0000000008000000` | ACPI 2.0+ CPC |
| `0x0000004000000000` | ACPI 2.0+ CPC Interrupt (not used by `amdppm`?) |
| `0x0000000004000000` | ACPI 2.0+ HW Feedback |
| `0x0000000100000000` | PEP Mini-PEP Idle |
| `0x0000000200000000` | PEP Micro-PEP Idle |
| `0x0000000000000300` | PEP C-State Idle |
| `0x0000100000000000` | PEP LPI Idle |
| `0x0000000000000400` | PEP Park pref |
| `0x0000001000000000` | PEP Perf states |
| `0x0000010000000000` | PEP Notifications |
| `0x0000200000000000` | Driver Hidden Processors |
| `0x0000400000000000` | Driver VM Perf Control (not used by `amdppm`?) |
| `0x0000000800000000` | Driver Hardware Debug |
| `0x0000002000000000` | Driver Energy Estimation |

Additional masks I found that aren't in `DisplayPPMFlags`:

| Mask | Meaning |
| --- | --- |
| [`0x0000000000800000`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/amdppm/InitAcpiProcessorDomains.c) | ACPI processor domain init |
| [`0x00000010FF300000`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/amdppm/ValidatePerfDomainSymmetry.c) | performance domain validation/registration |
| [`0x0000800000000000`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/amdppm/EmiInit.c) | EMI init |
| [`0x0001000000000000`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/intelppm/InitDriver.c) | Energy counter init (not used by `amdppm`?) |

### tracepdb

Short explanation of how to get the `DisplayPPMFlags` labels:

```powershell
.\tracepdb.exe -f "C:\Symbols\amdppm.pdb\0728D8E84177E8B0FCF8B265B1C92A591\amdppm.pdb" -p "$env:USERPROFILE\Desktop\tmf" -v
```

In [`DisplayPPMFlags`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/amdppm/DisplayPPMFlags.c) you can see the many masks + GUIDs + hex numbers, example:

```c
if ( a2 < 5u
  || LOWORD(WPP_GLOBAL_Control->DeviceType) )
{
  if ( (a1 & 0x2000000000LL) == 0 ) // mask
    v4 = "Dis";
  WPP_RECORDER_SF_s(
    (__int64)WPP_GLOBAL_Control->DeviceExtension,
    a2,
    2u,
    0x64u, // 100
    (__int64)&WPP_6d86976f8bee3b8eeb87bd96dd02b852_Traceguids, // 6d86976f-8bee-3b8e-eb87-bd96dd02b852.tmf
    v4);
}
```

```tmf
}
#typev Unknown_cxx00 100 "%0  Energy Estimation  = %10!s!abled" //   LEVEL=DbgLevel FLAGS=PLATFORMINFO FUNC=DisplayPPMFlags
{
```

### Default Data & Globals

See '[DriverStart + RVAs](https://noverse.dev/docs/win-config/system/mmcss-values/#driverstart--rvas)' whenever you want to read the current value on your system (you can get the variable name by looking at callers of `GetRegistryQwordValue` in `amdppm`/`intelppm`).

```c
lkd> lm m amdppm
Browse full module list
start             end                 module name
fffff801`a9130000 fffff801`a9176000   amdppm     (pdb symbols)          C:\ProgramData\Dbg\sym\amdppm.pdb\0728D8E84177E8B0FCF8B265B1C92A591\amdppm.pdb

// .data:00000001C00124C8 qword_1C00124C8 dq 0

lkd> dq fffff801`a91424c8 L1
fffff801`a91424c8  00000000`00000000
```

```c
// .data:00000001C00124C0 Globals         dq 0

lkd> dq fffff801`a91424c0 L1
fffff801`a91424c0  0000bb8c`bdd7f677
```

## TimerCheckFlags

```asm
INIT:0000000140BA1A70                 dq offset aSessionManager_5 ; "Session Manager\\Kernel"
INIT:0000000140BA1A78                 dq offset aTimercheckflag ; "TimerCheckFlags"
INIT:0000000140BA1A80                 dq offset KeTimerCheckFlags
```

`KeTimerCheckFlags` is used by [KeCheckForTimer](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/KeCheckForTimer.c), only bit `0` seems to be meaningful, means any value with that bit set should behave like `1`.

### [KeCheckForTimer](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/KeCheckForTimer.c)

That function checks active timer tables for a timer object/DPC object/DPC routine related to the memory range being checked.

```c
// KeCheckForTimer

result = KeTimerCheckFlags;
if ( (KeTimerCheckFlags & 1) != 0 ) // bit 0 set = check enabled
{
  BugCheckParameter4 = BugCheckParameter3 + a2; // end of the checked range
  result = KeQueryActiveProcessorCountEx(0xFFFFu); // active processor count
```

If `KeTimerCheckFlags & 1` isn't set, the function returns without checking timer tables. When enabled, it checks each active processors timer tables for these addresses:

```c
// KeCheckForTimer

if ( v16 > v15 && v16 < BugCheckParameter4 )
  KeBugCheckEx(0xC7u, 0LL, v16, BugCheckParameter3, BugCheckParameter4); // timer object (parameter 1 = 0x0)

if ( v17 > v15 && v17 < BugCheckParameter4 )
  KeBugCheckEx(0xC7u, 1uLL, v17, BugCheckParameter3, BugCheckParameter4); // DPC object (parameter 1 = 0x1)

if ( v18 >= BugCheckParameter3 && v18 < BugCheckParameter4 )
  KeBugCheckEx(0xC7u, 2uLL, v18, BugCheckParameter3, BugCheckParameter4); // DPC routine (parameter 1 = 0x2)
```

The second argument to `KeBugCheckEx` = parameter 1 in the `0xC7` ([`TIMER_OR_DPC_INVALID`](https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/debugger/bug-check-0xc7--timer-or-dpc-invalid.md)) bugcheck.

```cpp
VOID KeBugCheckEx(
  [in] ULONG     BugCheckCode,
  [in] ULONG_PTR BugCheckParameter1,
  [in] ULONG_PTR BugCheckParameter2,
  [in] ULONG_PTR BugCheckParameter3,
  [in] ULONG_PTR BugCheckParameter4
);
```

#### [TIMER_OR_DPC_INVALID](https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/debugger/bug-check-0xc7--timer-or-dpc-invalid.md)

*The `TIMER_OR_DPC_INVALID` bug check has a value of `0x000000C7`. This is issued if a kernel timer or deferred procedure call (DPC) is found somewhere in memory where it is not permitted. This condition is usually caused by a driver failing to cancel a timer or DPC before freeing the memory where it resides.*

| Parameter 1 | Parameter 2 | Parameter 3 | Parameter 4 | Cause of error |
| --- | --- | --- | --- | --- |
| `0x0` | Address of the timer object | Start of memory range being checked | End of memory range being checked | The timer object was found in a block of memory where a timer object is not permitted. . |
| `0x1` | Address of the DPC object | Start of memory range being checked | End of memory range being checked | The DPC object was found in a block of memory where a DPC object is not permitted. |
| `0x2` | Address of the DPC routine | Start of memory range being checked | End of memory range being checked | The DPC routine was found in a block of memory where a DPC object is not permitted. |
| `0x3` | Address of the DPC object | Processor number | Number of processors in the system | The processor number for the DPC object is not correct. |
| `0x4` | Address of the DPC routine | The thread's APC disable count before the kernel calls the DPC routine | The thread's APC disable count after the DPC routine is called | The thread's APC disable count was changed during DPC routine execution.<br><br>The APC disable count is decremented each time a driver calls **KeEnterCriticalRegion**, **FsRtlEnterFileSystem**, or acquires a mutex.<br><br>The APC disable count is incremented each time a driver calls **KeLeaveCriticalRegion**, **KeReleaseMutex**, or **FsRtlExitFileSystem**. |
| `0x5` | Address of the DPC routine | The thread's APC disable count before the kernel calls the DPC routine | The thread's APC disable count after the DPC routine is called | The thread's APC disable count was changed during the execution of timer DPC routine.<br><br>The APC disable count is decremented each time a driver calls **KeEnterCriticalRegion**, **FsRtlEnterFileSystem**, or acquires a mutex.<br><br>The APC disable count is incremented each time a driver calls **KeLeaveCriticalRegion**, **KeReleaseMutex**, or **FsRtlExitFileSystem**. |

#### Callers

Pool free checks (in [ExpFreePoolChecks](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/ExpFreePoolChecks.c) & [ExFreeHeapPool](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/ExFreeHeapPool.c)) call [KeCheckForTimer](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/KeCheckForTimer.c) (only when `ExpPoolFlags & 1` is set?):

```c
// ExpFreePoolChecks / ExFreeHeapPool

if ( (ExpPoolFlags & 1) != 0 )
  KeCheckForTimer(BugCheckParameter3);
```

[VfMiscKeInitializeTimerEx_Entry](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/VfMiscKeInitializeTimerEx_Entry.c) calls [KeCheckForTimer](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/KeCheckForTimer.c) for the timer object range ([only until `11-23H2`](https://noverse.dev/bin-diff?left=11-23H2&right=11-25H2&module=ntoskrnl&function=KeCheckForTimer.c&mode=side-by-side), builds above use [ViMiscValidateSynchronizationObject](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-25H2/ntoskrnl/ViMiscValidateSynchronizationObject.c)).

```c
// VfMiscKeInitializeTimerEx_Entry (23H2)

if ( (VfRuleClasses & 0x400000) == 0 )
  return KeCheckForTimer(*(_QWORD *)(a1 + 16), 64LL); // timer object 64 byte range check
```

```c
// VfMiscKeInitializeTimerEx_Entry (25H2)

return ViMiscValidateSynchronizationObject(*(_QWORD *)(a1 + 16));
```

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
