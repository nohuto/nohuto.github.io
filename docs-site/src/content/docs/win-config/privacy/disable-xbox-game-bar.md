---
title: 'Xbox Game Bar'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 7
---

GameDVR is a built-in gameplay capture (Xbox Game Bar) for clips/screenshots, with optional background recording.

## WindowsMediaCapture Settings

```c
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR";
    "AudioEncodingBitrate" // REG_DWORD
    "AudioCaptureEnabled" // REG_DWORD, bool
    "CustomVideoEncodingBitrate" // REG_DWORD
    "CustomVideoEncodingHeight" // REG_DWORD
    "CustomVideoEncodingWidth" // REG_DWORD
    "AppCaptureEnabled" // REG_DWORD, bool
    "HistoricalBufferLength" // REG_DWORD, min 10, if HistoricalBufferLengthUnit==1 max 600, otherwise max is GameDVRUtility::MaxHistoricalBufferLengthInMegabytes()
    "HistoricalBufferLengthUnit" // REG_DWORD
    "HistoricalCaptureEnabled" // REG_DWORD, bool
    "HistoricalCaptureOnBatteryAllowed" // REG_DWORD, bool
    "HistoricalCaptureOnWirelessDisplayAllowed" // REG_DWORD, bool
    "MaximumRecordLength" // REG_QWORD, validated to 300000000-143700000000 (100 ns units)
    "VideoEncodingBitrateMode" // REG_DWORD
    "VideoEncodingResolutionMode" // REG_DWORD
    "VideoEncodingFrameRateMode" // REG_DWORD
    "EchoCancellationEnabled" // REG_DWORD, bool
    "CursorCaptureEnabled" // REG_DWORD, bool
    "VKToggleGameBar" // REG_DWORD, ASCII/virtual-key value for the Game Bar key binding
    "VKMToggleGameBar" // REG_DWORD, 0/1 toggle for whether the Game Bar shortcut is enabled
    "VKSaveHistoricalVideo" // REG_DWORD, ASCII/virtual-key value for the save historical video key binding
    "VKMSaveHistoricalVideo" // REG_DWORD, 0/1 toggle for whether the save historical video shortcut is enabled
    "VKToggleRecording" // REG_DWORD, ASCII/virtual-key value for the recording key binding
    "VKMToggleRecording" // REG_DWORD, 0/1 toggle for whether the recording shortcut is enabled
    "VKTakeScreenshot" // REG_DWORD, ASCII/virtual-key value for the screenshot key binding
    "VKMTakeScreenshot" // REG_DWORD, 0/1 toggle for whether the screenshot shortcut is enabled
    "VKToggleRecordingIndicator" // REG_DWORD, ASCII/virtual-key value for the recording-indicator key binding
    "VKMToggleRecordingIndicator" // REG_DWORD, 0/1 toggle for whether the recording-indicator shortcut is enabled
    "VKToggleMicrophoneCapture" // REG_DWORD, ASCII/virtual-key value for the microphone-capture key binding
    "VKMToggleMicrophoneCapture" // REG_DWORD, 0/1 toggle for whether the microphone-capture shortcut is enabled
    "VKToggleCameraCapture" // REG_DWORD, ASCII/virtual-key value for the camera-capture key binding
    "VKMToggleCameraCapture" // REG_DWORD, 0/1 toggle for whether the camera-capture shortcut is enabled
    "VKToggleBroadcast" // REG_DWORD, ASCII/virtual-key value for the broadcast key binding
    "VKMToggleBroadcast" // REG_DWORD, 0/1 toggle for whether the broadcast shortcut is enabled
    "MicrophoneCaptureEnabled" // REG_DWORD, bool
    "SystemAudioGain" // REG_QWORD, clamped to 0.0-2.0 and stored as gain * 10000
    "MicrophoneGain" // REG_QWORD, clamped to 0.0-2.0 and stored as gain * 10000

"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppBroadcast\\GlobalSettings";
    "AudioCaptureEnabled" // REG_DWORD, bool
    "MicrophoneCaptureEnabledByDefault" // REG_DWORD, bool
    "EchoCancellationEnabled" // REG_DWORD, bool
    "CursorCaptureEnabled" // REG_DWORD, bool
    "SystemAudioGain" // REG_QWORD, clamped to 0.0-2.0 and stored as gain * 10000
    "MicrophoneGain" // REG_QWORD, clamped to 0.0-2.0 and stored as gain * 10000
    "CameraCaptureEnabledByDefault" // REG_DWORD, bool
    "CameraOverlayLocation" // REG_DWORD
    "CameraOverlaySize" // REG_DWORD
    "SelectedCameraId" // REG_SZ
```

> [privacy/assets | gamebar-WindowsMediaCaptureIAppCaptureSettings.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/gamebar-WindowsMediaCaptureIAppCaptureSettings.c) (`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR`)  
> [privacy/assets | gamebar-WindowsMediaCaptureIAppBroadcastGlobalSettings.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/gamebar-WindowsMediaCaptureIAppBroadcastGlobalSettings.c) (`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppBroadcast\\GlobalSettings`)  
> https://github.com/MicrosoftDocs/windows-dev-docs/blob/docs/hub/apps/develop/settings/settings-windows-11.md#gaming-game-bar-game-mode-gaming-shortcuts

---

"Game Bar Presence Writer is a component that is notified when a game's "presence" state (i.e. is a game running in the foreground) changes. This functionality is available in Windows 10 and later operating systems. By default, the existing Game Bar Presence Writer will set a user's Xbox Live presence state for a running game if the Xbox App is installed, the user is signed into their Xbox account, and the user has enabled Xbox Live presence to be set when they run a game on their PC. It is possible for Windows Application developers to override this default behavior with their own implementation."

> https://learn.microsoft.com/en-us/windows/win32/devnotes/gamebar-presencewriter
