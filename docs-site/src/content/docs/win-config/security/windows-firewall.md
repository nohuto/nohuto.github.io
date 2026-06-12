---
title: 'Windows Firewall'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 1
---

[Windows Firewall](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/) is the built in host firewall, it's implemented on top of [WFP](https://learn.microsoft.com/en-us/windows/win32/fwp/about-windows-filtering-platform), which is the filtering engine.

## Rule Fields

This is just to understand the `WF.msc` table properly, and to be able to create your own rules.

`Direction`:
- `Outbound` = traffic initiated by this device going to another device/internet
- `Inbound` = unsolicited traffic arriving at this device (e.g. file sharing, remote desktop, server hosting)

`LocalPort` and `RemotePort`:
- For outbound traffic, `RemotePort` is (usually) the server port, such as `443` for HTTPS or `53` for DNS
- For inbound traffic, `LocalPort` is (usually) the listening port on this device

`LocalAddress` and `RemoteAddress`:
- `LocalAddress` is an address on this device
- `RemoteAddress` is the peer address
- `0.0.0.0` / `::` = unspecified addresses, often shown for "all IP addresses in IPv4/6 format" or when no specific remote endpoint is used
- `127.0.0.1` / `::1` = localhost loopback addresses

## Setup Guide

Start by downloading & opening [fwRules.ps1](https://github.com/nohuto/win-config/blob/main/security/assets/fwRules.ps1) since you'll have to modify it. WF adds some rules by default for network discovery/delivery optimization/troubleshooting etc., since you may not need many of them, disable them. I've already added kind of all to `$disableExistingRulePatterns`, only leaving some outbound core networking rules, means either leave it, or remove lines.

```powershell
.\fwRules.ps1 -reset
.\fwRules.ps1 -outbound # allows outbound
.\fwRules.ps1 -apply # disables matching default rules, creates $rules, blocks inbound/outbound
```

Then download [System Informer](https://github.com/winsiderss/systeminformer/releases) since that makes the setup/debugging a lot easier. Go into the '*Network*' section which shows all connections/states, find out your first few rules via it:

1. Open all kind of apps which you want to have a network connection (keep it minimal)
2. Look at the '*Network*' section to see what ports/protocols they use
3. Add them to `$rules` (I've added some examples to it already, remove them if you don't need them)

For example here you can ignore the lines with `127.0.0.1` LocalAddress, means the `$rule` for it would be (edit `Program`):

```powershell
$rules = @(
  @{ DisplayName = 'Mullvad Browser'; Direction = 'Outbound'; Action = 'Allow'; Program = '..\mullvadbrowser.exe'; Protocol = 'TCP'; RemotePort = @('443') }
)
```

![](https://github.com/nohuto/win-config/blob/main/security/images/mullvadWF.png?raw=true)

Most apps will work fine with `443` + `TCP`, games often need specific TCP RemotePorts (and obviously UDP). Spotify uses UDP once on startup, means if only allowing TCP for it, then the startup will be slower.

### Event Viewer

After finishing the parts above you might run into scenarious where apps/games won't work as a connection gets blocked. To find out what port/protocol must be added to `$rules`, enable failure logging via:

```powershell
auditpol /set /category:"System" /subcategory:"Filtering Platform Connection" /failure:enable # /failure:disable afterwards
```

Reproduce the same issue, then open `Event Viewer` and go to `Windows Logs > Security`, click on `Filter Current Log` and add event ID [`5157`](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-5157) (where `<All Event IDs>` is shown). Press `CTRL + F`, and search for the application name.

#### Overwatch Example

I didn't add RemotePort `3724` which causes server connection failures:

```powershell
@{ DisplayName = 'Overwatch TCP'; Direction = 'Outbound'; Action = 'Allow'; Program = 'C:\Program Files (x86)\Steam\steamapps\common\Overwatch\Overwatch.exe'; Protocol = 'TCP'; RemotePort = @('443', '1119') },
```

```c
The Windows Filtering Platform has blocked a connection.

Application Information:
	Process ID:		10020
	Application Name:	\device\harddiskvolume3\program files (x86)\steam\steamapps\common\overwatch\overwatch.exe

Network Information:
	Direction:		Outbound
	Source Address:		192.168.178.135
	Source Port:		64860
	Destination Address:	66.40.191.251
	Destination Port:		3724 // RemotePort
	Protocol:		6 // TCP, see table below
	Interface Index:		5
```

Here we can see that we've to allow RemotePort `3724` (outbound, TCP):

```powershell
@{ DisplayName = 'Overwatch TCP'; Direction = 'Outbound'; Action = 'Allow'; Program = 'C:\Program Files (x86)\Steam\steamapps\common\Overwatch\Overwatch.exe'; Protocol = 'TCP'; RemotePort = @('443', '3724', '1119') },
```

#### Protocol Number

| Service | Protocol Number |
| --- | --- |
| Internet Control Message Protocol (ICMP) | 1 |
| Transmission Control Protocol (TCP) | 6 |
| User Datagram Protocol (UDP) | 17 |
| General Routing Encapsulation (PPTP data over GRE) | 47 |
| Authentication Header (AH) IPSec | 51 |
| Encapsulation Security Payload (ESP) IPSec | 50 |
| Exterior Gateway Protocol (EGP) | 8 |
| Gateway-Gateway Protocol (GGP) | 3 |
| Host Monitoring Protocol (HMP) | 20 |
| Internet Group Management Protocol (IGMP) | 88 |
| MIT Remote Virtual Disk (RVD) | 66 |
| OSPF Open Shortest Path First | 89 |
| PARC Universal Packet Protocol (PUP) | 12 |
| Reliable Datagram Protocol (RDP) | 27 |
| Reservation Protocol (RSVP) QoS | 46 |

### svchost

`svchost.exe` hosts many services, means rather don't add a `svchost.exe` allow rule without a specific service. If blocking all outbound connections for svchost, things like WU/Defender (cloud etc.) won't work anymore. I've added a `svchost HTTP/S` rule to the script which allows all traffic (disabled by default), means whenever you want to download updates, enable that rule for a short time.

```powershell
@{ DisplayName = 'svchost HTTP/S'; Direction = 'Outbound'; Action = 'Allow'; Program = '%SystemRoot%\System32\svchost.exe'; Protocol = 'TCP'; RemotePort = @('80', '443'); Enabled = 'False' }
```

The script allows `CryptSvc` on port `80`, that service is used for certificate validation and more, rather leave it in there.

### Encrypted DNS

Add a service rule for the DNS Client (`Dnscache`), DoH = 443, DoT = 853, example for Mullvad DNS:

```powershell
@{ DisplayName = 'DNS Client DoH'; Direction = 'Outbound'; Action = 'Allow'; Program = '%SystemRoot%\System32\svchost.exe'; Service = 'Dnscache'; Protocol = 'TCP'; RemotePort = @('443'); RemoteAddress = @('194.242.2.3') }
```

If not using DoH/DoT or unencrypted DNS/ISP DNS:

```powershell
@{ DisplayName = 'DNS Client'; Direction = 'Outbound'; Action = 'Allow'; Program = '%SystemRoot%\System32\svchost.exe'; Service = 'Dnscache'; Protocol = 'UDP'; RemotePort = @('53')<#; RemoteAddress = @('')#> },
@{ DisplayName = 'DNS Client TCP'; Direction = 'Outbound'; Action = 'Allow'; Program = '%SystemRoot%\System32\svchost.exe'; Service = 'Dnscache'; Protocol = 'TCP'; RemotePort = @('53')<#; RemoteAddress = @('')#> }
```

## Firewall Captures

```c
// {profile} = always 'DomainProfile'/'StandardProfile'/'PublicProfile'

// Firewall state - 0 = Off, 1 = On
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\EnableFirewall	Type: REG_DWORD

// Inbound connections - 0 = Allow, 1 = Block
// 'Block all connections' - DefaultInboundAction = 1 & DoNotAllowExceptions = 1 (DoNotAllowExceptions gets deleted otherwise)
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\DefaultInboundAction
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\DoNotAllowExceptions	

// Outbound connections - 0 = Allow, 1 = Block
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\DefaultOutboundAction	Type: REG_DWORD

// --- Settings ---

// Display a notification - 0 = On, 1 = Off
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\DisableNotifications	Type: REG_DWORD

// Allow unicast response - 0 = On, 1 = Off
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\DisableUnicastResponsesToMulticastBroadcast	Type: REG_DWORD

// --- Logging ---

// Name
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\Logging\LogFilePath	Type: REG_SZ

// Size limit (KB) - Data: 4096 = 4,096KB
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\Logging\LogFileSize	Type: REG_DWORD

// Log dropped packets - 0 = Off, 1 = On
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\Logging\LogDroppedPackets	Type: REG_DWORD

// Log successful connections - 0 = Off, 1 = On 
HKLM\System\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\{profile}\Logging\LogSuccessfulConnections	Type: REG_DWORD
```

## Firewall Service

Disabling the firewall service (`Disable Services/Driver`) can break:
- Microsoft Store & UWP apps
- `winget` / app deployment
- Windows Sandbox
- Xbox networking
- Start menu
- Modern applications can fail to install or update
- Activation of Windows via phone
- Application or OS incompatibilities that depend on Windows Firewall

The proper method to disable the Windows Firewall is to disable the Windows Firewall Profiles and leave the service running.
