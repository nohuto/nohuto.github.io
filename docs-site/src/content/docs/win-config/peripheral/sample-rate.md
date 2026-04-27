---
title: 'Sample Rate'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

The values below are related to `Default Format`, see [property-sets](https://winsps-kb.readthedocs.io/en/latest/sources/property-sets/) for a list of all names.

The structure is `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\MMDevices\Audio\{Render\|Capture}\{Endpoint}`.

- `Render` = Playback
- `Capture` = Recording

## Registry Values

Only the first three values are used for my side, this might be different for you.

| Value | Meaning |
| --- | --- |
| `\Properties\{f19f064d-082c-4e27-bc73-6882a1bb8e4c},0` | [`PKEY_AudioEngine_DeviceFormat`](https://learn.microsoft.com/en-us/windows/win32/coreaudio/pkey-audioengine-deviceformat) - "*The PKEY_AudioEngine_DeviceFormat property specifies the device format, which is the format that the user has selected for the stream that flows between the audio engine and the audio endpoint device when the device operates in shared mode. This format might not be the best default format for an exclusive-mode application to use.* |  | 
| `\Properties\{e4870e26-3cc5-4cd2-ba46-ca0a9a70ed04},0` | `PKEY_AudioEngine_OEMFormat_FLOAT` |
| `\Properties\{3d6e1656-2e50-4c4c-8d85-d0acae3c6c68},3` | - |
| `\Properties\{624f56de-fd24-473e-814a-de40aacaed16},3` | - |

All values have the same structure. Note that you've to get the `nBlockAlign` bytes from the data since not all values may have the same `nBlockAlign` (what happened to me: using the same for example `16` (`10 00`) multiplier for all even tho 2 of them use `32` (`20 00`) the playback device won't output audio, but will show the changes in the windows UI).

## Data Structure

These values are `REG_BINARY` types and get modified at specific offsets, for example using this data:
```
41 00 00 00 01 00 00 00 FE FF 08 00 80 BB 00 00 00 B8 0B 00 10 00 10 00 16 00 10 00 3F 06 00 00 01 00 00 00 00 00 10 00 80 00 00 AA 00 38 9B 71
```

- wFormatTag = `41 00`
- nChannels  = `00 00`
- wFormatTag = `FE FF`
- nChannels  = `08 00`
- sampleRate = `80 BB 00 00` (48000)
- nAvgBytesPerSec = `00 B8 0B 00` (768000, 48000*16)
- nBlockAlign = `10 00` (16) - 24 = `18 00`, 32 = `20 00`

So whenever you want to change the sample rate you want to edit the `sampleRate` using:

| Sample rate | `nSamplesPerSec` bytes | `nAvgBytesPerSec` value | `nAvgBytesPerSec` bytes |
| --- | --- | --- | --- |
| 8000 | `40 1F 00 00` | 128000 | `00 F4 01 00` |
| 11025 | `11 2B 00 00` | 176400 | `10 B1 02 00` |
| 16000 | `80 3E 00 00` | 256000 | `00 E8 03 00` |
| 22050 | `22 56 00 00` | 352800 | `20 62 05 00` |
| 32000 | `00 7D 00 00` | 512000 | `00 D0 07 00` |
| 44100 | `44 AC 00 00` | 705600 | `40 C4 0A 00` |
| 48000 | `80 BB 00 00` | 768000 | `00 B8 0B 00` |
| 88200 | `88 58 01 00` | 1411200 | `80 88 15 00` |
| 96000 | `00 77 01 00` | 1536000 | `00 70 17 00` |
| 176400 | `10 B1 02 00` | 2822400 | `00 11 2B 00` |
| 192000 | `00 EE 02 00` | 3072000 | `00 E0 2E 00` |
| 352800 | `20 62 05 00` | 5644800 | `00 22 56 00` |
| 384000 | `00 DC 05 00` | 6144000 | `00 C0 5D 00` |

This table was created using `nBlockAlign = 16`, means whenever thats not the same for you, `nAvgBytesPerSec` will be different since it's calculated using:

```
nAvgBytesPerSec = nSamplesPerSec * nBlockAlign 
```

### [WAVEFORMATEXTENSIBLE syntax](https://learn.microsoft.com/en-us/windows/win32/api/mmreg/ns-mmreg-waveformatextensible)

```cpp
typedef struct {
  WAVEFORMATEX Format;
  union {
    WORD wValidBitsPerSample;
    WORD wSamplesPerBlock;
    WORD wReserved;
  } Samples;
  DWORD dwChannelMask;
  GUID  SubFormat;
} WAVEFORMATEXTENSIBLE;
```

### [WAVEFORMATEX structure](https://learn.microsoft.com/en-us/previous-versions/dd757713(v=vs.85))

| Struct offset | Field | Description |
| --- | --- | --- |
| `0x00` | `Format.wFormatTag` | Waveform-audio format type. Format tags are registered with Microsoft Corporation for many compression algorithms. A complete list of format tags can be found in the Mmreg.h header file. For one- or two-channel PCM data, this value should be WAVE_FORMAT_PCM. When this structure is included in a WAVEFORMATEXTENSIBLE structure, this value must be WAVE_FORMAT_EXTENSIBLE. |
| `0x02` | `Format.nChannels` | Number of channels in the waveform-audio data. Monaural data uses one channel and stereo data uses two channels. |
| `0x04` | `Format.nSamplesPerSec` | Sample rate, in samples per second (hertz). If wFormatTag is WAVE_FORMAT_PCM, then common values for nSamplesPerSec are 8.0 kHz, 11.025 kHz, 22.05 kHz, and 44.1 kHz. For non-PCM formats, this member must be computed according to the manufacturer's specification of the format tag. |
| `0x08` | `Format.nAvgBytesPerSec` | Required average data-transfer rate, in bytes per second, for the format tag. If wFormatTag is WAVE_FORMAT_PCM, nAvgBytesPerSec should be equal to the product of nSamplesPerSec and nBlockAlign. For non-PCM formats, this member must be computed according to the manufacturer's specification of the format tag. |
| `0x0C` | `Format.nBlockAlign` | Block alignment, in bytes. The block alignment is the minimum atomic unit of data for the wFormatTag format type. If wFormatTag is WAVE_FORMAT_PCM or WAVE_FORMAT_EXTENSIBLE, nBlockAlign must be equal to the product of nChannels and wBitsPerSample divided by 8 (bits per byte). For non-PCM formats, this member must be computed according to the manufacturer's specification of the format tag. Software must process a multiple of nBlockAlign bytes of data at a time. Data written to and read from a device must always start at the beginning of a block. For example, it is illegal to start playback of PCM data in the middle of a sample (that is, on a non-block-aligned boundary). |
| `0x0E` | `Format.wBitsPerSample` | Bits per sample for the wFormatTag format type. If wFormatTag is WAVE_FORMAT_PCM, then wBitsPerSample should be equal to 8 or 16. For non-PCM formats, this member must be set according to the manufacturer's specification of the format tag. If wFormatTag is WAVE_FORMAT_EXTENSIBLE, this value can be any integer multiple of 8 and represents the container size, not necessarily the sample size; for example, a 20-bit sample size is in a 24-bit container. Some compression schemes cannot define a value for wBitsPerSample, so this member can be 0. |
| `0x10` | `Format.cbSize` | Size, in bytes, of extra format information appended to the end of the WAVEFORMATEX structure. This information can be used by non-PCM formats to store extra attributes for the wFormatTag. If no extra information is required by the wFormatTag, this member must be set to 0. For WAVE_FORMAT_PCM formats (and only WAVE_FORMAT_PCM formats), this member is ignored. When this structure is included in a WAVEFORMATEXTENSIBLE structure, this value must be at least 22. |
| `0x12` | `Samples.wValidBitsPerSample` | Number of bits of precision in the signal. Usually equal to WAVEFORMATEX.wBitsPerSample. However, wBitsPerSample is the container size and must be a multiple of 8, whereas wValidBitsPerSample can be any value not exceeding the container size. For example, if the format uses 20-bit samples, wBitsPerSample must be at least 24, but wValidBitsPerSample is 20. |
| `0x14` | `dwChannelMask` | Bitmask specifying the assignment of channels in the stream to speaker positions. |
| `0x18` | `SubFormat` | Subformat of the data, such as KSDATAFORMAT_SUBTYPE_PCM. The subformat information is similar to that provided by the tag in the WAVEFORMATEX structure's wFormatTag member. |

## General Knowledge

The sample rate is the amount of times (in a second) an audio singal is measured. The amount of bits that are used to represent each sample (higher bit range = higher dynamic range and volume potential). The best sample rate and bit depth depends on what you're doing, the most commonly used sample rate for production and similar is `44.1` kHz.

`44.1` kHz = `44,100` times per second

As you may know a bit can be `0` or `1`, means (bit depth * `6` = dB):
`8` bit = `256` values
`16` bit = `65536` values
`24` bit = `16777216` values

`44.1` kHz with a bit depth of `16` is more than enough for general usage.

### 8 Bit / 16 Bit

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/samplerate.png?raw=true)
