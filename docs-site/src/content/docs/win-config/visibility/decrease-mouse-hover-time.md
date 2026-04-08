---
title: 'Decrease Mouse Hover Time'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#decrease-mouse-hover-time'
sidebar:
  order: 32
---

`MouseHoverTime` controls how long the mouse must stay still over something before Windows treats it as a hover.

`MenuShowDelay` controls how long Windows waits before opening a submenu when you hover over a menu entry.

```c
v2 = a2;
if ( SystemParametersInfoW(0x6Au, 0, &g_lMenuPopupTimeout, 0) )
  goto LABEL_5;
v4 = g_lMenuPopupTimeout;
if ( g_lMenuPopupTimeout != -1 )
  goto LABEL_6;
g_lMenuPopupTimeout = 4 * GetDoubleClickTime() / 5; // fallback
if ( (int)SHRegGetStringEx(HKEY_CURRENT_USER, L"Control Panel\\Desktop", L"MenuShowDelay", 2, pszSrc, 6u) < 0 )
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

Type: `String` (`REG_SZ`) - it uses `StrToIntW` to read the value (converts a string that represents a decimal value to an integer)
Min: `0`  
Max: `65534`?
Fallback: Depends on `GetDoubleClickTime()` (`Control Panel > Mouse > Double-click speed`), which would change the `DoubleClickSpeed` value (has a default of `500`, which is why the default of `MenuShowDelay` is `400`)  
Default: `400`

```c
if ( (_DWORD)v2 == 32771 )
  goto LABEL_19;
if ( (_DWORD)v2 != 32776 )
{
  if ( (_DWORD)v2 != 32777 )
  {
    if ( (_DWORD)v2 == 32778 )
    {
      v4 = 60000;
    }
    else if ( (_DWORD)v2 == 32779 )
    {
      v4 = 2 * GetDoubleClickTime();
    }
    return SetTimer(this[2], v2, v4, 0LL);
  }
LABEL_19:
  v4 *= 2;
  if ( v4 < 2000 )
    v4 = 2000;
  return SetTimer(this[2], v2, v4, 0LL);
}
if ( ((_BYTE)this[15] & 1) == 0 )
  return 1LL;
v5 = *((_QWORD *)this[5] + 34);
if ( !v5 || (*(_BYTE *)(v5 + 72) & 1) != 0 || ((_BYTE)this[15] & 0x20) != 0 )
  return 1LL;
v4 *= 5;
if ( v4 < 2000 )
  v4 = 2000;
return SetTimer(this[2], v2, v4, 0LL);
```

Timers 32771/32777/32776 clamp the delay to >=2 seconds, so setting `MenuShowDelay` to `0` won't impact everything. Timers 32778/32779 do'nt use the registry at all.

> https://learn.microsoft.com/en-us/windows/win32/api/shlwapi/nf-shlwapi-strtointw  
> https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getdoubleclicktime
