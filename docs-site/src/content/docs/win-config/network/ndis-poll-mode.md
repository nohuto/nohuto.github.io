---
title: 'NDIS Poll Mode'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 30
---

`Threaded DPC + Adaptive` = NDIS poll mode disabled, aptive receive completion method, packet burst buffering via threaded DPC.  
`NDIS Poll Mode` = Packet burst handing disabled (unsupported), NDIS poll mode enabled.

## NDIS Poll Mode

> "*NDIS Poll Mode is an OS controlled polling execution model that drives the network interface datapath.*
>
> *Previously, NDIS had no formal definition of a datapath execution context. NDIS drivers typically relied on Deferred Procedure Calls (DPCs) to implement their execution model. However using DPCs can overwhelm the system when long indication chains are made and avoiding this problem requires a lot of code that's tricky to get right. NDIS Poll Mode offers an alternative to DPCs and similar execution tools.*"
>
> — Microsoft, [NDIS poll mode](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/ndis-poll-mode)

When enabled on RX side, the following capabilities are not be supported:
- AsyncReceiveIndicate
- Receive side Threaded DPC
- Force low resource indication

When enabled on TX side, the following capabilities are not be supported:
- Transmit side Threaded DPC
- TxMaxPostSendsCoalescing is limited to 32

| Value | Data | Comments |
| ---- | ---- | ---- |
| RecvCompletionMethod | Set to 4 to register and use Ndis Poll Mode | Default is 1 (Adaptive) |
| SendCompletionMethod | Set to 2 to register and use Ndis Poll Mode | Default is 1 (Interrupt) |

### Setup Information

```inf
HKR, Ndi\params\*NdisPoll,       ParamDesc,            0, "Ndis Poll Mode"
HKR, Ndi\params\*NdisPoll,       Type,                 0, "enum"
HKR, Ndi\params\*NdisPoll,       Default,              0, "1"
HKR, Ndi\params\*NdisPoll,       Optional,             0, "0"
HKR, Ndi\params\*NdisPoll\enum,  "0",                  0, "Disabled"
HKR, Ndi\params\*NdisPoll\enum,  "1",                  0, "Enabled"
```

Note: `*NdisPoll` is available to NDIS 6.85 and later miniport drivers.

## [AsyncReceiveIndicate](https://docs.nvidia.com/nvidia-winof-2-documentation-v23-7.pdf) (Packet Burst Handling)

This feature allows packet burst handling, while avoiding packet drops that may occur when a large amount of packets is sent in a short period of time.

> "*A threaded DPC is a DPC that the system executes at `IRQL = PASSIVE_LEVEL`. An ordinary DPC preempts the execution of all threads, and cannot be preempted by a thread or by another DPC. If the system has a large number of ordinary DPCs queued, or if one of those DPCs runs for a long period time, every thread will remain paused for an arbitrarily long period of time. Thus, each ordinary DPC increases the system latency, which can damage the performance of time-sensitive applications, such as audio or video playback. Conversely, a threaded DPC can be preempted by an ordinary DPC, but not by other threads. Therefore, the user should use threaded DPCs rather than ordinary DPCs, unless a particular DPC must not be preempted, even by another DPC.*"
>
> — Microsoft, [Threaded DPCs](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-threaded-dpcs)

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel";
    "ThreadDpcEnable" = 1; // KeThreadDpcEnable
```

| Data | Meaning |
| :----: | ---- |
| 0 | Disabled (default) |
| 1 | Enables packet burst buffering using threaded DPC |
| 2 | Enables packet burst buffering using polling |

## [Receive Completion Method](https://docs.nvidia.com/nvidia-winof-2-documentation-v23-7.pdf)

Sets the completion methods of the receive packets, and it affects network throughput and CPU utilization. The supported methods are:

- Polling - increases the CPU utilization, because the system polls the received rings for incoming packets; however, it may increase the network bandwidth since the incoming packet is handled faster.
- Adaptive - combines the interrupt and polling methods dynamically, depending on traffic type and network usage.

### Setup Information

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
