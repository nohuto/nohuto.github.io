---
title: 'Reduce Shutdown Time'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 15
---

Forces hung apps and services to terminate faster.

```
\Registry\Machine\SYSTEM\ControlSet001\Control : WaitToKillServiceTimeout
\Registry\User\S-ID\Control Panel\Desktop : WaitToKillTimeout
\Registry\User\S-ID\Control Panel\Desktop : HungAppTimeout
\Registry\User\S-ID\Control Panel\Desktop : AutoEndTasks
```
`HungAppTimeout`-> `1500` (`1.5` sec; default is `5` sec)
`WaitToKillTimeout`-> `2500` (`2.5` sec)
`WaitToKillServiceTimeout`-> `2500` (`2.5` sec; default is `5` sec)
`WaitToKillAppTimeout` seems to not be used anymore (would have a default of `20000` (`20` sec))

More timeout related values located in `HKCU\Control Panel\Desktop`: `CriticalAppShutdownCleanupTimeout`, `CriticalAppShutdownTimeout`, `QuickResolverTimeout`, `ActiveWndTrkTimeout`, `CaretTimeout`, `ForegroundLockTimeout`, `LowLevelHooksTimeout`. I may add information about some of them soon.
