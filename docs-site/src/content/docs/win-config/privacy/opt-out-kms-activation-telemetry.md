---
title: 'Opt-Out KMS Activation Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 45
---

Friendly name: `Turn off KMS Client Online AVS Validation`

"This policy setting lets you opt-out of sending KMS client activation data to Microsoft automatically. Enabling this setting prevents this computer from sending data to Microsoft regarding its activation state.

If you disable or don't configure this policy setting, KMS client activation data will be sent to Microsoft services when this device activates."

[`Disable Auto Activation`](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn502532(v=ws.11)#registry-settings) (MAK and KMS host but not KMS client) prevents windows from whether it's actived or not.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off KMS Client Online AVS Validation](https://noverse.dev/policies?p=AVSValidationGP*NoAcquireGT) | `HKLM\Software\Policies\Microsoft\Windows NT\CurrentVersion\Software Protection Platform` | `NoGenTicket` |
