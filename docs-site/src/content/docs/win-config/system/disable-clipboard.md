---
title: 'Clipboard'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-clipboard'
sidebar:
  order: 27
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

## Windows Policies

```json
{
  "File": "TerminalServer.admx",
  "CategoryName": "TS_REDIRECTION",
  "PolicyName": "TS_CLIENT_CLIPBOARD",
  "NameSpace": "Microsoft.Policies.TerminalServer",
  "Supported": "WindowsXP",
  "DisplayName": "Do not allow Clipboard redirection",
  "ExplainText": "This policy setting specifies whether to prevent the sharing of Clipboard contents (Clipboard redirection) between a remote computer and a client computer during a Remote Desktop Services session. You can use this setting to prevent users from redirecting Clipboard data to and from the remote computer and the local computer. By default, Remote Desktop Services allows Clipboard redirection. If you enable this policy setting, users cannot redirect Clipboard data. If you disable this policy setting, Remote Desktop Services always allows Clipboard redirection. If you do not configure this policy setting, Clipboard redirection is not specified at the Group Policy level.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Terminal Services"
  ],
  "ValueName": "fDisableClip",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsSandbox.admx",
  "CategoryName": "WindowsSandbox",
  "PolicyName": "AllowClipboardRedirection",
  "NameSpace": "Microsoft.Policies.WindowsSandbox",
  "Supported": "Windows_11_0_NOSERVER_ENTERPRISE_EDUCATION_PRO_SANDBOX",
  "DisplayName": "Allow clipboard sharing with Windows Sandbox",
  "ExplainText": "This policy setting enables or disables clipboard sharing with the sandbox. If you enable this policy setting, copy and paste between the host and Windows Sandbox are permitted. If you disable this policy setting, copy and paste in and out of Sandbox will be restricted. If you do not configure this policy setting, clipboard sharing will be enabled.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Sandbox"
  ],
  "ValueName": "AllowClipboardRedirection",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OSPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "AllowCrossDeviceClipboard",
  "NameSpace": "Microsoft.Policies.OSPolicy",
  "Supported": "Windows_10_0",
  "DisplayName": "Allow Clipboard synchronization across devices",
  "ExplainText": "This policy setting determines whether Clipboard contents can be synchronized across devices. If you enable this policy setting, Clipboard contents are allowed to be synchronized across devices logged in under the same Microsoft account or Azure AD account. If you disable this policy setting, Clipboard contents cannot be shared to other devices. Policy change takes effect immediately.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "AllowCrossDeviceClipboard",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "OSPolicy.admx",
  "CategoryName": "PolicyPolicies",
  "PolicyName": "AllowClipboardHistory",
  "NameSpace": "Microsoft.Policies.OSPolicy",
  "Supported": "Windows_10_0",
  "DisplayName": "Allow Clipboard History",
  "ExplainText": "This policy setting determines whether history of Clipboard contents can be stored in memory. If you enable this policy setting, history of Clipboard contents are allowed to be stored. If you disable this policy setting, history of Clipboard contents are not allowed to be stored. Policy change takes effect immediately.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "AllowClipboardHistory",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
