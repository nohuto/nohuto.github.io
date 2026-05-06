---
title: 'Windows Update'
description: 'Security option documentation from win-config.'
editUrl: false
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

## [Windows Policies](https://raw.githubusercontent.com/nohuto/admx-parser/refs/heads/main/assets/policies.json)

```json
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DriverSearchPlaces_SearchOrderConfiguration",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Specify search order for device driver source locations",
  "ExplainText": "This policy setting allows you to specify the order in which Windows searches source locations for device drivers. If you enable this policy setting, you can select whether Windows searches for drivers on Windows Update unconditionally, only if necessary, or not at all. Note that searching always implies that Windows will attempt to search Windows Update exactly one time. With this setting, Windows will not continually search for updates. This setting is used to ensure that the best software will be found for the device, even if the network is temporarily available. If the setting for searching only if needed is specified, then Windows will search for a driver only if a driver is not locally available on the system. If you disable or do not configure this policy setting, members of the Administrators group can determine the priority order in which Windows searches source locations for device drivers.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DriverSearching"
  ],
  "Elements": [
    { "Type": "Enum", "ValueName": "SearchOrderConfig", "Items": [
        { "DisplayName": "Always search Windows Update", "Data": "1" },
        { "DisplayName": "Search Windows Update only if needed", "Data": "2" },
        { "DisplayName": "Do not search Windows Update", "Data": "0" }
      ]
    }
  ]
},
{
  "File": "DeviceSetup.admx",
  "CategoryName": "DeviceInstall_Category",
  "PolicyName": "DeviceMetadata_PreventDeviceMetadataFromNetwork",
  "NameSpace": "Microsoft.Policies.DeviceSoftwareSetup",
  "Supported": "Windows7 - At least Windows Server 2008 R2 or Windows 7",
  "DisplayName": "Prevent automatic download of applications associated with device metadata",
  "ExplainText": "This policy setting allows you to prevent Windows from downloading applications associated with device metadata. If you enable this policy setting, Windows does not download applications associated with device metadata for installed devices. This policy setting overrides the setting in the Device Installation Settings dialog box (Control Panel > System and Security > System > Advanced System Settings > Hardware tab). If you disable or do not configure this policy setting, the setting in the Device Installation Settings dialog box controls whether Windows downloads applications associated with device metadata.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Device Metadata"
  ],
  "ValueName": "PreventDeviceMetadataFromNetwork",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "CertMgr_DisableAutoRootUpdates",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsXPSP2_Or_WindowsNETSP1 - At least Windows Server 2003 operating systems with SP1 or Windows XP Professional with SP2",
  "DisplayName": "Turn off Automatic Root Certificates Update",
  "ExplainText": "This policy setting specifies whether to automatically update root certificates using the Windows Update website. Typically, a certificate is used when you use a secure website or when you send and receive secure email. Anyone can issue certificates, but to have transactions that are as secure as possible, certificates must be issued by a trusted certificate authority (CA). Microsoft has included a list in Windows XP and other products of companies and organizations that it considers trusted authorities. If you enable this policy setting, when you are presented with a certificate issued by an untrusted root authority, your computer will not contact the Windows Update website to see if Microsoft has added the CA to its list of trusted authorities. If you disable or do not configure this policy setting, your computer will contact the Windows Update website.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\SystemCertificates\\AuthRoot"
  ],
  "ValueName": "DisableRootAutoUpdate",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "DriverSearchPlaces_DontSearchWindowsUpdate",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsVistaToXPSP2 - Windows Server 2008, Windows Server 2003, Windows Vista, and Windows XP SP2",
  "DisplayName": "Turn off Windows Update device driver searching",
  "ExplainText": "This policy setting specifies whether Windows searches Windows Update for device drivers when no local drivers for a device are present. If you enable this policy setting, Windows Update is not searched when a new device is installed. If you disable this policy setting, Windows Update is always searched for drivers when no local drivers are present. If you do not configure this policy setting, searching Windows Update is optional when installing a device. Also see \"Turn off Windows Update device driver search prompt\" in \"Administrative Templates/System,\" which governs whether an administrator is prompted before searching Windows Update for device drivers if a driver is not found locally. Note: This policy setting is replaced by \"Specify Driver Source Search Order\" in \"Administrative Templates/System/Device Installation\" on newer versions of Windows.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\DriverSearching"
  ],
  "ValueName": "DontSearchWindowsUpdate",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "ICM.admx",
  "CategoryName": "InternetManagement_Settings",
  "PolicyName": "RemoveWindowsUpdate_ICM",
  "NameSpace": "Microsoft.Policies.InternetCommunicationManagement",
  "Supported": "WindowsUpdate - At least Windows Server 2003 operating systems, Windows XP Professional Service Pack 1, or Windows 2000 Service Pack 3",
  "DisplayName": "Turn off access to all Windows Update features",
  "ExplainText": "This policy setting allows you to remove access to Windows Update. If you enable this policy setting, all Windows Update features are removed. This includes blocking access to the Windows Update website at http://windowsupdate.microsoft.com, from the Windows Update hyperlink on the Start menu, and also on the Tools menu in Internet Explorer. Windows automatic updating is also disabled; you will neither be notified about nor will you receive critical updates from Windows Update. This policy setting also prevents Device Manager from automatically installing driver updates from the Windows Update website. If you disable or do not configure this policy setting, users can access the Windows Update website and enable automatic updating to receive notifications and critical updates from Windows Update. Note: This policy applies only when this PC is configured to connect to an intranet update service using the \"Specify intranet Microsoft update service location\" policy.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "DisableWindowsUpdateAccess",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "SignatureUpdate",
  "PolicyName": "SignatureUpdate_DefinitionUpdateFileSharesSources",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Define file shares for downloading security intelligence updates",
  "ExplainText": "This policy setting allows you to configure UNC file share sources for downloading security intelligence updates. Sources will be contacted in the order specified. The value of this setting should be entered as a pipe-separated string enumerating the security intelligence update sources. For example: \"{\\\\unc1 | \\\\unc2 }\". The list is empty by default. If you enable this setting, the specified sources will be contacted for security intelligence updates. Once security intelligence updates have been successfully downloaded from one specified source, the remaining sources in the list will not be contacted. If you disable or do not configure this setting, the list will remain empty by default and no sources will be contacted.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Signature Updates"
  ],
  "Elements": [
    { "Type": "Text", "ValueName": "DefinitionUpdateFileSharesSources" }
  ]
},
{
  "File": "WindowsDefender.admx",
  "CategoryName": "SignatureUpdate",
  "PolicyName": "SignatureUpdate_FallbackOrder",
  "NameSpace": "Microsoft.Policies.WindowsDefender",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Define the order of sources for downloading security intelligence updates",
  "ExplainText": "This policy setting allows you to define the order in which different security intelligence update sources should be contacted. The value of this setting should be entered as a pipe-separated string enumerating the security intelligence update sources in order. Possible values are: \u201cInternalDefinitionUpdateServer\u201d, \u201cMicrosoftUpdateServer\u201d, \u201cMMPC\u201d, and \u201cFileShares\u201d For example: { InternalDefinitionUpdateServer | MicrosoftUpdateServer | MMPC } If you enable this setting, security intelligence update sources will be contacted in the order specified. Once security intelligence updates have been successfully downloaded from one specified source, the remaining sources in the list will not be contacted. If you disable or do not configure this setting, security intelligence update sources will be contacted in a default order.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Signature Updates"
  ],
  "Elements": [
    { "Type": "Text", "ValueName": "FallbackOrder" }
  ]
},
{
  "File": "WindowsStore.admx",
  "CategoryName": "WindowsStore",
  "PolicyName": "DisableAutoInstall",
  "NameSpace": "Microsoft.Policies.WindowsStore",
  "Supported": "Windows_6_3 - At least Windows Server 2012 R2, Windows 8.1 or Windows RT 8.1",
  "DisplayName": "Turn off Automatic Download and Install of updates",
  "ExplainText": "Enables or disables the automatic download and installation of app updates. If you enable this setting, the automatic download and installation of app updates is turned off. If you disable this setting, the automatic download and installation of app updates is turned on. If you don't configure this setting, the automatic download and installation of app updates is determined by a registry setting that the user can change using Settings in the Microsoft Store.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\WindowsStore"
  ],
  "ValueName": "AutoDownload",
  "Elements": [
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "4" }
  ]
},
{
  "File": "WindowsStore.admx",
  "CategoryName": "WindowsStore",
  "PolicyName": "DisableAutoDownloadWin8",
  "NameSpace": "Microsoft.Policies.WindowsStore",
  "Supported": "Windows8 - At least Windows Server 2012, Windows 8 or Windows RT",
  "DisplayName": "Turn off Automatic Download of updates on Win8 machines",
  "ExplainText": "Enables or disables the automatic download of app updates on PCs running Windows 8. If you enable this setting, the automatic download of app updates is turned off. If you disable this setting, the automatic download of app updates is turned on. If you don't configure this setting, the automatic download of app updates is determined by a registry setting that the user can change using Settings in the Microsoft Store.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\WindowsStore"
  ],
  "ValueName": "AutoDownload",
  "Elements": [
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "3" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateExperience",
  "PolicyName": "AutoUpdateCfg",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "WU_SUPPORTED_XPSP1_or_Win2kSP3_AUOption7_SUPPORTED_Server2016 - Windows XP Professional Service Pack 1 or At least Windows 2000 Service Pack 3 Option 7 only supported on servers of at least Windows Server 2016 edition\u200b",
  "DisplayName": "Configure Automatic Updates",
  "ExplainText": "Specifies whether this computer will receive security updates and other important downloads through the Windows automatic updating service. Note: This policy does not apply to Windows RT. This setting lets you specify whether automatic updates are enabled on this computer. If the service is enabled, you must select one of the four options in the Group Policy Setting: 2 = Notify before downloading and installing any updates. When Windows finds updates that apply to this computer, users will be notified that updates are ready to be downloaded. After going to Windows Update, users can download and install any available updates. 3 = (Default setting) Download the updates automatically and notify when they are ready to be installed Windows finds updates that apply to the computer and downloads them in the background (the user is not notified or interrupted during this process). When the downloads are complete, users will be notified that they are ready to install. After going to Windows Update, users can install them. 4 = Automatically download updates and install them on the schedule specified below. When \"Automatic\" is selected as the scheduled install time, Windows will automatically check, download, and install updates. The device will reboot as per Windows default settings unless configured by group policy. (Applies to Windows 10, version 1809 and higher) Specify the schedule using the options in the Group Policy Setting. For version 1709 and above, there is an additional choice of limiting updating to a weekly, bi-weekly, or monthly occurrence. If no schedule is specified, the default schedule for all installations will be every day at 3:00 AM. If any updates require a restart to complete the installation, Windows will restart the computer automatically. (If a user is signed in to the computer when Windows is ready to restart, the user will be notified and given the option to delay the restart.) On Windows 8 and later, you can set updates to install during automatic maintenance instead of a specific schedule. Automatic maintenance will install updates when the computer is not in use and avoid doing so when the computer is running on battery power. If automatic maintenance is unable to install updates for 2 days, Windows Update will install updates right away. Users will then be notified about an upcoming restart, and that restart will only take place if there is no potential for accidental data loss. 5 = Allow local administrators to select the configuration mode that Automatic Updates should notify and install updates. (This option has not been carried over to any Win 10 Versions) With this option, local administrators will be allowed to use the Windows Update control panel to select a configuration option of their choice. Local administrators will not be allowed to disable the configuration for Automatic Updates. 7 = Notify for install and notify for restart. (Windows Server only) With this option from Windows Server 2016, applicable only to Server SKU devices, local administrators will be allowed to use Windows Update to proceed with installations or reboots manually. If the status for this policy is set to Disabled, any updates that are available on Windows Update must be downloaded and installed manually. To do this, search for Windows Update using Start. If the status is set to Not Configured, use of Automatic Updates is not specified at the Group Policy level. However, an administrator can still configure Automatic Updates through Control Panel.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU"
  ],
  "ValueName": "NoAutoUpdate",
  "Elements": [
    { "Type": "Enum", "ValueName": "AUOptions", "Items": [
        { "DisplayName": "2 - Notify for download and auto install", "Data": "2" },
        { "DisplayName": "3 - Auto download and notify for install", "Data": "3" },
        { "DisplayName": "4 - Auto download and schedule the install", "Data": "4" },
        { "DisplayName": "5 - Allow local admin to choose setting", "Data": "5" },
        { "DisplayName": "7 - Auto Download, Notify to install, Notify to Restart", "Data": "7" }
      ]
    },
    { "Type": "Boolean", "ValueName": "AutomaticMaintenanceEnabled", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Enum", "ValueName": "ScheduledInstallDay", "Items": [
        { "DisplayName": "0 - Every day", "Data": "0" },
        { "DisplayName": "1 - Every Sunday", "Data": "1" },
        { "DisplayName": "2 - Every Monday", "Data": "2" },
        { "DisplayName": "3 - Every Tuesday", "Data": "3" },
        { "DisplayName": "4 - Every Wednesday", "Data": "4" },
        { "DisplayName": "5 - Every Thursday", "Data": "5" },
        { "DisplayName": "6 - Every Friday", "Data": "6" },
        { "DisplayName": "7 - Every Saturday", "Data": "7" }
      ]
    },
    { "Type": "Enum", "ValueName": "ScheduledInstallTime", "Items": [
        { "DisplayName": "Automatic", "Data": "24" },
        { "DisplayName": "00:00", "Data": "0" },
        { "DisplayName": "01:00", "Data": "1" },
        { "DisplayName": "02:00", "Data": "2" },
        { "DisplayName": "03:00", "Data": "3" },
        { "DisplayName": "04:00", "Data": "4" },
        { "DisplayName": "05:00", "Data": "5" },
        { "DisplayName": "06:00", "Data": "6" },
        { "DisplayName": "07:00", "Data": "7" },
        { "DisplayName": "08:00", "Data": "8" },
        { "DisplayName": "09:00", "Data": "9" },
        { "DisplayName": "10:00", "Data": "10" },
        { "DisplayName": "11:00", "Data": "11" },
        { "DisplayName": "12:00", "Data": "12" },
        { "DisplayName": "13:00", "Data": "13" },
        { "DisplayName": "14:00", "Data": "14" },
        { "DisplayName": "15:00", "Data": "15" },
        { "DisplayName": "16:00", "Data": "16" },
        { "DisplayName": "17:00", "Data": "17" },
        { "DisplayName": "18:00", "Data": "18" },
        { "DisplayName": "19:00", "Data": "19" },
        { "DisplayName": "20:00", "Data": "20" },
        { "DisplayName": "21:00", "Data": "21" },
        { "DisplayName": "22:00", "Data": "22" },
        { "DisplayName": "23:00", "Data": "23" }
      ]
    },
    { "Type": "Boolean", "ValueName": "AllowMUUpdateService", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ScheduledInstallEveryWeek", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ScheduledInstallFirstWeek", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ScheduledInstallSecondWeek", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ScheduledInstallThirdWeek", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "ScheduledInstallFourthWeek", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "EnabledValue", "Data": "0" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WSUSOffering",
  "PolicyName": "CorpWuURL",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "WU_SUPPORTED_Win2kSP3_Or_XPSP1_NoWinRT - At least Windows XP Professional Service Pack 1 or Windows 2000 Service Pack 3, excluding Windows RT",
  "DisplayName": "Specify intranet Microsoft update service location",
  "ExplainText": "Specifies an intranet server to host updates from Microsoft Update. You can then use this update service to automatically update computers on your network. This setting lets you specify a server on your network to function as an internal update service. The Automatic Updates client will search this service for updates that apply to the computers on your network. To use this setting, you must set two server name values: the server from which the Automatic Updates client detects and downloads updates, and the server to which updated workstations upload statistics. You can set both values to be the same server. An optional server name value can be specified to configure Windows Update Agent to download updates from an alternate download server instead of the intranet update service. If the status is set to Enabled, the Automatic Updates client connects to the specified intranet Microsoft update service (or alternate download server), instead of Windows Update, to search for and download updates. Enabling this setting means that end users in your organization don't have to go through a firewall to get updates, and it gives you the opportunity to test updates before deploying them. If the status is set to Disabled or Not Configured, and if Automatic Updates is not disabled by policy or user preference, the Automatic Updates client connects directly to the Windows Update site on the Internet. The alternate download server configures the Windows Update Agent to download files from an alternative download server instead of the intranet update service. The option to download files with missing Urls allows content to be downloaded from the Alternate Download Server when there are no download Urls for files in the update metadata. This option should only be used when the intranet update service does not provide download Urls in the update metadata for files which are present on the alternate download server. Note: If the \"Configure Automatic Updates\" policy is disabled, then this policy has no effect. Note: If the \"Alternate Download Server\" is not set, it will use the intranet update service by default to download updates. Note: The option to \"Download files with no Url...\" is only used if the \"Alternate Download Server\" is set. Note: This policy is not supported on Windows RT. Setting this policy will not have any effect on Windows RT PCs. To ensure the highest level of security, Microsoft recommends securing WSUS with TLS/SSL protocol, thereby using HTTPS based intranet servers to keep systems secure. If a proxy is required, we recommend configuring system proxy. To ensure highest levels of security, additionally leverage WSUS TLS certificate pinning on all devices. In order to keep clients inherently secure, we are no longer allowing intranet servers to leverage user proxy by default for detecting updates. If you need to leverage user proxy for detecting updates while using an intranet server despite the vulnerabilities it presents, you must configure the proxy behavior to \"Allow user proxy to be used as a fallback if detection using system proxy fails\". Detection for updates against intranet servers will fail when user proxy is needed as a fallback and the alternate proxy behavior is not configured.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "Elements": [
    { "Type": "Text", "ValueName": "WUServer" },
    { "Type": "Text", "ValueName": "WUStatusServer" },
    { "Type": "Text", "ValueName": "UpdateServiceUrlAlternate" },
    { "Type": "Boolean", "ValueName": "FillEmptyContentUrls", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Boolean", "ValueName": "DoNotEnforceEnterpriseTLSCertPinningForUpdateDetection", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Enum", "ValueName": "SetProxyBehaviorForUpdateDetection", "Items": [
        { "DisplayName": "Only use system proxy for detecting updates (default)", "Data": "0" },
        { "DisplayName": "Allow user proxy to be used as a fallback if detection using system proxy fails", "Data": "1" }
      ]
    }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WSUSOffering",
  "PolicyName": "DoNotConnectToWindowsUpdateInternetLocations",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_6_3 - At least Windows Server 2012 R2, Windows 8.1 or Windows RT 8.1",
  "DisplayName": "Do not connect to any Windows Update Internet locations",
  "ExplainText": "Even when Windows Update is configured to receive updates from an intranet update service, it will periodically retrieve information from the public Windows Update service to enable future connections to Windows Update, and other services like Microsoft Update or the Windows Store. Enabling this policy will disable that functionality, and may cause connection to public services such as the Windows Store to stop working. Note: This policy applies only when this PC is configured to connect to an intranet update service using the \"Specify intranet Microsoft update service location\" policy.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "DoNotConnectToWindowsUpdateInternetLocations",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateOffering",
  "PolicyName": "TargetReleaseVersion",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_NOARM - At least Windows Server 2016 or Windows 10",
  "DisplayName": "Select the target Feature Update version",
  "ExplainText": "Enter the product and version as listed on the Windows Update target version page: aka.ms/WindowsTargetVersioninfo The device will request that Windows Update product and version in subsequent scans. Entering a target product and clicking OK or Apply means I accept the Microsoft Software License Terms for it found at aka.ms/WindowsTargetVersioninfo. If an organization is licensing the software, I am authorized to bind the organization. If you enter an invalid value, you will remain on your current version until you correct the values to a supported product and version.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "TargetReleaseVersion",
  "Elements": [
    { "Type": "Text", "ValueName": "ProductVersion" },
    { "Type": "Text", "ValueName": "TargetReleaseVersionInfo" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateOffering",
  "PolicyName": "ManagePreviewBuilds",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_RS3 - At least Windows Server 2016, Windows 10 Version 1709",
  "DisplayName": "Manage preview builds",
  "ExplainText": "Enable this policy to manage which updates you receive prior to the update being released to the world. Dev Channel Ideal for highly technical users. Insiders in the Dev Channel will receive builds from our active development branch that is earliest in a development cycle. These builds are not matched to a specific Windows 10 release. Beta Channel Ideal for feature explorers who want to see upcoming Windows 10 features. Your feedback will be especially important here as it will help our engineers ensure key issues are fixed before a major release. Release Preview Channel (default) Insiders in the Release Preview Channel will have access to the upcoming release of Windows 10 prior to it being released to the world. These builds are supported by Microsoft. The Release Preview Channel is where we recommend companies preview and validate upcoming Windows 10 releases before broad deployment within their organization. Release Preview Channel, Quality Updates Only Ideal for those who want to validate the features and fixes coming soon to their current version. Note, released feature updates will continue to be offered in accordance with configured policies when this option is selected. Note: Preview Build enrollment requires a telemetry level setting of 2 or higher and your domain registered on insider.windows.com. For additional information on Preview Builds, see: https://aka.ms/wipforbiz If you disable or do not configure this policy, Windows Update will not offer you any pre-release updates and you will receive such content once released to the world. Disabling this policy will cause any devices currently on a pre-release build to opt out and stay on the latest Feature Update once released.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "ManagePreviewBuildsPolicyValue",
  "Elements": [
    { "Type": "Enum", "ValueName": "BranchReadinessLevel", "Items": [
        { "DisplayName": "Dev Channel", "Data": "2" },
        { "DisplayName": "Beta Channel", "Data": "4" },
        { "DisplayName": "Release Preview Channel", "Data": "8" },
        { "DisplayName": "Release Preview of Quality Updates Only", "Data": "64" }
      ]
    },
    { "Type": "EnabledValue", "Data": "2" },
    { "Type": "DisabledValue", "Data": "1" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateOffering",
  "PolicyName": "DeferQualityUpdates",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_NOARM - At least Windows Server 2016 or Windows 10",
  "DisplayName": "Select when Quality Updates are received",
  "ExplainText": "Enable this policy to specify when to receive quality updates. You can defer receiving quality updates for up to 30 days. To prevent quality updates from being received on their scheduled time, you can temporarily pause quality updates. The pause will remain in effect for 35 days or until you clear the start date field. To resume receiving Quality Updates which are paused, clear the start date field. If you disable or do not configure this policy, Windows Update will not alter its behavior.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "DeferQualityUpdates",
  "Elements": [
    { "Type": "Decimal", "ValueName": "DeferQualityUpdatesPeriodInDays", "MinValue": "0", "MaxValue": "30" },
    { "Type": "Text", "ValueName": "PauseQualityUpdatesStartTime" },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateOffering",
  "PolicyName": "ExcludeWUDriversInQualityUpdate",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_NOARM - At least Windows Server 2016 or Windows 10",
  "DisplayName": "Do not include drivers with Windows Updates",
  "ExplainText": "Enable this policy to not include drivers with Windows quality updates. If you disable or do not configure this policy, Windows Update will include updates that have a Driver classification.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "ExcludeWUDriversInQualityUpdate",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateExperience",
  "PolicyName": "DisableUXWUAccess",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_NOARM - At least Windows Server 2016 or Windows 10",
  "DisplayName": "Remove access to use all Windows Update features",
  "ExplainText": "This setting allows you to remove access to scan Windows Update. If you enable this setting user access to Windows Update scan, download and install is removed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "SetDisableUXWUAccess",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateExperience",
  "PolicyName": "DisablePauseUXAccess",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_10_0_RS5 - At least Windows Server 2016, Windows 10 Version 1809",
  "DisplayName": "Remove access to \"Pause updates\" feature",
  "ExplainText": "This setting allows to remove access to \"Pause updates\" feature. Once enabled user access to pause updates is removed.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "SetDisablePauseUXAccess",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateExperience",
  "PolicyName": "AllowTemporaryEnterpriseFeatureControl",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "Windows_11_0_22H2 - At least Windows 11 Version 22H2",
  "DisplayName": "Enable features introduced via servicing that are off by default",
  "ExplainText": "Features introduced via servicing (outside of the annual feature update) are off by default for devices that have their Windows updates managed*. If this policy is configured to \u201cEnabled\u201d, then all features available in the latest monthly quality update installed will be on. If this policy is set to \u201cNot Configured\u201d or \u201cDisabled\u201d then features that are shipped via a monthly quality update (servicing) will remain off until the feature update that includes these features is installed. *Windows update managed devices are those that have their Windows updates managed via policy; whether via the cloud using Windows Update for Business or on-premises with Windows Server Update Services (WSUS).",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "AllowTemporaryEnterpriseFeatureControl",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "WindowsUpdate.admx",
  "CategoryName": "WindowsUpdateOffering",
  "PolicyName": "AllowOptionalContent",
  "NameSpace": "Microsoft.Policies.WindowsUpdate",
  "Supported": "WU_SUPPORTED_WinServer2025_Win1021H2_Win1122H2 - At least Windows Server 2025, Windows 10 Version 21H2, or Windows 11 Version 22H2",
  "DisplayName": "Enable optional updates",
  "ExplainText": "This policy enables devices to get optional updates (including gradual feature rollouts (CFRs) - learn more by visiting aka.ms/AllowOptionalContent) When the policy is configured \u2022 If \"Automatically receive optional updates (including CFRs)\" is selected, the device will get the latest optional updates automatically in line with the configured quality update deferrals. This includes optional cumulative updates and gradual feature rollouts (CFRs). \u2022 If \"Automatically receive optional updates\" is selected, the device will only get optional cumulative updates automatically, in line with the quality update deferrals. \u2022 If \"Users can select which optional updates to receive\" is selected, users can select which optional updates to get by visiting Settings > Windows Update > Advanced options > Optional updates. Users can also enable the toggle \"Get the latest updates as soon as they're available\" to automatically receive optional updates and gradual feature rollouts.",
  "KeyPath": [
    "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate"
  ],
  "ValueName": "SetAllowOptionalContent",
  "Elements": [
    { "Type": "Enum", "ValueName": "AllowOptionalContent", "Items": [
        { "DisplayName": "Automatically receive optional updates (including CFRs)", "Data": "1" },
        { "DisplayName": "Automatically receive optional updates", "Data": "2" },
        { "DisplayName": "Users can select which optional updates to receive", "Data": "3" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
}
```
