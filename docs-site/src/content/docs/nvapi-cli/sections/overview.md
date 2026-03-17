---
title: 'Overview'
description: 'NvAPI CLI overview generated from README.'
editUrl: 'https://github.com/nohuto/nvapi-cli/blob/main/README.md'
sidebar:
  order: 1
---

CLI wrapper around NVIDIA's NVAPI for querying and controlling GPU, display, and driver features on Windows. NVAPI is NVIDIA's proprietary driver API that exposes GPU and display capabilities beyond the standard OS interfaces. It's hardware and driver dependent, many functions are supported only on specific GPUs, drivers, or product lines. Expect `NVAPI_NOT_SUPPORTED` for unsupported features.

Note that the documentation is partly parsed from official documentation partly rewritten by myself. The tool isn't yet in its final state, more useful APIs may be added.

> [!CAUTION]
> Use the tool with caution when applying control APIs, I'm not responsible for any damage/issues. This tool is in BETA state, bugs may exist. I didn't test each option on my own yet.

[assets/supported_nvapi.txt](https://github.com/nohuto/nvapi-cli/blob/main/assets/supported_nvapi.txt) includes all NVAPI functions referenced by the current source code. [assets/unsupported_nvapi.txt](https://github.com/nohuto/nvapi-cli/blob/main/assets/unsupported_nvapi.txt) includes NVAPI functions present in the NVAPI SDK header (`nvapi.h`) but not used by the current version.
