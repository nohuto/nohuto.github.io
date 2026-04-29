---
title: 'Segment Heap'
description: 'System option documentation from win-config.'
editUrl: false
sidebar:
  order: 21
---

"With the introduction of Windows 10, Segment Heap, a new native heap implementation was also introduced. It is currently the native heap implementation used in Windows apps (formerly called Modern/Metro apps) and in certain system processes, while the older native heap implementation (NT Heap) is still the default for traditional applications." Allows modern apps to use a more efficient memory allocator. [Windows Internals (E7-P1, Segment heap)](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf): UWP apps default to segment heaps, while desktop apps keep the NT heap for compatibility. Segment heaps separate metadata from user data and can reduce overhead, but they are not compatible with all heap patterns.

It's recommended to read '[W10 Segment Heap Internals](https://www.blackhat.com/docs/us-16/materials/us-16-Yason-Windows-10-Segment-Heap-Internals-wp.pdf)' whenever you want to know more about the differences between NT/Segment Heap.

## Per Executable / Globally

For a specific executeable:
```c
"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\<executable>"
  "FrontEndHeapDebugOptions"; // REG_DWORD, bit 2 (0x4) = disable segment heap, bit 3 (0x8) = enable segment heap
```

Globally:
```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Segment Heap"
  "Enabled"; // REG_DWORD, 0 = disable segment heap, nonzero = enable segment heap
```

Enabling segment heap globally forces the system to use the newer segmented allocation model, which can end up with errors (`The exception unknown software exception (0xc000000d) occurred in the application at location 0x00007FFF1E13FF03`). It's not recommended to enable it globally.

## Validating Changes

You can see whenever a program uses 'Segment Heap' or 'NT Heap' via for example [SI](https://github.com/winsiderss/systeminformer/) (Right Click > Miscellaneous > Heaps).

`HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\mullvadbrowser.exe`, `FrontEndHeapDebugOptions` = `0x4`:

![](https://github.com/nohuto/win-config/blob/main/system/images/ntheap.png?raw=true)

`HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\mullvadbrowser.exe`, `FrontEndHeapDebugOptions` = `0x8`:

![](https://github.com/nohuto/win-config/blob/main/system/images/segmentheap.png?raw=true)

## Default Values

```c
"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager";
    "HeapDeCommitFreeBlockThreshold" = 4096; // qword_140FC3210 dq 1000
    "HeapDeCommitTotalFreeThreshold" = 65536; // qword_140FC3218 dq 10000
    "HeapSegmentCommit" = 8192; // qword_140FC3220 dq 2000
    "HeapSegmentReserve" = 1048576; // qword_140FC3228 dq 100000

"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Segment Heap";
    "Enabled" = 0; // if present with DataLength==4 and nonzero type:
                    //    RtlpLowFragHeapGlobalFlags |= 0x10;  // global segment heap enable
                    //    if (value & 0x2)                      // low byte, bit 1
                    //        RtlpLowFragHeapGlobalFlags |= 0x20; // extra option ?
                    // if the value exists but is stored as REG_NONE (type==0):
                    //    RtlpLowFragHeapGlobalFlags |= 0x8;   // global disable/override
```

- [system/assets | segment-RtlpHpApplySegmentHeapConfigurations.c](https://github.com/nohuto/win-config/blob/main/system/assets/segment-RtlpHpApplySegmentHeapConfigurations.c)

## [Windows Internals](https://github.com/nohuto/Windows-Books/releases/download/7th-Edition/Windows-Internals-E7-P1.pdf)

![](https://github.com/nohuto/win-config/blob/main/system/images/segment1.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/segment2.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/segment3.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/segment4.png?raw=true)
![](https://github.com/nohuto/win-config/blob/main/system/images/segment5.png?raw=true)
