const prompts = require('prompts')
const URLRegExp = require('url-regexp')
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
    type: 'text',
    name: 'homePageUrl',
    message: "extension's home page url ?",
    validate: (value) =>
      URLRegExp.validate(value) ? true : 'invalid url input'
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

const readConfig = async () => prompts(createExtensionQuestions)

module.exports = {
  readConfig
}
