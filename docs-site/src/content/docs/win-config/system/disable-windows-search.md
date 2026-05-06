---
title: 'Windows Search'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

## Suboptions

| **Suboption** | **Description** |
| ---- | ---- |
| **Disable SafeSearch** | Disables the SafeSearch filter for web search, preventing strict filtering of search results. |
| **Prevent Index on Battery** | Prevents Windows from indexing content while running on battery power, saving system resources. |
| **Disable Index Usage for System File Search** | Disables the use of the index when searching system files, requiring a full scan each time. |
| **Find Partial Matches** | Allows partial matches to be found when searching for files, enabling more flexible search results. |
| **Exclude System Directories** | Excludes system directories from search results, narrowing down the search to user files and folders. |
| **Exclude Archived Files** | Prevents archived files from being included in search results. |
| **Disable Natural Language Search** | Disables the use of natural language search, which allows more conversational queries for search results. |
| **Search Only in Indexed Locations** | Restricts searches in non-indexed locations to only file names, rather than searching both names and contents. |
| **Exclude System Directories** | Excludes system directories (e.g., Windows folders) in search results when searching non-indexed locations. |
| **Exclude Compressed Files** | Excludes compressed files (e.g., ZIP, CAB) in search results when searching non-indexed locations. |
| **Search Only in Indexed Locations** | Disables: "Ensures that file names and contents are always searched in non-indexed locations, which may take more time." |
| [**Disallow Indexing of Encrypted Items**](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search#allowindexingencryptedstoresoritems) | This policy setting allows encrypted items to be indexed. |
| [**Disable Language Detection**](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search#alwaysuseautolangdetection) | This policy setting determines when Windows uses automatic language detection results, and when it relies on indexing history. |
| [**Prevent Querying Index Remotely**](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search#preventremotequeries) | If enabled, clients will be unable to query this computer's index remotely. Thus, when they're browsing network shares that are stored on this computer, they won't search them using the index. If disabled, client search requests will use this computer's index. |
| [**Disable Web Results in Search**](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search#donotusewebresults) | This policy setting allows you to control whether or not Search can perform queries on the web, and if the web results are displayed in Search. |
| **Disable Search Highlights** | If enabled: "See content suggestions in the search boxi and in search home". |
| **Disable Web Search** | If disabled: "removes the option of searching the Web from Windows Desktop Search". |

## Search Indexing

[Search indexing](https://learn.microsoft.com/en-us/windows/win32/search/-search-indexing-process-overview) builds a database of file names, properties, and contents to speed up searches, runs as `SearchIndexer.exe`, updates automatically. Disabling it slows down searches, but as shows below you should use everything anyway. Additionally you can disable content and property indexing per drive, by right clicking on the drive, then unticking the box as shown in the picture.

![](https://github.com/nohuto/win-config/blob/main/system/images/searchindex.png?raw=true)

Instead of using the explorer to search for a file or folder, use [`Everything`](https://www.voidtools.com/downloads/), it's a lot faster.

The `WSearch` service is needed for CmdPals `File Search` extension to work.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "PreventRemoteQueries",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "4OrLater - Any version of Microsoft Windows with Windows Search 4.0 or later",
  "DisplayName": "Prevent clients from querying the index remotely",
  "ExplainText": "If enabled, clients will be unable to query this computer's index remotely. Thus, when they are browsing network shares that are stored on this computer, they will not search them using the index. If disabled, client search requests will use this computer's index. Default is disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "PreventRemoteQueries",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "PreventIndexOnBattery",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "301OrLater - Microsoft Windows XP, Windows Server 2003 with Windows Search version 3.01, or any version of Microsoft Windows with Windows Search 4.0 or later",
  "DisplayName": "Prevent indexing when running on battery power to conserve energy",
  "ExplainText": "If enabled, the indexer pauses whenever the computer is running on battery. If disabled, the indexing follows the default behavior. Default is disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "PreventIndexOnBattery",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "AlwaysUseAutoLangDetection",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Win8Only - Microsoft Windows 8 or later",
  "DisplayName": "Always use automatic language detection when indexing content and properties",
  "ExplainText": "This policy setting determines when Windows uses automatic language detection results, and when it relies on indexing history. If you enable this policy setting, Windows will always use automatic language detection to index (as it did in Windows 7). Using automatic language detection can increase memory usage. We recommend enabling this policy setting only on PCs where documents are stored in many languages. If you disable or do not configure this policy setting, Windows will use automatic language detection only when it can determine the language of a document with high confidence.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "AlwaysUseAutoLangDetection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "DoNotUseWebResults",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "WinBlueOnly - Microsoft Windows 8.1 or later",
  "DisplayName": "Don't search the web or display web results in Search",
  "ExplainText": "This policy setting allows you to control whether or not Search can perform queries on the web, and if the web results are displayed in Search. If you enable this policy setting, queries won't be performed on the web and web results won't be displayed when a user performs a query in Search. If you disable this policy setting, queries will be performed on the web and web results will be displayed when a user performs a query in Search. If you don't configure this policy setting, a user can choose whether or not Search can perform queries on the web, and if the web results are displayed in Search.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "ConnectedSearchUseWeb",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "DoNotUseWebResultsOnMeteredConnections",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "WinBlueExclusive - Microsoft Windows 8.1. Not supported on Windows 10 or later",
  "DisplayName": "Don't search the web or display web results in Search over metered connections",
  "ExplainText": "This policy setting allows you to control whether or not Search can perform queries on the web over metered connections, and if the web results are displayed in Search. If you enable this policy setting, queries won't be performed on the web over metered connections and web results won't be displayed when a user performs a query in Search. If you disable this policy setting, queries will be performed on the web over metered connections and web results will be displayed when a user performs a query in Search. If you don't configure this policy setting, a user can choose whether or not Search can perform queries on the web over metered connections, and if the web results are displayed in Search. Note: If you enable the \"Don't search the web or display web results in Search\" policy setting, queries won't be performed on the web over metered connections and web results won't be displayed when a user performs a query in Search.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "ConnectedSearchUseWebOverMeteredConnections",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "DisableWebSearch",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "RedistOnly - Microsoft Windows XP, or Windows Server 2003 with Windows Search version 3.01 or later",
  "DisplayName": "Do not allow web search",
  "ExplainText": "Enabling this policy removes the option of searching the Web from Windows Desktop Search. When this policy is disabled or not configured, the Web option is available and users can search the Web via their default browser search engine.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "ValueName": "DisableWebSearch",
  "Elements": []
}
```

## Miscellaneous Notes

Exists in [Search Policies](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search), but isn't present anymore on 24H2 and probably versions above.

```c
// Disabling this setting turns off search highlights in the start menu search box and in search home. Enabling or not configuring this setting turns on search highlights in the start menu search box and in search home.
"Disable Search Highlights": {
  "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search": {
    "EnableDynamicContentInWSB": { "Type": "REG_DWORD", "Data": 0 }
  }
}
```

It probably got replaced by:
```c
// Privacy & security > Search - Show search highlights
SystemSettings.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\SearchSettings\IsDynamicSearchBoxEnabled	Type: REG_DWORD, Length: 4, Data: 0
```
