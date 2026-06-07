---
title: 'App Archive'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 36
---

"Automatically archive your infrequently used apps to save storage and internet bandwidth. Your files and data will still be saved, and the app's full version will be restored on your next use if it's still available."

If enabled, the system will periodically check for such infrequently used apps. By default app archiving is turned on.

## SystemSettings Records

Toggling the option via `Apps > Advanced app settings`:
```c
// On
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\InstallService\Stubification\S-{ID}\EnableAppOffloading    Type: REG_DWORD, Length: 4, Data: 1

// Off
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\InstallService\Stubification\S-{ID}\EnableAppOffloading    Type: REG_DWORD, Length: 4, Data: 0
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Archive infrequently used apps](https://noverse.dev/policies?p=AppxPackageManager*AllowAutomaticAppArchiving) | `HKLM\Software\Policies\Microsoft\Windows\Appx` | `AllowAutomaticAppArchiving` |
