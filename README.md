# chrome-extension-template

A template util for creating chrome extension quickly

## how to use

```bash
$ npm install chrome-extension-template -D
$ npx chrome-extension-template
```

this generate a simple chrome extension app in your root directory, including:

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
```

then you can build the simple chrome extension app to load into your chrome for fun

```bash
$ npm run build
```
