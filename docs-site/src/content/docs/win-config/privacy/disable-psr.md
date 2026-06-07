---
title: 'PSR'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 54
---

> "*Steps Recorder, also known as Problems Steps Recorder (PSR) in Windows 7, is a Windows inbox program that records screenshots of the desktop along with the annotated steps while recording the activity on the screen. The screenshots and annotated text are saved to a file for later viewing.*"
>
> — Microsoft Support, [Steps Recorder deprecation](https://support.microsoft.com/en-gb/windows/steps-recorder-deprecation-a64888d7-8482-4965-8ce3-25fb004e975f)

It is a deprecated feature, as the banner shows:

![](https://github.com/nohuto/win-config/blob/main/privacy/images/psr.png?raw=true)

`PSR` = Problem Steps Recorder

```c
// SR = Steps Recorder?
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SystemSettings : SRAvailable
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off Steps Recorder](https://noverse.dev/policies?p=AppCompat*AppCompatTurnOffUserActionRecord) | `HKLM\Software\Policies\Microsoft\Windows\AppCompat` | `DisableUAR` |
