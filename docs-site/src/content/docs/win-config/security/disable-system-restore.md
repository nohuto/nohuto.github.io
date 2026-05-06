---
title: 'System Restore'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

```powershell
Disable-ComputerRestore -Drive "C:\"
```
Does:
```powershell
"wmiprvse.exe", "RegSetValue","HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore\RPSessionInterval","Type: REG_DWORD, Length: 4, Data: 0"
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "SystemRestore.admx",
  "CategoryName": "SR",
  "PolicyName": "SR_DisableConfig",
  "NameSpace": "Microsoft.Policies.SystemRestore",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Turn off Configuration",
  "ExplainText": "Allows you to disable System Restore configuration through System Protection. This policy setting allows you to turn off System Restore configuration through System Protection. System Restore enables users, in the event of a problem, to restore their computers to a previous state without losing personal data files. The behavior of this policy setting depends on the \"Turn off System Restore\" policy setting. If you enable this policy setting, the option to configure System Restore through System Protection is disabled. If you disable or do not configure this policy setting, users can change the System Restore settings through System Protection. Also, see the \"Turn off System Restore\" policy setting. If the \"Turn off System Restore\" policy setting is enabled, the \"Turn off System Restore configuration\" policy setting is overwritten.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\SystemRestore"
  ],
  "ValueName": "DisableConfig",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "SystemRestore.admx",
  "CategoryName": "SR",
  "PolicyName": "SR_DisableSR",
  "NameSpace": "Microsoft.Policies.SystemRestore",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Turn off System Restore",
  "ExplainText": "Allows you to disable System Restore. This policy setting allows you to turn off System Restore. System Restore enables users, in the event of a problem, to restore their computers to a previous state without losing personal data files. By default, System Restore is turned on for the boot volume. If you enable this policy setting, System Restore is turned off, and the System Restore Wizard cannot be accessed. The option to configure System Restore or create a restore point through System Protection is also disabled. If you disable or do not configure this policy setting, users can perform System Restore and configure System Restore settings through System Protection. Also, see the \"Turn off System Restore configuration\" policy setting. If the \"Turn off System Restore\" policy setting is disabled or not configured, the \"Turn off System Restore configuration\" policy setting is used to determine whether the option to configure System Restore is available.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\SystemRestore"
  ],
  "ValueName": "DisableSR",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
