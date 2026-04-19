---
title: 'Audio Execution Power Requests'
description: 'Power option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/power/desc.md#disable-audio-execution-power-requests'
sidebar:
  order: 15
---

There's no official documentation on this value, but it probably controls whether audio activity can trigger power execution requests, reducing the responsiveness of the system to power management events, maybe ending up with less efficient power usage or preventing certain power related actions from being triggered.

```c
// Allowed by default
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "AllowAudioToEnableExecutionRequiredPowerRequests" = 1; // PopPowerRequestActiveAudioEnablesExecutionRequired 
```

> https://www.noverse.dev/docs/win-config/power/power-values/#registry-values-details

```c
bool PopPowerRequestEvaluateExecutionRequiredStatus()
{
  char v0; // r8

  v0 = 0;
  if ( PopExecutionRequiredTimeout )
    return !byte_140F0D173
        || PopPowerRequestActiveAudioEnablesExecutionRequired && byte_140F0D172
        || byte_140F0D171
        || MEMORY[0xFFFFF78000000008] - qword_140F0D178 < 10000000
                                                        * (unsigned __int64)(unsigned int)PopExecutionRequiredTimeout;
  return v0;
}
```
