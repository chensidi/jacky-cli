#!/usr/bin/env node

const { program } = require("commander")
const gitConfig = require('./gitConfig.js')
const eslintConfig = require('./eslintConfig')

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

program.parse(process.argv)

