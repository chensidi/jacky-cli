/* 
  1. 添加插件cz-customizable，规范本地提交
  2. 添加.cz.config.js 控制提交格式
  3. 添加package.json commitizen字段，打开git cz命令
*/
const child = require('child_process')
const fs = require('fs')
const { resolve } = require('path')

const eslintHandle = require('./eslintConfig')
const { addDep } = require('./utils')

module.exports = async () => {
  addDeps()
  createCzConfig()
  createCommitLintConfig()
  cfgPackage()
  initHusky()
  eslintHandle()
}

// 添加依赖
function addDeps() {
  const deps = [
    'cz-customizable',
    '@commitlint/cli',
    '@commitlint/config-conventional',
    'husky',
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
  const curPkg = require(curPkgPath)
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
function initHusky() {
  child.spawnSync('npx.cmd', ['husky', 'install'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
  child.spawnSync('npx.cmd', [
    'husky',
    'add',
    '.husky/commit-msg',
    'npx --no -- commitlint --edit ${1}',
  ])
}
