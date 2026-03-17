---
title: 'System Logs'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#system-logs'
sidebar:
  order: 23
---

Cleans up a broad set of Windows log files (setup, component servicing, WMI, firewall, update logs, and related trace files). Use this after troubleshooting or when you want to reduce accumulated log size. This doesn't affect live event logs (see the separate Event Logs option).

Paths removed:
```c
"%WINDIR%\\*.log",
"%WINDIR%\\debug\\*.log",
"%WINDIR%\\debug\\PASSWD.LOG",
"%WINDIR%\\debug\\Setup\\UpdSh.log",
"%WINDIR%\\debug\\UserMode\\*.log",
"%WINDIR%\\Logs\\CBS",
"%WINDIR%\\Logs\\DISM",
"%WINDIR%\\Logs\\NetSetup",
"%WINDIR%\\Logs\\SIH",
"%WINDIR%\\Logs\\waasmedic",
"%WINDIR%\\Microsoft.NET\\Framework\\*\\*.log",
"%WINDIR%\\ntbtlog.txt", // bcdedit /set bootlog Yes
"%WINDIR%\\SchedLgU.txt",
"%WINDIR%\\security\\logs\\*.log",
"%WINDIR%\\security\\logs\\*.old",
"%WINDIR%\\setuplog.txt",
"%WINDIR%\\SoftwareDistribution\\*.log",
"%WINDIR%\\SoftwareDistribution\\DataStore\\Logs\\*",
"%WINDIR%\\System32\\*.log",
"%WINDIR%\\System32\\LogFiles\\setupcln",
"%WINDIR%\\System32\\LogFiles\\WMI",
"%WINDIR%\\System32\\wbem\\Logs\\*.log"
```

> https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks-run#remarks
