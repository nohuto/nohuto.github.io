---
title: 'VBS (HVCI)'
description: 'Security option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/security/desc.md#disable-vbs-hvci'
sidebar:
  order: 12
---

VBS won't work if Hyper-V is disabled. HVCI = hypervisor-protected code integrity.

Hypervisor-Based Code Integrity (HVCI) and Kernel-Mode Code Integrity (KMCI) power `Device Guard`, LSA (Lsass.exe) and isolated LSA (LsaIso.exe) power `Credential Guard`.

"Virtualization-based security, or VBS, uses hardware virtualization and the Windows hypervisor to create an isolated virtual environment that becomes the root of trust of the OS that assumes the kernel can be compromised. Windows uses this isolated environment to host a number of security solutions, providing them with greatly increased protection from vulnerabilities in the operating system, and preventing the use of malicious exploits which attempt to defeat protections. VBS enforces restrictions to protect vital system and operating system resources, or to protect security assets such as authenticated user credentials.

One such example security solution is memory integrity, which protects and hardens Windows by running kernel mode code integrity within the isolated virtual environment of VBS. Kernel mode code integrity is the Windows process that checks all kernel mode drivers and binaries before they're started, and prevents unsigned or untrusted drivers or system files from being loaded into system memory. Memory integrity also restricts kernel memory allocations that could be used to compromise the system, ensuring that kernel memory pages are only made executable after passing code integrity checks inside the secure runtime environment, and executable pages themselves are never writable. That way, even if there are vulnerabilities like a buffer overflow that allow malware to attempt to modify memory, executable code pages cannot be modified, and modified memory cannot be made executable."

## VBS Requirements

| Hardware requirement | Details |
| --- | --- |
| 64-bit CPU | Virtualization-based security (VBS) requires the Windows hypervisor, which is only supported on 64-bit IA processors with virtualization extensions, including Intel VT-X and AMD-v. |
| Second Level Address Translation (SLAT) | VBS also requires that the processor's virtualization support includes Second Level Address Translation (SLAT), either Intel VT-X2 with Extended Page Tables (EPT), or AMD-v with Rapid Virtualization Indexing (RVI). |
| IOMMUs or SMMUs (Intel VT-D, AMD-Vi, Arm64 SMMUs) | All I/O devices capable of DMA must be behind an IOMMU or SMMU. An IOMMU can be used to enhance system resiliency against memory attacks. |
| Trusted Platform Module (TPM) 2.0 | For more information, see Trusted Platform Module (TPM) 2.0. |
| Firmware support for SMM protection | System firmware must adhere to the recommendations for hardening SMM code described in the Windows SMM Security Mitigations Table (WSMT) specification. The WSMT specification contains details of an ACPI table that was created for use with Windows operating systems that support VBS features. Firmware must implement the protections described in the WSMT specification, and set the corresponding protection flags as described in the specification to report compliance with these requirements to the operating system. |
| Unified Extensible Firmware Interface (UEFI)<br>Memory Reporting | UEFI firmware must adhere to the following memory map reporting format and memory allocation guidelines in order for firmware to ensure compatibility with VBS.<br><br>â€¢ UEFI v2.6 Memory Attributes Table (MAT) - To ensure compatibility with VBS, firmware must cleanly separate EFI runtime memory ranges for code and data, and report this to the operating system. Proper segregation and reporting of EFI runtime memory ranges allows VBS to apply the necessary page protections to EFI runtime services code pages within the VBS secure region.<br><br>Conveying this information to the OS is accomplished using the EFI_MEMORY_ATTRIBUTES_TABLE. To implement the UEFI MAT, follow these guidelines:<br><br>1. The entire EFI runtime must be described by this table.<br>2. All appropriate attributes for EfiRuntimeServicesData and EfiRuntimeServicesCode pages must be marked.<br>3. These ranges must be aligned on page boundaries (4KB), and can not overlap.<br><br>â€¢ EFI Page Protections - All entries must include attributes EFI_MEMORY_RO, EFI_MEMORY_XP, or both. All UEFI memory that is marked executable must be read only. Memory marked writable must not be executable. Entries may not be left with neither of the attributes set, indicating memory that is both executable and writable. |
| Secure Memory Overwrite Request (MOR)<br>revision 2 | Secure MOR v2 is enhanced to protect the MOR lock setting using a UEFI secure variable. This helps guard against advanced memory attacks. For details, see Secure MOR implementation. |
| Memory integrity-compatible drivers | Ensure all system drivers have been tested and verified to be compatible with memory integrity. The Windows Driver Kit and Driver Verifier contain tests for driver compatibility with memory integrity. There are three steps to verify driver compatibility:<br><br>1. Use Driver Verifier with the Code Integrity compatibility checks enabled.<br>2. Run the Hypervisor Code Integrity Readiness Test in the Windows HLK.<br>3. Test the driver on a system with VBS and memory integrity enabled. This step is imperative to validate the driver's behavior with memory integrity, as static code analysis tools simply aren't capable of detecting all memory integrity violations possible at runtime. |
| Secure Boot | Secure Boot must be enabled on devices leveraging VBS. For more information, see Secure Boot |

