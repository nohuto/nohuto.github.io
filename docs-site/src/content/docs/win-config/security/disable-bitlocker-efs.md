---
title: 'Bitlocker & EFS'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 11
---

Disable [Bitlocker](https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/) on all volumes:
```powershell
$nvbvol = Get-BitLockerVolume
Disable-BitLocker -MountPoint $nvbvol
```

## NtfsDisableEncryption Notes

`fsutil behavior set disableencryption 1` sets:
```powershell
fsutil.exe	RegSetValue	HKLM\System\CurrentControlSet\Control\FileSystem\NtfsDisableEncryption	Type: REG_DWORD, Length: 4, Data: 1
```
```
\Registry\Machine\SYSTEM\ControlSet001\Policies : NtfsDisableEncryption
\Registry\Machine\SYSTEM\ControlSet001\Control\FileSystem : NtfsDisableEncryption
```

### 0x8007177E Error

Enabling `NtfsDisableEncryption` (`1`) may cause Xbox games to fail to install (error code `0x8007177E` - "Allow encryption on selected disk volume to install this game"):

```powershell
ERROR_VOLUME_NOT_SUPPORT_EFS = 0x8007177E;
```

> [Windows API - Error Defines](https://github.com/arizvisa/BugId-mWindowsAPI/blob/904a1c0bd22c019ef6ca8313945fe38f4ca26f30/mDefines/mErrorDefines.py#L1793)

## Windows Policies

```json
{
  "File": "FileSys.admx",
  "CategoryName": "NTFS",
  "PolicyName": "DisableEncryption",
  "NameSpace": "Microsoft.Policies.FileSys",
  "Supported": "Windows7",
  "DisplayName": "Do not allow encryption on all NTFS volumes",
  "ExplainText": "Encryption can add to the processing overhead of filesystem operations. Enabling this setting will prevent access to and creation of encrypted files. A reboot is required for this setting to take effect",
  "KeyPath": [
    "HKLM\\System\\CurrentControlSet\\Policies"
  ],
  "ValueName": "NtfsDisableEncryption",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
