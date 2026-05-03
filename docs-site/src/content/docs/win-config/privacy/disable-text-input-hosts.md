---
title: 'Text Input Hosts'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
---

Renames `ctfmon.exe` and `TextInputHost.exe` to block the classic CTF loader and the modern text input host. This disables IME, emoji/clipboard panels, and touch keyboard input in most cases.

`TextInputManagementService` is the Windows service for text input, expressive input, touch keyboard, handwriting, and IMEs. `ctfmon.exe` loads the Text Services Framework (IME/language bar), while `TextInputHost.exe` hosts the modern input UI (touch keyboard, emoji, clipboard).
