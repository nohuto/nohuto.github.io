---
title: 'Clipboard History'
description: 'Cleanup option documentation from win-config.'
editUrl: false
sidebar:
  order: 15
---

Currently clears the in memory buffer via `echo. | clip`. [`clip`](https://github.com/nohuto/windowsserverdocs/blob/main/WindowsServerDocs/administration/windows-commands/clip.md) saves thatever it gets into the clipboard, and [`echo.`](https://github.com/nohuto/windowsserverdocs/blob/main/WindowsServerDocs/administration/windows-commands/echo.md#examples) = blank line.

See your current clipboard content via:
```powershell
Get-Clipboard
```
Command used:
```powershell
cmd /c "echo. | clip"
```
