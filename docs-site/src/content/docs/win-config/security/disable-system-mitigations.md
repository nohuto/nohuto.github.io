---
title: 'System Mitigations'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-system-mitigations'
sidebar:
  order: 6
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

| Flag | Bit | Setting | Details |
| --- | --- | --- | --- |
| A | 0 | PROCESS_CREATION_MITIGATION_POLICY_DEP_ENABLE (0x00000001) | Turns on Data Execution Prevention (DEP) for child processes. |
| B | 1 | PROCESS_CREATION_MITIGATION_POLICY_DEP_ATL_THUNK_ENABLE (0x00000002) | Turns on DEP-ATL thunk emulation for child processes. DEP-ATL thunk emulation lets the system intercept nonexecutable (NX) faults that originate from the Active Template Library (ATL) thunk layer, and then emulate and handle the instructions so the process can continue to run. |
| C | 2 | PROCESS_CREATION_MITIGATION_POLICY_SEHOP_ENABLE (0x00000004) | Turns on Structured Exception Handler Overwrite Protection (SEHOP) for child processes. SEHOP helps to block exploits that use the Structured Exception Handler (SEH) overwrite technique. |
| D | 8 | PROCESS_CREATION_MITIGATION_POLICY_FORCE_RELOCATE_IMAGES_ALWAYS_ON (0x00000100) | Uses the force ASLR setting to act as though an image base collision happened at load time, forcibly rebasing images that aren't dynamic base compatible. Images without the base relocation section aren't loaded if relocations are required. |
| E | 15 | PROCESS_CREATION_MITIGATION_POLICY_BOTTOM_UP_ASLR_ALWAYS_ON (0x00010000) | Turns on the bottom-up randomization policy, which includes stack randomization options and causes a random location to be used as the lowest user address. |
| F | 16 | PROCESS_CREATION_MITIGATION_POLICY_BOTTOM_UP_ASLR_ALWAYS_OFF (0x00020000) | Turns off the bottom-up randomization policy, which includes stack randomization options and causes a random location to be used as the lowest user address. |

> https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/override-mitigation-options-for-app-related-security-policies

---

**Table 7-20** Process mitigation options

