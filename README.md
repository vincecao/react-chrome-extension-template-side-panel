# React Chrome Extension Template: Side Panel

A simple [React](https://reactjs.org/) implementation of a Chrome Extension Template for a foldable side panel. Using [Parcel](https://parceljs.org/), [TailwindCSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/) for development. Optimized to fit most of the modern webpage and save setting to chrome storage. 

Check the demo in this [here](https://vince-amazing.com/react-chrome-extension-template-side-panel).

https://user-images.githubusercontent.com/17363908/189584314-cfa11ac3-bac4-4726-963e-86a0e238fced.mp4


## Development
``` bash
# clone the repo
git clone https://github.com/vincecao/react-chrome-extension-template-side-panel.git && cd react-chrome-extension-template-side-panel

# install needed package
yarn
# add logo under /public/manifest.json
# for local test
yarn start
# then open localhost:1234

# build the extension
yarn build
```

![2022-09-11_22-38](https://user-images.githubusercontent.com/17363908/189584329-04ed1cce-ec1e-4da8-8c06-4365385b87f2.png)


## Installation
* After build process, open Chrome or any chromium based browser
* Go to manage extension page
* Toggle `Developer mode`
* Choose Load unpacked option for `/publish` folder or unzip latest [release](https://github.com/vincecao/react-chrome-extension-template-side-panel/releases) file.

