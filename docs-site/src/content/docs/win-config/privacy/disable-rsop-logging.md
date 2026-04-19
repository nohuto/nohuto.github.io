---
title: 'RSoP Logging'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-rsop-logging'
sidebar:
  order: 41
---

"This setting allows you to enable or disable Resultant Set of Policy (RSoP) logging on a client computer.RSoP logs information on Group Policy settings that have been applied to the client. This information includes details such as which Group Policy Objects (GPO) were applied where they came from and the client-side extension settings that were included.If you enable this setting RSoP logging is turned off.If you disable or do not configure this setting RSoP logging is turned on. By default RSoP logging is always on.Note: To view the RSoP information logged on a client computer you can use the RSoP snap-in in the Microsoft Management Console (MMC)."

> https://www.windows-security.org/370c915e44b6a75efac0d24669aa9434/turn-off-resultant-set-of-policy-logging

```
\Registry\Machine\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon : RsopLogging
\Registry\Machine\SOFTWARE\Policies\Microsoft\Windows\SYSTEM : RsopLogging
```

> https://learn.microsoft.com/en-us/previous-versions/windows/desktop/Policy/developing-an-rsop-management-tool
