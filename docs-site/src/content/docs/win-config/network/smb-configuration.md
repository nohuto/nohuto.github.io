---
title: 'SMB Configuration'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 2
---

Windows Internals (E7-P2, Remote FSDs): SMB uses a client-side remote file system driver (LANMan Redirector) and a server-side remote FSD (`Srv2.sys`). Client settings under `LanmanWorkstation` and server settings under `LanmanServer` govern how those components negotiate and handle SMB traffic.

SMB Client -> Outbound connections:  
> https://learn.microsoft.com/en-us/powershell/module/smbshare/set-smbclientconfiguration?view=windowsserver2025-ps

SMB Server -> Inbound connections:  
> https://learn.microsoft.com/en-us/powershell/module/smbshare/set-smbserverconfiguration?view=windowsserver2025-ps

```powershell
Set-SmbClientConfiguration -EnableBandwidthThrottling $false
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\DisableBandwidthThrottling	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbClientConfiguration -EnableLargeMtu $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\DisableLargeMtu	Type: REG_DWORD, Length: 4, Data: 0
```

```powershell
Set-SmbClientConfiguration -RequireSecuritySignature $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\RequireSecuritySignature	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbClientConfiguration -EnableSecuritySignature $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\enablesecuritysignature	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbClientConfiguration -EncryptionCiphers "AES_256_GCM, AES_256_CCM"
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\CipherSuiteOrder	Type: REG_MULTI_SZ, Length: 52, Data: AES_256_GCM, AES_256_CCM, 

Set-SmbServerConfiguration -RequireSecuritySignature $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\RequireSecuritySignature	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbServerConfiguration -EnableSecuritySignature $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\enablesecuritysignature	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbServerConfiguration -EncryptData $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\EncryptData	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbServerConfiguration -EncryptionCiphers "AES_256_GCM, AES_256_CCM"
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\CipherSuiteOrder	Type: REG_MULTI_SZ, Length: 52, Data: AES_256_GCM, AES_256_CCM, 

Set-SmbServerConfiguration -RejectUnencryptedAccess $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\RejectUnencryptedAccess	Type: REG_DWORD, Length: 4, Data: 1
```
Encryption is enabled by default, some users reported slow read and write speeds. Disabling the encryption  (`$false`) may improve it, otherwise leave it enabled for your own security. Windows automatically uses the most advanced cipher, still 3.1.1 uses `128-GCM` by default. The last command prevent clients that do not support SMB encryption from connecting to encrypted shares.
> https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/overview-server-message-block-signing  
> https://techcommunity.microsoft.com/blog/filecab/configure-smb-signing-with-confidence/2418102

```powershell
Set-SmbClientConfiguration -EnableMultiChannel $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\DisableMultiChannel	Type: REG_DWORD, Length: 4, Data: 0
```
Part of SMB3, is enabled by default. "Multichannel enables file servers to use multiple network connections simultaneously"
> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn610980(v=ws.11)

Disabling leasing may help, but it disables core features like read/write/handle caching that negatively impact many applications, which rely on it.
```powershell
Set-SmbServerConfiguration -EnableLeasing $false
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\DisableLeasing	Type: REG_DWORD, Length: 4, Data: 1
```
> https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/slow-smb-file-transfer#slow-open-of-office-documents

```powershell
Set-SmbClientConfiguration -EnableSMBQUIC $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\EnableSMBQUIC	Type: REG_DWORD, Length: 4, Data: 1

Set-SmbServerConfiguration -EnableSMBQUIC $true
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\EnableSMBQUIC	Type: REG_DWORD, Length: 4, Data: 1
```
Uses QUIC instead of TCP - [SMB over QUIC prerequisites](https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-over-quic?tabs=windows-admin-center%2Cpowershell2%2Cwindows-admin-center1#prerequisites)
> https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-over-quic?tabs=powershell%2Cpowershell2%2Cwindows-admin-center1

`None` - No min/max protocol version
`SMB202` - SMB 2.0.2
`SMB210` - SMB 2.1.0
`SMB300` - SMB 3.0.0
`SMB302` - SMB 3.0.2
`SMB311` - SMB 3.1.1

```powershell
Set-SmbServerConfiguration -Smb2DialectMin SMB311 -Smb2DialectMax None
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\MaxSmb2Dialect	Type: REG_DWORD, Length: 4, Data: 65536
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\MinSmb2Dialect	Type: REG_DWORD, Length: 4, Data: 785

Set-SmbClientConfiguration -Smb2DialectMin SMB311 -Smb2DialectMax None
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\MaxSmb2Dialect	Type: REG_DWORD, Length: 4, Data: 65536
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\MinSmb2Dialect	Type: REG_DWORD, Length: 4, Data: 785
```
By default is it set to `None`, which means that the client can use any supported version. SMB 3.1.1, the most secure dialect of the protocol.
> https://learn.microsoft.com/en-us/windows-server/storage/file-server/manage-smb-dialects?tabs=powershell  
> https://techcommunity.microsoft.com/blog/filecab/controlling-smb-dialects/860024

Disable default sharing:
```powershell
Set-SmbServerConfiguration -AutoShareServer $false -AutoShareWorkstation $false -Force
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\AutoShareServer	Type: REG_DWORD, Length: 4, Data: 0
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\AutoShareWks	Type: REG_DWORD, Length: 4, Data: 0
```
> https://learn.microsoft.com/en-us/powershell/module/smbshare/set-smbserverconfiguration?view=windowsserver2025-ps  
> https://woshub.com/enable-remote-access-to-admin-shares-in-workgroup/

---

`Require NTLMv2 Session Security` (options applied for clients & servers):  
"This security setting allows a client to require the negotiation of 128-bit encryption and/or NTLMv2 session security. These values are dependent on the LAN Manager Authentication Level security setting value. The options are:

Require NTLMv2 session security: The connection will fail if NTLMv2 protocol is not negotiated.
Require 128-bit encryption: The connection will fail if strong encryption (128-bit) is not negotiated."

> https://en.wikipedia.org/wiki/NTLM#NTLMv2

```c
// NTLMv2 Off - 128 Bit Encryption On (default)
RegSetValue	HKLM\System\CurrentControlSet\Control\Lsa\MSV1_0\NTLMMinClientSec	Type: REG_DWORD, Length: 4, Data: 536870912

// NTLMv2 On - 128 Bit Encryption On
RegSetValue	HKLM\System\CurrentControlSet\Control\Lsa\MSV1_0\NTLMMinClientSec	Type: REG_DWORD, Length: 4, Data: 537395200

// NTLMv2 Off - 128 Bit Encryption Off
RegSetValue	HKLM\System\CurrentControlSet\Control\Lsa\MSV1_0\NTLMMinClientSec	Type: REG_DWORD, Length: 4, Data: 0
```

---

`Send unencrypted password to connect to third-party SMB servers`:  
```c
// Enabled (security risk)
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\EnablePlainTextPassword	Type: REG_DWORD, Length: 4, Data: 1

// Disabled (default)
RegSetValue	HKLM\System\CurrentControlSet\Services\LanmanWorkstation\Parameters\EnablePlainTextPassword	Type: REG_DWORD, Length: 4, Data: 0
```
