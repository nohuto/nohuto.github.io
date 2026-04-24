---
title: 'Website Access to Language List'
description: 'Privacy option documentation from win-config.'
editUrl: false
sidebar:
  order: 4
---

"Sets the HTTP Accept Language from the Language List opt-out setting." Disables [`Let websites provide locally relevant content by accessing my language list`](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services#181-general).

Using [`Set-WinAcceptLanguageFromLanguageListOptOut`](https://learn.microsoft.com/en-us/powershell/module/international/set-winacceptlanguagefromlanguagelistoptout?view=windowsserver2025-ps):
```powershell
Set-WinAcceptLanguageFromLanguageListOptOut -OptOut $True
```
```c
// $True
"powershell.exe","RegSetValue","HKCU\Control Panel\International\User Profile\HttpAcceptLanguageOptOut","Type: REG_DWORD, Length: 4, Data: 1"
"powershell.exe","RegDeleteValue","HKCU\Software\Microsoft\Internet Explorer\International\AcceptLanguage",""
// $False
"powershell.exe","RegDeleteValue","HKCU\Control Panel\International\User Profile\HttpAcceptLanguageOptOut",""
"powershell.exe","RegSetValue","HKCU\Software\Microsoft\Internet Explorer\International\AcceptLanguage","Type: REG_SZ, Length: 54, Data: en-US;q=0.7,en;q=0.3"
```
