---
title: 'Remove Home & Gallery'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#remove-home--gallery'
sidebar:
  order: 9
---

### Home / Galery

![](https://github.com/nohuto/win-config/blob/main/visibility/images/homegal.png?raw=true)

### Network Sharing Folder (Suboption)

![](https://github.com/nohuto/win-config/blob/main/visibility/images/homenet.png?raw=true)

### Miscellaneous Notes

```c
{018D5C66-4533-4307-9B53-224DE2ED1FE6} = OneDrive
{F02C1A0D-BE21-4350-88B0-7367FC96EF3C} = Network Sharing Folder
{031E4825-7B94-4dc3-B131-E946B44C8DD5} = Libraries Folder
```
```json
// LaunchTo:
// 1 = This PC
// 2 = Home (default)
// 3 = Downloads
// 4 = OneDrive
"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced": {
  "LaunchTo": { "Type": "REG_DWORD", "Data": 1 }
},
"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer": {
  "HubMode": { "Type": "REG_DWORD", "Data": 1 }
}
```