> https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-vbs  
> https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/
> https://learn.microsoft.com/en-us/windows/security/hardware-security/enable-virtualization-based-protection-of-code-integrity?tabs=security

You can disable VBS for a VM with:
```powershell
Set-VMSecurity -VMName <VMName> -VirtualizationBasedSecurityOptOut $true
```

Details on device/credential guard:

![](https://github.com/nohuto/win-config/blob/main/security/images/vbs-guards1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/security/images/vbs-guards2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/security/images/vbs-guards3.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/security/images/vbs-guards4.png?raw=true)

```json
{
  "File": "DeviceCredential.admx",
  "CategoryName": "MSSecondaryAuthFactorCategory",
  "PolicyName": "MSSecondaryAuthFactor_AllowSecondaryAuthenticationDevice",
  "NameSpace": "Microsoft.Policies.SecondaryAuthenticationFactor",
  "Supported": "Windows_10_0",
  "DisplayName": "Allow companion device for secondary authentication",
  "ExplainText": "This policy allows users to use a companion device, such as a phone, fitness band, or IoT device, to sign on to a desktop computer running Windows 10. The companion device provides a second factor of authentication with Windows Hello. If you enable or do not configure this policy setting, users can authenticate to Windows Hello using a companion device. If you disable this policy, users cannot use a companion device to authenticate with Windows Hello.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\SecondaryAuthenticationFactor"
  ],
  "ValueName": "AllowSecondaryAuthenticationDevice",
  "Elements": [
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
{
  "File": "DeviceGuard.admx",
  "CategoryName": "DeviceGuardCategory",
  "PolicyName": "VirtualizationBasedSecurity",
  "NameSpace": "Microsoft.Windows.DeviceGuard",
  "Supported": "Windows_10_0",
  "DisplayName": "Turn On Virtualization Based Security",
  "ExplainText": "Specifies whether Virtualization Based Security is enabled. Virtualization Based Security uses the Windows Hypervisor to provide support for security services. Virtualization Based Security requires Secure Boot, and can optionally be enabled with the use of DMA Protections. DMA protections require hardware support and will only be enabled on correctly configured devices. Virtualization Based Protection of Code Integrity This setting enables virtualization based protection of Kernel Mode Code Integrity. When this is enabled, kernel mode memory protections are enforced and the Code Integrity validation path is protected by the Virtualization Based Security feature. The \"Disabled\" option turns off Virtualization Based Protection of Code Integrity remotely if it was previously turned on with the \"Enabled without lock\" option. The \"Enabled with UEFI lock\" option ensures that Virtualization Based Protection of Code Integrity cannot be disabled remotely. In order to disable the feature, you must set the Group Policy to \"Disabled\" as well as remove the security functionality from each computer, with a physically present user, in order to clear configuration persisted in UEFI. The \"Enabled without lock\" option allows Virtualization Based Protection of Code Integrity to be disabled remotely by using Group Policy. The \"Not Configured\" option leaves the policy setting undefined. Group Policy does not write the policy setting to the registry, and so it has no impact on computers or users. If there is a current setting in the registry it will not be modified. The \"Require UEFI Memory Attributes Table\" option will only enable Virtualization Based Protection of Code Integrity on devices with UEFI firmware support for the Memory Attributes Table. Devices without the UEFI Memory Attributes Table may have firmware that is incompatible with Virtualization Based Protection of Code Integrity which in some cases can lead to crashes or data loss or incompatibility with certain plug-in cards. If not setting this option the targeted devices should be tested to ensure compatibility. Warning: All drivers on the system must be compatible with this feature or the system may crash. Ensure that this policy setting is only deployed to computers which are known to be compatible. Credential Guard This setting lets users turn on Credential Guard with virtualization-based security to help protect credentials. For Windows 11 21H2 and earlier, the \"Disabled\" option turns off Credential Guard remotely if it was previously turned on with the \"Enabled without lock\" option. For later versions, the \"Disabled\" option turns off Credential Guard remotely if it was previously turned on with the \"Enabled without lock\" option or was \"Not Configured\". The \"Enabled with UEFI lock\" option ensures that Credential Guard cannot be disabled remotely. In order to disable the feature, you must set the Group Policy to \"Disabled\" as well as remove the security functionality from each computer, with a physically present user, in order to clear configuration persisted in UEFI. The \"Enabled without lock\" option allows Credential Guard to be disabled remotely by using Group Policy. The devices that use this setting must be running at least Windows 10 (Version 1511). For Windows 11 21H2 and earlier, the \"Not Configured\" option leaves the policy setting undefined. Group Policy does not write the policy setting to the registry, and so it has no impact on computers or users. If there is a current setting in the registry it will not be modified. For later versions, if there is no current setting in the registry, the \"Not Configured\" option will enable Credential Guard without UEFI lock. Machine Identity Isolation This setting controls Credential Guard protection of Active Directory machine accounts. Enabling this policy has certain prerequisites. The prerequisites and more information about this policy can be found at https://go.microsoft.com/fwlink/?linkid=2251066. The \"Not Configured\" option leaves the policy setting undefined. Group Policy does not write the policy setting to the registry, and so it has no impact on computers or users. If there is a current setting in the registry it will not be modified. The \"Disabled\" option turns off Machine Identity Isolation. If this policy was previously set to \"Enabled in audit mode\", no further action is needed. If this policy was previously set to \u201cEnabled in enforcement mode\u201d, the device must be unjoined and rejoined to the domain. More details can be found at the link above. The \"Enabled in audit mode\" option copies the machine identity into Credential Guard. Both LSA and Credential Guard will have access to the machine identity. This allows users to validate that \"Enabled in enforcement mode\" will work in their Active Directory Domain. The \"Enabled in enforcement mode\" option moves the machine identity into Credential Guard. This makes the machine identity only accessible to Credential Guard. Secure Launch This setting sets the configuration of Secure Launch to secure the boot chain. The \"Not Configured\" setting is the default, and allows configuration of the feature by Administrative users. The \"Enabled\" option turns on Secure Launch on supported hardware. The \"Disabled\" option turns off Secure Launch, regardless of hardware support. Kernel-mode Hardware-enforced Stack Protection This setting enables Hardware-enforced Stack Protection for kernel-mode code. When this security feature is enabled, kernel-mode data stacks are hardened with hardware-based shadow stacks, which store intended return address targets to ensure that program control flow is not tampered. This security feature has the following prerequisites: 1) The CPU hardware supports hardware-based shadow stacks. 2) Virtualization Based Protection of Code Integrity is enabled. If either prerequisite is not met, this feature will not be enabled, even if an \"Enabled\" option is selected for this feature. Note that selecting an \"Enabled\" option for this feature will not automatically enable Virtualization Based Protection of Code Integrity, that needs to be done separately. Devices that enable this security feature must be running at least Windows 11 (Version 22H2). The \"Disabled\" option turns off kernel-mode Hardware-enforced Stack Protection. The \"Enabled in audit mode\" option enables kernel-mode Hardware-enforced Stack Protection in audit mode, where shadow stack violations are not fatal and will be logged to the system event log. The \"Enabled in enforcement mode\" option enables kernel-mode Hardware-enforced Stack Protection in enforcement mode, where shadow stack violations are fatal. The \"Not Configured\" option leaves the policy setting undefined. Group Policy does not write the policy setting to the registry, and so it has no impact on computers or users. If there is a current setting in the registry it will not be modified. Warning: All drivers on the system must be compatible with this security feature or the system may crash in enforcement mode. Audit mode can be used to discover incompatible drivers. For more information, refer to https://go.microsoft.com/fwlink/?LinkId=2162953.",
  "KeyPath": [
    "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeviceGuard"
  ],
  "ValueName": "EnableVirtualizationBasedSecurity",
  "Elements": [
    { "Type": "Enum", "ValueName": "RequirePlatformSecurityFeatures", "Items": [
        { "DisplayName": "Secure Boot", "Data": "1" },
        { "DisplayName": "Secure Boot and DMA Protection", "Data": "3" }
      ]
    },
    { "Type": "Enum", "ValueName": "HypervisorEnforcedCodeIntegrity", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "Enabled with UEFI lock", "Data": "1" },
        { "DisplayName": "Enabled without lock", "Data": "2" },
        { "DisplayName": "Not Configured", "Data": "3" }
      ]
    },
    { "Type": "Boolean", "ValueName": "HVCIMATRequired", "TrueValue": "1", "FalseValue": "0" },
    { "Type": "Enum", "ValueName": "LsaCfgFlags", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "Enabled with UEFI lock", "Data": "1" },
        { "DisplayName": "Enabled without lock", "Data": "2" },
        { "DisplayName": "Not Configured", "Data": "3" }
      ]
    },
    { "Type": "Enum", "ValueName": "MachineIdentityIsolation", "Items": [
        { "DisplayName": "Disabled", "Data": "0" },
        { "DisplayName": "Enabled in audit mode", "Data": "1" },
        { "DisplayName": "Enabled in enforcement mode", "Data": "2" },
        { "DisplayName": "Not Configured", "Data": "3" }
      ]
    },
    { "Type": "Enum", "ValueName": "ConfigureSystemGuardLaunch", "Items": [
        { "DisplayName": "Not Configured", "Data": "0" },
        { "DisplayName": "Enabled", "Data": "1" },
        { "DisplayName": "Disabled", "Data": "2" }
      ]
    },
    { "Type": "Enum", "ValueName": "ConfigureKernelShadowStacksLaunch", "Items": [
        { "DisplayName": "Not Configured", "Data": "0" },
        { "DisplayName": "Enabled in enforcement mode", "Data": "1" },
        { "DisplayName": "Enabled in audit mode", "Data": "2" },
        { "DisplayName": "Disabled", "Data": "3" }
      ]
    },
    { "Type": "EnabledValue", "Data": "1" },
    { "Type": "DisabledValue", "Data": "0" }
  ]
},
```
