/* 
  1. 根目录下建立mock文件夹
  2. 生成index.js文件内容和demoMock数据示例
  3. 添加依赖
*/

const fs = require('fs')
const { prompt } = require('inquirer')
const ejs = require('ejs')
const { resolve } = require('path')
const { addDep } = require('./utils')

module.exports = async () => {
  const dirName = await createMockDir()
  await makeIndex(dirName)
  addDep(['mockjs'], '-D')
}

async function createMockDir() {
  const { dirName } = await prompt([
    {
      type: 'input',
      name: 'dirName',
      message: '输入mock文件夹名称',
      default: 'mock',
    },
  ])
  fs.mkdirSync(resolve(process.cwd(), dirName))
  return dirName
}

async function makeIndex(dirName) {
  const { ext } = await prompt([
    {
      type: 'list',
      name: 'ext',
      message: '选择存放的mock数据是使用那种语言',
      default: 'js',
      choices: [
        {
          name: 'JavaScript',
          value: 'js',
        },
        {
          name: 'TypeScript',
          value: 'ts',
        },
      ],
    },
  ])
  const { base } = await prompt([
    {
      type: 'list',
      name: 'base',
      message: '选择基于哪种构建工具？',
      default: 'vite',
      choices: [
        {
          name: 'Vite',
          value: 'vite',
        },
        {
          name: 'Webpack',
          value: 'webpack',
        },
      ],
    },
  ])
  const index = fs.readFileSync(resolve(__dirname, './template/mock.ejs'), {
    encoding: 'utf-8',
  })
  fs.writeFileSync(
    resolve(process.cwd(), `./${dirName}/index.${ext}`),
    ejs.render(index, {
      ts: ext === 'ts',
      vite: base === 'vite',
      webpack: base === 'webpack',
    })
  )
  const demo = fs.readFileSync(resolve(__dirname, './template/mockDemo.ejs'), {
    encoding: 'utf-8',
  })
  fs.writeFileSync(resolve(process.cwd(), `./${dirName}/demo.${ext}`), demo)
}
