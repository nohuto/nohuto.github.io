---
title: 'Services/Drivers'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

I personally recommend using only the main option. This includes disabling telemetry/tracking/diagnostics/location/certain drivers/services, etc. It is not necessary to disable more than this, as most other features will not start automatically anyway. You can use the SUBOPTIONs if you want to disable specific services/drivers (e.g. *"Autoplay Service, Bluetooth Services, Camera Services, File/Printer Sharing Services, Printer Services, Store Services"*) for a specific reason (note that this may cause broken functionalities).

## Internals 'Windows services'

![](https://github.com/nohuto/win-config/blob/main/system/images/services1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/services2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/services3.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/services4.png?raw=true)

Read more about it in [Windows Internals E7, P2](https://github.com/nohuto/windows-books/releases/download/7th-Edition/Windows-Internals-E7-P2.pdf) 'Windows services (P.426-474) section.

## Service/Driver Table

The suboptions probably overlap the documentation. If so, you can open the [page on my website](https://github.com/nohuto/win-config/blob/main/system/desc.md#disable-servicesdrivers) instead.

See [services](https://github.com/nohuto/win-config/blob/main/system/assets/services.txt)/[drivers](https://github.com/nohuto/win-config/blob/main/system/assets/drivers.txt) for reference, these files were generated on a stock `W11 IoT Enterprise LTSC` installation via [serviwin](https://www.nirsoft.net/utils/serviwin.html).

| Option Name | Service/Driver | Description |
| --- | --- | --- |
| Activity Moderation | `bam` | Controls activity of background applications |
| Autoplay | `ShellHWDetection` | *Disabling causes CmdPal to not start directly after boot for whatever reason.* -Provides notifications for AutoPlay hardware events. |
| Beep | `Beep` | Legacy PC speaker/tone driver. It provides simple beeps for apps that call the Windows Beep API. |
| Biometrics | `WbioSrvc` | The Windows biometric service gives client applications the ability to capture, compare, manipulate, and store biometric data without gaining direct access to any biometric hardware or samples. The service is hosted in a privileged SVCHOST process. |
| Bluetooth | `BTAGService` | Service supporting the audio gateway role of the Bluetooth Handsfree Profile. |
|  | `BluetoothUserService_*` | The Bluetooth user service supports proper functionality of Bluetooth features relevant to each user session. |
|  | `BluetoothUserService` | The Bluetooth user service supports proper functionality of Bluetooth features relevant to each user session. |
|  | `BthA2dp` | Microsoft Bluetooth A2dp driver |
|  | `BthAvctpSvc` | This is Audio Video Control Transport Protocol service |
|  | `BthEnum` | Bluetooth Enumerator Service |
|  | `BthHFEnum` | Microsoft Bluetooth Hands-Free Profile driver |
|  | `BthLEEnum` | Bluetooth Low Energy Driver |
|  | `BthMini` | Bluetooth Radio Driver |
|  | `BTHMODEM` | Bluetooth Modem Communications Driver |
|  | `BTHPORT` | Bluetooth Port Driver |
|  | `bthserv` | The Bluetooth service supports discovery and association of remote Bluetooth devices. Stopping or disabling this service may cause already installed Bluetooth devices to fail to operate properly and prevent new devices from being discovered or associated. |
|  | `BTHUSB` | Bluetooth Radio USB Driver |
|  | `DeviceAssociationBrokerSvc` | Enables apps to pair devices |
|  | `DeviceAssociationService` | Enables pairing between the system and wired or wireless devices. |
|  | `Microsoft_Bluetooth_AvrcpTransport` | Microsoft Bluetooth Avrcp Transport Driver |
|  | `RFCOMM` | Bluetooth Device (RFCOMM Protocol TDI) |
| Broadcasts | `BcastDVRUserService` | This user service is used for Game Recordings and Live Broadcasts |
|  | `CaptureService_*` | Enables optional screen capture functionality for applications that call the Windows.Graphics.Capture API. |
|  | `AJRouter` | Routes AllJoyn messages for the local AllJoyn clients. If this service is stopped the AllJoyn clients that do not have their own bundled routers will be unable to run. |
|  | `CaptureService` | Enables optional screen capture functionality for applications that call the Windows.Graphics.Capture API. |
|  | `CDPSvc` | This service is used for Connected Devices Platform scenarios |
|  | `CDPUserSvc` | This user service is used for Connected Devices Platform scenarios |
|  | `DevicePickerUserSvc` | This user service is used for managing the Miracast, DLNA, and DIAL UI |
|  | `DevicesFlowUserSvc` | Allows ConnectUX and PC Settings to Connect and Pair with WiFi displays and Bluetooth devices. |
|  | `NcbService` | Brokers connections that allow packaged Microsoft Store apps to receive notifications from the internet. |
|  | `NcdAutoSetup` | Network Connected Devices Auto-Setup service monitors and installs qualified devices that connect to a qualified network. Stopping or disabling this service will prevent Windows from discovering and installing qualified network connected devices automatically. Users can still manually add network connected devices to a PC through the user interface. |
|  | `p2pimsvc` | Provides identity services for the Peer Name Resolution Protocol (PNRP) and Peer-to-Peer Grouping services. If disabled, the Peer Name Resolution Protocol (PNRP) and Peer-to-Peer Grouping services may not function, and some applications, such as HomeGroup and Remote Assistance, may not function correctly. |
|  | `p2psvc` | Enables multi-party communication using Peer-to-Peer Grouping. If disabled, some applications, such as HomeGroup, may not function. |
|  | `PNRPAutoReg` | This service publishes a machine name using the Peer Name Resolution Protocol. Configuration is managed via the netsh context `p2p pnrp peer`. |
|  | `PNRPsvc` | Enables serverless peer name resolution over the Internet using the Peer Name Resolution Protocol (PNRP). If disabled, some peer-to-peer and collaborative applications, such as Remote Assistance, may not function. |
| Camera | `FrameServer` | Enables multiple clients to access video frames from camera devices. |
|  | `FrameServerMonitor` | Monitors the health and state for the Windows Camera Frame Server service. |
|  | `StiSvc` | Provides image acquisition services for scanners and cameras |
| CDROM | `cdrom` | CD-ROM Driver |
| Clipboard | `cbdhsvc` | This user service is used for Clipboard scenarios |
| Cloud Filter | `CldFlt` | Cloud Files Mini Filter Driver |
| DHCP | `Dhcp` | Registers and updates IP addresses and DNS records for this computer. If this service is stopped, this computer will not receive dynamic IP addresses and DNS updates. If this service is disabled, any services that explicitly depend on it will fail to start. |
| Diagnostics | `DusmSvc` | Network data usage, data limit, restrict background data, metered networks. |
|  | `DPS` | The Diagnostic Policy Service enables problem detection, troubleshooting and resolution for Windows components. If this service is stopped, diagnostics will no longer function. |
|  | `diagsvc` | Executes diagnostic actions for troubleshooting support |
|  | `WdiServiceHost` | The Diagnostic Service Host is used by the Diagnostic Policy Service to host diagnostics that need to run in a Local Service context. If this service is stopped, any diagnostics that depend on it will no longer function. |
|  | `WdiSystemHost` | The Diagnostic System Host is used by the Diagnostic Policy Service to host diagnostics that need to run in a Local System context. If this service is stopped, any diagnostics that depend on it will no longer function. |
|  | `TroubleshootingSvc` | Enables automatic mitigation for known problems by applying recommended troubleshooting. If stopped, your device will not get recommended troubleshooting for problems on your device. |
| Domain/RPC | `Netlogon` | Maintains a secure channel between this computer and the domain controller for authenticating users and services. If this service is stopped, the computer may not authenticate users and services and the domain controller cannot register DNS records. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `MsRPC` | MsRPC |
|  | `RpcLocator` | In Windows 2003 and earlier versions of Windows, the Remote Procedure Call (RPC) Locator service manages the RPC name service database. In Windows Vista and later versions of Windows, this service does not provide any functionality and is present for application compatibility. |
| Edge | `MicrosoftEdgeElevationService` | Provides elevated privileges for Microsoft Edge. |
|  | `edgeupdate` | Keeps your Microsoft software up to date. If this service is disabled or stopped, your Microsoft software will not be kept up to date, meaning security vulnerabilities that may arise cannot be fixed and features may not work. This service uninstalls itself when there is no Microsoft software using it. |
|  | `edgeupdatem` | Keeps your Microsoft software up to date. If this service is disabled or stopped, your Microsoft software will not be kept up to date, meaning security vulnerabilities that may arise cannot be fixed and features may not work. This service uninstalls itself when there is no Microsoft software using it. |
| File/Printer Sharing | `LanmanServer` | Supports file, print, and named-pipe sharing over the network for this computer. If this service is stopped, these functions will be unavailable. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `LanmanWorkstation` | Creates and maintains client network connections to remote servers using the SMB protocol. If this service is stopped, these connections will be unavailable. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `CSC` | Allows network files to be used while the local computer is offline. |
|  | `CscService` | The Offline Files service performs maintenance activities on the Offline Files cache, responds to user logon and logoff events, implements the internals of the public API, and dispatches interesting events to those interested in Offline Files activities and changes in cache state. |
|  | `Dfsc` | Client driver for access to DFS Namespaces |
|  | `MRxDAV` | Network Redirector that provides WebDAV file access for the WebClient service |
|  | `mrxsmb` | Implements the framework for the SMB filesystem redirector |
|  | `mrxsmb20` | Implements the SMB 2.0 protocol, which provides connectivity to network resources on Windows Vista and later servers |
|  | `P9Rdr` | Plan 9 Redirector Driver |
|  | `P9RdrService` | Enables trigger-starting plan9 file servers. |
|  | `rdbss` | Provides the framework for network mini-redirectors |
|  | `TrkWks` | Maintains links between NTFS files within a computer or across computers in a network. |
|  | `WebClient` | Enables Windows-based programs to create, access, and modify Internet-based files. If this service is stopped, these functions will not be available. If this service is disabled, any services that explicitly depend on it will fail to start. |
| GameInput | `GameInputSvc` | Enables keyboards, mice, gamepads, and other input devices to be used with the GameInput API. |
| HyperV | `bttflt` | Microsoft Hyper-V VHDPMEM BTT Filter |
|  | `gencounter` | Microsoft Hyper-V Generation Counter |
|  | `hvcrash` | Hyper-V Crashdump |
|  | `HvHost` | Provides an interface for the Hyper-V hypervisor to provide per-partition performance counters to the host operating system. |
|  | `hvservice` | Microsoft Hypervisor Service Driver |
|  | `hyperkbd` | Microsoft VMBus Synthetic Keyboard Driver |
|  | `HyperVideo` | Microsoft VMBus Video Device Miniport Driver |
|  | `storflt` | Microsoft Hyper-V Storage Accelerator |
|  | `Vid` | Microsoft Hyper-V Virtualization Infrastructure Driver |
|  | `vmbus` | Virtual Machine Bus |
|  | `vmgid` | Microsoft Hyper-V Guest Infrastructure Driver |
|  | `vmicguestinterface` | Provides an interface for the Hyper-V host to interact with specific services running inside the virtual machine. |
|  | `vmicheartbeat` | Monitors the state of this virtual machine by reporting a heartbeat at regular intervals. This service helps you identify running virtual machines that have stopped responding. |
|  | `vmickvpexchange` | Provides a mechanism to exchange data between the virtual machine and the operating system running on the physical computer. |
|  | `vmicrdv` | Provides a platform for communication between the virtual machine and the operating system running on the physical computer. |
|  | `vmicshutdown` | Provides a mechanism to shut down the operating system of this virtual machine from the management interfaces on the physical computer. |
|  | `vmictimesync` | Synchronizes the system time of this virtual machine with the system time of the physical computer. |
|  | `vmicvmsession` | Provides a mechanism to manage virtual machine with PowerShell via VM session without a virtual network. |
|  | `vmicvss` | Coordinates the communications that are required to use Volume Shadow Copy Service to back up applications and data on this virtual machine from the operating system on the physical computer. |
|  | `vpci` | Microsoft Hyper-V Virtual PCI Bus |
| IPv6 | `Tcpip6` | @todo.dll,-100;Microsoft IPv6 Protocol Driver |
|  | `IpxlatCfgSvc` | Configures and enables translation from v4 to v6 and vice versa |
| IP Helper | `iphlpsvc` | Provides tunnel connectivity using IPv6 transition technologies (6to4, ISATAP, Port Proxy, and Teredo), and IP-HTTPS. If this service is stopped, the computer will not have the enhanced connectivity benefits that these technologies offer. |
| Kernel Debug Network | `kdnic` | Microsoft Kernel Debugger Network Miniport |
| Location | `lfsvc` | This service monitors the current location of the system and manages geofences (a geographical location with associated events). If you turn off this service, applications will be unable to use or receive notifications for geolocation or geofences. |
| Maps Manager | `MapsBroker` | Windows service for application access to downloaded maps. This service is started on-demand by application accessing downloaded maps. Disabling this service will prevent apps from accessing maps. |
| Network Discovery | `fdPHost` | The FDPHOST service hosts the Function Discovery (FD) network discovery providers. These FD providers supply network discovery services for the Simple Services Discovery Protocol (SSDP) and Web Services Discovery (WS-D) protocol. Stopping or disabling the FDPHOST service will disable network discovery for these protocols when using FD. When this service is unavailable, network services using FD and relying on these discovery protocols will be unable to find network devices or resources. |
|  | `FDResPub` | Publishes this computer and resources attached to this computer so they can be discovered over the network. If this service is stopped, network resources will no longer be published and they will not be discovered by other computers on the network. |
|  | `SSDPSRV` | Discovers networked devices and services that use the SSDP discovery protocol, such as UPnP devices. Also announces SSDP devices and services running on the local computer. If this service is stopped, SSDP-based devices will not be discovered. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `upnphost` | Allows UPnP devices to be hosted on this computer. If this service is stopped, any hosted UPnP devices will stop functioning and no additional hosted devices can be added. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `MsLldp` | Microsoft Link-Layer Discovery Protocol Driver |
|  | `rspndr` | Link-Layer Topology Discovery Responder |
|  | `lltdio` | Link-Layer Topology Discovery Mapper I/O Driver |
|  | `lltdsvc` | Creates a Network Map, consisting of PC and device topology (connectivity) information, and metadata describing each PC and device. If this service is disabled, the Network Map will not function properly. |
| Office | `ClickToRunSvc` | - |
| Telephony | `PhoneSvc` | Manages the telephony state on the device |
|  | `TapiSrv` | Provides Telephony API (TAPI) support for programs that control telephony devices on the local computer and, through the LAN, on servers that are also running the service. |
| Radio Management | `RmSvc` | Radio Management and Airplane Mode Service. |
| Parental Control | `WpcMonSvc` | Enforces parental controls for child accounts in Windows. If this service is stopped or disabled, parental controls may not be enforced. |
| Printer | `McpManagementService` | Universal Print Management Service |
|  | `PrintDeviceConfigurationService` | The Print Device Configuration Service manages the installation of IPP and UP printers. If this service is stopped, any printer installations that are in-progress may be canceled. |
|  | `PrintNotify` | This service opens custom printer dialog boxes and handles notifications from a remote print server or a printer. If you turn off this service, you wont be able to see printer extensions or notifications. |
|  | `PrintScanBrokerService` | Provides support for secure privileged operations needed by low priv spooler. |
|  | `PrintWorkflowUserSvc` | Provides support for Print Workflow applications. If you turn off this service, you may not be able to print successfully. |
|  | `Spooler` | This service spools print jobs and handles interaction with the printer. If you turn off this service, you won't be able to print or see your printers. |
|  | `usbprint` | Microsoft USB PRINTER Class |
| Recovery / Backup | `CloudBackupRestoreSvc` | Monitors the system for changes in application and setting states and performs cloud backup and restore operations when required. |
|  | `SDRSVC` | Provides Windows Backup and Restore capabilities. |
|  | `swprv` | Manages software-based volume shadow copies taken by the Volume Shadow Copy service. If this service is stopped, software-based volume shadow copies cannot be managed. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `VSS` | Manages and implements Volume Shadow Copies used for backup and other purposes. If this service is stopped, shadow copies will be unavailable for backup and the backup may fail. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `wbengine` | The WBENGINE service is used by Windows Backup to perform backup and recovery operations. If this service is stopped by a user, it may cause the currently running backup or recovery operation to fail. Disabling this service may disable backup and recovery operations using Windows Backup on this computer. |
| Remote Desktop | `SessionEnv` | Remote Desktop Configuration service (RDCS) is responsible for all Remote Desktop Services and Remote Desktop related configuration and session maintenance activities that require SYSTEM context. These include per-session temporary folders, RD themes, and RD certificates. |
|  | `TermService` | Allows users to connect interactively to a remote computer. Remote Desktop and Remote Desktop Session Host Server depend on this service. To prevent remote use of this computer, clear the checkboxes on the Remote tab of the System properties control panel item. |
|  | `UmRdpService` | Allows the redirection of Printers/Drives/Ports for RDP connections |
|  | `rdpbus` | Remote Desktop Device Redirector Bus Driver |
|  | `RDPDR` | Remote Desktop Device Redirector Driver |
|  | `terminpt` | Microsoft Remote Desktop Input Driver |
|  | `TsUsbFlt` | Remote Desktop USB Hub Class Filter Driver |
|  | `TsUsbGD` | Remote Desktop Generic USB Device |
|  | `tsusbhub` | Remote Desktop USB Hub |
| Sensor | `SensorDataService` | Delivers data from a variety of sensors |
|  | `SensrSvc` | Monitors various sensors in order to expose data and adapt to system and user state. If this service is stopped or disabled, the display brightness will not adapt to lighting conditions. Stopping this service may affect other system functionality and features as well. |
|  | `SensorService` | A service for sensors that manages different sensors' functionality. Manages Simple Device Orientation (SDO) and History for sensors. Loads the SDO sensor that reports device orientation changes. If this service is stopped or disabled, the SDO sensor will not be loaded and so auto-rotation will not occur. History collection from Sensors will also be stopped. |
|  | `perceptionsimulation` | Enables spatial perception simulation, virtual camera management and spatial input simulation. |
|  | `spectrum` | Enables spatial perception, spatial input, and holographic rendering. |
|  | `VacSvc` | Hosts spatial analysis for Mixed Reality audio simulation. |
| Sign-In Assistant | `wlidsvc` | Enables user sign-in through Microsoft account identity services. If this service is stopped, users will not be able to logon to the computer with their Microsoft account. |
|  | `NaturalAuthentication` | Signal aggregator service, that evaluates signals based on time, network, geolocation, bluetooth and cdf factors. Supported features are Device Unlock, Dynamic Lock and Dynamo MDM policies |
|  | `NgcCtnrSvc` | Manages local user identity keys used to authenticate user to identity providers as well as TPM virtual smart cards. If this service is disabled, local user identity keys and TPM virtual smart cards will not be accessible. It is recommended that you do not reconfigure this service. |
|  | `NgcSvc` | Provides process isolation for cryptographic keys used to authenticate to a user's associated identity providers. If this service is disabled, all uses and management of these keys will not be available, which includes machine logon and single-sign on for apps and websites. This service starts and stops automatically. It is recommended that you do not reconfigure this service. |
| Smart Card | `SCardSvr` | Manages access to smart cards read by this computer. If this service is stopped, this computer will be unable to read smart cards. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `ScDeviceEnum` | Creates software device nodes for all smart card readers accessible to a given session. If this service is disabled, WinRT APIs will not be able to enumerate smart card readers. |
|  | `SCPolicySvc` | Allows the system to be configured to lock the user desktop upon smart card removal. |
|  | `scfilter` | Smart card reader filter driver enabling smart card PnP. |
| SysMain | `SysMain` | SysMain (Superfetch) records app usage patterns, builds prefetch metadata (layout.ini), and warms the cache by preloading files/pages to cut boot and app startup latency; it also drives prefetcher behavior via EnablePrefetcher settings. ([Windows Internals, E7-P1](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)) |
| Microsoft Store | `AppXSvc` | *Disabling breaks CmdPal and other store applications.* - Provides infrastructure support for deploying Store applications. This service is started on demand and if disabled Store applications will not be deployed to the system, and may not function properly. |
|  | `camsvc` | Provides facilities for managing UWP apps access to app capabilities as well as checking an app's access to specific app capabilities |
|  | `ClipSVC` | Provides infrastructure support for the Microsoft Store. This service is started on demand and if disabled applications bought using the Microsoft Store will not behave correctly. |
|  | `InstallService` | Provides infrastructure support for the Microsoft Store. This service is started on demand and if disabled then installations will not function properly. |
|  | `LicenseManager` | Provides infrastructure support for the Microsoft Store. This service is started on demand and if disabled then content acquired through the Microsoft Store will not function properly. |
|  | `PushToInstall` | Provides infrastructure support for the Microsoft Store. This service is started automatically and if disabled then remote installations will not function properly. |
| TCP/IP NetBIOS Helper | `lmhosts` | Provides support for the NetBIOS over TCP/IP (NetBT) service and NetBIOS name resolution for clients on the network, therefore enabling users to share files, print, and log on to the network. If this service is stopped, these functions might be unavailable. If this service is disabled, any services that explicitly depend on it will fail to start. |
| Telemetry | `DiagTrack` | The Connected User Experiences and Telemetry service enables features that support in-application and connected user experiences. Additionally, this service manages the event driven collection and transmission of diagnostic and usage information (used to improve the experience and quality of the Windows Platform) when the diagnostics and usage privacy option settings are enabled under Feedback and Diagnostics. |
|  | `dmwappushservice` | Routes Wireless Application Protocol (WAP) Push messages received by the device and synchronizes Device Management sessions |
|  | `Ndu` | This service provides network data usage monitoring functionality |
|  | `InventorySvc` | This service performs background system inventory, compatibility appraisal, and maintenance used by numerous system components. |
|  | `PcaSvc` | This service provides support for the Program Compatibility Assistant (PCA). PCA monitors programs installed and run by the user and detects known compatibility problems. If this service is stopped, PCA will not function properly. |
|  | `wuqisvc` | A Microsoft service producing summary facts and insights related to usage and quality of experience. Facts are used to automate on-device self-healing and other optional workflows, such as Personalized offers. |
| Themes | `Themes` | Provides user experience theme management. |
| Time | `autotimesvc` | This service sets time based on NITZ messages from a Mobile Network |
|  | `tzautoupdate` | Automatically sets the system time zone. |
| Trusted Runtime | `WindowsTrustedRT` | Windows Trusted Runtime Interface Driver |
|  | `WindowsTrustedRTProxy` | Windows Trusted Runtime Service Proxy Driver |
|  | `PEAUTH` | Protected Environment Authentication and Authorization Export Driver |
| UAC | `luafv` | Virtualizes file write failures to per-user locations. |
| User Data & Sync Platform | `UnistoreSvc` | Handles storage of structured user data, including contact info, calendars, messages, and other content. If you stop or disable this service, apps that use this data might not work correctly. |
|  | `UserDataSvc` | Provides apps access to structured user data, including contact info, calendars, messages, and other content. If you stop or disable this service, apps that use this data might not work correctly. |
|  | `ConsentUxUserSvc` | Allows the system to request user consent to allow apps to access sensitive resources and information such as the device's location |
|  | `MessagingService` | Service supporting text messaging and related functionality. |
|  | `PimIndexMaintenanceSvc` | Indexes contact data for fast contact searching. If you stop or disable this service, contacts might be missing from your search results. |
| Virtual Bus | `CompositeBus` | Multi-Transport Composite Bus Enumerator |
|  | `umbus` | User-Mode Bus Enumerator |
|  | `vdrvroot` | Virtual Drive Root Enumerator |
|  | `NdisVirtualBus` | Microsoft Virtual Network Adapter Enumerator |
| WER | `WerSvc` | Allows errors to be reported when programs stop working or responding and allows existing solutions to be delivered. Also allows logs to be generated for diagnostic and repair services. If this service is stopped, error reporting might not work correctly and results of diagnostic services and repairs might not be displayed. |
|  | `wercplsupport` | This service provides support for viewing, sending and deletion of system-level problem reports for the Problem Reports control panel. |
| Wi-Fi | `WlanSvc` | The WLANSVC service provides the logic required to configure, discover, connect to, and disconnect from a wireless local area network (WLAN) as defined by IEEE 802.11 standards. It also contains the logic to turn your computer into a software access point so that other devices or computers can connect to your computer wirelessly using a WLAN adapter that can support this. Stopping or disabling the WLANSVC service will make all WLAN adapters on your computer inaccessible from the Windows networking UI. It is strongly recommended that you have the WLANSVC service running if your computer has a WLAN adapter. |
|  | `vwififlt` | Virtual WiFi Filter Driver |
|  | `wcncsvc` | WCNCSVC hosts the Windows Connect Now Configuration which is Microsoft's Implementation of Wireless Protected Setup (WPS) protocol. This is used to configure Wireless LAN settings for an Access Point (AP) or a Wireless Device. The service is started programmatically as needed. |
|  | `WFDSConMgrSvc` | Manages connections to wireless services, including wireless display and docking. |
|  | `NativeWifiP` | NativeWiFi Filter |
|  | `Wificx` | Wifi Network Adapter Class Extension |
| Windows Defender | `WinDefend` | Helps protect users from malware and other potentially unwanted software |
|  | `MsSecCore` | Microsoft Security Core Boot Driver |
|  | `wscsvc` | The WSCSVC (Windows Security Center) service monitors and reports security health settings on the computer.  The health settings include firewall (on/off), antivirus (on/off/out of date), antispyware (on/off/out of date), Windows Update (automatically/manually download and install updates), User Account Control (on/off), and Internet settings (recommended/not recommended). The service provides COM APIs for independent software vendors to register and record the state of their products to the Security Center service.  The Security and Maintenance UI uses the service to provide systray alerts and a graphical view of the security health states in the Security and Maintenance control panel.  Network Access Protection (NAP) uses the service to report the security health states of clients to the NAP Network Policy Server to make network quarantine decisions.  The service also has a public API that allows external consumers to programmatically retrieve the aggregated security health state of the system. |
|  | `WdFilter` | Microsoft Defender Antivirus On-Access Malware Protection Mini-Filter Driver |
|  | `WdBoot` | Microsoft Defender Antivirus Boot Driver |
|  | `WdNisSvc` | Helps guard against intrusion attempts targeting known and newly discovered vulnerabilities in network protocols |
|  | `WdNisDrv` | Helps guard against intrusion attempts targeting known and newly discovered vulnerabilities in network protocols |
|  | `SecurityHealthService` | Windows Security Service handles unified device protection and health information |
|  | `Sense` | Windows Defender Advanced Threat Protection service helps protect against advanced threats by monitoring and reporting security events that happen on the computer. |
|  | `MDCoreSvc` | Monitors the availability, health, and performance of various security components |
| Windows Insider | `wisvc` | Provides infrastructure support for the Windows Insider Program. This service must remain enabled for the Windows Insider Program to work. |
| Windows Search | `WSearch` | Provides content indexing, property caching, and search results for files, e-mail, and other content. |
| Windows Update | `WaaSMedicSvc` | Repairs damaged Windows Update components so that the computer can keep getting updates. |
|  | `UsoSvc` | Manages Windows Updates. If stopped, your devices will not be able to download and install the latest updates. |
|  | `wuauserv` | Enables the detection, download, and installation of updates for Windows and other programs. If this service is disabled, users of this computer will not be able to use Windows Update or its automatic updating feature, and programs will not be able to use the Windows Update Agent (WUA) API. |
| Xbox | `XboxGipSvc` | This service manages connected Xbox Accessories. |
|  | `xboxgip` | Xbox Game Input Protocol Driver |
|  | `XblAuthManager` | Provides authentication and authorization services for interacting with Xbox Live. If this service is stopped, some applications may not operate correctly. |
|  | `XblGameSave` | This service syncs save data for Xbox Live save enabled games. If this service is stopped, game save data will not upload to or download from Xbox Live. |
|  | `XboxNetApiSvc` | This service supports the Windows.Networking.XboxLive application programming interface. |
| VBox | `VBoxNetAdp` | VirtualBox NDIS 6.0 Host-Only Network Adapter Driver |
|  | `VBoxNetLwf` | VirtualBox NDIS 6.0 Lightweight Filter Driver  |
|  | `VBoxSup` | VirtualBox Support Driver |
|  | `VBoxUSBMon` | VirtualBox USB Monitor Driver |
|  | `VBoxSDS` | Used as a COM server for VirtualBox API. VirtualBox Global Interface. |
| VPN/RAS Services | `RemoteAccess` | Offers routing services to businesses in local area and wide area network environments. |
|  | `wanarp` | Remote Access IP ARP Driver |
|  | `wanarpv6` | Remote Access IPv6 ARP Driver |
|  | `RasMan` | Manages dial-up and virtual private network (VPN) connections from this computer to the Internet or other remote networks. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `RasAuto` | Creates a connection to a remote network whenever a program references a remote DNS or NetBIOS name or address. |
|  | `PptpMiniport` | WAN Miniport (PPTP) |
|  | `RasAgileVpn` | WAN Miniport (IKEv2) |
|  | `Rasl2tp` | WAN Miniport (L2TP) |
|  | `RasSstp` | WAN Miniport (SSTP) |
|  | `SstpSvc` | Provides support for the Secure Socket Tunneling Protocol (SSTP) to connect to remote computers using VPN. If this service is disabled, users will not be able to use SSTP to access remote servers. |
|  | `RasAcd` | Remote Access Auto Connection Driver |
| Media Sharing / Portable Devices | `WMPNetworkSvc` | Shares Windows Media Player libraries to other networked players and media devices using Universal Plug and Play |
|  | `WPDBusEnum` | Enforces group policy for removable mass-storage devices. Enables applications such as Windows Media Player and Image Import Wizard to transfer and synchronize content using removable mass-storage devices. |
| BranchCache | `PeerDistSvc` | This service caches network content from peers on the local subnet. |
| QoS/AV Streaming (qWave) | `QWAVE` | Quality Windows Audio Video Experience (qWave) is a networking platform for Audio Video (AV) streaming applications on IP home networks. qWave enhances AV streaming performance and reliability by ensuring network quality-of-service (QoS) for AV applications. It provides mechanisms for admission control, run time monitoring and enforcement, application feedback, and traffic prioritization. |
|  | `QWAVEdrv` | Quality Windows Audio/Video Experience component driver |
| NFC/Payments | `SEMgrSvc` | Manages payments and Near Field Communication (NFC) based secure elements. |
| Optimize Drives | `defragsvc` | Helps the computer run more efficiently by optimizing files on storage drives. |
| Mobile Hotspot / ICS Service | `icssvc` | Provides the ability to share a cellular data connection with another device. |
|  | `ALG` | Provides support for 3rd party protocol plug-ins for Internet Connection Sharing |
|  | `SharedAccess` | Provides network address translation, addressing, name resolution and/or intrusion prevention services for a home or small office network. |
| Network Capture Driver | `NdisCap` | Microsoft NDIS Capture |
| Container File System Drivers | `CimFS` | - |
|  | `wcifs` | Provides a virtual filesystem view for processes running within Windows Containers |
| Consumer IR Driver | `circlass` | Consumer IR Class Driver for eHome |
| iSCSI Driver | `msisadrv` | Disabling breaks laptop keyboards. |
| NetBIOS Driver | `NetBIOS` | NetBIOS Interface |
|  | `NetBT` | This service implements NetBios over TCP/IP. |
| Epic Games | `EpicGamesUpdater` | - |
|  | `EpicOnlineServices` | - |
| Logitech | `LGHUBUpdaterService` | LGHUB Updater Service |
|  | `logi_joy_bus_enum` | Logitech G HUB Virtual Bus Enumerator Driver |
|  | `logi_joy_vir_hid` | Logitech G HUB Virtual HID Device Driver |
|  | `logi_lamparray_service` | Provides HID LampArray Lighting support to Logitech devices. |
| SteelSeries | `SteelSeries_Sonar_VAD` | SteelSeries Sonar Driver |
|  | `SteelSeriesGGUpdateServiceProxy` | Launches the SteelSeries Update Service. |
|  | `ssdevfactory` | SteelSeries Device Factory Service |
| NVIDIA Container | `NVDisplay.ContainerLocalSystem` | Container service for NVIDIA root features, required for NVCPL to work. |
| Everything | `Everything (1.5a)` | Provides NTFS indexing, ReFS indexing and USN Journal services to the Everything search client. |
|  | `Everything` | ^ |
| App Deployment | `AppMgmt` | Processes installation, removal, and enumeration requests for software deployed through Group Policy. If the service is disabled, users will be unable to install, remove, or enumerate software deployed through Group Policy. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `AxInstSV` | Provides User Account Control validation for the installation of ActiveX controls from the Internet and enables management of ActiveX control installation based on Group Policy settings. This service is started on demand and if disabled the installation of ActiveX controls will behave according to default browser settings. |
|  | `BITS` | Transfers files in the background using idle network bandwidth. If the service is disabled, then any applications that depend on BITS, such as Windows Update or MSN Explorer, will be unable to automatically download programs and other information. |
|  | `EntAppSvc` | Enables enterprise application management. |
| Network Authentication | `dot3svc` | The Wired AutoConfig (DOT3SVC) service is responsible for performing IEEE 802.1X authentication on Ethernet interfaces. If your current wired network deployment enforces 802.1X authentication, the DOT3SVC service should be configured to run for establishing Layer 2 connectivity and/or providing access to network resources. Wired networks that do not enforce 802.1X authentication are unaffected by the DOT3SVC service. |
|  | `EapHost` | The Extensible Authentication Protocol (EAP) service provides network authentication in such scenarios as 802.1x wired and wireless, VPN, and Network Access Protection (NAP). EAP also provides application programming interfaces (APIs) that are used by network access clients, including wireless and VPN clients, during the authentication process. If you disable this service, this computer is prevented from accessing networks that require EAP authentication. |
| Network Profile & Connectivity UX | `NcaSvc` | Provides DirectAccess status notification for UI components |
|  | `NlaSvc` | Collects and stores configuration information for the network and notifies programs when this information is modified. If this service is stopped, configuration information might be unavailable. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `Wcmsvc` | Makes automatic connect and disconnect decisions based on the network connectivity options currently available to the PC and enables management of network connectivity based on Group Policy settings. |
| Enterprise Transaction & Storage | `MSDTC` | Coordinates transactions that span multiple resource managers, such as databases, message queues, and file systems. If this service is stopped, these transactions will fail. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `MSiSCSI` | Manages Internet SCSI (iSCSI) sessions from this computer to remote iSCSI target devices. If this service is stopped, this computer will not be able to login or access iSCSI targets. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `smphost` | Host service for the Microsoft Storage Spaces management provider. If this service is stopped or disabled, Storage Spaces cannot be managed. |
| Management / Encryption Broker | `SNMPTRAP` | Receives trap messages generated by local or remote Simple Network Management Protocol (SNMP) agents and forwards the messages to SNMP management programs running on this computer. If this service is stopped, SNMP-based programs on this computer will not receive SNMP trap messages. If this service is disabled, any services that explicitly depend on it will fail to start. |
|  | `WEPHOSTSVC` | Windows Encryption Provider Host Service brokers encryption related functionalities from 3rd Party Encryption Providers to processes that need to evaluate and apply EAS policies. Stopping this will compromise EAS compliancy checks that have been established by the connected Mail Accounts |
| Demo / Shared Device | `RetailDemo` | The Retail Demo service controls device activity while the device is in retail demo mode. |
|  | `shpamsvc` | Manages profiles and accounts on a SharedPC configured device |
| Graphics Compatibility | `WarpJITSvc` | Enables JIT compilation support in d3d10warp.dll for processes in which code generation is disabled. |
| Mobile Broadband | `wlpasvc` | This service provides profile management for subscriber identity modules |
|  | `WwanSvc` | This service manages mobile broadband (GSM & CDMA) data card/embedded module adapters and connections by auto-configuring the networks. It is strongly recommended that this service be kept running for best user experience of mobile broadband devices. |
| Miscellaneous | `WalletService` | Hosts objects used by clients of the wallet |
|  | `PenService` | Part of Windows Ink Services Platform Tablet Input Subsystem and is used to implement Microsoft Tablet PC functionality.  |
|  | `buttonconverter` | Service for Portable Device Control devices |
|  | `SmsRouter` | Routes messages based on rules to appropriate clients. |

Disabling `fvevol` (BitLocker Drive Encryption Filter Driver) / `rdyboost` (ReadyBoost) (rdyboost.sys) = `INACCESSIBLE_BOOT_DEVICE` BSoD.
