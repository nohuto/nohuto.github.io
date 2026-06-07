---
title: 'Hide Most Used Apps'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 27
---

![](https://github.com/nohuto/win-config/blob/main/visibility/images/mostused.jpg?raw=true)

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Show or hide "Most used" list from Start menu](https://noverse.dev/policies?p=StartMenu*ShowOrHideMostUsedApps) | `HKLM\Software\Policies\Microsoft\Windows\Explorer`<br>`HKCU\Software\Policies\Microsoft\Windows\Explorer` | `ShowOrHideMostUsedApps` |
| [Remove frequent programs list from the Start Menu](https://noverse.dev/policies?p=StartMenu*NoFrequentUsedPrograms) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer`<br>`HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `NoStartMenuMFUprogramsList` |
| [Turn off user tracking](https://noverse.dev/policies?p=StartMenu*NoInstrumentation) | `HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `NoInstrumentation` |
| [Remove "Recently added" list from Start Menu](https://noverse.dev/policies?p=StartMenu*HideRecentlyAddedApps) | `HKLM\Software\Policies\Microsoft\Windows\Explorer`<br>`HKCU\Software\Policies\Microsoft\Windows\Explorer` | `HideRecentlyAddedApps` |
| [Do not show the 'new application installed' notification](https://noverse.dev/policies?p=WindowsExplorer*NoNewAppAlert) | `HKLM\Software\Policies\Microsoft\Windows\Explorer` | `NoNewAppAlert` |
