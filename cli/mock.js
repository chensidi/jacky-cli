/* 
  1. 根目录下建立mock文件夹
  2. 生成index.js文件内容和demoMock数据示例
  3. 添加依赖
*/

const fs = require('fs')
const { resolve } = require('path')
const { addDep } = require('./utils')

module.exports = () => {
  createMockDir()
  makeIndex()
  addDep(['mockjs'], '-D')
}

function createMockDir() {
  return fs.mkdirSync(
    resolve(process.cwd(), 'mock')
  )
}

function makeIndex() {
  const index = fs.readFileSync(
    resolve(__dirname, './template/mock.ejs'),
    {
      encoding: 'utf-8'
    }
  )
  fs.writeFileSync(
    resolve(process.cwd(), './mock/index.js'),
    index
  )
  const demo = fs.readFileSync(
    resolve(__dirname, './template/mockDemo.ejs'),
    {
      encoding: 'utf-8'
    }
  )
  fs.writeFileSync(
    resolve(process.cwd(), './mock/demo.js'),
    demo
  )
}
