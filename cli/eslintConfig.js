const { prompt } = require('inquirer')
const { resolve } = require('path')
const fs = require('fs')
const child = require('child_process')
const { config, deps } = require('./template/eslintConfig')
const { mergePkg, addDep } = require('./utils')

async function selectFrame() {
  const { frame } = await prompt([
    {
      type: 'list',
      choices: [
        { value: 0, name: 'react' },
        { value: 1, name: 'vue' },
        { value: -1, name: 'none' },
      ],
      name: 'frame',
      message: '选择一种js框架'
    }
  ])
  return frame
}

function createEslintConfig(config) {
  fs.cpSync(resolve(__dirname, './template', config), resolve(process.cwd(), '.eslintrc.js'))
}

function addEslintScripts() {
  const scripts = {
    "eslint:lint": "eslint --ext .js,.ts,.tsx,.jsx src/",
    "eslint:fix": "eslint --fix --ext .js,.ts,.tsx,.jsx src/"
  }
  mergePkg('scripts', scripts)
}

module.exports = async () => {
  const frame = await selectFrame()
  if (frame > -1) {
    const dep = deps[frame]
    addDep(Object.keys(dep), '-D')
    const cfg = config[frame]
    createEslintConfig(cfg)
    addEslintScripts()
  }
}