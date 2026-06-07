---
title: 'Feedback Prompts'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 34
---

"This policy setting allows an organization to prevent its devices from showing feedback questions from Microsoft.If you enable this policy setting, users will no longer see feedback notifications through the Windows Feedback app.If you disable or do not configure this policy setting, users may see notifications through the Windows Feedback app asking users for feedback.Note: If you disable or do not configure this policy setting, users can control how often they receive feedback questions."

Includes setting `Feedback Frequency` to `0` via `NumberOfSIUFInPeriod` & `PeriodInNanoSeconds`.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Do not show feedback notifications](https://noverse.dev/policies?p=FeedbackNotifications*DoNotShowFeedbackNotifications) | `HKLM\Software\Policies\Microsoft\Windows\DataCollection` | `DoNotShowFeedbackNotifications` |
