---
title: 'Remote Desktop'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-remote-desktop'
sidebar:
  order: 16
---

Disables remote desktop, remote assistance, RPC traffic, and device redirection.
> https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-pc-connections-faq  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-remotedesktopservices

`RemoteAssistance.admx`:  
`CreateEncryptedOnlyTickets`: Allow only Windows Vista or later connections
`fAllowFullControl` (`0`): Allow helpers to only view the computer
`LoggingEnabled`: Turn on session logging

`RPC.admx`:  
`RestrictRemoteClients` (`2`): Authenticated without exceptions

`TerminalServer.admx`:  
`fDisableCdm`: Do not allow drive redirection

## Windows Policies

```json
{
  "File": "RemoteAssistance.admx",
  "CategoryName": "RemoteAssist",
  "PolicyName": "RA_Solicit",
  "NameSpace": "Microsoft.Policies.RemoteAssistance",
  "Supported": "WindowsXP",
  "DisplayName": "Configure Solicited Remote Assistance",
  "ExplainText": "This policy setting allows you to turn on or turn off Solicited (Ask for) Remote Assistance on this computer. If you enable this policy setting, users on this computer can use email or file transfer to ask someone for help. Also, users can use instant messaging programs to allow connections to this computer, and you can configure additional Remote Assistance settings. If you disable this policy setting, users on this computer cannot use email or file transfer to ask someone for help. Also, users cannot use instant messaging programs to allow connections to this computer. If you do not configure this policy setting, users can turn on or turn off Solicited (Ask for) Remote Assistance themselves in System Properties in Control Panel. Users can also configure Remote Assistance settings. If you enable this policy setting, you have two ways to allow helpers to provide Remote Assistance: \"Allow helpers to only view the computer\" or \"Allow helpers to remotely control the computer.\" The \"Maximum ticket time\" policy setting sets a limit on the amount of time that a Remote Assistance invitation created by using email or file transfer can remain open. The \"Select the method for sending email invitations\" setting specifies which email standard to use to send Remote Assistance invitations. Depending on your email program, you can use either the Mailto standard (the invitation recipient connects through an Internet link) or the SMAPI (Simple MAPI) standard (the invitation is attached to your email message). This policy setting is not available in Windows Vista since SMAPI is the only method supported. If you enable this policy setting you should also enable appropriate firewall exceptions to allow Remote Assistance communications.",
  "KeyPath": [
    "HKLM\\Software\\policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "fAllowToGetHelp",
  "Elements": [
    { "Type": "Enum", "ValueName": "fAllowFullControl", "Items": [
        { "DisplayName": "Allow helpers to remotely control the computer", "Data": "1" },
        { "DisplayName": "Allow helpers to only view the computer", "Data": "0" }
      ]
    },
    { "Type": "Decimal", "ValueName": "MaxTicketExpiry", "MinValue": "1", "MaxValue": "99" },
    { "Type": "Enum", "ValueName": "MaxTicketExpiryUnits", "Items": [
        { "DisplayName": "Minutes", "Data": "0" },
        { "DisplayName": "Hours", "Data": "1" },
        { "DisplayName": "Days", "Data": "2" }
      ]
    },
    { "Type": "Enum", "ValueName": "fUseMailto", "Items": [
        { "DisplayName": "Simple MAPI", "Data": "0" },
        { "DisplayName": "Mailto", "Data": "1" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "TerminalServer.admx",
  "CategoryName": "TS_REDIRECTION",
  "PolicyName": "TS_CLIENT_DRIVE_M",
  "NameSpace": "Microsoft.Policies.TerminalServer",
  "Supported": "WindowsXP",
  "DisplayName": "Do not allow drive redirection",
  "ExplainText": "This policy setting specifies whether to prevent the mapping of client drives in a Remote Desktop Services session (drive redirection). By default, an RD Session Host server maps client drives automatically upon connection. Mapped drives appear in the session folder tree in File Explorer or Computer in the format <driveletter> on <computername>. You can use this policy setting to override this behavior. If you enable this policy setting, client drive redirection is not allowed in Remote Desktop Services sessions, and Clipboard file copy redirection is not allowed on computers running Windows XP, Windows Server 2003, Windows Server 2012 (and later) or Windows 8 (and later). If you disable this policy setting, client drive redirection is always allowed. In addition, Clipboard file copy redirection is always allowed if Clipboard redirection is allowed. If you do not configure this policy setting, client drive redirection and Clipboard file copy redirection are not specified at the Group Policy level.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "fDisableCdm",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "RemoteAssistance.admx",
  "CategoryName": "RemoteAssist",
  "PolicyName": "RA_EncryptedTicketOnly",
  "NameSpace": "Microsoft.Policies.RemoteAssistance",
  "Supported": "WindowsVista",
  "DisplayName": "Allow only Windows Vista or later connections",
  "ExplainText": "This policy setting enables Remote Assistance invitations to be generated with improved encryption so that only computers running this version (or later versions) of the operating system can connect. This policy setting does not affect Remote Assistance connections that are initiated by instant messaging contacts or the unsolicited Offer Remote Assistance. If you enable this policy setting, only computers running this version (or later versions) of the operating system can connect to this computer. If you disable this policy setting, computers running this version and a previous version of the operating system can connect to this computer. If you do not configure this policy setting, users can configure the setting in System Properties in the Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "CreateEncryptedOnlyTickets",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "RemoteAssistance.admx",
  "CategoryName": "RemoteAssist",
  "PolicyName": "RA_Logging",
  "NameSpace": "Microsoft.Policies.RemoteAssistance",
  "Supported": "WindowsVista",
  "DisplayName": "Turn on session logging",
  "ExplainText": "This policy setting allows you to turn logging on or off. Log files are located in the user's Documents folder under Remote Assistance. If you enable this policy setting, log files are generated. If you disable this policy setting, log files are not generated. If you do not configure this setting, application-based settings are used.",
  "KeyPath": [
    "HKLM\\Software\\policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "LoggingEnabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "RPC.admx",
  "CategoryName": "Rpc",
  "PolicyName": "RpcRestrictRemoteClients",
  "NameSpace": "Microsoft.Policies.RemoteProcedureCalls",
  "Supported": "WindowsXPSP2",
  "DisplayName": "Restrict Unauthenticated RPC clients",
  "ExplainText": "This policy setting controls how the RPC server runtime handles unauthenticated RPC clients connecting to RPC servers. This policy setting impacts all RPC applications. In a domain environment this policy setting should be used with caution as it can impact a wide range of functionality including group policy processing itself. Reverting a change to this policy setting can require manual intervention on each affected machine. This policy setting should never be applied to a domain controller. If you disable this policy setting, the RPC server runtime uses the value of \"Authenticated\" on Windows Client, and the value of \"None\" on Windows Server versions that support this policy setting. If you do not configure this policy setting, it remains disabled. The RPC server runtime will behave as though it was enabled with the value of \"Authenticated\" used for Windows Client and the value of \"None\" used for Server SKUs that support this policy setting. If you enable this policy setting, it directs the RPC server runtime to restrict unauthenticated RPC clients connecting to RPC servers running on a machine. A client will be considered an authenticated client if it uses a named pipe to communicate with the server or if it uses RPC Security. RPC Interfaces that have specifically requested to be accessible by unauthenticated clients may be exempt from this restriction, depending on the selected value for this policy setting. -- \"None\" allows all RPC clients to connect to RPC Servers running on the machine on which the policy setting is applied. -- \"Authenticated\" allows only authenticated RPC Clients (per the definition above) to connect to RPC Servers running on the machine on which the policy setting is applied. Exemptions are granted to interfaces that have requested them. -- \"Authenticated without exceptions\" allows only authenticated RPC Clients (per the definition above) to connect to RPC Servers running on the machine on which the policy setting is applied. No exceptions are allowed. Note: This policy setting will not be applied until the system is rebooted.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Rpc"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "RestrictRemoteClients", "Items": [
        { "DisplayName": "None", "Data": "0" },
        { "DisplayName": "Authenticated", "Data": "1" },
        { "DisplayName": "Authenticated without exceptions", "Data": "2" }
      ]
    }
  ]
},
{
  "File": "TerminalServer.admx",
  "CategoryName": "TS_SECURITY",
  "PolicyName": "TS_RPC_ENCRYPTION",
  "NameSpace": "Microsoft.Policies.TerminalServer",
  "Supported": "WindowsNET",
  "DisplayName": "Require secure RPC communication",
  "ExplainText": "Specifies whether a Remote Desktop Session Host server requires secure RPC communication with all clients or allows unsecured communication. You can use this setting to strengthen the security of RPC communication with clients by allowing only authenticated and encrypted requests. If the status is set to Enabled, Remote Desktop Services accepts requests from RPC clients that support secure requests, and does not allow unsecured communication with untrusted clients. If the status is set to Disabled, Remote Desktop Services always requests security for all RPC traffic. However, unsecured communication is allowed for RPC clients that do not respond to the request. If the status is set to Not Configured, unsecured communication is allowed. Note: The RPC interface is used for administering and configuring Remote Desktop Services.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "fEncryptRPCTraffic",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WirelessDisplay.admx",
  "CategoryName": "Connect",
  "PolicyName": "AllowProjectionToPC",
  "NameSpace": "Microsoft.Policies.Connect",
  "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
  "DisplayName": "Don't allow this PC to be projected to",
  "ExplainText": "This policy setting allows you to turn off projection to a PC. If you turn it on, your PC isn't discoverable and can't be projected to except if the user manually launches the Wireless Display app. If you turn it off or don't configure it, your PC is discoverable and can be projected to above lock screen only. The user has an option to turn it always on or off except for manual launch, too.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Connect"
  ],
  "ValueName": "AllowProjectionToPC",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WirelessDisplay.admx",
  "CategoryName": "Connect",
  "PolicyName": "RequirePinForPairing",
  "NameSpace": "Microsoft.Policies.Connect",
  "Supported": "Windows_10_0_NOSERVER - At least Windows 10",
  "DisplayName": "Require pin for pairing",
  "ExplainText": "This policy setting allows you to require a pin for pairing. If you set this to 'Never', a pin isn't required for pairing. If you set this to 'First Time', the pairing ceremony for new devices will always require a PIN. If you set this to 'Always', all pairings will require PIN.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Connect"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "RequirePinForPairing", "Items": [
        { "DisplayName": "Never", "Data": "0" },
        { "DisplayName": "First Time", "Data": "1" },
        { "DisplayName": "Always", "Data": "2" }
      ]
    }
  ]
},
```

