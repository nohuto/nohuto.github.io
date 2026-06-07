---
title: 'Mobility Center'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 37
---

Note that this is a laptop only feature. The "Mobility Center" is a feature that includes controls for screen brightness, power options, volume, battery status, wireless network status, external display settings, and more.

![](https://github.com/nohuto/win-config/blob/main/system/images/mobility-center.png?raw=true)

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off Windows Mobility Center](https://noverse.dev/policies?p=MobilePCMobilityCenter*MobilityCenterEnable_2) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\MobilityCenter` | `NoMobilityCenter` |
