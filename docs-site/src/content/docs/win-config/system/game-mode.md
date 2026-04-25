---
title: 'Game Mode'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

Game Mode should: "Prevents Windows Update from performing driver installations and sending restart notifications" Does it work? Not really, in my experience it tends to lower the priority and prevent driver updates (correct me if you've experienced otherwise) - It may also mess with process/thread priorities. Not all games support it, generally leave it enabled or benchmark the differences in equal scenarios.

Enabling/disabling it via the system settings only switches `AutoGameModeEnabled`:
```powershell
HKCU\Software\Microsoft\GameBar\AutoGameModeEnabled	Type: REG_DWORD, Length: 4, Data: 1
```
The value doesn't exist by default (not existing = `1`).

## Pseudocode Interpretation

It might set CPU affinites (`AffinitizeToExclusiveCpus`, `CpuExclusivityMaskHig`, `CpuExclusivityMaskLow`) for the game process and the maximum amount of cores the game uses (`MaxCpuCount`). The percentage of GPU memory (`PercentGpuMemoryAllocatedToGame`), GPU time (`PercentGpuTimeAllocatedToGame`) & system compositor (`PercentGpuMemoryAllocatedToSystemCompositor`) that will be dedicated to the game. It may also create a list of processes (`RelatedProcessNames`) that are gaming related, which means that they won't be affected from the game mode. These are just assumptions, I haven't looked into it in detail yet ([`GamingHandlers.c`](https://github.com/nohuto/win-config/blob/main/system/assets/gamemode-GamingHandlers.c)).

> "*Game mode tries to kind of steer away the processors from your game so the system itself and all the kernel threads and stuff like that are not going to use some processors, so your game can use those processors exclusively.*"
>
> — Pavel Yosifovich, [Windows Internals and Game Mode](https://youtu.be/h6BXMcRqYhA?t=3251)

- [Windows.Gaming.Preview.GamesEnumeration Namespace](https://learn.microsoft.com/en-us/uwp/api/windows.gaming.preview.gamesenumeration?view=winrt-28000)
