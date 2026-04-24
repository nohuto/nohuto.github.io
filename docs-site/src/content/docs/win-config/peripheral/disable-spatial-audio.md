---
title: 'Spatial Audio'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 9
---

[Spatial audio](https://www.dolby.com/experience/home-entertainment/articles/what-is-spatial-audio/) positions sounds in 3D space around you, surround sound mainly anchors audio to speaker directions.

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/spatial.jpeg?raw=true)

---

Miscellaneous [notes](https://github.com/nohuto/regkit/blob/main/records/Audio.txt):
```json
"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Audio": {
  "DisableSpatialOnLowLatency": { "Type": "REG_DWORD", "Data": 1 }
}
```
