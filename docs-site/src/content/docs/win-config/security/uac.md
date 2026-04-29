---
title: 'UAC'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 4
---

Disabling UAC stops the prompts for administrative permissions, allowing programs and processes to run with elevated rights without user confirmation.

> *User Account Control (UAC) is meant to enable users to run with standard user rights as opposed to administrative rights. Without administrative rights, users cannot accidentally (or deliberately) modify system settings, malware can’t normally alter system security settings or disable antivirus software, and users can’t compromise the sensitive information of other users on shared computers. Running with standard user rights can thus mitigate the impact of malware and protect sensitive data on shared computers.*
> *UAC runs most apps with standard user rights and uses a filtered admin token for administrators, elevating only when needed. Disabling UAC removes this filtered-token model and disables UAC file/registry virtualization (Luafv.sys).*"
>
> — Windows Internals, [E7, P1: 'UAC'](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

**Table 7-18** UAC options
| Slider Position | Attempts to change Windows settings | Attempts to install software or run a program requiring elevation | Remarks |
| --- | --- | --- | --- |
| Highest position (`Always Notify`) | A UAC elevation prompt appears on the Secure Desktop. | A UAC elevation prompt appears on the Secure Desktop. | This was the Windows Vista behavior. |
| Second position | UAC elevation occurs automatically with no prompt or notification. | A UAC elevation prompt appears on the Secure Desktop. | Windows default setting. |
| Third position | UAC elevation occurs automatically with no prompt or notification. | A UAC elevation prompt appears on the user’s normal desktop. | Not recommended. |
| Lowest position (`Never Notify`) | UAC is turned off for administrative users. | UAC is turned off for administrative users. | Not recommended. |

**Table 7-19** UAC registry values
| Slider Position | ConsentPromptBehaviorAdmin | ConsentPromptBehaviorUser | EnableLUA | PromptOnSecureDesktop |
| --- | --- | --- | --- | --- |
| Highest position (`Always Notify`) | `2` (display AAC UAC elevation prompt) | `3` (display OTS UAC elevation prompt) | `1` (enabled) | `1` (enabled) |
| Second position | `5` (display AAC UAC elevation prompt, except for changes to Windows settings) | `3` | `1` | `1` |
| Third position | `5` | `3` | `1` | `0` (disabled; UAC prompt appears on user’s normal desktop) |
| Lowest position (`Never Notify`) | `0` | `3` | `0` (disabled; logins to administrative accounts do not create a restricted admin access token) | `0` |

Read more about UAC/file virtualization/(auto-)elevation in [Windows Internals E7, P1 - P.722f. 'User Account Control and virtualization'](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).

## [Registry Values Details](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/settings-and-configuration?tabs=reg)

Value: `FilterAdministratorToken`

| Value        | Meaning                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `0x00000000` | Only the built-in administrator account (RID 500) should be placed into Full Token mode.                                                         |
| `0x00000001` | Only the built-in administrator account (RID 500) is placed into Admin Approval Mode. Approval is required when performing administrative tasks. |

Value: `ConsentPromptBehaviorAdmin`

| Value        | Meaning                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `0x00000000` | Allows the admin to perform operations that require elevation without consent or credentials.                        |
| `0x00000001` | Prompts for username and password on the secure desktop when elevation is required.                                  |
| `0x00000002` | Prompts the admin to Permit or Deny an elevation request (secure desktop). Removes the need to re-enter credentials. |
| `0x00000003` | Prompts for credentials (admin username/password) when elevation is required.                                        |
| `0x00000004` | Prompts the admin to Permit or Deny elevation (non-secure desktop).                                                  |
| `0x00000005` | Default: Prompts admin to Permit or Deny elevation for non-Windows binaries on the secure desktop.                   |

Value: `ConsentPromptBehaviorUser`

| Value        | Meaning                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| `0x00000000` | Any operation requiring elevation fails for standard users.                   |
| `0x00000001` | Standard users are prompted for an admin's credentials to elevate privileges. |
| `0x00000003` | Display OTS UAC elevation prompt |

Value: `EnableInstallerDetection`

| Value        | Meaning                                                            |
| ------------ | ------------------------------------------------------------------ |
| `0x00000000` | Disables automatic detection of installers that require elevation. |
| `0x00000001` | Enables heuristic detection of installers needing elevation.       |

Value: `ValidateAdminCodeSignatures`

| Value        | Meaning                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| `0x00000000` | Does not enforce cryptographic signatures on elevated apps.                    |
| `0x00000001` | Enforces cryptographic signatures on any interactive app requesting elevation. |

Value: `EnableLUA`

| Value        | Meaning                                                                             |
| ------------ | ----------------------------------------------------------------------------------- |
| `0x00000000` | Disables the "Administrator in Admin Approval Mode" user type and all UAC policies ("*logins to administrative accounts do not create a restricted admin access token*"). |
| `0x00000001` | Enables the "Administrator in Admin Approval Mode" and activates all UAC policies.  |

Value: `PromptOnSecureDesktop`
| Option | Description |
| ---- | ---- |
| `UAC: Disable completely` | Turns UAC off, disables LUA and virtualization, and removes consent prompts entirely. Highest compatibility risk and lowest protection. |
| `UAC: Windows default (prompt, secure desktop)` | Restores the normal Windows UAC behavior with prompts on the secure desktop. |
| `UAC: Always notify` | Prompts on every administrative change with the most protective prompt behavior. |
| `UAC: Notify apps only (no desktop dimming)` | Keeps app elevation prompts but does not switch to the secure desktop. |
| `UAC: Elevate without prompting (admins)` | Keeps LUA on for administrators but removes the admin consent prompt. Lower friction, weaker protection. |

| Value        | Meaning                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| `0x00000000` | Disables secure desktop prompting - prompts appear on the interactive desktop. |
| `0x00000001` | Forces all UAC prompts to occur on the secure desktop.                         |

Value: `EnableVirtualization`

| Value        | Meaning                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------- |
| `0x00000000` | Disables data redirection for interactive processes.                                          |
| `0x00000001` | Enables file and registry redirection for legacy apps to allow writes in user-writable paths. |
