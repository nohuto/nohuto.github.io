---
title: 'VS Telemetry'
description: 'Misc option documentation from win-config.'
editUrl: false
sidebar:
  order: 8
---

Disables VS telemetry, SQM data collection, IntelliCode remote analysis, feedback features, and the `DiagnosticsHub` logger. Disabling `VSStandardCollectorService150` could cause issues, I added it as a comment.

```powershell
"14.0" = "VS 2015"
"15.0" = "VS 2017" 
"16.0" = "VS 2019"
"17.0" = "VS 2022"
```
Remove VS logs, telemetry & feedback data:
```bat
for %%p in (
 "%APPDATA%\vstelemetry"
 "%LOCALAPPDATA%\Microsoft\VSApplicationInsights"
 "%LOCALAPPDATA%\Microsoft\VSCommon\14.0\SQM"
 "%LOCALAPPDATA%\Microsoft\VSCommon\15.0\SQM"
 "%LOCALAPPDATA%\Microsoft\VSCommon\16.0\SQM"
 "%LOCALAPPDATA%\Microsoft\VSCommon\17.0\SQM"
 "%PROGRAMDATA%\Microsoft\VSApplicationInsights"
 "%PROGRAMDATA%\vstelemetry"
 "%TEMP%\Microsoft\VSApplicationInsights"
 "%TEMP%\Microsoft\VSFeedbackCollector"
 "%TEMP%\VSFaultInfo"
 "%TEMP%\VSFeedbackIntelliCodeLogs"
 "%TEMP%\VSFeedbackPerfWatsonData"
 "%TEMP%\VSFeedbackVSRTCLogs"
 "%TEMP%\VSRemoteControl"
 "%TEMP%\VSTelem"
 "%TEMP%\VSTelem.Out"
) do rd /s /q "%%~p"
```
Remove VS licenses (could cause the need of a reactivation):
```bat
for %%g in (
 "77550D6B-6352-4E77-9DA3-537419DF564B"
 "E79B3F9C-6543-4897-BBA5-5BFB0A02BB5C"
 "4D8CFBCB-2F6A-4AD2-BABF-10E28F6F2C8F"
 "5C505A59-E312-4B89-9508-E162F8150517"
 "41717607-F34E-432C-A138-A3CFD7E25CDA"
 "1299B4B9-DFCC-476D-98F0-F65A2B46C96D"
) do reg delete "HKLM\SOFTWARE\Classes\Licenses\%%~g" /f
```
> https://github.com/jedipi/Visual-Studio-Key-Finder/blob/main/src/VsKeyFinder/Data/ProductData.cs

---

Miscellaneous notes:
```json
"HKLM\\SOFTWARE\\Policies\\Microsoft\\VisualStudio\\Feedback": {
  "DisableEmailInput": { "Type": "REG_DWORD", "Data": 1 },
  "DisableFeedbackDialog": { "Type": "REG_DWORD", "Data": 1 },
  "DisableScreenshotCapture": { "Type": "REG_DWORD", "Data": 1 }
},
"HKLM\\SOFTWARE\\Microsoft\\VSCommon\\14.0\\SQM": {
  "OptIn": { "Type": "REG_DWORD", "Data": 0 }
},
"HKLM\\SOFTWARE\\Microsoft\\VSCommon\\15.0\\SQM": {
  "OptIn": { "Type": "REG_DWORD", "Data": 0 }
},
"HKLM\\SOFTWARE\\Microsoft\\VSCommon\\16.0\\SQM": {
  "OptIn": { "Type": "REG_DWORD", "Data": 0 }
},
"HKLM\\SOFTWARE\\Microsoft\\VSCommon\\17.0\\SQM": {
  "OptIn": { "Type": "REG_DWORD", "Data": 0 }
},
"HKLM\\SYSTEM\\CurrentControlSet\\Services\\VSStandardCollectorService150": {
  "Start": { "Type": "REG_DWORD", "Data": 4 }
}
```
