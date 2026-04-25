---
title: 'RSC/URO'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 25
---

> "*When receiving data, the miniport driver, NDIS, and TCP/IP must all look at each protocol data unit (PDU) header information separately. When large amounts of data are being received, a large amount of overhead is created. Receive segment coalescing (RSC) reduces this overhead by coalescing a sequence of received segments and passing them to the host TCP/IP stack in one operation, so that NDIS and TCP/IP need to only look at one header for the entire sequence.*"
>
> — Microsoft Learn, [Receive segment coalescing](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/overview-of-receive-segment-coalescing)

> "*Starting in Windows 11, version 24H2, UDP receive segment coalescing offload (URO) enables network interface cards (NICs) to coalesce UDP receive segments. NICs can combine UDP datagrams from the same flow that match a set of rules into a logically contiguous buffer. These combined datagrams are then indicated to the Windows networking stack as a single large packet.*
>
> *Coalescing UDP datagrams reduces the CPU cost to process packets in high-bandwidth flows, resulting in higher throughput and fewer cycles per byte.*"
>
> — Microsoft Learn, [UDP receive segment coalescing offload](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/udp-rsc-offload)

## Registry Value Ranges

`"*UdpRsc": { "Type": "REG_SZ", "Data": 1 }` causes high usage of the system idle process for whatever reason, I'll leave it out for now.

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
    "*RSCIPv4" = 0; // range 0-1
    "*RSCIPv6" = 0; // range 0-1
    "ForceRscEnabled" = 0; // range 0-1
    "RscMode" = 1; // range 0-2
```

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
