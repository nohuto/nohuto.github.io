---
title: 'RSC/URO'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#enable-rscuro'
sidebar:
  order: 25
---

When receiving data, the miniport driver, NDIS, and TCP/IP must all look at each protocol data unit (PDU) header information separately. When large amounts of data are being received, a large amount of overhead is created. Receive segment coalescing (RSC) reduces this overhead by coalescing a sequence of received segments and passing them to the host TCP/IP stack in one operation, so that NDIS and TCP/IP need to only look at one header for the entire sequence.

Starting in Windows 11, version 24H2, UDP receive segment coalescing offload (URO) enables network interface cards (NICs) to coalesce UDP receive segments. NICs can combine UDP datagrams from the same flow that match a set of rules into a logically contiguous buffer. These combined datagrams are then indicated to the Windows networking stack as a single large packet.

Coalescing UDP datagrams reduces the CPU cost to process packets in high-bandwidth flows, resulting in higher throughput and fewer cycles per byte.

> https://learn.microsoft.com/en-us/windows-hardware/drivers/network/udp-rsc-offload  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/network/overview-of-receive-segment-coalescing

`"*UdpRsc": { "Type": "REG_SZ", "Data": 1 }` causes high usage of the system idle process for whatever reason, I'll leave it out for now.

```c
```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "*RSCIPv4" = 0; // range 0-1
    "*RSCIPv6" = 0; // range 0-1
    "ForceRscEnabled" = 0; // range 0-1
    "RscMode" = 1; // range 0-2
```

> [/docs/win-registry/sections/registry-values-research/intel-nic-values/](/docs/win-registry/sections/registry-values-research/intel-nic-values/)

```c
void __fastcall ReceiveSideCoalescing::ReadRegistryParameters(struct ADAPTER_CONTEXT **this)
{
  RegistryKey<unsigned char>::Initialize(
    (enum RegKeyState *)((char *)this + 36),
    this[1],
    *((NDIS_HANDLE *)this[1] + 383),
    (PUCHAR)"*RSCIPv4",
    0,
    1u,     // range 0-1
    0,
    0,
    0),

  RegistryKey<unsigned char>::Initialize(
    (enum RegKeyState *)((char *)this + 44),
    this[1],
    *((NDIS_HANDLE *)this[1] + 383),
    (PUCHAR)"*RSCIPv6",
    0,
    1u,     // range 0-1
    0,
    0,
    0),

  RegistryKey<unsigned char>::Initialize(
    (enum RegKeyState *)(this + 2),
    this[1],
    *((NDIS_HANDLE *)this[1] + 383),
    (PUCHAR)"ForceRscEnabled",
    0,
    1u,     // range 0-1
    0,
    0,
    0),

  RegistryKey<enum HdSplitLocation>::Initialize(
    (enum RegKeyState *)(this + 3),
    this[1],
    *((NDIS_HANDLE *)this[1] + 383),
    (PUCHAR)"RscMode",
    0,
    2u,     // range 0-2
    1u,
    0,
    0),
}
```

---

Miscellaneous notes:
```c
"ForceRscEnabled": { "Type": "REG_SZ", "Data": 1 },
"RscMode": { "Type": "REG_SZ", "Data": 1 },
```

# Disable VMQ

VMQ is a scaling networking technology for the Hyper-V switch. Without VMQ the networking performance of the Hyper-V switch bound to this network adapter may be reduced. VMQ offloads packet processing to NIC hardware queues, with each queue tied to a specific VM. This increases throughput, spreads work across CPU cores, lowers host CPU use, and scales effectively as more VMs are added on Hyper-V.

It depends on your adapter/driver if VMQ is enabled/disabled by default:

```c
// Intel
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "*RssOrVmqPreference" = 0; // range 0-1
    "*VMQ" = 0; // range 0-1
    "*VMQLookaheadSplit" = 0; // range 0-1
    "*VMQVlanFiltering" = 1; // range 0-1
    "VMQSupported" = 0; // range 0-1

    "MaxNumVmqs" = ?; // found it in the "Mellanox ConnectX based IPoIB Adapter (NDIS 6.4)" driver
