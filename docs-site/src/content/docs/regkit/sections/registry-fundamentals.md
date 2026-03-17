---
title: 'Registry Fundamentals'
description: 'Generated from regkit README section: Registry Fundamentals.'
editUrl: 'https://github.com/nohuto/regkit/blob/main/README.md#registry-fundamentals'
sidebar:
  order: 10
---

### Standard hives & REGISTRY Comparison

RegEdit shows five common hives `HKEY_LOCAL_MACHINE`, `HKEY_USERS`, `HKEY_CURRENT_USER`, `HKEY_CLASSES_ROOT`, and `HKEY_CURRENT_CONFIG`. Internally, all registry keys are rooted at a single object named `\REGISTRY` in the Object Manager namespace. Native APIs (NtOpenKey/ZwOpenKey) can access paths under `\REGISTRY` directly. The registry actually exposes nine root keys (including performance and local settings roots) but most tools only show the common five.

You can query the REGISTRY key using WinDbg `!reg query \REGISTRY`.

### REGISTRY only Keys

Keys that exist in the real REGISTRY view but are not reachable from standard hives:

- `\REGISTRY\A` - private keys used by some processes, including UWP apps
- `\REGISTRY\WC` - Windows Containers / silos, used by modern registry virtualization and differencing hives

### Keys, values, and naming

The registry is a database that looks a lot like a filesystem, keys are like directories, values are like files, and a key can contain both subkeys and values. Values are typed, have a name, and live under a key. Each key also has one unnamed value, displayed as `(Default)`.

### Registry value types

Most values are `REG_DWORD`, `REG_BINARY`, or `REG_SZ`, but the registry supports 12 value types.

Some values are stored with extra flag bits in the upper 16 bits (e.g. `0x20000`, `0x40000`). These aren't new base types, the actual base type is `type & 0xFFFF`, and regkit displays them as `REG_* (0xXXXX)` (for example `0x20001` is `REG_SZ` with a flag, `0x20004` is `REG_DWORD`, and `0x40007` is `REG_MULTI_SZ`). These flagged types are included in the Find > Data Types filter. `RegQueryValueEx` returns a `DWORD` type, and in multiple cases the high 16 bits were non-zero while the low 16 bits matched a documented `REG_*` constant. Masking with `0xFFFF` consistently produced a known base type, and the returned data layout matched that base type (e.g., UTF-16 multi-strings for `REG_MULTI_SZ`, 32-bit integers for `REG_DWORD`). Note that this behavior was determined based on observed values and isn't validated by official Microsoft documentation, it's just a personal assumption.

| Type | Description |
| --- | --- |
| `REG_NONE` | No value type |
| `REG_SZ` | Fixed-length Unicode string |
| `REG_MULTI_SZ` | Array of Unicode NULL-terminated strings |
| `REG_EXPAND_SZ` | Variable-length Unicode string with embedded environment variables |
| `REG_BINARY` | Arbitrary-length binary data |
| `REG_DWORD` | 32-bit number |
| `REG_QWORD` | 64-bit number |
| `REG_DWORD_BIG_ENDIAN` | 32-bit number, high byte first |
| `REG_LINK` | Unicode symbolic link |
| `REG_RESOURCE_LIST` | Hardware resource description |
| `REG_FULL_RESOURCE_DESCRIPTOR` | Hardware resource description |
| `REG_RESOURCE_REQUIREMENTS_LIST` | Resource requirements |

### Root keys and logical structure

There are nine root keys, their names start with `HKEY` as they represent handles (H) to keys (KEY), some are links or merged views.

