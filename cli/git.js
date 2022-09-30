/* 
  1. 添加插件cz-customizable，规范本地提交
  2. 添加.cz.config.js 控制提交格式
  3. 添加package.json commitizen字段，打开git cz命令
*/
const child = require('child_process')
const fs = require('fs')
const { resolve } = require('path')

module.exports = async () => {
  addCz()
  createCzConfig()
  cfgPackage()
}

function addCz() {
  return child.spawnSync('yarn.cmd', ['add', 'cz-customizable'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}

function createCzConfig() {
  const cfgPath = resolve(__dirname, './template/.cz.config.js')
  const curPath = resolve(process.cwd(), '.cz-config.js')
  return fs.cpSync(cfgPath, curPath)
}

function cfgPackage() {
  const curPkgPath = resolve(process.cwd(), 'package.json')
  const curPkg = require(curPkgPath)
  const {
    config = {},
  } = curPkg
  Object.assign(config, {
    commitizen: {
      path: 'node_modules/cz-customizable',
    },
  })
  Object.assign(curPkg, {
    config
  })
  fs.writeFileSync(curPkgPath, JSON.stringify(curPkg, null, 2), { encoding: 'utf-8' })
}
