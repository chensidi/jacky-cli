const { prompt } = require('inquirer')
const { resolve } = require('path')
const fs = require('fs')
const child = require('child_process')

function mergePkg(prop, value) {
  // const pkg = require(resolve(process.cwd(), 'package.json'))
  const pkgStr = fs.readFileSync(resolve(process.cwd(), 'package.json'), { encoding: 'utf-8' })
  const pkg = JSON.parse(pkgStr)
  const propVal = pkg[prop] || (pkg[prop] = {})
  Object.assign(propVal, value)
  pkg[prop] = propVal
  fs.writeFileSync(resolve(process.cwd(), 'package.json'), JSON.stringify(pkg, null, 2))
}

function addDep(depList, m) {
  child.spawnSync('yarn.cmd', [
    'add',
    ...depList,
    m
  ], {
    stdio: 'inherit',
    cwd: process.cwd()
  })
}

module.exports = {
  mergePkg,
  addDep
}