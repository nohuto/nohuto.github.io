---
title: 'PnP Device Values'
description: 'Generated from win-registry README section: PnP Device Values.'
editUrl: 'https://github.com/nohuto/win-registry/blob/main/README.md#pnp-device-values'
sidebar:
  order: 11
---

Windows Plug and Play (PnP) creates a device node (devnode) for each detected device instance ("The PnP manager is the primary component involved in supporting the ability of Windows to recognize and adapt to changing hardware configurations."). In WinDbg (`!devnode`), `InstancePath` assigns to the device instance key under:
```c
HKLM\SYSTEM\CurrentControlSet\Enum\<enumerator>\<deviceID>\<instanceID>

// miscellaneous notes
HKLM\SYSTEM\CurrentControlSet\Enum // hardware instance key - per-device-instance data
HKLM\SYSTEM\CurrentControlSet\Control\Class\{ClassGUID} // class key - class-wide settings and optional class filters
HKLM\SYSTEM\CurrentControlSet\Services\<ServiceName> // software key - service/driver configuration for the function or filter driver
```

### Common Subkeys under `<instanceID>`

`Device Parameters`: Per-instance parameters and state used by the drivers in the stack  
`Properties`: Device property store for this instance  
`LogConf` (optional): Resource configuration data for the instance  
`Control` (optional): Additional PnP/device state

Not every instance has the same subkeys or values.

I won't add details on the PnP manager here, as that's not the purpose of the repo. For more details, read [Windows Internals E7 P1](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf), Chapter 6 (`The Plug and Play manager`).

---

One thing to point out here is that there're two APIs which I almost didn't notice. [`IoOpenDeviceRegistryKey`](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/nf-wdm-ioopendeviceregistrykey) & `PLUGPLAY_REGKEY_DEVICE` opens the per-device-instance hardware key in the `Enum` branch (`HKLM\SYSTEM\CCS\Enum\<Enumerator>\<DeviceID>\<InstanceID>\Device Parameters`). [`IoOpenDriverRegistryKey`](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/nf-wdm-ioopendriverregistrykey) opens the per-driver-service key in the `Services` branch (`HKLM\SYSTEM\CCS\Services\<ServiceName>\Parameters`).

