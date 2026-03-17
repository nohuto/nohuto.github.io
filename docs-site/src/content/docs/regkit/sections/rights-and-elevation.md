---
title: 'Rights and Elevation'
description: 'Generated from regkit README section: Rights and Elevation.'
editUrl: 'https://github.com/nohuto/regkit/blob/main/README.md#rights-and-elevation'
sidebar:
  order: 9
---

RegKit can relaunch itself under different security contexts because many registry areas are protected by ACLs and/or owned by TI (TrustedInstaller). Some keys are owned by TI, and only that SID has write permissions (SYSTEM may be read-only). If a key is readable but writes fail with access denied, check the owner and ACLs. If the owner is TI, use the TI mode, if it is SYSTEM, use SYSTEM. Use the Options menu to restart with higher rights or to make the app always relaunch with them on startup.

> [!CAUTION]
> These levels can bypass protections, use them only when you understand the impact.

- Restart as Admin: uses UAC elevation for a standard elevated token
- Restart as SYSTEM: uses an elevated process to duplicate a SYSTEM token, then creates a new RegKit process in the active session
- Restart as TI: uses SYSTEM to start/query the TI service, duplicates its token, then launches RegKit with that token

SYSTEM rights are for example needed for reading keys such as `HKLM\SAM\SAM`, `HKLM\SECURITY\Policy`, TI rights are for example needed to write in keys like `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Component Based Servicing`.
