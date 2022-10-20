const child = require('child_process')
const fs = require('fs')
const { resolve } = require('path')

const eslintHandle = require('./eslintConfig')
const { addDep } = require('./utils')

const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'

module.exports = async () => {
  addDeps()
  createCzConfig()
  createCommitLintConfig()
  cfgPackage()
  gitHooksInit()
  eslintHandle()
}

// 添加依赖
function addDeps() {
  const deps = [
    'cz-customizable',
    '@commitlint/cli',
    '@commitlint/config-conventional',
    'husky',
    'lint-staged',
  ]
  return addDep(deps, '-D')
}

// 添加cz配置文件
function createCzConfig() {
  const cfgPath = resolve(__dirname, './template/.cz.config.js')
  const curPath = resolve(process.cwd(), '.cz-config.js')
  return fs.cpSync(cfgPath, curPath)
}

// 添加commitlint配置
function createCommitLintConfig() {
  const cfgPath = resolve(__dirname, './template/commitlint.config.js')
  const curPath = resolve(process.cwd(), 'commitlint.config.js')
  return fs.cpSync(cfgPath, curPath)
}

// 添加package commitizen，script字段
function cfgPackage() {
  const curPkgPath = resolve(process.cwd(), 'package.json')
  // const curPkg = require(curPkgPath)
  let curPkg = fs.readFileSync(curPkgPath, { encoding: 'utf-8' })
  curPkg = JSON.parse(curPkg)
  const { config = {}, scripts = {} } = curPkg
  Object.assign(config, {
    commitizen: {
      path: 'node_modules/cz-customizable',
    },
  })
  Object.assign(scripts, {
    'eslint:init': 'npx eslint --init',
  })
  Object.assign(curPkg, {
    config,
    scripts,
  })
  fs.writeFileSync(curPkgPath, JSON.stringify(curPkg, null, 2), {
    encoding: 'utf-8',
  })
}

// husky初始化
function setCommitMsg() {
  child.spawnSync(npxCmd, ['husky', 'install'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
  child.spawnSync(npxCmd, [
    'husky',
    'add',
    '.husky/commit-msg',
    'npx --no -- commitlint --edit ${1}',
  ])
}

function setPreCommit() {
  child.spawnSync(npxCmd, [
    'husky',
    'add',
    '.husky/pre-commit',
    'npx lint-staged',
  ])
  fs.cpSync(
    resolve(__dirname, './template/.lintstagedrc.json'),
    resolve(process.cwd(), '.lintstagedrc.json')
  )
}

// 添加git hooks
function gitHooksInit() {
  setCommitMsg()
  setPreCommit()
}
