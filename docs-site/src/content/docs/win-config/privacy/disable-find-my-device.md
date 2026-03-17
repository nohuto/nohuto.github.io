---
title: 'Find My Device'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-find-my-device'
sidebar:
  order: 36
---

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
