---
title: 'Powerplan'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#powerplan'
sidebar:
  order: 9
---

Use the commands below, to import power plans by double-clicking them. Modify the powerplan via `PowerSettingsExplorer.exe`.
> http://www.mediafire.com/file/wt37sbsejk7iepm/PowerSettingsExplorer.zip

```json
"HKCR\\.pow": {
  "": { "Type": "REG_SZ", "Data": "Power Plan" },
  "FriendlyTypeName": { "Type": "REG_SZ", "Data": "Power Plan" }
},
"HKCR\\.pow\\DefaultIcon": {
  "": { "Type": "REG_EXPAND_SZ", "Data": "%%WINDIR%%\\System32\\powercfg.cpl,-202" }
},
"HKCR\\.pow\\shell\\Import\\command": {
  "": { "Type": "REG_SZ", "Data": "powercfg /import \"%%1\"" }
}
```

Remove default powerplans with:
```bat
powercfg -delete 381b4222-f694-41f0-9685-ff5bb260df2e
powercfg -delete 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
powercfg -delete a1841308-3541-4fab-bc81-f71556f20b4a
powercfg -delete e9a42b02-d5df-448d-aa00-03f14749eb61
```
> https://bitsum.com/known-windows-power-guids/

```bat
powercfg /availablesleepstates (or /a)
```
Shows the current available sleep states on your system.

> https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/powercfg-command-line-options#option_availablesleepstates
