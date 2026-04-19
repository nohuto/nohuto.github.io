---
title: 'Desktop Wallpaper'
description: 'Visibility option documentation from win-config.'
editUrl: 'https://github.com/nohuto/win-config/blob/main/visibility/desc.md#desktop-wallpaper'
sidebar:
  order: 2
---

This is a collection of some wallpapers that I've found over time. Added for people who may never have spent time changing their background, or for anyone else. Head over to [visibility/desc.md#desktop-wallpaper](/docs/win-config/visibility/desktop-wallpaper/), if you want to see the wallpapers in a seperate window.

### Asia

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Asia.png?raw=true)

### Austria

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Austria.png?raw=true)

### Beach

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Beach.png?raw=true)

### Blue Flowers

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Blue-Flowers.png?raw=true)

### Bones

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Bones.png?raw=true)

### Castle

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Castle.png?raw=true)

### Cat

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Cat.png?raw=true)

### City

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/City.png?raw=true)

### Dark Sunset

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Dark-Sunset.png?raw=true)

### Field Sunset

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Field-Sunset.png?raw=true)

### Flowers

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Flowers.png?raw=true)

### Flowers Sunset

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Flowers-Sunset.png?raw=true)

### Golden Hour

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Golden-Hour.png?raw=true)

### Heaven

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Heaven.png?raw=true)

### Lake

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Lake.png?raw=true)

### Mac

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Mac.png?raw=true)

### Man Landscape

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Man-Landscape.png?raw=true)

### Meadow Sunset

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Meadow-Sunset.png?raw=true)

### Moon

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Moon.png?raw=true)

### Moon Castle

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Moon-Castle.png?raw=true)

### Mountains

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Mountains.png?raw=true)

### Plants Room

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Plants-Room.png?raw=true)

### Pokemon

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Pokemon.png?raw=true)

### Rain

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Rain.png?raw=true)

### Sea

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Sea.png?raw=true)

### Sea Road

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Sea-Road.png?raw=true)

### Shop

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Shop.png?raw=true)

### Stars

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Stars.png?raw=true)

### Sunset

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Sunset.png?raw=true)

### Village

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Village.png?raw=true)

### Witcher Landscape

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Witcher-Landscape.png?raw=true)

### Workplace

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Workplace.png?raw=true)

### World

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/World.png?raw=true)

### Zelda

![](https://github.com/nohuto/win-config/blob/main/visibility/images/wallpaper/Zelda.png?raw=true)

## Windows Policies

It get's changed via the "Wallpaper" policy:
```json
{
  "File": "Desktop.admx",
  "CategoryName": "ActiveDesktop",
  "PolicyName": "Wallpaper",
  "NameSpace": "Microsoft.Policies.WindowsDesktop",
  "Supported": "Win2k - At least Windows 2000",
  "DisplayName": "Desktop Wallpaper",
  "ExplainText": "Specifies the desktop background (\"wallpaper\") displayed on all users' desktops. This setting lets you specify the wallpaper on users' desktops and prevents users from changing the image or its presentation. The wallpaper you specify can be stored in a bitmap (*.bmp) or JPEG (*.jpg) file. To use this setting, type the fully qualified path and name of the file that stores the wallpaper image. You can type a local path, such as C:\\Windows\\web\\wallpaper\\home.jpg or a UNC path, such as \\\\Server\\Share\\Corp.jpg. If the specified file is not available when the user logs on, no wallpaper is displayed. Users cannot specify alternative wallpaper. You can also use this setting to specify that the wallpaper image be centered, tiled, or stretched. Users cannot change this specification. If you disable this setting or do not configure it, no wallpaper is displayed. However, users can select the wallpaper of their choice. Also, see the \"Allow only bitmapped wallpaper\" in the same location, and the \"Prevent changing wallpaper\" setting in User Configuration\\Administrative Templates\\Control Panel. Note: This setting does not apply to remote desktop server sessions.",
  "KeyPath": [
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System"
  ],
  "Elements": [
    { "Type": "Text", "ValueName": "Wallpaper" },
    { "Type": "Enum", "ValueName": "WallpaperStyle", "Items": [
        { "DisplayName": "Center", "Data": "0" },
        { "DisplayName": "Tile", "Data": "1" },
        { "DisplayName": "Stretch", "Data": "2" },
        { "DisplayName": "Fit", "Data": "3" },
        { "DisplayName": "Fill", "Data": "4" },
        { "DisplayName": "Span", "Data": "5" }
      ]
    }
  ]
},
```
