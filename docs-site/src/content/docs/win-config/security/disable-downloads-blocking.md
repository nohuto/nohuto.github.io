---
title: 'Downloads Blocking'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-downloads-blocking'
sidebar:
  order: 9
---

Windows adds a hidden tag called `Zone.Identifier` to files downloaded from the internet. This tag (also known as MotW) stores info about the file's origin and helps apply security warnings, see files including the tag with:
```powershell
gi * -Stream "Zone.Identifier" -ErrorAction SilentlyContinue
```

> https://www.cyberengage.org/post/unveiling-file-origins-the-role-of-alternate-data-streams-ads-zone-identifier-in-forensic-inve  
> https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fscc/6e3f7352-d11c-4d76-8c39-2516a9df36e8?redirectedfrom=MSDN  
> https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms537183(v=vs.85)?redirectedfrom=MSDN

```powershell
gc -Path "C:\Path\Script.ps1" -Stream Zone.Identifier
```

**ZoneID** (`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones`) - number indicating the security zone the file came from:
`0` – Local machine
`1` – Local intranet (internal network)
`2` – Trusted sites
`3` – Internet (mostly web downloads)
`4` – Untrusted / Restricted sites (flagged as dangerous by smartscreen)

Files downloaded from the internet still getting blocked? Unblock it/them with (one of them):
```powershell
Unblock-File -Path "C:\Path\Script.ps1" -> File

dir C:\Path\*Files* | Unblock-File -> Multiple files 
```

```powershell
{
	"File":  "AttachmentManager.admx",
	"NameSpace":  "Microsoft.Policies.AttachmentManager",
	"Class":  "User",
	"CategoryName":  "AM_AM",
	"DisplayName":  "Do not preserve zone information in file attachments",
	"ExplainText":  "This policy setting allows you to manage whether Windows marks file attachments with information about their zone of origin (such as restricted, Internet, intranet, local). This requires NTFS in order to function correctly, and will fail without notice on FAT32. By not preserving the zone information, Windows cannot make proper risk assessments.If you enable this policy setting, Windows does not mark file attachments with their zone information.If you disable this policy setting, Windows marks file attachments with their zone information.If you do not configure this policy setting, Windows marks file attachments with their zone information.",
	"Supported":  "WindowsXPSP2",
	"KeyPath":  "Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments",
	"KeyName":  "SaveZoneInformation",
	"Elements":  [
						{
							"Value":  "1",
							"Type":  "EnabledValue"
						},
						{
							"Value":  "2",
							"Type":  "DisabledValue"
						}
					]
},
```

![](https://github.com/nohuto/win-config/blob/main/security/images/downblocking.png?raw=true)
