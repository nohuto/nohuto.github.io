---
title: 'Increase TDR'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

> "*TDR stands for Timeout Detection and Recovery. This is a feature of the Windows operating system which detects response problems from a graphics card, and recovers to a functional desktop by resetting the card. If the operating system does not receive a response from a graphics card within a certain amount of time (default is 2 seconds), the operating system resets the graphics card.*"
>
> — NVIDIA Docs, [Timeout Detection & Recovery](https://docs.nvidia.com/gameworks/content/developertools/desktop/timeout_detection_recovery.htm)

Disabling TDR removes a valuable layer of protection, so it is generally recommended that you keep it enabled.

### [Registry Values](https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/display/tdr-registry-keys.md)

| Registry value     | Value name           | Default data                 | Description                                                                                               |
| ------------------ | -------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| TdrLevel           | `TdrLevel`           | `3` (TdrLevelRecover)        | Controls the GPU timeout behavior. `0` = disabled, `1` = bugcheck, `2` = recover to VGA (not implemented) `3` = reset/recover (Windows default). |
| TdrDelay           | `TdrDelay`           | `2` seconds                  | Timeout threshold before Windows starts TDR handling. Longer value = GPU gets more time. |
| TdrDdiDelay        | `TdrDdiDelay`        | `5` seconds                  | Extra time for driver/user-mode threads to exit after a timeout before VIDEO_TDR_FAILURE (0x116). |
| TdrDebugMode       | `TdrDebugMode`       | `2`                          | TDR debug control: `0` break, `1` ignore, `2` recover (default), `3` always recover.                      |
| TdrLimitTime       | `TdrLimitTime`       | `60` seconds (doc) / `5` driver?                 | Time window to count repeated TDRs before forcing a crash. Works with `TdrLimitCount`.                    |
| TdrLimitCount      | `TdrLimitCount`      | `5`                          | Max number of TDRs allowed within `TdrLimitTime` before Windows stops recovering and bugchecks.           |
| TdrTestMode        | `TdrTestMode`        | -                            | Reserved/test entry, not for normal use.                                                                  |
| TdrDodPresentDelay | `TdrDodPresentDelay` | `2` seconds (min 1, max 900) | Extra time for display-only drivers to report an async present before a TDR is triggered.                 |
| TdrDodVSyncDelay   | `TdrDodVSyncDelay`   | `2` seconds (min 1, max 900) | Time the VSync watchdog waits for VSync from a display-only driver before triggering TDR.                 |

## Pseudocode Snippets

```c
if ( v0 < 0 )
{
  v13 = 3; // TdrLevel
  v8 = 2; // TdrDelay
  v9 = 2; // TdrDodPresentDelay
  v10 = 2; // TdrDodVSyncDelay
  v11 = 5; // TdrDdiDelay
  v12 = 2; // TdrDebugMode
  WdLogSingleEntry1(3LL, v0);
  WdLogGlobalForLineNumber = 2211;
}

v67 = L"TdrLimitTime";
v66 = 288;
v68 = &v15;
v6 = v15;
v7 = 3600LL;
if (v15 <= 0xE10) { // 3600
  if (v15 < 5)
    v6 = 5; // set to 5 minimum
  else
    v6 = v15;
  dword_1C015B874 = v6;
} else {
  dword_1C015B874 = 3600; // clamp max
}

if (dword_1C015B874 != v15) {
    WdLogSingleEntry2(3LL, v15, (unsigned int)dword_1C015B874);
    WdLogGlobalForLineNumber = 2387;
}
```

- [security/assets | TdrInit.c](https://github.com/nohuto/win-config/blob/main/security/assets/TdrInit.c)

## NVLDDMKM TDR

Notes to the values located in:
```
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : TdrDdiDelay
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : TdrDelay
\Registry\Machine\SYSTEM\ControlSet001\Services\nvlddmkm\Parameters : TdrLevel
```

`TdrDdiDelay` used alongside TdrDelay to determine the WDDM timeout. RM reads `TdrDdiDelay`, subtracts 1, and caps `TdrDelay` to that override. If `TdrDdiDelay` is absent, `tdrDdiOverride = 4`. `TdrDelay` shows the WDDM timeout duration (seconds). RM clamps to >= 2 and <= (TdrDdiDelay - 1), then converts to microseconds. Default when missing is `1.8` seconds. `TdrLevel` = WDDM TDR behavior (documented in CUDA WDDM code).

Note that this information is based on a 4 year old documentation and may not be accurate anymore.
