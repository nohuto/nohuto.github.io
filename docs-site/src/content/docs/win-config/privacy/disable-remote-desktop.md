---
title: 'Remote Desktop'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 23
---

Disables remote desktop, remote assistance, RPC traffic, and device redirection. See [remote desktop FAQs](https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-pc-connections-faq) for more information & [Terminal-Server.txt](https://github.com/nohuto/regkit/blob/main/records/Terminal-Server.txt) for a list of read values on boot (`\Registry\Machine\SYSTEM\ControlSet001\Control\Terminal Server\*` key).

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Configure Solicited Remote Assistance](https://noverse.dev/policies?p=RemoteAssistance*RA_Solicit) | `HKLM\Software\policies\Microsoft\Windows NT\Terminal Services` | `fAllowToGetHelp`<br>`fAllowFullControl` |
| [Configure Offer Remote Assistance](https://noverse.dev/policies?p=RemoteAssistance*RA_Unsolicit) | `HKLM\Software\policies\Microsoft\Windows NT\Terminal Services` | `fAllowUnsolicited`<br>`fAllowUnsolicitedFullControl` |
| [Turn on session logging](https://noverse.dev/policies?p=RemoteAssistance*RA_Logging) | `HKLM\Software\policies\Microsoft\Windows NT\Terminal Services` | `LoggingEnabled` |
| [Allow only Windows Vista or later connections](https://noverse.dev/policies?p=RemoteAssistance*RA_EncryptedTicketOnly) | `HKLM\Software\policies\Microsoft\Windows NT\Terminal Services` | `CreateEncryptedOnlyTickets` |
| [Restrict Unauthenticated RPC clients](https://noverse.dev/policies?p=RPC*RpcRestrictRemoteClients) | `HKLM\Software\Policies\Microsoft\Windows NT\Rpc` | `RestrictRemoteClients` |
| [Don't allow this PC to be projected to](https://noverse.dev/policies?p=WirelessDisplay*AllowProjectionToPC) | `HKLM\Software\Policies\Microsoft\Windows\Connect` | `AllowProjectionToPC` |
| [Require pin for pairing](https://noverse.dev/policies?p=WirelessDisplay*RequirePinForPairing) | `HKLM\Software\Policies\Microsoft\Windows\Connect` | `RequirePinForPairing` |
