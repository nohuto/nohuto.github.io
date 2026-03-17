---
title: 'Audio / Video Preview'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#disable-audio--video-preview'
sidebar:
  order: 7
---

Disables the preview function for (extensions):
```
3gp aac avi flac m4a m4v mkv mod mov mp3 mp4 mpeg mpg ogg ts vob wav webm wma wmv
```
`{E357FCCD-A995-4576-B01F-234630154E96}` - Thumbnail Provider (Thumbnail image handler)
`{BB2E617C-0920-11D1-9A0B-00C04FC2D6C1}` - Extract Image (Image handler)
`{9DBD2C50-62AD-11D0-B806-00C04FD706EC}` - Default shell extension handler for thumbnails
> https://learn.microsoft.com/en-us/windows/win32/shell/handlers#handler-names  
> https://learn.microsoft.com/en-us/windows/win32/api/thumbcache/nn-thumbcache-ithumbnailprovider  
> https://learn.microsoft.com/en-us/windows/win32/api/shobjidl_core/nn-shobjidl_core-iextractimage

Enabled:

![](https://github.com/nohuto/win-config/blob/main/visibility/images/audiovidpreon.png?raw=true)

Disabled:

![](https://github.com/nohuto/win-config/blob/main/visibility/images/audiovidpreonoff.png?raw=true)

---

Hide preview pane:
```powershell
"Explorer.EXE","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Modules\GlobalSettings\Sizer\DetailsContainerSizer","Type: REG_BINARY, Length: 16, Data: 15 01 00 00 00 00 00 00 00 00 00 00 6B 03 00 00"
"Explorer.EXE","RegSetValue","HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Modules\GlobalSettings\DetailsContainer\DetailsContainer","Type: REG_BINARY, Length: 8, Data: 02 00 00 00 02 00 00 00"
```
