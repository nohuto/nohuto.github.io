---
title: 'Prevent Color/Theme Changes'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 30
---

Prevents changing color/appearance, desktop background, desktop icons, start background, themes. It also stops themes from changing mouse pointers and desktop icons.

Use the suboptions to prevent/allow specific parts.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Prevent changing color and appearance](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoColorAppearanceUI) | `HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System` | `NoDispAppearancePage` |
| [Prevent changing desktop background](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoDesktopBackgroundUI) | `HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\ActiveDesktop` | `NoChangingWallPaper` |
| [Prevent changing desktop icons](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoDesktopIconsUI) | `HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System` | `NoDispBackgroundPage` |
| [Prevent changing lock screen and logon image](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoChangingLockScreen) | `HKLM\Software\Policies\Microsoft\Windows\Personalization` | `NoChangingLockScreen` |
| [Prevent changing mouse pointers](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoMousePointersUI) | `HKCU\Software\Policies\Microsoft\Windows\Personalization` | `NoChangingMousePointers` |
| [Prevent changing start menu background](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_NoChangingStartMenuBackground) | `HKLM\Software\Policies\Microsoft\Windows\Personalization` | `NoChangingStartMenuBackground` |
| [Prevent changing theme](https://noverse.dev/policies?p=ControlPanelDisplay*CPL_Personalization_DisableThemeChange) | `HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `NoThemesTab` |
