---
title: 'FSO'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#enable-fso'
sidebar:
  order: 34
---

This may not be accurate yet, it's preferable to disable FSO per application via the compability section.

### FSE (Fullscreen Exclusive)

Game takes exclusive control of the display.
- App sets display mode directly
- No desktop compositor in the path (DWM)
- Bad for Alt-Tab, overlays, and multi monitor

### FSO (Fullscreen Optimizations)

Windows feature that makes borderless/windowed behave like fullscreen.
- Runs as a flip-model, borderless window may be composed by DWM?
- Still allows overlays, Game Bar, better Alt-Tab
- Tries to give fullscreen-like latency and performance without true exclusive control

DX12 games don't support FSE.

![](https://github.com/nohuto/win-config/blob/main/system/images/swapchain.jpg?raw=true)

---

Caution: Disabling this option won't revert the changes like all other ones do, it'll disable FSO.

All values I found that are `GameDVR` related in `ResourcePolicyServer.dll`:
```c
GameDVR_DXGIHonorFSEWindowsCompatible
// 0 = FSO on
// 1 = FSO off

GameDVR_EFSEFeatureFlags
// 1 = EFSE on
// 0 = EFSE off

GameDVR_FSEBehavior
// 0 = FSO on
// 2 = FSO off

GameDVR_FSEBehaviorMode
// 0 = FSO on
// 2 = FSO off

GameDVR_HonorUserFSEBehaviorMode
// 0 = FSO on
// 1 = FSO off
```

`GameDVR_DSEBehavior` doesn't exist on my current system.

Disable/enable FSO for a specific application via `Properties > Compatibility > Change settings for all users` - `Disable fullscreen optimizations` or do it per user one step before.

```c
// User
HKCU\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\C:\Program Files (x86)\Steam\steamapps\common\Battlefield 6\bf6.exe	Type: REG_SZ, Length: 66, Data: ~ DISABLEDXMAXIMIZEDWINDOWEDMODE

// Machine
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\C:\Program Files (x86)\Steam\steamapps\common\Battlefield 6\bf6.exe	Type: REG_SZ, Length: 66, Data: ~ DISABLEDXMAXIMIZEDWINDOWEDMODE
```

> https://devblogs.microsoft.com/directx/demystifying-full-screen-optimizations/
> https://wiki.special-k.info/en/SwapChain
> https://wiki.special-k.info/Presentation_Model

---

Miscellaneous values:
```c
GameDVR_Enabled
GameDVR_GameGUID
// Seems to be located in HKCU\System\GameConfigStore\Children\*

Win32_AutoGameModeDefaultProfile
Win32_GameModeRelatedProcesses
Win32_GameModeUserRelatedProcesses
```
