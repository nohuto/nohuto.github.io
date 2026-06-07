---
title: 'Power Values'
description: 'Power option documentation from win-config.'
editUrl: false
sidebar:
  order: 4
---

Several values are applied, some have been changed, others are default values. The applied data is sometimes pure speculation. No values are applied that apply to other options in this section.

## Registry Values

See [power-symbols](https://github.com/nohuto/win-config/tree/main/power/assets/power/power-symbols.txt) for reference ([sym-dump](https://github.com/nohuto/sym-dump)). The list doesn't include all existing values yet, but the listed ones do exist. [assets/power](https://github.com/nohuto/win-config/tree/main/power/assets/power) contains the split pseudocode for several `Session Manager\\Power` values.

Everything listed below is based on personal findings, mistakes may exist.

| Prefix | Component |
| --- | --- |
| `PoFx` | Power Framework |
| `Pop` | Power Manager |
| `Ppm` | Processor Power Manager |

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "ActiveIdleLevel" = 1; // PopFxActiveIdleLevel 
    "ActiveIdleThreshold" = 5000000; // PopFxActiveIdleThreshold (0x004C4B40) 
    "ActiveIdleTimeout" = 1000; // PopFxActiveIdleTimeout (0x000003E8) 
    "AllowAudioToEnableExecutionRequiredPowerRequests" = 1; // PopPowerRequestActiveAudioEnablesExecutionRequired 
    "AllowHibernate" = 4294967295; // PopAllowHibernateReg, REG_DWORD
    "AllowSystemRequiredPowerRequests" = 1; // PopPowerRequestConvertSystemToExecution 
    "AlwaysComputeQosHints" = 0; // PpmPerfAlwaysComputeQosEnabled 
    "BootHeteroPolicyOverride" = 0; // PpmPerfBootHeteroPolicyOverrideEnabled 
    "CheckpointSystemSleep" = 0; // PopCheckpointSystemSleepEnabledReg 
    "CheckpointSystemSleepSimulateFlags" = 0; // PopCheckpointSystemSleepSimulateFlags 
    "CheckPowerSourceAfterRtcWakeTime" = 30; // PopCheckPowerSourceAfterRtcWakeTime (0x1E) 
    "Class1InitialUnparkCount" = 64; // PpmParkInitialClass1UnParkCount (0x40) 
    "CoalescingFlushInterval" = 60; // PopCoalescingFlushInterval (0x0000003C) 
    "CoalescingTimerInterval" = 1500; // PopCoalescingTimerInterval (0x000005DC) - Units: seconds (multiplies value by -10,000,000, one second in 100?ns units, so the default corresponds to a 25min cadence)
    "DeepIoCoalescingEnabled" = 0; // PopDeepIoCoalescingEnabled 
    "DirectedDripsAction" = 3; // PopDirectedDripsAction 
    "DirectedDripsDebounceInterval" = 120; // PopDirectedDripsDebounceInterval (0x78) 
    "DirectedDripsDfxEnforcementPolicy" = 1; // PopDirectedDripsDfxEnforcementPolicy 
    "DirectedDripsOverride" = 4294967295; // PopDirectedDripsOverride (4294967295)
    "DirectedDripsSurprisePowerOnTimeout" = 5; // PopDirectedDripsSurprisePowerOnTimeoutSeconds 
    "DirectedDripsTimeout" = 300; // PopDirectedDripsTimeout (0x12C) 
    "DirectedDripsWaitWakeTimeout" = 5; // PopDirectedDripsWaitWakeTimeoutSeconds 
    "DirectedFxDefaultTimeout" = 120; // PopFxDirectedFxDefaultTimeout (0x00000078) 
    "DisableDisplayBurstOnPowerSourceChange" = 0; // PopDisableDisplayBurstOnPowerSourceChange 
    "DisableIdleStatesAtBoot" = 0; // PpmIdleDisableStatesAtBoot 
    "DisableInboxPepGeneratedConstraints" = 4294967295; // PopDisableInboxPepGeneratedConstraintsOverride (4294967295)
    "DisableVsyncLatencyUpdate" = 0; // PpmDisableVsyncLatencyUpdate 
    "DozeDeferralChecksToIgnore" = 0; // PopDozeDeferralChecksToIgnore 
    "DozeDeferralMaxSeconds" = 259200; // PopDozeDeferralMaxSeconds (0x0003F480) 
    "DripsCallbackInterval" = 35; // PopDripsCallbackInterval (0x23) 
    "DripsSwHwDivergenceEnableLiveDump" = 0; // PopDripsSwHwDivergenceEnableLiveDump 
    "DripsSwHwDivergenceThreshold" = 270; // PopDripsSwHwDivergenceThreshold (0x010E) 
    "DripsWatchdogAction" = 198; // PopDripsWatchdogAction (0xC6) 
    "DripsWatchdogDebounceInterval" = 120; // PopDripsWatchdogDebounceInterval (0x78) 
    "DripsWatchdogTimeout" = 300; // PopDripsWatchdogTimeout (0x12C) 
    "EnableInputSuppression" = 4294967295; // PopEnableInputSuppressionOverride (4294967295)
    "EnableMinimalHiberFile" = 0; // PopEnableMinimalHiberFile, REG_DWORD
    "EnablePowerButtonSuppression" = 4294967295; // PopEnablePowerButtonSuppressionOverride (4294967295)
    "EnergyEstimationEnabled" = 1; // PopEnergyEstimationEnabled 
    "EnforceAusterityMode" = 0; // PopEnforceAusterityMode 
    "EnforceConsoleLockScreenTimeout" = 0; // PopEnforceConsoleLockScreenTimeout 
    "EnforceDisconnectedStandby" = 0; // PopEnforceDisconnectedStandby 
    "EventProcessorEnabled" = 1; // PopEventProcessorEnabled 
    "ExitLatencyCheckEnabled" = 0; // PpmExitLatencyCheckEnabled 
    "ExperimentalClusterIdleMitigation" = 0; // PpmIdleClusterIdleMitigation 
    "ForceMinimalHiberFile" = 0; // PopForceMinimalHiberFile, REG_DWORD
    "FxAccountingTelemetryDisabled" = 0; // PopDiagFxAccountingTelemetryDisabled 
    "FxRuntimeLogNumberEntries" = 64; // PopFxRuntimeLogNumberEntries (0x40) - Changing it to 0 will end up with a BSoD
    "HeteroFavoredCoreRotationTimeoutMs" = 30000; // PpmHeteroFavoredCoreRotationTimeoutMs (0x00007530) 
    "HeteroHgsEePerfHintsIndependentEnabled" = 0; // PpmHeteroHgsEePerfHintsIndependentEnabled 
    "HeteroHgsPlusDisabled" = 0; // PpmHeteroHgsThreadDisabled 
    "HeteroMultiClassParkingEnabled" = 4294967295; // PpmHeteroMultiClassParkingRegValue (4294967295)
    "HeteroMultiCoreClassesEnabled" = 4294967295; // PpmHeteroMultiCoreClassesRegValue (4294967295)
    "HeteroWpsContainmentEnumOverride" = 0; // PpmHeteroWpsContainmentEnumOverride 
    "HeteroWpsWorkloadProminenceCutoff" = 35; // PpmHeteroWpsWorkloadProminenceCutoff (0x23) 
    "HiberbootEnabled" = 1; // PopHiberbootEnabledReg 
    "HiberFileSizePercent" = 100; // PopHiberFileSizePercent, REG_DWORD, 0-39 keeps the type logic, 40-100 uses the percent directly and PopSetHiberFileSize forces a full file
    "HiberFileType" = 4294967295; // PopHiberFileTypeReg (4294967295), DWORD 1 = Reduced, DWORD 2 = Full, only used while HiberFileSizePercent < 40
    "HiberFileTypeDefault" = 4294967295; // PopHiberFileTypeDefaultReg (4294967295), fallback when HiberFileType is unset
    "HibernateBootOptimizationEnabled" = 0; // PopHiberBootOptimizationEnabledReg 
    "HibernateChecksummingEnabled" = 1; // PopHiberChecksummingEnabledReg 
    "HibernateEnabledDefault" = 1; // PopHiberEnabledDefaultReg, REG_DWORD
    "HibernateEnabled" = 1; // that's the value 'powercfg /hibernate off' would set
    "HighPerfDurationBoot" = 90000; // PpmHighPerfDuration (0x00015F90) 
    "HighPerfDurationCSExit" = ?; // unk_140FC337C
    "HighPerfDurationSxExit" = ?; // unk_140FC3380
    "IdleDurationExpirationTimeout" = 4; // PpmIdleDurationExpirationTimeoutMs 
    "IdleProcessorsRequireQosManagement" = 4294967295; // PpmPerfQosManageIdleProcessors (4294967295)
    "IdleStateTimeout" = 500; // PopPepIdleStateTimeout (0x000001F4) 
    "IgnoreCsComplianceCheck" = 0; // PopIgnoreCsComplianceCheck 
    "IgnoreLidStateForInputSuppression" = 4294967295; // PopLidStateForInputSuppressionOverride (4294967295)
    "IpiLastClockOwnerDisable" = 0; // PpmIpiLastClockOwnerDisable 
    "LatencyToleranceDefault" = 100000; // PpmLatencyToleranceLimit (0x000186A0) 
    "LatencyToleranceFSVP" = 20000; // dword_140FC3428 dd 4E20
    "LatencyToleranceIdleResiliency" = 1500000; // dword_140FC342C dd 16E360
    "LatencyToleranceParked" = 0; // PpmIdleParkedLatencyLimit 
    "LatencyToleranceSoftParked" = 0; // PpmIdleSoftParkedLatencyLimit 
    "LatencyToleranceVSyncEnabled" = 13001; // dword_140FC3424 dd 32C9
    "LidReliabilityState" = 1; // REG_DWORD, range 0-1
    "ManualDimTimeout" = 0; // PopAdaptiveManualDimTimeout 
    "MaximumFrequencyOverride" = 0; // PpmFrequencyOverride 
    "MfBufferingThreshold" = 0; // PpmMfBufferingThreshold 
    "MfOverridesDisabled" = 1; // PpmMfOverridesDisabled 
    "MSDisabled" = 0; // PopModernStandbyDisabled 
    "MultiparkGranularity" = 8; // PpmParkMultiparkGranularity 
    "PdcIdlePhaseDefaultWatchdogTimeoutSeconds" = 30; // PopPdcIdlePhaseDefaultWatchdogTimeoutSeconds (0x0000001E) 
    "PdcOneWayEntry" = 0; // PopPowerAggregatorOneWayEntry 
    "PerfArtificialDomain" = 4294967295; // PpmPerfArtificialDomainSetting (4294967295)
    "PerfBoostAtGuaranteed" = 0; // PpmPerfBoostAtGuaranteed 
    "PerfCalculateActualUtilization" = 1; // PpmPerfCalculateActualUtilization 
    "PerfCheckTimerImplementation" = 0; // PpmCheckTimerImplementation 
    "PerfIdealAggressiveIncreasePolicyThreshold" = 90; // PpmPerfIdealAggressiveIncreaseThreshold (0x5A) 
    "PerfQueryOnDevicePowerChanges" = 0; // PopFxPerfQueryOnDevicePowerChanges 
    "PerfSingleStepSize" = 5; // PpmPerfSingleStepSize (0x05) 
    "PlatformAoAcOverride" = 4294967295; // PopPlatformAoAcOverride (4294967295)
    "PlatformRoleOverride" = 4294967295; // PopPlatformRoleOverride (4294967295)
    "PoFxSystemIrpWaitForReportDevicePowered" = 0; // PopPoFxSystemIrpWaitForReportDevicePoweredReg 
    "PowerActionResumeWatchdogTimeoutDefault" = 300; // PopPowerActionResumingWatchdogTimeoutDefault (0x0000012C) 
    "PowerActionTransitioningWatchdogTimeoutDefault" = 600; // PopPowerActionTransitioningWatchdogTimeoutDefault (0x00000258) 
    "PromoteHibernateToShutdown" = 0; // PopPromoteHibernateToShutdown 
    "ProximityEscapeMsec" = 0; // TtmpProximityEscapeMsec 
    "RestrictedStandbyDozeTimeoutSeconds" = 0; // PopPowerAggregatorRestrictedStandbyDozeTimeoutSeconds 
    "SkipHibernateMemoryMapValidation" = 4294967295; // PopEnableHibernateMemoryMapValidationOverride (4294967295) 
    "SleepstudyAccountingEnabled" = 1; // SleepstudyHelperAccountingEnabled 
    "SleepstudyGlobalBlockerLimit" = 3000; // SleepstudyHelperBlockerGlobalLimit (0x0BB8) 
    "SleepstudyLibraryBlockerLimit" = 200; // SleepstudyHelperBlockerLibraryLimit (0xC8) 
    "SmartUserPresenceAction" = 0; // PopSmartUserPresenceAction 
    "SmartUserPresenceCheckTimeout" = 10800; // PopSmartUserPresenceCheckTimeout (0x00002A30) 
    "SmartUserPresenceGracePeriod" = 1800; // PopSmartUserPresenceGracePeriod (0x00000708) 
    "SmartUserPresenceWakeOffset" = 300; // PopSmartUserPresenceWakeOffset (0x0000012C) 
    "StandbyConnectivityGracePeriod" = 0; // PopStandbyConnectivityGracePeriod 
    "SuppressResumePrompt" = 0; // PopSuppressResumePrompt 
    "ThermalPollingMode" = 0; // PopThermalPollingMode 
    "ThermalTelemetryVerbosity" = 1; // PopThermalTelemetryVerbosity 
    "TimerRebaseThresholdOnDripsExit" = 60; // PopTimerRebaseThresholdRegValue (0x3C) 
    "TtmEnabled" = 0; // TtmpEnabled 
    "UserBatteryChargeEstimator" = 0; // PopUserBatteryChargingEstimator 
    "UserBatteryDischargeEstimator" = 0; // PopDisableBatteryDischargeEstimator 
    "WatchdogWorkOrderTimeout" = 300000; // PopFxWatchdogWorkOrderTimeout (0x000493E0) 
    "Win32kCalloutWatchdogTimeoutSeconds" = 30; // PopWin32kCalloutWatchdogTimeoutSeconds (0x0000001E) 

    // UmpoRestoreEsOverrideState
    "EnergySaverState" = 2; // 1 = override state (more power savings) if != 1 no override? (WNF_PO_ENERGY_SAVER_OVERRIDE/WNF_SEB_ENERGY_SAVER_STATE_V2), this value is controlled by System > Power: Always use energy saver (1=on, 2=off)

    // InitializePowerWatchdogTimeoutDefaults
    "PowerWatchdogDrvSetMonitorTimeoutMsec" = 10000;
    "PowerWatchdogDwmSyncFlushTimeoutMsec" = 30000;
    "PowerWatchdogPoCalloutTimeoutMsec" = 10000;
    "PowerWatchdogPowerOnGdiTimeoutMsec" = 30000;
    "PowerWatchdogRequestQueueTimeoutMsec" = 30000;

    // from procmon boot trace
    "DisableHotKeyWhenConsoleOff" = ?;
    "EmiPollingInterval" = ?;
    "EmiTelemetryActivePollingInterval" = ?;
    "EmiTelemetryCsPollingInterval" = ?;
    "LidNotifyReliable" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\ForceHibernateDisabled";
    "GuardedHost" = 0; // unk_140FC5234, if nonzero, PopHibernateEvaluation treats hibernation as force disabled
    "Policy" = 0; // PopHiberForceDisabledReg, ^

// Percent<MemoryBucket><Type>, PopCalculateHiberFileSize uses the first matching RAM bucket then uses Full or Reduced percentage (when HiberFileSizePercent < 40)
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\HiberFileBucket";
    "Percent16GBFull" = 40; // unk_140FC36D0
    "Percent16GBReduced" = 20; // unk_140FC36CC
    "Percent1GBFull" = 40; // unk_140FC3670
    "Percent1GBReduced" = 20; // unk_140FC366C
    "Percent2GBFull" = 40; // unk_140FC3688
    "Percent2GBReduced" = 20; // unk_140FC3684
    "Percent32GBFull" = 40; // unk_140FC36E8
    "Percent32GBReduced" = 20; // unk_140FC36E4
    "Percent4GBFull" = 40; // unk_140FC36A0
    "Percent4GBReduced" = 20; // unk_140FC369C
    "Percent8GBFull" = 40; // unk_140FC36B8
    "Percent8GBReduced" = 20; // unk_140FC36B4
    "PercentUnlimitedFull" = 40; // unk_140FC3700
    "PercentUnlimitedReduced" = 20; // unk_140FC36FC

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\ModernSleep";
    "EnabledActions" = 0; // PopAggressiveStandbyActionsRegValue 
    "EnableDsNetRefresh" = 0; // PopEnableDsNetRefresh 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling";
    "PowerThrottlingOff" = 0; // PpmPerfQosGroupPolicyDisable 
```

## [PowerThrottlingOff](https://noverse.dev/policies?p=Power*PowerThrottlingTurnOff)

> "*The Quality of Service (QoS) associated with a thread is used to indicate the desired performance and power efficiency. Each thread is assigned to a QoS level. While scheduling priority remains the main metric by which the system determines which thread to schedule next, QoS can influence core selection and processor power management. On platforms with heterogeneous processors, the QoS of a thread may restrict scheduling to a subset of processors, or indicate a preference for a particular class of processor.*"
>
> — Microsoft, [Quality of Service](https://learn.microsoft.com/en-us/windows/win32/procthread/quality-of-service)

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling";
    "PowerThrottlingOff" = 0; // PpmPerfQosGroupPolicyDisable
```

See current value using WinDbg:

```c
dd nt!PpmPerfQosGroupPolicyDisable L1
```

### Processor QoS

[`PopInitializeHeteroProcessors`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PopInitializeHeteroProcessors.c) decides whether PPM (processor power management) QoS is allowed:

```c
// PopInitializeHeteroProcessors

v4 = 0;
if ( (PpmBackgroundProfile || PpmEntryLevelPerfProfile || PpmMultimediaQosProfile || PpmPerfAlwaysComputeQosEnabled)
  && PpmPerfSchedulerDirectedPerfStatesSupported
  && KeQueryActiveProcessorCountEx(0) >= 2 )
{
  v4 = 1;
}
if ( PpmPerfVmQosSupported )
{
  v4 = 1;
  goto LABEL_13;
}
if ( v4 )
{
LABEL_13:
  v5 = 1;
  if ( !PpmPerfQosGroupPolicyDisable ) // leave QoS allowed unless PowerThrottlingOff is nonzero
    goto LABEL_15;
}
v5 = 0;
LABEL_15:
```

A nonzero `PowerThrottlingOff` forces `v5` ("allow state") to `0`, which gets passed into [`KeConfigureHeteroProcessors`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/KeConfigureHeteroProcessors.c) and stored in `PpmPerfQosSupportedAndAllowed`.

```c
db nt!PpmPerfQosSupportedAndAllowed L1
```

`v4` gets set when one of `PpmBackgroundProfile`, `PpmEntryLevelPerfProfile`, `PpmMultimediaQosProfile`, `PpmPerfAlwaysComputeQosEnabled`, `PpmPerfSchedulerDirectedPerfStatesSupported` is nonzero & `KeQueryActiveProcessorCountEx(0) >= 2`. It would also get set if `PpmPerfVmQosSupported` is true ([`PpmCheckInitProcessors`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PpmCheckInitProcessors.c) sets it to `1` when a hypervisor is present and [`HvlIsRootPowerSchedulerQosPresent`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/HvlIsRootPowerSchedulerQosPresent.c) returns true).

```c
dq nt!PpmBackgroundProfile L1
dq nt!PpmEntryLevelPerfProfile L1
dq nt!PpmMultimediaQosProfile L1
db nt!PpmPerfAlwaysComputeQosEnabled L1
db nt!PpmPerfSchedulerDirectedPerfStatesSupported L1
dq nt!KeActiveProcessors+8 L1
db nt!PpmPerfVmQosSupported L1
```

I currently don't know if the `KeActiveProcessors` offset is the same for all builds, look at it on your own via:

```c
uf nt!KeQueryActiveProcessorCountEx
```

### QoS Policies

[`PpmPerfCalculateQosClassPolicies`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PpmPerfCalculateQosClassPolicies.c) also uses the value:

```c
// PpmPerfCalculateQosClassPolicies
if ( PpmPerfQosGroupPolicyDisable )
  v16 |= 0x100u; // PowerThrottlingOff on
```

A nonzero value adds flag `0x100` & skips the remaining policy part for that class.

### Idle Duration Expiration

`v5 = 0` can also prevent one call to [`PpmIdleEnableIdleDurationExpirationTimeout`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PpmIdleEnableIdleDurationExpirationTimeout.c):

```c
// PopInitializeHeteroProcessors
if ( v5 )
  PpmIdleEnableIdleDurationExpirationTimeout();
```

That helper sets `PpmIdleDurationExpirationTimeout`, [`PoExecuteIdleCheck`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PoExecuteIdleCheck.c) returns instantly when this value is `0` ([`PpmInstallNewIdleStates`](https://github.com/nohuto/decompiled-pseudocode/tree/main/11-23H2/ntoskrnl/PpmInstallNewIdleStates.c) could also set it).

```c
dd nt!PpmIdleDurationExpirationTimeout L1
```

Everything above is based on 23H2, things changed a bit on 24H2, e.g. `PpmEcoQosProfile`/`PpmUtilityQosProfile` got added, but other parts seem to work the same.

## Suboptions

`Disable D3 in Modern Standby` isn't in the power key, but since the first suboption is already related to ModernStandby, and creating a new option for that would be too much, I'll add it here for now.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Storage";
    "StorageD3InModernStandby" = 4294967295; // REG_DWORD, 0 = Disable D3 support, 1 = Enable D3 support
```

> "*When the system is not in use, Windows may opportunistically turn off power to some set of devices to conserve energy. In Modern Standby, the system remains in S0. Even while in S0, all peripheral devices may eventually be powered down due to idle timeouts. This state is defined as "S0 Low Power Idle". Once all devices are in a low-power state, even more of the system infrastructure (e.g. busses, timers, …) may be powered down. The general rule of thumb is to place the device in the deepest possible D-state when it is idle, even when the system state is S0. Depending on implementation details of the processor complex and platform design, peripheral devices may be required to go to an F-state, D3 Hot, or D3 Cold (power is cut). To mitigate the need for a function driver to manage these implementation details, drivers should go to the deepest appropriate device state in order to maximize battery life.*"
>
> — Microsoft, [Power Management for Storage Hardware Devices, D3 Support](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/power-management-for-storage-hardware-devices-intro#d3-support)
