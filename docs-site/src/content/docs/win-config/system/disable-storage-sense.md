---
title: 'Storage Sense'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

Storage Sense deletes temporary/user files automatically, see [windows policies](https://www.noverse.dev/docs/win-config/system/disable-storage-sense/#windows-policies) for more & [disable-notifications/#registry-values](https://www.noverse.dev/docs/win-config/system/disable-notifications/#registry-values) for storage sense related notification values.

Head over to the `Policies` tab, then `StorageSense` to configure other related policies.

## SystemSettings Captures

The main storage sense toggle in `System > Storage` does the same as the `Automatic User content cleanup` in `System > Storage > Storage Sense`.

```c
// System > Storage > Storage Sense

// Keep WIndows running smoothly by automatically cleaning up temorary system and app files
// 1 = On
// 0 = Off
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\04 // Type: REG_DWORD

// Automatic User content cleanup
// 1 = On
// 0 = Off
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\01 // Type: REG_DWORD

// Run Storage Sense
// During low free disk space (default) = 0
// Every month = 30
// Every week = 7
// Every day = 1
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\2048	// Type: REG_DWORD

// Delete files in my recycle bin if they have been there for over
// 30 days (default): 08 = 1, 25 = 30
// 60 days: 08 = 1, 256 = 60
// 14 days: 08 = 1, 256 = 14
// 1 day: 08 = 1, 256 = 1
// Never: 08 = 0, 256 = 0
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\08 // Type: REG_DWORD
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\256 // Type: REG_DWORD

// Delete files in my Downloads folder if they haven't been opened for more than
// Never (default): 32 = 0, 512 = 0
// 1 day: 32 = 1, 512 = 1
// 14 days: 32 = 1, 512 = 14
// 30 days: 32 = 1, 512 = 30
// 60 days: 32 = 1, 512 = 60
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\32 // Type: REG_DWORD
HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\512 // Type: REG_DWORD
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_AllowStorageSenseGlobal",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Allow Storage Sense",
  "ExplainText": "Storage Sense can automatically clean some of the user\u2019s files to free up disk space. By default, Storage Sense is automatically turned on when the machine runs into low disk space and is set to run whenever the machine runs into storage pressure. This cadence can be changed in Storage settings or set with the \"Configure Storage Sense cadence\" group policy. Enabled: Storage Sense is turned on for the machine, with the default cadence as \u2018during low free disk space\u2019. Users cannot disable Storage Sense, but they can adjust the cadence (unless you also configure the \"Configure Storage Sense cadence\" group policy). Disabled: Storage Sense is turned off the machine. Users cannot enable Storage Sense. Not Configured: By default, Storage Sense is turned off until the user runs into low disk space or the user enables it manually. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "ValueName": "AllowStorageSenseGlobal",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_ConfigStorageSenseGlobalCadence",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Configure Storage Sense cadence",
  "ExplainText": "Storage Sense can automatically clean some of the user\u2019s files to free up disk space. If the group policy \"Allow Storage Sense\" is disabled, then this policy does not have any effect. Enabled: You must provide the desired Storage Sense cadence. Supported options are: daily, weekly, monthly, and during low free disk space. The default is 0 (during low free disk space). Disabled or Not Configured: By default, the Storage Sense cadence is set to \u201cduring low free disk space\u201d. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "ConfigStorageSenseGlobalCadence", "Items": [
        { "DisplayName": "Every day", "Data": "1" },
        { "DisplayName": "Every week", "Data": "7" },
        { "DisplayName": "Every month", "Data": "30" },
        { "DisplayName": "During low free disk space", "Data": "0" }
      ]
    }
  ]
},
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_AllowStorageSenseTemporaryFilesCleanup",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Allow Storage Sense Temporary Files cleanup",
  "ExplainText": "When Storage Sense runs, it can delete the user\u2019s temporary files that are not in use. If the group policy \"Allow Storage Sense\" is disabled, then this policy does not have any effect. Enabled: Storage Sense will delete the user\u2019s temporary files that are not in use. Users cannot disable this setting in Storage settings. Disabled: Storage Sense will not delete the user\u2019s temporary files. Users cannot enable this setting in Storage settings. Not Configured: By default, Storage Sense will delete the user\u2019s temporary files. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "ValueName": "AllowStorageSenseTemporaryFilesCleanup",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_ConfigStorageSenseRecycleBinCleanupThreshold",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Configure Storage Sense Recycle Bin cleanup threshold",
  "ExplainText": "When Storage Sense runs, it can delete files in the user\u2019s Recycle Bin if they have been there for over a certain amount of days. If the group policy \"Allow Storage Sense\" is disabled, then this policy does not have any effect. Enabled: You must provide the minimum age threshold (in days) of a file in the Recycle Bin before Storage Sense will delete it. Supported values are: 0 - 365. If you set this value to zero, Storage Sense will not delete files in the user\u2019s Recycle Bin. The default is 30 days. Disabled or Not Configured: By default, Storage Sense will delete files in the user\u2019s Recycle Bin that have been there for over 30 days. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "Elements": [
    { "Type": "Decimal", "ValueName": "ConfigStorageSenseRecycleBinCleanupThreshold", "MinValue": "0", "MaxValue": "365" }
  ]
},
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_ConfigStorageSenseDownloadsCleanupThreshold",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Configure Storage Storage Downloads cleanup threshold",
  "ExplainText": "When Storage Sense runs, it can delete files in the user\u2019s Downloads folder if they haven\u2019t been opened for more than a certain number of days. If the group policy \"Allow Storage Sense\" is disabled, then this policy does not have any effect. Enabled: You must provide the minimum number of days a file can remain unopened before Storage Sense deletes it from Downloads folder. Supported values are: 0 - 365. If you set this value to zero, Storage Sense will not delete files in the user\u2019s Downloads folder. The default is 0, or never deleting files in the Downloads folder. Disabled or Not Configured: By default, Storage Sense will not delete files in the user\u2019s Downloads folder. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "Elements": [
    { "Type": "Decimal", "ValueName": "ConfigStorageSenseDownloadsCleanupThreshold", "MinValue": "0", "MaxValue": "365" }
  ]
},
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_ConfigStorageSenseCloudContentDehydrationThreshold",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Configure Storage Sense Cloud Content dehydration threshold",
  "ExplainText": "When Storage Sense runs, it can dehydrate cloud-backed content that hasn\u2019t been opened in a certain amount of days. If the group policy \"Allow Storage Sense\" is disabled, then this policy does not have any effect. Enabled: You must provide the minimum number of days a cloud-backed file can remain unopened before Storage Sense dehydrates it from the sync root. Supported values are: 0 - 365. If you set this value to zero, Storage Sense will not dehydrate any cloud-backed content. The default value is 0, or never dehydrating cloud-backed content. Disabled or Not Configured: By default, Storage Sense will not dehydrate any cloud-backed content. Users can configure this setting in Storage settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\StorageSense"
  ],
  "Elements": [
    { "Type": "Decimal", "ValueName": "ConfigStorageSenseCloudContentDehydrationThreshold", "MinValue": "0", "MaxValue": "365" }
  ]
},
```
