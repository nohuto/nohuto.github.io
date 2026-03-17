---
title: 'Preemption'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#enable-preemption'
sidebar:
  order: 15
---

Preemption is the scheduler hitting pause on a long running task so a more important one runs immediately. Example, a heavy compute shader is using the GPU, then the VR compositor arrives and must render a frame within a short time. With preemption, the GPU lets the current tiny unit of work finish, switches to the compositor so the frame makes its deadline, then resumes the paused job. Without preemption, the compositor would wait behind the long job.

Rather leave this option untouched, preemption isn't disabled by default.

```cpp
{ L"DisablePreemption", NV_DECLARE_REG_VAR(g_GlobalData.bDisablePreemption) }, // Disable tegra preemption.
{ L"EnableMidBufferPreemption", NV_DECLARE_REG_VAR(g_GlobalData.bEnableMidBufferPreemption) }, // Win8 feature
{ L"EnableCEPreemption", NV_DECLARE_REG_VAR(g_GlobalData.EnableCEPreemption) }, // Win10 RS1 feature
{ L"EnableMidBufferPreemptionForHighTdrTimeout", NV_DECLARE_REG_VAR(g_GlobalData.EnableMidBufferPreemptionForHighTdrTimeout) }, // turn on MBP for buffers even when TDR delay value is high by default they will default to buffer boundary
{ L"EnableAsyncMidBufferPreemption", NV_DECLARE_REG_VAR(g_GlobalData.EnableAsyncMidBufferPreemption) }, // Win10 RS1; Interrupt based Midbufferpreemption. Noop if bEnableMidBufferPreemption is false.
{ L"EnableSCGMidBufferPreemption", NV_DECLARE_REG_VAR(g_GlobalData.EnableSCGMidBufferPreemption) }, // Win10-RS1: SCG midbufferpreemption.
{ L"PerfAnalyzeMidBufferPreemption", NV_DECLARE_REG_VAR(g_GlobalData.PerfAnalyzeMidBufferPreemption) }, // Win10 
{ L"EnableMidGfxPreemption", NV_DECLARE_REG_VAR(g_GlobalData.EnableMidGfxPreemption) }, // Pascal mid triangle preemption
{ L"EnableMidGfxPreemptionVGPU", NV_DECLARE_REG_VAR(g_GlobalData.EnableMidGfxPreemptionVGPU) }, // Pascal mid triangle preemption for vGPU guests
{ L"DisablePreemptionOnS3S4", NV_DECLARE_REG_VAR(g_GlobalData.DisablePreemptionOnS3S4) }, // On the systems tracking the S3/S4 disable the buffer preemption if required.
{ L"DisableCudaContextPreemption", NV_DECLARE_REG_VAR(g_GlobalData.bDisableCudaContextPreemption) }, // Per bug 1211480, allow for overriding the default of not preempting cuda context buffers
```

> https://therealmjp.github.io/posts/breaking-down-barriers-part-4-gpu-preemption/  
> https://learn.microsoft.com/en-us/windows-hardware/drivers/display/gpu-preemption  
> https://en-academic.com/dic.nsf/enwiki/1050761  
> https://github.com/nohuto/win-registry/blob/main/records/nvlddmkm.txt  
> [nvidia/assets | preemption-dxgmms1.c](https://github.com/nohuto/win-config/blob/main/nvidia/assets/preemption-dxgmms1.c)
