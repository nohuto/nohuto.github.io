---
title: 'System Mitigations'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-system-mitigations'
sidebar:
  order: 4
---

Security features that protect against memory based attacks like buffer overflows and code injection. Enabling this option will reduce system security.

It currently applies all valid values **system wide** using `Set-ProcessMitigation -System`:
```powershell
HKLM\System\CurrentControlSet\Control\Session Manager\kernel\MitigationOptions	Type: REG_BINARY, Length: 24, Data: 00 22 22 20 22 20 22 22 22 20 22 22 22 22 22 22
HKLM\System\CurrentControlSet\Control\Session Manager\kernel\MitigationAuditOptions	Type: REG_BINARY, Length: 24, Data: 02 22 22 02 02 02 20 22 22 22 22 22 22 22 22 22
```

Disable specific mitigation:
```powershell
Set-ProcessMitigation -Name process.exe -Disable Value
```

Editing process mitigations via LGPE (`Administrative Templates\System\Mitigation Options\Process Mitigation Options`):

![](https://github.com/nohuto/win-config/blob/main/security/images/processmiti.png?raw=true)

| Flag | Bit | Setting                                                                         | Details                                                                                                                                                                                                                                                                               |
| ---- | ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A    | 0            | PROCESS_CREATION_MITIGATION_POLICY_DEP_ENABLE (0x00000001)                      | Turns on Data Execution Prevention (DEP) for child processes.                                                                                                                                                                                                                         |
| B    | 1            | PROCESS_CREATION_MITIGATION_POLICY_DEP_ATL_THUNK_ENABLE (0x00000002)            | Turns on DEP-ATL thunk emulation for child processes. DEP-ATL thunk emulation lets the system intercept nonexecutable (NX) faults that originate from the Active Template Library (ATL) thunk layer, and then emulate and handle the instructions so the process can continue to run. |
| C    | 2            | PROCESS_CREATION_MITIGATION_POLICY_SEHOP_ENABLE (0x00000004)                    | Turns on Structured Exception Handler Overwrite Protection (SEHOP) for child processes. SEHOP helps to block exploits that use the Structured Exception Handler (SEH) overwrite technique.                                                                                            |
| D    | 8            | PROCESS_CREATION_MITIGATION_POLICY_FORCE_RELOCATE_IMAGES_ALWAYS_ON (0x00000100) | Uses the force ASLR setting to act as though an image base collision happened at load time, forcibly rebasing images that aren't dynamic base compatible. Images without the base relocation section aren't loaded if relocations are required.                                       |
| E    | 15           | PROCESS_CREATION_MITIGATION_POLICY_BOTTOM_UP_ASLR_ALWAYS_ON (0x00010000)        | Turns on the bottom-up randomization policy, which includes stack randomization options and causes a random location to be used as the lowest user address.                                                                                                                           |
| F    | 16           | PROCESS_CREATION_MITIGATION_POLICY_BOTTOM_UP_ASLR_ALWAYS_OFF (0x00020000)       | Turns off the bottom-up randomization policy, which includes stack randomization options and causes a random location to be used as the lowest user address.                                                                                                                          |

> https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/override-mitigation-options-for-app-related-security-policies

`(gcm set-processmitigation).Parameters.Disable.Attributes.ValidValues`:
```powershell
DEP
EmulateAtlThunks
ForceRelocateImages
RequireInfo
BottomUp
HighEntropy
StrictHandle
DisableWin32kSystemCalls
AuditSystemCall
DisableExtensionPoints
DisableFsctlSystemCalls
AuditFsctlSystemCall
BlockDynamicCode
AllowThreadsToOptOut
AuditDynamicCode
CFG
SuppressExports
StrictCFG
MicrosoftSignedOnly
AllowStoreSignedBinaries
AuditMicrosoftSigned
AuditStoreSigned
EnforceModuleDependencySigning
DisableNonSystemFonts
AuditFont
BlockRemoteImageLoads
BlockLowLabelImageLoads
PreferSystem32
AuditRemoteImageLoads
AuditLowLabelImageLoads
AuditPreferSystem32
EnableExportAddressFilter
AuditEnableExportAddressFilter
EnableExportAddressFilterPlus
AuditEnableExportAddressFilterPlus
EnableImportAddressFilter
AuditEnableImportAddressFilter
EnableRopStackPivot
AuditEnableRopStackPivot
EnableRopCallerCheck
AuditEnableRopCallerCheck
EnableRopSimExec
AuditEnableRopSimExec
SEHOP
AuditSEHOP
SEHOPTelemetry
TerminateOnError
DisallowChildProcessCreation
AuditChildProcess
UserShadowStack
UserShadowStackStrictMode
AuditUserShadowStack
```

> https://learn.microsoft.com/en-us/powershell/module/processmitigations/set-processmitigation?view=windowsserver2025-ps

---

Miscellaneous notes:

Editing DEP via bcdedit:
```
bcdedit /set nx OptIn
```
`OptIn` is preferred.

|DEP Option | Description |
|-----------|-------------|
|**Optin**| Enables DEP only for operating system components, including the Windows kernel and drivers. Administrators can enable DEP on selected executable files by using the Application Compatibility Toolkit (ACT). |
|**Optout** | Enables DEP for the operating system and all processes, including the Windows kernel and drivers. However, administrators can disable DEP on selected executable files by using **System** in **Control Panel**. |
|**AlwaysOn** | Enables DEP for the operating system and all processes, including the Windows kernel and drivers. All attempts to disable DEP are ignored. |
|**AlwaysOff** | Disables DEP. Attempts to enable DEP selectively are ignored. On Windows Vista, this parameter also disables Physical Address Extension (PAE). This parameter does not disable PAE on Windows Server 2008. |

> https://learn.microsoft.com/en-us/windows/win32/memory/data-execution-prevention  
> https://github.com/MicrosoftDocs/windows-driver-docs/blob/staging/windows-driver-docs-pr/devtest/bcdedit--set.md#verification-settings

`MoveImages` value (`ASLR`) - it's recommended, to disable ASLR for a specific process instead:
```c
dq offset aSessionManager_10 ; "Session Manager\\Memory Management"
dq offset aMoveimages   ; "MoveImages"
dq offset dword_140FC41E0

dword_140FC41E0 dd 1 // default - 0 = disabled
```

> https://en.wikipedia.org/wiki/Address_space_layout_randomization
