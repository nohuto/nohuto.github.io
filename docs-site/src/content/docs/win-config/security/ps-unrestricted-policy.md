---
title: 'PS Unrestricted Policy'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#ps-unrestricted-policy'
sidebar:
  order: 5
---

Used to make powershell (`.ps1`) scripts work on your PC without showing any warning.

| **Value Name** | **Description** |
| ---- | ---- |
| `EnableScriptBlockLogging` | Enables or disables logging of PowerShell script input to the event log. If enabled, it logs the processing of commands, script blocks, functions, and scripts. |
| `EnableScriptBlockInvocationLogging` | Enables or disables logging of invocation events for commands, script blocks, functions, or scripts. Enabling this generates high volume of event logs for start/stop events. |
| `EnableModuleLogging` | Enables or disables logging of pipeline execution events for specified PowerShell modules. If enabled, logs events in Event Viewer for the specified modules. |
| `EnableTranscripting` | Enables or disables transcription of PowerShell commands. If enabled, records the input and output of PowerShell commands into text-based transcripts stored by default in My Documents. |
| `EnableScripts` | Controls which types of scripts are allowed to run on the system. Options include allowing only signed scripts, allowing local scripts and remote signed scripts, or allowing all scripts to run. |

| **Scope**â€‹ | **Descriptionâ€‹** |
|---- | ---- |
| `MachinePolicy` | Set by a Group Policy for all users of the computer |
| `UserPolicy` | Set by a Group Policy for the current user of the computer |
| `Process` | Sets the execution policy only for the current session - stored in an environment variable & removed when the session ends |
| `CurrentUser` | The execution policy affects only the current user - stored in the HLCU subkey |
| `LocalMachine` | The execution policy affects all users on the current computer - stored in the HKLM subkey |

> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5#execution-policy-scope

| **Execution Policy**  | **Description** |
| ---- | ---- |
| `AllSigned` | All scripts must be signed by a trusted publisher. Prompts for untrusted publishers. |
| `Bypass` | No prompts or restrictions. Used in apps or environments with their own security. |
| `Default` | Acts like `RemoteSigned` on Windows. |
| `RemoteSigned` | Scripts run freely unless downloaded from the internet. Internet scripts need a trusted signature or must be unblocked. Local scripts don't require signatures. |
| `Restricted` | No scripts allowed (only individual commands). Blocks all `.ps1`, `.psm1`, `.ps1xml`, and profile scripts. |
| `Undefined` | No policy in this scope. If all scopes are undefined, defaults to `Restricted` (clients) or `RemoteSigned` (servers). |
| `Unrestricted` | Unsigned scripts can run. Prompts for scripts from outside the intranet zone. |

See your current execution policies via:
```powershell
Get-ExecutionPolicy -l
```
`Set-ExecutionPolicy Unrestricted -Force`:
```
powershell.exe    HKLM\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell\ExecutionPolicy    Type: REG_SZ, Length: 26, Data: Unrestricted
```

> https://powershellisfun.com/2022/07/31/powershell-and-logging/  
> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/unblock-file?view=powershell-7.5  
> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.5  
> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_config?view=powershell-7.5  
> https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5  
> https://learn.microsoft.com/en-us/previous-versions/troubleshoot/browsers/security-privacy/ie-security-zones-registry-entries#zones
