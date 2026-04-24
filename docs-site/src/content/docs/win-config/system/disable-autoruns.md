---
title: 'Autoruns'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 33
---

The `Open` buttons downloads & executes [`Autoruns`](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns). It's recommended to disable all kind of autoruns in the `Logon` section that you don't need, examples:
```c
OneDrive
Spotify
Discord
Steam
WingetUI
Lghub
SecurityHealth

Microsoft Edge // preferable remove edge from the mounted image, otherwise it'll create keys/values in many different places
```

Try to minimize the amount of applications that run automatically on system startup. You can go through the other sections, but this option was created for the `Logon` section, see `Disable Scheduled Tasks`/`Disable Services`.

See your current autoruns of installed apps:
```powershell
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
```
```powershell
HKLM\Software\Microsoft\Windows\CurrentVersion\Run
```
