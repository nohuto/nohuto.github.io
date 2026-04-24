---
title: 'Spotlight'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 28
---

Spotlight is used to provide new pictures on your lock screen.

These exist by default on 25H2:
```json
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\DesktopSpotlight\\Settings": {
  "IsDisabledByCommercialControl": { "Type": "REG_DWORD", "Data": 0 },
  "IsRestoreLogon": { "Type": "REG_DWORD", "Data": 0 },
  "OneTimeUpgrade": { "Type": "REG_DWORD", "Data": 0 },
  "PeriodicUpgrade": { "Type": "REG_QWORD", "Data": 134118152903943918 },
  "SpotlightDisabledReason": { "Type": "REG_DWORD", "Data": 100 },
  "SpotlightNotOnboardedReason": { "Type": "REG_DWORD", "Data": 4 }
}
```
Disabling it via policies etc. is enough, therefore I won't add them as there's no documentation on them either.

`EnabledState` gets read.
```
\Registry\User\S-<ID>\SOFTWARE\Microsoft\WINDOWS\CurrentVersion\DesktopSpotlight\Settings : EnabledState
```

## Windows Policies

```json
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableWindowsSpotlightFeatures",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Turn off all Windows spotlight features",
  "ExplainText": "This policy setting lets you turn off all Windows Spotlight features at once. If you enable this policy setting, Windows spotlight on lock screen, Windows tips, Microsoft consumer features and other related features will be turned off. You should enable this policy setting if your goal is to minimize network traffic from target devices. If you disable or do not configure this policy setting, Windows spotlight features are allowed and may be controlled individually using their corresponding policy settings.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableWindowsSpotlightFeatures",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableWindowsSpotlightWindowsWelcomeExperience",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_RS2",
  "DisplayName": "Turn off the Windows Welcome Experience",
  "ExplainText": "This policy setting lets you turn off the Windows Spotlight Windows Welcome experience. This feature helps onboard users to Windows, for instance launching Microsoft Edge with a web page highlighting new features. If you enable this policy, the Windows Welcome Experience will no longer display when there are updates and changes to Windows and its apps. If you disable or do not configure this policy, the Windows Welcome Experience will be launched to help onboard users to Windows telling them about what's new, changed, and suggested.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableWindowsSpotlightWindowsWelcomeExperience",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableWindowsSpotlightOnActionCenter",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_RS2",
  "DisplayName": "Turn off Windows Spotlight on Action Center",
  "ExplainText": "If you enable this policy, Windows Spotlight notifications will no longer be shown on Action Center. If you disable or do not configure this policy, Microsoft may display notifications in Action Center that will suggest apps or features to help users be more productive on Windows.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableWindowsSpotlightOnActionCenter",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableWindowsSpotlightOnSettings",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_RS4",
  "DisplayName": "Turn off Windows Spotlight on Settings",
  "ExplainText": "If you enable this policy, Windows Spotlight suggestions will no longer be shown in Settings app. If you disable or do not configure this policy, Microsoft may suggest apps or features in Settings app to help users be productive on Windows or their linked phone.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableWindowsSpotlightOnSettings",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "CloudContent.admx",
  "CategoryName": "CloudContent",
  "PolicyName": "DisableSpotlightCollectionOnDesktop",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Turn off Spotlight collection on Desktop",
  "ExplainText": "This policy setting removes the Spotlight collection setting in Personalization, rendering the user unable to select and subsequentyly download daily images from Microsoft to desktop. If you enable this policy, \"Spotlight collection\" will not be available as an option in Personalization settings. If you disable or do not configure this policy, \"Spotlight collection\" will appear as an option in Personalization settings, allowing the user to select \"Spotlight collection\" as the Desktop provider and display daily images from Microsoft on the desktop.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "DisableSpotlightCollectionOnDesktop",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
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
  "PolicyName": "ConfigureWindowsSpotlight",
  "NameSpace": "Microsoft.Policies.CloudContent",
  "Supported": "Windows_10_0_NOSERVER",
  "DisplayName": "Configure Windows spotlight on lock screen",
  "ExplainText": "This policy setting lets you configure Windows spotlight on the lock screen. If you enable this policy setting, \"Windows spotlight\" will be set as the lock screen provider and users will not be able to modify their lock screen. \"Windows spotlight\" will display daily images from Microsoft on the lock screen. Additionally, if you check the \"Include content from Enterprise spotlight\" checkbox and your organization has setup an Enterprise spotlight content service in Azure, the lock screen will display internal messages and communications configured in that service, when available. If your organization does not have an Enterprise spotlight content service, the checkbox will have no effect. If you disable this policy setting, Windows spotlight will be turned off and users will no longer be able to select it as their lock screen. Users will see the default lock screen image and will be able to select another image, unless you have enabled the \"Prevent changing lock screen image\" policy. If you do not configure this policy, Windows spotlight will be available on the lock screen and will be selected by default, unless you have configured another default lock screen image using the \"Force a specific default lock screen and logon image\" policy. Note: This policy is only available for Enterprise SKUs",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\CloudContent"
  ],
  "ValueName": "ConfigureWindowsSpotlight",
  "Elements": [
    { "Type": "Boolean", "ValueName": "IncludeEnterpriseSpotlight", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "2" }
  ]
},
```
