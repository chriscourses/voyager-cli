#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const childProcess = require('child_process')
const shell = require('shelljs')
const generate = require('../lib/generate')

const header = chalk.bold.hex('#3E4FD7')
const command = chalk.bold.hex('#FBE255')

/**
 * commander initialization
 */

program.version(require('../package').version).usage('<command> [options]')

/**
 * voyager new <project-name>
 */

program
    .command('new <project-name>')
    .description('create new project')
    .option('-a, --auth', 'scaffold with user authentication')
    .action(generate)

/**
 * voyager start
 */

program
    .command('start')
    .description('launch project')
    .action(() => {
        shell.exec('npm start')
    })

/**
 * custom help section                 
 */

program.on('--help', function() {
    console.log(`\n\n${header('  Examples:')}`)
    console.log(
        '\n' +
            command('    voyager new app --auth') +
            chalk.gray('  creates a new app with user auth ')
    )
    console.log(
        command('    voyager start') +
            chalk.gray('           starts up the voyager server') +
            '\n'
    )
})

program.parse(process.argv)

if (program.args.length === 0) program.help() // Show help section if only "voyager" is typed
