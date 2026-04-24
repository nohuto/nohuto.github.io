---
title: 'Automatic Map Downloads'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 3
---

Disables automatic network traffic on the settings page and prevents automatic downloading or updating of map data, limiting location-related data updates.

`AllowOfflineMapsDownloadOverMeteredConnection` & `EnableOfflineMapsAutoUpdate`:

| Value |	Description |
| ---- | ---- |
| `0`	Disabled | Force disable auto-update over metered connection. |
| `1`	Enabled | Force enable auto-update over metered connection. |
| `65535` (Default)	Not configured | User's choice. |

> [privacy/assets | maps.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/maps.c)

## moshostcore (Downloaded Maps Manager Core) Snippets

```c
v8 = 1; // Default
LOBYTE(a3) = 1;
v5 = 0;
MapsPersistedRegBoolean = RegUtils::GetMapsPersistedRegBoolean(this, L"AutoUpdateEnabled", a3, &v8);
if ( MapsPersistedRegBoolean >= 0 )
*a2 = v8 != 0;
else
return (unsigned int)ZTraceReportPropagation(
					   MapsPersistedRegBoolean,
					   "ServiceManager::GetAutoUpdateEnabledSetting",
					   3025,
					   this);
return v5;
```
```c
v8 = 1; // Default
LOBYTE(a3) = 1;
v5 = 0;
MapsPersistedRegBoolean = RegUtils::GetMapsPersistedRegBoolean(this, L"UpdateOnlyOnWifi", a3, &v8);
if ( MapsPersistedRegBoolean >= 0 )
*a2 = v8 != 0;
else
return (unsigned int)ZTraceReportPropagation(
					   MapsPersistedRegBoolean,
					   "ServiceManager::GetDownloadOnlyOnWifiSetting",
					   3043,
					   this);
return v5;
```
```c
v6 = sub_180022E1C(L"System\\Maps\\Configuration", L"OfflineMaps");
if ( v6 < 0 )
{
  v7 = 3888LL;
  goto LABEL_4;
}
```

## Windows Policies

```json
  {
    "File": "WinMaps.admx",
    "CategoryName": "Maps",
    "PolicyName": "TurnOffAutoUpdate",
    "NameSpace": "Microsoft.Policies.WinMaps",
    "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
    "DisplayName": "Turn off Automatic Download and Update of Map Data",
    "ExplainText": "Enables or disables the automatic download and update of map data. If you enable this setting the automatic download and update of map data is turned off. If you disable this setting the automatic download and update of map data is turned on. If you don't configure this setting the automatic download and update of map data is determined by a registry setting that the user can change using Windows Settings.",
    "KeyPath": [
      "HKLM\\Software\\Policies\\Microsoft\\Windows\\Maps"
    ],
    "ValueName": "AutoDownloadAndUpdateMapData",
    "Elements": [
      { "Type": "EnabledValue", "Data": "0" },
      { "Type": "DisabledValue", "Data": "1" }
    ]
  },
  {
    "File": "WinMaps.admx",
    "CategoryName": "Maps",
    "PolicyName": "DisallowUntriggeredNetworkOnSettingsPage",
    "NameSpace": "Microsoft.Policies.WinMaps",
    "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
    "DisplayName": "Turn off unsolicited network traffic on the Offline Maps settings page",
    "ExplainText": "This policy setting allows you to turn on or turn off unsolicited network traffic on the Offline Maps page in Settings > System > Offline Maps. If you enable this policy setting, features that generate network traffic on the Offline Maps settings page are turned off. Note: This may turn off the entire settings page. If you disable or do not configure this policy setting, the Offline Maps setting page may generate network traffic.",
    "KeyPath": [
      "HKLM\\Software\\Policies\\Microsoft\\Windows\\Maps"
    ],
    "ValueName": "AllowUntriggeredNetworkTrafficOnSettingsPage",
    "Elements": [
      { "Type": "EnabledValue", "Data": "0" },
      { "Type": "DisabledValue", "Data": "1" }
    ]
  },
```
