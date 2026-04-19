---
title: 'PowerShell & .NET Telemetry'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-powershell--net-telemetry'
sidebar:
  order: 13
---

### POWERSHELL_TELEMETRY_OPTOUT

PowerShell Telemetry:
"At startup, PowerShell sends diagnostic data including OS manufacturer, name, and version; PowerShell version; `POWERSHELL_DISTRIBUTION_CHANNEL`; Application Insights SDK version; approximate location from IP; command-line parameters (without values); current Execution Policy; and randomly generated GUIDs for the user and session."
```bat
setx POWERSHELL_TELEMETRY_OPTOUT 1
```
> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_telemetry?view=powershell-7.2

### DOTNET_CLI_TELEMETRY_OPTOUT

Disable NET Core CLI Telemetry:
"To opt out after you started the installer: close the installer, set the environment variable, and then run the installer again with that value set."
```bat
setx DOTNET_CLI_TELEMETRY_OPTOUT 1
```
> https://learn.microsoft.com/en-us/dotnet/core/tools/telemetry#how-to-opt-out
