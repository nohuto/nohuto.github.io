---
title: 'Static IP'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#static-ip'
sidebar:
  order: 7
---

Reads the active adapter's IPv4 settings from `netsh int ip show config` and applies them directly via registry.

`IP Address` is the device's local IPv4 on your LAN.  
`Default Gateway` is your router IP used to reach other networks (internet).  
`Subnet Mask` defines which IPs are local (same subnet) vs routed via the gateway.
`DHCP` (Dynamic Host Configuration Protocol) registers and updates IP address, subnet mask, gateway, and DNS.

**Static IP requires a DNS server**. Use the `Encrypted DNS` option above to set `NameServer` for the same adapter.

A static IP is useful for devices that must keep the same address (NAS, game servers, port forwarding, monitoring agents) so clients and firewall rules always target a stable IP.

```c
"HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{5a488261-8df1-45a8-b993-34696d32773e}";
  "EnableDHCP"; // dynamic=1, static=0
  "DhcpIPAddress" = 0.0.0.0; // dynamic=present, static=absent
  "DhcpSubnetMask" = 255.0.0.0; // dynamic=present, static=absent
  "IPAddress"; // dynamic="", static="192.168.178.135"
  "SubnetMask"; // dynamic="", static="255.255.255.0"
  "DefaultGateway"; // dynamic="", static="192.168.178.1"
  "DefaultGatewayMetric"; // dynamic="", static="0"

"HKLM\\System\\CurrentControlSet\\Services\\{5A488261-8DF1-45A8-B993-34696D32773E}\\Parameters\\Tcpip";
  "EnableDHCP"; // dynamic=1, static=0
  "IPAddress"; // dynamic="192.168.178.135", static=""
  "SubnetMask"; // dynamic="255.255.255.0", static=""
  "DefaultGateway"; // dynamic="192.168.178.1", static=""
```
