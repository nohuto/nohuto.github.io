---
title: 'Power Savings'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#disable-power-savings'
sidebar:
  order: 13
---

Sets `RmDisableACPI`, `RMDisableGpuASPMFlags`, `RMFspg`, `RMBlcg`, `RMElcg`, `RmElpg`, `RMSlcg`, `RMOPSB`, `RMLpwrArch`. I won't add the bit fields in here, as they're too big. See [`bitmask-calc`](https://github.com/nohuto/bitmask-calc) for more details of what the data does.

```json
"Name":  "RmDisableACPI",
"Comment":  [
                "Type DWORD",
                "Encoding: Each bit will disable one or more types of ACPI calls from the",
                "RM to the SBIOS.  This is just a quick way to disable those calls from",
                "happening at all."
            ],
"Name":  "RMDisableGpuASPMFlags",
"Comment":  [
                "Type DWORD",
                "0:0 - Set to 1 to disable L0s via the CYA_L0S_ENABLE bit",
                "1:1 - Set to 1 to disable L1 via CYA_L1_ENABLE bit"
            ],
"Name":  "RMFspg",
"Comment":  [
                "Type DWORD",
                "This key sets the floorsweep power gating settings for each engine.  Each",
                "engine uses 1 bit.  For this regkey to be used the FSPG field of",
                "RMPowerFeature needs to be set to PER_ENGINE (2).",
                "0 : Enable FSPG (DEFAULT)",
                "1 : Disable FSPG"
            ],
"Name":  "RMBlcg",
"Comment":  [
                "Type DWORD",
                "This regKey is used for Block Level Clock Gating settings",
                "Each engine uses 4 bits. For this regkey to be used, RmPowerFeatures",
                "corresponding to this feature(21:18) should have a value of 2",
                "The bottom 2 bits, decide if the feature is off/on/default for the engine",
                "The top two bits decide the level of BLCG (stall, idle or quiescent), if",
                "BLCG has been enabled/default for the engine",
                "0 : Keep the vbios default",
                "1 : Disable feature",
                "3 : Enable feature",
                "4 : IDLE",
                "8 : STALL",
                "C : QUIESCENT",
                "NOTE: FOllowing engines share same regkey",
                "FB, FBPA, LTCG and XBAR share bit 11:8",
                "All other engines not mentioned below share bit 31:28",
                "Each engine uses 4 bits:",
                "- Bottom 2 bits: off/on/default",
                "- Top 2 bits: level (idle, stall, quiescent)"
            ],
"Name":  "RMElcg",
"Comment":  [
                "Type DWORD",
                "This regKey is used for Engine Level Clock Gating settings",
                "Each engine uses 2 bits. For this regkey to be used, RmPowerFeatures",
                "corresponding to this feature(5:4) should have a value of 2",
                "0 : Keep the vbios default, same as feature on i.e _AUTOMATIC",
                "1 : Engine disabled i.e. _DISABLED",
                "2 : block/suspend depending on the engine",
                "MPEG and PPP have same fields since mpeg is the name used for pre-gt200 (except g98)",
                "and ppp for beyond gt200 (+g98)"
            ],
"Name":  "RMElpg",
"Comment":  [
                "Type DWORD",
                "This regKey is used for Engine Level Power Gating settings",
                "Each engine uses 1 bit. For this regkey to be used, RmPowerFeatures",
                "corresponding to this feature(7:6) should have a value of 2",
                "0 : Enable ELPG (DEFAULT)",
                "1 : Disable ELPG",
                "RMElpg regkey should disable all MSCG, MS-LTC and MS-Passive features,",
                "to completely disable MS group features.",
                "RMElpg regkey should disable all EI and EI-Passive features,",
                "to completely disable EI group features."
            ],
"Name":  "RMSlcg",
"Comment":  [
                "Type DWORD",
                "This regKey is used to disable Second Level Clock Gating settings",
                "Each engine uses 1 bit. For this regkey to be used, RmPowerFeatures2",
                "corresponding to this feature(7:6) should have a value of 2",
                "0 : Enable SLCG (DEFAULT)",
                "1 : Disable SLCG",
                "NOTE: FOllowing engines share same regkey",
                "FB, FBPA, LTCG and XBAR share bit 5",
                "NVDEC and MSPDEC share bit 13",
                "NVENC and MSENC share bit 14",
                "NOTE: For Pascal+ chips, there is one common block for the",
                "whole copy engine complex and SLCG cannot be controlled",
                "individually for each CE. Hence, to enable/disable SLCG",
                "for the CE complex, only use NV_REG_STR_RM_SLCG_CE0"
            ],
"Name":  "RMOPSB",
"Comment":  [
                "This OPSB (Optional Power Saving Bundle) regkey is a global override for the",
                "power saving features listed below. This regkey will override the OPSB fuse",
                "as well as the vbios bits (if present) for a feature.",
                "Type DWORD",
                "Encoding:",
                "ENABLE    enables the feature",
                "DISABLE   disables the feature",
                "NV_REG_STR_RM_OPSB_AELPG = _MONITOR, means that AELPG would collect the histogram",
                "statistics etc. without actually changing the ELPG threshold. (bug 574609)"
            ],
"Name":  "RMLpwrArch",
"Comment":  [
                "Type DWORD",
                "For LPWR_ENG:",
                "0 : by default, LPWR_ENG is enabled on Turing_and_above GPUs",
                "1 : Disables LPWR_ENG. HW SM will run in PG_ENG mode.",
                "For idle snap debug:",
                "This feature sends debug message to RM whenever PMU sees idle snap.",
                "0 : Default value for feature",
                "1 : Disable",
                "For PPU threshold:",
                "0 : Default value for the feature. PPU threshold will be activated only",
                "for the exit triggered by engine holdoff.",
                "1 : Do not activate PPU threshold for any exit.",
                "3 : Activate PPU threshold for all exits.",
                "For HW wakeup in SW blocker, API optimization and external API optimization:",
                "3 : Enable"
            ],
```
