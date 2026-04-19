---
title: 'Event Logs'
description: 'Cleanup option documentation from win-config.'
editUrl: false
sidebar:
  order: 19
---

Only do this if you want to export the data elsewhere or purposely delete logs (security logs can't be recovered afterward).

Display all logs via:
```powershell
wevtutil el
```

> https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wevtutil

Command used:
```powershell
$logs = wevtutil el
foreach ($log in $logs) { wevtutil cl $log | Out-Null }
```
