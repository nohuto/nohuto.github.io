---
title: 'Device Manager'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 15
---

The `Clean` option removes non present devices (`-PresentOnly:$false`/`Status -eq 'Unknown'`) via `/remove-device` ([`pnputil`](https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/pnputil-command-syntax)).

| Component | Description | Note |
| ---- | ---- | ---- |
| `Microphone` | Audio input device | Disable if unused |
| `Speakers` | Audio output device | Disable if unused |
| `High Definition Audio Controller` | Main audio bus/controller for sound devices | Disable if not in use |
| `Generic Monitor` | Basic display driver for monitors | Disabling may affect resolution/brightness (esp. laptops) |
| `WAN Miniports` | Virtual NICs for VPN, PPPoE, remote access, tunneling protocols | Keep if you use VPN/remote access, else can disable |
| `Microsoft ISATAP Adapter` | Tunnels IPv6 over IPv4 infrastructure | Usually safe to disable |
| `Microsoft iSCSI Initiator` | Connects to iSCSI storage targets over network | Disable if you don't use network storage |
| `Microsoft Virtual Drive Enumerator` | Enumerator for virtual drives | Disabling breaks `diskmgmt.msc` |
| `Microsoft RRAS Root Enumerator` | Helper/legacy driver for initializing certain (virtual/older) devices at boot | Usually safe, but can affect legacy/virtual HW |
| `Microsoft System Management BIOS Driver` | Exposes SMBIOS/system info to OS | Disabling breaks GTA V and some system info tools |
| `System Speaker` | Handles system/PC speaker audio (can include monitor audio routing) | Disabling can break monitor audio |

---

Click on `View` > `Devices by connection`.

- Go into `PCI Bus` / `PCI Express Root Complex`
    - Disable all `PCI-to-PCI Bridge` devices, which are unused (`PCI Express Downstream Switch Port`)

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/devman.png?raw=true)

> https://learn.microsoft.com/en-us/powershell/module/pnpdevice/get-pnpdevice?view=windowsserver2025-ps  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/devtest/pnputil-command-syntax
