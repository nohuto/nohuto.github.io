---
title: 'Shadow Copies'
description: 'Cleanup option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/cleanup/desc.md#shadow-copies'
sidebar:
  order: 6
---

Removes all copies (volume backups). See your current shadows with:
```cmd
vssadmin list shadows /for=<ForVolumeSpec> /shadow=<ShadowID>
```

`<ForVolumeSpec>` -> Volume
`<ShadowID>` -> Shadow copy specified by ShadowID

Command used:
```cmd
vssadmin delete shadows /all /quiet
```
