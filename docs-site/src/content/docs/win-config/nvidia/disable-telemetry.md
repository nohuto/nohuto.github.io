---
title: 'Telemetry'
description: 'NVIDIA option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/nvidia/desc.md#disable-telemetry'
sidebar:
  order: 15
---

Removes several files & preventing the system from sending telemetry data.

```json
"HKLM\\SOFTWARE\\NVIDIA Corporation\\Global\\FTS": {
  "EnableRID44231": { "Type": "REG_DWORD", "Data": 0 },
  "EnableRID64640": { "Type": "REG_DWORD", "Data": 0 },
  "EnableRID66610": { "Type": "REG_DWORD", "Data": 0 }
},
```
These three values are often applied in reference to "NVIDIA Telemetry", but since these seem to be outdated (they don't exist - test it yourself via [strings2-tui](https://github.com/nohuto/strings2-tui)) they won't get applied. The only "telemetry" related FTS parameters I found are:
```cfg
Parameter NVCFG_GLOBAL_FEATURE_RID67822_NVCPLTELEMETRYPHASE2_DYNAMIC
{
    Description   = "RID - 67822 NVCPL Telemetry support - Phase 2"
    OutputTypes   = { cRegkeyHeader regkeyInfx regkeyDB }
    DocURL        = "https://itproject.nvidia.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=67822"
    Tags          = { Feature FTS Disabled }
    ReleaseTarget = { rFuture }
    FtsRegkey     = "FTS_ENABLE_RID67822;EnableRID67822;0"
}
Parameter NVCFG_GLOBAL_FEATURE_RID69433_VIDEO_TELEMETRY_DX
{
    Description   = "RID - 69433 Video telemetry: DX drivers"
    OutputTypes   = { cheader mkfile }
    DocURL        = "https://itproject.nvidia.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=69433"
    Tags          = { Feature FTS }
    ReleaseTarget = { rFuture }
}

Parameter NVCFG_GLOBAL_FEATURE_RID69434_VIDEO_TELEMETRY_CUVID
{
    Description   = "RID - 69434 Video telemetry : CUVID driver"
    OutputTypes   = { cheader mkfile }
    DocURL        = "https://itproject.nvidia.com/itg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=69434"
    Tags          = { Feature FTS }
    ReleaseTarget = { rFuture }
}
```
Note: `rFuture` = release schedule not yet determined.


Miscellaneous code snippets for `OptInOrOutPreference` & `SendTelemetryData`:
```cpp
VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH        L"Software\\NVIDIA Corporation\\NVControlPanel2\\Client"
OPTIN_OUT_KEY                               L"OptInOrOutPreference"

// entry point
int __cdecl main(int argc, char* argv[])
{
    DWORD dwOptInOutValue = 1;
    DWORD dwOptInOutWOW = KEY_WOW64_64KEY;
    bool bOptInOutPathExists = false;
    bool bOptInOutExists = readKey(HKEY_CURRENT_USER, VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH, OPTIN_OUT_KEY, &dwOptInOutWOW, &bOptInOutPathExists, &dwOptInOutValue);

    // set user opt out
    setKey(HKEY_CURRENT_USER, VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH, OPTIN_OUT_KEY, &dwOptInOutWOW, bOptInOutPathExists, 0);

    // set user opt in
    setKey(HKEY_CURRENT_USER, VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH, OPTIN_OUT_KEY, &dwOptInOutWOW, true, 1);

    if (bOptInOutExists)
    {
        setKey(HKEY_CURRENT_USER, VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH, OPTIN_OUT_KEY, &dwOptInOutWOW, bOptInOutPathExists, dwOptInOutValue);
    }
    else
    {
        deleteKey(HKEY_CURRENT_USER, VIDEO_TELEMETRY_OPTIN_OPTOUT_REGPATH, OPTIN_OUT_KEY, dwOptInOutWOW, bOptInOutPathExists, bOptInOutExists);
    }
```
```h
    /* @brief Helper method to set regkey value which is used to determine whether user wants to send telemetry data or not
     * @param userOptInOrOut = 1 if user wants to opt in for sending telemetry data else userOptInOrOut =  0
     */
    static void SetUserOptInOrOutPreferenceOfTelemetry( DWORD userOptInOrOut );
```
```cpp
bool StartupFeatures::SendTelemetryData(StartupModel &model)
{
    System system = model.GetSystem();
    int systemMajor=system.Driver.GetMajorVersion();
    int systemMinor=system.Driver.GetMinorVersion();
    string DriverVersion=to_string(systemMajor)+"."+to_string(systemMinor);   // getting driver details
    SystemTypeName stn= NvTelemetry::nvcpl::SystemTypeName::Unknown;                         // getting System Type
    switch(system.SystemType)
    {
    case 0:
        stn=NvTelemetry::nvcpl::SystemTypeName::Unknown;
        break;
    case 1:
        stn=NvTelemetry::nvcpl::SystemTypeName::Laptop;
        break;
    case 2:
        stn=NvTelemetry::nvcpl::SystemTypeName::Desktop;
        break;
    }
    //cheching for optimus, hybrid or discrete system
    bool isOptimus = false;
    optional<Gpu> coprocGpu = SystemUtil::GetCoprocGpu(system);
    if (coprocGpu)
    {
        isOptimus = true;
    }
    bool isMsHybrid = false;
    if (coprocGpu)
    {
        boost::optional<CoprocSettings> coprocSettings = coprocGpu->CoprocSettings;
        UXDASSERT(coprocSettings);
        isMsHybrid = coprocSettings->IsMsHybrid;
    }
    SystemConfigName SystemConfig;
    if(isOptimus)
    {
        if(isMsHybrid)
            SystemConfig= SystemConfigName::MsHybrid;
        else
            SystemConfig= SystemConfigName::Optimus;
    }
    else
    {
        SystemConfig= SystemConfigName::Discrete;
    }
    OperatingSystem os = system.GetOperatingSystem();
    OSVersion version = os.GetVersion();
    int osmajor=version.GetMajor();
    int osminor=version.GetMinor();
    string OpSystem=to_string(osmajor)+"."+to_string(osminor);           //fetching OS Version
    boost::optional<RegistryKey> regKey;
    vector<Gpu> systemGpus;
    SystemUtil::GetGpus(system, back_inserter(systemGpus), GpuVendor_Nvidia);
    vector<string> Names;
    BOOST_FOREACH(Gpu &gpu, systemGpus)
    {
        wstring sw= gpu.GetName(); 
        string GpuName ( sw.begin(), sw.end());
        Names.push_back(GpuName);
    }
    sort(Names.begin(),Names.end());    // sorting GPU names
    string GpuNames;
    for(unsigned int i=0;i<Names.size();i++)
        GpuNames=Names[i]+";";
    SystemUtil::SendSystemInfoTelemetryEvent(DriverVersion, OpSystem, GpuNames,stn, SystemConfig);

    return true;

}
```

1. Read driver + OS version
2. Detect system type (desktop/laptop) + GPU config (discrete/Optimus/MsHybrid)
3. Collect NVIDIA GPU names
4. Send all that as one telemetry event

Only a small sequence of the process, which I have quickly written down, can be ignored.

Block NVIDIA telemetry domains (`C:\Windows\System32\drivers\etc\hosts`):
```
0.0.0.0 accounts.nvgs.nvidia.cn
0.0.0.0 accounts.nvgs.nvidia.com
0.0.0.0 api.commune.ly
0.0.0.0 assets.nvidiagrid.net
0.0.0.0 events.gfe.nvidia.com
0.0.0.0 gfe.geforce.com
0.0.0.0 gfe.nvidia.com
0.0.0.0 gfwsl.geforce.com
0.0.0.0 images.nvidia.com
0.0.0.0 images.nvidiagrid.net
0.0.0.0 img.nvidiagrid.net
0.0.0.0 login.nvgs.nvidia.cn
0.0.0.0 login.nvgs.nvidia.com
0.0.0.0 ls.dtrace.nvidia.com
0.0.0.0 nvidia.com.edgesuite.net
0.0.0.0 nvidia.telemetry.internet.microsoft.com
0.0.0.0 nvidia.tt.omtrdc.net
0.0.0.0 ota-downloads.nvidia.com
0.0.0.0 ota.nvidia.com
0.0.0.0 rds-assets.nvidia.com
0.0.0.0 services.gfe.nvidia.com
0.0.0.0 telemetry.gfe.nvidia.com
0.0.0.0 telemetry.nvidia.com
```
> https://github.com/ravetank/nvidia-telemetry-blocklist
