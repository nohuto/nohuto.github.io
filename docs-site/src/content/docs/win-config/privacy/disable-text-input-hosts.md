---
title: 'Text Input Hosts'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 27
---

`ctfmon.exe` is the classic CTF (Collaborative Translation Framework) loader, it's started for the user at logon by `\Microsoft\Windows\TextServicesFramework\MsCtfMonitor`. It seems to handle [IME](https://learn.microsoft.com/en-us/windows/apps/develop/input/input-method-editors) (Input Method Editor) support, language/input profiles, language bar/input indicator, and [keyboard layout switching](https://www.noverse.dev/docs/win-config/peripheral/keyboard-values/).

`TextInputHost.exe` is the modern text input host (from `MicrosoftWindows.Client.CBS`), it seems to get used (on demand) through the `InputApp` registration when opening modern input parts such as `Win+.`, `Win+V`, touch keyboard, handwriting, voice typing, and so on.
