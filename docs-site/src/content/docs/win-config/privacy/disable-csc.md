---
title: 'CSC'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-csc'
sidebar:
  order: 43
---

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
