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
  const cmd = getPkgManage()
  const opt = cmd.includes('yarn') ? 'add' : 'i'
  child.spawnSync(cmd, [
    opt,
    ...depList,
    m
  ], {
    stdio: 'inherit',
    cwd: process.cwd()
  })
}

function getPkgManage() {
  const yarnLock = fs.existsSync(resolve(process.cwd(), 'yarn.lock'))
  const npmLock = fs.existsSync(resolve(process.cwd(), 'package-lock.json'))
  const pnpmLock = fs.existsSync(resolve(process.cwd(), 'pnpm-lock.yaml'))
  const win32 = process.platform === 'win32'

  if (yarnLock) {
    return win32 ? 'yarn.cmd' : 'yarn'
  } 
  if (npmLock) {
    return win32 ? 'npm.cmd': 'npm'
  }
  if (pnpmLock) {
    return win32 ? 'pnpm.cmd': 'pnpm'
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  if (pkgInfo) {
    return win32 ? pkgInfo.name + '.cmd' : pkgInfo.name
  } else {
    return win32 ? 'npm.cmd': 'npm'
  }
}

function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

module.exports = {
  mergePkg,
  addDep
}