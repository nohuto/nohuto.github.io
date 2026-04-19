---
title: 'Storage Sense'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 14
---

Storage Sense deletes temporary files automatically - revert it by changing it back to `1`.

![](https://github.com/nohuto/win-config/blob/main/system/images/storagesen1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/storagesen2.png?raw=true)

`ConfigStorageSenseCloudContentDehydrationThreshold` should also exist in the key, but since I'm not sure yet I didn't add it.
```c
v30 = 0;
if ( (int)CLowDiskSpaceUI_GetIsMDMConfigured(
            (CLowDiskSpaceUI )a1,
            LConfigStorageSenseCloudContentDehydrationThreshold,
            &v30)  0
    !v30 )
```

## Windows Policies

```json
{
  "File": "StorageSense.admx",
  "CategoryName": "StorageSense",
  "PolicyName": "SS_AllowStorageSenseGlobal",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6",
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
  "PolicyName": "SS_AllowStorageSenseTemporaryFilesCleanup",
  "NameSpace": "Microsoft.Policies.StorageSense",
  "Supported": "Windows_10_0_RS6",
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
```
