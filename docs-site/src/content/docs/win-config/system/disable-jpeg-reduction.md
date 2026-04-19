---
title: 'JPEG Reduction'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
---

Windows reduces the quality of JPEG images you set as the desktop background to `85%` by default, you can set it to `100%` via the option switch.

### TranscodeImage

```c
if ( JPEGImportQuality not present or error )
    v54 = 85.0f;
else
    v54 = max(JPEGImportQuality, 60.0f);
    if (v54 > 100.0f)
        v54 = 100.0f;
```
Default value is `85` -> `85%` (gets used if value isn't present), clamp range is `60-100`, if set above `100` it gets clamped to `100`, if set below `60`, it gets clamped to `60`.

> [system/assets | jpeg-TranscodeImage.c](https://github.com/nohuto/win-config/blob/main/system/assets/jpeg-TranscodeImage.c)
