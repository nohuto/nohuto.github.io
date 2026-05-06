---
title: 'PS Execution Policy'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 5
---

> "*PowerShell execution policy is a safety feature that controls when PowerShell loads configuration files and runs scripts, helping prevent accidental execution of malicious scripts.*
>
> *On Windows, you can set it for the local computer, current user, a single session, or through Group Policy. Local computer and current user policies are stored in PowerShell configuration files, while session policy exists only in memory until the session closes.*
>
> *It is not a real security boundary, since users can bypass it, but it helps enforce basic rules and avoid accidental misuse.*
>
> *On non-Windows systems, the reported default is `Unrestricted` and cannot be changed, though the actual behavior is closer to `Bypass` because Windows security zones do not exist there.*"
>
> — Microsoft, [about_Execution_Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5)

### [Execution Policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5)

| **Execution Policy**  | **Description** |
| ---- | ---- |
| `AllSigned` | All scripts must be signed by a trusted publisher. Prompts for untrusted publishers. |
| `Bypass` | No prompts or restrictions. Used in apps or environments with their own security. |
| `Default` | Acts like `RemoteSigned` on Windows. |
| `RemoteSigned` | Scripts run freely unless downloaded from the internet. Internet scripts need a trusted signature or must be unblocked. Local scripts don't require signatures. |
| `Restricted` | No scripts allowed (only individual commands). Blocks all `.ps1`, `.psm1`, `.ps1xml`, and profile scripts. |
| `Undefined` | No policy in this scope. If all scopes are undefined, defaults to `Restricted` (clients) or `RemoteSigned` (servers). |
| `Unrestricted` | Unsigned scripts can run. Prompts for scripts from outside the intranet zone. |

### Scope

| **Scope** | **Description** |
|---- | ---- |
| `MachinePolicy` | Set by a Group Policy for all users of the computer |
| `UserPolicy` | Set by a Group Policy for the current user of the computer |
| `Process` | Sets the execution policy only for the current session - stored in an environment variable & removed when the session ends |
| `CurrentUser` | The execution policy affects only the current user - stored in the HKCU subkey |
| `LocalMachine` | The execution policy affects all users on the current computer - stored in the HKLM subkey |

### [Registry Values](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_config?view=powershell-7.5)

| **Value Name** | **Description** |
| ---- | ---- |
| `EnableScriptBlockLogging` | Enables or disables logging of PowerShell script input to the event log. If enabled, it logs the processing of commands, script blocks, functions, and scripts. |
| `EnableScriptBlockInvocationLogging` | Enables or disables logging of invocation events for commands, script blocks, functions, or scripts. Enabling this generates high volume of event logs for start/stop events. |
| `EnableModuleLogging` | Enables or disables logging of pipeline execution events for specified PowerShell modules. If enabled, logs events in Event Viewer for the specified modules. |
| `EnableTranscripting` | Enables or disables transcription of PowerShell commands. If enabled, records the input and output of PowerShell commands into text-based transcripts stored by default in My Documents. |
| `EnableScripts` | Controls which types of scripts are allowed to run on the system. Options include allowing only signed scripts, allowing local scripts and remote signed scripts, or allowing all scripts to run. |

