#!/usr/bin/env node

const prompts = require('prompts')
const validateName = require('validate-npm-package-name')

const createExtensionQuestions = [
  {
    type: 'text',
    name: 'name',
    message: 'extension name?',
    validate: (value) => {
      const { errors } = validateName(value)
      return errors ? JSON.stringify(errors) : true
    }
  },
  {
    type: 'text',
    name: 'description',
    message: 'extension description?',
    default: ''
  },
  {
    type: 'text',
    name: 'author',
    message: 'author name?'
  },
  {
    type: 'confirm',
    name: 'confirmed',
    message: '',
    onRender(color) {
      let message = 'following files will be overriden, do you confirm?'
      const filesWillBeOverriden = [
        '  src/*',
        '  webpack.config.js',
        '  package.json'
      ]

      message +=
        color.cyan('\n[\n') +
        color.cyan(filesWillBeOverriden.join('\n')) +
        color.cyan('\n]\n')

      this.msg = message
    }
  }
]

;(async () => {
  // initial config
  const response = await prompts(createExtensionQuestions)
  console.log(response)

  // generate files
  // add dependencies into package.json
  // create template in src folder
  // create webpack.config.js confile

  // run npm install to install required packages
})()
