#!/usr/bin/env node

const cpy = require('cpy')
const { exec } = require('child_process')
const appRoot = require('app-root-path')
const updateJsonFile = require('update-json-file')
const { renderToFolder } = require('template-file')
const { readConfig } = require('./readConfig')

;(async () => {
  const isDev = process.env.NODE_ENV === 'development'
  const sourcePrefix = isDev ? '' : 'node_modules/chrome-extension-template/'
  const destPrefix = isDev ? 'build/' : ''

  // initial config
  const config = await readConfig()
  if (!config.confirmed) {
    return
  }

  // copy template other files into src folder
  await Promise.all([
    cpy(
      appRoot.resolve(`${sourcePrefix}template/background`),
      appRoot.resolve(`${destPrefix}src/background`)
    ),
    cpy(
      appRoot.resolve(`${sourcePrefix}template/options`),
      appRoot.resolve(`${destPrefix}src/options`)
    ),
    cpy(
      appRoot.resolve(`${sourcePrefix}template/popup`),
      appRoot.resolve(`${destPrefix}src/popup`)
    ),
    cpy(
      appRoot.resolve(`${sourcePrefix}template/icons`),
      appRoot.resolve(`${destPrefix}src/icons`)
    )
  ]).then(() => console.info('generated modules in src folder'))

  // generate src/manifest.json file according to config
  await renderToFolder(
    appRoot.resolve(`${sourcePrefix}template/manifest.json`),
    appRoot.resolve(`${destPrefix}src`),
    config
  ).then(() => console.info('generated manifest.json in src folder'))

  // create webpack.config.js confile
  await renderToFolder(
    appRoot.resolve(`${sourcePrefix}template/webpack.config.js`),
    appRoot.resolve(destPrefix),
    config
  ).then(() => console.info('generated webpack.config.js in src folder'))

  // add dependencies into package.json
  await updateJsonFile(
    appRoot.resolve(`${destPrefix}package.json`),
    (package) => {
      package.devDependencies['clean-webpack-plugin'] = '^3.0.0'
      package.devDependencies['copy-webpack-plugin'] = '^5.1.2'
      package.devDependencies['webpack'] = '^4.46.0'
      package.devDependencies['webpack-cli'] = '^3.3.12'
      package.devDependencies['zip-webpack-plugin'] = '^3.0.0'
      package.scripts['dev'] = 'webpack --watch'
      package.scripts['build'] = 'NODE_ENV=production webpack'
      return package
    },
    {
      defaultValue: {
        scripts: {
          dev: 'webpack --watch',
          build: 'NODE_ENV=production webpack'
        },
        devDependencies: {
          webpack: '^4.46.0',
          'webpack-cli': '^3.3.12',
          'zip-webpack-plugin': '^3.0.0',
          'copy-webpack-plugin': '^5.1.2',
          'clean-webpack-plugin': '^3.0.0'
        }
      }
    }
  ).then(() => console.info('updated package.json'))

  // install dependencies
  await new Promise((resolve) => {
    exec('npm install', () => resolve())
  })

  console.info('done')
})()
