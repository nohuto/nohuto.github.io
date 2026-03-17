---
title: 'Xbox Game Bar'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-xbox-game-bar'
sidebar:
  order: 6
---

GameDVR is a built-in gameplay capture (Xbox Game Bar) for clips/screenshots, with optional background recording.

---

"Game Bar Presence Writer is a component that is notified when a game's "presence" state (i.e. is a game running in the foreground) changes. This functionality is available in Windows 10 and later operating systems. By default, the existing Game Bar Presence Writer will set a user's Xbox Live presence state for a running game if the Xbox App is installed, the user is signed into their Xbox account, and the user has enabled Xbox Live presence to be set when they run a game on their PC. It is possible for Windows Application developers to override this default behavior with their own implementation."

> https://learn.microsoft.com/en-us/windows/win32/devnotes/gamebar-presencewriter

---

Miscellaneous notes:
```powershell
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : AppCaptureEnabled
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : CameraCaptureEnabledByDefault
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : HistoricalCaptureEnabled
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : HistoricalCaptureOnBatteryAllowed
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : HistoricalCaptureOnWirelessDisplayAllowed
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : KGLRevision
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : KGLToGCSUpdatedRevision
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : MicrophoneCaptureEnabled
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKSaveHistoricalVideo
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKTakeScreenshot
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleBroadcast
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCameraCapture
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom1
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom10
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom2
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom3
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom4
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom5
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom6
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom7
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom8
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleCustom9
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleGameBar
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleMicrophoneCapture
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleRecording
\Registry\User\S-0\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\GameDVR : VKToggleRecordingIndicator
```
