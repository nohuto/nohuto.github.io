---
title: 'Congestion Provider'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#congestion-provider'
sidebar:
  order: 5
---

The following information isn't meant to be complete or whatever, it's a short overview including some basics.

## Congestion and when it happens

[Congestion control](https://datatracker.ietf.org/doc/rfc5681/) lives in the kernel transport layer, a socket gets a TCP setting/template, and that template carries the congestion provider and related TCP behavior. Congestion happens when one or more flows put more data onto the path than the bottleneck can forward at that moment, so packets build up in queues or get dropped. Windows can apply these settings globally, automatically, or through transport filters bound to prefixes or port ranges.

Note that CongestionProvider (as the cmdlet `Get-NetTCPSetting` tells) controls TCP behavior.

### Terms

[*Queue buildup*](https://www.rfc-editor.org/rfc/rfc7567) happens when packets reach the bottleneck faster than they leave. That is the basic congestion event.

*RTT growth* is usually the earliest visible symptom, because extra in-flight data turns into queueing delay. CTCP explicitly uses RTT growth as an early signal, especially on higher-latency paths.

[*ECN marking*](https://www.rfc-editor.org/rfc/rfc3168.html) happens on ECN-enabled paths when queues cross a marking threshold. This is typical in controlled datacenter fabrics and Hyper-V/virtual-switch environments built for DCTCP.

*Packet loss* happens when queue growth exceeds available buffer, or when the path has random/noisy loss. Loss based algorithms treat that as the main congestion signal.

## SettingName Table

| SettingName | Purpose / When to use |
|---|---|
| `Automatic` | Default selector. Uses latency to choose `Internet` or `Datacenter`. If `AutomaticUseCustom` is enabled, it chooses `InternetCustom` or `DatacenterCustom` instead. |
| `Internet` | Built-in template for higher latency, lower throughput networks. |
| `Datacenter` | Built-in template for lower latency, higher throughput networks. |
| `Compat` | Compatibility template for legacy equipment or older application/network behavior. |
| `InternetCustom` | Custom Internet side template. Use when you want to override the provider. |
| `DatacenterCustom` | Custom datacenter side template. Use when you want to override the provider. |

## CongestionProvider Table

| Provider | Description / algorithm |
|---|---|
| `Default` | System default provider ([CUBIC](https://www.ietf.org/rfc/rfc9438.html)) |
| `CTCP` | Microsoft hybrid loss + delay control. It adds a delay based window to standard TCP behavior and uses RTT/queue growth as an early signal.|
| `DCTCP` | ECN-based datacenter control. It estimates the fraction of marked packets and reduces the window proportionally, keeping queues small. |
| [`CUBIC`](https://www.ietf.org/rfc/rfc9438.html) | Loss based control with a cubic window growth function after a congestion event. Built for scalable high BDP (bandwidth delay product) behavior. |
| `BBR2` | BBR = Bottleneck Bandwidth and Round-trip Time. Public literature describes it as using delivery rate, RTT, and loss to target high throughput with low queueing. |

See your current congestion provider via:
```powershell
Get-NetTCPSetting | Select SettingName, CongestionProvider
```
