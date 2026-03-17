---
title: 'Intel NIC Values'
description: 'Generated from win-registry README section: Intel NIC Values.'
editUrl: 'https://github.com/nohuto/win-registry/blob/main/README.md#intel-nic-values'
sidebar:
  order: 13
---

See [assets/intel-nic](https://github.com/nohuto/win-registry/tree/main/assets/intel-nic) for reference, most of them were found via xrefs of `REGISTRY::RegReadRegTable`. Defaults depends on the adapter/driver, these were found on "Intel(R) Ethernet Controller I225-V". Many of them aren't read ([NIC-Intel.txt](https://github.com/nohuto/win-registry/blob/main/records/NIC-Intel.txt)).

Many parts aren't structered as they should be after decompiling via IDA, which made it impossible to get their data. See [NIC-Intel-IDA.txt](https://github.com/nohuto/win-registry/blob/main/records/NIC-Intel-IDA.txt) for a list of values which I found in IDA (within a single driver). The list below shows values which included their data.

> [!WARNING]
> Everything listed below is based on personal research. Mistakes may exist, but I don't think I've made any.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "*DeviceSleepOnDisconnect" = 0; // range 0-1
    "*EnableDynamicPowerGating" = 1; // range 0-1
    "*EncapsulatedPacketTaskOffloadVxlan" = 0; // range 0-1
    "*FlowControl" = 4; // range 0-4
    "*HeaderDataSplit" = 0; // range 0-1
    "*PMARPOffload" = 0; // range 0-1
    "*PMNSOffload" = 0; // range 0-1
    "*ReceiveBuffers" = 512; // range 128-4096
    "*RSCIPv4" = 0; // range 0-1
    "*RSCIPv6" = 0; // range 0-1
    "*RssOrVmqPreference" = 0; // range 0-1
    "*SpeedDuplex" = 0; // range 0-50000
    "*Sriov" = 0; // range 0-1
    "*SriovPreferred" = 0; // range 0-1
    "*VMQ" = 0; // range 0-1
    "*VMQLookaheadSplit" = 0; // range 0-1
    "*VMQVlanFiltering" = 1; // range 0-1
    "*VxlanUDPPortNumber" = 4789; // range 1-65535
    "*WakeOnMagicPacket" = 1; // range 0-1
    "*WakeOnPattern" = 1; // range 0-1
    "AdaptiveQHysteresis" = 64; // range 16-1024
    "AdaptiveQSize" = 128; // range 64-8192
    "AdaptiveQWorkSet" = 96; // range 32-8192
    "CheckForHangTime" = 2; // range 0-60
    "DisableIntelRST" = 1; // range 0-1
    "DisableReset" = 0; // range 0-1
    "DMACoalescing" = 0; // range 0-10240
    "EnableAdaptiveQueuing" = 1; // range 0-1
    "EnableDisconnectedStandby" = 0; // range 0-1
    "EnableHWAutonomous" = 0; // range 0-1
    "EnableModernStandby" = 0; // range 0-1
    "EnablePME" = 0; // range 0-1
    "EnablePowerManagement" = 1; // range 0-1
    "EnableRxDescriptorChaining" = 1; // range 0-1
    "FecMode" = 0; // range 0-3
    "ForceHostExitUlp" = 0; // range 0-1
    "ForceLtrValue" = 65535; // range 0-65535
    "ForceRscEnabled" = 0; // range 0-1
    "HDSplitAlways" = 0; // range 0-1
    "HDSplitBufferPad" = 2; // range 0-2
    "HDSplitLocation" = 2; // range 0-3
    "HDSplitSize" = 128; // range 128-960
    "I218DisablePLLShut" = 0; // range 0-1
    "I218DisablePLLShutGiga" = 0; // range 0-1
    "I219DisableK1Off" = 0; // range 0-1
    "MaxPacketCountPerDPC" = 256; // range 8-65535
    "MaxPacketCountPerIndicate" = 64; // range 1-65535
    "MinHardwareOwnedPacketCount" = 32; // range 8-4096
    "PadReceiveBuffer" = 0; // range 0-1
    "ReceiveBuffersOverride" = 1; // range 0-1
    "RegForceRxPathSerialization" = 0; // range 0-1
    "ResetTest" = 0; // range 0-1
    "ResetTestTime" = 300; // range 20-604800
    "RscMode" = 1; // range 0-2
    "RxBufferPad" = 10; // range 0-63
    "RxDescriptorCountPerTailWrite" = 8; // range 4-4096
    "SidebandUngateOverride" = 0; // range 0-1
    "StoreBadPackets" = 0; // range 0-1
    "ULPMode" = 1; // range 0-1
    "VMQSupported" = 0; // range 0-1
    "WakeFromS5" = 2; // range 0-65535
    "WakeOn" = 0; // range 0-4
    "WakeOnLink" = 0; // range 0-2

    "*IPChecksumOffloadIPv4" = 3; // range 0-3
    "*LsoV1IPv4" = 1; // range 0-1
    "*LsoV2IPv4" = 1; // range 0-1
    "*LsoV2IPv6" = 1; // range 0-1
    "*TCPChecksumOffloadIPv4" = 3; // range 0-3
    "*TCPChecksumOffloadIPv6" = 3; // range 0-3
    "*UDPChecksumOffloadIPv4" = 3; // range 0-3
    "*UDPChecksumOffloadIPv6" = 3; // range 0-3
```

> [intel-nic/assets | CheckRssSetting.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/CheckRssSetting.c)  
> [intel-nic/assets | DcaReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/DcaReadRegistryParameters.c)  
> [intel-nic/assets | HeaderSplitConfiguration_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/HeaderSplitConfiguration_ReadRegistryParameters.c)  
> [intel-nic/assets | INTERRUPT_IntReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/INTERRUPT_IntReadRegistryParameters.c)  
> [intel-nic/assets | LINK_LinkReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/LINK_LinkReadRegistryParameters.c)  
> [intel-nic/assets | Link_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/Link_ReadRegistryParameters.c)  
> [intel-nic/assets | OffLdReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/OffLdReadRegistryParameters.c)  
> [intel-nic/assets | POWER_PwrReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/POWER_PwrReadRegistryParameters.c)  
> [intel-nic/assets | Power_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/Power_ReadRegistryParameters.c)  
> [intel-nic/assets | RECEIVE_RxReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/RECEIVE_RxReadRegistryParameters.c)  
> [intel-nic/assets | ReceiveConfiguration_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/ReceiveConfiguration_ReadRegistryParameters.c)  
> [intel-nic/assets | ReceiveSideCoalescing_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/ReceiveSideCoalescing_ReadRegistryParameters.c)  
> [intel-nic/assets | RegReadRegTable.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/RegReadRegTable.c)  
> [intel-nic/assets | RSS_RssReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/RSS_RssReadRegistryParameters.c)  
> [intel-nic/assets | RtAdapterCheckSetupAspmAndClkReq.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/RtAdapterCheckSetupAspmAndClkReq.c)  
> [intel-nic/assets | TIMESTAMP_ReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/TIMESTAMP_ReadRegistryParameters.c)  
> [intel-nic/assets | TRANSMIT_TxReadRegistryParameters.c](https://github.com/nohuto/win-registry/blob/main/assets/intel-nic/TRANSMIT_TxReadRegistryParameters.c)
