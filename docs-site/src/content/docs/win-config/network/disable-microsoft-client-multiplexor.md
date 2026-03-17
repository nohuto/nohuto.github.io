---
title: 'Microsoft Client/Multiplexor'
description: 'Network option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/network/desc.md#disable-microsoft-clientmultiplexor'
sidebar:
  order: 20
---

Disables the Client for Microsoft Networks (`ms_msclient`) and the Microsoft Network Adapter Multiplexor Protocol (`ms_implat`) bindings on all adapters. This blocks SMB client access and disables NIC teaming.

Windows Internals (E7-P2, Remote FSDs): SMB client I/O is handled by the LANMan Redirector (client-side remote FSD) which translates file I/O into SMB commands, while the server side uses `Srv2.sys`. Disabling `ms_msclient` prevents the redirector from binding to the adapter, so SMB client access is effectively disabled regardless of SMB version. This is broader than the SMBv1 toggle (which only removes the legacy protocol).
