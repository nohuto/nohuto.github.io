---
title: 'NetBIOS/mDNS/LLMNR'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

"`NetbiosOptions` specifies the configurable security settings for the NetBIOS service and determines the mode of operation for NetBIOS over TCP/IP on the parent interface."

Enabling the option includes disabling `LMHOSTS Lookups` - "LMHOSTS is a local text file Windows uses to map NetBIOS names to IPs when other NetBIOS methods (WINS, broadcast) don't give an answer. It lives in C:\Windows\System32\drivers\etc, there's an `lmhosts.sam` example, and it's checked only if `Enable LMHOSTS lookup` is on."

> https://en.wikipedia.org/wiki/LMHOSTS  
> https://github.com/nohuto/regkit/blob/main/records/NetBT.txt

`NetbiosOptions`:

| Value | Description                                                                                 |
| ----- | ------------------------------------------------------------------------------------------- |
| 0     | Specifies that the Dynamic Host Configuration Protocol (DHCP) setting is used if available. |
| 1     | Specifies that NetBIOS is enabled. This is the default value if DHCP is not available.      |
| 2     | Specifies that NetBIOS is disabled.                                                         |

Disabling `NetbiosOptions` via network center:
```powershell
RegSetValue	HKLM\System\CurrentControlSet\Services\NetBT\Parameters\Interfaces\Tcpip_{58f1d738-585f-40e2-aa37-39937f740875}\NetbiosOptions	Type: REG_DWORD, Length: 4, Data: 2
```

## Protocols Notes

| Protocol | Purpose | How it works | Notes |
| -------- | ------- | ------------ | ----- |
| LLMNR (Link-Local Multicast Name Resolution) | Local name resolution when DNS isn't available | Sends multicast queries on the local link (IPv4 224.0.0.252, UDP 5355) asking "who has this name?", hosts that own the name reply | Windows-specific legacy fallback, vulnerable to spoofing/poisoning |
| mDNS (Multicast DNS) | Zero-config service/host discovery on local networks (e.g. printer.local) | Uses multicast to 224.0.0.251 (IPv6 ff02::fb) on UDP 5353, devices answer for their own .local names | Cross-platform (Apple Bonjour, now Windows), modern replacement for LLMNR in many cases |
| NetBIOS over TCP/IP | Legacy Windows naming, service announcement and sessions | Uses broadcasts or WINS to resolve NetBIOS names, historically used by SMB/Windows networking | Very old, chatty, bigger attack surface, kept for backward compatibility |

> https://en.wikipedia.org/wiki/Link-Local_Multicast_Name_Resolution  
> https://en.wikipedia.org/wiki/Multicast_DNS  
> https://en.wikipedia.org/wiki/NetBIOS  

## Windows Policies

```json
{
  "File": "DnsClient.admx",
  "CategoryName": "DNS_Client",
  "PolicyName": "DNS_MDNS",
  "NameSpace": "Microsoft.Policies.DNSClient",
  "Supported": "Windows_10_0_RS2",
  "DisplayName": "Configure multicast DNS (mDNS) protocol",
  "ExplainText": "Specifies if the DNS client will perform name resolution over mDNS. If you enable this policy, the DNS client will use mDNS protocol. If you disable this policy setting, or if you do not configure this policy setting, the DNS client will use locally configured settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient"
  ],
  "ValueName": "EnableMDNS",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DnsClient.admx",
  "CategoryName": "DNS_Client",
  "PolicyName": "DNS_SmartMultiHomedNameResolution",
  "NameSpace": "Microsoft.Policies.DNSClient",
  "Supported": "Windows8",
  "DisplayName": "Turn off smart multi-homed name resolution",
  "ExplainText": "Specifies that a multi-homed DNS client should optimize name resolution across networks. The setting improves performance by issuing parallel DNS, link local multicast name resolution (LLMNR) and NetBIOS over TCP/IP (NetBT) queries across all networks. In the event that multiple positive responses are received, the network binding order is used to determine which response to accept. If you enable this policy setting, the DNS client will not perform any optimizations. DNS queries will be issued across all networks first. LLMNR queries will be issued if the DNS queries fail, followed by NetBT queries if LLMNR queries fail. If you disable this policy setting, or if you do not configure this policy setting, name resolution will be optimized when issuing DNS, LLMNR and NetBT queries.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient"
  ],
  "ValueName": "DisableSmartNameResolution",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DnsClient.admx",
  "CategoryName": "DNS_Client",
  "PolicyName": "DNS_Netbios",
  "NameSpace": "Microsoft.Policies.DNSClient",
  "Supported": "WindowsVista",
  "DisplayName": "Configure NetBIOS settings",
  "ExplainText": "Specifies if the DNS client will perform name resolution over NetBIOS. By default, the DNS client will disable NetBIOS name resolution on public networks for security reasons. To use this policy setting, click Enabled, and then select one of the following options from the drop-down list: Disable NetBIOS name resolution: Never allow NetBIOS name resolution. Allow NetBIOS name resolution: Always allow NetBIOS name resolution. Disable NetBIOS name resolution on public networks: Only allow NetBIOS name resolution on network adapters which are not connected to public networks. NetBIOS learning mode: Always allow NetBIOS name resolution and use it as a fallback after mDNS/LLMNR queries fail. If you disable this policy setting, or if you do not configure this policy setting, the DNS client will use locally configured settings.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "EnableNetbios", "Items": [
        { "DisplayName": "Disable NetBIOS name resolution", "Data": "0" },
        { "DisplayName": "Allow NetBIOS name resolution", "Data": "1" },
        { "DisplayName": "Disable NetBIOS name resolution on public networks", "Data": "2" },
        { "DisplayName": "NetBIOS learning mode", "Data": "3" }
      ]
    }
  ]
},
{
  "File": "DnsClient.admx",
  "CategoryName": "DNS_Client",
  "PolicyName": "Turn_Off_Multicast",
  "NameSpace": "Microsoft.Policies.DNSClient",
  "Supported": "WindowsVista",
  "DisplayName": "Turn off multicast name resolution",
  "ExplainText": "Specifies that link local multicast name resolution (LLMNR) is disabled on the DNS client. LLMNR is a secondary name resolution protocol. With LLMNR, queries are sent using multicast over a local network link on a single subnet from a DNS client to another DNS client on the same subnet that also has LLMNR enabled. LLMNR does not require a DNS server or DNS client configuration, and provides name resolution in scenarios in which conventional DNS name resolution is not possible. If you enable this policy setting, LLMNR will be disabled on all available network adapters on the DNS client. If you disable this policy setting, or you do not configure this policy setting, LLMNR will be enabled on all available network adapters.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient"
  ],
  "ValueName": "EnableMulticast",
  "Elements": [
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
```
