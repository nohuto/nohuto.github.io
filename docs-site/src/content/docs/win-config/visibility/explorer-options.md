---
title: 'Explorer Options'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

It changes every setting, which is shown in the `Folder Options` window. Some are personal preference, see suboptions bellow for customization.

![](https://github.com/nohuto/win-config/blob/main/visibility/images/explorer.png?raw=true)

## Miscellaneous Notes

```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer": {
  "ShellState": { "Type": "REG_BINARY", "Data": "240000003e20000000000000000000000001000000130000000000000042000000" }
},
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\CabinetState": {
  "Settings": { "Type": "REG_BINARY", "Data": "0c0002000a01000060000000" }
}
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Hide and disable all items on the desktop](https://noverse.dev/policies?p=Desktop*NoDesktop) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer`<br>`HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `NoDesktop` |
| [Do not keep history of recently opened documents](https://noverse.dev/policies?p=StartMenu*NoRecentDocsHistory) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer`<br>`HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `NoRecentDocsHistory` |
| [Prohibit access of the Windows Connect Now wizards](https://noverse.dev/policies?p=WindowsConnectNow*WCN_DisableWcnUi_2) | `HKLM\Software\Policies\Microsoft\Windows\WCN\UI` | `DisableWcnUi` |
