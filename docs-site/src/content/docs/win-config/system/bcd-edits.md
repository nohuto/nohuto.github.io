---
title: 'BCD Edits'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#bcd-edits'
sidebar:
  order: 32
---

BCDEdit is the CL editor for the Boot Configuration Database (BCD), a registry hive under `HKLM\BCD00000000` backed by a hidden BCD file (UEFI: `\EFI\Microsoft\Boot\BCD`). The BCD replaced `boot.ini` (before Windows Vista) and stores per installation boot configuration. Each entry is a BCD object (GUID) under `Objects`, and each object has `Elements` subkeys with numeric element IDs. The `Element` value is the data that maps to a readable BCDEdit option or boot parameter. BCDEdit exposes symbolic names for objects/elements and can edit online or offline stores (`/store`), and the same data can be modified by loading the BCD hive (including remote hives).

BCDEdit is primarily used for boot troubleshooting, recovery, debugging, and security/boot behavior changes (Safe Mode, driver loading, hypervisor settings). Some may not be used on latest Windows versions anymore (e.g. HalpTscSyncPolicy, see pseudocode below).

BitLocker validates a subset of BCD settings at boot to detect security sensitive changes. The validated set can be extended or reduced via policy, and the hex value of a triggering setting is logged (event ID 523). Friendly names can be listed with `bcdedit /enum all`, but some settings have no friendly name and must be configured by hex. BCD settings are also scoped to specific boot applications (for example, `winload`, `winresume`, `bootmgr`), policy entries can be prefixed with the target application (for example, `winload:nx` or `all:locale`). When secure boot is used for integrity validation, the enhanced BCD validation profile policy is ignored, and secure boot enforces its own BCD rules.

## Key & Value Structure

As kind of everything else, BCD edits are also stored in the registry:
```c
HKLM\BCD00000000\Objects

// Structure
HKLM\BCD00000000\Objects\{GUID} // {GUID} depends on the object, e.g. {bootmgr}, {current}, {globalsettings}
HKLM\BCD00000000\Objects\{GUID}\Elements\XXXXXXXX // XXXXXXXX is a specific setting for the object (8 digit)
HKLM\BCD00000000\Objects\{GUID}\Elements\XXXXXXXX : Element // (REG_BINARY/REG_MULTI_SZ/REG_SZ - depends on the setting) this value includes the state of the setting
```

See all object identifiers via `bcdedit /enum all /v` (`identifier`). Note that the list below uses `{bootmgr}`, `{current}` etc. which must be replaced by the actual GUID (see block above).

See win-registry repo for a list of `HKLM\\BCD00000000\\Objects\\...` values/defaults/notes:
> [/docs/win-registry/sections/registry-values-research/bcd-edits/](/docs/win-registry/sections/registry-values-research/bcd-edits/)

## Miscellaneous Notes

