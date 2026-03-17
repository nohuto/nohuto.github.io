---
title: 'Accent Color'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#accent-color'
sidebar:
  order: 4
---

This set's the accent color globally and if `AccentColor` (`HKEY_CURRENT_USER\Software\Noverse`) isn't set via the tool settings yet, this will also directly impact the WinConfig colors.

`Show Accent Color on Start and Taskbar` only works if using dark theme.

Something I noticed while creating the option is that procmon doesn't show the actual used binary data:
```c
// Procmon
59657CFF4A5468FF3F4859FF353C4AFF // 16

// After refreshing
59657CFF4A5468FF3F4859FF353C4AFF2A303BFF1F242CFF111317FF88179800 // 32

// Procmon
99EBFF004CC2FF000091F8000078D400

// After refreshing
99EBFF004CC2FF000091F8000078D4000067C000003E9200001A6800F7630C00
```

Changing the color via `Personalization > Colors` sets:
```c
// Nord Theme (#2e3440)
HKCU\Software\Microsoft\Windows\DWM\ColorizationColor	Type: REG_DWORD, Length: 4, Data: 3291823178
HKCU\Software\Microsoft\Windows\DWM\ColorizationAfterglow	Type: REG_DWORD, Length: 4, Data: 3291823178
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\AccentPalette	Type: REG_BINARY, Length: 32, Data: 59 65 7C FF 4A 54 68 FF 3F 48 59 FF 35 3C 4A FF // see note above
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\StartColorMenu	Type: REG_DWORD, Length: 4, Data: 4282069034
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\AccentColorMenu	Type: REG_DWORD, Length: 4, Data: 4283055157
HKCU\Software\Microsoft\Windows\DWM\AccentColor	Type: REG_DWORD, Length: 4, Data: 4283055157
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-1-5-21-1713887642-2553820887-3827158055-1000\AnyoneRead\Colors\StartColor	Type: REG_DWORD, Length: 4, Data: 4282069034
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-1-5-21-1713887642-2553820887-3827158055-1000\AnyoneRead\Colors\AccentColor	Type: REG_DWORD, Length: 4, Data: 4283055157

// Default Blue
HKCU\Software\Microsoft\Windows\DWM\ColorizationColor	Type: REG_DWORD, Length: 4, Data: 3288365268
HKCU\Software\Microsoft\Windows\DWM\ColorizationAfterglow	Type: REG_DWORD, Length: 4, Data: 3288365268
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\AccentPalette	Type: REG_BINARY, Length: 32, Data: 99 EB FF 00 4C C2 FF 00 00 91 F8 00 00 78 D4 00
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\StartColorMenu	Type: REG_DWORD, Length: 4, Data: 4290799360
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent\AccentColorMenu	Type: REG_DWORD, Length: 4, Data: 4292114432
HKCU\Software\Microsoft\Windows\DWM\AccentColor	Type: REG_DWORD, Length: 4, Data: 4292114432
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-1-5-21-1713887642-2553820887-3827158055-1000\AnyoneRead\Colors\StartColor	Type: REG_DWORD, Length: 4, Data: 4290799360
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\SystemProtectedUserData\S-1-5-21-1713887642-2553820887-3827158055-1000\AnyoneRead\Colors\AccentColor	Type: REG_DWORD, Length: 4, Data: 4292114432
```

Ignore it, this is the old "Nord Accent Color" json block.
```json
"SUBOPTION": {
  "Nord Accent Color": {
    "HKCU\\Software\\Microsoft\\Windows\\DWM": {
      "ColorizationColor": { "Type": "REG_DWORD", "Data": 3291823178 },
      "ColorizationAfterglow": { "Type": "REG_DWORD", "Data": 3291823178 },
      "AccentColor": { "Type": "REG_DWORD", "Data": 4283055157 }
    },
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent": {
      "AccentPalette": { "Type": "REG_BINARY", "Data": "59657CFF4A5468FF3F4859FF353C4AFF2A303BFF1F242CFF111317FF88179800" },
      "StartColorMenu": { "Type": "REG_DWORD", "Data": 4282069034 },
      "AccentColorMenu": { "Type": "REG_DWORD", "Data": 4283055157 }
    },
    "COMMANDS": {
      "AccentColorsSystemProtected": {
        "Action": "user_id",
        "UserIDPath": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SystemProtectedUserData\\{userid}\\AnyoneRead\\Colors",
        "Values": {
          "StartColor": { "Type": "REG_DWORD", "Data": 4282069034, "Elevated": true },
          "AccentColor": { "Type": "REG_DWORD", "Data": 4283055157, "Elevated": true }
        }
      }
    }
  }
}

"SUBOPTION": {
  "Nord Accent Color": {
    "HKCU\\Software\\Microsoft\\Windows\\DWM": {
      "ColorizationColor": { "Type": "REG_DWORD", "Data": 3288365268 },
      "ColorizationAfterglow": { "Type": "REG_DWORD", "Data": 3288365268 },
      "AccentColor": { "Type": "REG_DWORD", "Data": 4292114432 }
    },
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Accent": {
      "AccentPalette": { "Type": "REG_BINARY", "Data": "99EBFF004CC2FF000091F8000078D4000067C000003E9200001A6800F7630C00" },
      "StartColorMenu": { "Type": "REG_DWORD", "Data": 4290799360 },
      "AccentColorMenu": { "Type": "REG_DWORD", "Data": 4292114432 }
    },
    "COMMANDS": {
      "AccentColorsSystemProtected": {
        "Action": "user_id",
        "UserIDPath": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SystemProtectedUserData\\{userid}\\AnyoneRead\\Colors",
        "Values": {
          "StartColor": { "Type": "REG_DWORD", "Data": 4290799360, "Elevated": true },
          "AccentColor": { "Type": "REG_DWORD", "Data": 4292114432, "Elevated": true }
        }
      }
    }
  }
}
```
