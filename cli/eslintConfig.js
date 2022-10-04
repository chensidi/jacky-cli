const { prompt } = require('inquirer')
const { resolve } = require('path')
const ejs = require('ejs')
const fs = require('fs')
const child = require('child_process')
const { config, deps } = require('./template/eslintConfig')
const { mergePkg, addDep } = require('./utils')

async function selectFrame() {
  const { frame, useTs } = await prompt([
    {
      type: 'list',
      choices: [
        { value: 0, name: 'react' },
        { value: 1, name: 'vue' },
        { value: -1, name: 'none' },
      ],
      name: 'frame',
      message: '选择一种js框架',
    },
    {
      type: 'confirm',
      name: 'useTs',
      message: '是否使用typescript？',
      default: false,
    },
  ])
  return {
    frame,
    useTs,
  }
}

function createEslintConfig(config) {
  fs.cpSync(
    resolve(__dirname, './template', config),
    resolve(process.cwd(), '.eslintrc.js')
  )
}

function addEslintScripts() {
  const scripts = {
    'eslint:lint': 'eslint --ext .js,.ts,.tsx,.jsx,.vue src/',
    'eslint:fix': 'eslint --fix --ext .js,.ts,.tsx,.jsx,.vue src/',
  }
  mergePkg('scripts', scripts)
}

function summaryLintRc(frame) {
  const eslintRc = fs.readFileSync(resolve(__dirname, './template/.eslintrc.ejs'), { encoding: 'utf-8' })
  let eslintRcStr = ejs.render(eslintRc, { react: false, vue: false })
  if (frame == 0) {
    eslintRcStr = ejs.render(eslintRc, { react: true, vue: false })
  } else if (frame == 1) {
    eslintRcStr = ejs.render(eslintRc, { vue: true, react: false })
  }
  fs.writeFileSync(resolve(process.cwd(), '.eslintrc.js'), eslintRcStr)
}

module.exports = async () => {
  const { frame, useTs } = await selectFrame()
  if (frame > -1) {
    const dep = deps[frame]
    addDep(Object.keys(dep), '-D')
    const cfg = config[frame]
    // createEslintConfig(cfg)
    summaryLintRc(frame)
    addEslintScripts()
  }
}
