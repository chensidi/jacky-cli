#!/usr/bin/env node

const { program } = require("commander")
const { prompt } = require('inquirer')

program
  .command('addGitRules')
  .description('给项目配置git提交规范')
  .action(() => {
    require('./gitConfig')()
  })

program
  .command('addEslint')
  .description('给项目配置eslint')
  .action(() => {
    require('./eslintConfig')()
  })

program.parse(process.argv)

