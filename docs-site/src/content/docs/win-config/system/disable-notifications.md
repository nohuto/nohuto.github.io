---
title: 'Notifications'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 21
---

## Option/Suboptions

| Option | Description |
| ---- | ---- |
| Main | Disables all kind of notifications completely. |
| Disable Low Disk Space Checks | Disables the `Low Disk Space` notification. ![](https://github.com/nohuto/win-config/blob/main/system/images/lowdiskspace.jpg?raw=true) |
| Hide all Windows Security notifications | Disables all notifications via the `DisableNotifications`  policy (this probably overrides all other security notifications below). |
| Hide non-critical Windows Security notifications | Disables non-critical/enhanced notifications via the Windows Security and Microsoft Defender Antivirus `DisableEnhancedNotifications` policies. |
| Disable Enhanced Phishing Protection warnings | Disables the Enhanced Phishing Protection warning prompts for malicious sites, password reuse, and unsafe apps. |
| Disable Virus & threat protection notifications | Disables all in `Windows Security > Settings > Manage notifications: Virus & threat protection notifications` |
| Disable Account protection notifications | Disables all in `Windows Security > Settings > Manage notifications: Account protection notifications` |
| Disable Firewall & network protection notifications | Disables all in `Windows Security > Settings > Manage notifications: Firewall & network protection notifications` |
| Disable Security & Maintenance Notifications | Disables it via `SystemSettings > System > Notifications: Security and Maintenance` |
| Disable Sync Provider Notifications | Disables it via `Explorer > View > Options > View: Show sync provider notifications` |
| Disable account-related notifications | Disables it via `SystemSettings > Personalization > Start: Show account related notifications occasionally in Start` |
| Disable Clock Change notifications | Disables it via `Control Panel > Clock and Region > Date and Time: Notify me when the clock chanes` |
| Hide Notification Center | Works via `NoAutoTrayNotify`/`DisableNotificationCenter` policies and `SystemSettings > System > Notifications: Show notification bell icon` |
| Disable Notification Sound | Disables it via `SystemSettings > System > Notifications > Allow notifications to play sound` |
| Disable Lockscreen Notifications | Works via `DisableLockScreenAppNotifications` policy and `SystemSettings > System > Notifications: Show notifications on the lock screen + Show reminders and incoming VoIP calls on the lock screen` |
| Turn off access to the Store | `NoUseStoreOpenWith` policy - "*This policy setting specifies whether to use the Store service for finding an application to open a file with an unhandled file type or protocol association. When a user opens a file type or protocol that is not associated with any applications on the computer, the user is given the choice to select a local application or use the Store service to find an application. If you enable this policy setting, the "Look for an app in the Store" item in the Open With dialog is removed. If you disable or do not configure this policy setting, the user is allowed to use the Store service and the Store item is available in the Open With dialog.*" |
| Hide Time in Notification Center | Works via `SystemSettings > Time & language > Date & time: Show time and date in the System tray` |

## Miscellaneous Notes

### WnsEndpoint

"`WnsEndpoint` (`REG_SZ`) determines which Windows Notification Service (WNS) endpoint will be used to connect for Windows push notifications. If you disable or don't configure this setting, the push notifications will connect to the default endpoint of `client.wns.windows.com`. " Located in `HKLM\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\PushNotifications`. Block `client.wns.windows.com` via the hosts file.

### Registry Values

All `NOC_GLOBAL_SETTING_*` I found in `NotificationController.dll`:
```c
"HKLM\\SOFTWARE\\Microsoft\\WINDOWS\\CurrentVersion\\Notifications\\Settings"
  'NOC_GLOBAL_SETTING_SUPRESS_TOASTS_WHILE_DUPLICATING'; // Hide notifications when I'm duplicating my screen
  'NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK'; // Show notifications on the lock screen
  'NOC_GLOBAL_SETTING_ALLOW_CRITICAL_TOASTS_ABOVE_LOCK'; // Show reminders and incoming VoIP calls on the lock screen
  'NOC_GLOBAL_SETTING_CORTANA_MANAGED_NOTIFICATIONS';
  'NOC_GLOBAL_SETTING_ALLOW_ACTION_CENTER_ABOVE_LOCK';
  'NOC_GLOBAL_SETTING_HIDE_NOTIFICATION_CONTENT';
  'NOC_GLOBAL_SETTING_TOASTS_ENABLED';
  'NOC_GLOBAL_SETTING_BADGE_ENABLED'; // Don't show number of notifications
  'NOC_GLOBAL_SETTING_GLEAM_ENABLED'; // App icons (Action Center)
  'NOC_GLOBAL_SETTING_ALLOW_HMD_NOTIFICATIONS'; // Show notifications on my head mounted display
  'NOC_GLOBAL_SETTING_ALLOW_CONTROL_CENTER_ABOVE_LOCK';
  'NOC_GLOBAL_SETTING_ALLOW_NOTIFICATION_SOUND'; // Allow notification to play sounds
```
The options I've commented on are included in the options under `System > Notifications`/right click menu of notification center.

Since `BackupReminderToastCount` isn't a well known value, I've done quick research where it exists and if it does exist. While doing so I found different values:
```c
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\StorageSense\\Parameters\\StoragePolicy";
    "StoragePoliciesNotified" = 0; // REG_DWORD, default 0 if missing, range: 0-1
    "StoragePoliciesChanged" = 0; // REG_DWORD, default 0 if missing, range: 0-1
    "OptinToastFired" = 0; // REG_DWORD, default 0 if missing, range: 0-1
    "FirstLaunchToastFired" = 0; // REG_DWORD, default 0 if missing, range: 0-1
    "CloudfilePolicyConsent" = 0; // REG_DWORD, default 0 if missing, range: 0-1
    "CloudConsentToastCount" = 0; // REG_DWORD, default 0 if missing, range: 0-3
    "OptOutButtonClicked" = 0; // REG_DWORD, default 0 if missing, range: 0-1

"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\DiskSpaceChecking";
    "LastInstallTimeLowStorageNotify" = 0; // REG_QWORD FILETIME, range: FILETIME, ComparedTo: OneDay
    "NumWinOldLowStorageNotify" = 0; // REG_DWORD, default 0 if missing, range: 0-3

"HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion";
    "InstallTime" = 0; // REG_QWORD FILETIME, range: FILETIME, ComparedTo: TwoHours

"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\StorageSense\\Parameters\\BackupReminder";
    "TestBackupReminderToast" = 0; // REG_DWORD, default 0 if missing, range: 0-2?

"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\StorageSense\\Parameters\\BackupReminder";
    "FirstProfileSeenTime" = 0; // REG_QWORD FILETIME, default set to current system time if missing, range: FILETIME, ComparedTo: FourMinutes
    "BackupReminderToastCount" = 0; // REG_DWORD, default 0 if missing, range: 0-3
    "LastTimeBackupReminderNotify" = 0; // REG_QWORD FILETIME, range: FILETIME, ComparedTo: TwoMinutes

// FILETIME THRESHOLDS
"OneDay" = 0xC92A69C000; // Seconds: 86400, 1 day, LastInstallTimeLowStorageNotify
"TwoHours" = 0x10C388D000; // Seconds: 7200, 2 hours, InstallTime
"FourMinutes" = 0x8F0D1800; // Seconds: 240, 4 minutes, FirstProfileSeenTime
"TwoMinutes" = 0x47868C00; // Seconds: 120, 2 minutes, LastTimeBackupReminderNotify
```

See [system/assets | noti-CLowDiskSpaceUI_CanShowStorageSenseToast.c](https://github.com/nohuto/win-config/blob/main/system/assets/noti-CLowDiskSpaceUI_CanShowStorageSenseToast.c) for used pseudocode. Note that I added my chosen values to the `Disable Low Disk Space Checks` suboption for safety reasons.

```c
"HKCU\\Control Panel\\Accessibility";
  // Dismiss notifications after this amount of time
  "MessageDuration" = 5; // REG_DWORD, range 5-300(s) - According to pseudocode, it has a range from `0` to `0xFFFFFFFF`. Fallback of `5`, SystemSettings supports ranges from `5` (5 seconds) to `300` (5 minutes). Anything above/below will likely be limited (haven't tested it yet).

"HKCU\\Software\\Microsoft\\Windows\\MiracastDiscovery"
  "DisableNotification" = 0; // read on boot - "HKCU\Software\Microsoft\Windows\MiracastDiscovery\DisableNotification","Type: REG_DWORD, Length: 4, Data: 0"
  "NotificationCount" = 0; // read on boot - "HKCU\Software\Microsoft\Windows\MiracastDiscovery\NotificationCount","Type: REG_DWORD, Length: 4, Data: 0"

// miscellaneous procmon boot trace values
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\IsDebugEnabled","Length: 16"
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\SmartOptOut\\InitialTimerCooldown","Length: 20"
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\SmartOptOut\\PeriodicTimerCooldown","Length: 20"
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\SmartOptOut\\SmartOptOutRevision","Type: REG_QWORD, Length: 8, Data: "
"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\TimestampWhenSeen","Length: 20"
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "WindowsDefenderSecurityCenter.admx",
  "CategoryName": "Notifications",
  "PolicyName": "Notifications_DisableEnhancedNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefenderSecurityCenter",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Hide non-critical notifications",
  "ExplainText": "Only show critical notifications from Windows Security. If the Suppress all notifications GP setting has been enabled, this setting will have no effect. Enabled: Local users will only see critical notifications from Windows Security. They will not see other types of notifications, such as regular PC or device health information. Disabled: Local users will see all types of notifications from Windows Security. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender Security Center\\Notifications"
  ],
  "ValueName": "DisableEnhancedNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "Reporting",
  "PolicyName": "Reporting_DisableEnhancedNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows_10_0",
  "DisplayName": "Turn off enhanced notifications",
  "ExplainText": "Use this policy setting to specify if you want Microsoft Defender Antivirus enhanced notifications to display on clients. If you disable or do not configure this setting, Microsoft Defender Antivirus enhanced notifications will display on clients. If you enable this setting, Microsoft Defender Antivirus enhanced notifications will not display on clients.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Reporting"
  ],
  "ValueName": "DisableEnhancedNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefenderSecurityCenter.admx",
  "CategoryName": "Notifications",
  "PolicyName": "Notifications_DisableNotifications",
  "NameSpace": "Microsoft.Policies.WindowsDefenderSecurityCenter",
  "Supported": "Windows_10_0_RS3",
  "DisplayName": "Hide all notifications",
  "ExplainText": "Hide notifications from Windows Security. Enabled: Local users will not see notifications from Windows Security. Disabled: Local users can see notifications from Windows Security. Not configured: Same as Disabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender Security Center\\Notifications"
  ],
  "ValueName": "DisableNotifications",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "ShellNoUseStoreOpenWith_2",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "Windows8",
  "DisplayName": "Turn off access to the Store",
  "ExplainText": "This policy setting specifies whether to use the Store service for finding an application to open a file with an unhandled file type or protocol association. When a user opens a file type or protocol that is not associated with any applications on the computer, the user is given the choice to select a local application or use the Store service to find an application. If you enable this policy setting, the \"Look for an app in the Store\" item in the Open With dialog is removed. If you disable or do not configure this policy setting, the user is allowed to use the Store service and the Store item is available in the Open With dialog.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer"
  ],
  "ValueName": "NoUseStoreOpenWith",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WPN.admx",
  "CategoryName": "NotificationsCategory",
  "PolicyName": "NoTileNotification",
  "NameSpace": "Microsoft.Policies.Notifications",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn off tile notifications",
  "ExplainText": "This policy setting turns off tile notifications. If you enable this policy setting, applications and system features will not be able to update their tiles and tile badges in the Start screen. If you disable or do not configure this policy setting, tile and badge notifications are enabled and can be turned off by the administrator or user. No reboots or service restarts are required for this policy setting to take effect.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications"
  ],
  "ValueName": "NoTileApplicationNotification",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WPN.admx",
  "CategoryName": "NotificationsCategory",
  "PolicyName": "NoNotificationMirroring",
  "NameSpace": "Microsoft.Policies.Notifications",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Turn off notification mirroring",
  "ExplainText": "This policy setting turns off notification mirroring. If you enable this policy setting, notifications from applications and system will not be mirrored to your other devices. If you disable or do not configure this policy setting, notifications will be mirrored, and can be turned off by the administrator or user. No reboots or service restarts are required for this policy setting to take effect.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications"
  ],
  "ValueName": "DisallowNotificationMirroring",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WPN.admx",
  "CategoryName": "NotificationsCategory",
  "PolicyName": "NoToastNotification",
  "NameSpace": "Microsoft.Policies.Notifications",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn off toast notifications",
  "ExplainText": "This policy setting turns off toast notifications for applications. If you enable this policy setting, applications will not be able to raise toast notifications. Note that this policy does not affect taskbar notification balloons. Note that Windows system features are not affected by this policy. You must enable/disable system features individually to stop their ability to raise toast notifications. If you disable or do not configure this policy setting, toast notifications are enabled and can be turned off by the administrator or user. No reboots or service restarts are required for this policy setting to take effect.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications",
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications"
  ],
  "ValueName": "NoToastApplicationNotification",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WPN.admx",
  "CategoryName": "NotificationsCategory",
  "PolicyName": "NoLockScreenToastNotification",
  "NameSpace": "Microsoft.Policies.Notifications",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn off toast notifications on the lock screen",
  "ExplainText": "This policy setting turns off toast notifications on the lock screen. If you enable this policy setting, applications will not be able to raise toast notifications on the lock screen. If you disable or do not configure this policy setting, toast notifications on the lock screen are enabled and can be turned off by the administrator or user. No reboots or service restarts are required for this policy setting to take effect.",
  "KeyPath": [
    "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CurrentVersion\\PushNotifications"
  ],
  "ValueName": "NoToastApplicationNotificationOnLockScreen",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
