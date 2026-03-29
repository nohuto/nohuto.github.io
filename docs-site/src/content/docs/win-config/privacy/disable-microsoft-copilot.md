---
title: 'Microsoft Copilot'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-microsoft-copilot'
sidebar:
  order: 21
---

"Microsoft introduced Windows Copilot in May 2023. It became available in Windows 11 starting with build 23493 (Dev), 22631.2129 (Beta), and 25982 (Canary). A public preview began rolling out on September 26, 2023, with build 22621.2361 (Windows 11 22H2 KB5030310). It adds integrated AI features to assist with tasks like summarizing web content, writing, and generating images. Windows Copilot appears as a sidebar docked to the right and runs alongside open apps. In Windows 10, Copilot is available in build 19045.3754 for eligible devices in the Release Preview Channel running version 22H2. Users must enable "Get the latest updates as soon as they're available" and check for updates. The rollout is phased via Controlled Feature Rollout (CFR). Windows 10 Pro devices managed by organizations, and all Enterprise or Education editions, are excluded from the initial rollout. Copilot requires signing in with a Microsoft account (MSA) or Azure Active Directory (Entra ID). Users with local accounts can use Copilot up to ten times before sign-in is enforced."

`CopilotDisabledReason`:
```c
ValueW = RegGetValueW(
    HKEY_CURRENT_USER,
    L"SOFTWARE\\Microsoft\\Windows\\Shell\\Copilot",
    L"CopilotDisabledReason",
    2u, // REG_SZ
    0LL,
    pvData,
    pcbData);

v16 = L"FailedToGetReason"; // if value is missing
```

```json
"HKCU\\SOFTWARE\\Microsoft\\Windows\\Shell\\Copilot": {
  "CopilotDisabledReason": { "Type": "REG_SZ", "Data": "FeatureIsDisabled" }
}
```
`FeatureIsDisabled` seems to be used by default here (`IsRequiredEdgeBrowserInstalledFailed` exists too):
```c
// procmon boot trace (value unset)
"Explorer.EXE","HKCU\Software\Microsoft\Windows\Shell\Copilot\CopilotDisabledReason","SUCCESS","Type: REG_SZ, Length: 36, Data: FeatureIsDisabled"

// ?
"HKCU\Software\Microsoft\Windows\Shell\Copilot\CopilotLogonTelemetryTime","Type: REG_BINARY, Length: 8, Data: 7A 84 DA 49 6B 89 DC 01"
```

```json
{
  "File": "WindowsCopilot.admx",
  "CategoryName": "WindowsCopilot",
  "PolicyName": "TurnOffWindowsCopilot",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX",
  "DisplayName": "Turn off Windows Copilot",
  "ExplainText": "This policy setting allows you to turn off Windows Copilot. If you enable this policy setting, users will not be able to use Copilot. The Copilot icon will not appear on the taskbar either. If you disable or do not configure this policy setting, users will be able to use Copilot when it's available to them.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsCopilot"
  ],
  "ValueName": "TurnOffWindowsCopilot",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

---

Miscellaneous notes:
```c
"OneDrive.exe","HKCU\Software\Microsoft\OneDrive\Accounts\Personal\CopilotEducationalExperienceInfoIconDismissed","NAME NOT FOUND","Length: 16"
"MicrosoftEdgeUpdate.exe","HKLM\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\CopilotUpgradeCheck","NAME NOT FOUND","Length: 16"
"Explorer.EXE","HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoInstalledPWAs\CopilotHWKeyChoiceSet","SUCCESS","Type: REG_DWORD, Length: 4, Data: 1"
"Explorer.EXE","HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoInstalledPWAs\CopilotPWAPreinstallCompleted","SUCCESS","Type: REG_DWORD, Length: 4, Data: 1"


# Disable Recall

"Allows you to control whether Windows saves snapshots of the screen and analyzes the user's activity on their device. If you enable this policy setting, Windows will not be able to save snapshots and users won't be able to search for or browse through their historical device activity using Recall. If you disable or do not configure this policy setting, Windows will save snapshots of the screen and users will be able to search for or browse through a timeline of their past activities using Recall." (`WindowsCopilot.admx`)

`Disable ClickToDo`:  
"Click to Do lets people take action on content on their screens. When activated, it takes a screenshot of their screen and analyzes it to present actions. Click to Do ends when they exit it, and it can't take screenshots while closed. Screenshot analysis is always performed locally on their device. By default, Click to Do is enabled for users. This policy setting allows you to determine whether Click to Do is available for users on their device. When the policy is enabled, the Click to Do component and entry points will not be available to users. When the policy is disabled, users will have Click to Do available on their device."

