---
title: 'Downloads Blocking'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 9
---

Windows adds a hidden tag called [`Zone.Identifier`](https://www.cyberengage.org/post/unveiling-file-origins-the-role-of-alternate-data-streams-ads-zone-identifier-in-forensic-inve) to files downloaded from the internet. This tag (also known as MotW) stores info about the file's origin and helps apply security warnings, see files including the tag with:
```powershell
gi * -Stream "Zone.Identifier" -ErrorAction SilentlyContinue
```

![](https://github.com/nohuto/win-config/blob/main/security/images/downblocking.png?raw=true)

## ZoneID Data

**ZoneID** (`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones`) - number indicating the security zone the file came from:
`0` – Local machine
`1` – Local intranet (internal network)
`2` – Trusted sites
`3` – Internet (mostly web downloads)
`4` – Untrusted / Restricted sites (flagged as dangerous by smartscreen)

## Unblock-File

Files downloaded from the internet still getting blocked? Unblock it/them with (one of them):
```powershell
Unblock-File -Path "C:\Path\Script.ps1" -> File

dir C:\Path\*Files* | Unblock-File -> Multiple files 
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "AttachmentManager.admx",
  "CategoryName": "AM_AM",
  "PolicyName": "AM_MarkZoneOnSavedAtttachments",
  "NameSpace": "Microsoft.Policies.AttachmentManager",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Do not preserve zone information in file attachments",
  "ExplainText": "This policy setting allows you to manage whether Windows marks file attachments with information about their zone of origin (such as restricted, Internet, intranet, local). This requires NTFS in order to function correctly, and will fail without notice on FAT32. By not preserving the zone information, Windows cannot make proper risk assessments. If you enable this policy setting, Windows does not mark file attachments with their zone information. If you disable this policy setting, Windows marks file attachments with their zone information. If you do not configure this policy setting, Windows marks file attachments with their zone information.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments"
  ],
  "ValueName": "SaveZoneInformation",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "2" }
  ]
},
```