See your current execution policies via:
```powershell
Get-ExecutionPolicy -List
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "PowerShellExecutionPolicy.admx",
  "CategoryName": "PowerShell",
  "PolicyName": "EnableScripts",
  "NameSpace": "Microsoft.Policies.PowerShell",
  "Supported": "WIN7 - At least Microsoft Windows 7 or Windows Server 2008 family",
  "DisplayName": "Turn on Script Execution",
  "ExplainText": "This policy setting lets you configure the script execution policy, controlling which scripts are allowed to run. If you enable this policy setting, the scripts selected in the drop-down list are allowed to run. The \"Allow only signed scripts\" policy setting allows scripts to execute only if they are signed by a trusted publisher. The \"Allow local scripts and remote signed scripts\" policy setting allows any local scrips to run; scripts that originate from the Internet must be signed by a trusted publisher. The \"Allow all scripts\" policy setting allows all scripts to run. If you disable this policy setting, no scripts are allowed to run. Note: This policy setting exists under both \"Computer Configuration\" and \"User Configuration\" in the Local Group Policy Editor. The \"Computer Configuration\" has precedence over \"User Configuration.\" If you disable or do not configure this policy setting, it reverts to a per-machine preference setting; the default if that is not configured is \"No scripts allowed.\"",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\PowerShell",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\PowerShell"
  ],
  "ValueName": "EnableScripts",
  "Elements": [
    { "Type": "Enum", "ValueName": "ExecutionPolicy", "Items": [
        { "DisplayName": "Allow only signed scripts", "Data": "AllSigned" },
        { "DisplayName": "Allow local scripts and remote signed scripts", "Data": "RemoteSigned" },
        { "DisplayName": "Allow all scripts", "Data": "Unrestricted" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "PowerShellExecutionPolicy.admx",
  "CategoryName": "PowerShell",
  "PolicyName": "EnableModuleLogging",
  "NameSpace": "Microsoft.Policies.PowerShell",
  "Supported": "WIN7 - At least Microsoft Windows 7 or Windows Server 2008 family",
  "DisplayName": "Turn on Module Logging",
  "ExplainText": "This policy setting allows you to turn on logging for Windows PowerShell modules. If you enable this policy setting, pipeline execution events for members of the specified modules are recorded in the Windows PowerShell log in Event Viewer. Enabling this policy setting for a module is equivalent to setting the LogPipelineExecutionDetails property of the module to True. If you disable this policy setting, logging of execution events is disabled for all Windows PowerShell modules. Disabling this policy setting for a module is equivalent to setting the LogPipelineExecutionDetails property of the module to False. If this policy setting is not configured, the LogPipelineExecutionDetails property of a module or snap-in determines whether the execution events of a module or snap-in are logged. By default, the LogPipelineExecutionDetails property of all modules and snap-ins is set to False. To add modules and snap-ins to the policy setting list, click Show, and then type the module names in the list. The modules and snap-ins in the list must be installed on the computer. Note: This policy setting exists under both Computer Configuration and User Configuration in the Group Policy Editor. The Computer Configuration policy setting takes precedence over the User Configuration policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging"
  ],
  "ValueName": "EnableModuleLogging",
  "Elements": [
    { "Type": "List", "ValueName": null },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "PowerShellExecutionPolicy.admx",
  "CategoryName": "PowerShell",
  "PolicyName": "EnableTranscripting",
  "NameSpace": "Microsoft.Policies.PowerShell",
  "Supported": "WIN7 - At least Microsoft Windows 7 or Windows Server 2008 family",
  "DisplayName": "Turn on PowerShell Transcription",
  "ExplainText": "This policy setting lets you capture the input and output of Windows PowerShell commands into text-based transcripts. If you enable this policy setting, Windows PowerShell will enable transcripting for Windows PowerShell, the Windows PowerShell ISE, and any other applications that leverage the Windows PowerShell engine. By default, Windows PowerShell will record transcript output to each users' My Documents directory, with a file name that includes 'PowerShell_transcript', along with the computer name and time started. Enabling this policy is equivalent to calling the Start-Transcript cmdlet on each Windows PowerShell session. If you disable this policy setting, transcripting of PowerShell-based applications is disabled by default, although transcripting can still be enabled through the Start-Transcript cmdlet. If you use the OutputDirectory setting to enable transcript logging to a shared location, be sure to limit access to that directory to prevent users from viewing the transcripts of other users or computers. Note: This policy setting exists under both Computer Configuration and User Configuration in the Group Policy Editor. The Computer Configuration policy setting takes precedence over the User Configuration policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription"
  ],
  "ValueName": "EnableTranscripting",
  "Elements": [
    { "Type": "Text", "ValueName": "OutputDirectory" },
    { "Type": "Boolean", "ValueName": "EnableInvocationHeader", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "PowerShellExecutionPolicy.admx",
  "CategoryName": "PowerShell",
  "PolicyName": "EnableScriptBlockLogging",
  "NameSpace": "Microsoft.Policies.PowerShell",
  "Supported": "WIN7 - At least Microsoft Windows 7 or Windows Server 2008 family",
  "DisplayName": "Turn on PowerShell Script Block Logging",
  "ExplainText": "This policy setting enables logging of all PowerShell script input to the Microsoft-Windows-PowerShell/Operational event log. If you enable this policy setting, Windows PowerShell will log the processing of commands, script blocks, functions, and scripts - whether invoked interactively, or through automation. If you disable this policy setting, logging of PowerShell script input is disabled. If you enable the Script Block Invocation Logging, PowerShell additionally logs events when invocation of a command, script block, function, or script starts or stops. Enabling Invocation Logging generates a high volume of event logs. Note: This policy setting exists under both Computer Configuration and User Configuration in the Group Policy Editor. The Computer Configuration policy setting takes precedence over the User Configuration policy setting.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging",
    "HKCU\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging"
  ],
  "ValueName": "EnableScriptBlockLogging",
  "Elements": [
    { "Type": "Boolean", "ValueName": "EnableScriptBlockInvocationLogging", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
