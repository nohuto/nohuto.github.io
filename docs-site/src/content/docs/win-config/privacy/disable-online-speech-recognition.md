---
title: 'Online Speech Recognition'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 21
---

[`HasAccepted`](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#bkmk-priv-speech) disables online speech recognition, voice input to apps like Cortana, and data upload to Microsoft. [`AllowSpeechModelUpdate`](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#bkmk-priv-speech) blocks automatic updates of speech recognition and synthesis models. I found `DisableSpeechInput` randomly while looking for `HasAccepted`, related to mixed reality environments.
- [privacy/assets | locationaccess-LocationApi.c](https://github.com/nohuto/win-config/blob/main/privacy/assets/locationaccess-LocationApi.c)
