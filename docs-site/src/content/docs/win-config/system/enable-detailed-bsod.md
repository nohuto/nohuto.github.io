---
title: 'Detailed BSoD'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 30
---

| Aspect                    | New BSoD (Windows 8/10/11)                      | Old BSoD (Windows 7/classic)                                                      |
| ------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Main look                 | Big blue screen, sad face, simple text, QR code | Plain blue text screen, no icons                                                  |
| Stop code shown           | e.g. CRITICAL_PROCESS_DIED                      | e.g. STOP 0x0000007E                                                              |
| Hex parameters            | Hidden                                          | Shown: (0x00000000, 0x00000000...)                                                |
| Faulty driver/module name | Hidden                                          | Often shown (e.g. nvlddmkm.sys)                                                   |
| Extra help                | QR code + link                                  | Text-only advice                                                                  |
| Purpose                   | Less scary, easier to tell support the code     | See the actual debug information                                                  |

Enabling the options includes setting `AutoReboot` to `0` ("The option specifies that Windows automatically restarts your computer").

> https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/memory-dump-file-options#registry-values-for-startup-and-recovery  
> https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/configure-system-failure-and-recovery-options