```

> [/docs/win-registry/sections/registry-values-research/intel-nic-values/](/docs/win-registry/sections/registry-values-research/intel-nic-values/)

```inf
; Mellanox
; mlx4eth NT specific
HKR, Ndi\Params\*VMQ,  ParamDesc, 0, "%VMQ%"
HKR, Ndi\Params\*VMQ,  Type,      0, "enum"
HKR, Ndi\Params\*VMQ,  Default,   0, "1"
HKR, Ndi\Params\*VMQ,  Optional,  0, "0"
HKR, Ndi\Params\*VMQ\enum,  "0",  0, "%Disabled%"
HKR, Ndi\Params\*VMQ\enum,  "1",  0, "%Enabled%"
HKR, "", *VMQ, %REG_SZ%, "1"
```

| Value | Description | Allowed Values | Default | Notes |
| ----  | ---- | ---- | ---- | ---- |
| `*VMQ`| Enable/disable the VMQ feature. | `0` Disabled - `1` Enabled | `1` | Enumeration keyword. |
| `*VMQLookaheadSplit` | Enable/disable splitting RX buffers into lookahead and post-lookahead buffers. | `0` Disabled - `1` Enabled | `1` | Starting with NDIS 6.30 / Windows Server 2012, this keyword is no longer supported. |
| `*VMQVlanFiltering` | Enable/disable filtering packets by VLAN ID in the MAC header. | `0` Disabled - `1` Enabled | `1` | Enumeration keyword. |
| `*RssOrVmqPreference` | Define whether VMQ capabilities should be enabled instead of RSS. | `0` Report RSS capabilities - `1` Report VMQ capabilities | `0`     | - |
| `*TenGigVmqEnabled` | Enable/disable VMQ on all 10 Gbps adapters. | `0` System default (disabled for Windows Server 2008 R2) - `1` Enabled - `2` Explicitly disabled | - | Miniport that supports VMQ must not read this subkey. |
| `*BelowTenGigVmqEnabled` | Enable/disable VMQ on all adapters <10 Gbps. | `0` System default (disabled for Windows Server 2008 R2) - `1` Enabled - `2` Explicitly disabled | - | Miniport that supports VMQ must not read this subkey. |

> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/standardized-inf-keywords-for-vmq.md  
> https://docs.nvidia.com/networking/display/winofv55053000/ethernet+registry+keys#src-25134589_EthernetRegistryKeys-FlowControlOptions  
> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/virtual-machine-queue-architecture.md  
> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/introduction-to-ndis-virtual-machine-queue--vmq-.md


# Disable SR-IOV

Single Root I/O Virtualization (SR-IOV) is an extension to the PCI Express (PCIe) specification that improves network performance in virtualized environments. SR-IOV allows devices, such as network adapters, to separate access to their resources among various PCIe hardware functions, enabling near-native network performance in Hyper-V virtual machines.

> https://learn.microsoft.com/en-us/windows-hardware/drivers/network/overview-of-single-root-i-o-virtualization--sr-iov-  

It depends on your adapter/driver if SR-IOV is enabled/disabled by default:

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "*Sriov" = 0; // range 0-1
    "*SriovPreferred" = 0; // range 0-1
```

> [/docs/win-registry/sections/registry-values-research/intel-nic-values/](/docs/win-registry/sections/registry-values-research/intel-nic-values/)

| SubkeyName            | Value       | EnumDesc |
| --------------------  | ----------- | ---- |
| `*SRIOV`              | 0           | Disabled |
|                       | 1 (Default) | Enabled |
| `*SriovPreferred`     | 0 (Default) | Report RSS/VMQ (per *VmqOrRssPreferrence), do not report SR-IOV |
|                       | 1           | Report SR-IOV capabilities |

> https://learn.microsoft.com/en-us/windows-hardware/drivers/network/standardized-inf-keywords-for-sr-iov

