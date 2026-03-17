---
title: 'WU Driver Updates'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-wu-driver-updates'
sidebar:
  order: 5
---

"Do not include drivers with Windows Updates", "Prevent device metadata retrieval from the Internet":

```json
{
	"File":  "WindowsUpdate.admx",
	"NameSpace":  "Microsoft.Policies.WindowsUpdate",
	"Class":  "Machine",
	"CategoryName":  "WindowsUpdateOffering",
	"DisplayName":  "Do not include drivers with Windows Updates",
	"ExplainText":  "Enable this policy to not include drivers with Windows quality updates.If you disable or do not configure this policy, Windows Update will include updates that have a Driver classification.",
	"Supported":  "Windows_10_0_NOARM",
	"KeyPath":  "Software\\Policies\\Microsoft\\Windows\\WindowsUpdate",
	"KeyName":  "ExcludeWUDriversInQualityUpdate",
	"Elements":  [
						{
							"Value":  "1",
							"Type":  "EnabledValue"
						},
						{
							"Value":  "0",
							"Type":  "DisabledValue"
						}
					]
},
{
	"File":  "DeviceSetup.admx",
	"NameSpace":  "Microsoft.Policies.DeviceSoftwareSetup",
	"Class":  "Machine",
	"CategoryName":  "DeviceInstall_Category",
	"DisplayName":  "Do not search Windows Update",
	"ExplainText":  "This policy setting allows you to specify the order in which Windows searches source locations for device drivers. If you enable this policy setting, you can select whether Windows searches for drivers on Windows Update unconditionally, only if necessary, or not at all.Note that searching always implies that Windows will attempt to search Windows Update exactly one time. With this setting, Windows will not continually search for updates. This setting is used to ensure that the best software will be found for the device, even if the network is temporarily available.If the setting for searching only if needed is specified, then Windows will search for a driver only if a driver is not locally available on the system.If you disable or do not configure this policy setting, members of the Administrators group can determine the priority order in which Windows searches source locations for device drivers.",
	"Supported":  "Windows7",
	"KeyPath":  "Software\\Policies\\Microsoft\\Windows",
	"KeyName":  "DriverSearching",
	"Elements":  [
						{
							"Type":  "Enum",
							"ValueName":  "SearchOrderConfig",
							"Items":  [
										{
											"DisplayName":  "Always search Windows Update",
											"Value":  "1"
										},
										{
											"DisplayName":  "Search Windows Update only if needed",
											"Value":  "2"
										},
										{
											"DisplayName":  "Do not search Windows Update",
											"Value":  "0"
										}
									]
						}
					]
},
{
	"File":  "ICM.admx",
	"NameSpace":  "Microsoft.Policies.InternetCommunicationManagement",
	"Class":  "Machine",
	"CategoryName":  "InternetManagement_Settings",
	"DisplayName":  "Turn off Windows Update device driver searching",
	"ExplainText":  "This policy setting specifies whether Windows searches Windows Update for device drivers when no local drivers for a device are present.If you enable this policy setting, Windows Update is not searched when a new device is installed.If you disable this policy setting, Windows Update is always searched for drivers when no local drivers are present.If you do not configure this policy setting, searching Windows Update is optional when installing a device.Also see \"Turn off Windows Update device driver search prompt\" in \"Administrative Templates/System,\" which governs whether an administrator is prompted before searching Windows Update for device drivers if a driver is not found locally.Note: This policy setting is replaced by \"Specify Driver Source Search Order\" in \"Administrative Templates/System/Device Installation\" on newer versions of Windows.",
	"Supported":  "WindowsVistaToXPSP2",
	"KeyPath":  "Software\\Policies\\Microsoft\\Windows\\DriverSearching",
	"KeyName":  "DontSearchWindowsUpdate",
	"Elements":  [
						{
							"Value":  "1",
							"Type":  "EnabledValue"
						},
						{
							"Value":  "0",
							"Type":  "DisabledValue"
						}
					]
},
{
	"File":  "DeviceSetup.admx",
	"NameSpace":  "Microsoft.Policies.DeviceSoftwareSetup",
	"Class":  "Machine",
	"CategoryName":  "DeviceInstall_Category",
	"DisplayName":  "Prevent device metadata retrieval from the Internet",
	"ExplainText":  "This policy setting allows you to prevent Windows from retrieving device metadata from the Internet. If you enable this policy setting, Windows does not retrieve device metadata for installed devices from the Internet. This policy setting overrides the setting in the Device Installation Settings dialog box (Control Panel \u003e System and Security \u003e System \u003e Advanced System Settings \u003e Hardware tab).If you disable or do not configure this policy setting, the setting in the Device Installation Settings dialog box controls whether Windows retrieves device metadata from the Internet.",
	"Supported":  "Windows7",
	"KeyPath":  "SOFTWARE\\Policies\\Microsoft\\Windows\\Device Metadata",
	"KeyName":  "PreventDeviceMetadataFromNetwork",
	"Elements":  [
						{
							"Value":  "1",
							"Type":  "EnabledValue"
						},
						{
							"Value":  "0",
							"Type":  "DisabledValue"
						}
					]
},
```
```xml
<?xml version='1.0' encoding='utf-8' standalone='yes'?>
<assembly
    xmlns="urn:schemas-microsoft-com:asm.v3"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    manifestVersion="1.0"
    >
  <assemblyIdentity
      language="neutral"
      name="Microsoft-Windows-Update-MuseUxDocked"
      processorArchitecture="*"
      version="0.0.0.0"
      />
  <migration
      replacementSettingsVersionRange="0"
      replacementVersionRange="10.0.18267-10.0.18362"
      settingsVersion="1"
      >
    <migXml xmlns="">
      <rules context="System">
        <include>
          <objectSet>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [UxOption]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [ExcludeWUDriversInQualityUpdate]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [ActiveHoursStart]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [ActiveHoursEnd]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [SmartActiveHoursState]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [SmartActiveHoursSuggestionState]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [SmartActiveHoursStart]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [SmartActiveHoursEnd]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [UserChoiceActiveHoursStart]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [UserChoiceActiveHoursEnd]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [LastToastAction]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [RestartNotificationsAllowed2]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [FlightCommitted]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [AllowAutoWindowsUpdateDownloadOverMeteredNetwork]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [IsExpedited]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [RestartNoisyNotificationsAllowed]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [*]</pattern>
          </objectSet>
        </include>
        <exclude>
          <objectSet>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [RestartNotificationsAllowed]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [BranchReadinessLevel]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [DeferUpgrade]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [RebootRequired]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [ScheduledRebootTime]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [RebootScheduledByUser]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [RebootConfirmedByUser]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [RebootScheduledBySmartScheduler]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [AutoAcceptShownToUser]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [AutoScheduledRebootFailed]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [ScheduledRebootFailed]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [LastAttemptedRebootTime]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [FairWarningLastDismissTime]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [ForcedReminderDisplayed]</pattern>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\StateVariables [ForceRebootReminderNeeded]</pattern>
          </objectSet>
        </exclude>
        <!-- Migrate RestartNotificationsAllowed to RestartNotificationsAllowed2 if it exists-->
        <locationModify script="MigXmlHelper.ExactMove(&apos;HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [RestartNotificationsAllowed2]&apos;)">
          <objectSet>
            <pattern type="Registry">HKLM\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings [RestartNotificationsAllowed]</pattern>
          </objectSet>
        </locationModify>
      </rules>
    </migXml>
  </migration>
</assembly>
```
