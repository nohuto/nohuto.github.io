---
title: 'Active Probing'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

### Active Probing

Active probing sends HTTP requests from the client to a predefined web probe server (by default `www.msftconnecttest.com/connecttest.txt`), using both IPv4 and IPv6 in parallel. If it gets an HTTP 200 response with the expected payload, NCSI marks the interface as having internet connectivity, if the probe fails or returns errors (for example, blocked by a proxy or DNS issues), NCSI treats connectivity as limited. See [NCSI FAQs](https://learn.microsoft.com/en-us/windows-server/networking/ncsi/ncsi-frequently-asked-questions) for more information.

### Passive Probing

Passive probing doesn't send its own traffic, it inspects received packets and uses their hop count to infer connectivity. If the measured hop count for an interface meets or exceeds a system minimum (default 8, often changed to 3 in enterprises), NCSI upgrades the interface to "internet" and suppresses further active probes until conditions change, if the hop count is too low, missing, or there's no route to the internet, and no successful active probe has occurred, connectivity is treated as local-only. Passive probes run periodically (every 15 seconds by default) when allowed by Group Policy and when a user has recently logged on, and they serve to keep connectivity status accurate, especially with intermittent network issues.

Disabling passive probing will break the network icon, causing for example spotify to be in offline mode.

See links below for a detailed documentation.

## [Network Icon Meaning](https://learn.microsoft.com/en-us/windows-server/networking/ncsi/ncsi-overview)

|Icon|Description|
|--|--|
|![](https://github.com/MicrosoftDocs/windowsserverdocs/blob/main/WindowsServerDocs/networking/media/ncsi/ncsi-overview/ncsi-icon-connected-wired.jpg?raw=true)| Connected (Wired) |
|![](https://github.com/MicrosoftDocs/windowsserverdocs/blob/main/WindowsServerDocs/networking/media/ncsi/ncsi-overview/ncsi-icon-connected-wireless.jpg?raw=true)| Connected (Wireless) |
|![](https://github.com/MicrosoftDocs/windowsserverdocs/blob/main/WindowsServerDocs/networking/media/ncsi/ncsi-overview/ncsi-icon-connected-no-internet.jpg?raw=true)| Connected (No internet) |

`PassivePollPeriod` is set to `15` by default = Runs passive probe every 15 seconds. `MaxActiveProbes` to `0` (unlimited) = breaks connection status. If disabling active probes, but leaving passive probes enabled, enable `Enable Passive Mode`.

- [network/assets | probing-NcsiConfigData.c](https://github.com/nohuto/win-config/blob/main/network/assets/probing-NcsiConfigData.c)

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "NoActiveProbe",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsVista - At least Windows Vista",
  "DisplayName": "Turn off Windows Network Connectivity Status Indicator active tests",
  "ExplainText": "This policy setting turns off the active tests performed by the Windows Network Connectivity Status Indicator (NCSI) to determine whether your computer is connected to the Internet or to a more limited network. As part of determining the connectivity level, NCSI performs one of two active tests: downloading a page from a dedicated Web server or making a DNS request for a dedicated address. If you enable this policy setting, NCSI does not run either of the two active tests. This may reduce the ability of NCSI, and of other components that use NCSI, to determine Internet access. If you disable or do not configure this policy setting, NCSI runs one of the two active tests.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetworkConnectivityStatusIndicator"
  ],
  "ValueName": "NoActiveProbe",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "NCSI.admx",
  "CategoryName": "NCSI_Category",
  "PolicyName": "NCSI_PassivePolling",
  "NameSpace": "Microsoft.Policies.NCSI",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Specify passive polling",
  "ExplainText": "This Policy setting enables you to specify passive polling behavior. NCSI polls various measurements throughout the network stack on a frequent interval to determine if network connectivity has been lost. Use the options to control the passive polling behavior.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\NetworkConnectivityStatusIndicator"
  ],
  "Elements": [
    { "Type": "Boolean", "ValueName": "DisablePassivePolling", "TrueValue": "1", "FalseValue": "0" }
  ]
},
{
  "File": "nca.admx",
  "CategoryName": "NetworkConnectivityAssistant",
  "PolicyName": "PassiveMode",
  "NameSpace": "Microsoft.Policies.NetworkConnectivityAssistant",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "DirectAccess Passive Mode",
  "ExplainText": "Specifies whether NCA service runs in Passive Mode or not. Set this to Disabled to keep NCA probing actively all the time. If this setting is not configured, NCA probing is in active mode by default.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\NetworkConnectivityAssistant"
  ],
  "ValueName": "PassiveMode",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
