---
title: 'Trace Menu'
description: 'Generated from regkit README section: Trace Menu.'
editUrl: 'https://github.com/nohuto/regkit/blob/main/README.md#trace-menu'
sidebar:
  order: 7
---

There are three trace files which are quite similar, 23H2/24H2/25H2. I've done all of them on new installations. Trace loading supports multiple active traces at once and shows "Read on boot" as `Yes (TraceName, ...)`.

The trace key menu shows the kernel paths as they appear in the trace (for example `REGISTRY\\MACHINE\\...`), but trace data is also shown in the standard hives. Registry symbolic links (the `SymbolicLinkValue` targets) are resolved so trace values appear under linked keys (including `CurrentControlSet` and other link keys), and kernel-only roots like `REGISTRY\\A` or `REGISTRY\\WC` remain available. It can also [simulate missing keys](https://github.com/nohuto/regkit#simulated-key-icon) for trace-only data (optional "Simulated Keys" view toggle). You can either use traces for informational purposes or modify them (simulated keys are created on demand).

Note that WPR doesn't pass the type/data so you'll have to find that out on your own. Several ones are documented on my own in the [regkit](/docs/regkit/sections/overview/) repository (see 'Research' menu).

It's recommended that you create your own trace, as the templates are based on my system and IDs such as those for the disk won't be correct for your system. Follow the [wpr-wpa.md](/docs/regkit/guides/wpr-wpa/) guide to create a trace which regkit can use.

Loading traces affects startup time and memory consumption. Therefore, it's recommended to either load only one trace or none at all if you don't use them frequently (loading a trace takes only a few seconds, so it's better to load it when needed than to keep it active all the time). Parsing them doesn't affect the UI/display time, as a different thread is used for it.