| Root key | Abbreviation | Description | Link |
| --- | --- | --- | --- |
| `HKEY_CURRENT_USER` | `HKCU` | Per-user preferences (current logged-on user) | `HKEY_USERS\<SID>` (SID of current logged-on user) |
| `HKEY_CURRENT_USER_LOCAL_SETTINGS` | `HKCULS` | Per-user settings local to the machine | `HKCU\Software\Classes\Local Settings` |
| `HKEY_USERS` | `HKU` | All loaded user profiles (including `.DEFAULT` for the system account) | - |
| `HKEY_CLASSES_ROOT` | `HKCR` | "Stores file association and Component Object Model (COM) object registration information" | Merged view of `HKLM\SOFTWARE\Classes` and `HKEY_USERS\<SID>\SOFTWARE\Classes` |
| `HKEY_LOCAL_MACHINE` | `HKLM` | Machine-wide configuration (BCD, COMPONENTS, HARDWARE, SAM, SECURITY, SOFTWARE, SYSTEM) | - |
| `HKEY_CURRENT_CONFIG` | `HKCC` | Stores some information about the current hardware profile (deprecated, "Hardware profiles are no longer supported in Windows, but the key still exists to support legacy applications that might depend on its presence.") | `HKLM\SYSTEM\CurrentControlSet\Hardware Profiles\Current` (legacy, Yosifovich shows `Hardware\Profiles\Current`, but that's a typo in his blog) |
| `HKEY_PERFORMANCE_DATA` | `HKPD` | Live performance counter data, available only via APIs | - |
| `HKEY_PERFORMANCE_TEXT` | `HKPT` | Performance counter names/descriptions in US English | - |
| `HKEY_PERFORMANCE_NLSTEXT` | `HKPNT` | Performance counter names/descriptions in the OS language | - |

Notes:
- `HKEY_CURRENT_USER` maps to the logged-on user hive (`Ntuser.dat`) and is created per-user at logon.
- `HKEY_CLASSES_ROOT` also contains UAC VirtualStore data, it isn't a simple link.
- `HKEY_PERFORMANCE_*` keys aren't stored in hive files and aren't visible in Regedit. They are provided by Perflib through registry APIs like `RegQueryValueEx`.
- SYSTEM = `S-1-5-18`, LocalService = `S-1-5-19`, NetworkService = `S-1-5-20`

Low level view of the REGISTRY ([*](https://projectzero.google/2024/10/the-windows-registry-adventure-4-hives.html)):

![](https://github.com/nohuto/regkit/blob/main/assets/images/REGISTRYview.png?raw=true)

### Hives and on-disk files

On disk, the registry is a set of hive files, not a single file. The Configuration Manager records loaded hive paths under `HKLM\SYSTEM\CurrentControlSet\Control\Hivelist` (WinDbg cmd to get HiceAddr etc. = `!reg hivelist`) as they are mounted. Each hive is a PRIMARY file plus `.LOG<1/2>` (also possible to only be a `.LOG` if REG_HIVE_SINGLE_LOG) used during flushing/crash recovery. The mapping below is from Windows Internals (some hives are volatile or virtualized):

| Hive registry path | Hive file path |
| --- | --- |
| `HKEY_LOCAL_MACHINE\BCD00000000` | `\EFI\Microsoft\Boot\BCD` |
| `HKEY_LOCAL_MACHINE\COMPONENTS` | `%SystemRoot%\System32\Config\Components` |
| `HKEY_LOCAL_MACHINE\SYSTEM` | `%SystemRoot%\System32\Config\System` |
| `HKEY_LOCAL_MACHINE\SAM` | `%SystemRoot%\System32\Config\Sam` |
| `HKEY_LOCAL_MACHINE\SECURITY` | `%SystemRoot%\System32\Config\Security` |
| `HKEY_LOCAL_MACHINE\SOFTWARE` | `%SystemRoot%\System32\Config\Software` |
| `HKEY_LOCAL_MACHINE\HARDWARE` | Volatile hive (memory only) |
| `HKEY_LOCAL_MACHINE\WindowsAppLockerCache` | `%SystemRoot%\System32\AppLocker\AppCache.dat` |
| `HKEY_LOCAL_MACHINE\ELAM` | `%SystemRoot%\System32\Config\Elam` |
| `HKEY_USERS\<SID of LocalService>` | `%SystemRoot%\ServiceProfiles\LocalService\Ntuser.dat` |
| `HKEY_USERS\<SID of NetworkService>` | `%SystemRoot%\ServiceProfiles\NetworkService\Ntuser.dat` |
| `HKEY_USERS\<SID of username>` | `\Users\<username>\Ntuser.dat` |
| `HKEY_USERS\<SID>_Classes` | `\Users\<username>\AppData\Local\Microsoft\Windows\Usrclass.dat` |
| `HKEY_USERS\.DEFAULT` | `%SystemRoot%\System32\Config\Default` |
| Virtualized `HKLM\SOFTWARE` | `\ProgramData\Packages\<PackageFullName>\<UserSid>\SystemAppData\Helium\Cache\<RandomName>.dat` |
| Virtualized `HKCU` | `\ProgramData\Packages\<PackageFullName>\<UserSid>\SystemAppData\Helium\User.dat` |
| Virtualized `HKLM\SOFTWARE\Classes` | `\ProgramData\Packages\<PackageFullName>\<UserSid>\SystemAppData\Helium\UserClasses.dat` |

Volatile hives (like `HKLM\HARDWARE`) are created at boot and never written to disk (in paged pool, lost after reboot), virtualized hives are mounted on demand for packaged apps. Hives are loaded at boot or explicitly via `NtLoadKey` / `RegLoadKey` (SeRestorePrivilege required).
