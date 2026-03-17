---
title: 'RMPowerFeature'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#rmpowerfeature'
sidebar:
  order: 11
---

`ELPG` - Engine-Level Power Gating  
`BLCG` - Block Level Clock Gating  
`FSPG` - Floorsweep Power Gating  

Disabling all of it will increase the wattage usage noticeable.

```json
{
  "Name":  "RMPowerFeature",
  "Comment":  [
                  "Type DWORD",
                  "For elpg, blcg, fspg",
                  "0 : Keep the vbios default for all engines",
                  "1 : Disable for all engines",
                  "2 : Per unit/engine settings (Look at engine specific RegKeys below)",
                  "3 : Enable for all engines",
                  "For elcg,",
                  "0 : Keep the vbios default for all engines i.e Feature ON",
                  "1 : feature off for all engines",
                  "3 : engine disabled for all engines",
                  "for the rest of the features, the following convention applies",
                  "0 : Keep the vbios default",
                  "1 : Disable feature",
                  "3 : Enable feature",
                  "BLCG: this uses 4 bits, where the bottom two bits decide",
                  "if the feature needs to be on/off/default for all engines or engine specific",
                  "Top two bits decide the level(STALL, IDLE, QUIESCENT) if on/default for all engines"
              ],
  "Elements":  [
                  {
                      "Field":  "SOFTWARE_SLOWDOWN",
                      "Bits":  "1:0",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      }
                                  ]
                  },
                  {
                      "Field":  "PEAK_POWER_SLOWDOWN",
                      "Bits":  "3:2",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      }
                                  ]
                  },
                  {
                      "Field":  "ELCG",
                      "Bits":  "5:4",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0",
                                          "Comment":  "same as ELCG_ON"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "ELPG",
                      "Bits":  "7:6",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0",
                                          "Comment":  "same as ELPG_ON"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "PCIE_DEEP_L1",
                      "Bits":  "9:8",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "PCIE_CLKREQ",
                      "Bits":  "11:10",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "DEEP_IDLE",
                      "Bits":  "13:12",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "FB_ACPD",
                      "Bits":  "15:14",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "DUAL_PIXEL",
                      "Bits":  "17:16",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "BLCG2",
                      "Bits":  "21:18",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      },
                                      {
                                          "Name":  "IDLE",
                                          "Value":  "4"
                                      },
                                      {
                                          "Name":  "STALL",
                                          "Value":  "8"
                                      },
                                      {
                                          "Name":  "QUIESCENT",
                                          "Value":  "12"
                                      }
                                  ]
                  },
                  {
                      "Field":  "ADAPTIVE_POWER",
                      "Bits":  "23:22",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "MONITOR",
                                          "Value":  "2",
                                          "Comment":  "same as OPSB_AELPG_MONITOR before. TODO - Remove MONITOR since 0x2 is reserved for PER_ENG."
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "DEPRECATED",
                      "Bits":  "25:24",
                      "Options":  [

                                  ]
                  },
                  {
                      "Field":  "PWR_RAIL_GATE",
                      "Bits":  "27:26",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "PWR_RAIL_GATE_PREDICTIVE",
                      "Bits":  "29:28",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "FSPG",
                      "Bits":  "31:30",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  }
              ]
},
{
  "Name":  "RMPowerFeature2",
  "Comment":  [
                  "the following convention applies to _FLCG",
                  "0 : Keep default for all engines",
                  "1 : Disable FLCG for all engines",
                  "2 : Per unit/engine settings (Look at engine specific regkey FLCG)",
                  "3 : Enable  FLCG for all engines",
                  "If _MSCG_SETTINGS_OWNER is set to _RM, RM will program the MSCG watermarks,",
                  "and will control the enabling and disabling of MSCG for modeswitches and",
                  "pstate transitions.  If it is set to _PMU, the PMU will control the enabling",
                  "and disabling of MSCG for modeswitches and pstate transitions, and the PMU",
                  "will program the watermarks using values provided by RM.",
                  "_RM is the initial default; this is expected to change when _PMU support",
                  "becomes available.",
                  "the following convention applies to _OPERATION_MODE",
                  "0 : choose default GPU Operation mode",
                  "1 : Disable all GPU Operation modes - force power up of all GPU Operation Mode units after boot",
                  "2 : Enable GPU Operation mode as per mask - keep power gated after boot as per RmGpuOperationMode mask",
                  "the following convention applies to _SLCG",
                  "1 : Disable SLCG for all engines",
                  "2 : Per unit/engine settings (Look at engine specific regkey SLCG)",
                  "3 : Enable  SLCG for all engines",
                  "The following convention applies to _CLK_NDIV_SLIDING:",
                  "0 : Keep the vbios default",
                  "1 : Disable feature for all clock domains",
                  "2 : Per clock domain settings (Look at clock domain specific regkey below - NV_REG_STR_RM_CLK_NDIV_SLIDING)",
                  "3 : Enable for all clock domains",
                  "The following convention applies to _NVVDD_PSI:",
                  "1 : Disable feature",
                  "3 : Enable feature",
                  "The following convention applies to GC6_ROMLESS:",
                  "The following convention applies to GC6_ROM:",
                  "The following convention applies to DIDLE-SSC:",
                  "This flag overwrites all the other flags  while arming DIDLE-OS",
                  "if it is disabled here, DI-OS will not be Entered. However if it enabled",
                  "DI-OS will be only Entered, if all other Preconditions are met.",
                  "The following convention applies to GC4:",
                  "This flag overwrites all the other flags  while enabling L1 substates",
                  "if it is disabled here, L1 Substates will not be Entered. However if it enabled",
                  "L1 Substates will be only Entered, if root port supports it and enabled in VBIOS",
                  "The following convention applies to L1 Substates:",
                  "The following convention applies to LPWR oneshot:",
                  "The following convention applies to RPPG:",
                  "The following convention applies to IST clock gating:",
                  "0 : Keep the IST gating enabled by default"
              ],
  "Elements":  [
                  {
                      "Field":  "FLCG",
                      "Bits":  "1:0",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "MSCG_SETTINGS_OWNER",
                      "Bits":  "3:2",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "RM",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PMU",
                                          "Value":  "2"
                                      }
                                  ]
                  },
                  {
                      "Field":  "OPERATION_MODE",
                      "Bits":  "5:4",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_MODE",
                                          "Value":  "2"
                                      }
                                  ]
                  },
                  {
                      "Field":  "SLCG",
                      "Bits":  "7:6",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_ENG",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "CLK_NDIV_SLIDING",
                      "Bits":  "9:8",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "PER_DOMAIN",
                                          "Value":  "2"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "NVVDD_PSI",
                      "Bits":  "11:10",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "GC6_ROMLESS",
                      "Bits":  "13:12",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "GC6_ROM",
                      "Bits":  "15:14",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "DIDLE_SSC",
                      "Bits":  "17:16",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "DIDLE_OS",
                      "Bits":  "19:18",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "PCIE_L1_SUBSTATES",
                      "Bits":  "21:20",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "LPWR_ONESHOT",
                      "Bits":  "23:22",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "RPPG",
                      "Bits":  "25:24",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  },
                  {
                      "Field":  "IST_CG",
                      "Bits":  "27:26",
                      "Options":  [
                                      {
                                          "Name":  "DEFAULT",
                                          "Value":  "0"
                                      },
                                      {
                                          "Name":  "DISABLE",
                                          "Value":  "1"
                                      },
                                      {
                                          "Name":  "ENABLE",
                                          "Value":  "3"
                                      }
                                  ]
                  }
              ]
},
```

Test
