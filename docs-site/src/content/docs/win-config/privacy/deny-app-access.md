---
title: 'Deny App Access'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 17
---

Denies the access for everything, only leaving the microphone enabled. See JSON content below for details. Note `Deny 'User Info Access'` = prevents users from managing the ability to allow apps (not desktop apps) to access the user name, account picture, and domain information - this option doesn't get applied via the main option.

Adding the `Deny` data in `HKLM` is probably enough, but the keys also exist in `HKCU` - Windows only edits it in `HKLM`, examples:
```c
// Notifications
svchost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\userNotificationListener\Value	Type: REG_SZ, Length: 10, Data: Deny

// Contacts
svchost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\contacts\Value	Type: REG_SZ, Length: 10, Data: Deny

// Pictures
svchost.exe	RegSetValue	HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\picturesLibrary\Value	Type: REG_SZ, Length: 10, Data: Deny
```

![](https://github.com/nohuto/win-config/blob/main/privacy/images/appaccess.png?raw=true)

## Windows Policies

```json
{
  "File": "UserProfiles.admx",
  "CategoryName": "UserProfiles",
  "PolicyName": "UserInfoAccessAction",
  "NameSpace": "Microsoft.Policies.UserProfiles",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "User management of sharing user name, account picture, and domain information with apps (not desktop apps)",
  "ExplainText": "This setting prevents users from managing the ability to allow apps to access the user name, account picture, and domain information. If you enable this policy setting, sharing of user name, picture and domain information may be controlled by setting one of the following options: \"Always on\" - users will not be able to change this setting and the user's name and account picture will be shared with apps (not desktop apps). In addition apps (not desktop apps) that have the enterprise authentication capability will also be able to retrieve the user's UPN, SIP/URI, and DNS. \"Always off\" - users will not be able to change this setting and the user's name and account picture will not be shared with apps (not desktop apps). In addition apps (not desktop apps) that have the enterprise authentication capability will not be able to retrieve the user's UPN, SIP/URI, and DNS. Selecting this option may have a negative impact on certain enterprise software and/or line of business apps that depend on the domain information protected by this setting to connect with network resources. If you do not configure or disable this policy the user will have full control over this setting and can turn it off and on. Selecting this option may have a negative impact on certain enterprise software and/or line of business apps that depend on the domain information protected by this setting to connect with network resources if users choose to turn the setting off.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowUserInfoAccess", "Items": [
        { "DisplayName": "Always on", "Data": "1" },
        { "DisplayName": "Always off", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessAccountInfo",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access account information",
  "ExplainText": "This policy setting specifies whether Windows apps can access account information. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access account information by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access account information and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access account information and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access account information by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessAccountInfo", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessCalendar",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access the calendar",
  "ExplainText": "This policy setting specifies whether Windows apps can access the calendar. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the calendar by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the calendar and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the calendar and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the calendar by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessCalendar", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessCallHistory",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access call history",
  "ExplainText": "This policy setting specifies whether Windows apps can access call history. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access call history by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the call history and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the call history and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the call history by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessCallHistory", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
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
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessContacts",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access contacts",
  "ExplainText": "This policy setting specifies whether Windows apps can access contacts. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access contacts by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access contacts and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access contacts and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access contacts by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessContacts", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessEmail",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access email",
  "ExplainText": "This policy setting specifies whether Windows apps can access email. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access email by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access email and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access email and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access email by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessEmail", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessGraphicsCaptureProgrammatic",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps take screenshots of various windows or displays",
  "ExplainText": "This policy setting specifies whether Windows apps can take screenshots of various windows or displays. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can take screenshots of various windows or displays by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to take screenshots of various windows or displays and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to take screenshots of various windows or displays and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can take screenshots of various windows or displays by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessGraphicsCaptureProgrammatic", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessGraphicsCaptureWithoutBorder",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps turn off the screenshot border",
  "ExplainText": "This policy setting specifies whether Windows apps can turn off the screenshot border. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can turn off the screenshot border by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to turn off the screenshot border and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to turn off the screenshot border and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can turn off the screenshot border by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessGraphicsCaptureWithoutBorder", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessHumanPresence",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access presence sensing",
  "ExplainText": "This policy setting specifies whether Windows apps can access presence sensing. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access presence sensing by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access presence sensing and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access presence sensing and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access presence sensing by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessHumanPresence", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessLocation",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access location",
  "ExplainText": "This policy setting specifies whether Windows apps can access location. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access location by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access location and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access location and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access location by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessLocation", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessMessaging",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access messaging",
  "ExplainText": "This policy setting specifies whether Windows apps can read or send messages (text or MMS). You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can read or send messages by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps can read or send messages and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps cannot read or send messages and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can read or send messages by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessMessaging", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessMicrophone",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access the microphone",
  "ExplainText": "This policy setting specifies whether Windows apps can access the microphone. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the microphone by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the microphone and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the microphone and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the microphone by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessMicrophone", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessMotion",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access motion",
  "ExplainText": "This policy setting specifies whether Windows apps can access motion data. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access motion data by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access motion data and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access motion data and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access motion data by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessMotion", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessNotifications",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access notifications",
  "ExplainText": "This policy setting specifies whether Windows apps can access notifications. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access notifications by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access notifications and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access notifications and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access notifications by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessNotifications", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessPhone",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps make phone calls",
  "ExplainText": "This policy setting specifies whether Windows apps can make phone calls. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can make phone calls by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to make phone calls and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to make phone calls and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can make phone calls by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessPhone", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessRadios",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps control radios",
  "ExplainText": "This policy setting specifies whether Windows apps have access to control radios. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps have access to control radios by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps will have access to control radios and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps will not have access to control radios and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps have access to control radios by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessRadios", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsSyncWithDevices",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps communicate with unpaired devices",
  "ExplainText": "This policy setting specifies whether Windows apps can communicate with unpaired wireless devices. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can communicate with unpaired wireless devices by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to communicate with unpaired wireless devices and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to communicate with unpaired wireless devices and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can communicate with unpaired wireless devices by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsSyncWithDevices", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessTasks",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access Tasks",
  "ExplainText": "This policy setting specifies whether Windows apps can access tasks. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access tasks by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access tasks and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access tasks and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access tasks by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessTasks", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessTrustedDevices",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access trusted devices",
  "ExplainText": "This policy setting specifies whether Windows apps can access trusted devices. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access trusted devices by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access trusted devices and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access trusted devices and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access trusted devices by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessTrustedDevices", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsRunInBackground",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
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
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsGetDiagnosticInfo",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0_RS2 - At least Windows Server 2016, Windows 10 Version 1703",
  "DisplayName": "Let Windows apps access diagnostic information about other apps",
  "ExplainText": "This policy setting specifies whether Windows apps can get diagnostic information about other Windows apps, including user name. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can get diagnostic information about other apps using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to get diagnostic information about other apps and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to get diagnostic information about other apps and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can get diagnostic information about other apps by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsGetDiagnosticInfo", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessGazeInput",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access an eye tracker device",
  "ExplainText": "This policy setting specifies whether Windows apps can access the eye tracker. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the eye tracker by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access the eye tracker and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access the eye tracker and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the eye tracker by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessGazeInput", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsActivateWithVoice",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps activate with voice",
  "ExplainText": "This policy setting specifies whether Windows apps can be activated by voice. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can be activated with a voice keyword by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to be activated with a voice keyword and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to be activated with a voice keyword and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can be activated with a voice keyword by using Settings > Privacy on the device. This policy is applied to Windows apps and Cortana.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsActivateWithVoice", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsActivateWithVoiceAboveLock",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps activate with voice while the system is locked",
  "ExplainText": "This policy setting specifies whether Windows apps can be activated by voice while the system is locked. If you choose the \"User is in control\" option, employees in your organization can decide whether users can interact with applications using speech while the system is locked by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, users can interact with applications using speech while the system is locked and employees in your organization cannot change it. If you choose the \"Force Deny\" option, users cannot interact with applications using speech while the system is locked and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether users can interact with applications using speech while the system is locked by using Settings > Privacy on the device. This policy is applied to Windows apps and Cortana. It takes precedence of the \u201cAllow Cortana above lock\u201d policy. This policy is applicable only when \u201cAllow voice activation\u201d policy is configured to allow applications to be activated with voice.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsActivateWithVoiceAboveLock", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "AppPrivacy.admx",
  "CategoryName": "AppPrivacy",
  "PolicyName": "LetAppsAccessBackgroundSpatialPerception",
  "NameSpace": "Microsoft.Policies.AppPrivacy",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Let Windows apps access user movements while running in the background",
  "ExplainText": "This policy setting specifies whether Windows apps can access the movement of the user's head, hands, motion controllers, and other tracked objects, while the apps are running in the background. You can specify either a default setting for all apps or a per-app setting by specifying a Package Family Name. You can get the Package Family Name for an app by using the Get-AppPackage Windows PowerShell cmdlet. A per-app setting overrides the default setting. If you choose the \"User is in control\" option, employees in your organization can decide whether Windows apps can access the user's movements while the apps are running in the background by using Settings > Privacy on the device. If you choose the \"Force Allow\" option, Windows apps are allowed to access user movements while the apps are running in the background and employees in your organization cannot change it. If you choose the \"Force Deny\" option, Windows apps are not allowed to access user movements while the apps are running in the background and employees in your organization cannot change it. If you disable or do not configure this policy setting, employees in your organization can decide whether Windows apps can access the user's movements while the apps are running in the background by using Settings > Privacy on the device. If an app is open when this Group Policy object is applied on a device, employees must restart the app or device for the policy changes to be applied to the app.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\AppPrivacy"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "LetAppsAccessBackgroundSpatialPerception", "Items": [
        { "DisplayName": "User is in control", "Data": "0" },
        { "DisplayName": "Force Allow", "Data": "1" },
        { "DisplayName": "Force Deny", "Data": "2" }
      ]
    }
  ]
},
```
