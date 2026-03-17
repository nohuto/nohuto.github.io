---
title: 'MS Office Telemetry'
description: 'Misc option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/misc/desc.md#disable-ms-office-telemetry'
sidebar:
  order: 10
---

Disables logging, data collection, opts out from CEIP, disables feedback collection and telemetry agent tasks.

| Category                                     | Where it appears | What the agent collects (by default)                                                                                                    | Scope / Versions                                                | Notes & Exceptions                                                                                                                                                                       |
| -------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recently opened documents & templates        | Documents                              | File name; file format/extension; total users; number of Office users/sessions                                                          | Office 2003–2019/2016 (agent supports multiple Office versions) | For network/SharePoint files: only file name + location. If MRU is disabled, no document inventory is collected. Outlook: no document inventory. OneNote: only notebook name + location. |
| Document details                             | Document details                       | User name; computer name; location (path/URL); size (KB); author; last loaded; title; Office version                                    | Office 2003–2019/2016                                           | Same exceptions as above (MRU off, Outlook, OneNote, network/SharePoint).                                                                                                                |
| Recently loaded add-ins & Apps for Office    | Solutions                              | Solution name; total users; number of Office users                                                                                      | Office 2003–2019/2016                                           | -                                                                                                                                                                                        |
| Add-in / App details                         | Solution details                       | User name; computer name; solution version; architecture (x86/x64/ARM); load time; description; size (KB); location (DLL/manifest path) | Office 2003–2019/2016                                           | -                                                                                                                                                                                        |
| User data (agents)                           | Agents                                 | User name; level (telemetry level); computer; last updated; label (1–4); agent version                                                  | All supported                                                   | -                                                                                                                                                                                        |
| Hardware & software inventory (per computer) | Telemetry Processor                    | Computer name; level; users; computers; last updated (date/time)                                                                        | All supported                                                   | -                                                                                                                                                                                        |
| Office deployment mix                        | Deployments                            | Office versions; # of 32-bit deployments; # of 64-bit deployments; # of ARM deployments                                                 | All supported                                                   | -                                                                                                                                                                                        |
| Runtime document telemetry                   | Documents (runtime fields)             | Success (%); sessions; critical compatibility issue or crash; informative compatibility issue or load failure                           | Office 2013/2016/2019 (Excel/Outlook/PowerPoint/Word)           | Shown only after the app is run and documents/solutions are opened.                                                                                                                      |
| Runtime document internals                   | Document details (runtime fields)      | Last loaded (date/time); flags: Has VBA? Has OLE? Has external data connection? Has ActiveX control? Has assembly reference?            | Office 2013/2016/2019 (Excel/Outlook/PowerPoint/Word)           | VBA/OLE/data/ActiveX/assembly info is logged starting from the second open of the document.                                                                                              |
| Runtime document events                      | Document sessions                      | Date/time of critical or informative events                                                                                             | Office 2013/2016/2019 (Excel/Outlook/PowerPoint/Word)           | -                                                                                                                                                                                        |
| Runtime add-in telemetry                     | Solutions (runtime fields)             | Success (%); sessions; critical compatibility issue or crash; informative compatibility issue or load failure; load time                | Office 2013/2016/2019 (Excel/Outlook/PowerPoint/Word)           | Shown only after the add-in/app is loaded during runtime.                                                                                                                                |
| Runtime solution issues                      | Solution issues                        | Event ID; title; explanation; more info; users; sessions                                                                                | Office 2013/2016/2019 (Excel/Outlook/PowerPoint/Word)           | -                                                                                                                                                                                        |
| Not collected (by design)                    | -                                      | File contents; info about files not in MRU                                                                                              | All                                                             | Data for Office Telemetry Dashboard stays in your org's SQL Server; it is not sent to Microsoft. Office diagnostic data is separate and managed by different settings.                   |

---

`HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\16.0\OSM\preventedapplications`

| Value Name        | Value Type | Value Description and Data                                                            |
| ----------------- | ---------- | ------------------------------------------------------------------------------------- |
| accesssolution    | REG_DWORD  | Prevents data for Access solutions from being reported to Office Telemetry Dashboard. |
| olksolution       | REG_DWORD  | Prevents data for Microsoft Outlook solutions.                                        |
| onenotesolution   | REG_DWORD  | Prevents data for OneNote solutions.                                                  |
| pptsolution       | REG_DWORD  | Prevents data for PowerPoint solutions.                                               |
| projectsolution   | REG_DWORD  | Prevents data for Project solutions.                                                  |
| publishersolution | REG_DWORD  | Prevents data for Publisher solutions.                                                |
| visiosolution     | REG_DWORD  | Prevents data for Visio solutions.                                                    |
| wdsolution        | REG_DWORD  | Prevents data for Word solutions.                                                     |
| xlsolution        | REG_DWORD  | Prevents data for Excel solutions.                                                    |

- `1` = Prevent reporting
- `0` = Allow reporting
- Default = `0` (Allow reporting)

---

`HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\16.0\OSM\preventedsolutiontypes`

| Value Name    | Value Type | Value Description and Data                                                  |
| ------------- | ---------- | --------------------------------------------------------------------------- |
| agave         | REG_DWORD  | Prevents data for apps for Office.                                          |
| appaddins     | REG_DWORD  | Prevents data for application-specific add-ins like Excel, PowerPoint, etc. |
| comaddins     | REG_DWORD  | Prevents data for COM add-ins.                                              |
| documentfiles | REG_DWORD  | Prevents data for Office document files.                                    |
| templatefiles | REG_DWORD  | Prevents data for Office template files.                                    |

- `1` = Prevent reporting
- `0` = Allow reporting
- Default = `0` (Allow reporting)

> https://learn.microsoft.com/en-us/office/compatibility/data-that-the-telemetry-agent-collects-in-office  
> https://learn.microsoft.com/en-us/office/compatibility/manage-the-privacy-of-data-monitored-by-telemetry-in-office
