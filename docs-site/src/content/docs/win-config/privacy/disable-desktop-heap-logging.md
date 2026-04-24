---
title: 'Desktop Heap Logging'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 42
---

"*It is meant to log information about desktop heap usage. This can be helpful when diagnosing issues where system resources for desktop objects might be strained.*" [[*]](https://answers.microsoft.com/en-us/windows/forum/all/question-about-some-dwm-registry-settings/341cac5c-d85a-43e5-89d3-d9734f84da4e) (this isn't a verified answer, therefore can't be trusted)

```c
__int64 IsDesktopHeapLoggingOn(void)
{
  int v1 = 0; // default state
  int v4 = *(_DWORD *)(W32GetUserSessionState() + 62792);

  if ( v4 )
    v1 = 0; // fallback to the default when registry access fails
  return v1 != 0;
}
```

`DesktopHeapLogging` seems to have a fallback of `0`, but the value exists by default and is set to `1`. Means deleting it/setting it to `0` should do the same.

> [privacy/assets | rsop-IsDesktopHeapLoggingOn.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/rsop-IsDesktopHeapLoggingOn.c)
