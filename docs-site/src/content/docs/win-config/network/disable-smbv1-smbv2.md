---
title: 'SMBv1/SMBv2'
description: 'Network option documentation from win-config.'
editUrl: false
sidebar:
  order: 10
---

SMBv1 is only needed for old computers or software (that you usually don't have) and should be disabled, as it's unsafe & not efficient.

Detect current states with:
```powershell
Get-SmbServerConfiguration | Select EnableSMB1Protocol, EnableSMB2Protocol
```
Disable it with (`$true` to enable it):
```powershell
Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force
Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol
```

If you want to disable SMBv2 (& SMBv3):
```powershell
Set-SmbServerConfiguration -EnableSMB2Protocol $false -Force
```
`Set-SmbServerConfiguration $false`:
```powershell
"wmiprvse.exe","RegSetValue","HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\SMB2","Type: REG_DWORD, Length: 4, Data: 0"
"wmiprvse.exe","RegSetValue","HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters\SMB1","Type: REG_DWORD, Length: 4, Data: 0"
```

## Effects of Disabling

| Functionality                                      | Disabled when SMBv3 is off       | Disabled when SMBv2 is off       |
|----------------------------------------------------|----------------------------------|----------------------------------|
| Transparent failover                               | Yes                              | No                               |
| Scale-out file server access                       | Yes                              | No                               |
| SMB Multichannel                                   | Yes                              | No                               |
| SMB Direct (RDMA)                                  | Yes                              | No                               |
| Encryption (end-to-end)                            | Yes                              | No                               |
| Directory leasing                                  | Yes                              | No                               |
| Performance optimization (small random I/O)        | Yes                              | No                               |
| Request compounding                                | No                               | Yes                              |
| Larger reads and writes                            | No                               | Yes                              |
| Caching of folder and file properties              | No                               | Yes                              |
| Durable handles                                    | No                               | Yes                              |
| Improved message signing (HMAC SHA-256)            | No                               | Yes                              |
| Improved scalability for file sharing              | No                               | Yes                              |
| Support for symbolic links                         | No                               | Yes                              |
| Client oplock leasing model                        | No                               | Yes                              |
| Large MTU / 10 GbE support                         | No                               | Yes                              |
| Improved energy efficiency (clients can sleep)     | No                               | Yes                              |

> https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3?tabs=client#disable-smbv2-or-smbv3-for-troubleshooting  
> https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3?tabs=server  
> https://techcommunity.microsoft.com/blog/filecab/stop-using-smb1/425858  
> https://thelinuxcode.com/how-to-detect-and-turn-on-off-smbv1-smbv2-and-smbv3-in-windows/
