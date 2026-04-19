---
title: 'Activity History'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-activity-history'
sidebar:
  order: 27
---

`EnableActivityFeed` enables or disables publishing and syncing of activities across devices. `PublishUserActivities` allows or blocks local publishing of user activities. `UploadUserActivities` allows or blocks uploading of user activities to the cloud, deletion is not affected.

```json
{
  "File": "OSPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "EnableActivityFeed",
  "NameSpace": "Microsoft.Policies.OSPolicy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Enables Activity Feed",
  "ExplainText": "This policy setting determines whether ActivityFeed is enabled. If you enable this policy setting, all activity types (as applicable) are allowed to be published and ActivityFeed shall roam these activities across device graph of the user. If you disable this policy setting, activities can't be published and ActivityFeed shall disable cloud sync. Policy change takes effect immediately.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableActivityFeed",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OSPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "PublishUserActivities",
  "NameSpace": "Microsoft.Policies.OSPolicy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow publishing of User Activities",
  "ExplainText": "This policy setting determines whether User Activities can be published. If you enable this policy setting, activities of type User Activity are allowed to be published. If you disable this policy setting, activities of type User Activity are not allowed to be published. Policy change takes effect immediately.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "PublishUserActivities",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OSPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "UploadUserActivities",
  "NameSpace": "Microsoft.Policies.OSPolicy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow upload of User Activities",
  "ExplainText": "This policy setting determines whether published User Activities can be uploaded. If you enable this policy setting, activities of type User Activity are allowed to be uploaded. If you disable this policy setting, activities of type User Activity are not allowed to be uploaded. Deletion of activities of type User Activity are independent of this setting. Policy change takes effect immediately.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "UploadUserActivities",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Search.admx",
  "CategoryName": "Search",
  "PolicyName": "DisableSearchHistory",
  "NameSpace": "FullArmor.Policies.3B9EA2B5_A1D1_4CD5_9EDE_75B22990BC21",
  "Supported": "Win8Only - Microsoft Windows 8 or later",
  "DisplayName": "Turn off storage and display of search history",
  "ExplainText": "This policy setting prevents search queries from being stored in the registry. If you enable this policy setting, search suggestions based on previous searches won't appear in the search pane. Search suggestions provided by apps or by Windows based on local content will still appear. If you disable or do not configure this policy setting, users will get search suggestions based on previous searches in the search pane.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "DisableSearchHistory",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
