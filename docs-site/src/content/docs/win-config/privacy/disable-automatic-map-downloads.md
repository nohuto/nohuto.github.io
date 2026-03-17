---
title: 'Automatic Map Downloads'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-automatic-map-downloads'
sidebar:
  order: 2
---

Disables automatic network traffic on the settings page and prevents automatic downloading or updating of map data, limiting location-related data updates.

`AllowOfflineMapsDownloadOverMeteredConnection` & `EnableOfflineMapsAutoUpdate`:

| Value |	Description |
| ---- | ---- |
| `0`	Disabled | Force disable auto-update over metered connection. |
| `1`	Enabled | Force enable auto-update over metered connection. |
| `65535` (Default)	Not configured | User's choice. |

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
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-maps  
> [privacy/assets | maps.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/maps.c)


`AutoDownloadAndUpdateMapData` & `AllowUntriggeredNetworkTrafficOnSettingsPage`:
> https://gpsearch.azurewebsites.net/#13439  
> https://gpsearch.azurewebsites.net/#13350  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-maps
