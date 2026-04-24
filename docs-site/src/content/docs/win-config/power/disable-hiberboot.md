---
title: 'Hiberboot'
description: 'Power option documentation from win-config.'
editUrl: false
sidebar:
  order: 9
---

Fast startup is a type of shutdown that uses a hibernation file to speed up the subsequent boot. During this type of shutdown, the user is logged off before the hibernation file is created. Fast startup allows for a smaller hibernation file, more appropriate for systems with less storage capabilities.

Windows Internals (E7-P2, Hybrid shutdown): Fast Startup is implemented as a hybrid shutdown that writes a hibernation image after user sessions are closed; Boot Manager uses the hiberboot/hiberfile BCD elements to resume from that image on the next boot.

When using fast startup, the system appears to the user as though a full shutdown (S5) has occurred, even though the system has actually gone through S4. This includes how the system responds to device wake alarms.

Fast startup logs off user sessions, but the contents of kernel (session 0) are written to hard disk. This enables faster boot.

To programmatically initiate a fast startup-style shutdown, call the [InitiateShutdown](https://learn.microsoft.com/en-us/windows/win32/api/winreg/nf-winreg-initiateshutdowna) function with the `SHUTDOWN_HYBRID` flag or the [ExitWindowsEx](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-exitwindowsex) function with the `EWX_HYBRID_SHUTDOWN` flag.

In Windows, fast startup is the default transition when a system shutdown is requested. A full shutdown (S5) occurs when a system restart is requested or when an application calls a shutdown API.

## Registry Values Defaults

All three values exist as shown below. `PopReadHiberbootGroupPolicy` (`\\Registry\\Machine\\Software\\Policies\\Microsoft\\Windows\\System`) overrides `PopReadHiberbootPolicy` (`Control\\Session Manager\\Power`).

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power";
    "HiberbootEnabled" = 0; // PopHiberbootEnabledReg 
    "DisableIdleStatesAtBoot" = 0; // PpmIdleDisableStatesAtBoot 
    "HibernateBootOptimizationEnabled" = 0; // PopHiberBootOptimizationEnabledReg 

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power";
    "HiberbootEnabled" = 0; // REG_DWORD, range: 0-1

    // HybridBootAnimationTime records the boot animation duration during fast boot, HiberIoCpuTime is CPU time spent on hibernation I/O during resume, ResumeCompleteTimestamp is the system timestamp when resume from hibernation completed. So all of them are just counters and chaning their data won't affect the boot.
    "HybridBootAnimationTime" = 1601; // REG_DWORD, milliseconds, range: 0-0xFFFFFFFF
    "HiberIoCpuTime" = 0; // REG_DWORD, milliseconds, range: 0-0xFFFFFFFF
    "ResumeCompleteTimestamp" = 0; // REG_QWORD, range: 0-0xFFFFFFFFFFFFFFFF
```

```c
// PopOpenPowerKey
{
  return PopOpenKey(a1, L"Control\\Session Manager\\Power");
}

// PopReadHiberbootPolicy
result = PopOpenPowerKey(&KeyHandle);
if ( result >= 0 )
{
  RtlInitUnicodeString(&DestinationString, L"HiberbootEnabled");
  if ( ZwQueryValueKey(
         KeyHandle,
         &DestinationString,
         KeyValuePartialInformation,
         &KeyValueInformation,
         0x14u,
         &ResultLength) >= 0 )
    v1 = BYTE12(KeyValueInformation);
  result = ZwClose(KeyHandle);
}
```

> [power/assets | hiberboot-PopReadHiberbootGroupPolicy.c](https://github.com/nohuto/win-config/blob/main/power/assets/hiberboot-PopReadHiberbootGroupPolicy.c)

## DisableIdleStatesAtBoot Notes

Notes on `Disable Idle States At Boot` SUBOPTION (`DisableIdleStatesAtBoot`):

The data `-1` (`PpmIdleDisableStatesAtBoot dd 0FFFFFFFFh`) gets handled as `0`
```cpp
if ( PpmIdleDisableStatesAtBoot == -1 )
  PpmIdleDisableStatesAtBoot = 0;
```
`0` = skips all PpmInstall*IdleStates disable writes
`1` = would write disable in `PpmInstallCoordinatedIdleStates`/`PpmInstallPlatformIdleStates`
```cpp
if ( PpmIdleDisableStatesAtBoot )
  *(_DWORD *)(v20 + 80) = 0x80000000;
```
`2` = would do the same as `1` including disable write in `PpmInstallNewIdleStates`
```cpp
if ( v20 && PpmIdleDisableStatesAtBoot == 2 )
  *(_DWORD *)(v23 + 32) = 0x80000000;
```

## Windows Policies

```json
{
  "File": "WinInit.admx",
  "CategoryName": "ShutdownOptions",
  "PolicyName": "Hiberboot",
  "NameSpace": "Microsoft.Policies.WindowsInitialization",
  "Supported": "Windows8",
  "DisplayName": "Require use of fast startup",
  "ExplainText": "This policy setting controls the use of fast startup. If you enable this policy setting, the system requires hibernate to be enabled. If you disable or do not configure this policy setting, the local setting is used.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\System"
  ],
  "ValueName": "HiberbootEnabled",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
