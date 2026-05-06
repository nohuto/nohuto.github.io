---
title: 'Online Speech Recognition'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 28
---

[`HasAccepted`](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#bkmk-priv-speech) disables online speech recognition, voice input to apps like Cortana, and data upload to Microsoft. [`AllowSpeechModelUpdate`](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#bkmk-priv-speech) blocks automatic updates of speech recognition and synthesis models. I found `DisableSpeechInput` randomly while looking for `HasAccepted`, related to mixed reality environments.

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "Speech.admx",
  "CategoryName": "Speech",
  "PolicyName": "AllowSpeechModelUpdate",
  "NameSpace": "Microsoft.Policies.Speech",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Allow Automatic Update of Speech Data",
  "ExplainText": "Specifies whether the device will receive updates to the speech recognition and speech synthesis models. A speech model contains data used by the speech engine to convert audio to text (or vice-versa). The models are periodically updated to improve accuracy and performance. Models are non-executable data files. If enabled (default), the device will periodically check for updated speech models and then download them from a Microsoft service using the Background Internet Transfer Service (BITS).",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Speech"
  ],
  "ValueName": "AllowSpeechModelUpdate",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
