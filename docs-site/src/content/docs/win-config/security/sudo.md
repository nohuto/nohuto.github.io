---
title: 'Sudo'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#sudo'
sidebar:
  order: 25
---

[Sudo](https://github.com/microsoft/sudo) is a new way for users to run elevated commands (as an administrator) directly from an unelevated console session on Windows.

Note that sudo uses administrator previledges and doesn't include `TrustedInstaller`/`SYSTEM` previledges.

| Mode | Description |
| ---- | ---- |
| `forceNewWindow` | Runs the command elevated in a new console window. |
| `disableInput` | Runs elevated in the same window but blocks keyboard input while it runs. |
| `normal` | Runs elevated in the same window with normal input and output behavior. |

```json
{
  "File": "Sudo.admx",
  "CategoryName": "System",
  "PolicyName": "EnableSudo",
  "NameSpace": "Microsoft.Policies.DeveloperTools",
  "Supported": "Windows_11_0_NOSERVER - At least Windows 11",
  "DisplayName": "Configure the behavior of the sudo command",
  "ExplainText": "This policy setting controls use of the sudo.exe command line tool. If you enable this policy setting, then you may set a maximum allowed mode to run sudo in. This restricts the ways in which users may interact with command-line applications run with sudo. You may pick one of the following modes to allow sudo to run in: \"Disabled\": sudo is entirely disabled on this machine. When the user tries to run sudo, sudo will print an error message and exit. \"Force new window\": When sudo launches a command line application, it will launch that app in a new console window. \"Disable input\": When sudo launches a command line application, it will launch the app in the current console window, but the user will not be able to type input to the command line app. The user may also choose to run sudo in \"Force new window\" mode. \"Normal\": When sudo launches a command line application, it will launch the app in the current console window. The user may also choose to run sudo in \"Force new window\" or \"Disable input\" mode. If you disable this policy or do not configure it, the user will be able to run sudo.exe normally (after enabling the setting in the Settings app).",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\Sudo"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "Enabled", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "Force new window", "Data": "1" },
        { "DisplayName": "Disable input", "Data": "2" },
        { "DisplayName": "Normal", "Data": "3" }
      ]
    }
  ]
}
```

> https://learn.microsoft.com/en-us/windows/advanced-settings/sudo/  
> https://devblogs.microsoft.com/commandline/introducing-sudo-for-windows/
