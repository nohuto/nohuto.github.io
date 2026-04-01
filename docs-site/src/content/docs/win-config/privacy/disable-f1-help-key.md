---
title: 'F1 Help Key'
description: 'Privacy option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/privacy/desc.md#disable-f1-help-key'
sidebar:
  order: 52
---

Works via renaming `HelpPane.exe` (Help and Support Windows desktop application) which was the help component in `W8`/`W8.1`. The executeable still exists but calls to it will either start the `Get Started` application (if user is offline), or opens a browser instance and redirects the browser to an online topic. Note that `HelpPane` still handles the `F1` shortcut.

If the option is disabled, pressing `F1` on your desktop will take you to a search query like:
```
https://www.bing.com/search?q=how+to+get+help+in+windows+11
```
