---
title: 'Network Discovery'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#disable-network-discovery'
sidebar:
  order: 4
---

"LLTDIO and Responder are network protocol drivers used for Link Layer Topology Discovery and network diagnostics. LLTDIO discovers network topology and supports QoS functions, while Responder allows the device to be identified and take part in network health assessments."

"The Link Layer Discovery Protocol (LLDP) is a vendor-neutral link layer protocol used by network devices for advertising their identity, capabilities, and neighbors on a local area network based on IEEE 802 technology, principally wired Ethernet. LLDP performs functions similar to several proprietary protocols, such as CDP, FDP, NDP and LLTD."

> https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol  
> https://gpsearch.azurewebsites.net/#1829  
> https://gpsearch.azurewebsites.net/#1830

Disable network discovery (includes LLTDIO, Rspndr, LLTD), by pasting the desired command into `powershell`:
```powershell
Set-NetFirewallRule -DisplayGroup "Network Discovery" -Enabled False -Profile Any​ # Domain​, Private, Public​
```
Get the current states with:
```powershell
Get-NetFirewallRule -DisplayGroup "Network Discovery" | Select-Object Name, Enabled, Profile
```
> https://learn.microsoft.com/en-us/powershell/module/netsecurity/set-netfirewallrule?view=windowsserver2025-ps

```powershell
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\EnableLLTDIO	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\AllowLLTDIOOnDomain	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\AllowLLTDIOOnPublicNet	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\ProhibitLLTDIOOnPrivateNet	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\EnableRspndr	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\AllowRspndrOnDomain	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\AllowRspndrOnPublicNet	Type: REG_DWORD, Length: 4, Data: 0
svchost.exe	RegSetValue	HKLM\SOFTWARE\Policies\Microsoft\Windows\LLTD\ProhibitRspndrOnPrivateNet	Type: REG_DWORD, Length: 4, Data: 0
```

Defaults on W11 LTSC IoT Enterprise:
```
Name                               Enabled        Profile
----                               -------        -------
NETDIS-UPnPHost-Out-TCP              False         Public
NETDIS-SSDPSrv-Out-UDP-Active         True        Private
NETDIS-WSDEVNT-Out-TCP-Active         True        Private
NETDIS-NB_Name-Out-UDP               False         Public
NETDIS-NB_Datagram-Out-UDP           False         Public
NETDIS-LLMNR-In-UDP                  False Domain, Public
NETDIS-DAS-In-UDP-Active              True        Private
NETDIS-SSDPSrv-In-UDP-Teredo          True         Public
NETDIS-UPnP-Out-TCP                  False Domain, Public
NETDIS-FDPHOST-In-UDP-Active          True        Private
NETDIS-WSDEVNT-In-TCP-Active          True        Private
NETDIS-UPnPHost-Out-TCP-Active        True        Private
NETDIS-WSDEVNTS-In-TCP-Active         True        Private
NETDIS-UPnPHost-In-TCP-Active         True        Private
NETDIS-NB_Name-In-UDP                False         Public
NETDIS-NB_Datagram-In-UDP-NoScope    False         Domain
NETDIS-FDRESPUB-WSD-In-UDP-Active     True        Private
NETDIS-WSDEVNTS-Out-TCP              False         Public
NETDIS-UPnPHost-Out-TCP-NoScope      False         Domain
NETDIS-WSDEVNT-In-TCP-NoScope        False         Domain
NETDIS-WSDEVNT-Out-TCP-NoScope       False         Domain
NETDIS-FDRESPUB-WSD-Out-UDP-Active    True        Private
NETDIS-LLMNR-Out-UDP                 False Domain, Public
NETDIS-WSDEVNTS-In-TCP-NoScope       False         Domain
NETDIS-SSDPSrv-In-UDP                False Domain, Public
NETDIS-DAS-In-UDP                    False Domain, Public
NETDIS-NB_Name-In-UDP-Active          True        Private
NETDIS-NB_Datagram-Out-UDP-Active     True        Private
NETDIS-NB_Datagram-In-UDP            False         Public
NETDIS-UPnPHost-In-TCP               False         Public
NETDIS-NB_Name-In-UDP-NoScope        False         Domain
NETDIS-WSDEVNTS-Out-TCP-NoScope      False         Domain
NETDIS-LLMNR-Out-UDP-Active           True        Private
NETDIS-UPnPHost-In-TCP-Teredo         True         Public
NETDIS-FDRESPUB-WSD-Out-UDP          False Domain, Public
NETDIS-SSDPSrv-In-UDP-Active          True        Private
NETDIS-LLMNR-In-UDP-Active            True        Private
NETDIS-WSDEVNT-Out-TCP               False         Public
NETDIS-WSDEVNTS-In-TCP               False         Public
NETDIS-NB_Datagram-In-UDP-Active      True        Private
NETDIS-SSDPSrv-Out-UDP               False Domain, Public
NETDIS-NB_Datagram-Out-UDP-NoScope   False         Domain
NETDIS-FDPHOST-Out-UDP               False Domain, Public
NETDIS-WSDEVNT-In-TCP                False         Public
NETDIS-UPnPHost-In-TCP-NoScope       False         Domain
NETDIS-WSDEVNTS-Out-TCP-Active        True        Private
NETDIS-FDRESPUB-WSD-In-UDP           False Domain, Public
NETDIS-FDPHOST-Out-UDP-Active         True        Private
NETDIS-FDPHOST-In-UDP                False Domain, Public
NETDIS-UPnP-Out-TCP-Active            True        Private
NETDIS-NB_Name-Out-UDP-Active         True        Private
NETDIS-NB_Name-Out-UDP-NoScope       False         Domain
```

