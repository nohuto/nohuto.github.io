---
title: 'Mouse Hover Time'
description: 'Visibility option documentation from win-config.'
editUrl: false
sidebar:
  order: 13
---

`MouseHoverTime` controls how long the mouse must stay still over something before Windows treats it as a hover.

`MenuShowDelay` controls the menu hover delay, mainly how long shell menus wait before opening a submenu while the pointer is on a menu entry.

## CMenuToolbarBase::_SetTimer

[`SPI_GETMENUSHOWDELAY`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfoa):
> "*Retrieves the time, in milliseconds, that the system waits before displaying a shortcut menu when the mouse cursor is over a submenu item. The pvParam parameter must point to a DWORD variable that receives the time of the delay.*"

```c
if ( SystemParametersInfoW(0x6Au, 0, &g_lMenuPopupTimeout, 0) ) // 0x6A = SPI_GETMENUSHOWDELAY
  goto LABEL_5;
v4 = g_lMenuPopupTimeout;
if ( g_lMenuPopupTimeout != -1 )
  goto LABEL_6;
g_lMenuPopupTimeout = 4 * GetDoubleClickTime() / 5; // fallback (depends on DoubleClickSpeed)
if ( SHRegGetStringEx(HKEY_CURRENT_USER, L"Control Panel\\Desktop", L"MenuShowDelay", 2u, pszSrc, 6u) < 0 ) // 2u = REG_SZ
{
LABEL_5:
  v4 = g_lMenuPopupTimeout;
}
else
{
  v4 = StrToIntW(pszSrc);
  g_lMenuPopupTimeout = v4;
}
```

It first uses [`SystemParametersInfoW(SPI_GETMENUSHOWDELAY)`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfoa), so the registry value is normally used through the API. If that API fails and no cached value exists, it falls back to `4 * GetDoubleClickTime() / 5`, means the fallback depends on the current double click speed (`HKCU\Control Panel\Mouse\DoubleClickSpeed`). By default it's set to `500 ms` = fallback becomes `400 ms`.

```c
if ( (_DWORD)v2 == 32771 )
  goto LABEL_19;
if ( (_DWORD)v2 != 32776 )
{
  if ( (_DWORD)v2 != 32777 )
  {
    if ( (_DWORD)v2 == 32778 )
    {
      v4 = 60000; // fixed 60 seconds
    }
    else if ( (_DWORD)v2 == 32779 )
    {
      v4 = 2 * GetDoubleClickTime(); // ignores MenuShowDelay
    }
    return SetTimer(this[2], v2, v4, 0LL); // v4 = uElapse
  }
LABEL_19:
  v4 *= 2;
  if ( v4 < 2000 )
    v4 = 2000;
  return SetTimer(this[2], v2, v4, 0LL); // v4 = uElapse
}
if ( ((_BYTE)this[15] & 1) == 0 )
  return 1LL;
v5 = *((_QWORD *)this[5] + 34);
if ( !v5 || (*(_BYTE *)(v5 + 72) & 1) != 0 || ((_BYTE)this[15] & 0x20) != 0 )
  return 1LL;
v4 *= 5;
if ( v4 < 2000 )
  v4 = 2000;
return SetTimer(this[2], v2, v4, 0LL); // v4 = uElapse
```

`v4` is the final value passed to [`SetTimer`](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-settimer) as `uElapse`, which can be used as maximum I guess (as the part above doesn't show any max clamp) values below `USER_TIMER_MINIMUM` (`10 ms`) are increased to `10 ms`, values above `USER_TIMER_MAXIMUM` (`0x7FFFFFFF`, `~24.8 days`) are lowered to that maximum. Obviously, that's just my current interpretation, and I don't claim that it's the truth.

The normal menu hover timers use `MenuShowDelay`, some menu timers ignore or extend it, `32771` & `32777` use at least `2 seconds`, `32776` can use at least `2 seconds` after multiplying the value by `5`, `32778` is fixed to `60 seconds`, `32779` uses double click time instead.
