---
title: 'PowerShell Colors'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#powershell-colors'
sidebar:
  order: 29
---

Since `powershell.exe` has default color of white (foreground) and blue (background), some may want to change it. If you use Windows Terminal, this option will have no effect.

`ScreenColors` value, located in `HKCU\Console\%WINDIR%_System32_WindowsPowerShell_v1.0_powershell.exe`  
`0-3` bit = `Foreground color`  
`4-7` bit = `Background color`

### Color Table

| Color | Binary | Decimal |
| ----- | :----: | :-----: |
| Black | `0000` | `0` |
| DarkBlue | `0001` | `1` |
| DarkGreen | `0010` | `2` |
| DarkCyan | `0011` | `3` |
| DarkRed | `0100` | `4` |
| DarkMagenta | `0101` | `5` |
| DarkYellow | `0110` | `6` |
| Gray | `0111` | `7` |
| DarkGray | `1000` | `8` |
| Blue | `1001` | `9` |
| Green | `1010` | `10` |
| Cyan | `1011` | `11` |
| Red | `1100` | `12` |
| Magenta | `1101` | `13` |
| Yellow | `1110` | `14` |
| White | `1111` | `15` |

Calculate it on your own, by using [bitmask-calc](https://github.com/nohuto/bitmask-calc) - e.g. set bit `1-3` and `7`, to get `Yellow` (foreground) and `DarkGray` (background).

## Miscellaneous Notes

If you've set a custom foreground/background color, they won't override the colors changed within the code, e.g.:
```powershell
Write-Host "Noverse"
```
-> `Noverse` will have use foreground & background color of `ScreenColors`
```powershell
Write-Host "Noverse" -ForegroundColor Blue
```
-> `Noverse` will be blue, `ScreenColors` gets skipped.
```powershell
[console]::BackgroundColor = 'Black'
```
-> If it doesn't get changed within the code, it'll use the background color set by `ScreenColor`.

The option uses `Black` (background) and `Gray` (foreground), since it is personal preference change it to whatever you want using the information above.

Add the `-NoLogo` parameter to the powershell shortcut in the start menu with the command below. It hides the startup banner:
```
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\Nohuto>
```
```powershell
for %%L in ("%APPDATA%\Microsoft\Windows\Start Menu\Programs\Windows PowerShell\*.lnk") do powershell -c "$s=New-Object -ComObject WScript.Shell; $lnk=$s.CreateShortcut('%%~fL'); $lnk.TargetPath='%WINDIR%\System32\WindowsPowerShell\v1.0\powershell.exe'; $lnk.Arguments='-NoLogo'; $lnk.Save()"
```
