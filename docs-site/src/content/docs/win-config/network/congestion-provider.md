---
title: 'Congestion Provider'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#congestion-provider'
sidebar:
  order: 5
---

Placeholder.

> https://www3.cs.stonybrook.edu/~anshul/comsnets24_bbrbbrv2.pdf  
> https://github.com/google/bbr  
> https://www.rfc-editor.org/rfc/rfc6582  
> https://internet2.edu/wp-content/uploads/2022/12/techex22-AdvancedNetworking-ExploringtheBBRv2CongestionControlAlgorithm-Tierney.pdf  
> https://datatracker.ietf.org/meeting/104/materials/slides-104-iccrg-an-update-on-bbr-00  
> https://www.speedguide.net/articles/tcp-congestion-control-algorithms-comparison-7423  
> https://datatracker.ietf.org/meeting/105/materials/slides-105-iccrg-bbr-v2-a-model-based-congestion-control-00

Get your current congestion provider, by pasting the following into powershell:
```
Get-NetTCPSetting | Select SettingName, CongestionProvider
```

![](https://github.com/nohuto/win-config/blob/main/network/images/congnet.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/network/images/congnet2.png?raw=true)
