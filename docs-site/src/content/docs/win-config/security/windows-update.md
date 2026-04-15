---
title: 'Windows Update'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#windows-update'
sidebar:
  order: 2
---

| Option | Description |
| ---- | ---- |
| `Disable WU` | Stops normal Windows Update scanning, download, install, and orchestrated update activity. |
| `Enable WU` | Restores normal update behavior for the controls managed in this section. |
| `Security Only` | Keeps monthly Windows quality and security servicing for the current release while blocking feature upgrades, WU driver updates, optional content, CFR rollouts, preview content, Microsoft product updates, and MRT through Windows Update. |

## Suboptions

| Suboption | Description |
| ---- | ---- |
| `Disable Feature Updates` | Keeps the device on its current Windows release while quality updates continue. New Windows releases are not offered until removed. |
| `Disable Quality Updates (35D)` | Temporarily pauses monthly cumulative updates, including security fixes. Security fixes stop until the pause is cleared or expires. |
| `Disable WU Driver Updates` | Blocks Windows Update from installing driver-class updates. Hardware fixes and newer vendor drivers are not delivered through Windows Update. |
| `Disable Microsoft Product Updates` | Stops updates for other Microsoft products through this channel. Office and other Microsoft apps stop receiving updates from Windows Update. |
| `Disable Optional Updates` | Hides optional update content from normal servicing. Optional fixes and non-essential improvements are not offered. |
| `Disable CFR Features` | Stops gradual rollout features delivered through servicing. New feature rollouts arrive later or only through full releases. |
| `Disable Preview Builds` | Prevents preview and Insider-style update content. Pre-release Windows builds and preview tracks are unavailable. |
| `Disable Store App Updates` | Stops automatic Microsoft Store app updates. Store apps stop receiving background fixes and feature updates. |
| `Disable Device Metadata Retrieval` | Stops automatic retrieval of device metadata from Microsoft. Device names, icons, and related suggestions may be less complete. |
| `Disable Automatic Root Certificate Updates` | Stops automatic refresh of trusted root certificates. Some secure sites, apps, or signed content can fail until trust is updated another way. |
| `Disable Defender Definition Updates` | Stops Defender definition updates from this update path. Malware detection ages quickly unless another definition source is provided. |
| `Block MRT via WU` | Stops the MRT (Malicious Software Removal Tool) from being offered through Windows Update. MRT scans and related reporting are unavailable from this channel. |

> https://learn.microsoft.com/en-us/windows/deployment/update/waas-configure-wufb  
> https://learn.microsoft.com/en-us/windows/deployment/update/waas-wu-settings  
> https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-update  
> https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services
