---
title: 'Audio Enhancements'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

Audio enhancements are software based sound processing features that change or improve how playback or microphone audio sounds on a device. In general, they are used to improve clarity, balance volume, reduce noise, boost certain frequencies, or simulate spatial/surround effects, depending on the device and driver, but they can also cause audio issues etc., which is why you may want to disable them.

Open `mmsys.cpl`, go into propeties of your used device, click on the `Advanced` tab and disable all enhancements.

```powershell
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\Render\{4bff9f8d-ead4-4ae3-962e-10358e158daf}\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},3","Type: REG_DWORD, Length: 4, Data: 0"
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\Render\{4bff9f8d-ead4-4ae3-962e-10358e158daf}\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},4","Type: REG_DWORD, Length: 4, Data: 0"
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\Capture\{6119fee4-d49c-474d-978c-0e5f9a67acb3}\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},3","Type: REG_DWORD, Length: 4, Data: 0"
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\Capture\{6119fee4-d49c-474d-978c-0e5f9a67acb3}\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},4","Type: REG_DWORD, Length: 4, Data: 0"
"HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\Capture\{6119fee4-d49c-474d-978c-0e5f9a67acb3}\FxProperties\{1da5d803-d492-4edd-8c23-e0c0ffee7f0e},5","Type: REG_DWORD, Length: 4, Data: 1"
```

## Registry Values

| Value | Meaning | Data |
| --- | --- | --- |
| `\MMDevices\Audio\{Render\|Capture}\{Endpoint}\FxProperties\{1DA5D803-D492-4EDD-8C23-E0C0FFEE7F0E},5` | Audio Enhancements / System Effects ([`PKEY_AudioEndpoint_Disable_SysFx`](https://learn.microsoft.com/en-us/windows/win32/coreaudio/pkey-audioendpoint-disable-sysfx)) | `1` = Off, `0` = On | 
| `\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},3` | Allow applications to take exclusive control | `0` = Off, `1` = On | 
| `\Properties\{b3f8fa53-0004-438e-9003-51a46e139bfc},4` | Give exclusive mode applications priority | `0` = Off, `1` = On |
