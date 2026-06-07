---
title: 'CEIP'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 35
---

Voluntary program that collects usage data to help improve the quality and performance of its products.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Turn off the Windows Messenger Customer Experience Improvement Program](https://noverse.dev/policies?p=ICM*WinMSG_NoInstrumentation_2) | `HKLM\Software\Policies\Microsoft\Messenger\Client` | `CEIP` |
| [Turn off Windows Customer Experience Improvement Program](https://noverse.dev/policies?p=ICM*CEIPEnable) | `HKLM\Software\Policies\Microsoft\SQMClient\Windows` | `CEIPEnable` |
| [Prevent participation in the Customer Experience Improvement Program](https://noverse.dev/policies?p=inetres*SQM_DisableCEIP) | `HKLM\Software\Policies\Microsoft\Internet Explorer\SQM`<br>`HKCU\Software\Policies\Microsoft\Internet Explorer\SQM` | `DisableCustomerImprovementProgram` |
