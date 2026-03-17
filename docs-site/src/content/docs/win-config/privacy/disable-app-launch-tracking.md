---
title: 'App Launch Tracking'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-app-launch-tracking'
sidebar:
  order: 8
---

`Privacy & security > General : Let Windows improve Start and search results by tracking app launches`

```bat
"Process Name","Operation","Path","Detail"
"SystemSettings.exe","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Start_TrackProgs","Type: REG_DWORD, Length: 4, Data: 0"
```
