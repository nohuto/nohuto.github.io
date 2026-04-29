---
title: 'FSO'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 34
---

This isn't accurate nor complete yet, it's preferable to disable FSO per application via the compability section if doing so. Disabling this option won't revert the changes like all other ones do, it'll disable FSO.

See [demystifying-full-screen-optimizations](https://devblogs.microsoft.com/directx/demystifying-full-screen-optimizations/)/[SwapChain](https://wiki.special-k.info/en/SwapChain)/[PresentationModel](https://wiki.special-k.info/Presentation_Model) for some details.

## ResourcePolicyServer

All values I found that are `GameDVR` related in `ResourcePolicyServer.dll`:
```c
GameDVR_DXGIHonorFSEWindowsCompatible
GameDVR_EFSEFeatureFlags
GameDVR_FSEBehavior
GameDVR_FSEBehaviorMode
GameDVR_HonorUserFSEBehaviorMode
```

`GameDVR_DSEBehavior` doesn't exist on my current system.

## Compability Captures

Disable/enable FSO for a specific application via `Properties > Compatibility > Change settings for all users` - `Disable fullscreen optimizations` or do it per user one step before.

```c
// User
HKCU\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\C:\Program Files (x86)\Steam\steamapps\common\Battlefield 6\bf6.exe	Type: REG_SZ, Length: 66, Data: ~ DISABLEDXMAXIMIZEDWINDOWEDMODE

// Machine
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers\C:\Program Files (x86)\Steam\steamapps\common\Battlefield 6\bf6.exe	Type: REG_SZ, Length: 66, Data: ~ DISABLEDXMAXIMIZEDWINDOWEDMODE
```
