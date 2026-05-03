---
title: 'Timestamp Interval'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 23
---

Disables the interval at which reliability events are timestamped (will not log regular timestamped reliability events).

```c
if ( !RegQueryValueExW(hKey[0], "TimeStampEnabled", 0LL, 0LL, (LPBYTE)&Data, &cbData) )
if ( !RegQueryValueExW(hKey[0], "TimeStampInterval", 0LL, 0LL, (LPBYTE)&v4, &cbData) && v4 <= 0x15180 ) // 86400 seconds = 24h?
```
`TimeStampInterval` has a max value of `86400` dec = 24h, `TimeStampEnabled` can probably be set to `0`/`1`.

```
\Registry\Machine\SOFTWARE\Microsoft\Windows\CurrentVersion\Reliability : TimeStampInterval
```
Only this path gets read, `TimeStampEnabled` doesn't get read?

- [system/assets | timestamp-OsEventsTimestampInterval.c](https://github.com/nohuto/win-config/blob/main/system/assets/timestamp-OsEventsTimestampInterval.c)
