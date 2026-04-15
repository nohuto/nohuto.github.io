---
title: 'Opt-Out DMA Remapping'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#opt-out-dma-remapping'
sidebar:
  order: 7
---

"To ensure compatibility with Kernel DMA Protection and DMAGuard Policy, PCIe device drivers can opt into Direct Memory Access (DMA) remapping. DMA remapping for device drivers protects against memory corruption and malicious DMA attacks, and provides a higher level of compatibility for devices. Also, devices with DMA remapping-compatible drivers can start and perform DMA regardless of lock screen status. On Kernel DMA Protection enabled systems, DMAGuard Policy might block devices, with DMA remapping-incompatible drivers, connected to external/exposed PCIe ports (for example, M.2, Thunderbolt), depending on the policy value set by the system administrator. DMA remapping isn't supported for graphics device drivers. `DmaRemappingCompatible` key is ignored if `RemappingSupported` is set."

"Only use this per-driver method for Windows versions up to Windows 11 23H2. Use the [per-device method](https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/pci/enabling-dma-remapping-for-device-drivers.md#per-device-opt-in-mechanism)."

`per-device` - recommended and preferred mechanism (`DmaRemappingCompatible`)
`per-driver` - legacy mechanism (`RemappingSupported`)

### `DmaRemappingCompatible`

| Value | Meaning |
|--|--|
| 0 | Opt-out, indicates that your driver is incompatible with DMA remapping. |
| 1 | Opt-in, indicates that your driver is fully compatible with DMA remapping. |
| 2 | Opt-in, but only when one or more of the following conditions are met: A. The device is an external device (for example, Thunderbolt); B. DMA verification is enabled in Driver Verifier |
| 3 | Opt-in |
| No registry key | Let the system determine the policy. |

### `RemappingFlags`

| Value | Meaning |
|--|--|
| 0 | If **RemappingSupported** is 1, opt in, unconditionally. |
| 1 | If **RemappingSupported** is 1, opt in, but only when one or more of the following conditions are met: A. The device is an external device (for example, Thunderbolt); B. DMA verification is enabled in Driver Verifier |
| No registry key | Same as 0 value. |

### `RemappingSupported`

| Value | Meaning |
|--|--|
| 0 | Opt-out, indicates the device and driver are incompatible with DMA remapping. |
| 1 | Opt-in, indicates the device and driver are fully compatible with DMA remapping. |
| No registry key | Let the system determine the policy. |

> https://github.com/nohuto/windows-driver-docs/blob/staging/windows-driver-docs-pr/pci/enabling-dma-remapping-for-device-drivers.md

Example paths:
```powershell
\Registry\Machine\SYSTEM\ControlSet001\Services\msisadrv\Parameters : DmaRemappingCompatible
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_1022&DEV_1483&SUBSYS_88081043&REV_00\3&11583659&0&09\Device Parameters\DMA Management : RemappingFlags
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\VEN_1022&DEV_1483&SUBSYS_88081043&REV_00\3&11583659&0&09\Device Parameters\DMA Management : RemappingSupported
```

## EnableNVMeInterface Notes

Since `EnableNVMeInterface` is included in the function, I'll add it here. Default value of `0`, range `0`-`1`? Located in:
```
\Registry\Machine\SYSTEM\ControlSet001\Enum\pci\<dev>\<id>\Device Parameters\StorPort : EnableNVMeInterface
```
`DisableNativeNVMeStack`, range `0`-`1`?
```c
\Registry\Machine\SYSTEM\ControlSet001\Control\StorPort : DisableNativeNVMeStack

DisableNativeNVMeStack db 0 // default
```
> https://github.com/nohuto/win-registry/blob/main/records/StorPort.txt