```inf
, SRIOV Default switch registry keys.
,
HKR, NicSwitches\0, *SwitchId,   %REG_DWORD%, 0
HKR, NicSwitches\0, *SwitchName, %REG_SZ%, "%DefaultSwitchName%"
HKR, NicSwitches\0, *SwitchType,   %REG_DWORD%, 1
HKR, NicSwitches\0, *Flags,   %REG_DWORD%, 0
HKR, NicSwitches\0, *NumVFs,   %REG_DWORD%, 32

HKR, NDI\Params\*Sriov,      paramDesc, , %Sriov%
HKR, NDI\Params\*Sriov,      type,      , "enum"
HKR, NDI\Params\*Sriov,  Default,   0, "1"
HKR, NDI\Params\*Sriov\enum, 0,         , %Disabled%
HKR, NDI\Params\*Sriov\enum, 1,         , %Enabled%
HKR, "", *SRIOV, %REG_SZ%, "1"

HKR, NDI\Params\*VMQ,  ParamDesc, 0, "%VMQ%"
HKR, NDI\Params\*VMQ,  Type,      0, "enum"
HKR, NDI\Params\*VMQ,  Default,   0, "1"
HKR, NDI\Params\*VMQ,  Optional,  0, "0"
HKR, NDI\Params\*VMQ\enum,  "0",  0, "%Disabled%"
HKR, NDI\Params\*VMQ\enum,  "1",  0, "%Enabled%"
HKR, "", *VMQ, %REG_SZ%, "1"

HKR, NDI\Params\*VMQVlanFiltering,  ParamDesc, 0, "%VMQVlanFiltering%"
HKR, NDI\Params\*VMQVlanFiltering,  Type,      0, "enum"
HKR, NDI\Params\*VMQVlanFiltering,  Default,   0, "1"
HKR, NDI\Params\*VMQVlanFiltering,  Optional,  0, "0"
HKR, NDI\Params\*VMQVlanFiltering\enum,  "0",  0, "%Disabled%"
HKR, NDI\Params\*VMQVlanFiltering\enum,  "1",  0, "%Enabled%"
HKR, "", *VMQVlanFiltering, %REG_SZ%, "1"
```

# Disable FEC

FEC (forwarded error correction) improves link stability, but increases latency. Many high quality optics, direct attach cables, and backplane channels provide a stable link without FEC.

`Auto FEC`: Sets the FEC Mode based on the capabilities of the attached cable.  
`CL108 RS-FEC`: Selects only RS-FEC ability and request capabilities.  
`CL74 FC-FEC/BASE-R`: Selects only BASE-R ability and request capabilities.  
`No FEC`: Disables FEC.

> https://edc.intel.com/content/www/us/en/design/products/ethernet/adapters-and-devices-user-guide/forward-error-correction-fec-mode/


```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "FecMode" = 0; // range 0-3
```

> [/docs/win-registry/sections/registry-values-research/intel-nic-values/](/docs/win-registry/sections/registry-values-research/intel-nic-values/)

```c
RegistryKey<enum HdSplitLocation>::Initialize(
    (struct ADAPTER_CONTEXT *)((char *)*this + 1004),
    *this,
    *((NDIS_HANDLE *)*this + 383),
    (PUCHAR)"FecMode",
    0, // min
    3u, // max
    0, // default
    0,
    1),
```
```inf
HKR, Ndi\Params\FecMode,                         ParamDesc,              0, %FecMode%
HKR, Ndi\Params\FecMode,                         default,                0, "0"
HKR, Ndi\Params\FecMode,                         min,                    0, "0"
HKR, Ndi\Params\FecMode,                         max,                    0, "3"
HKR, Ndi\Params\FecMode\Enum,                    "0",                    0, %Auto_FEC%
HKR, Ndi\Params\FecMode\Enum,                    "1",                    0, %RS_FEC%
HKR, Ndi\Params\FecMode\Enum,                    "2",                    0, %FC_FEC%
HKR, Ndi\Params\FecMode\Enum,                    "3",                    0, %NO_FEC%
HKR, Ndi\Params\FecMode,                         type,                   0, "enum"
```

# Enable Legacy Switch Compatibility Mode

Probably a setting that controls how the adapter handles link negotiation when it's connected behind certain (usually older) network switches. There's no official documentation on it, but it seems to be disabled by default. Some older switches may have problems with modern auto negotiation behavior, enabling the mode (probably) changes how the NIC negotiates speed/duplex so that it behaves more like older hardware.

This should only be enabled, if needed. The text above is just a personal assumption.

`2` = Enabled  
`1` = Disabled

```inf
; Legacy Switch Compatibility Mode
HKR, Ndi\params\LinkNegotiationProcess,                 ParamDesc,              0, %LinkNegotiationProcess%
HKR, Ndi\params\LinkNegotiationProcess,                 default,                0, "1"
HKR, Ndi\params\LinkNegotiationProcess,                 type,                   0, "enum"
HKR, Ndi\params\LinkNegotiationProcess\enum,            "2",                    0, %Enabled%
HKR, Ndi\params\LinkNegotiationProcess\enum,            "1",                    0, %Disabled%
HKR, PROSetNdi\NdiExt\Params\LinkNegotiationProcess,    ExposeLevel,            0, "3"
```

# NDIS Poll Mode

`Threaded DPC + Adaptive` = NDIS poll mode disabled, aptive receive completion method, packet burst buffering via threaded DPC.  
`NDIS Poll Mode` = Packet burst handing disabled (unsupported), NDIS poll mode enabled.

