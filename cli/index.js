#!/usr/bin/env node

const { program } = require("commander")
const { prompt } = require('inquirer')

program
  .command('git')
  .action(() => {
    require('./git')()
  })


program.parse(process.argv)

