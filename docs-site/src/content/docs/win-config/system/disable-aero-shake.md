---
title: 'Aero Shake'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 35
---

Prevents windows from being minimized or restored when the active window is shaken back and forth with the mouse.

`SystemSettings > System > Multitasking: Title bar window shake`.

![](https://www.techjunkie.com/wp-content/uploads/2018/10/windows-aero-shake-example.gif)

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off Aero Shake window minimizing mouse gesture](https://noverse.dev/policies?p=Desktop*NoWindowMinimizingShortcuts) | `HKCU\Software\Policies\Microsoft\Windows\Explorer` | `NoWindowMinimizingShortcuts` |
