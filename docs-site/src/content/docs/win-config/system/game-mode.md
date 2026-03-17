---
title: 'Game Mode'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#game-mode'
sidebar:
  order: 11
---

Game Mode should: "Prevents Windows Update from performing driver installations and sending restart notifications" Does it work? Not really, in my experience it tends to lower the priority and prevent driver updates (correct me if you've experienced otherwise) - It may also mess with process/thread priorities. Not all games support it, generally leave it enabled or benchmark the differences in equal scenarios.

It might set CPU affinites (`AffinitizeToExclusiveCpus`, `CpuExclusivityMaskHig`, `CpuExclusivityMaskLow`) for the game process and the maximum amount of cores the game uses (`MaxCpuCount`). The percentage of GPU memory (`PercentGpuMemoryAllocatedToGame`), GPU time (`PercentGpuTimeAllocatedToGame`) & system compositor (`PercentGpuMemoryAllocatedToSystemCompositor`) that will be dedicated to the game. It may also create a list of processes (`RelatedProcessNames`) that are gaming related, which means that they won't be affected from the game mode. These are just assumptions, I haven't looked into it in detail yet (`GamingHandlers.c`).

Pavel Yosifovich says: "Game mode tries to kind of steer away the processors from your game so the system itself and all the kernel threads and stuff like that are not going to use some processors, so your game can use those processors exclusively."
> https://youtu.be/h6BXMcRqYhA?t=3251

Enabling/disabling it via the system settings only switches `AutoGameModeEnabled`:
```powershell
SystemSettings.exe  HKCU\Software\Microsoft\GameBar\AutoGameModeEnabled	Type: REG_DWORD, Length: 4, Data: 1
```
The value doesn't exist by default (not existing = `1`). Ignore `GameBar.txt`, it shows read values.

> [system/assets | gamemode-GamingHandlers.c](https://github.com/nohuto/win-config/blob/main/system/assets/gamemode-GamingHandlers.c)  
> https://support.xbox.com/en-US/help/games-apps/game-setup-and-play/use-game-mode-gaming-on-pc  
> https://learn.microsoft.com/en-us/uwp/api/windows.gaming.preview.gamesenumeration?view=winrt-26100

---

Miscellaneous notes:
```powershell
\Registry\User\S-ID\SOFTWARE\Microsoft\GameBar : GamepadDoublePressIntervalMs
\Registry\User\S-ID\SOFTWARE\Microsoft\GameBar : GamepadLongPressRumbleDurationMs
\Registry\User\S-ID\SOFTWARE\Microsoft\GameBar : GamepadNexusChordCombo
\Registry\User\S-ID\SOFTWARE\Microsoft\GameBar : GamepadNexusChordEnabled
\Registry\User\S-ID\SOFTWARE\Microsoft\GameBar : GamepadShortPressIntervalMs
```