```c
RegistryKey<unsigned char>::Initialize(
    this + 40,
    *(ADAPTER_CONTEXT**)this,
    *(((NDIS_HANDLE*)this) + 1),
    "DisableLLDP",
    0,
    1,
    0,  // default
    0,
    0
)
```
> > [network/assets | networkdisc-DataCenterBridgingConfiguration.c](https://github.com/nohuto/win-config/blob/main/network/assets/networkdisc-DataCenterBridgingConfiguration.c)

---

```json
{
"File": "LinkLayerTopologyDiscovery.admx",
"CategoryName": "LLTD_Category",
"PolicyName": "LLTD_EnableLLTDIO",
"NameSpace": "Microsoft.Policies.LinkLayerTopology",
"Supported": "WindowsVista",
"DisplayName": "Turn on Mapper I/O (LLTDIO) driver",
"ExplainText": "This policy setting changes the operational behavior of the Mapper I/O network protocol driver. LLTDIO allows a computer to discover the topology of a network it's connected to. It also allows a computer to initiate Quality-of-Service requests such as bandwidth estimation and network health analysis. If you enable this policy setting, additional options are available to fine-tune your selection. You may choose the \"Allow operation while in domain\" option to allow LLTDIO to operate on a network interface that's connected to a managed network. On the other hand, if a network interface is connected to an unmanaged network, you may choose the \"Allow operation while in public network\" and \"Prohibit operation while in private network\" options instead. If you disable or do not configure this policy setting, the default behavior of LLTDIO will apply.",
"KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LLTD"
],
"ValueName": "EnableLLTDIO",
"Elements": [
    { "Type": "Boolean", "ValueName": "AllowLLTDIOOnDomain", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "AllowLLTDIOOnPublicNet", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ProhibitLLTDIOOnPrivateNet", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
]
},
{
"File": "LinkLayerTopologyDiscovery.admx",
"CategoryName": "LLTD_Category",
"PolicyName": "LLTD_EnableRspndr",
"NameSpace": "Microsoft.Policies.LinkLayerTopology",
"Supported": "WindowsVista",
"DisplayName": "Turn on Responder (RSPNDR) driver",
"ExplainText": "This policy setting changes the operational behavior of the Responder network protocol driver. The Responder allows a computer to participate in Link Layer Topology Discovery requests so that it can be discovered and located on the network. It also allows a computer to participate in Quality-of-Service activities such as bandwidth estimation and network health analysis. If you enable this policy setting, additional options are available to fine-tune your selection. You may choose the \"Allow operation while in domain\" option to allow the Responder to operate on a network interface that's connected to a managed network. On the other hand, if a network interface is connected to an unmanaged network, you may choose the \"Allow operation while in public network\" and \"Prohibit operation while in private network\" options instead. If you disable or do not configure this policy setting, the default behavior for the Responder will apply.",
"KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\LLTD"
],
"ValueName": "EnableRspndr",
"Elements": [
    { "Type": "Boolean", "ValueName": "AllowRspndrOnDomain", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "AllowRspndrOnPublicNet", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ProhibitRspndrOnPrivateNet", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
]
},
```
