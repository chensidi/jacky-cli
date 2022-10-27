#!/usr/bin/env node

const { program } = require('commander')
const gitConfig = require('./gitConfig.js')
const eslintConfig = require('./eslintConfig')
const mock = require('./mock')
const prettier = require('./prettier')

program
  .command('addGitRules')
  .description('给项目配置git提交规范')
  .action(() => {
    gitConfig()
  })

program
  .command('addEslint')
  .description('给项目配置eslint')
  .action(() => {
    eslintConfig()
  })

program
  .command('addMock')
  .description('给项目添加mock功能')
  .action(() => {
    mock()
  })

program
  .command('addPrettier')
  .description('给项目安装prettier')
  .action(() => {
    prettier()
  })

program.parse(process.argv)
