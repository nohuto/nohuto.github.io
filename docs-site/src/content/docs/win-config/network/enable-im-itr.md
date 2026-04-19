---
title: 'IM/ITR'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 17
---

Some NICs expose multiple interrupt-moderation levels. Use interrupt moderation for CPU-bound workloads and weigh host-CPU savings against added latency. For the lowest possible latency, disable Interrupt Moderation, accepting higher CPU use as a tradeoff. At higher link speeds more interrupts drive up CPU and hurt performance, increasing the ITR lowers the interrupt rate and improves performance. IM batches received packets and starts a timer on first arrival, interrupting when the buffer fills or the timer expires. Many NICs offer more than on/off, with low/medium/high rates that map to shorter or longer timers to favor latency or reduce interrupts.

> https://edc.intel.com/content/www/us/en/design/products/ethernet/adapters-and-devices-user-guide/interrupt-moderation-rate/  
> https://learn.microsoft.com/en-us/windows-server/networking/technologies/network-subsystem/net-sub-performance-tuning-nics?tabs=powershell#interrupt-moderation  
> https://enterprise-support.nvidia.com/s/article/understanding-interrupt-moderation

### Data Range

The correct data might be the comment data, if so edit it manually.
```c
Off: ITR = 0 (no limit)
Minimal: ITR = 200 // 32
Low: ITR = 400 // 64
Medium: ITR = 950 // 125
High: ITR = 2000 // 250
Extreme: ITR = 3600 // 500
Adaptive: ITR = 65535
```
ITR = Interrupt Throttle Rate.

## Setup Information

Data/default is driver specific.
```inf
;  Interrupt Throttle Rate
HKR, Ndi\Params\ITR,                                    ParamDesc,              0, %InterruptThrottleRate%
HKR, Ndi\Params\ITR,                                    default,                0, "65535"
HKR, Ndi\Params\ITR\Enum,                               "65535",                0, %Adaptive%
HKR, Ndi\Params\ITR\Enum,                               "3600",                 0, %Extreme%
HKR, Ndi\Params\ITR\Enum,                               "2000",                 0, %High%
HKR, Ndi\Params\ITR\Enum,                               "950",                  0, %Medium%
HKR, Ndi\Params\ITR\Enum,                               "400",                  0, %Low%
HKR, Ndi\Params\ITR\Enum,                               "200",                  0, %Minimal%
HKR, Ndi\Params\ITR\Enum,                               "0",                    0, %Off%
HKR, Ndi\Params\ITR,                                    type,                   0, "enum"

;  Interrupt Throttle Rate
HKR, Ndi\Params\ITR,                                    ParamDesc,              0, %InterruptThrottleRate%
HKR, Ndi\Params\ITR,                                    default,                0, "64"
HKR, Ndi\Params\ITR\Enum,                               "500",                  0, %Extreme%
HKR, Ndi\Params\ITR\Enum,                               "250",                  0, %High%
HKR, Ndi\Params\ITR\Enum,                               "125",                  0, %Medium%
HKR, Ndi\Params\ITR\Enum,                               "64",                   0, %Low%
HKR, Ndi\Params\ITR\Enum,                               "32",                   0, %Minimal%
HKR, Ndi\Params\ITR\Enum,                               "0",                    0, %Off%
HKR, Ndi\Params\ITR,                                    type,                   0, "enum"

; *InterruptModeration
HKR, Ndi\Params\*InterruptModeration,                   ParamDesc,              0, %InterruptModeration%
HKR, Ndi\Params\*InterruptModeration,                   default,                0, "1"
HKR, Ndi\Params\*InterruptModeration\Enum,              "0",                    0, %Disabled%
HKR, Ndi\Params\*InterruptModeration\Enum,              "1",                    0, %Enabled%
HKR, Ndi\Params\*InterruptModeration,                   type,                   0, "enum"
```

```
\Registry\Machine\SYSTEM\ControlSet001\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\00XX : ITR
\Registry\Machine\SYSTEM\ControlSet001\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\00XX : *InterruptModeration
```

---

Miscellaneous notes:
```c
"RecvIntModCount" = ?; // found it in the "Mellanox ConnectX based IPoIB Adapter (NDIS 6.4)" driver
"RecvIntModTime" = ?; // ^
"SendIntModCount" = ?; // ^
"SendIntModTime" = ?; // ^
```
