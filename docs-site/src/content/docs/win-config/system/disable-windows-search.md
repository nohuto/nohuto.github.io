---
title: 'Windows Search'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 12
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

Search indexing builds a database of file names, properties, and contents to speed up searches, runs as `SearchIndexer.exe`, updates automatically. Disabling it slows down searches, but as shows below you should use everything anyway. Additionally you can disable content and property indexing per drive, by right clicking on the drive, then unticking the box as shown in the picture.

> https://learn.microsoft.com/en-us/windows/win32/search/-search-indexing-process-overview  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search

![](https://github.com/nohuto/win-config/blob/main/system/images/searchindex.png?raw=true)

Instead of using the explorer to search for a file or folder, use [`Everything`](https://www.voidtools.com/downloads/), it's a lot faster.

The `WSearch` service is needed for CmdPals `File Search` extension to work.

## Windows Policies

```json
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "SearchPrivacy",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "WinBlueExclusive - Microsoft Windows 8.1. Not supported on Windows 10 or later",
  "DisplayName": "Set what information is shared in Search",
  "ExplainText": "This policy setting allows you to control what information is shared with Bing in Search. If you enable this policy setting, you can specify one of four settings, which users won't be able to change: -User info and location: Share a user's search history, some Microsoft account info, and specific location to personalize their search and other Microsoft experiences. -User info only: Share a user's search history and some Microsoft account info to personalize their search and other Microsoft experiences. -Anonymous info: Share usage information but don't share search history, Microsoft account info or specific location. If you disable or don't configure this policy setting, users can choose what information is shared in Search.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "ConnectedSearchPrivacy", "Items": [
        { "DisplayName": "User info and location", "Data": "1" },
        { "DisplayName": "User info only", "Data": "2" },
        { "DisplayName": "Anonymous info", "Data": "3" }
      ]
    }
  ]
},
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
