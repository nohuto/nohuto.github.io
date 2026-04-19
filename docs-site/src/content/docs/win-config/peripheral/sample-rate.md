---
title: 'Sample Rate'
description: 'Peripheral option documentation from win-config.'
editUrl: false
sidebar:
  order: 20
---

For your knowledge: The sample rate is the amount of times (in a second) an audio singal is measured. The amount of bits that are used to represent each sample (higher bit range = higher dynamic range and volume potential). The best sample rate and bit depth depends on what you're doing, the most commonly used sample rate for production and similar is `44.1` kHz.

`44.1` kHz = `44,100` times per second

As you may know a bit can be `0` or `1`, means (bit depth * `6` = dB):
`8` bit = `256` values
`16` bit = `65536` values
`24` bit = `16777216` values

`44.1` kHz with a bit depth of `16` is more than enough for general usage.

> https://noirsonance.com/bit-depth-calculator-visualizer/  
> https://de.wikipedia.org/wiki/Nyquist-Shannon-Abtasttheorem

![](https://github.com/nohuto/win-config/blob/main/peripheral/images/samplerate.png?raw=true)
