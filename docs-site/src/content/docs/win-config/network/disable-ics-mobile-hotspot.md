---
title: 'ICS / Mobile Hotspot'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
---

Disables Internet Connection Sharing (ICS), which lets Windows use one network adapter as the public/uplink interface and another as the private/downlink interface. In full mode, ICS turns the PC into a small gateway for other devices by providing NAT and local network services such as addressing through DHCP and name resolution on the private side.

When disabled, the PC can no longer share its internet connection to other devices through the connection Sharing tab / ICS UI, and ICS backed gateway scenarios such as adapter-to-adapter internet sharing or related hotspot-style sharing cannot use the SharedAccess service. ICS is only available when two or more network connections are present.

| Service/Driver | Description |
| --- | --- |
| `icssvc` | Provides the ability to share a cellular data connection with another device. |
| `ALG` | Provides support for 3rd party protocol plug-ins for Internet Connection Sharing |
| `SharedAccess` | Provides network address translation, addressing, name resolution and/or intrusion prevention services for a home or small office network. |

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
  {
    "File": "NetworkConnections.admx",
    "CategoryName": "NetworkConnections",
    "PolicyName": "NC_ShowSharedAccessUI",
    "NameSpace": "Microsoft.Policies.NetworkConnections",
    "Supported": "WindowsXP - At least Windows Server 2003 operating systems or Windows XP Professional",
    "DisplayName": "Prohibit use of Internet Connection Sharing on your DNS domain network",
    "ExplainText": "Determines whether administrators can enable and configure the Internet Connection Sharing (ICS) feature of an Internet connection and if the ICS service can run on the computer. ICS lets administrators configure their system as an Internet gateway for a small network and provides network services, such as name resolution and addressing through DHCP, to the local private network. If you enable this setting, ICS cannot be enabled or configured by administrators, and the ICS service cannot run on the computer. The Advanced tab in the Properties dialog box for a LAN or remote access connection is removed. The Internet Connection Sharing page is removed from the New Connection Wizard. The Network Setup Wizard is disabled. If you disable this setting or do not configure it and have two or more connections, administrators can enable ICS. The Advanced tab in the properties dialog box for a LAN or remote access connection is available. In addition, the user is presented with the option to enable Internet Connection Sharing in the Network Setup Wizard and Make New Connection Wizard. (The Network Setup Wizard is available only in Windows XP Professional.) By default, ICS is disabled when you create a remote access connection, but administrators can use the Advanced tab to enable it. When running the New Connection Wizard or Network Setup Wizard, administrators can choose to enable ICS. Note: Internet Connection Sharing is only available when two or more network connections are present. Note: When the \"Prohibit access to properties of a LAN connection,\" \"Ability to change properties of an all user remote access connection,\" or \"Prohibit changing properties of a private remote access connection\" settings are set to deny access to the Connection Properties dialog box, the Advanced tab for the connection is blocked. Note: Nonadministrators are already prohibited from configuring Internet Connection Sharing, regardless of this setting. Note: Disabling this setting does not prevent Wireless Hosted Networking from using the ICS service for DHCP services. To prevent the ICS service from running, on the Network Permissions tab in the network's policy properties, select the \"Don't use hosted networks\" check box.",
    "KeyPath": [
      "HKLM\\Software\\Policies\\Microsoft\\Windows\\Network Connections"
    ],
    "ValueName": "NC_ShowSharedAccessUI",
    "Elements": [
      { "Type": "EnabledValue", "Data": "0" },
      { "Type": "DisabledValue", "Data": "1" }
    ]
  },
```
