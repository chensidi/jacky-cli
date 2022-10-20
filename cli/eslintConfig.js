const { prompt } = require('inquirer')
const { resolve } = require('path')
const ejs = require('ejs')
const fs = require('fs')
const { deps } = require('./template/eslintConfig')
const { mergePkg, addDep } = require('./utils')

async function selectFrame() {
  const { frame, useTs } = await prompt([
    {
      type: 'list',
      choices: [
        { value: 0, name: 'none' },
        { value: 1, name: 'react' },
        { value: 2, name: 'vue' },
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

function addEslintScripts() {
  const scripts = {
    'eslint:lint': 'eslint --ext .js,.ts,.tsx,.jsx,.vue src/',
    'eslint:fix': 'eslint --fix --ext .js,.ts,.tsx,.jsx,.vue src/',
  }
  mergePkg('scripts', scripts)
}

function summaryLintRc(frame, useTs) {
  const eslintRc = fs.readFileSync(
    resolve(__dirname, './template/.eslintrc.ejs'),
    { encoding: 'utf-8' }
  )
  let eslintRcStr = ejs.render(eslintRc, { react: false, vue: false, useTs })
  if (frame == 1) {
    eslintRcStr = ejs.render(eslintRc, { react: true, vue: false, useTs })
  } else if (frame == 2) {
    eslintRcStr = ejs.render(eslintRc, { vue: true, react: false, useTs })
  }
  fs.writeFileSync(resolve(process.cwd(), '.eslintrc.js'), eslintRcStr)
}

function addEsIgnore() {
  fs.copyFileSync(
    resolve(__dirname, './template/.eslintignore'),
    resolve(process.cwd(), '.eslintignore')
  )
}

module.exports = async () => {
  const { frame, useTs } = await selectFrame()
  const dep = deps[frame]
  const requireDeps = Object.keys(dep)
  summaryLintRc(frame, useTs)
  addEslintScripts()
  addEsIgnore()
  if (useTs) {
    requireDeps.push(
      'eslint-config-standard-with-typescript',
      'typescript',
      '@typescript-eslint/eslint-plugin'
    )
  }
  addDep(requireDeps, '-D')
}
