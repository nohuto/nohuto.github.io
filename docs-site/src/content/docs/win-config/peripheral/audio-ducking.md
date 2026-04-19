---
title: 'Audio Ducking'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 7
---

"Windows audio ducking is a dynamic audio processing technique that enables the **automatic adjustment of audio levels** between different audio sources on a Windows-based computer or operating system."
> https://multimedia.easeus.com/ai-article/windows-audio-ducking.html

Can be disabled manually via `mmsys.cpl > Communications` `Do nothing`.

`Mute all other sounds`:
```powershell
RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\UserDuckingPreference	Type: REG_DWORD, Length: 4, Data: 0
```
`Reduce the volume of other sounds by 80%` (default):
```powershell
RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\UserDuckingPreference	Type: REG_DWORD, Length: 4, Data: 1
```
`Reduce the volume of other sounds by 50%`:
```powershell
RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\UserDuckingPreference	Type: REG_DWORD, Length: 4, Data: 2
```
`Do nothing`:
```powershell
RegSetValue	HKCU\Software\Microsoft\Multimedia\Audio\UserDuckingPreference	Type: REG_DWORD, Length: 4, Data: 3
```

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/audioducking.png?raw=true)
