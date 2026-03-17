---
title: 'Automatic Folder Type Discovery'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#disable-automatic-folder-type-discovery'
sidebar:
  order: 11
---

"Folder discovery is a feature that customizes the view settings of folders based on their content. For example, a folder with images might display thumbnails, while a folder with documents might show a list view. While this can be useful, it can also be frustrating if you prefer a uniform view for all folders."

Removing the `Bags` & `BagMRU` key resets all folder settings (view, size,...), `NotSpecified` sets the template to `General Items`. The other templates would be `Documents`, `Music`, `Videos` (folder: `Properties > Customize > Optimize this folder for:`)

The revert may not work correctly yet, as it only creates the `Bags`/`BagsMRU` keys.

> https://www.insomniacgeek.com/posts/how-to-disable-windows-folder-discovery/  
> https://github.com/LesFerch/WinSetView
