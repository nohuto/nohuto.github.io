---
title: 'Edge Features'
description: 'Misc option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

Edge is a whole mess, I wouldn't recommend anyone to use it, but here's an option that applies the following values:

| Value | Disables / Hides |
| ----- | ----- |
| `AutoImportAtFirstRun` | Auto-import from other browsers at first run |
| `PersonalizationReportingEnabled` | Personalization (ads, news, browser suggestions) |
| `ShowRecommendationsEnabled` | Recommendations and desktop notifications |
| `HideFirstRunExperience` | First-run experience |
| `PinBrowserEssentialsToolbarButton` | Browser Essentials toolbar button |
| `DefaultBrowserSettingEnabled` | "Set Edge as default browser” prompts |
| `EdgeFollowEnabled` | Follow creators |
| `HubsSidebarEnabled` | Sidebar |
| `StandaloneHubsSidebarEnabled` | Standalone Sidebar |
| `SyncDisabled` | Sync (all kinds of data) |
| `HideRestoreDialogEnabled` | Restore pages dialog after crash |
| `EdgeShoppingAssistantEnabled` | Shopping features |
| `ShowMicrosoftRewards` | Microsoft Rewards |
| `QuickSearchShowMiniMenu` | Mini context menu (quick search) |
| `ImplicitSignInEnabled` | Implicit sign-in with Microsoft account |
| `EdgeCollectionsEnabled` | Collections |
| `SplitScreenEnabled` | Split screen |
| `UserFeedbackAllowed` | User feedback prompts |
| `SearchbarAllowed` | Floating Bing search bar |
| `StartupBoostEnabled` | Startup Boost |
| `NewTabPageHideDefaultTopSites` | Microsoft's default pinned sites on New Tab |
| `NewTabPageQuickLinksEnabled` | Quick links on New Tab |
| `NewTabPageAllowedBackgroundTypes` | New Tab background image (restricts types) |
| `NewTabPageContentEnabled` | Microsoft content on New Tab (news, highlights, etc.) |
| `DisableHelpSticker` | Windows help tips ("help stickers”) |
| `DisableMFUTracking` | Tracking of most-frequently-used apps |
| `DisableRecentApps` | Recent apps UI in upper-left corner |
| `DisableCharms` | Charms UI in upper-right corner |
| `TurnOffBackstack` | Switching between recent apps (backstack) |
| `AllowEdgeSwipe` | Edge swipe gestures (set to 0 to disable) |
| `TabServicesEnabled` | Tab-related background services (e.g., shopping/price tracking helpers) disabled |
| `TextPredictionEnabled` | Text predictions will not be provided in eligible text fields |
| `TrackingPrevention` | Tracking Prevention mode enforced |
| `DefaultSensorsSetting` | Site access to  sensors blocked |

See all edge policies here:

> https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies

```json
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "TurnOffBackstack",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows8",
  "DisplayName": "Turn off switching between recent apps",
  "ExplainText": "If you enable this setting, users will not be allowed to switch between recent apps. The App Switching option in the PC settings app will be disabled as well. If you disable or do not configure this policy setting, users will be allowed to switch between recent apps.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "TurnOffBackstack",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "DisableMFUTracking",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows8",
  "DisplayName": "Turn off tracking of app usage",
  "ExplainText": "This policy setting prevents Windows from keeping track of the apps that are used and searched most frequently. If you enable this policy setting, apps will be sorted alphabetically in: - search results - the Search and Share panes - the drop-down app list in the Picker If you disable or don't configure this policy setting, Windows will keep track of the apps that are used and searched most frequently. Most frequently used apps will appear at the top.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "DisableMFUTracking",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "DisableRecentApps",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows_6_3",
  "DisplayName": "Do not show recent apps when the mouse is pointing to the upper-left corner of the screen",
  "ExplainText": "This policy setting allows you to prevent the last app and the list of recent apps from appearing when the mouse is pointing to the upper-left corner of the screen. If you enable this policy setting, the user will no longer be able to switch to recent apps using the mouse. The user will still be able to switch apps using touch gestures, keyboard shortcuts, and the Start screen. If you disable or don't configure this policy setting, the recent apps will be available by default, and the user can configure this setting.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "DisableRecentApps",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "DisableCharms",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows_6_3",
  "DisplayName": "Search, Share, Start, Devices, and Settings don't appear when the mouse is pointing to the upper-right corner of the screen",
  "ExplainText": "This policy setting allows you to prevent Search, Share, Start, Devices, and Settings from appearing when the mouse is pointing to the upper-right corner of the screen. If you enable this policy setting, Search, Share, Start, Devices, and Settings will no longer appear when the mouse is pointing to the upper-right corner. They'll still be available if the mouse is pointing to the lower-right corner. If you disable or don't configure this policy setting, Search, Share, Start, Devices, and Settings will be available by default, and the user can configure this setting.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "DisableCharms",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "DisableHelpSticker",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows_6_3",
  "DisplayName": "Disable help tips",
  "ExplainText": "Disables help tips that Windows shows to the user. By default, Windows will show the user help tips until the user has successfully completed the scenarios. If this setting is enabled, Windows will not show any help tips to the user.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\EdgeUI",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "DisableHelpSticker",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "EdgeUI.admx",
  "CategoryName": "EdgeUI",
  "PolicyName": "AllowEdgeSwipe",
  "NameSpace": "Microsoft.Policies.EdgeUI",
  "Supported": "Windows_10_0",
  "DisplayName": "Allow edge swipe",
  "ExplainText": "If you disable this policy setting, users will not be able to invoke any system UI by swiping in from any screen edge. If you enable or do not configure this policy setting, users will be able to invoke system UI by swiping in from the screen edges.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\EdgeUI",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\EdgeUI"
  ],
  "ValueName": "AllowEdgeSwipe",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
