---
title: 'Cortana'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-cortana'
sidebar:
  order: 33
---

"Cortana was a virtual assistant developed by Microsoft that used the Bing search engine to perform tasks such as setting reminders and answering questions for users."

> https://en.wikipedia.org/wiki/Cortana_(virtual_assistant)  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-search  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-abovelock  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-experience#allowcortana

---

Miscellaneous notes:
```c
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\DevOverrideOneSettings","Length: 16"
"HKCU\Software\Microsoft\Windows\CurrentVersion\Cortana\IsAvailable","Type: REG_DWORD, Length: 4, Data: 1"
```
