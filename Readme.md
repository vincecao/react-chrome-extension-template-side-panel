# React-Chrome-Extension-Template: Collapse Side Panel

A simple React implement Chrome extension with side collapse and menu context window features, optimized for fitting most of the webpage. 

Inspired by [satendra02/react-chrome-extension](https://github.com/satendra02/react-chrome-extension). Integrated with [BlueprintJs](https://blueprintjs.com/docs/). Able to toogle sidepanel by extension icon.

![](screenshots/demo.gif)

## Demo

### [CodeSanbox](https://codesandbox.io/s/react-chrome-extension-collapsesidepanel-ww4lm)

## Build

``` bash
git clone git@github.com:vincecao/React-Chrome-Extension-CollapseSidePanel.git
cd React-Chrome-Extension-CollapseSidePanel

yarn install

# add logo under /public, icon16.png, icon48.png, icon128.png
# Modify /public/manifest.json

yarn build
```

## Installation

* <del>Download `crx` file in [Release](https://github.com/vincecao/React-Chrome-Extension-CollapseSidePanel/releases) Page</del>(Not work for latest Chrome)
* Open Chrome or edge
* Toggle Developer mode
* <del>Drag `crx` file for loading release version.</del>(Not work for latest Chrome)
* Load unpacked `/build` folder for loading development verison.

![](screenshots/loadUnpacked.png)