Personal notes on several features, used pseudocode:
> [system/assets | bcdedit-HalpMiscGetParameters.c](https://github.com/nohuto/win-config/blob/main/system/assets/bcdedit-HalpMiscGetParameters.c)

```c
lkd> db HalpInterruptX2ApicPolicy l1
fffff807`8d20a5dc  01

if ( strstr(v3, "X2APICPOLICY=ENABLE") )
    HalpInterruptX2ApicPolicy = 1;

if ( strstr(v3, "X2APICPOLICY=DISABLE") )
    HalpInterruptX2ApicPolicy = 0;

if ( strstr(v3, "USELEGACYAPICMODE") )
    HalpInterruptX2ApicPolicy = 0; // force disable
```
```c
lkd> db HalpTscSyncPolicy l1
Couldnt resolve error at HalpTscSyncPolicy // doesn't exist

HalpTscSyncPolicy = 1; // TSCSYNCPOLICY=LEGACY
HalpTscSyncPolicy = 2; // TSCSYNCPOLICY=ENHANCED
```

`bcdedit /set loadoptions SYSTEMWATCHDOGPOLICY=DISABLED`
```c
if ( strstr(v3, "SYSTEMWATCHDOGPOLICY=DISABLED") )
{
    HalpTimerWatchdogDisable = 1;
}
else if ( strstr(v3, "SYSTEMWATCHDOGPOLICY=PHYSICALONLY") )
{
    HalpTimerWatchdogPhysicalOnly = 1;
}

lkd> db HalpTimerWatchdogDisable l1
fffff803`d21c0712  00 // default
```
```c
lkd> db HalpTimerPlatformSourceForced l1
fffff803`d21c25d0  00
lkd> db HalpTimerPlatformClockSourceForced l1
fffff803`d21c2678  00

if ( strstr(v3, "USEPLATFORMCLOCK") )
    HalpTimerPlatformSourceForced = 1;

if ( strstr(v3, "USEPLATFORMTICK") )
    HalpTimerPlatformClockSourceForced = 1;
```
```c
v17 = strstr(v3, "GROUPSIZE");
if ( v17 )
{
    while ( 1 )
    {
        v18 = *v17;
        if ( !*v17 || v18 == 32 || (unsigned __int8)(v18 - 48) <= 9u )
            break;
        ++v17;
    }
    HalpMaximumGroupSize = atoi(v17);
    if ( (unsigned int)(HalpMaximumGroupSize - 1) > 0x3F )
        HalpMaximumGroupSize = 64; // clamp to 1..64
}

strstr(v3, "HALTPROFILINGPOLICY=BLOCKED");
strstr(v3, "HALTPROFILINGPOLICY=RELAXED");
return strstr(v3, "HALTPROFILINGPOLICY=RESTRICTED"); // only returns pointer if present
```
```c
lkd> db HalpMiscDiscardLowMemory l1
fffff803`d21bff79  01 // USENONE / USEPRIVATE?
lkd> db HalpHvCpuManager l1
fffff804`c27c0490  00

if ( (unsigned int)HalpInterruptModel() == 1 )
    HalpMiscDiscardLowMemory = 1; // default if HalpInterruptModel() == 1

if ( HalpHvCpuManager )
{
    v19[0] = 0;
    if ( (unsigned __int8)HalpGetCpuInfo(0LL, 0LL, 0LL, v19) )
    {
        if ( v19[0] == 2 && (__readmsr(0xFEu) & 0x8000) != 0 )
        HalpMiscDiscardLowMemory = 1; // 1 if HV CPU manager + CPU type 2 + MSR 0xFE bit 15 set
    }
}
if (strstr(BootOptions, "FIRSTMEGABYTEPOLICY=USEALL") || // one of them have to be true to get 0
    (HalpIsMicrosoftCompatibleHvLoaded() && !HalpHvCpuManager)) // system running under hypervisor & not HalpHvCpuManager
{
    HalpMiscDiscardLowMemory = 0; // forced 0 if above is true
}
```
```c
v3 = *(const char **)(a1 + 216);
if ( v3 )
{
    strstr(*(const char **)(a1 + 216), "SAFEBOOT:"); // does nothing here

    if ( strstr(v3, "ONECPU") )
        HalpInterruptProcessorCap = 1;

    if ( strstr(v3, "USEPHYSICALAPIC") )
        HalpInterruptPhysicalModeOnly = 1;

    if ( strstr(v3, "BREAK") )
        HalpMiscDebugBreakRequested = 1;
}
```
```c
v4 = strstr(v3, "MAXPROCSPERCLUSTER");
if ( v4 )
{
    while ( 1 )
    {
        v5 = *v4;
        if ( !*v4 || v5 == 32 || (unsigned __int8)(v5 - 48) <= 9u )
            break;
        ++v4;
    }
    v6 = atoi(v4);
    HalpInterruptForceClusterMode(v6);
}

v7 = strstr(v3, "MAXAPICCLUSTER");
if ( v7 )
{
    while ( 1 )
    {
        v8 = *v7;
        if ( !*v7 || v8 == 32 || (unsigned __int8)(v8 - 48) <= 9u )
            break;
        ++v7;
    }
    v9 = atoi(v7);
    if ( v9 )
        LODWORD(HalpInterruptMaxCluster) = v9;
}
```
```c
if ( strstr(v3, "CONFIGACCESSPOLICY=DISALLOWMMCONFIG") )
    HalpAvoidMmConfigAccessMethod = 1; // force avoid
```
```c
if ( strstr(v3, "MSIPOLICY=FORCEDISABLE") ) // HalpInterruptSetMsiOverride(0)
{
    v10 = 0LL;
}
else
{
    if ( !strstr(v3, "FORCEMSI") ) // HalpInterruptSetMsiOverride(1)
        goto LABEL_46;
    LOBYTE(v10) = 1;
}
HalpInterruptSetMsiOverride(v10);
```

## Custom Edits

`custom:16000067 true` disables the Windows logo while booting:

![](https://github.com/nohuto/win-config/blob/main/system/images/logo.png?raw=true)

`custom:16000069 true` disables the loading circle while booting:

![](https://github.com/nohuto/win-config/blob/main/system/images/load.png?raw=true)

## Default Entries

Default entries (25H2, Build 26200.6584) including WinRE:
```powershell
Windows Boot Manager
--------------------
identifier              {9dea862c-5cdd-4e70-acc1-f32b344d4795}
device                  partition=\Device\HarddiskVolume1
description             Windows Boot Manager
locale                  en-US
inherit                 {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}
default                 {0fd8694a-e7fe-11f0-91cd-eabb9ab44a94}
resumeobject            {0fd86949-e7fe-11f0-91cd-eabb9ab44a94}
displayorder            {0fd8694a-e7fe-11f0-91cd-eabb9ab44a94}
toolsdisplayorder       {b2721d73-1db4-4c62-bf78-c548a880142d}
timeout                 30

Windows Boot Loader
-------------------
identifier              {0fd8694a-e7fe-11f0-91cd-eabb9ab44a94}
device                  partition=C:
path                    \WINDOWS\system32\winload.exe
description             Windows 11
locale                  en-US
inherit                 {6efb52bf-1766-41db-a6b3-0ee5eff72bd7}
recoverysequence        {0fd8694b-e7fe-11f0-91cd-eabb9ab44a94}
displaymessageoverride  Recovery
recoveryenabled         Yes
allowedinmemorysettings 0x15000075
osdevice                partition=C:
systemroot              \WINDOWS
resumeobject            {0fd86949-e7fe-11f0-91cd-eabb9ab44a94}
nx                      OptIn
bootmenupolicy          Standard

Windows Boot Loader
-------------------
identifier              {0fd8694b-e7fe-11f0-91cd-eabb9ab44a94}
device                  ramdisk=[\Device\HarddiskVolume3]\Recovery\WindowsRE\Winre.wim,{0fd8694c-e7fe-11f0-91cd-eabb9ab44a94}
path                    \windows\system32\winload.exe
description             Windows Recovery Environment
locale                  en-US
inherit                 {6efb52bf-1766-41db-a6b3-0ee5eff72bd7}
displaymessage          Recovery
osdevice                ramdisk=[\Device\HarddiskVolume3]\Recovery\WindowsRE\Winre.wim,{0fd8694c-e7fe-11f0-91cd-eabb9ab44a94}
systemroot              \windows
nx                      OptIn
bootmenupolicy          Standard
winpe                   Yes
custom:46000010         Yes

Resume from Hibernate
---------------------
identifier              {0fd86949-e7fe-11f0-91cd-eabb9ab44a94}
device                  partition=C:
path                    \WINDOWS\system32\winresume.exe
description             Windows Resume Application
locale                  en-US
inherit                 {1afa9c49-16ab-4a5c-901b-212802da9460}
recoverysequence        {0fd8694b-e7fe-11f0-91cd-eabb9ab44a94}
recoveryenabled         Yes
allowedinmemorysettings 0x15000075
filedevice              partition=C:
custom:21000026         partition=C:
filepath                \hiberfil.sys
bootmenupolicy          Standard
debugoptionenabled      No

Windows Memory Tester
---------------------
identifier              {b2721d73-1db4-4c62-bf78-c548a880142d}
device                  partition=\Device\HarddiskVolume1
path                    \boot\memtest.exe
description             Windows Memory Diagnostic
locale                  en-US
inherit                 {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}
badmemoryaccess         Yes

EMS Settings
------------
identifier              {0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}
bootems                 No

Debugger Settings
-----------------
identifier              {4636856e-540f-4170-a130-a84776f4c654}
debugtype               Local

RAM Defects
-----------
identifier              {5189b25c-5558-4bf2-bca4-289b11bd29e2}

Global Settings
---------------
identifier              {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}
inherit                 {4636856e-540f-4170-a130-a84776f4c654}
                        {0ce4991b-e6b3-4b16-b23c-5e0d9250e5d9}
                        {5189b25c-5558-4bf2-bca4-289b11bd29e2}

Boot Loader Settings
--------------------
identifier              {6efb52bf-1766-41db-a6b3-0ee5eff72bd7}
inherit                 {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}
                        {7ff607e0-4395-11db-b0de-0800200c9a66}

Hypervisor Settings
-------------------
identifier              {7ff607e0-4395-11db-b0de-0800200c9a66}
hypervisordebugtype     Serial
hypervisordebugport     1
hypervisorbaudrate      115200

Resume Loader Settings
----------------------
identifier              {1afa9c49-16ab-4a5c-901b-212802da9460}
inherit                 {7ea2e1ac-2e61-4728-aaa3-896d9d0a9f0e}

Device options
--------------
identifier              {0fd8694c-e7fe-11f0-91cd-eabb9ab44a94}
description             Windows Recovery
ramdisksdidevice        partition=\Device\HarddiskVolume3
ramdisksdipath          \Recovery\WindowsRE\boot.sdi
```
