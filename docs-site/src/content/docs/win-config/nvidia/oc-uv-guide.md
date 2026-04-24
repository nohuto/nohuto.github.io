---
title: 'OC/UV Guide'
description: 'NVIDIA option documentation from win-config.'
editUrl: false
sidebar:
  order: 16
---

Overclocking means increasing the clock speed, which increases temperatures. Undervolting limits the voltage for the GPU, resulting in lower voltage, wattage, and temperature.

## [ToC](https://github.com/nohuto/gpu-oc-uv)

- [Preconfigurations](https://github.com/nohuto/gpu-oc-uv#preconfigurations)
  - [MSI Afterburner](https://github.com/nohuto/gpu-oc-uv#msi-afterburner)
  - [3DMark](https://github.com/nohuto/gpu-oc-uv#3dmark)
  - [Superposition](https://github.com/nohuto/gpu-oc-uv#superposition)
  - [OCCT](https://github.com/nohuto/gpu-oc-uv#occt)
- [Overclocking](https://github.com/nohuto/gpu-oc-uv#overclocking)
  - [Increasing the core clock & finding the voltage](https://github.com/nohuto/gpu-oc-uv#increasing-the-core-clock--finding-the-voltage)
- [Undervolting](https://github.com/nohuto/gpu-oc-uv#undervolting)
  - [Limiting the voltage](https://github.com/nohuto/gpu-oc-uv#limiting-the-voltage)
- [Memory Overclock](https://github.com/nohuto/gpu-oc-uv#memory-overclock)
  - [Increasing the memory clock](https://github.com/nohuto/gpu-oc-uv#increasing-the-memory-clock)
- [Final Test](https://github.com/nohuto/gpu-oc-uv#final-test)

## Preconfigurations

Install [HWiNFO](https://www.hwinfo.com/download/) to monitor all kinds of information during stress tests (sensors only). I'm leaving out the VBIOS part, but if you still want to try it, flash the correct [VBIOS](https://www.techpowerup.com/vgabios/) (search for detailed instructions if you want to do this).

You need to pay attention to the performance limit during overclocking, as you should not constantly reach it (display `Yes`):

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/hwinfo-powerlimit.png?raw=true)

### MSI Afterburner
Download [MSI Afterburner](https://www.msi.com/Landing/afterburner/graphics-cards) and set a custom fan curve, which could look like the one in the image below (make sure the speed is not too low, as this would affect your results). You can use the preconfigured [cfg file](https://github.com/nohuto/gpu-oc-uv/blob/main/assets/MSIAfterburner.cfg) or skip it.

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/fancurve.png?raw=true)

If you don't want MSI afterburner running in the background all time, set a static curve and load a profile on system start:
```powershell
schtasks /create /sc ONSTART /tn "MSIAfterburnerProfile" /tr "powershell.exe -NoProfile -Command \"Set-Location 'C:\Program Files (x86)\MSI Afterburner'; .\MSIAfterburner.exe /profile1\"" /rl HIGHEST /delay 0000:20
```

| Parameter | Description |
|--|--|
| /sc `<scheduletype>` | Specifies the schedule type. The valid values include:<ul><li>**MINUTE** - Specifies the number of minutes before the task should run.</li><li>**HOURLY** - Specifies the number of hours before the task should run.</li><li>**DAILY** - Specifies the number of days before the task should run.</li><li>**WEEKLY** Specifies the number of weeks before the task should run.</li><li>**MONTHLY** - Specifies the number of months before the task should run.</li><li>**ONCE** - Specifies that that task runs once at a specified date and time.</li><li>**ONSTART** - Specifies that the task runs every time the system starts. You can specify a start date, or run the task the next time the system starts.</li><li>**ONLOGON** - Specifies that the task runs whenever a user (any user) logs on. You can specify a date, or run the task the next time the user logs on.</li><li>**ONIDLE** - Specifies that the task runs whenever the system is idle for a specified period of time. You can specify a date, or run the task the next time the system is idle.</li><li>**ONEVENT** - Specifies that the task runs based on an event that matches information from the system event log including the EventID. |
| /tn `<taskname>` | Specifies a name for the task. Each task on the system must have a unique name and must conform to the rules for file names, not exceeding 238 characters. Use quotation marks to enclose names that include spaces. To store your scheduled task in a different folder, run **/tn** `<folder name\task name>`. |
| /tr `<Taskrun>` | Specifies the program or command that the task runs. Type the fully qualified path and file name of an executable file, script file, or batch file. The path name must not exceed 262 characters. If you don't add the path, **schtasks** assumes that the file is in the `<systemroot>\System32` directory. |
| /rl `<level>` | Specifies the Run Level for the job. Acceptable values are **LIMITED** (scheduled tasks will be ran with the least level of privileges, such as Standard User accounts) and **HIGHEST** (scheduled tasks will be ran with the highest level of privileges, such as Superuser accounts). The default value is **Limited**. |
| /delay `<delaytime>` | Specifies the wait time to delay running the task after it's triggered in mmmm:ss format. |

Set the `Power Limit` and `Temp. Limit` options to the maximum value and change the priority to power limit. Also, disable the automatic start option for now to prevent a loop if something goes wrong.

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/MSIAfterburner-limits.png?raw=true)

---

Install [Superposition](https://benchmark.unigine.com/superposition), [OCCT](https://www.ocbase.com/download), [memtest vulkan](https://github.com/GpuZelenograd/memtest_vulkan/releases), and [3DMark](https://store.steampowered.com/app/223850/3DMark/). Superposition is used for stress testing (including VRAM), OCCT can be used to find errors after completing your OC//UV, and memtest is used for the final stress test of your VRAM.

### 3DMark

Use `Time Spy` and `Steel Nomad` - Avoid wildlife, solar bay and any light versions.

### Superposition

Use the highest preset that doesn't exceed your VRAM limit to test your core clock speed. Use 8k/4k optimized to test your VRAM.

### OCCT

Go into the 3D Adaptive tab and use the following settings:

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/occt.png?raw=true)


## Overclocking

Your goal is to find a specific voltage and clock frequency that don't reach the performance limit (downclock) and don't cause a crash. Raising the clock frequency alone isn't really desirable, as you'll be throttling performance most of the time (reaching the performance limit), so you should limit it to a specific voltage.

- If you ran a stress test with `+180` @ `1025` and it crashed, it's unlikely that 180 will run stably at a different voltage.
- Avoid OCCT while searching for voltage, as it'll most likely cause your card to throtte.
- Use different stress tests & let them run for `~30min`, not just some seconds.
- Hitting the power limit = downclocking
- Your clock and effective clock shouldn't have a big difference


**Kepler, Maxwell, Pascal** GPU architecture uses `12.5 MHz` steps
> GTX 600, GTX 700, GTX Titan, GTX 750, GTX 900, Titan X, GTX 10 Series
**Turing, Ampere, Ada Lovelace** GPU architecture uses `15 MHz` steps
> RTX 20 Series, RTX 30 Series, RTX 40 Series, RTX 50 Series

---

### Increasing the core clock & finding the voltage

1. Start at `900-950mv` & `+50MHz` - `75MHz` core clock and let superposition/3DMark run once, this should normally be stable - make sure to monitor your temperatures via HWiNFO, it should be `>75°C`, if it's already above `~85°C`, don't OC, do a UV.
> Limiting the voltage:
> 1. Open the curve editor (`CTRL` + `F`)
> 2. Click on the next right point beside the mV you want (e.g. `906`, if you want `900`)
> 3. Press `CTRL`, then highlight the curve from the right to the selected point (`906`)
> 4. Select your point (`906`) and drag it down, so the last point is below the first point (e.g. `900`) - example in UV part
2. If it finished without crashing, increase the clock frequency by `15/12.5 MHz` and run another stress test. You can also increase the mV if you haven't reached the power limit.
3. Repeat it until one of the listed situations occurs:
  - If you're crashing, lower the core clock
  - If you reach the power limit, lower the mV
4. You should now have found a voltage with a core clock that passes all stress tests without crashing/hitting the PL all time.

How your result could look like:

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/oc.png?raw=true)


## Undervolting

As mentioned at the beginning, undervolting limits the voltage for the GPU, resulting in lower voltage, wattage, and temperature.

---

### Limiting the voltage

1. Open the curve editor (`CTRL` + `F`)
2. Click on the next **right point** beside the mV you want (e.g. `906`, if you want `900`)
3. Press `CTRL`, then highlight the curve from the right to the selected point (`906`)
4. Select your point (`906`) and drag it down, so the last point is below the first point (e.g. `900`), example:

![](https://github.com/nohuto/gpu-oc-uv/blob/main/images/uv-curve.png?raw=true)

5. Safe the settings to a profile


## Memory Overclock

Make sure to use a stable core clock speed. Always save the benchmark results before overclocking, as you will usually stop the memory overclocking caused by worse results rather than crashing. You should also test for artifacts that occur when memory overclocking is unstable (GPU artifacts are visual distortions, glitches, flickering textures, colored pixels, or screen tearing). Most graphics cards can achieve high memory overclocking, so you can start with stress tests at `250–500 MHz`.

---

### Increasing the memory clock

1. Enter your selected start clock
2. Stress test it with superposition
3. If stable, increase it by `100MHz`
4. Continue with the procedure until you notice worse results, artifacts, or crashes
5. Go down to your last stable value and increase it by `50MHz`
  - Stress test it, if stable increase it by `5-10MHz`, if not go down by `50` and increase it by `5-10MHz`
6. Safe your stable memory clock to a profile
7. Test the stability of your memory clock via [memtest vulkan](https://github.com/GpuZelenograd/memtest_vulkan/releases), let it run for `~30-60min`


## Final Test

Use [OCCT](https://www.ocbase.com/download) to search for errors and for testing the stability of your OC/UV. [Furmark](https://geeks3d.com/furmark/) is known for consuming a lot of power. You can let it run for a while after completing all the steps.
