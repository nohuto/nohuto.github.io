---
title: 'Windows Update'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-windows-update'
sidebar:
  order: 3
---

It works via pausing updates and disabling related services:
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings
```
```
PauseFeatureUpdatesEndTime
PauseQualityUpdatesEndTime
PauseUpdatesExpiryTime
```
`String Value`, e.g.: `2030-01-01T00:00:00Z`.

---

Miscellaneous notes:
```json
"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate": {
  "WUServer": { "Type": "REG_SZ", "Data": " " },
  "WUStatusServer": { "Type": "REG_SZ", "Data": " " },
  "UpdateServiceUrlAlternate": { "Type": "REG_SZ", "Data": " " },
  "DisableWindowsUpdateAccess": { "Type": "REG_DWORD", "Data": 1 },
  "DisableOSUpgrade": { "Type": "REG_DWORD", "Data": 1 },
  "SetDisableUXWUAccess": { "Type": "REG_DWORD", "Data": 1 },
  "DoNotConnectToWindowsUpdateInternetLocations": { "Type": "REG_DWORD", "Data": 1 }
},
"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU": {
  "NoAutoUpdate": { "Type": "REG_DWORD", "Data": 1 },
  "NoAutoRebootWithLoggedOnUsers": { "Type": "REG_DWORD", "Data": 1 },
  "UseWUServer": { "Type": "REG_DWORD", "Data": 1 }
},
"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WindowsUpdate\\Auto Update": {
  "AUOptions": { "Type": "REG_DWORD", "Data": 1 },
  "SetupWizardLaunchTime": { "Action": "deletevalue" },
  "AcceleratedInstallRequired": { "Action": "deletevalue" }
}
```

> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#29-windows-update
