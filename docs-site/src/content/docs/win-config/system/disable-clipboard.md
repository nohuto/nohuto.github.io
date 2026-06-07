---
title: 'Clipboard'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 31
---

If you copy or cut something it gets stored to your clipboard.

Miscellaneous notes:
```c 
"HKLM\SOFTWARE\Microsoft\Clipboard\ClipboardSvcDebugWaitInSec","Length: 16"
"HKLM\SOFTWARE\Microsoft\Clipboard\IsClipboardSignalProducingFeatureAvailable","Type: REG_DWORD, Length: 4, Data: 1"
"HKLM\SOFTWARE\Microsoft\Clipboard\IsCloudAndHistoryFeatureAvailable","Type: REG_DWORD, Length: 4, Data: 1"

"HKCU\Software\Microsoft\Clipboard\ClipboardTipRequired","Length: 16"
"HKCU\Software\Microsoft\Clipboard\CloudClipRDPOverride","Length: 16"
"HKCU\Software\Microsoft\Clipboard\CloudClipboardAutomaticUpload","Length: 16"
"HKCU\Software\Microsoft\Clipboard\CloudContentRemoteOverrideValueWindowInSec","Length: 16"
"HKCU\Software\Microsoft\Clipboard\CloudContentValueWindowInSec","Length: 16"
"HKCU\Software\Microsoft\Clipboard\DoubleCopyGestureEnabled","Length: 16"
"HKCU\Software\Microsoft\Clipboard\EnableClipboardHistory","Length: 16"
"HKCU\Software\Microsoft\Clipboard\PastedFromClipboardUI","Length: 16"
"HKCU\Software\Microsoft\Clipboard\ShellHotKeyUsed","Length: 16"
```

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Allow Clipboard synchronization across devices](https://noverse.dev/policies?p=OSPolicy*AllowCrossDeviceClipboard) | `HKLM\Software\Policies\Microsoft\Windows\System` | `AllowCrossDeviceClipboard` |
| [Allow Clipboard History](https://noverse.dev/policies?p=OSPolicy*AllowClipboardHistory) | `HKLM\Software\Policies\Microsoft\Windows\System` | `AllowClipboardHistory` |
| [Do not allow Clipboard redirection](https://noverse.dev/policies?p=TerminalServer*TS_CLIENT_CLIPBOARD) | `HKLM\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services` | `fDisableClip` |
| [Allow clipboard sharing with Windows Sandbox](https://noverse.dev/policies?p=WindowsSandbox*AllowClipboardRedirection) | `HKLM\SOFTWARE\Policies\Microsoft\Windows\Sandbox` | `AllowClipboardRedirection` |
