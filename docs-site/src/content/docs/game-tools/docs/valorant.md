---
title: 'Valorant'
description: 'Generated from game-tools file: valorant/desc.md.'
editUrl: 'https://github.com/nohuto/game-tools/blob/main/valorant/desc.md'
sidebar:
  order: 5
---

| Option                    | Details                                                           |
|---------------------------------------|-------------------------------------------------------------------|
| `SettingsUserSettings.ini` & `RiotUserSettings.ini` Configuration | __Let you choose:__ <br> - Resolution <br> - FPS Cap <br> - Enemy color <br> - NVIDIA Reflex <br> You still have to apply the settings from the pictures above! |
| **QoS Policy**                    | - High priority packet handling (DSCP) <br> - No bandwidth throttling <br> [win-config/network - QoS-Policy](/docs/win-config/network/qos-policy/) includes more information|


## TUI Preview

![](https://github.com/nohuto/game-tools/blob/main/valorant/media/valoranttui.png?raw=true)

## In-Game Settings

These are only the settings that cannot be applied via the script (you can enable bullet tracers if desired):

![](https://github.com/nohuto/game-tools/blob/main/valorant/media/val1.png?raw=true)
![](https://github.com/nohuto/game-tools/blob/main/valorant/media/val2.png?raw=true)
![](https://github.com/nohuto/game-tools/blob/main/valorant/media/val3.png?raw=true)
![](https://github.com/nohuto/game-tools/blob/main/valorant/media/val4.png?raw=true)
![](https://github.com/nohuto/game-tools/blob/main/valorant/media/val5.png?raw=true)

## Download

It might fail execution if the powershell execution policy is set to it's default values. See [PS Unrestricted Policy](https://github.com/nohuto/win-config/blob/main/security/desc.md#ps-unrestricted-policy) for details.

> [valorant/NV-VALORANT-Tool](https://github.com/nohuto/game-tools/blob/main/valorant/NV-VALORANT-Tool.ps1)
