---
title: 'Message Sync'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 41
---

"This policy setting allows backup and restore of cellular text messages to Microsoft's cloud services. Disable this feature to avoid information being stored on servers outside of your organization's control."

| Policy | Description | Values |
| ------ | ------ | ------ |
| AllowMessageSync | Controls whether SMS/MMS are synced to Microsoft's cloud so they can be backed up and restored; also decides if the user can toggle this in the UI. | 0 = sync not allowed, user cannot change - 1 = sync allowed, user can change (default) |

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Allow Message Service Cloud Sync](https://noverse.dev/policies?p=messaging*AllowMessageSync) | `HKLM\Software\Policies\Microsoft\Windows\Messaging` | `AllowMessageSync` |
