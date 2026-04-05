---
title: 'Legacy TLS/Crypto'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-legacy-tlscrypto'
sidebar:
  order: 16
---

Disables legacy/insecure protocols, ciphers, renegotiation, hashes, and forces .NET apps to use strong cryptography (Disables RC2 (40/56/128), RC4 (40/56/64/128), DES, 3DES, NULL, MD5/SHA-1, SSL 2.0/3.0, TLS 1.0/1.1, DTLS 1.0, insecure TLS renegotiation - Enables TLS SCSV, .NET StrongCrypto & SystemDefaultTlsVersions, NTLMv2 only). Windows may use insecure connections for e.g. older software (compatibility reasons), so disabling them can cause issues with old software.

| Setting | Description | Registry security level |
| ---- | ---- | ---- |
| Send LM & NTLM responses | Client devices use LM and NTLM authentication, and they never use NTLMv2 session security. Domain controllers accept LM, NTLM, and NTLMv2 authentication. | 0 |
| Send LM & NTLM use NTLMv2 session security if negotiated | Client devices use LM and NTLM authentication, and they use NTLMv2 session security if the server supports it. Domain controllers accept LM, NTLM, and NTLMv2 authentication. | 1 |
| Send NTLM response only | Client devices use NTLMv1 authentication, and they use NTLMv2 session security if the server supports it. Domain controllers accept LM, NTLM, and NTLMv2 authentication. | 2 |
| Send NTLMv2 response only | Client devices use NTLMv2 authentication, and they use NTLMv2 session security if the server supports it. Domain controllers accept LM, NTLM, and NTLMv2 authentication. | 3 |
| Send NTLMv2 response only. Refuse LM | Client devices use NTLMv2 authentication, and they use NTLMv2 session security if the server supports it. Domain controllers refuse to accept LM authentication, and they'll accept only NTLM and NTLMv2 authentication. | 4 |
| Send NTLMv2 response only. Refuse LM & NTLM | Client devices use NTLMv2 authentication, and they use NTLMv2 session security if the server supports it. Domain controllers refuse to accept LM and NTLM authentication, and they'll accept only NTLMv2 authentication. | 5 |

Level `5` gets applied.

> https://browserleaks.com/tls  
> https://learn.microsoft.com/en-us/dotnet/framework/network-programming/tls#schusestrongcrypto  
> https://dirteam.com/sander/2019/07/30/howto-disable-weak-protocols-cipher-suites-and-hashing-algorithms-on-web-application-proxies-ad-fs-servers-and-windows-servers-running-azure-ad-connect/  
> https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/network-security-lan-manager-authentication-level

![](https://github.com/nohuto/win-config/blob/main/security/images/insecureconn.png?raw=true)

DTLS 1.2 & TLS 1.3:
```json
{
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\DTLS 1.2\\Server": {
    "Enabled": { "Type": "REG_DWORD", "Data": 1 },
    "DisabledByDefault": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\DTLS 1.2\\Client": {
    "Enabled": { "Type": "REG_DWORD", "Data": 1 },
    "DisabledByDefault": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.3\\Server": {
    "Enabled": { "Type": "REG_DWORD", "Data": 1 },
    "DisabledByDefault": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\SCHANNEL\\Protocols\\TLS 1.3\\Client": {
    "Enabled": { "Type": "REG_DWORD", "Data": 1 },
    "DisabledByDefault": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SOFTWARE\\Microsoft\\.NETFramework\\v2.0.50727": {
    "SystemDefaultTlsVersions": { "Type": "REG_DWORD", "Data": 1 }
  },
  "HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\.NETFramework\\v2.0.50727": {
    "SystemDefaultTlsVersions": { "Type": "REG_DWORD", "Data": 1 }
  },
  "HKLM\\SOFTWARE\\Microsoft\\.NETFramework\\v4.0.30319": {
    "SystemDefaultTlsVersions": { "Type": "REG_DWORD", "Data": 1 }
  },
  "HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\.NETFramework\\v4.0.30319": {
    "SystemDefaultTlsVersions": { "Type": "REG_DWORD", "Data": 1 }
  },
  "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WinRM\\Client": {
    "AllowBasic": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa": {
    "restrictanonymoussam": { "Type": "REG_DWORD", "Data": 1 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanManServer\\Parameters": {
    "restrictnullsessaccess": { "Type": "REG_DWORD", "Data": 1 },
    "AutoShareWks": { "Type": "REG_DWORD", "Data": 0 }
  },
  "HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA": {
    "restrictanonymous": { "Type": "REG_DWORD", "Data": 1 }
  }
}
```
