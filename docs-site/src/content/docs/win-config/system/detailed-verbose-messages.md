---
title: 'Detailed Verbose Messages'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

Enables detailed messages at restart, shut down, sign out, and sign in, which can be helpful.

> "*If verbose logging isn't enabled, you'll still receive normal status messages such as "Applying your personal settings..." or "Applying computer settings..." when you start up, shut down, log on, or log off from the computer. However, if verbose logging is enabled, you'll receive additional information, such as "RPCSS is starting" or "Waiting for machine group policies to finish....".*"
>
> — Microsoft, [Verbose startup, shutdown, logon, and logoff status messages](https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/enable-verbose-startup-shutdown-logon-logoff-status-messages)

> "*This policy setting directs the system to display highly detailed status messages.This policy setting is designed for advanced users who require this information.If you enable this policy setting, the system displays status messages that reflect each step in the process of starting, shutting down, logging on, or logging off the system. If you disable or do not configure this policy setting, only the default status messages are displayed to the user during these processes. Note: This policy setting is ignored if the \"Remove Boot/Shutdown/Logon/Logoff status messages" policy setting is enabled.*"
>
> — Windows Security Encyclopedia, [Display highly detailed status messages](https://www.windows-security.org/b74176eebf20a72c6e9cf193ddcedeb7/display-highly-detailed-status-messages)

## Windows Policies

```json
{
  "File": "Logon.admx",
  "CategoryName": "System",
  "PolicyName": "VerboseStatus",
  "NameSpace": "Microsoft.Policies.WindowsLogon",
  "Supported": "Win2k",
  "DisplayName": "Display highly detailed status messages",
  "ExplainText": "This policy setting directs the system to display highly detailed status messages. This policy setting is designed for advanced users who require this information. If you enable this policy setting, the system displays status messages that reflect each step in the process of starting, shutting down, logging on, or logging off the system. If you disable or do not configure this policy setting, only the default status messages are displayed to the user during these processes. Note: This policy setting is ignored if the \"\"Remove Boot/Shutdown/Logon/Logoff status messages\"\" policy setting is enabled.",
  "KeyPath": [
    "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "ValueName": "VerboseStatus",
  "Elements": []
},
```
