---
title: 'Spotlight'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 28
---

Spotlight is used to provide new pictures on your lock screen.

These exist by default on 25H2:
```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\DesktopSpotlight\\Settings": {
  "IsDisabledByCommercialControl": { "Type": "REG_DWORD", "Data": 0 },
  "IsRestoreLogon": { "Type": "REG_DWORD", "Data": 0 },
  "OneTimeUpgrade": { "Type": "REG_DWORD", "Data": 0 },
  "PeriodicUpgrade": { "Type": "REG_QWORD", "Data": 134118152903943918 },
  "SpotlightDisabledReason": { "Type": "REG_DWORD", "Data": 100 },
  "SpotlightNotOnboardedReason": { "Type": "REG_DWORD", "Data": 4 }
}
```
Disabling it via policies etc. is enough, therefore I won't add them as there's no documentation on them either.

`EnabledState` gets read.
```
\Registry\User\S-<ID>\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\DesktopSpotlight\Settings : EnabledState
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Configure Windows spotlight on lock screen](https://noverse.dev/policies?p=CloudContent*ConfigureWindowsSpotlight) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `ConfigureWindowsSpotlight`<br>`IncludeEnterpriseSpotlight` |
| [Turn off all Windows spotlight features](https://noverse.dev/policies?p=CloudContent*DisableWindowsSpotlightFeatures) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableWindowsSpotlightFeatures` |
| [Turn off Spotlight collection on Desktop](https://noverse.dev/policies?p=CloudContent*DisableSpotlightCollectionOnDesktop) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableSpotlightCollectionOnDesktop` |
| [Do not suggest third-party content in Windows spotlight](https://noverse.dev/policies?p=CloudContent*DisableThirdPartySuggestions) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableThirdPartySuggestions` |
| [Turn off Windows Spotlight on Action Center](https://noverse.dev/policies?p=CloudContent*DisableWindowsSpotlightOnActionCenter) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableWindowsSpotlightOnActionCenter` |
| [Turn off Windows Spotlight on Settings](https://noverse.dev/policies?p=CloudContent*DisableWindowsSpotlightOnSettings) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableWindowsSpotlightOnSettings` |
| [Turn off the Windows Welcome Experience](https://noverse.dev/policies?p=CloudContent*DisableWindowsSpotlightWindowsWelcomeExperience) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableWindowsSpotlightWindowsWelcomeExperience` |
