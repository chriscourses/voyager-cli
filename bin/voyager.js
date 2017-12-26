#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const generate = require('../lib/generate')

const header = chalk.bold.hex('#3E4FD7')
const command = chalk.bold.hex('#FBE255')
console.log(generate)

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
    .option('-s, --setup_mode [mode]', 'Which setup mode to use')
    .action(() => {
        const exec = require('child_process').exec
        exec('npm start').stderr.pipe(process.stderr)
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
