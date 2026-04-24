---
title: 'Disk Write Cache Policy'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 12
---

Enables [write cache & turns off write cache buffer flushing](https://learn.microsoft.com/en-us/previous-versions/troubleshoot/windows-server/turn-disk-write-caching-on-off) on all connected disks.

```
\Registry\Machine\SYSTEM\ControlSet001\Enum\SCSI\Disk&Ven_NVMe&Prod_Samsung_SSD_990\5&33c33320&0&000000\Device Parameters\disk : CacheIsPowerProtected
\Registry\Machine\SYSTEM\ControlSet001\Enum\SCSI\Disk&Ven_NVMe&Prod_Samsung_SSD_990\5&33c33320&0&000000\Device Parameters\disk : UserWriteCacheSetting
```