A simple example here would be [GetEnhancedVerifierOptions](https://github.com/nohuto/win-registry/blob/main/assets/pnp/GetEnhancedVerifierOptions.c) which uses `IoOpenDriverRegistryKey` and as you can see in a boot trace, `EnhancedVerifierOptions` is used in for example `\Registry\Machine\SYSTEM\ControlSet001\Services\PEAUTH\Parameters\Wdf : EnhancedVerifierOptions`.

`INF default` = install-time default from INF entries.

To create this list, I've used many driver pseudocodes (usbhub, winhub, acpi, pci, wdf, hidclass, USBHUB3...), several INF files, and W10 source for comments (which may not be accurate anymore).

> [!WARNING]
> Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters";
    "AllowIdleIrpInD3" = 1; // REG_DWORD (bool), INF default (input.inf)
    "CollectionReenumerateSelfInterfaceEnabled" = 0; // REG_DWORD (bool)
    "ComboHardwareIdV2Enabled" = 0; // REG_DWORD (bool)
    "CyclePortEnabled" = 0; // REG_DWORD (bool)
    "D3ColdReconnectTimeout" = 1000; // REG_DWORD
    "DefaultIdleTimeout" = 5000/30000; // REG_DWORD, the USBCCID UM driver uses 5sec, devices that support MTP use 30sec? (UsbccidDriver, wpdmtp)
    "DefaultIdleState" = 1; // REG_DWORD (bool), HUBREG_SetWinUsbIdleDefaults writes 1 when queries for DeviceIdleEnabled/DefaultIdleState/DeviceIdleIgnoreWakeEnable all fail
    "DeviceIdleEnabled" = 1; // REG_DWORD (bool), ^
    "DeviceIdleIgnoreWakeEnable" = 1; // REG_DWORD (bool), ^
    "DeviceInterfaceGUID" = "{52783fc2-0179-4eca-bb46-128bba61975e}"; // REG_SZ, written if missing by HUBREG_SetWinUsbIdleDefaults, WinUSB_GetRegParams uses it as fallback when DeviceInterfaceGUIDs is unavailable
    "DeviceInterfaceGUIDs" = "{...}"; // REG_MULTI_SZ, WinUSB example: {F72FE0D4-CBCB-407d-8814-9ED673D0DD6B}
    "DevicePowerUpOnS0Entry" = 1; // REG_DWORD, when 1 = "Always enter D0 upon resume from sleep regardless of IdleInWorkingState of its power policy owner"
    "DeviceResetNotificationEnabled" = 1; // REG_DWORD, INF default (input.inf, hidi2c.inf, hidspi_km.inf, hidvhf.inf)
    "DeviceSelectiveSuspended" = ?; // "Update Registry that this device has tried to selective Suspend."
    "EndpointPriorities" = ?; // validated by HUBREG_ValidateAndPopulateEndpointPriorities?
    "EnhancedPowerManagementEnabled" = 1; // REG_DWORD (bool)
    "EnhancedPowerManagementUseMonitor" = ?; // REG_DWORD (bool), read only when EnhancedPowerManagementEnabled is set to 1
    "ExtPropDescSemaphore" = 1; // REG_DWORD, written by HUBMISC_SetExtPropDescSemaphoreInRegistry, query path also checks RevisionId/VendorRevision, "Writes the "ExtPropDescSemaphore" registry flag to the device's hardware key to indicate that the device does not need to be queried for MS OS Extended Property Descriptors in the future.", "We only care whether or not it already exists, not what data it has."
    "ForceSelectiveSuspend" = ?; // REG_DWORD (bool?), from BthUsb_QuerySelectiveSuspend
    "FriendlyName" = ?; // REG_SZ
    "LegacyTouchScaling" = 0; // REG_DWORD, INF default (input.inf)
    "RemoteWakeEnabled" = ?; // REG_DWORD (bool)
    "ResetPortEnabled" = 0; // REG_DWORD (bool)
    "RetainWWIrpWhenDeviceAbsent" = 0; // REG_DWORD (bool)
    "RevisionId" = ; // REG_DWORD
    "SelectiveSuspendEnabled" = 0/1; // REG_DWORD/REG_BINARY (bool), INF has both, 0 in default install, 1 in selective-suspend opt-in (unsure when DWORD/BINARY is used, but when searching for the value in the standart hives via regkit you can see that it uses both types)
    "SelectiveSuspendOn" = 1; // REG_DWORD (bool)
    "SelectiveSuspendSupported" = ?; // REG_DWORD (bool?), from BthUsb_QuerySelectiveSuspend
    "SelectiveSuspendTimeout" = 5000; // REG_DWORD
    "SelSuspCancelBehavior" = ?; // REG_DWORD (bool)
    "SessionSecurityEnabled" = ?; // REG_DWORD (bool)
    "SuppressInputInCS" = 0; // REG_DWORD (bool), clears WakeScreenOnInputSupport when enabled?
    "SystemInputSuppressionEnabled" = 1; // REG_DWORD (bool)
    "SystemWakeEnabled" = 1; // REG_DWORD (bool), INF default (UsbccidDriver.inf, wudfusbcciddriver.inf)
    "TestIdleMonitorDim" = 1000; // REG_DWORD
    "TestIdleTimeoutNoHandles" = 1000; // REG_DWORD
    "TestIdleTimeoutNoHandlesInitial" = 5000; // REG_DWORD
    "UserSetDeviceIdleEnabled" = 1; // REG_DWORD (bool) "this setting will add a power management page to allow a user to enable/disable USB SS", related to DeviceIdleEnabled
    "VendorRevision" = ; // REG_DWORD
    "WakeScreenOnInputSupport" = 1; // REG_DWORD (bool)
    "WakeScreenOnInputTimeout" = ?; // REG_DWORD, queried only when WakeScreenOnInputSupport is enabled
    "WinRtInterfaceRestrictionLevel" = 255; // REG_DWORD, fallback 255, accepts 0/1, if >1 = 0
    "WinusbIsochUsed" = 0; // REG_DWORD
    "WinUsbPowerPolicyOwnershipDisabled" = 1; // REG_DWORD (bool)
    "WriteReportExSupported" = 1; // REG_DWORD

    "HardResetCount" = ?; // REG_DWORD, "Writes into registry information about how many times this hub has been reset for the lifetime of the devnode. It also writes the invalid port status if that is the reason for hub reset. This infromation will be read by the SQM engine."
    "HubFWUpdateProtocol" = ?; // REG_DWORD
    "OvercurrentDetected" = ?; // REG_DWORD (bool)
    "WakeSystemOnConnect" = ?; // REG_DWORD (bool)
    "AOCID" = ?;
    "AutoplayOnSpecialInterface" = ?;
    "CustomWake" = ?;
    "DefaultSimulatedTarget" = ?;
    "DeviceGroup" = ?;
    "DeviceGroups" = ?;
    "DeviceHandlers" = ?;
    "FailReasonID" = ?;
    "FirmwareCapsuleFilename" = ?;
    "FirmwareFilename" = ?;
    "FirmwareId" = ?;
    "FirmwareIntegrityFilename" = ?;
    "FirmwareMeasurementsFilename" = ?;
    "FirmwareStatus" = ?;
    "FirmwareVersion" = ?;
    "FirmwareVersionFormat" = ?;
    "FlipFlopHScroll" = ?;
    "FlipFlopWheel" = ?;
    "ForceVirtualDesktop" = ?;
    "FullPowerDownOnTransientDx" = ?;
    "FunctionDriverOptIn" = ?;
    "HackFlags" = ?;
    "HasPhysicalKeys" = ?;
    "HScrollHighResolutionDisable" = ?;
    "HScrollPageOverride" = ?;
    "HScrollScalingFactor" = ?;
    "HScrollUsageOverride" = ?;
    "Icons" = ?;
    "IdleSupported" = ?;
    "IdleTimeoutPeriodInMilliSec" = ?;
    "KeyboardNumberFunctionKeysOverride" = ?;
    "KeyboardNumberIndicatorsOverride" = ?;
    "KeyboardNumberTotalKeysOverride" = ?;
    "KeyboardSubtypeOverride" = ?;
    "KeyboardTypeOverride" = ?;
    "Label" = ?;
    "NoMediaIcons" = ?;
    "NoSoftEject" = ?;
    "NumberOfPairingSlots" = ?;
    "OriginalConfigurationValue" = ?;
    "RootBus" = ?;
    "TargetForcePriorityList" = ?;
    "TargetPriorityList" = ?;
    "Usb4HostName" = ?;
    "UsbccgpCapabilities" = ?;
    "UseStrictBiosHandoff" = ?;
    "VhfMode" = ?;
    "VideoID" = ?;
    "VScrollHighResolutionDisable" = ?;
    "VScrollPageOverride" = ?;
    "VScrollUsageOverride" = ?;
    "WheelScalingFactor" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\e5b3b5ac-9725-4f78-963f-03dfb1d828c7";
    "BusDataLinkSettleTime" = ?; // REG_DWORD, accepted if <= 150, larger values are ignored
    "D3ColdSupported" = 1; // REG_DWORD (bool)
    "DeviceD0DelayTime" = 100; // REG_DWORD, accepts <= 100 (ms), larger values are ignored
    "DeviceDpcCleanUpActionOverride" = 0; // REG_DWORD, 0 <= value <= 1, larger values are ignored (doesn't exist on 23H2 in pci?)
    "DeviceDpcResetActionOverride" = 0; // REG_DWORD, 0 <= value <= 4, larger values are ignored (doesn't exist on 23H2 in pci?)
    "DevicePowerResetDelayTime" = ?; // REG_DWORD (doesn't exist on 23H2 in pci?)
    "ForceSBR" = 1; // REG_DWORD, INF default (pci.inf/machine.inf)
    "IgnoreErrorsDuringPLDR" = 1; // REG_DWORD, ^
    "IoNotRequired" = 1; // REG_DWORD, INF default (pci.inf)
    "RecoveryDisabled" = 1; // REG_DWORD, INF default (pci.inf/machine.inf)
    "RecoveryEnabled" = 1; // REG_DWORD, INF default (pci.inf/machine.inf)
    "SettleTimeRequired" = 1; // REG_DWORD, INF default (pci.inf/machine.inf), "Child devices can opt into this delay by including the PciExtraSettleTimeRequired from machine.inf or pci.inf."
    "SriovSupported" = 1; // REG_DWORD, INF default (pci.inf)

    // xrefs of PciIsDeviceFeatureEnabled (which opens key e5b3b5ac-9725-4f78-963f-03dfb1d828c7)

    "ASPMOptOut" = ?; // REG_DWORD (bool), used when BaseVersion >= 1.1 (BaseVersion = PCIe base spec level)
    "ASPMOptIn" = ?; // REG_DWORD (bool), used when BaseVersion < 1.1 so basically never?
    "AtomicsOptIn" = 1; // REG_DWORD, INF default (pci.inf/machine.inf) - PciDeviceQueryAtomics
    "BridgeUseNativeWakeInfo" = 1; // REG_DWORD, INF default (pci.inf/machine.inf) - PciAddDevice
    "EnableAllBridgeInterrupts" = 1; // REG_DWORD, INF default (pci.inf/machine.inf) "If a third-party driver has installed itself as a filter it may invoke the PciEnableAllBridgeInterrupts section from machine.inf to disable filtering of PCI Bridge interrupts." - PciBridgeInterface_Constructor
    "DoNotUseAcs" = 1; // REG_DWORD, INF default (pci.inf/machine.inf) - ExpressProcessExtendedPortCapabilities
    "AcsNotRequired" = 1; // REG_DWORD, INF default (pci.inf/machine.inf) - ExpressProcessNewPort

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Ceip"; // g_DeviceCeipKey
    "DeviceInformation" = ; // REG_DWORD, missing treated as 0 before HUBREG_UpdateSqmFlags update
    "PortInterconnectType" = ?; // REG_DWORD
    "DescriptorValidationInfo0" = ?; // REG_DWORD, written by HUBREG_UpdateSqmFlags
    "DescriptorValidationInfo1" = ?; // REG_DWORD, ^
    "DescriptorValidationInfo2" = ?; // REG_DWORD, ^
    "DescriptorValidationInfo3" = ?; // REG_DWORD, ^
    "DescriptorValidationInfo4" = ?; // REG_DWORD, ^
    "DescriptorValidationInfo5" = ?; // REG_DWORD, ^
    "DescriptorValidationInfo6" = ?; // REG_DWORD, ^

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Wdf";
    "IdleInWorkingState" = 0; // REG_DWORD (bool), INF default (1394.inf), read when UserControlOfIdleSettings is allowed
    "WakeFromSleepState" = ?; // REG_DWORD (bool)
    "WdfDefaultIdleInWorkingState" = 0; // REG_DWORD, INF default (wpdmtp.inf)
    "WdfDirectedPowerTransitionChildrenOptional" = 1; // REG_DWORD (bool), INF default (acxhdaudiop.inf)
    "WdfDirectedPowerTransitionEnable" = 1; // REG_DWORD (bool), INF default (acxhdaudiop.inf, hdaudbus.inf, iaLPSS2i_I2C_CNL.inf)
    "WdfUseWdfTimerForPofx" = ?; // REG_DWORD (bool)
    "SleepstudyState" = 0; // REG_DWORD (bool), nonzero = enabled, only used on AoAc systems (Always on, Always connected)
    "WdfDefaultWakeFromSleepState" = 0; // REG_DWORD, INF default (UsbccidDriver.inf, wudfusbcciddriver.inf)

// Interrupt Management

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties";
    "MessageNumberLimit" = ?; // REG_DWORD, cap for requested MSI messages
    "MSISupported" = ?; // REG_DWORD (bool), set by many device INFs (device specific)

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\\Range\\<n>";
    // "Build a table of values. Each will be filled in only if it exists."
    "StartingMessage" = 0; // REG_DWORD
    "EndingMessage" = 0; // REG_DWORD
    "MessagesPerProcessor" = 0; // REG_DWORD, affinity helper treats 0 as 1

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Interrupt Management\\Affinity Policy";
    "AssignmentSetOverride" = 0; // can be a REG_BINARY, REG_DWORD, or REG_QWORD value that specifies a KAFFINITY mask (KAFFINITY type is an affinity mask that represents a set of logical processors in a group). For REG_BINARY, size must be less than or equal to the KAFFINITY size for the platform, and input byte order is little endian. If DevicePolicy is 0x04 (IrqPolicySpecifiedProcessors), then this mask specifies a set of processors to assign the device's interrupts to. "For backwards compatibility handle several types. In the case where multi-byte binary data is found, treat the input byte order as little endian." https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/interrupt-affinity-and-priority
    "DevicePolicy" = 0; // REG_DWORD, https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ne-wdm-_irq_device_policy
    "DevicePriority" = 0; // REG_DWORD
    "GroupOverride" = ;
    "GroupPolicy" = ; // REG_DWORD, default GroupAffinityAllGroupZero when missing

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Interrupt Management\\Affinity Policy - Temporal";
    "TargetGroup" = ?; // REG_DWORD
    "TargetSet" = ?; // REG_QWORD

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\Interrupt Management\\Routing Info";
    // "This routine deletes any interrupt routing data that the interrupt arbiter has cached (for performance reasons) about this device."
    "Flags" = ?; // REG_DWORD, data size 1
    "LinkNode" = ?; // REG_BINARY, ACPIAmliBuildObjectPathname
    "StaticVector" = ?; // REG_DWORD, PcisuppSetRoutingInfo writes this when no LinkNode is present

// miscellaneous values from boot trace, haven't looked into them yet
"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>";
    "Address" = ?;
    "Capabilities" = ?;
    "CompatibleIDs" = ?;
    "ConfigFlags" = ?;
    "ContainerID" = ?;
    "DeviceCharacteristics" = ?;
    "DeviceDesc" = ?;
    "DeviceReported" = ?;
    "DeviceType" = ?;
    "Driver" = ?;
    "Exclusive" = ?;
    "HardwareID" = ?;
    "InstallFlags" = ?;
    "LocationInformation" = ?;
    "LowerFilters" = ?;
    "Mfg" = ?;
    "ParentIdPrefix" = ?;
    "Phantom" = ?;
    "RemovalPolicy" = ?;
    "SECURITY" = ?;
    "Service" = ?;
    "UINumber" = ?;
    "UINumberDescFormat" = ?;
    "UniqueParentID" = ?;
    "UpperFilters" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Control";
    "AllocConfig" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\LogConf";
    "AllocConfig" = ?;
    "BootConfig" = ?;
    "ForcedConfig" = ?;
    "OverrideConfigVector" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\BiosConfig";
    "DEV_00&FUN_00" = ?;
    "DEV_00&FUN_01" = ?;
    "DEV_00&FUN_02" = ?;
    "DEV_00&FUN_03" = ?;
    "DEV_01&FUN_00" = ?;
    "DEV_01&FUN_01" = ?;
    "DEV_01&FUN_02" = ?;
    "DEV_02&FUN_00" = ?;
    "DEV_03&FUN_00" = ?;
    "DEV_03&FUN_01" = ?;
    "DEV_04&FUN_00" = ?;
    "DEV_05&FUN_00" = ?;
    "DEV_07&FUN_00" = ?;
    "DEV_07&FUN_01" = ?;
    "DEV_08&FUN_00" = ?;
    "DEV_08&FUN_01" = ?;
    "DEV_09&FUN_00" = ?;
    "DEV_14&FUN_00" = ?;
    "DEV_14&FUN_03" = ?;
    "DEV_18&FUN_00" = ?;
    "DEV_18&FUN_01" = ?;
    "DEV_18&FUN_02" = ?;
    "DEV_18&FUN_03" = ?;
    "DEV_18&FUN_04" = ?;
    "DEV_18&FUN_05" = ?;
    "DEV_18&FUN_06" = ?;
    "DEV_18&FUN_07" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\StorPort";
    "AdapterGuid" = ?;
    "BusSpecificResetTimeout" = ?;
    "BusyPauseTime" = ?;
    "BusyRetryCount" = ?;
    "DisableD3Cold" = ?;
    "DisableIdlePowerManagement" = ?;
    "DisableNVMeActiveNamespaceIDListCheck" = ?;
    "DisableRuntimePowerManagement" = ?;
    "DlrmDisable" = ?;
    "EnableIdlePowerManagement" = ?;
    "EnableLogoETW" = ?;
    "EnableNVMeInterface" = ?;
    "FwActivateTimeoutForController" = ?;
    "IdleTimeoutInMS" = ?;
    "InitialTimestamp" = ?;
    "Is1667Device" = ?;
    "MinimumIdleTimeoutInMS" = ?;
    "PLDRTimeout" = ?;
    "PowerCycleCount" = ?;
    "PowerCycleCountOverride" = ?;
    "PowerSrbTimeout" = ?;
    "QueueFullWaitIoPercentage" = ?;
    "TotalSenseDataBytes" = ?;
    "UseDMAv3" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\DMA Management";
    "RemappingFlags" = ?;
    "RemappingSupported" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\partmgr";
    "Attributes" = ?;
    "DiskId" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\WUDF";
    "SoftwareDeviceTag" = ?;

"HKLM\\SYSTEM\\CurrentControlSet\\Enum\\<enumerator>\\<deviceID>\\<instanceID>\\Device Parameters\\WUDF\\CompanionConfigurations\\USBXHCI";
    "CompanionServiceList" = ?;
```

> [pnp/assets | BthUsb_QuerySelectiveSuspend.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/BthUsb_QuerySelectiveSuspend.c)  
> [pnp/assets | ExpressDownstreamSwitchPortProcessAspmPolicy.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/ExpressDownstreamSwitchPortProcessAspmPolicy.c)  
> [pnp/assets | ExpressPortFindOptInOptOutPolicy.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/ExpressPortFindOptInOptOutPolicy.c)  
> [pnp/assets | FDO_GetIdleSupported.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/FDO_GetIdleSupported.c)  
> [pnp/assets | FxPkgPnpSaveState.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/FxPkgPnpSaveState.c)  
> [pnp/assets | FxPkgPnpSleepStudyEvaluateParticipation.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/FxPkgPnpSleepStudyEvaluateParticipation.c)  
> [pnp/assets | GetEnhancedVerifierOptions.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/GetEnhancedVerifierOptions.c)  
> [pnp/assets | HidpFdoConfigureIdleSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpFdoConfigureIdleSettings.c)  
> [pnp/assets | HidpGetComboHardwareIdV2Enabled.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpGetComboHardwareIdV2Enabled.c)  
> [pnp/assets | HidpGetPdoReenumerateSelfInterfaceEnabled.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpGetPdoReenumerateSelfInterfaceEnabled.c)  
> [pnp/assets | HidpGetRetainWWIrpEnabledFromRegistry.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpGetRetainWWIrpEnabledFromRegistry.c)  
> [pnp/assets | HidpGetSessionSecurityState.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpGetSessionSecurityState.c)  
> [pnp/assets | HidpToggleRemoteWakeWorker.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HidpToggleRemoteWakeWorker.c)  
> [pnp/assets | HUBMISC_SetExtPropDescSemaphoreInRegistry.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBMISC_SetExtPropDescSemaphoreInRegistry.c)  
> [pnp/assets | HUBREG_QueryExtPropDescSemaphoreInDeviceHardwareKey.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBREG_QueryExtPropDescSemaphoreInDeviceHardwareKey.c)  
> [pnp/assets | HUBREG_QueryValuesInDeviceHardwareKey.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBREG_QueryValuesInDeviceHardwareKey.c)  
> [pnp/assets | HUBREG_QueryValuesInHubHardwareKey.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBREG_QueryValuesInHubHardwareKey.c)  
> [pnp/assets | HUBREG_SetWinUsbIdleDefaults.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBREG_SetWinUsbIdleDefaults.c)  
> [pnp/assets | HUBREG_UpdateSqmFlags.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/HUBREG_UpdateSqmFlags.c)  
> [pnp/assets | IrqPolicySetDeviceAffinity.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/IrqPolicySetDeviceAffinity.c)  
> [pnp/assets | PciGetDeviceCustomSetting.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PciGetDeviceCustomSetting.c)  
> [pnp/assets | PciGetDeviceCustomSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PciGetDeviceCustomSettings.c)  
> [pnp/assets | PciGetDeviceD0DelayTime.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PciGetDeviceD0DelayTime.c)  
> [pnp/assets | PciGetDeviceDpcCustomSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PciGetDeviceDpcCustomSettings.c)  
> [pnp/assets | PcisuppGetRoutingInfo.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PcisuppGetRoutingInfo.c)  
> [pnp/assets | PcisuppSetRoutingInfo.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PcisuppSetRoutingInfo.c)  
> [pnp/assets | PowerPolicySetS0IdleSettings.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/PowerPolicySetS0IdleSettings.c)  
> [pnp/assets | UsbhGetD3Policy.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/UsbhGetD3Policy.c)  
> [pnp/assets | WinUSB_DeterminePowerPolicyOwnership.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/WinUSB_DeterminePowerPolicyOwnership.c)  
> [pnp/assets | WinUSB_GetRegParams.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/WinUSB_GetRegParams.c)  
> [pnp/assets | WinUSB_UpdateSqmInfo.c](https://github.com/nohuto/win-registry/blob/main/assets/pnp/WinUSB_UpdateSqmInfo.c)