```json
{
  "File": "WindowsCopilot.admx",
  "CategoryName": "WindowsAI",
  "PolicyName": "DisableAIDataAnalysis",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX",
  "DisplayName": "Turn off Saving Snapshots for Windows",
  "ExplainText": "This policy setting allows you to control whether Windows saves snapshots of the screen and analyzes the user's activity on their device. If you enable this policy setting, Windows will not be able to save snapshots and users won't be able to search for or browse through their historical device activity using Recall. If you disable or do not configure this policy setting, Windows will save snapshots of the screen and users will be able to search for or browse through a timeline of their past activities using Recall.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI"
  ],
  "ValueName": "DisableAIDataAnalysis",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsCopilot.admx",
  "CategoryName": "WindowsAI",
  "PolicyName": "DisableClickToDo",
  "NameSpace": "Microsoft.Policies.WindowsCopilot",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX - At least Windows 11 Pro, Enterprise, or Education with Windows Sandbox",
  "DisplayName": "Disable Click to Do",
  "ExplainText": "Click to Do lets people take action on content on their screens. When activated, it takes a screenshot of their screen and analyzes it to present actions. Click to Do ends when they exit it, and it can't take screenshots while closed. Screenshot analysis is always performed locally on their device. By default, Click to Do is enabled for users. This policy setting allows you to determine whether Click to Do is available for users on their device. When the policy is enabled, the Click to Do component and entry points will not be available to users. When the policy is disabled, users will have Click to Do available on their device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI"
  ],
  "ValueName": "DisableClickToDo",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Camera

Disallows the use of a camera on your system, by denying access via `LetAppsAccessCamera`/`AllowCamera`/services (and app permission).

| Service | Description |
| --- | --- |
| `FrameServer` | Enables multiple clients to access video frames from camera devices. |
| `FrameServerMonitor` | Monitors the health and state for the Windows Camera Frame Server service. |

`Disable Lock Screen Camera`:  
"Disables the lock screen camera toggle switch in PC Settings and prevents a camera from being invoked on the lock screen.By default, users can enable invocation of an available camera on the lock screen.If you enable this setting, users will no longer be able to enable or disable lock screen camera access in PC Settings, and the camera cannot be invoked on the lock screen." (`ControlPanelDisplay.admx`)

> https://support.microsoft.com/en-us/windows/manage-cameras-with-camera-settings-in-windows-11-97997ed5-bb98-47b6-a13d-964106997757

```json
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessCamera",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access the camera",
  "ExplainText": "This policy setting specifies whether Windows apps can access the camera. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the camera by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the camera and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the camera and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the camera by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessCamera", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "ControlPanelDisplay.admx",
  "CategoryName": "Personalization",
  "PolicyName": "CPL_Personalization_NoLockScreenCamera",
  "NameSpace": "Microsoft.Policies.ControlPanelDisplay",
  "Supported": "Windows_6_3",
  "DisplayName": "Prevent enabling lock screen camera",
  "ExplainText": "Disables the lock screen camera toggle switch in PC Settings and prevents a camera from being invoked on the lock screen. By default, users can enable invocation of an available camera on the lock screen. If you enable this setting, users will no longer be able to enable or disable lock screen camera access in PC Settings, and the camera cannot be invoked on the lock screen.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Personalization"
  ],
  "ValueName": "NoLockScreenCamera",
  "Elements": []
},
{
  "File": "Camera.admx",
  "CategoryName": "L_Camera_GroupPolicyCategory",
  "PolicyName": "L_AllowCamera",
  "NameSpace": "Microsoft.Policies.Camera",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Use of Camera",
  "ExplainText": "This policy setting allow the use of Camera devices on the machine. If you enable or do not configure this policy setting, Camera devices will be enabled. If you disable this property setting, Camera devices will be disabled.",
  "KeyPath": [
    "HKLM\\software\\Policies\\Microsoft\\Camera"
  ],
  "ValueName": "AllowCamera",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Suggestions/Tips/Tricks

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

# Disable Synchronization

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

# Disable Activity History

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


# Disable Cross-Device Experiences

Disables Cross-Device experiences (allows you to use `Share Across Devices`/`Nearby Sharing` functionalities) & share accross devices. With `Share across devices`, you can continue app experiences on other devices connected to your account (set to `My device only` by default).

---

Changing "Share across devices" option via `SystemSettings`:
```c
// Off
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 0
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 0

// My device only
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\SettingsPage\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 1

// Everyone nearby
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\SettingsPage\RomeSdkChannelUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\CdpSessionUserAuthzPolicy	Type: REG_DWORD, Length: 4, Data: 2

// Miscellaneous note
HKCU\Software\Microsoft\Windows\CurrentVersion\CDP\EnableRemoteLaunchToast  Type: REG_DWORD, Length: 4, Data: 1
```

`RomeSdkChannelUserAuthzPolicy` (`CDP\SettingsPage`) is only used for "My device only"/"Everyone nearby" (it's still getting changed to `0` in this option).

```c
L"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\\SettingsPage",
L"BluetoothLastDisabledNearShare",

L"SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\\SettingsPage",
L"WifiLastDisabledNearShare",
```

> [privacy/assets | crossdev-SharedExperiencesSingleton.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crossdev-SharedExperiencesSingleton.c)

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "EnableCDP",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "Windows_10_0",
  "DisplayName": "Continue experiences on this device",
  "ExplainText": "This policy setting determines whether the Windows device is allowed to participate in cross-device experiences (continue experiences). If you enable this policy setting, the Windows device is discoverable by other Windows devices that belong to the same user, and can participate in cross-device experiences. If you disable this policy setting, the Windows device is not discoverable by other devices, and cannot participate in cross-device experiences. If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableCdp",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Phone Linking

"This policy allows IT admins to turn off the ability to Link a Phone with a PC to continue reading, emailing and other tasks that requires linking between Phone and PC.If you enable this policy setting, the Windows device will be able to enroll in Phone-PC linking functionality and participate in Continue on PC experiences.If you disable this policy setting, the Windows device is not allowed to be linked to Phones, will remove itself from the device list of any linked Phones, and cannot participate in Continue on PC experiences.If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot."

This option will also disable resume ("Start something on one device and continue on this PC") - `System Settings > Apps > Resume`.

```c
// Off
HKCU\Software\Microsoft\Windows\CurrentVersion\CrossDeviceResume\Configuration\IsResumeAllowed	Type: REG_DWORD, Length: 4, Data: 0

// On
HKCU\Software\Microsoft\Windows\CurrentVersion\CrossDeviceResume\Configuration\IsResumeAllowed	Type: REG_DWORD, Length: 4, Data: 1
```

By default resume is enabled, OneDrive is the only app which exists under the "Control which apps can use Resume" on a stock 25H2 installation and can be toggled via `IsOneDriveResumeAllowed` (same key as `IsResumeAllowed`). Disabling resume will disallow all apps to use Resume (doesn't set `IsXResumeAllowed` to `0`).

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "EnableMMX",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Phone-PC linking on this device",
  "ExplainText": "This policy allows IT admins to turn off the ability to Link a Phone with a PC to continue reading, emailing and other tasks that requires linking between Phone and PC. If you enable this policy setting, the Windows device will be able to enroll in Phone-PC linking functionality and participate in Continue on PC experiences. If you disable this policy setting, the Windows device is not allowed to be linked to Phones, will remove itself from the device list of any linked Phones, and cannot participate in Continue on PC experiences. If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableMmx",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable File History

"File History automatically backs up versions of files in your user folders (Documents, Music, Pictures, Videos, Desktop) and offline OneDrive. It tracks changes via the NTFS change journal (fast, low overhead) and saves only changed files. You must choose a backup target (external drive or network share). If that target is unavailable, it caches copies locally and syncs them when the target returns. You can browse and restore any version or recover lost/deleted files."

```json
{
  "File": "FileHistory.admx",
  "CategoryName": "FileHistory",
  "PolicyName": "DisableFileHistory",
  "NameSpace": "Microsoft.Policies.FileHistory",
  "Supported": "Windows8",
  "DisplayName": "Turn off File History",
  "ExplainText": "This policy setting allows you to turn off File History. If you enable this policy setting, File History cannot be activated to create regular, automatic backups. If you disable or do not configure this policy setting, File History can be activated to create regular, automatic backups.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\FileHistory"
  ],
  "ValueName": "Disabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable MDM Enrollment

`DisableRegistration`:  
"This policy setting specifies whether Mobile Device Management (MDM) Enrollment is allowed. When MDM is enabled, it allows the user to have the computer remotely managed by a MDM Server. If you do not configure this policy setting, MDM Enrollment will be enabled. If you enable this policy setting, MDM Enrollment will be disabled for all users. It will not unenroll existing MDM enrollments.If you disable this policy setting, MDM Enrollment will be enabled for all users."

`AutoEnrollMDM`:  
"This policy setting specifies whether to automatically enroll the device to the Mobile Device Management (MDM) service configured in Azure Active Directory (Azure AD). If the enrollment is successful, the device will remotely managed by the MDM service. Important: The device must be registered in Azure AD for enrollment to succeed. If you do not configure this policy setting, automatic MDM enrollment will not be initiated. If you enable this policy setting, a task is created to initiate enrollment of the device to MDM service specified in the Azure AD. If you disable this policy setting, MDM will be unenrolled."

```json
{
  "File": "MDM.admx",
  "CategoryName": "MDM",
  "PolicyName": "MDM_MDM_DisplayName",
  "NameSpace": "Microsoft.Policies.MDM",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Disable MDM Enrollment",
  "ExplainText": "This policy setting specifies whether Mobile Device Management (MDM) Enrollment is allowed. When MDM is enabled, it allows the user to have the computer remotely managed by a MDM Server. If you do not configure this policy setting, MDM Enrollment will be enabled. If you enable this policy setting, MDM Enrollment will be disabled for all users. It will not unenroll existing MDM enrollments. If you disable this policy setting, MDM Enrollment will be enabled for all users.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\MDM"
  ],
  "ValueName": "DisableRegistration",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "MDM.admx",
  "CategoryName": "MDM",
  "PolicyName": "MDM_JoinMDM_DisplayName",
  "NameSpace": "Microsoft.Policies.MDM",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Enable automatic MDM enrollment using default Azure AD credentials",
  "ExplainText": "This policy setting specifies whether to automatically enroll the device to the Mobile Device Management (MDM) service configured in Azure Active Directory (Azure AD). If the enrollment is successful, the device will remotely managed by the MDM service. Important: The device must be registered in Azure AD for enrollment to succeed. If you do not configure this policy setting, automatic MDM enrollment will not be initiated. If you enable this policy setting, a task is created to initiate enrollment of the device to MDM service specified in the Azure AD. If you disable this policy setting, MDM will be unenrolled.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\CurrentVersion\\MDM"
  ],
  "ValueName": "AutoEnrollMDM",
  "Elements": [
    { "Type": "Enum", "ValueName": "UseAADCredentialType", "Items": [
        { "DisplayName": "User Credential", "Data": "1" },
        { "DisplayName": "Device Credential", "Data": "2" }
      ]
    },
    { "Type": "Text", "ValueName": "MDMApplicationId" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Feedback Prompts

"This policy setting allows an organization to prevent its devices from showing feedback questions from Microsoft.If you enable this policy setting, users will no longer see feedback notifications through the Windows Feedback app.If you disable or do not configure this policy setting, users may see notifications through the Windows Feedback app asking users for feedback.Note: If you disable or do not configure this policy setting, users can control how often they receive feedback questions."

Includes setting `Feedback Frequency` to `0` via `NumberOfSIUFInPeriod` & `PeriodInNanoSeconds`.

```json
{
  "File": "FeedbackNotifications.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DoNotShowFeedbackNotifications",
  "NameSpace": "Microsoft.Policies.FeedbackNotifications",
  "Supported": "Windows_10_0",
  "DisplayName": "Do not show feedback notifications",
  "ExplainText": "This policy setting allows an organization to prevent its devices from showing feedback questions from Microsoft. If you enable this policy setting, users will no longer see feedback notifications through the Windows Feedback app. If you disable or do not configure this policy setting, users may see notifications through the Windows Feedback app asking users for feedback. Note: If you disable or do not configure this policy setting, users can control how often they receive feedback questions.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DoNotShowFeedbackNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable CEIP

Voluntary program that collects usage data to help improve the quality and performance of its products.

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-admx-icm  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-internetexplorer#disablecustomerexperienceimprovementprogramparticipation

```json
{
  "File": "appv.admx",
  "CategoryName": "CAT_CEIP",
  "PolicyName": "CEIP_Enable",
  "NameSpace": "Microsoft.Policies.AppV",
  "Supported": "Windows7",
  "DisplayName": "Microsoft Customer Experience Improvement Program (CEIP)",
  "ExplainText": "The program collects information about computer hardware and how you use Microsoft Application Virtualization without interrupting you. This helps Microsoft identify which Microsoft Application Virtualization features to improve. No information collected is used to identify or contact you. For more details, read about the program online at http://go.microsoft.com/fwlink/?LinkID=184686.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\AppV\\CEIP"
  ],
  "ValueName": "CEIPEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "CEIPEnable",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsVista",
  "DisplayName": "Turn off Windows Customer Experience Improvement Program",
  "ExplainText": "This policy setting turns off the Windows Customer Experience Improvement Program. The Windows Customer Experience Improvement Program collects information about your hardware configuration and how you use our software and services to identify trends and usage patterns. Microsoft will not collect your name, address, or any other personally identifiable information. There are no surveys to complete, no salesperson will call, and you can continue working without interruption. It is simple and user-friendly. If you enable this policy setting, all users are opted out of the Windows Customer Experience Improvement Program. If you disable this policy setting, all users are opted into the Windows Customer Experience Improvement Program. If you do not configure this policy setting, the administrator can use the Problem Reports and Solutions component in Control Panel to enable Windows Customer Experience Improvement Program for all users.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\SQMClient\\Windows"
  ],
  "ValueName": "CEIPEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "WinMSG_NoInstrumentation_2",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2_Or_WindowsNET",
  "DisplayName": "Turn off the Windows Messenger Customer Experience Improvement Program",
  "ExplainText": "This policy setting specifies whether Windows Messenger collects anonymous information about how Windows Messenger software and service is used. With the Customer Experience Improvement program, users can allow Microsoft to collect anonymous information about how the product is used. This information is used to improve the product in future releases. If you enable this policy setting, Windows Messenger does not collect usage information, and the user settings to enable the collection of usage information are not shown. If you disable this policy setting, Windows Messenger collects anonymous usage information, and the setting is not shown. If you do not configure this policy setting, users have the choice to opt in and allow information to be collected.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Messenger\\Client"
  ],
  "ValueName": "CEIP",
  "Elements": [
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```

# Disable Cortana

"Cortana was a virtual assistant developed by Microsoft that used the Bing search engine to perform tasks such as setting reminders and answering questions for users."

> https://en.wikipedia.org/wiki/Cortana_(virtual_assistant)  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-abovelock  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-experience#allowcortana

---

Miscellaneous notes:
```c
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\DevOverrideOneSettings","Length: 16"
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\IsAvailable","Type: REG_DWORD, Length: 4, Data: 1"
```

# Hide Last Logged-In User

Note that if you use this option and don't have a password, you'll have to enter your username at each boot.

"This security setting determines whether the Windows sign-in screen will show the username of the last person who signed in on this PC."

```c
// Enabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayLastUserName	Type: REG_DWORD, Length: 4, Data: 1

// Disabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayLastUserName	Type: REG_DWORD, Length: 4, Data: 0
```

`Hide Username at Sign-In`:  
"This security setting determines whether the username of the person signing in to this PC appears at Windows sign-in, after credentials are entered, and before the PC desktop is shown."

```c
// Enabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayUserName	Type: REG_DWORD, Length: 4, Data: 1

// Disabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\DontDisplayUserName	Type: REG_DWORD, Length: 4, Data: 0
```

> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/interactive-logon-do-not-display-last-user-name

---

```json
{
  "File": "WinLogon.admx",
  "CategoryName": "Logon",
  "PolicyName": "DisplayLastLogonInfoDescription",
  "NameSpace": "Microsoft.Policies.WindowsLogon2",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Display information about previous logons during user logon",
  "ExplainText": "This policy setting controls whether or not the system displays information about previous logons and logon failures to the user. For local user accounts and domain user accounts in domains of at least a Windows Server 2008 functional level, if you enable this setting, a message appears after the user logs on that displays the date and time of the last successful logon by that user, the date and time of the last unsuccessful logon attempted with that user name, and the number of unsuccessful logons since the last successful logon by that user. This message must be acknowledged by the user before the user is presented with the Microsoft Windows desktop. For domain user accounts in Windows Server 2003, Windows 2000 native, or Windows 2000 mixed functional level domains, if you enable this setting, a warning message will appear that Windows could not retrieve the information and the user will not be able to log on. Therefore, you should not enable this policy setting if the domain is not at the Windows Server 2008 domain functional level. If you disable or do not configure this setting, messages about the previous logon or logon failures are not displayed.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "DisplayLastLogonInfo",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WinLogon.admx",
  "CategoryName": "Logon",
  "PolicyName": "LogonHoursNotificationPolicyDescription",
  "NameSpace": "Microsoft.Policies.WindowsLogon2",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Remove logon hours expiration warnings",
  "ExplainText": "This policy controls whether the logged on user should be notified when his logon hours are about to expire. By default, a user is notified before logon hours expire, if actions have been set to occur when the logon hours expire. If you enable this setting, warnings are not displayed to the user before the logon hours expire. If you disable or do not configure this setting, users receive warnings before the logon hours expire, if actions have been set to occur when the logon hours expire. Note: If you configure this setting, you might want to examine and appropriately configure the \u201cSet action to take when logon hours expire\u201d setting. If \u201cSet action to take when logon hours expire\u201d is disabled or not configured, the \u201cRemove logon hours expiration warnings\u201d setting will have no effect, and users receive no warnings about logon hour expiration",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "DontDisplayLogonHoursWarnings",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Background Apps

"This policy setting specifies whether Windows apps can run in the background.You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting.If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can run in the background by using Settings Privacy on the device.If you choose the "Force Allow" option, Windows apps are allowed to run in the background and employees in your organization cannot change it.If you choose the "Force Deny" option, Windows apps are not allowed to run in the background and employees in your organization cannot change it.If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can run in the background by using Settings Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app."

```
Computer Configuration\Administrative Templates\Windows Components\App Privacy
```
`Enabled` -> `Deny All changes`:
```powershell
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground	Type: REG_DWORD, Length: 4, Data: 2
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_UserInControlOfTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_ForceAllowTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
mmc.exe	RegSetValue	HKCU\Software\Microsoft\Windows\CurrentVersion\Group Policy Objects\{5D10D350-8BC7-4D14-9723-C79DF35A74B4}Machine\Software\Policies\Microsoft\Windows\AppPrivacy\LetAppsRunInBackground_ForceDenyTheseApps	Type: REG_MULTI_SZ, Length: 2, Data: 
```

```json
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsRunInBackground",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0",
  "DisplayName": "Let Windows apps run in the background",
  "ExplainText": "This policy setting specifies whether Windows apps can run in the background. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can run in the background by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to run in the background and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to run in the background and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can run in the background by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsRunInBackground", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
```

`Disable Background Task Host`:  
Renames `backgroundTaskHost.exe` to prevent UWP background tasks from running (notifications, live tiles, background sync). Use only if you do not rely on Store apps.

Windows Internals (E7-P1, Modern Standby): when the system is in Modern Standby, desktop apps are suspended and UWP apps are typically suspended, but background tasks created by UWP apps are allowed to execute. `backgroundTaskHost.exe` is the host for those tasks.

# Disable WER

WER (Windows Error Reporting) sends error logs to Microsoft, disabling it keeps error data local.

Windows Internals (E7-P2, WER): WER is implemented by the WerSvc service and Wer.dll/Faultrep.dll, crashed processes connect to the service over an ALPC port to generate reports and dumps. Disabling WER stops that reporting pipeline.

`\Microsoft\Windows\Windows Error Reporting : QueueReporting` would run `%windir%\system32\wermgr.exe -upload`. `Error-Reporting.txt` shows a trace of `\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting`.

```
0.0.0.0 watson.microsoft.com
0.0.0.0 watson.telemetry.microsoft.com
0.0.0.0 umwatsonc.events.data.microsoft.com
0.0.0.0 ceuswatcab01.blob.core.windows.net
0.0.0.0 ceuswatcab02.blob.core.windows.net
0.0.0.0 eaus2watcab01.blob.core.windows.net
0.0.0.0 eaus2watcab02.blob.core.windows.net
0.0.0.0 weus2watcab01.blob.core.windows.net
0.0.0.0 weus2watcab02.blob.core.windows.net
```
`DisableSendRequestAdditionalSoftwareToWER`: "Prevent Windows from sending an error report when a device driver requests additional software during installation"
`DisableSendGenericDriverNotFoundToWER`: "Do not send a Windows error report when a generic driver is installed on a device"

> https://learn.microsoft.com/en-us/troubleshoot/windows-client/system-management-components/windows-error-reporting-diagnostics-enablement-guidance#configure-network-endpoints-to-be-allowed  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-errorreporting  
> https://learn.microsoft.com/en-us/windows/win32/wer/wer-settings  
> [privacy/assets | wer-PciGetSystemWideHackFlagsFromRegistry.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/wer-PciGetSystemWideHackFlagsFromRegistry.c)

`Disable DHA Report`:  
"This group policy enables Device Health Attestation reporting (DHA-report) on supported devices. It enables supported devices to send Device Health Attestation related information (device boot logs, PCR values, TPM certificate, etc.) to Device Health Attestation Service (DHA-Service) every time a device starts. Device Health Attestation Service validates the security state and health of the devices, and makes the findings accessible to enterprise administrators via a cloud based reporting portal. This policy is independent of DHA reports that are initiated by device manageability solutions (like MDM or SCCM), and will not interfere with their workflows."

```powershell
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ArchiveFolderCountLimit
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : AutoApproveOSDumps
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : BypassDataThrottling
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : BypassNetworkCostThrottling
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : BypassPowerThrottling
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CabArchiveCreate
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CabArchiveFolder
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CabArchiveSeparate
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ChangeDumpTypeByTelemetryLevel
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ConfigureArchive
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CorporateWerPortNumber
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CorporateWerServer
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CorporateWerUploadOnFreeNetworksOnly
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CorporateWerUseAuthentication
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : CorporateWerUseSSL
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DeferCabUpload
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DisableArchive
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : Disabled
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DisableEnterpriseAuthProxy
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DisableWerUpload
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DontSendAdditionalData
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : DontShowUI
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ForceEtw
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ForceHeapDump
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ForceMetadata
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ForceQueue
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : ForceUserModeCabCollection
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : LiveReportFlushInterval
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : LocalCompression
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : LoggingDisabled
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : MaxArchiveCount
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : MaxQueueCount
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : MaxRetriesForSasRenewal
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : MinFreeDiskSpace
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : MinQueueSize
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : NoHeapDumpOnQueue
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : OobeCompleted
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : QueueNoPesterInterval
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : QueuePesterInterval
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : QueueSizeMaxPercentFreeDisk
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : source
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : StorePath
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : UploadOnFreeNetworksOnly
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting : User
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting\Consent : DefaultConsent
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting\Consent : DefaultOverrideBehavior
\Registry\Machine\SOFTWARE\Microsoft\WINDOWS\Windows Error Reporting\Consent : NewUserDefaultConsent
```

---

Miscellaneous notes:  

```c
`EnableWerUserReporting`  
Default: `1` (`DbgkEnableWerUserReporting dd 1`)

"Session Manager\Kernel","EnableWerUserReporting","0xFFFFF800CF1C335C","0x00000000","0x00000000","0x00000000"
```

Related to PCIe advanced error reporting? Haven't found anything on this and haven't done much research myself:
```
\Registry\Machine\SYSTEM\ControlSet001\Control\PnP\pci : AerMultiErrorDisabled
```
Default is `0`, non zero would enable the behaviour? The value doesn't exist by default.
> https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/wdm/ns-wdm-_pci_express_rootport_aer_capability ?

```
\Registry\Machine\SYSTEM\ControlSet001\Control\StorPort : TelemetryErrorDataEnabled
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager\Memory Management : PeriodicTelemetryReportFrequency
```

```json
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "PCH_ShowUI",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsNET_XP",
  "DisplayName": "Display Error Notification",
  "ExplainText": "This policy setting controls whether users are shown an error dialog box that lets them report an error. If you enable this policy setting, users are notified in a dialog box that an error has occurred, and can display more details about the error. If the Configure Error Reporting policy setting is also enabled, the user can also report the error. If you disable this policy setting, users are not notified that errors have occurred. If the Configure Error Reporting policy setting is also enabled, errors are reported, but users receive no notification. Disabling this policy setting is useful for servers that do not have interactive users. If you do not configure this policy setting, users can change this setting in Control Panel, which is set to enable notification by default on computers that are running Windows XP Personal Edition and Windows XP Professional Edition, and disable notification by default on computers that are running Windows Server. See also the Configure Error Reporting policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\PCHealth\\ErrorReporting"
  ],
  "ValueName": "ShowUI",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerDisable_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Disable Windows Error Reporting",
  "ExplainText": "This policy setting turns off Windows Error Reporting, so that reports are not collected or sent to either Microsoft or internal servers within your organization when software unexpectedly stops working or fails. If you enable this policy setting, Windows Error Reporting does not send any problem information to Microsoft. Additionally, solution information is not available in Security and Maintenance in Control Panel. If you disable or do not configure this policy setting, the Turn off Windows Error Reporting policy setting in Computer Configuration/Administrative Templates/System/Internet Communication Management/Internet Communication settings takes precedence. If Turn off Windows Error Reporting is also either disabled or not configured, user settings in Control Panel for Windows Error Reporting are applied.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "Disabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerAutoApproveOSDumps_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3only",
  "DisplayName": "Automatically send memory dumps for OS-generated error reports",
  "ExplainText": "This policy setting controls whether memory dumps in support of OS-generated error reports can be sent to Microsoft automatically. This policy does not apply to error reports generated by 3rd-party products, or additional data other than memory dumps. If you enable or do not configure this policy setting, any memory dumps generated for error reports by Microsoft Windows are automatically uploaded, without notification to the user. If you disable this policy setting, then all memory dumps are uploaded according to the default consent and notification settings.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "AutoApproveOSDumps",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerNoLogging_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Disable logging",
  "ExplainText": "This policy setting controls whether Windows Error Reporting saves its own events and error messages to the system event log. If you enable this policy setting, Windows Error Reporting events are not recorded in the system event log. If you disable or do not configure this policy setting, Windows Error Reporting events and errors are logged to the system event log, as with other Windows-based programs.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "LoggingDisabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReporting",
  "PolicyName": "WerNoSecondLevelData_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Do not send additional data",
  "ExplainText": "This policy setting controls whether additional data in support of error reports can be sent to Microsoft automatically. If you enable this policy setting, any additional data requests from Microsoft in response to a Windows Error Reporting report are automatically declined, without notification to the user. If you disable or do not configure this policy setting, then consent policy settings in Computer Configuration/Administrative Templates/Windows Components/Windows Error Reporting/Consent take precedence.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "DontSendAdditionalData",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingConsent",
  "PolicyName": "WerDefaultConsent_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "Windows_6_3ToVista",
  "DisplayName": "Configure Default consent",
  "ExplainText": "This policy setting determines the default consent behavior of Windows Error Reporting. If you enable this policy setting, you can set the default consent handling for error reports. The following list describes the Consent level settings that are available in the pull-down menu in this policy setting: - Always ask before sending data: Windows prompts users for consent to send reports. - Send parameters: Only the minimum data that is required to check for an existing solution is sent automatically, and Windows prompts users for consent to send any additional data that is requested by Microsoft. - Send parameters and safe additional data: the minimum data that is required to check for an existing solution, along with data which Windows has determined (within a high probability) does not contain personally-identifiable information is sent automatically, and Windows prompts the user for consent to send any additional data that is requested by Microsoft. - Send all data: any error reporting data requested by Microsoft is sent automatically. If this policy setting is disabled or not configured, then the consent level defaults to the highest-privacy setting: Always ask before sending data.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting\\Consent"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "DefaultConsent", "Items": [
        { "DisplayName": "Always ask before sending data", "Data": "1" },
        { "DisplayName": "Send parameters", "Data": "2" },
        { "DisplayName": "Send parameters and safe additional data", "Data": "3" },
        { "DisplayName": "Send all data", "Data": "4" }
      ]
    }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingConsent",
  "PolicyName": "WerConsentOverride_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista",
  "DisplayName": "Ignore custom consent settings",
  "ExplainText": "This policy setting determines the behavior of the Configure Default Consent setting in relation to custom consent settings. If you enable this policy setting, the default consent levels of Windows Error Reporting always override any other consent policy setting. If you disable or do not configure this policy setting, custom consent policy settings for error reporting determine the consent level for specified event types, and the default consent setting determines only the consent level of any other error reports.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting\\Consent"
  ],
  "ValueName": "DefaultOverrideBehavior",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceInstall_RequestAdditionalSoftwareSendToWER",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows_10_0_RS3ToWindows7",
  "DisplayName": "Prevent Windows from sending an error report when a device driver requests additional software during installation",
  "ExplainText": "Windows has a feature that allows a device driver to request additional software through the Windows Error Reporting infrastructure. This policy allows you to disable the feature. If you enable this policy setting, Windows will not send an error report to request additional software even if this is specified by the device driver. If you disable or do not configure this policy setting, Windows sends an error report when a device driver that requests additional software is installed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall\\Settings"
  ],
  "ValueName": "DisableSendRequestAdditionalSoftwareToWER",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceInstall_GenericDriverSendToWER",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows_10_0_RS3ToVista",
  "DisplayName": "Do not send a Windows error report when a generic driver is installed on a device",
  "ExplainText": "Windows has a feature that sends \"generic-driver-installed\" reports through the Windows Error Reporting infrastructure. This policy allows you to disable the feature. If you enable this policy setting, an error report is not sent when a generic driver is installed. If you disable or do not configure this policy setting, an error report is sent when a generic driver is installed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DeviceInstall\\Settings"
  ],
  "ValueName": "DisableSendGenericDriverNotFoundToWER",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "TPM.admx",
  "CategoryName": "DSHACategory",
  "PolicyName": "OptIntoDSHA_Name",
  "NameSpace": "Microsoft.Policies.TrustedPlatformModule",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Enable Device Health Attestation Monitoring and Reporting",
  "ExplainText": "This group policy enables Device Health Attestation reporting (DHA-report) on supported devices. It enables supported devices to send Device Health Attestation related information (device boot logs, PCR values, TPM certificate, etc.) to Device Health Attestation Service (DHA-Service) every time a device starts. Device Health Attestation Service validates the security state and health of the devices, and makes the findings accessible to enterprise administrators via a cloud based reporting portal. This policy is independent of DHA reports that are initiated by device manageability solutions (like MDM or SCCM), and will not interfere with their workflows.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\DeviceHealthAttestationService"
  ],
  "ValueName": "EnableDeviceHealthAttestationService",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ErrorReporting.admx",
  "CategoryName": "CAT_WindowsErrorReportingAdvanced",
  "PolicyName": "WerArchive_2",
  "NameSpace": "Microsoft.Policies.WindowsErrorReporting",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Configure Report Archive",
  "ExplainText": "This policy setting controls the behavior of the Windows Error Reporting archive. If you enable this policy setting, you can configure Windows Error Reporting archiving behavior. If Archive behavior is set to Store all, all data collected for each error report is stored in the appropriate location. If Archive behavior is set to Store parameters only, only the minimum information required to check for an existing solution is stored. The Maximum number of reports to store setting determines how many reports are stored before older reports are automatically deleted. If you disable or do not configure this policy setting, no Windows Error Reporting information is stored.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting"
  ],
  "ValueName": "DisableArchive",
  "Elements": [
    { "Type": "Enum", "ValueName": "ConfigureArchive", "Items": [
        { "DisplayName": "Store all", "Data": "2" },
        { "DisplayName": "Store parameters only", "Data": "1" }
      ]
    },
    { "Type": "Decimal", "ValueName": "MaxArchiveCount", "MinValue": null, "MaxValue": "5000" },
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```

# Troubleshooter Preference

It's set to `Ask me before running` by default.

| Option | Description |
| ---- | ---- |
| Run automatically, don't notify me | Windows will automatically run recommended troubleshooters for problems detected on your device without bothering you. |
| Run automatically, then notify me | Windows will tell you after recommended troubleshooters have solved a problem so you know what happened. |
| Ask me before running (default) | We'll let you know when recommended troubleshooting is available. You can review the problem and changes before running the troubleshooters. |
| Don't run any | Windows will automatically run critical troubleshooters but won't recommend troubleshooting for other problems. You will not get notifications for known problems, and you will need to manually troubleshoot these problems on your device. |

| Service | Description |
| ---- | ---- |
| `DPS` | The Diagnostic Policy Service enables problem detection, troubleshooting and resolution for Windows components. If this service is stopped, diagnostics will no longer function. |
| `TroubleshootingSvc` | Enables automatic mitigation for known problems by applying recommended troubleshooting. If stopped, your device will not get recommended troubleshooting for problems on your device. |
| `diagsvc` | Executes diagnostic actions for troubleshooting support |

These get disabled in the `Don't run any` option.

`System > Troubleshoot` - `Recommended troubleshooter preferences`:
```c
// Don't run any
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 1

// Ask me before running (default)
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 2

// Run automatically, then notify me
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 3

// Run automatically, don't notify me
HKLM\SOFTWARE\Microsoft\WindowsMitigation\UserPreference	Type: REG_DWORD, Length: 4, Data: 4
```

> https://support.microsoft.com/en-us/topic/keep-your-device-running-smoothly-with-recommended-troubleshooting-ec76fe10-4ac8-ce9d-49c6-757770fe68f1

```json
{
  "File": "MSDT.admx",
  "CategoryName": "WdiScenarioCategory",
  "PolicyName": "TroubleshootingAllowRecommendations",
  "NameSpace": "Microsoft.Policies.MSDT",
  "Supported": "Windows_10_0_RS6 - At least Windows Server 2016, Windows 10 Version 1903",
  "DisplayName": "Troubleshooting: Allow users to access recommended troubleshooting for known problems",
  "ExplainText": "This policy setting configures how troubleshooting for known problems can be applied on the device and lets administrators configure how it's applied to their domains/IT environments. Not configuring this policy setting will allow the user to configure how troubleshooting is applied. Enabling this policy allows you to configure how troubleshooting is applied on the user's device. You can select from one of the following values: 0 = Do not allow users, system features, or Microsoft to apply troubleshooting. 1 = Only automatically apply troubleshooting for critical problems by system features and Microsoft. 2 = Automatically apply troubleshooting for critical problems by system features and Microsoft. Notify users when troubleshooting for other problems is available and allow users to choose to apply or ignore. 3 = Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Notify users when troubleshooting has solved a problem. 4 = Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Do not notify users when troubleshooting has solved a problem. 5 = Allow the user to choose their own troubleshooting settings. After setting this policy, you can use the following instructions to check devices in your domain for available troubleshooting from Microsoft: 1. Create a bat script with the following contents: rem The following batch script triggers Recommended Troubleshooting schtasks /run /TN \"\\Microsoft\\Windows\\Diagnosis\\RecommendedTroubleshootingScanner\" 2. To create a new immediate task, navigate to the Group Policy Management Editor > Computer Configuration > Preferences and select Control Panel Settings. 3. Under Control Panel settings, right-click on Scheduled Tasks and select New. Select Immediate Task (At least Windows 7). 4. Provide name and description as appropriate, then under Security Options set the user account to System and select the Run with highest privileges checkbox. 5. In the Actions tab, create a new action, select Start a Program as its type, then enter the file created in step 1. 6. Configure the task to deploy to your domain.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Troubleshooting\\AllowRecommendations"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "TroubleshootingAllowRecommendations", "Items": [
        { "DisplayName": "Do not allow users, system features, or Microsoft to apply troubleshooting.", "Data": "0" },
        { "DisplayName": "Only automatically apply troubleshooting for critical problems by system features and Microsoft.", "Data": "1" },
        { "DisplayName": "Automatically apply troubleshooting for critical problems by system features and Microsoft. Notify users when troubleshooting for other problems is available and allow users to choose to apply or ignore.", "Data": "2" },
        { "DisplayName": "Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Notify users when troubleshooting has solved a problem.", "Data": "3" },
        { "DisplayName": "Automatically apply troubleshooting for critical and other problems by system features and Microsoft. Do not notify users when troubleshooting has solved a problem.", "Data": "4" },
        { "DisplayName": "Allow the user to choose their own troubleshooting settings.", "Data": "5" }
      ]
    }
  ]
},
```

---

Miscellaneous notes:
```json
{
  "File": "sdiageng.admx",
  "CategoryName": "ScriptedDiagnosticsCategory",
  "PolicyName": "ScriptedDiagnosticsExecutionPolicy",
  "NameSpace": "Microsoft.Policies.ScriptedDiagnostics",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Troubleshooting: Allow users to access and run Troubleshooting Wizards",
  "ExplainText": "This policy setting allows users to access and run the troubleshooting tools that are available in the Troubleshooting Control Panel and to run the troubleshooting wizard to troubleshoot problems on their computers. If you enable or do not configure this policy setting, users can access and run the troubleshooting tools from the Troubleshooting Control Panel. If you disable this policy setting, users cannot access or run the troubleshooting tools from the Control Panel. Note that this setting also controls a user's ability to launch standalone troubleshooting packs such as those found in .diagcab files.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScriptedDiagnostics"
  ],
  "ValueName": "EnableDiagnostics",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "sdiageng.admx",
  "CategoryName": "ScriptedDiagnosticsCategory",
  "PolicyName": "BetterWhenConnected",
  "NameSpace": "Microsoft.Policies.ScriptedDiagnostics",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Troubleshooting: Allow users to access online troubleshooting content on Microsoft servers from the Troubleshooting Control Panel (via the Windows Online Troubleshooting Service - WOTS)",
  "ExplainText": "This policy setting allows users who are connected to the Internet to access and search troubleshooting content that is hosted on Microsoft content servers. Users can access online troubleshooting content from within the Troubleshooting Control Panel UI by clicking \"Yes\" when they are prompted by a message that states, \"Do you want the most up-to-date troubleshooting content?\" If you enable or do not configure this policy setting, users who are connected to the Internet can access and search troubleshooting content that is hosted on Microsoft content servers from within the Troubleshooting Control Panel user interface. If you disable this policy setting, users can only access and search troubleshooting content that is available locally on their computers, even if they are connected to the Internet. They are prevented from connecting to the Microsoft servers that host the Windows Online Troubleshooting Service.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\ScriptedDiagnosticsProvider\\Policy"
  ],
  "ValueName": "EnableQueryRemoteServer",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Crash Dumps

Disables the crash dump, logging. Not all values may be read on your system.

```c
CrashDumpEnabled REG_DWORD 0x0 = None
CrashDumpEnabled REG_DWORD 0x1 = Complete memory dump
CrashDumpEnabled REG_DWORD 0x2 = Kernel memory dump
CrashDumpEnabled REG_DWORD 0x3 = Small memory dump (64 KB)
CrashDumpEnabled REG_DWORD 0x7 = Automatic memory dump
CrashDumpEnabled REG_DWORD 0x1 and FilterPages REG_DWORD 0x1 = Active memory dump
```

There're two values named `CrashDumpEnabled.New` & `CrashDumpEnabled.Old`, I haven't looked into them yet, see this as note for future reference.
```
\Registry\Machine\SYSTEM\ControlSet001\Control\CrashControl : CrashDumpEnabled.New
\Registry\Machine\SYSTEM\ControlSet001\Control\CrashControl : CrashDumpEnabled.Old
```

> https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/memory-dump-file-options#registry-values-for-startup-and-recovery  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/automatic-memory-dump  
> https://github.com/nohuto/win-registry/blob/main/records/CrashControl.txt  
> [privacy/assets | crashdmp.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crashdmp.c)  
> [privacy/assets | crashdmp-SecureDump_PrepareForInit.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/crashdmp-SecureDump_PrepareForInit.c)

# Disable Sleep Study

Sleep Study tracks modern sleep states to analyze energy usage and pinpoint battery drain. It disables Sleep Study by making ETL logs read-only, disabling related diagnostics, and turning off the scheduled task.

```powershell
wevtutil sl Microsoft-Windows-SleepStudy/Diagnostic /e:false
svchost.exe	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-SleepStudy/Diagnostic\Enabled	Type: REG_DWORD, Length: 4, Data: 0

wevtutil sl Microsoft-Windows-Kernel-Processor-Power/Diagnostic /e:false
svchost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-Kernel-Processor-Power/Diagnostic\Enabled	Type: REG_DWORD, Length: 4, Data: 0

wevtutil sl Microsoft-Windows-UserModePowerService/Diagnostic /e:false
svchost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-UserModePowerService/Diagnostic\Enabled	Type: REG_DWORD, Length: 4, Data: 0
```

> [privacy/assets | sleepstudy-FxLibraryGlobalsQueryRegistrySettings.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/sleepstudy-FxLibraryGlobalsQueryRegistrySettings.c)  
> [privacy/assets | sleepstudy-PoFxInitPowerManagement.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/sleepstudy-PoFxInitPowerManagement.c)

---

Miscellaenous notes:
```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "SleepstudyAccountingEnabled" = 1; // SleepstudyHelperAccountingEnabled 
    "SleepstudyGlobalBlockerLimit" = 3000; // SleepstudyHelperBlockerGlobalLimit (0x0BB8) 
    "SleepstudyLibraryBlockerLimit" = 200; // SleepstudyHelperBlockerLibraryLimit (0xC8) 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power";
    "SleepStudyDeviceAccountingLevel" = 4; // PopSleepStudyDeviceAccountingLevel 
    "SleepStudyDisabled" = 0; // PopSleepStudyDisabled 
```
> [/docs/win-registry/sections/registry-values-research/power-values/](/docs/win-registry/sections/registry-values-research/power-values/)
```
\Registry\Machine\SYSTEM\ControlSet001\Enum\ACPI\AMDI0010\3\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ACPI\AMDI0030\0\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ACPI\AMDIF030\0\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\Display\MSI3CB0\5&34f902e3&1&UID28931\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_1022&DEV_149C&SUBSYS_87C01043&REV_00\4&231a312e&0&0341\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_1022&DEV_43EE&SUBSYS_11421B21&REV_00\4&20e120c7&0&000A\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_1022&DEV_790E&SUBSYS_87C01043&REV_51\3&11583659&0&A3\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_10DE&DEV_228B&SUBSYS_50521462&REV_A1\4&1d81e16&0&0119\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_8086&DEV_15F3&SUBSYS_87D21043&REV_02\6&102e3adf&0&0048020A\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\CompositeBus\0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\NdisVirtualBus\0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\SYSTEM\0002\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\UMBUS\0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\vdrvroot\0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\ROOT\VID\0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\ROOT_HUB30\5&2bce96aa&0&0\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\ROOT_HUB30\5&2c35141&0&0\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot00\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot01\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot02\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot03\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot04\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot05\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_046D&PID_C547&LAMPARRAY\7&1fc2034b&0&3_Slot06\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_05E3&PID_0610\6&3365fbaf&0&11\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_0B05&PID_1939&MI_00\7&40fe908&0&0000\Device Parameters\Wdf : SleepstudyState
\Registry\Machine\SYSTEM\ControlSet001\Enum\USB\VID_0CF2&PID_A102&MI_00\8&7b0cf2a&0&0000\Device Parameters\Wdf : SleepstudyState
```
```
\Registry\Machine\SYSTEM\ControlSet001\Services\NDIS\Parameters : EnableNicAutoPowerSaverInSleepStudy
\Registry\Machine\SYSTEM\ControlSet001\Services\NDIS\SharedState : EnableNicAutoPowerSaverInSleepStudy
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager\Power : SleepStudyBufferSizeInMB
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager\Power : SleepStudyTraceDirectory
```

> https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wevtutil

# Disable RSoP Logging

"This setting allows you to enable or disable Resultant Set of Policy (RSoP) logging on a client computer.RSoP logs information on Group Policy settings that have been applied to the client. This information includes details such as which Group Policy Objects (GPO) were applied where they came from and the client-side extension settings that were included.If you enable this setting RSoP logging is turned off.If you disable or do not configure this setting RSoP logging is turned on. By default RSoP logging is always on.Note: To view the RSoP information logged on a client computer you can use the RSoP snap-in in the Microsoft Management Console (MMC)."

> https://www.windows-security.org/370c915e44b6a75efac0d24669aa9434/turn-off-resultant-set-of-policy-logging

```
\Registry\Machine\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon : RsopLogging
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\SYSTEM : RsopLogging
```

> https://learn.microsoft.com/en-us/previous-versions/windows/desktop/Policy/developing-an-rsop-management-tool  

# Disable Desktop Heap Logging

"It is meant to log information about desktop heap usage. This can be helpful when diagnosing issues where system resources for desktop objects might be strained." 

```c
__int64 IsDesktopHeapLoggingOn(void)
{
  int v1 = 0; // default state
  int v4 = *(_DWORD *)(W32GetUserSessionState() + 62792);

  if ( v4 )
    v1 = 0; // fallback to the default when registry access fails
  return v1 != 0;
}
```

`DesktopHeapLogging` seems to have a fallback of `0`, but the value exists by default and is set to `1`. Means deleting it/setting it to `0` should do the same.

> [privacy/assets | rsop-IsDesktopHeapLoggingOn.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/rsop-IsDesktopHeapLoggingOn.c)  
> https://answers.microsoft.com/en-us/windows/forum/all/question-about-some-dwm-registry-settings/341cac5c-d85a-43e5-89d3-d9734f84da4e  
> https://github.com/nohuto/win-registry/blob/main/records/Winows-NT.txt

# Disable Message Sync

"This policy setting allows backup and restore of cellular text messages to Microsoft's cloud services. Disable this feature to avoid information being stored on servers outside of your organization's control."

| Policy | Description | Values |
| ------ | ------ | ------ |
| AllowMessageSync | Controls whether SMS/MMS are synced to Microsoft's cloud so they can be backed up and restored; also decides if the user can toggle this in the UI. | 0 = sync not allowed, user cannot change - 1 = sync allowed, user can change (default) |

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-messaging

```json
{
  "File": "messaging.admx",
  "CategoryName": "Messaging_Category",
  "PolicyName": "AllowMessageSync",
  "NameSpace": "Microsoft.Policies.Messaging",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Allow Message Service Cloud Sync",
  "ExplainText": "This policy setting allows backup and restore of cellular text messages to Microsoft's cloud services.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Messaging"
  ],
  "ValueName": "AllowMessageSync",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable CSC

Disable Offline Files (CSC) via policy and services. Sets NetCache policy keys, disables `CSC`/`CscService`, disables the two `Offline Files` scheduled tasks (they're disabled by default), and renames `mobsync.exe` to block execution.

"Offline Files (Client-Side Caching, CSC) lets Windows cache files from network shares locally so users can keep working when the network/server is unavailable. Sync Center handles the background sync between the local CSC cache (`%WINDIR%\CSC`) and the share. It's commonly paired with Folder Redirection so "known folders" (e.g., Documents) live on a server but remain available offline, with options like "Always Offline" for performance on slow links. You enable/disable it via Sync Center (Control Panel) or policy. When disabled, Sync Center has nothing to sync."

> https://learn.microsoft.com/en-us/windows-server/storage/folder-redirection/deploy-folder-redirection


```json
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_Enabled",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "Win2k",
  "DisplayName": "Allow or Disallow use of the Offline Files feature",
  "ExplainText": "This policy setting determines whether the Offline Files feature is enabled. Offline Files saves a copy of network files on the user's computer for use when the computer is not connected to the network. If you enable this policy setting, Offline Files is enabled and users cannot disable it. If you disable this policy setting, Offline Files is disabled and users cannot enable it. If you do not configure this policy setting, Offline Files is enabled on Windows client computers, and disabled on computers running Windows Server, unless changed by the user. Note: Changes to this policy setting do not take effect until the affected computer is restarted.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "Enabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_BackgroundSyncSettings",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "Windows7",
  "DisplayName": "Configure Background Sync",
  "ExplainText": "This policy setting controls when background synchronization occurs while operating in slow-link mode, and applies to any user who logs onto the specified machine while this policy is in effect. To control slow-link mode, use the \"Configure slow-link mode\" policy setting. If you enable this policy setting, you can control when Windows synchronizes in the background while operating in slow-link mode. Use the 'Sync Interval' and 'Sync Variance' values to override the default sync interval and variance settings. Use 'Blockout Start Time' and 'Blockout Duration' to set a period of time where background sync is disabled. Use the 'Maximum Allowed Time Without A Sync' value to ensure that all network folders on the machine are synchronized with the server on a regular basis. You can also configure Background Sync for network shares that are in user selected Work Offline mode. This mode is in effect when a user selects the Work Offline button for a specific share. When selected, all configured settings will apply to shares in user selected Work Offline mode as well. If you disable or do not configure this policy setting, Windows performs a background sync of offline folders in the slow-link mode at a default interval with the start of the sync varying between 0 and 60 additional minutes. In Windows 7 and Windows Server 2008 R2, the default sync interval is 360 minutes. In Windows 8 and Windows Server 2012, the default sync interval is 120 minutes.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "BackgroundSyncEnabled",
  "Elements": [
    { "Type": "Decimal", "ValueName": "BackgroundSyncPeriodMin", "MinValue": "1", "MaxValue": "1440" },
    { "Type": "Decimal", "ValueName": "BackgroundSyncMaxStartMin", "MinValue": "0", "MaxValue": "3600" },
    { "Type": "Decimal", "ValueName": "BackgroundSyncIgnoreBlockOutAfterMin", "MinValue": "0", "MaxValue": "4294967295" },
    { "Type": "Decimal", "ValueName": "BackgroundSyncBlockOutStartTime", "MinValue": "0", "MaxValue": "2400" },
    { "Type": "Decimal", "ValueName": "BackgroundSyncBlockOutDurationMin", "MinValue": "0", "MaxValue": "1440" },
    { "Type": "Boolean", "ValueName": "BackgroundSyncEnabledForForcedOffline", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_NoReminders_2",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "WindowsPreVista",
  "DisplayName": "Turn off reminder balloons",
  "ExplainText": "Hides or displays reminder balloons, and prevents users from changing the setting. Reminder balloons appear above the Offline Files icon in the notification area to notify users when they have lost the connection to a networked file and are working on a local copy of the file. Users can then decide how to proceed. If you enable this setting, the system hides the reminder balloons, and prevents users from displaying them. If you disable the setting, the system displays the reminder balloons and prevents users from hiding them. If this setting is not configured, reminder balloons are displayed by default when you enable offline files, but users can change the setting. To prevent users from changing the setting while a setting is in effect, the system disables the \"Enable reminders\" option on the Offline Files tab This setting appears in the Computer Configuration and User Configuration folders. If both settings are configured, the setting in Computer Configuration takes precedence over the setting in User Configuration. Tip: To display or hide reminder balloons without establishing a setting, in Windows Explorer, on the Tools menu, click Folder Options, and then click the Offline Files tab. This setting corresponds to the \"Enable reminders\" check box.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "NoReminders",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_SyncAtLogoff_2",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "WindowsPreVista",
  "DisplayName": "Synchronize all offline files before logging off",
  "ExplainText": "Determines whether offline files are fully synchronized when users log off. This setting also disables the \"Synchronize all offline files before logging off\" option on the Offline Files tab. This prevents users from trying to change the option while a setting controls it. If you enable this setting, offline files are fully synchronized. Full synchronization ensures that offline files are complete and current. If you disable this setting, the system only performs a quick synchronization. Quick synchronization ensures that files are complete, but does not ensure that they are current. If you do not configure this setting, the system performs a quick synchronization by default, but users can change this option. This setting appears in the Computer Configuration and User Configuration folders. If both settings are configured, the setting in Computer Configuration takes precedence over the setting in User Configuration. Tip: To change the synchronization method without changing a setting, in Windows Explorer, on the Tools menu, click Folder Options, click the Offline Files tab, and then select the \"Synchronize all offline files before logging off\" option.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "SyncAtLogoff",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_SyncAtLogon_2",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "WindowsPreVista",
  "DisplayName": "Synchronize all offline files when logging on",
  "ExplainText": "Determines whether offline files are fully synchronized when users log on. This setting also disables the \"Synchronize all offline files before logging on\" option on the Offline Files tab. This prevents users from trying to change the option while a setting controls it. If you enable this setting, offline files are fully synchronized at logon. Full synchronization ensures that offline files are complete and current. Enabling this setting automatically enables logon synchronization in Synchronization Manager. If this setting is disabled and Synchronization Manager is configured for logon synchronization, the system performs only a quick synchronization. Quick synchronization ensures that files are complete but does not ensure that they are current. If you do not configure this setting and Synchronization Manager is configured for logon synchronization, the system performs a quick synchronization by default, but users can change this option. This setting appears in the Computer Configuration and User Configuration folders. If both settings are configured, the setting in Computer Configuration takes precedence over the setting in User Configuration. Tip: To change the synchronization method without setting a setting, in Windows Explorer, on the Tools menu, click Folder Options, click the Offline Files tab, and then select the \"Synchronize all offline files before logging on\" option.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "SyncAtLogon",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OfflineFiles.admx",
  "CategoryName": "Cat_OfflineFiles",
  "PolicyName": "Pol_WorkOfflineDisabled_2",
  "NameSpace": "Microsoft.Policies.OfflineFiles",
  "Supported": "Windows8",
  "DisplayName": "Remove \"Work offline\" command",
  "ExplainText": "This policy setting removes the \"Work offline\" command from Explorer, preventing users from manually changing whether Offline Files is in online mode or offline mode. If you enable this policy setting, the \"Work offline\" command is not displayed in File Explorer. If you disable or do not configure this policy setting, the \"Work offline\" command is displayed in File Explorer.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetCache"
  ],
  "ValueName": "WorkOfflineDisabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Cloud Content Search

"Cloud Content Search lets Windows Search include results from your signed-in cloud accounts personal Microsoft account (OneDrive, Outlook, Bing) and/or work/school (OneDrive for Business, SharePoint, Outlook) alongside local files. Turn it on per account to get those items and Bing-personalized suggestions, turn it off to keep search limited to local content (and non-personalized web)."

![](https://github.com/nohuto/win-config/blob/main/privacy/images/cloudsearch.png?raw=true)

# Microsoft Accounts

"This setting prevents using the Settings app to add a Microsoft account for single sign-on (SSO) authentication for Microsoft services and some background services, or using a Microsoft account for single sign-on to other applications or services.

There are two options if this setting is enabled:

- Users can't add Microsoft accounts means that existing connected accounts can still sign in to the device (and appear on the Sign in screen). However, users cannot use the Settings app to add new connected accounts (or connect local accounts to Microsoft accounts).

- Users can't add or log on with Microsoft accounts means that users cannot add new connected accounts (or connect local accounts to Microsoft accounts) or use existing connected accounts through Settings.

This setting does not affect adding a Microsoft account for application authentication. For example, if this setting is enabled, a user can still provide a Microsoft account for authentication with an application such as Mail, but the user cannot use the Microsoft account for single sign-on authentication for other applications or services (in other words, the user will be prompted to authenticate for other applications or services).

By default, this setting is Not defined."

```c
// This policy is disabled
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\NoConnectedUser	Type: REG_DWORD, Length: 4, Data: 0

// Users can't add Microsoft accounts
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\NoConnectedUser	Type: REG_DWORD, Length: 4, Data: 1

// Users can't add or log on with Microsoft accounts
services.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\NoConnectedUser	Type: REG_DWORD, Length: 4, Data: 3
```

# Opt-Out KMS Activation Telemetry

Friendly name: `Turn off KMS Client Online AVS Validation`

"This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state.

If you disable or don't configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates."

> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-licensing#disallowkmsclientonlineavsvalidation

`Disable Auto Activation` (MAK and KMS host but not KMS client) prevents windows from whether it's actived or not.

> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn502532(v=ws.11)

```json
{
  "File": "AVSValidationGP.admx",
  "CategoryName": "SoftwareProtectionPlatform",
  "PolicyName": "NoAcquireGT",
  "NameSpace": "Microsoft.Policies.SoftwareProtectionPlatform",
  "Supported": "Windows_10_0",
  "DisplayName": "Turn off KMS Client Online AVS Validation",
  "ExplainText": "This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state. If you disable or do not configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates. Policy Options: - Not Configured (default -- data will be automatically sent to Microsoft) - Disabled (data will be automatically sent to Microsoft) - Enabled (data will not be sent to Microsoft)",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\CurrentVersion\\Software Protection Platform"
  ],
  "ValueName": "NoGenTicket",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

For Windows Server 2016 it can be disabled via:
```json
"HKLM\\Software\\Policies\\Microsoft\\Windows NT\\CurrentVersion\\Software Protection Platform": {
  "NoAcquireGT": { "Type": "REG_DWORD", "Data": 1 }
}
```

"Due to a known issue the Turn off KMS Client Online AVS Validation group policy does not work as intended on Windows Server 2016; the NoAcquireGT value needs to be set instead. The Windows activation status will be valid for a rolling period of 180 days with weekly activation status checks to the KMS."

> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#19-software-protection-platform

# Disable Font Providers

"This policy setting determines whether Windows is allowed to download fonts and font catalog data from an online font provider.

If you enable this policy setting, Windows periodically queries an online font provider to determine whether a new font catalog is available. Windows may also download font data if needed to format or render text.

If you disable this policy setting, Windows does not connect to an online font provider and only enumerates locally-installed fonts."

```json
{
  "File": "GroupPolicy.admx",
  "CategoryName": "NetworkFonts",
  "PolicyName": "EnableFontProviders",
  "NameSpace": "Microsoft.Policies.GroupPolicy",
  "Supported": "Windows_10_0",
  "DisplayName": "Enable Font Providers",
  "ExplainText": "This policy setting determines whether Windows is allowed to download fonts and font catalog data from an online font provider. If you enable this policy setting, Windows periodically queries an online font provider to determine whether a new font catalog is available. Windows may also download font data if needed to format or render text. If you disable this policy setting, Windows does not connect to an online font provider and only enumerates locally-installed fonts. If you do not configure this policy setting, the default behavior depends on the Windows edition. Changes to this policy take effect on reboot.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "EnableFontProviders",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable Local Security Questions

Prevent the use of security questions for local accounts.

```json
{
  "File": "CredUI.admx",
  "CategoryName": "CredUI",
  "PolicyName": "NoLocalPasswordResetQuestions",
  "NameSpace": "Microsoft.Policies.CredentialsUI",
  "Supported": "Windows_10_0_RS6",
  "DisplayName": "Prevent the use of security questions for local accounts",
  "ExplainText": "If you turn this policy setting on, local users won\u2019t be able to set up and use security questions to reset their passwords.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "NoLocalPasswordResetQuestions",
  "Elements": []
},
```

# Disable Application Compatibility

Disables Windows Application Experience telemetry and compatibility components, Microsoft Compatibility Appraiser (including its daily task and `CompatTelRunner.exe`) and the Application Experience tasks. It reduces telemetry, and some attack surface, but removes most automatic compatibility checks, upgrade assessments and some app related backup/recovery features.

`DisableAPISamping`, `DisableApplicationFootprint`, `DisableInstallTracing`, `DisableWin32AppBackup` will only work on 24H2 and above.

Currently includes all existing tasks in `\\Microsoft\\Windows\\Application Experience\\` (LTSC IoT Enterprise 2024):
```c
"\\Microsoft\\Windows\\Application Experience\\MareBackup",
"\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser",
"\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser Exp",
"\\Microsoft\\Windows\\Application Experience\\PcaPatchDbTask",
"\\Microsoft\\Windows\\Application Experience\\SdbinstMergeDbTask",
"\\Microsoft\\Windows\\Application Experience\\StartupAppTask"

//"\\Microsoft\\Windows\\Application Experience\\AitAgent",
//"\\Microsoft\\Windows\\Application Experience\\PcaWallpaperAppDetect",
```
```json
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffAPISamping",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off API Sampling",
  "ExplainText": "This policy controls the state of API Sampling. API Sampling monitors the sampled collection of application programming interfaces used during system runtime to help diagnose compatibility problems. If you enable this policy, API Sampling will not be run. If you disable or do not configure this policy, API Sampling will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableAPISamping",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffApplicationFootprint",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off Application Footprint",
  "ExplainText": "This policy controls the state of Application Footprint. Application Footprint monitors the sampled collection of registry and file usage to help diagnose compatibility problems. If you enable this policy, Application Footprint will not be run. If you disable or do not configure this policy, Application Footprint will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableApplicationFootprint",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffEngine",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "WindowsNET - At least Windows Server 2003",
  "DisplayName": "Turn off Application Compatibility Engine",
  "ExplainText": "This policy controls the state of the application compatibility engine in the system. The engine is part of the loader and looks through a compatibility database every time an application is started on the system. If a match for the application is found it provides either run-time solutions or compatibility fixes, or displays an Application Help message if the application has a know problem. Turning off the application compatibility engine will boost system performance. However, this will degrade the compatibility of many popular legacy applications, and will not block known incompatible applications from installing. (For Instance: This may result in a blue screen if an old anti-virus application is installed.) The Windows Resource Protection and User Account Control features of Windows use the application compatibility engine to provide mitigations for application problems. If the engine is turned off, these mitigations will not be applied to applications and their installers and these applications may fail to install or run properly. This option is useful to server administrators who require faster performance and are aware of the compatibility of the applications they are using. It is particularly useful for a web server where applications may be launched several hundred times a second, and the performance of the loader is essential. NOTE: Many system processes cache the value of this setting for performance reasons. If you make changes to this setting, please reboot to ensure that your system accurately reflects those changes.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableEngine",
  "Elements": []
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffInstallTracing",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off Install Tracing",
  "ExplainText": "This policy controls the state of Install Tracing. Install Tracing is a mechanism that tracks application installs to help diagnose compatibility problems. If you enable this policy, Install Tracing will not be run. If you disable or do not configure this policy, Install Tracing will be turned on.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableInstallTracing",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffProgramCompatibilityAssistant_1",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Turn off Program Compatibility Assistant",
  "ExplainText": "This setting exists only for backward compatibility, and is not valid for this version of Windows. To configure the Program Compatibility Assistant, use the 'Turn off Program Compatibility Assistant' setting under Computer Configuration\\Administrative Templates\\Windows Components\\Application Compatibility.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisablePCA",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "pca.admx",
  "CategoryName": "PcaScenarioCategory",
  "PolicyName": "DisablePcaUIPolicy",
  "NameSpace": "Microsoft.Policies.ApplicationDiagnostics",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Detect compatibility issues for applications and drivers",
  "ExplainText": "This policy setting configures the Program Compatibility Assistant (PCA) to diagnose failures with application and driver compatibility. If you enable this policy setting, the PCA is configured to detect failures during application installation, failures during application runtime, and drivers blocked due to compatibility issues. When failures are detected, the PCA will provide options to run the application in a compatibility mode or get help online through a Microsoft website. If you disable this policy setting, the PCA does not detect compatibility issues for applications and drivers. If you do not configure this policy setting, the PCA is configured to detect failures during application installation, failures during application runtime, and drivers blocked due to compatibility issues. Note: This policy setting has no effect if the \"Turn off Program Compatibility Assistant\" policy setting is enabled. The Diagnostic Policy Service (DPS) and Program Compatibility Assistant Service must be running for the PCA to run. These services can be configured by using the Services snap-in to the Microsoft Management Console.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisablePcaUI",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppDeviceInventory.admx",
  "CategoryName": "AppDeviceInventory",
  "PolicyName": "TurnOffWin32AppBackup",
  "NameSpace": "Microsoft.Policies.AppDeviceInventory",
  "Supported": "Windows_11_0_24H2 - At least Windows 11 Version 24H2",
  "DisplayName": "Turn off compatibility scan for backed up applications",
  "ExplainText": "This policy controls the state of the compatibility scan for backed up applications. The compatibility scan for backed up applications evaluates for compatibility problems in installed applications. If you enable this policy, the compatibility scan for backed up applications will not be run. If you disable or do not configure this policy, the compatibility scan for backed up applications will be run.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "DisableWin32AppBackup",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "AppCompat.admx",
  "CategoryName": "AppCompat",
  "PolicyName": "AppCompatTurnOffSwitchBack",
  "NameSpace": "Microsoft.Policies.ApplicationCompatibility",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Turn off SwitchBack Compatibility Engine",
  "ExplainText": "The policy controls the state of the Switchback compatibility engine in the system. Switchback is a mechanism that provides generic compatibility mitigations to older applications by providing older behavior to old applications and new behavior to new applications. Switchback is on by default. If you enable this policy setting, Switchback will be turned off. Turning Switchback off may degrade the compatibility of older applications. This option is useful for server administrators who require performance and are aware of compatibility of the applications they are using. If you disable or do not configure this policy setting, the Switchback will be turned on. Please reboot the system after changing the setting to ensure that your system accurately reflects those changes.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppCompat"
  ],
  "ValueName": "SbEnable",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```

# Disable Census Data Collection

`DeviceCensus.exe` = "Device and configuration data collection tool"

"In a nutshell, Device Census is a telemetry process from Microsoft. It will analyze the use of the webcam and other components. Then, the data will be transmitted anonymously to Microsoft to help optimize Windows for future versions and fix bugs. In addition, it only checks how often the devices are used and don't record anything."

> https://www.partitionwizard.com/partitionmanager/devicecensus-exe.html

`\Microsoft\Windows\Device Information` runs:
```powershell
%windir%\system32\devicecensus.exe SystemCxt
```

`\Microsoft\Windows\Device Information` runs:
```powershell
%windir%\system32\devicecensus.exe UserCxt
```

# Disable OneSettings Download

Services Configuration is used by Windows components and apps, such as the telemetry service, to dynamically update their configuration. If you turn off this service, apps using this service may stop working.

If enabled = "Windows will periodically attempt to connect with the OneSettings service to download configuration settings".

> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#31-services-configuration

```json
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "EnableOneSettingsAuditing",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Enable OneSettings Auditing",
  "ExplainText": "This policy setting controls whether Windows records attempts to connect with the OneSettings service to the EventLog. If you enable this policy, Windows will record attempts to connect with the OneSettings service to the Microsoft\\Windows\\Privacy-Auditing\\Operational EventLog channel. If you disable or don't configure this policy setting, Windows will not record attempts to connect with the OneSettings service to the EventLog.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "EnableOneSettingsAuditing",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DataCollection.admx",
  "CategoryName": "DataCollectionAndPreviewBuilds",
  "PolicyName": "DisableOneSettingsDownloads",
  "NameSpace": "Microsoft.Policies.DataCollection",
  "Supported": "Windows_10_0_RS7 - At least Windows Server 2016, Windows 10 Version 1909",
  "DisplayName": "Disable OneSettings Downloads",
  "ExplainText": "This policy setting controls whether Windows attempts to connect with the OneSettings service. If you enable this policy, Windows will not attempt to connect with the OneSettings Service. If you disable or don't configure this policy setting, Windows will periodically attempt to connect with the OneSettings service to download configuration settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection"
  ],
  "ValueName": "DisableOneSettingsDownloads",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```

# Disable F1 Help Key

Works via renaming `HelpPane.exe` (Help and Support Windows desktop application) which was the help component in `W8`/`W8.1`. The executeable still exists but calls to it will either start the `Get Started` application (if user is offline), or opens a browser instance and redirects the browser to an online topic. Note that `HelpPane` still handles the `F1` shortcut.

If the option is disabled, pressing `F1` on your desktop will take you to a search query like:
```
https://www.bing.com/search?q=how+to+get+help+in+windows+11
```

# Disable Defender Core Service Telemetry

`Get-Help Set-MpPreference -Full` exposes the command:
```powershell
-DisableCoreServiceTelemetry <bool>
    Required?                    false
    Position?                    Named
    Accept pipeline input?       false
    Parameter set name           Set0
    Aliases                      dcst
    Dynamic?                     false
```

Using the command sets:
```c
// Set-MpPreference -DisableCoreServiceTelemetry $true
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 1

// Set-MpPreference -DisableCoreServiceTelemetry $false
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreService1DSTelemetry	Type: REG_DWORD, Length: 4, Data: 0
```

This flag blocks the Defender Core service from the One Data Service (1DS) telemetry pipeline that the MDEP telemetry framework uses for text-based health events, so the new `MdCoreSvc` no longer reports status back to Microsofts Cosmos/Kusto backend.

> https://learn.microsoft.com/en-us/mdep/architecture/core-os/telemetry/  
> https://github.com/MicrosoftDocs/defender-docs/blob/18b1904eda7048bff8111b10b12852d692047d6f/defender-endpoint/microsoft-defender-core-service-overview.md

---

```powershell
-DisableCoreServiceECSIntegration <bool>
    Required?                    false
    Position?                    Named
    Accept pipeline input?       false
    Parameter set name           Set0
    Aliases                      dcsei
    Dynamic?                     false
```

```c
// Set-MpPreference -DisableCoreServiceECSIntegration $true
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 1
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 1

// Set-MpPreference -DisableCoreServiceECSIntegration $false
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\Features\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 0
MsMpEng.exe	HKLM\SOFTWARE\Microsoft\Windows Defender\CoreService\DisableCoreServiceECSIntegration	Type: REG_DWORD, Length: 4, Data: 0
```

ECS stands for Experimentation and Configuration Service, so changing this on stops the Defender Core service from taking part in remote flights or config updates that come from that service.

# Disable Find My Device

"Find My Device is a feature that can help you locate your Windows 10 or Windows 11 device if it's lost or stolen. To use this feature, sign in to your device with a Microsoft account and make sure you're an administrator on it. This feature works when location is turned on for your device, even if other users on the device have turned off location settings for their apps. Any time you attempt to locate the device, users using the device will see a notification in the notification area. 

- This setting works for any Windows device, such as a PC, laptop, Surface, or Surface Pen. It needs to be turned on before you can use it. 

- You can't use it with a work or school account, and it doesn't work for iOS devices, Android devices, or Xbox One consoles."

```json
{
  "File": "FindMy.admx",
  "CategoryName": "FindMyDeviceCat",
  "PolicyName": "FindMy_AllowFindMyDeviceConfig",
  "NameSpace": "Microsoft.Policies.FindMyDevice",
  "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
  "DisplayName": "Turn On/Off Find My Device",
  "ExplainText": "This policy turns on Find My Device. When Find My Device is on, the device and its location are registered in the cloud so that the device can be located when the user initiates a Find command from account.microsoft.com. On devices that are compatible with active digitizers, enabling Find My Device will also allow the user to view the last location of use of their active digitizer on their device; this location is stored locally on the user's device after each use of their active digitizer. When Find My Device is off, the device and its location are not registered and the Find My Device feature will not work.The user will also not be able to view the location of the last use of their active digitizer on their device.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\FindMyDevice"
  ],
  "ValueName": "AllowFindMyDevice",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
