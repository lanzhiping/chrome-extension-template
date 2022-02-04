# chrome-extension-template

A template util for creating chrome extension quickly

## How to use
1. install the package
```bash
$ npm init --yes # ignore if already have package.json file
$ npm install chrome-extension-template --save-dev
$ npx chrome-extension-template
```

this generates a simple chrome extension app in your project directory, including:
```
--
  |-- package.json
  |-- webpack.config.js
  |-- src
    |-- manifest.json
    |-- background
      | index.js
    |-- options
      | index.js
      | index.html
      | index.css
    |-- popup
      | index.js
      | index.html
      | index.css
    |-- icons
      | ...
```

2. build the app and then you may load the chrome extension app from `./dist` into your chrome for fun
```bash
$ npm run build
```

3. for local development, you could
```bash
$ npm run dev
```

## More to come
- able to select typical chrome extension types with rich examples
- support more frameworks in template
  - react / vue
  - style component / SASS / LESS
- more...
