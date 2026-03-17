---
title: 'Settings Page Visibility'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#settings-page-visibility'
sidebar:
  order: 32
---

It controls which pages in the windows settings app are visible (blocked pages are removed from view and direct access redirects to the main settings page).

```
This policy allows an administrator to block a given set of pages from the System Settings app. Blocked pages will not be visible in the app, and if all pages in a category are blocked the category will be hidden as well. Direct navigation to a blocked page via URI, context menu in Explorer or other means will result in the front page of Settings being shown instead.
```
Path (`String Value`):
```
HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer : SettingsPageVisibility
```
`showonly:` followed by a semicolon separated list of page identifiers to allow
`hide:` followed by a list of pages to block

Page identifiers are the part after `ms-settings:` in a settings URI.

Example:
`showonly:bluetooth` only shows the `Bluetooth` page
`hide:bluetooth;windowsdefender` hides the `Bluetooth` & `Windows Security` pages

All categories of `ms-settings` URIs:
> https://learn.microsoft.com/en-us/windows/apps/develop/launch/launch-settings-app#ms-settings-uri-scheme-reference

Example value:
```bat
hide:sync;signinoptions-launchfaceenrollment;signinoptions-launchfingerprintenrollment;maps;maps-downloadmaps;mobile-devices;family-group;deviceusage;findmydevice
```
It depends on the user what he wants to see and what not, so I won't add a switch for it.
