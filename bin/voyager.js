#!/usr/bin/env node

const program = require('commander')
const download = require('download-git-repo')
const fs = require('fs')
const logger = require('../lib/logger')
const chalk = require('chalk')
const ora = require('ora')

const header = chalk.bold.hex('#3E4FD7')
const command = chalk.bold.hex('#FBE255')
const spinner = ora('preparing for liftoff')

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
    .option('-a, --auth', 'scaffold with user authentication integrated')
    .action((projectName, options) => {
        spinner.start()

        let repo = options.auth ? 'voyager-auth' : 'voyager'

        if (fs.existsSync(projectName)) {
            spinner.stop()
            logger.fatal('Directory already exists.')
        }

        fs.mkdirSync(projectName)

        download(`chriscourses/${repo}`, projectName, err => {
            spinner.stop()
            if (err) logger.fatal(err)

            logger.success('Created new Voyager project: "%s".', projectName)
        })
    })

/**
 * voyager start
 */

program
    .command('start')
    .description('launch project')
    .option('-s, --setup_mode [mode]', 'Which setup mode to use')
    .action((project, options) => {})

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