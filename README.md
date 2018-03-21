# BoilerPlate Webpack 3.6 + Bootstrap 4.0 and ES6

## Requirements
This boilerplate is built upon several features for task automatization. So this project requires [Node.js](https://nodejs.org/) v4.0+ to be installed locally. A global install of Webpack is also recommended.

## Installation
To get the project up and running, and view an example in the browser, complete the following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git clone git@github.com:italoborges/webpack-bootstrap4-es6.git` (SSH) or `git clone https://github.com/italoborges/webpack-bootstrap4-es6.git` (HTTPS)
3. Install project dependancies: `npm install`
4. Start the development environment: `npm run dev`
5. Open your browser and visit <http://localhost:8000>

## Development
When in development mode, you may want assets automatically compiled and the browser to refresh automatically. To do this, run the following task:

* `npm run dev`

## Creating a static build
To create a static instance of this project, run the following task:

* `npm run build`

This will create a folder called `dist`, into which the final files will be created.

## Repo structure
Sometimes it’s helpful to know what all these different files are for…

```
/
├─ src/
│  ├─ js/            # JavaScript Files
│  │  ├─ main.js     # Main JS file
│  │  ├─ vendor.js   # Vendor JS file used to import external libs
│  │
│  ├─ scss/          # SASS files
│  │  ├─ base/       # …that has the basic config for the project
│  │  ├─ components/ # …that has all the components styles
│  │  ├─ elements/   # …that has all individual elements styles
│  │  ├─ views/      # …that style each scene/page
│  │  ├─ custom.scss # …that customize bootstrap style
│  │  ├─ style.scss  # …that combine all main styles into one single file
│  │  └─ vendor.scss # …that combine all vendor styles into one single file
│  │
│  ├─ images/        # Images
│  │
│  └─ fonts/         # Fonts (all the formats)
│
├─ dist/             # Public build (you can ignore this folder on gitignore)
│
├─ .gitignore        # List of files and folders not tracked by Git
├─ webpack.config.js # Configuration for Webpack tasks
├─ LICENSE           # License information for this project
├─ package.json      # Project manifest
└─ README.md         # This file
```
