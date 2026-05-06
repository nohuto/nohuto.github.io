---
title: 'Printers'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 19
---

Disables printer related services (`Spooler`, `PrintWorkFlowUserSvc`, `PrintNotify`, `usbprint`, `McpManagementService`, `PrintScanBrokerService`, `PrintDeviceConfigurationService`), and various optional features / scheduled tasks.

Remove the `Print` option from the context menu:
```
Remove-Item "Registry::HKEY_CLASSES_ROOT\Applications\photoviewer.dll\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\batfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\cmdfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\contact_wab_auto_file\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\emffile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\fonfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\group_wab_auto_file\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\htmlfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\IE.AssocFile.HTM\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\IE.AssocFile.SVG\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\IE.AssocFile.URL\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\IE.AssocFile.XHT\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\inffile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\inifile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\InternetShortcut\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\JSEFile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\JSFile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\opensearchresult\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\otffile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\PBrush\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\pfmfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\regfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\rlefile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\svgfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.avci\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.avcs\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.avif\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.avifs\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.heic\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.heics\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.heif\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.heifs\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.hif\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\.jxl\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\SystemFileAssociations\image\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\ttcfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\ttffile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\txtfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\VBEFile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\VBSFile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\wdpfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\wmffile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\WSFFile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\xhtmlfile\shell\print" -Force -Recurse
Remove-Item "Registry::HKEY_CLASSES_ROOT\zapfile\shell\print" -Force -Recurse
```

This list was created on a stock `W11 LTSC IoT Enterprise 2024` installation via:
```powershell
dir Registry::HKEY_CLASSES_ROOT -Recurse -ea SilentlyContinue | ? { $_.Name -like '*\shell\print' } | select -ExpandProperty Name
```

## Printer Connections

[List](https://learn.microsoft.com/en-us/powershell/module/printmanagement/get-printer?view=windowsserver2025-ps) all printer connections:
```powershell
Get-Printer
```

[Remove](https://learn.microsoft.com/en-us/powershell/module/printmanagement/remove-printer?view=windowsserver2025-ps) a specific printer using it's name:
```powershell
Remove-Printer -Name "Printer Name"
```

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "DisableHTTPPrinting_1",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Turn off printing over HTTP",
  "ExplainText": "This policy setting specifies whether to allow printing over HTTP from this client. Printing over HTTP allows a client to print to printers on the intranet as well as the Internet. Note: This policy setting affects the client side of Internet printing only. It does not prevent this computer from acting as an Internet Printing server and making its shared printers available via HTTP. If you enable this policy setting, it prevents this client from printing to Internet printers over HTTP. If you disable or do not configure this policy setting, users can choose to print to Internet printers over HTTP. Also, see the \"Web-based printing\" policy setting in Computer Configuration/Administrative Templates/Printers.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows NT\\Printers"
  ],
  "ValueName": "DisableHTTPPrinting",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "DisableHTTPPrinting_2",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2_Or_WindowsNETSP1 - At least Windows Server 2003 operating systems with SP1 or Windows XP Professional with SP2",
  "DisplayName": "Turn off printing over HTTP",
  "ExplainText": "This policy setting specifies whether to allow printing over HTTP from this client. Printing over HTTP allows a client to print to printers on the intranet as well as the Internet. Note: This policy setting affects the client side of Internet printing only. It does not prevent this computer from acting as an Internet Printing server and making its shared printers available via HTTP. If you enable this policy setting, it prevents this client from printing to Internet printers over HTTP. If you disable or do not configure this policy setting, users can choose to print to Internet printers over HTTP. Also, see the \"Web-based printing\" policy setting in Computer Configuration/Administrative Templates/Printers.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Printers"
  ],
  "ValueName": "DisableHTTPPrinting",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "DisableWebPnPDownload_1",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2 - At least Windows XP Professional with SP2",
  "DisplayName": "Turn off downloading of print drivers over HTTP",
  "ExplainText": "This policy setting specifies whether to allow this client to download print driver packages over HTTP. To set up HTTP printing, non-inbox drivers need to be downloaded over HTTP. Note: This policy setting does not prevent the client from printing to printers on the Intranet or the Internet over HTTP. It only prohibits downloading drivers that are not already installed locally. If you enable this policy setting, print drivers cannot be downloaded over HTTP. If you disable or do not configure this policy setting, users can download print drivers over HTTP.",
  "KeyPath": [
    "HKCU\\Software\\Policies\\Microsoft\\Windows NT\\Printers"
  ],
  "ValueName": "DisableWebPnPDownload",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "DisableWebPnPDownload_2",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2_Or_WindowsNETSP1 - At least Windows Server 2003 operating systems with SP1 or Windows XP Professional with SP2",
  "DisplayName": "Turn off downloading of print drivers over HTTP",
  "ExplainText": "This policy setting specifies whether to allow this client to download print driver packages over HTTP. To set up HTTP printing, non-inbox drivers need to be downloaded over HTTP. Note: This policy setting does not prevent the client from printing to printers on the Intranet or the Internet over HTTP. It only prohibits downloading drivers that are not already installed locally. If you enable this policy setting, print drivers cannot be downloaded over HTTP. If you disable or do not configure this policy setting, users can download print drivers over HTTP.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Printers"
  ],
  "ValueName": "DisableWebPnPDownload",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Printing.admx",
  "CategoryName": "CplPrinters",
  "PolicyName": "NoAddPrinter",
  "NameSpace": "Microsoft.Policies.Printing",
  "Supported": "Win2k - At least Windows 2000",
  "DisplayName": "Prevent addition of printers",
  "ExplainText": "Prevents users from using familiar methods to add local and network printers. If this policy setting is enabled, it removes the Add Printer option from the Start menu. (To find the Add Printer option, click Start, click Printers, and then click Add Printer.) This setting also removes Add Printer from the Printers folder in Control Panel. Also, users cannot add printers by dragging a printer icon into the Printers folder. If they try, a message appears explaining that the setting prevents the action. However, this setting does not prevent users from using the Add Hardware Wizard to add a printer. Nor does it prevent users from running other programs to add printers. This setting does not delete printers that users have already added. However, if users have not added a printer when this setting is applied, they cannot print. Note: You can use printer permissions to restrict the use of printers without specifying a setting. In the Printers folder, right-click a printer, click Properties, and then click the Security tab. If this policy is disabled, or not configured, users can add printers using the methods described above.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
  ],
  "ValueName": "NoAddPrinter",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "Printing.admx",
  "CategoryName": "CplPrinters",
  "PolicyName": "LegacyDefaultPrinterMode",
  "NameSpace": "Microsoft.Policies.Printing",
  "Supported": "Windows_10_0 - At least Windows Server 2016, Windows 10",
  "DisplayName": "Turn off Windows default printer management",
  "ExplainText": "This preference allows you to change default printer management. If you enable this setting, Windows will not manage the default printer. If you disable this setting, Windows will manage the default printer. If you do not configure this setting, default printer management will not change.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows"
  ],
  "ValueName": "LegacyDefaultPrinterMode",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
