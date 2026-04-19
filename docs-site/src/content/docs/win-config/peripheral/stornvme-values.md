---
title: 'StorNVMe Values'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 6
---

This option serves as a general values overview for the `stornvme` key. Several values are applied, some have been changed, others are default values. The applied data is sometimes pure speculation.

## Registry Values Details

Most values are read via `ReadMultiSzRegistryValueAndCompareId` using the device id match string `VEN_vvvv&DEV_dddd&REV_rr`, so I currently assume that their type is REG_MULTI_SZ. Several values are set to 0 which sometimes also means "ignore" for example. Note that the information in this list is based on `stornvme.sys` only (if value has comment).

[Database-engine/database-file-operations](https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/database-file-operations/troubleshoot-os-4kb-disk-sector-size?tabs=registry-editor#resolution-steps-for-disk-sector-size-errors-in-sql-server) validates that `ForcedPhysicalSectorSizeInBytes` is a Multi-String value, which confirms a part of my assumption, but I'm still not 100% sure about the rest. Feel free to correct me.

See [GetRegistrySettings23H2.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/stornvme/GetRegistrySettings23H2.c), [GetRegistrySettings24H2.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/stornvme/GetRegistrySettings24H2.c), [GetRegistrySettings26H1.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/stornvme/GetRegistrySettings26H1.c), [stornvmeGetDynamicRegistrySettings26H1.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/stornvme/stornvmeGetDynamicRegistrySettings26H1.c), and [GetRegistrySettingsForSpecificKey26H1.c](https://github.com/nohuto/win-config/tree/main/peripheral/assets/stornvme/GetRegistrySettingsForSpecificKey26H1.c) for details.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\stornvme\\Parameters\\Device";
    "MaxTransferSize" = 0; // REG_MULTI_SZ, range 1-2048, clamp to 2048 (value << 10) 0 = ignore
    "IoQueueDepth" = 0; // REG_MULTI_SZ
    "IoSubmissionQueueCount" = 0; // REG_MULTI_SZ
    "IoCompletionQueueCount" = 0; // REG_MULTI_SZ
    "InterruptCoalescingTime" = 0; // REG_MULTI_SZ
    "InterruptCoalescingEntry" = 0; // REG_MULTI_SZ
    "ArbitrationBurst" = 255; // REG_MULTI_SZ
    "ContiguousMemoryFromAnyNode" = 0; // REG_MULTI_SZ
    "ShutdownTimeout" = 0; // REG_MULTI_SZ, >0xFF coerced to 0xFF, 0 ignored
    "DeallocateMaxLbaCount" = 0; // REG_MULTI_SZ
    "DisableDeallocate" = 0; // REG_MULTI_SZ
    "ControllerBasicInit" = 0; // REG_MULTI_SZ
    "AsyncEventMask" = ?; // REG_MULTI_SZ, nonzero override is masked with 0x1F (init observed: 23H2=1823, 24H2=134219551)
    "IdlePowerMode" = 0; // REG_MULTI_SZ, applied only if value < 6, skipped when StorPortExtendedFunction(97) sets mode=2
    "DiagnosticFlags" = 0; // REG_MULTI_SZ, bit 1 (0x2) forces LogSize default to 0x100000 bytes
    "LogSize" = 0; // REG_MULTI_SZ, stored as bytes (value << 10) 0 ignored (unless DiagnosticFlags set)
    "IoStripeAlignment" = 0; // REG_MULTI_SZ, applied only if (value << 10) is 4K-aligned
    "MedPowerFxIdleTimeout" = 4294967295; // REG_MULTI_SZ
    "LowestPowerFxIdleTimeout" = 50; // REG_MULTI_SZ
    "MedPowerD3IdleTimeout" = 3000; // REG_MULTI_SZ
    "LowestPowerD3IdleTimeout" = 1000; // REG_MULTI_SZ
    "MedPowerResumeLatency" = 4294967295; // REG_MULTI_SZ
    "LowestPowerResumeLatency" = 4294967295; // REG_MULTI_SZ
    "HostMemoryBufferBytes" = 4294967295; // REG_MULTI_SZ
    "BypassSgl" = 1; // REG_MULTI_SZ, only value bit0 is used
    "TestMdlDataBufferOffsetInBytes" = 0; // REG_MULTI_SZ
    "UseDumpPointers" = 0; // REG_MULTI_SZ
    "ReservedQueuePairCount" = 0; // REG_MULTI_SZ, valid 1-65535 (check v69-1 <= 0xFFFE)
    "NvmeTestSwitch" = 1; // REG_MULTI_SZ
    "IoQueuePercentageInPollingMode" = 0; // REG_MULTI_SZ, >100 coerced to 100
    "IoPollingInterval" = 0; // REG_MULTI_SZ, >100000 coerced to 100000
    "IoCompletionCapInDPC" = 100; // REG_MULTI_SZ, if nonzero clamp to 128
    "IoPollingSize" = 0x4000; // REG_MULTI_SZ
    "ErrorEtwThrottleInterval" = 0xD693A400; // REG_MULTI_SZ, if nonzero clamp to max 0xD693A400
    "ResetEnableMask" = 0; // REG_MULTI_SZ, value bit0/1/2 set internal flags 0x40/0x800/0x1000
    "ReliabilityDegraded" = 0; // REG_MULTI_SZ
    "ReadOnly" = 0; // REG_MULTI_SZ
    "VolatileMemoryBackupDeviceFailed" = 0; // REG_MULTI_SZ
    "AvailableSpare" = 0; // REG_MULTI_SZ
    "AvailableSpareThreshold" = 0; // REG_MULTI_SZ
    "ForcedPhysicalSectorSizeInBytes" = ?; // REG_MULTI_SZ, nonzero required before write
    "RetainAsyncEventControlMask" = ?; // REG_MULTI_SZ, written directly when read succeeds
    "ShutdownTimeoutForSurpriseRemove" = 0; // REG_MULTI_SZ, >0xFF coerced to 0xFF, 0 ignored
    "MaxIoCountLimit" = 0; // REG_MULTI_SZ, nonzero required before write
    "SubmissionQueueAssignmentPolicy" = 0; // REG_MULTI_SZ
    "DisableMFNDCCDuringRemoval" = ?; // REG_MULTI_SZ
    "EnableSingleDpcForIoCompletion" = ?; // REG_MULTI_SZ
    "DisableNamespacePreferredValueCheck" = ?; // REG_MULTI_SZ
    "IgnoreNamespacePreferredValues" = ?; // REG_MULTI_SZ
    "DisableBypassIO" = ?; // REG_MULTI_SZ
    "DisableGetActiveNSIDList" = 0; // REG_MULTI_SZ
    "ForceCryptoEraseToUseFormatNVM" = 0; // REG_MULTI_SZ

    "ControllerResetWaitTimeCushion" = 20000; // REG_MULTI_SZ, GetDynamicRegistrySettings writes the read value directly (including 0)
    "DisableActivateFWWithoutReset" = 0; // REG_MULTI_SZ, read in GetRegistrySettingsForSpecificKey and returned directly

    // present in 24H2 path (not present in 23H2 path)
    "DisableDSTThrottle" = ?; // REG_MULTI_SZ, GetDynamicRegistrySettings first clears flag 0x200000, then sets it when value is nonzero
    "DisableF0TimestampSync" = 0; // REG_MULTI_SZ
    "DisableForwardedIO" = 0; // REG_MULTI_SZ
    "EnableIntelTSESplitIOWorkaround" = 0; // REG_MULTI_SZ
    "EnforceActiveNamespaceIdentification" = 0; // REG_MULTI_SZ
    "SupportZeroActiveNamespace" = 0; // REG_MULTI_SZ
    "WeightedRoundRobinEnabled" = 0; // REG_MULTI_SZ

    "DriverParameter" = ?;
    "HostIdentifier" = ?;
    "LinkTimeout" = ?;
    "MaximumLogicalUnit" = ?;
    "MaximumUCXAddress" = ?;
    "MinimumUCXAddress" = ?;
    "NumberOfRequests" = ?;
    "UncachedExtAlignment" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Services\\stornvme\\Parameters";
    "StorageSupportedFeatures" = 1; // "Support ByPass IO"?
    "DmaRemappingCompatible" = 2; // https://github.com/nohuto/win-config/blob/main/security/desc.md#opt-out-dma-remapping
    "BusType" = ?; // bustype 0x11 is value of BusTypeNVMe
    "BusyPauseTimeInMs" = ?;
    "BusyRetryCount" = ?;
    "IoLatencyCap" = ?;
    "IoTimeoutValue" = 10;
    "PnpAsyncNewDevices" = ?;
```
