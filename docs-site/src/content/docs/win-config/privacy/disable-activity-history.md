---
title: 'Activity History'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 31
---

`EnableActivityFeed` enables or disables publishing and syncing of activities across devices. `PublishUserActivities` allows or blocks local publishing of user activities. `UploadUserActivities` allows or blocks uploading of user activities to the cloud, deletion is not affected.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Enables Activity Feed](https://noverse.dev/policies?p=OSPolicy*EnableActivityFeed) | `HKLM\Software\Policies\Microsoft\Windows\System` | `EnableActivityFeed` |
| [Allow publishing of User Activities](https://noverse.dev/policies?p=OSPolicy*PublishUserActivities) | `HKLM\Software\Policies\Microsoft\Windows\System` | `PublishUserActivities` |
| [Allow upload of User Activities](https://noverse.dev/policies?p=OSPolicy*UploadUserActivities) | `HKLM\Software\Policies\Microsoft\Windows\System` | `UploadUserActivities` |
| [Turn off storage and display of search history](https://noverse.dev/policies?p=Search*DisableSearchHistory) | `HKCU\SOFTWARE\Policies\Microsoft\Windows\Explorer` | `DisableSearchHistory` |
