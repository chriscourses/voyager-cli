#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const header = chalk.bold.hex('#3E4FD7')
const command = chalk.bold.hex('#FBE255')
// const arg1 = process.argv[2]
// const arg2 = process.argv[3]

/**
 * commander initialization
 */

program.version(require('../package').version).usage('<command> [options]')

/**
 * voyager new [project]
 */

program
    .command('new <project-name>')
    .description('create new project')
    .option('-a, --auth', 'scaffold with user authentication integrated')
    .action((project, options) => {
        const mode = options.setup_mode || 'normal'
        project = project || 'all'
        console.log('setup for %s project(s) with %s mode', project, mode)
    })

/**
 * voyager start
 */

program
    .command('start')
    .description('launch project')
    .option('-s, --setup_mode [mode]', 'Which setup mode to use')
    .action((project, options) => {
        const mode = options.setup_mode || 'normal'
        project = project || 'all'
        console.log('setup for %s project(s) with %s mode', project, mode)
    })

program.on('--help', function() {
    console.log('')
    console.log('')
    console.log(header('  Examples:'))
    console.log('')
    console.log(
        command('    voyager new app --auth') +
            chalk.gray('  creates a new user auth app')
    )
    console.log(
        command('    voyager start') +
            chalk.gray('           starts the voyager server')
    )
    console.log('')
})

program.parse(process.argv)

if (program.args.length === 0) program.help()
