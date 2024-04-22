# War Thunder Stats


## Quick Setup

```sh
# clone the project
git clone https://github.com/Kamaz91/war-thunder-stats.git

# install dependency
npm install

# develop
npm run dev
```
## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```