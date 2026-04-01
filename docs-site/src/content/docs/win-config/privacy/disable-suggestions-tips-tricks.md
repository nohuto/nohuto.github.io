---
title: 'Suggestions/Tips/Tricks'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-suggestionstipstricks'
sidebar:
  order: 24
---

Disables all kind of suggestions: in start, text suggestions (multilingual...), in the timeline, content. `338389` is the only value named `SubscribedContent-{number}Enabled` that exists by default.

```c
// System > Notifications > Additional settings - Get tips and suggestions when using Windows
"SubscribedContent-338389Enabled": { "Type": "REG_DWORD", "Data": 0 },

// System > Notifications > Additional settings - Show the Windows welcome experience after updates and when signed in to show what's new and suggested
"SubscribedContent-310093Enabled": { "Type": "REG_DWORD", "Data": 0 },

// Used in Privacy & security > Recommendations & offers - Recommendatins and offers in Settings
"SubscribedContent-338393Enabled": { "Type": "REG_DWORD", "Data": 0 },
"SubscribedContent-353694Enabled": { "Type": "REG_DWORD", "Data": 0 },
"SubscribedContent-353696Enabled": { "Type": "REG_DWORD", "Data": 0 }

// these get read on boot
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-202914Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-280810Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-280811Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-280815Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-310091Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-310093Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-338387Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-338389Enabled","SUCCESS","Type: REG_DWORD, Length: 4, Data: 1"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-353694Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-353696Enabled","Length: 16"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-353698Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000045Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000161Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000163Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000165Enabled","Length: 12"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000325Enabled","Length: 16"
"HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\SubscribedContent-88000326Enabled","Length: 16"
```

```json
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableThirdPartySuggestions",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Do not suggest third-party content in Windows spotlight",
  "ExplainText": "If you enable this policy, Windows spotlight features like lock screen spotlight, suggested apps in Start menu or Windows tips will no longer suggest apps and content from third-party software publishers. Users may still see suggestions and tips to make them more productive with Microsoft features and apps. If you disable or do not configure this policy, Windows spotlight features may suggest apps and content from third-party software publishers in addition to Microsoft apps and content.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableThirdPartySuggestions",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableConsumerAccountStateContent",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Turn off cloud consumer account state content",
  "ExplainText": "This policy setting lets you turn off cloud consumer account state content in all Windows experiences. If you enable this policy, Windows experiences that use the cloud consumer account state content client component, will instead present the default fallback content. If you disable or do not configure this policy, Windows experiences will be able to use cloud consumer account state content.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableConsumerAccountStateContent",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ControlPanel.admx",
  "CategoryName": "ControlPanel",
  "PolicyName": "AllowOnlineTips",
  "NameSpace": "Microsoft.Policies.ControlPanel",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Allow Online Tips",
  "ExplainText": "Enables or disables the retrieval of online tips and help for the Settings app. If disabled, Settings will not contact Microsoft content services to retrieve tips and help content.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "Elements": [
    { "Type": "Boolean", "ValueName": "AllowOnlineTips", "TrueValue": "1", "FalseValue": "0" }
  ]
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "HideRecommendedPersonalizedSites",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows_11_0_SE",
  "DisplayName": "Remove Personalized Website Recommendations from the Recommended section in the Start Menu",
  "ExplainText": "Remove Personalized Website Recommendations from the Recommended section in the Start Menu",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "HideRecommendedPersonalizedSites",
  "Elements": []
},
{
  "File": "StartMenu.admx",
  "CategoryName": "StartMenu",
  "PolicyName": "HideRecommendedSection",
  "NameSpace": "Microsoft.Policies.StartMenu",
  "Supported": "Windows_11_0_SE",
  "DisplayName": "Remove Recommended section from Start Menu",
  "ExplainText": "This policy allows you to prevent the Start Menu from displaying a list of recommended applications and files. If you enable this policy setting, the Start Menu will no longer show the section containing a list of recommended files and apps.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "HideRecommendedSection",
  "Elements": []
},
{
  "File": "WindowsExplorer.admx",
  "CategoryName": "WindowsExplorer",
  "PolicyName": "DisableSearchBoxSuggestions",
  "NameSpace": "Microsoft.Policies.WindowsExplorer",
  "Supported": "Windows7",
  "DisplayName": "Turn off display of recent search entries in the File Explorer search box",
  "ExplainText": "Disables suggesting recent queries for the Search Box and prevents entries into the Search Box from being stored in the registry for future references. File Explorer shows suggestion pop-ups as users type into the Search Box. These suggestions are based on their past entries into the Search Box. Note: If you enable this policy, File Explorer will not show suggestion pop-ups as users type into the Search Box, and it will not store Search Box entries into the registry for future references. If the user types a property, values that match this property will be shown but no data will be saved in the registry or re-shown on subsequent uses of the search box.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "DisableSearchBoxSuggestions",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

---

### Miscellaneous Notes

Disable edge related suggestions with (search suggestions in address bar):
```json
"HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge": {
  "SearchSuggestEnabled": { "Type": "REG_DWORD", "Data": 0 },
  "LocalProvidersEnabled": { "Type": "REG_DWORD", "Data": 0 }
},
"HKLM\\Software\\Policies\\Microsoft\\MicrosoftEdge\\SearchScopes": {
  "ShowSearchSuggestionsGlobal": { "Type": "REG_DWORD", "Data": 0 }
}
```

All `Microsoft\INPUT\Settings` values which get read on boot:
```
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AUTOCAP
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AUTOCAPALLTOKENS
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AUTOCAPALLTOKENS
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AUTOCORRECTFIRSTWORD
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AUTOCORRECTION
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AutoScrollBottomZone
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AutoScrollThreshold
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : AutoScrollTopZone
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : BluebirdDTWMultiplier
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : DisablePersonalizationGTKM
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : DynamicAutocorrectionAllowed
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : EMOJISUGGESTION
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : EnableHwkbAutocorrection2
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : EnableHwkbTextPrediction
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : FLIPDebugOptions
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : HASTRAILER
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : HwkbNavigationOverrideMode
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : HwkbTextPredictionDelay
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : INPUTHISTORYGUID
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : Insights
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : InsightsEnabled
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : KEYBOARDMODE
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : LMDataLoggerEnabled
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : MAXCORRECTIONS
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : MultilingualEnabled
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : NotActiveLanguagePenalty
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : PERIODSHORTCUT
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : PredictionDisabled
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : PredictionDisabledCleared
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : PRIVATE
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : RULEBASEDCONVERSION
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SearchWeight_1
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SearchWeight_10
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SearchWeight_3
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShapeDataSources
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShapeWeight_10
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShapeWeight_4
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShapeWeight_5
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SHAPEWRITINGPREDICTION
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShortenMultilingualTraversal
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : ShowAllSuggestions
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SPELLCHECK
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : SUPPRESSCONVERSION
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : Transliteration
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : TRANSLITERATIONONTHEFLY
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : TRANSLITERATIONSYMBOLS
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : USEDANDA
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : UserStatsEnabled
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : VerticalMovementLimit
\Registry\Machine\SOFTWARE\Microsoft\INPUT\Settings : VerticalMovementUpLimit
```
