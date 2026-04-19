---
title: 'System Informer'
description: 'Misc option documentation from win-config.'
editUrl: false
sidebar:
  order: 6
---

Since system informer is a lot better than the default task manager, it is recommended to replace it.

> https://systeminformer.io/

Undo it by removing the first line and executing the second command (delete the `::`), or just paste the second one in cmd.

Enable `Theme support` (dark mode) and disable `Check for updates automatically` with:
```powershell
(gc "$env:appdata\SystemInformer\settings.xml") -replace '(?<=<setting name="ProcessHacker\.UpdateChecker\.PromptStart">)\d(?=</setting>)','0' -replace '(?<=<setting name="EnableThemeSupport">)\d(?=</setting>)','1' | sc "$appdata\SystemInformer\settings.xml"
```
