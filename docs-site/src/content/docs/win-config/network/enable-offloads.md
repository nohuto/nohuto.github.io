---
title: 'Offloads'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#enable-offloads'
sidebar:
  order: 14
---

Network offload features transfer processing tasks from the CPU to the network adapter hardware, reducing system overhead and improving overall network performance. Common offload features include TCP checksum offload, Large Send Offload (LSO), and Receive Side Scaling (RSS).

Enabling network adapter offload features is usually beneficial. However, the network adapter might not be powerful enough to handle the offload capabilities with high throughput. For example, consider a network adapter with limited hardware resources. In that case, enabling segmentation offload features might reduce the maximum sustainable throughput of the adapter. However, if the reduced throughput is acceptable, you should enable the segmentation offload features.

Excludes (deprecated, chimney too):
```json
"SaOffloadCapacityEnabled" = 0
```

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\00XX";
  "*IPChecksumOffloadIPv4" = 3; // range 0-3
  "*LsoV1IPv4" = 1; // range 0-1
  "*LsoV2IPv4" = 1; // range 0-1
  "*LsoV2IPv6" = 1; // range 0-1
  "*PMARPOffload" = 0; // range 0-1
  "*PMNSOffload" = 0; // range 0-1
  "*TCPChecksumOffloadIPv4" = 3; // range 0-3
  "*TCPChecksumOffloadIPv6" = 3; // range 0-3
  "*UDPChecksumOffloadIPv4" = 3; // range 0-3
  "*UDPChecksumOffloadIPv6" = 3; // range 0-3

  "LSOSize" = 64000; // range 1024-64000 - The maximum number of bytes that the TCP/IP stack can pass to an adapter in a single packet.
  "LSOMinSegment" = 2; // range 2-32 - The minimum number of segments that a large TCP packet must be divisible by, before the transport can offload it to a NIC for segmentation.
  "LSOTcpOptions" = 1; // range 0-1 - Enables that the miniport driver to segment a large TCP packet whose TCP header contains TCP options.
  "LSOIpOptions" = 1; // range 0-1 - Enables its NIC to segment a large TCP packet whose IP header contains IP options.

```

| Keyword | Description | Default | Minimum | Maximum |
| --- | --- | --- | --- | --- |
| `*IPChecksumOffloadIPv4` | Device IPv4 checksum handling (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*TCPChecksumOffloadIPv4` | TCP checksum offload for IPv4 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*TCPChecksumOffloadIPv6` | TCP checksum offload for IPv6 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*UDPChecksumOffloadIPv4` | UDP checksum offload for IPv4 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*UDPChecksumOffloadIPv6` | UDP checksum offload for IPv6 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*LsoV1IPv4` | Large Send Offload V1 for IPv4 (0 disabled, 1 enabled) | 1 | 0 | 1 |
| `*LsoV2IPv4` | Large Send Offload V2 for IPv4 (0 disabled, 1 enabled) | 1 | 0 | 1 |
| `*LsoV2IPv6` | Large Send Offload V2 for IPv6 (0 disabled, 1 enabled) | 1 | 0 | 1 |
| `*IPsecOffloadV1IPv4` | IPsec offload V1 for IPv4 (0 disabled, 1 AH enabled, 2 ESP enabled, 3 AH & ESP enabled) | 3 | 0 | 3 |
| `*IPsecOffloadV2` | IPsec offload V2 (0 disabled, 1 AH enabled, 2 ESP enabled, 3 AH & ESP enabled) | 3 | 0 | 3 |
| `*IPsecOffloadV2IPv4` | IPsec offload V2 for IPv4 (0 disabled, 1 AH enabled, 2 ESP enabled, 3 AH & ESP enabled) | 3 | 0 | 3 |
| `*TCPUDPChecksumOffloadIPv4` | Combined IP/TCP/UDP checksum offload for IPv4 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*TCPUDPChecksumOffloadIPv6` | Combined TCP/UDP checksum offload for IPv6 packets (0 disabled, 1 Tx enabled, 2 Rx enabled, 3 Tx & Rx enabled) | 3 | 0 | 3 |
| `*PMARPOffload` | A value that describes whether the device should be enabled to offload the Address Resolution Protocol (ARP) when the system enters a sleep state. | 1 | 0 | 1 |
| `*PMNSOffload` | A value that describes whether the device should be enabled to offload neighbor solicitation (NS) when the system enters a sleep state. | 1 | 0 | 1 |
| `*PMWiFiRekeyOffload` | A value that describes whether the device should be enabled to offload group temporal key (GTK) rekeying for wake-on-wireless-LAN (WOL) when the computer enters a sleep state. | 1 | 0 | 1 |

> [/docs/win-registry/sections/registry-values-research/intel-nic-values/](/docs/win-registry/sections/registry-values-research/intel-nic-values/)  
> https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-performance-top  
> https://www.intel.com/content/www/us/en/support/articles/000005593/ethernet-products.html  
> https://docs.nvidia.com/networking/display/winof2v320/configuring+the+driver+registry+keys#src-111583782_ConfiguringtheDriverRegistryKeys-OffloadRegistryKeys  
> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/standardized-inf-keywords-for-power-management.md  
> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/network/using-registry-values-to-enable-and-disable-task-offloading.md
