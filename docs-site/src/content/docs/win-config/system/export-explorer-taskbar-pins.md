---
title: 'Export Explorer/Taskbar Pins'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#export-explorertaskbar-pins'
sidebar:
  order: 23
---

Can be useful when creating your own image and trying to automate the installation and configuration part.

### Quick Access Pins

Quick access pins are saved in a file named `f01b4d95cf55d32a.automaticDestinations-ms`, located at:
```bat
%appdata%\Microsoft\Windows\Recent\AutomaticDestinations
```
You can either terminate `explorer` while copying it to the path, or just restart it afterwards.
```bat
copy /y ".\f01b4d95cf55d32a.automaticDestinations-ms" "%appdata%\Microsoft\Windows\Recent\AutomaticDestinations"
```

### Taskbar Pins

Taskbar pins are saved in a folder and a key, the folder includes the shortcuts:
```bat
%appdata%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar
```
```powershell
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Taskband # Only "Favorites" is needed
```
You can convert the exported `.reg` to `.ps1` with:
> https://reg2ps.azurewebsites.net/

Post install example (copy the `TaskBar` folder to any folder):
```powershell
del "$env:appdata\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar" -Recurse -Force
xcopy ".\TaskBar" "%appdata%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar" /e /i /y
```
> https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/xcopy

The option gets current values of `Favorites` (taskbar pins) & `UIOrderList` (system tray icons) and copies all necessary files to `$home\Desktop` (edit `$dest` & `$bat` to whatever you want).
