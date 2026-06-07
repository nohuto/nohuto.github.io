---
title: 'Trusted Path Credential Prompting'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
---

This policy setting requires the user to enter Microsoft Windows credentials using a trusted path, to prevent a Trojan horse or other types of malicious code from stealing the user's Windows credentials.

## [Windows Policies](https://noverse.dev/policies)

| Policy | Key Path | Value Name |
| --- | --- | --- |
| [Require trusted path for credential entry](https://noverse.dev/policies?p=CredUI*EnableSecureCredentialPrompting) | `HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\CredUI` | `EnableSecureCredentialPrompting` |
