---
title: 'Thumbnail Caching'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 50
---

Disables persistent File Explorer thumbnail caching so previews are less likely to remain stored after browsing folders. Windows normally rebuilds thumbnail caches automatically (use `Thumbnail Cache` option in 'Cleanup' section to clear it).

This improves privacy mainly by reducing leftover preview artifacts for images, videos, documents, and other shell items. Microsoft explicitly notes that the thumbnail cache can be read by everyone on shared or security sensitive systems, and the related network folder thumbnail policies note that allowing thumbnail use on network folders can expose computers to security risks.

## Windows Policies

```json
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "NoCacheThumbNailPictures",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "WindowsXP - At least Windows Server 2003 operating systems or Windows XP Professional",
  "DisplayName": "Turn off caching of thumbnail pictures",
  "ExplainText": "This policy setting allows you to turn off caching of thumbnail pictures. If you enable this policy setting, thumbnail views are not cached. If you disable or do not configure this policy setting, thumbnail views are cached. Note: For shared corporate workstations or computers where security is a top concern, you should enable this policy setting to turn off the thumbnail view cache, because the thumbnail cache can be read by everyone.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoThumbnailCache",
  "Elements": []
},
{
  "File": "Thumbnails.admx",
  "CategoryName": "Thumbnails",
  "PolicyName": "DisableThumbsDBOnNetworkFolders",
  "NameSpace": "Microsoft.Policies.Thumbnails",
  "Supported": "MicrosoftWindowsVista_SP1",
  "DisplayName": "Turn off the caching of thumbnails in hidden thumbs.db files",
  "ExplainText": "Turns off the caching of thumbnails in hidden thumbs.db files. This policy setting allows you to configure File Explorer to cache thumbnails of items residing in network folders in hidden thumbs.db files. If you enable this policy setting, File Explorer does not create, read from, or write to thumbs.db files. If you disable or do not configure this policy setting, File Explorer creates, reads from, and writes to thumbs.db files.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "DisableThumbsDBOnNetworkFolders",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
