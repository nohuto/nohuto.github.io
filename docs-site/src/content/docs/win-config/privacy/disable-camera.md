---
title: 'Camera'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 29
---

Disallows the use of a camera on your system, by denying access via `LetAppsAccessCamera`/`AllowCamera`/services (and app permission).

| Service | Description |
| --- | --- |
| `FrameServer` | Enables multiple clients to access video frames from camera devices. |
| `FrameServerMonitor` | Monitors the health and state for the Windows Camera Frame Server service. |

`Disable Lock Screen Camera`:  
"Disables the lock screen camera toggle switch in PC Settings and prevents a camera from being invoked on the lock screen.By default, users can enable invocation of an available camera on the lock screen.If you enable this setting, users will no longer be able to enable or disable lock screen camera access in PC Settings, and the camera cannot be invoked on the lock screen." (`ControlPanelDisplay.admx`)

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Let Windows apps access the camera](https://noverse.dev/policies?p=AppPrivacy*LetAppsAccessCamera) | `HKLM\Software\Policies\Microsoft\Windows\AppPrivacy` | `LetAppsAccessCamera` |
| [Allow Use of Camera](https://noverse.dev/policies?p=Camera*L_AllowCamera) | `HKLM\software\Policies\Microsoft\Camera` | `AllowCamera` |
| [Prevent enabling lock screen camera](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoLockScreenCamera) | `HKLM\Software\Policies\Microsoft\Windows\Personalization` | `NoLockScreenCamera` |
