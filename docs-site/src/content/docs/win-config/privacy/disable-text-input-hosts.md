---
title: 'Text Input Hosts'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-text-input-hosts'
sidebar:
  order: 19
---

Renames `ctfmon.exe` and `TextInputHost.exe` to block the classic CTF loader and the modern text input host. This disables IME, emoji/clipboard panels, and touch keyboard input in most cases.

`TextInputManagementService` is the Windows service backing text input, expressive input, touch keyboard, handwriting, and IMEs. `ctfmon.exe` loads the Text Services Framework (IME/language bar), while `TextInputHost.exe` hosts the modern input UI (touch keyboard, emoji, clipboard). Renaming them can break language switching, IME input, and UWP input surfaces.
