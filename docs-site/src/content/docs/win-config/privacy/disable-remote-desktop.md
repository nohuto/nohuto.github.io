---
title: 'Remote Desktop'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 23
---

Disables remote desktop, remote assistance, RPC traffic, and device redirection. See [remote desktop FAQs](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-pc-connections-faq) for more information.

`RemoteAssistance.admx`:  
`CreateEncryptedOnlyTickets`: Allow only Windows Vista or later connections
`fAllowFullControl` (`0`): Allow helpers to only view the computer
`LoggingEnabled`: Turn on session logging

`RPC.admx`:  
`RestrictRemoteClients` (`2`): Authenticated without exceptions

`TerminalServer.admx`:  
`fDisableCdm`: Do not allow drive redirection

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "RemoteAssistance.admx",
  "CategoryName": "RemoteAssist",
  "PolicyName": "RA_Logging",
  "NameSpace": "Microsoft.Policies.RemoteAssistance",
  "Supported": "WindowsVista - At least Windows Vista",
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
  "File": "RemoteAssistance.admx",
  "CategoryName": "RemoteAssist",
  "PolicyName": "RA_EncryptedTicketOnly",
  "NameSpace": "Microsoft.Policies.RemoteAssistance",
  "Supported": "WindowsVista - At least Windows Vista",
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
  "File": "RPC.admx",
  "CategoryName": "Rpc",
  "PolicyName": "RpcRestrictRemoteClients",
  "NameSpace": "Microsoft.Policies.RemoteProcedureCalls",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
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
}
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
