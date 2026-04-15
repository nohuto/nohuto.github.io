---
title: 'Windows Firewall'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#windows-firewall'
sidebar:
  order: 3
---

"*Windows Firewall is a security feature that helps to protect your device by filtering network traffic that enters and exits your device. This traffic can be filtered based on several criteria, including source and destination IP address, IP protocol, or source and destination port number. Windows Firewall can be configured to block or allow network traffic based on the services and applications that are installed on your device. This allows you to restrict network traffic to only those applications and services that are explicitly allowed to communicate on the network.*" ([*](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/))

## Inbound vs Outbound

- **Inbound**: traffic initiated elsewhere that comes into your PC, like file sharing, hosted game sessions, or Remote Desktop.
- **Outbound**: traffic initiated by your PC going to another device or the internet, like web browsing, app updates, or apps connecting to their servers.

## Firewall Presets

The option currently includes 4 different presets, note that `Allowlist Mode` will need rules that you've to add. 

It's recommended to allow outbound, **look at the network section in system informer**, afterwards adding rules for programs that require network outbound access.

Make sure that you're looking at your local IP address (`192.168.x.x`), not at loopback addresses (`127.0.0.1`), these don't access the network and are local traffic.

On first use kind of everything get's blocked -> minimalfirewall asks you to block/allow it. This continues until every required rule is set.

- `Off`: firewall disabled
- `Default`: inbound block, outbound allow
- `Allowlist`: inbound block, outbound block unless allowed (recommended, but requires time to set up)

## Firewall Captures

```c
// {profile} = always 'DomainProfile' + 'StandardProfile' + 'PublicProfile'

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

"The proper method to disable the Windows Firewall is to disable the Windows Firewall Profiles and leave the service running."