## NDIS Poll Mode

"NDIS Poll Mode is an OS controlled polling execution model that drives the network interface datapath.

Previously, NDIS had no formal definition of a datapath execution context. NDIS drivers typically relied on Deferred Procedure Calls (DPCs) to implement their execution model. However using DPCs can overwhelm the system when long indication chains are made and avoiding this problem requires a lot of code that's tricky to get right. NDIS Poll Mode offers an alternative to DPCs and similar execution tools."

When enabled on RX side, the following capabilities are not be supported:
- AsyncReceiveIndicate
- Receive side Threaded DPC
- Force low resource indication

When enabled on TX side, the following capabilities are not be supported:
- Transmit side Threaded DPC
- TxMaxPostSendsCoalescing is limited to 32

For a detailed documentation, see:
> https://learn.microsoft.com/en-us/windows-hardware/drivers/network/ndis-poll-mode

| Value | Data | Comments |
| ---- | ---- | ---- |
| RecvCompletionMethod | Set to 4 to register and use Ndis Poll Mode | Default is 1 (Adaptive) |
| SendCompletionMethod | Set to 2 to register and use Ndis Poll Mode | Default is 1 (Interrupt) |

```inf
HKR, Ndi\params\*NdisPoll,       ParamDesc,            0, "Ndis Poll Mode"
HKR, Ndi\params\*NdisPoll,       Type,                 0, "enum"
HKR, Ndi\params\*NdisPoll,       Default,              0, "1"
HKR, Ndi\params\*NdisPoll,       Optional,             0, "0"
HKR, Ndi\params\*NdisPoll\enum,  "0",                  0, "Disabled"
HKR, Ndi\params\*NdisPoll\enum,  "1",                  0, "Enabled"
```

Note: `*NdisPoll` is available to NDIS 6.85 and later miniport drivers.

## AsyncReceiveIndicate (Packet Burst Handling)

This feature allows packet burst handling, while avoiding packet drops that may occur when a large amount of packets is sent in a short period of time.

"A threaded DPC is a DPC that the system executes at `IRQL = PASSIVE_LEVEL`. An ordinary DPC preempts the execution of all threads, and cannot be preempted by a thread or by another DPC. If the system has a large number of ordinary DPCs queued, or if one of those DPCs runs for a long period time, every thread will remain paused for an arbitrarily long period of time. Thus, each ordinary DPC increases the system latency, which can damage the performance of time-sensitive applications, such as audio or video playback. Conversely, a threaded DPC can be preempted by an ordinary DPC, but not by other threads. Therefore, the user should use threaded DPCs rather than ordinary DPCs, unless a particular DPC must not be preempted, even by another DPC."

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel";
    "ThreadDpcEnable" = 1; // KeThreadDpcEnable
```

> [/docs/win-registry/sections/registry-values-research/session-manager-values/](/docs/win-registry/sections/registry-values-research/session-manager-values/)  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-threaded-dpcs

| Data | Meaning |
| :----: | ---- |
| 0 | Disabled (default) |
| 1 | Enables packet burst buffering using threaded DPC |
| 2 | Enables packet burst buffering using polling |

> https://docs.nvidia.com/nvidia-winof-2-documentation-v23-7.pdf

## Receive Completion Method

Sets the completion methods of the receive packets, and it affects network throughput and CPU utilization. The supported methods are:

- Polling - increases the CPU utilization, because the system polls the received rings for incoming packets; however, it may increase the network bandwidth since the incoming packet is handled faster.
- Adaptive - combines the interrupt and polling methods dynamically, depending on traffic type and network usage.

```inf
HKR, NDI\Params\RecvCompletionMethod,  ParamDesc, 0, "%RecvCompletionMethod%"
HKR, NDI\Params\RecvCompletionMethod,  Type,  0, "enum"
HKR, NDI\Params\RecvCompletionMethod,  Default, 0, "1"
HKR, NDI\Params\RecvCompletionMethod,  Optional, 0, "0"
HKR, NDI\Params\RecvCompletionMethod\enum,  "0", 0, "%Polling%"
HKR, NDI\Params\RecvCompletionMethod\enum,  "1", 0, "%Adaptive%"
HKR, NDI\Params\RecvCompletionMethod\enum,  "2", 0x00000004 , ""
HKR, "", RecvCompletionMethod, 0, "1"
```

> https://docs.nvidia.com/networking/display/winofv55053000/performance+registry+keys