## Miscellaneous Notes

```json
"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services": {
  "fEncryptRPCTraffic": { "Type": "REG_DWORD", "Data": 1 }
},
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp": {
  "fLogonDisabled": { "Type": "REG_DWORD", "Data": 1 }
}
```
```powershell
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server\WinStations : DWMFRAMEINTERVAL
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : GlassSessionId
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : NotificationTimeOut
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : SnapshotMonitors
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : TSAppCompat
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : TSUserEnabled
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server\WinStations : fUseHardwareGPU
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : CaptureStackTrace
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : ContainerMode
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : debug
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugFlags
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugFlagsEx
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : Debuglevel
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : Debuglsm
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebuglsmFlags
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebuglsmLevel
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebuglsmToDebugger
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugMaxFileSize
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : Debugsessionenv
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugsessionenvFlags
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugsessionenvLevel
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugsessionenvToDebugger
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : Debugtermsrv
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtermsrvFlags
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtermsrvLevel
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtermsrvToDebugger
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugToDebugger
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugTS
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : Debugtstheme
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtsthemeFlags
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtsthemeLevel
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DebugtsthemeToDebugger
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DelayConMgrTimeout
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DelayReadyEventTimeout
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : DisableEnumUnlock
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : EnableTraceCorrelation
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : fDenyChildConnections
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : fDenyTSConnections
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : LSMBreakOnStart
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : MaxQueuedNotificationEvents
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : StartRCM
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server : TSServerDrainMode
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server\WinStations : ConsoleSecurity
\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server\WinStations\CONSOLE : SECURITY
```
