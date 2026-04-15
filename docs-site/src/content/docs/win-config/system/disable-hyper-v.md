---
title: 'Hyper-V'
description: 'System option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-hyper-v'
sidebar:
  order: 38
---

"Many third-party virtualization applications don't work together with Hyper-V. Affected applications include VMware Workstation and VirtualBox. These applications might not start virtual machines, or they may fall back to a slower, emulated mode. Many virtualization applications depend on hardware virtualization extensions that are available on most modern processors. It includes Intel VT-x and AMD-V. Only one software component can use this hardware at a time. The hardware cannot be shared between virtualization applications."

> https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/virtualization-apps-not-work-with-hyper-v

## Service/Driver Table

| Option Name | Service/Driver | Description |
| --- | --- | --- |
| HyperV | `bttflt` | Microsoft Hyper-V VHDPMEM BTT Filter |
|  | `gencounter` | Microsoft Hyper-V Generation Counter |
|  | `hvcrash` | Hyper-V Crashdump |
|  | `HvHost` | Provides an interface for the Hyper-V hypervisor to provide per-partition performance counters to the host operating system. |
|  | `hvservice` | Microsoft Hypervisor Service Driver |
|  | `hyperkbd` | Microsoft VMBus Synthetic Keyboard Driver |
|  | `HyperVideo` | Microsoft VMBus Video Device Miniport Driver |
|  | `storflt` | Microsoft Hyper-V Storage Accelerator |
|  | `Vid` | Microsoft Hyper-V Virtualization Infrastructure Driver |
|  | `vmbus` | Virtual Machine Bus |
|  | `vmgid` | Microsoft Hyper-V Guest Infrastructure Driver |
|  | `vmicguestinterface` | Provides an interface for the Hyper-V host to interact with specific services running inside the virtual machine. |
|  | `vmicheartbeat` | Monitors the state of this virtual machine by reporting a heartbeat at regular intervals. This service helps you identify running virtual machines that have stopped responding. |
|  | `vmickvpexchange` | Provides a mechanism to exchange data between the virtual machine and the operating system running on the physical computer. |
|  | `vmicrdv` | Provides a platform for communication between the virtual machine and the operating system running on the physical computer. |
|  | `vmicshutdown` | Provides a mechanism to shut down the operating system of this virtual machine from the management interfaces on the physical computer. |
|  | `vmictimesync` | Synchronizes the system time of this virtual machine with the system time of the physical computer. |
|  | `vmicvmsession` | Provides a mechanism to manage virtual machine with PowerShell via VM session without a virtual network. |
|  | `vmicvss` | Coordinates the communications that are required to use Volume Shadow Copy Service to back up applications and data on this virtual machine from the operating system on the physical computer. |
|  | `vpci` | Microsoft Hyper-V Virtual PCI Bus |
