---
title: 'Suggestions/Tips/Tricks'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 5
---

Disables all kind of suggestions: in start, text suggestions (multilingual...), in the timeline, content. `338389` is the only value named `SubscribedContent-{number}Enabled` that exists by default.

## SubscribedContent IDs

Since the `SubscribedContent-*` values aren't documented literally anywhere I've tried to get some information to see which exist and what they do. You can find information on them in `ContentDeliveryManager.Utilities.dll`, see [contentdelivery.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/contentdelivery.c) for machine code snippets that include these information.

| Feature | IDs | Practical meaning |
|---|---|---|
| `LockScreen` | `338380`, `338387` | Windows Spotlight / lock-screen creative content |
| `WindowsTip` | `338382`, `338389` | tips, tricks, and suggested Windows content - `338389` is used for 'System > Notifications > Additional settings - Get tips and suggestions when using Windows' |
| `StartSuggestions` | `338381`, `338388` | suggested/recommended content in Start |
| `Settings` | `338386`, `338393` | promoted content inside Settings |
| `SettingsHome` | `353697`, `353696` | Settings Home recommendations/cards |
| `SettingsAccountsYourInfo` | `353695`, `353694` | promoted content in Settings > Accounts > Your info |
| `SettingsValueBanner` | `88000106`, `88000105` | banner/value-promoting content in Settings |
| `OobeOffers` | `314566`, `314567` | OOBE and post-setup offers |
| `MinuteZeroOffers` | `310094`, `310093` | very-early setup / first-run offers - `310093` is used for 'System > Notifications > Additional settings - Show the Windows welcome experience after updates and when signed in to show what's new and suggested' |
| `ApiTest` | `280812` | internal/test subscription used by CDM |
| `ActionCenter` | `310092`, `310091` | Action Center / notification-surface content |
| `ShareAppSuggestions` | `280814`, `280815` | app suggestions around sharing flows |
| `SilentInstalledApps` | `202913`, `202914` | silent/preinstalled app delivery |
| `PeopleAppSuggestions` | `314562`, `314563` | People-related app suggestions |
| `DynamicLayouts` | `314558`, `314559` | dynamic layout-driven targeted content |
| `DynamicLayoutsSV` | `88000531`, `88000530` | variant of dynamic layouts |
| `Timeline` | `353699`, `353698` | Timeline-related suggested content |
| `AppDefaultsEdgeEnlightenment` | `88000044`, `88000045` | Edge/default-app promotion |
| `OneDriveLocal` | `280797`, `280811` | local OneDrive promotion/setup |
| `OneDriveSync` | `280817`, `280810` | OneDrive sync promotion/setup |
| `OneDriveDocuments` | `88000162`, `88000161` | OneDrive documents backup/setup |
| `OneDriveDesktop` | `88000164`, `88000163` | OneDrive desktop backup/setup |
| `OneDrivePictures` | `88000166`, `88000165` | OneDrive pictures backup/setup |

`SubscribedContent-338393Enabled` `SubscribedContent-353694Enabled` ,`SubscribedContent-353696Enabled` are used in 'Privacy & security > Recommendations & offers - Recommendatins and offers in Settings' but only when toggling it off (when toggling it on they stay at `0`).

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off Microsoft consumer experiences](https://noverse.dev/policies?p=CloudContent*DisableWindowsConsumerFeatures) | `HKLM\Software\Policies\Microsoft\Windows\CloudContent` | `DisableWindowsConsumerFeatures` |
| [Turn off cloud optimized content](https://noverse.dev/policies?p=CloudContent*DisableCloudOptimizedContent) | `HKLM\Software\Policies\Microsoft\Windows\CloudContent` | `DisableCloudOptimizedContent` |
| [Turn off cloud consumer account state content](https://noverse.dev/policies?p=CloudContent*DisableConsumerAccountStateContent) | `HKLM\Software\Policies\Microsoft\Windows\CloudContent` | `DisableConsumerAccountStateContent` |
| [Do not show Windows tips](https://noverse.dev/policies?p=CloudContent*DisableSoftLanding) | `HKLM\Software\Policies\Microsoft\Windows\CloudContent` | `DisableSoftLanding` |
| [Do not suggest third-party content in Windows spotlight](https://noverse.dev/policies?p=CloudContent*DisableThirdPartySuggestions) | `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableThirdPartySuggestions` |
| [Allow Online Tips](https://noverse.dev/policies?p=ControlPanel*AllowOnlineTips) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer` | `AllowOnlineTips` |
| [Remove Recommended section from Start Menu](https://noverse.dev/policies?p=StartMenu*HideRecommendedSection) | `HKLM\Software\Policies\Microsoft\Windows\Explorer`<br>`HKCU\Software\Policies\Microsoft\Windows\Explorer` | `HideRecommendedSection` |
| [Remove Personalized Website Recommendations from the Recommended section in the Start Menu](https://noverse.dev/policies?p=StartMenu*HideRecommendedPersonalizedSites) | `HKLM\Software\Policies\Microsoft\Windows\Explorer`<br>`HKCU\Software\Policies\Microsoft\Windows\Explorer` | `HideRecommendedPersonalizedSites` |
| [Turn off display of recent search entries in the File Explorer search box](https://noverse.dev/policies?p=WindowsExplorer*DisableSearchBoxSuggestions) | `HKCU\Software\Policies\Microsoft\Windows\Explorer` | `DisableSearchBoxSuggestions` |

## Miscellaneous Notes

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
