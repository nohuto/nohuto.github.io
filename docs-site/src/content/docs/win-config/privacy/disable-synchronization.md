---
title: 'Synchronization'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-synchronization'
sidebar:
  order: 25
---

Disables all kind of synchronization.

`DisableSyncOnPaidNetwork`: "Do not sync on metered connections"
> https://support.microsoft.com/en-us/windows/windows-backup-settings-catalog-deebcba2-5bc0-4e63-279a-329926955708#id0ebd=windows_11
> https://gpsearch.azurewebsites.net/#7999

```json
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableSyncOnPaidNetwork",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync on metered connections",
  "ExplainText": "Prevent syncing to and from this PC when on metered Internet connections. This turns off and disables \"sync your settings on metered connections\" switch on the \"sync your settings\" page in PC Settings. If you enable this policy setting, syncing on metered connections will be turned off, and no syncing will take place when this PC is on a metered connection. If you do not set or disable this setting, syncing on metered connections is configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableSyncOnPaidNetwork",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableAppSyncSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows_6_3",
  "DisplayName": "Do not sync Apps",
  "ExplainText": "Prevent the \"AppSync\" group from syncing to and from this PC. This turns off and disables the \"AppSync\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"AppSync\" group will not be synced. Use the option \"Allow users to turn app syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"AppSync\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableAppSyncSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableAppSyncSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableApplicationSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync app settings",
  "ExplainText": "Prevent the \"app settings\" group from syncing to and from this PC. This turns off and disables the \"app settings\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"app settings\" group will not be synced. Use the option \"Allow users to turn app settings syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"app settings\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableApplicationSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableApplicationSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableCredentialsSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync passwords",
  "ExplainText": "Prevent the \"passwords\" group from syncing to and from this PC. This turns off and disables the \"passwords\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"passwords\" group will not be synced. Use the option \"Allow users to turn passwords syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"passwords\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableCredentialsSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableCredentialsSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisablePersonalizationSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync personalize",
  "ExplainText": "Prevent the \"personalize\" group from syncing to and from this PC. This turns off and disables the \"personalize\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"personalize\" group will not be synced. Use the option \"Allow users to turn personalize syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"personalize\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisablePersonalizationSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisablePersonalizationSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableDesktopThemeSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync desktop personalization",
  "ExplainText": "Prevent the \"desktop personalization\" group from syncing to and from this PC. This turns off and disables the \"desktop personalization\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"desktop personalization\" group will not be synced. Use the option \"Allow users to turn desktop personalization syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"desktop personalization\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableDesktopThemeSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableDesktopThemeSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync",
  "ExplainText": "Prevent syncing to and from this PC. This turns off and disables the \"sync your settings\" switch on the \"sync your settings\" page in PC Settings. If you enable this policy setting, \"sync your settings\" will be turned off, and none of the \"sync your setting\" groups will be synced on this PC. Use the option \"Allow users to turn syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, \"sync your settings\" is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableStartLayoutSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows_6_3",
  "DisplayName": "Do not sync start settings",
  "ExplainText": "Prevent the \"Start layout\" group from syncing to and from this PC. This turns off and disables the \"Start layout\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"Start layout\" group will not be synced. Use the option \"Allow users to turn start syncing on\" so that syncing is turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"Start layout\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableStartLayoutSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableStartLayoutSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableWebBrowserSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync browser settings",
  "ExplainText": "Prevent the \"browser\" group from syncing to and from this PC. This turns off and disables the \"browser\" group on the \"sync your settings\" page in PC settings. The \"browser\" group contains settings and info like history and favorites. If you enable this policy setting, the \"browser\" group, including info like history and favorites, will not be synced. Use the option \"Allow users to turn browser syncing on\" so that syncing is turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"browser\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableWebBrowserSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableWebBrowserSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SettingSync.admx",
  "CategoryName": "SettingSync",
  "PolicyName": "DisableWindowsSettingSync",
  "NameSpace": "Microsoft.Policies.SettingSync",
  "Supported": "Windows8",
  "DisplayName": "Do not sync other Windows settings",
  "ExplainText": "Prevent the \"Other Windows settings\" group from syncing to and from this PC. This turns off and disables the \"Other Windows settings\" group on the \"sync your settings\" page in PC settings. If you enable this policy setting, the \"Other Windows settings\" group will not be synced. Use the option \"Allow users to turn other Windows settings syncing on\" so that syncing it turned off by default but not disabled. If you do not set or disable this setting, syncing of the \"Other Windows settings\" group is on by default and configurable by the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync"
  ],
  "ValueName": "DisableWindowsSettingSync",
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisableWindowsSettingSyncUserOverride", "TrueValue": "0", "FalseValue": "1" },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