| Mitigation Name | Use Case | Enabling Mechanism |
| --- | --- | --- |
| ASLR Bottom Up Randomization | Makes calls to `VirtualAlloc` subject to ASLR with 8-bit entropy, including stack-base randomization. | Set with the `PROCESS_CREATION_MITIGATION_POLICY_BOTTOM_UP_ASLR_ALWAYS_ON` process-creation attribute flag. |
| ASLR Force Relocate Images | Forces ASLR even on binaries that do not have the `/DYNAMICBASE` linker flag. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_FORCE_RELOCATE_IMAGES_ALWAYS_ON` process-creation flag. |
| High Entropy ASLR (HEASLR) | Significantly increases entropy of ASLR on 64-bit images, increasing bottom-up randomization to up to 1 TB of variance. | Must be set through `/HIGHENTROPYVA` at link time or the `PROCESS_CREATION_MITIGATION_POLICY_HIGH_ENTROPY_ASLR_ALWAYS_ON` process-creation attribute flag. |
| ASLR Disallow Stripped Images | Blocks the load of any library without relocations (linked with the `/FIXED` flag) when combined with ASLR Force Relocate Images. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_FORCE_RELOCATE_IMAGES_ALWAYS_ON_REQ_RELOCS` process-creation flag. |
| DEP: Permanent | Prevents the process from disabling DEP on itself. Only relevant on x86 and 32-bit applications, including WoW64. | Set with `SetProcessMitigationPolicy`, a process-creation attribute, or `SetProcessDEPPolicy`. |
| DEP: Disable ATL Thunk Emulation | Prevents legacy ATL library code from executing ATL thunks in the heap, even if a known compatibility issue exists. Only relevant on x86 and 32-bit applications, including WoW64. | Set with `SetProcessMitigationPolicy`, a process-creation attribute, or `SetProcessDEPPolicy`. |
| SEH Overwrite Protection (SEHOP) | Prevents structured exception handlers from being overwritten with incorrect ones, even if the image was not linked with `Safe SEH` (`/SAFESEH`). Only relevant on 32-bit applications, including WoW64. | Set with `SetProcessDEPPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_SEHOP_ENABLE` process-creation flag. |
| Raise Exception on Invalid Handle | Helps catch handle reuse attacks by crashing the process instead of returning a failure that the process might ignore. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_STRICT_HANDLE_CHECKS_ALWAYS_ON` process-creation attribute flag. |
| Raise Exception on Invalid Handle Close | Helps catch double-handle-close attacks, limiting exploit reliability and effectiveness. | Undocumented and can only be set through an undocumented API. |
| Disallow Win32k System Calls | Disables all access to the Win32 kernel-mode subsystem driver, including Window Manager, GDI, and DirectX system calls. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_WIN32K_SYSTEM_CALL_DISABLE_ALWAYS_ON` process-creation attribute flag. |
| Filter Win32k System Calls | Filters access to the Win32k subsystem to certain APIs, allowing simple GUI and DirectX access while reducing attack surface. | Set through an internal process-creation attribute flag with one of three hard-coded Win32k filter sets; reserved for Microsoft internal usage. |
| Disable Extension Points | Prevents a process from loading IMEs, Windows hook DLLs, AppInit DLLs, or Winsock layered service providers. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_EXTENSION_POINT_DISABLE_ALWAYS_ON` process-creation attribute flag. |
| Arbitrary Code Guard (CFG) | Prevents a process from allocating executable code or changing existing executable code to writable-executable memory. | Set with `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_PROHIBIT_DYNAMIC_CODE_ALWAYS_ON` and `PROCESS_CREATION_MITIGATION_POLICY_PROHIBIT_DYNAMIC_CODE_ALWAYS_ON_ALLOW_OPT_OUT` process-creation attribute flags. |
| Control Flow Guard (CFG) | Helps prevent memory corruption from hijacking control flow by validating indirect `CALL` and `JMP` targets against valid functions. | The image must be compiled and linked with `/guard:cf`; it can also be set with the `PROCESS_CREATION_MITIGATION_POLICY_CONTROL_FLOW_GUARD_ALWAYS_ON` process-creation attribute flag for other images loading in the process. |
| CFG Export Suppression | Strengthens CFG by suppressing indirect calls to the exported API table of the image. | The image must be compiled with `/guard: exportsuppress`, and can also be configured through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_CONTROL_FLOW_GUARD_EXPORT_SUPPRESSION` process-creation attribute flag. |
| CFG Strict Mode | Prevents loading any image library in the current process that was not linked with `/guard:cf`. | Set through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY2_STRICT_CONTROL_FLOW_GUARD_ALWAYS_ON` process-creation attribute flag. |
| Disable Non System Fonts | Prevents loading any font files that were not registered by Winlogon at user logon time after installation in `C:\Windows\Fonts`. | Set through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_FONT_DISABLE_ALWAYS_ON` process-creation attribute flag. |
| Microsoft-Signed Binaries Only | Prevents loading any image library in the current process that was not signed by a Microsoft CA-issued certificate. | Set through the `PROCESS_CREATION_MITIGATION_POLICY_BLOCK_NON_MICROSOFT_BINARIES_ALWAYS_ON` process-attribute flag at startup time. |
| Store-Signed Binaries Only | Prevents loading any image library in the current process that was not signed by the Microsoft Store CA. | Set through the `PROCESS_CREATION_MITIGATION_POLICY_BLOCK_NON_MICROSOFT_BINARIES_ALLOW_STORE` process attribute flag at startup time. |
| No Remote Images | Prevents loading any image library in the current process that is present on a non-local UNC or WebDAV path. | Set through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_IMAGE_LOAD_NO_REMOTE_ALWAYS_ON` process-creation attribute flag. |
| No Low IL Images | Prevents loading any image library in the current process that has a mandatory label below medium (`0x2000`). | Set through `SetProcessMitigationPolicy`, the `PROCESS_CREATION_MITIGATION_POLICY_IMAGE_LOAD_NO_LOW_LABEL_ALWAYS_ON` process-creation flag, or a resource claim ACE called `IMAGELOAD` on the process file. |
| Prefer System32 Images | Modifies the loader search path to always look in `%SystemRoot%\\System32` for relatively named image libraries before other locations. | Set through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY_IMAGE_LOAD_PREFER_SYSTEM32_ALWAYS_ON` process-creation attribute flag. |
| Return Flow Guard (RFG) | Helps prevent additional control-flow attacks by validating `RET` instructions against expected call and stack behavior. | Not yet available; included in the table for completeness. |
| Restrict Set Thread Context | Restricts modification of the current thread’s context. | Currently disabled pending the availability of RFG and may appear in a future version of Windows; included for completeness. |
| Loader Continuity | Prohibits dynamic loading of DLLs that do not have the same integrity level as the process when signature-policy mitigations could not be enabled at startup. | Set through `SetProcessMitigationPolicy` or the `PROCESS_CREATION_MITIGATION_POLICY2_LOADER_INTEGRITY_CONTINUITY_ALWAYS_ON` process-creation attribute flag. |
| Heap Terminate On Corruption | Disables the Fault Tolerant Heap and turns heap corruption into immediate process termination instead of a continuable exception. | Set through `HeapSetInformation` or the `PROCESS_CREATION_MITIGATION_POLICY_HEAP_TERMINATE_ALWAYS_ON` process-creation attribute flag. |
| Disable Child Process Creation | Prohibits creation of child processes by marking the token with a special restriction. | Set through the `PROCESS_CREATION_CHILD_PROCESS_RESTRICTED` process-creation attribute flag; can be overridden for packaged desktop apps with `PROCESS_CREATION_DESKTOP_APPX_OVERRIDE`. |
| All Application Packages Policy | Makes an AppContainer application unable to access resources that only have an `ALL APPLICATION PACKAGES` SID, requiring `ALL RESTRICTED APPLICATION PACKAGES` instead. | Set through the `PROC_THREAD_ATTRIBUTE_ALL_APPLICATION_PACKAGES_POLICY` process-creation attribute. |

Read more about process-mitigation policies in [Windows Internals E7, P1 - P.735f. 'Process-mitigation policies'](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf).

---

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
