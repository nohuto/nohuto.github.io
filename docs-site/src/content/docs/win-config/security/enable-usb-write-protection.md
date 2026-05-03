---
title: 'USB Write Protection'
description: 'Security option documentation from win-config.'
editUrl: false
sidebar:
  order: 18
---

Restricts write access to USB devices (read only). You can also change it with `diskpart`, by selecting the disk with `select disk` and chaning it to read only with `attributes disk set readonly` (revert it with `attributes disk clear readonly`).

Rather leave USB connection error notifications enabled, unless there's a specific reason for it.
