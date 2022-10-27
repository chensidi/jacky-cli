/* 
  1. 安装prettier依赖
  2. 生成配置文件和script命令
*/

const { addDep, mergePkg } = require('./utils')
const fs = require('fs')
const { resolve } = require('path')

module.exports = async () => {
  addDep(['prettier'], '-D')
  createConfig()
}

function createConfig() {
  fs.copyFileSync(
    resolve(__dirname, './template/.prettierrc.js'),
    resolve(process.cwd(), '.prettierrc.js')
  )
  const scripts = {
    pWrite: 'prettier --write src/**/*.{js,ts,jsx,tsx}',
  }
  mergePkg('scripts', scripts)
}
