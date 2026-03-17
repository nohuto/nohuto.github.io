---
title: 'WPBT'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-wpbt'
sidebar:
  order: 11
---

WPBT allows hardware manufacturers to run programs during Windows startup that may introduce unwanted software.
```
\Registry\Machine\SYSTEM\ControlSet001\Control\Session Manager : DisableWpbtExecution
```

> https://persistence-info.github.io/Data/wpbbin.html  
> https://github.com/Jamesits/dropWPBT
