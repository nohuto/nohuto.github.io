---
title: 'Feedback Prompts'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-feedback-prompts'
sidebar:
  order: 31
---

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
