const download = require('download-git-repo')
const fs = require('fs')
const di = require('dependency-install')
const npmRun = require('npm-run')
const logger = require('../lib/logger')
const ora = require('ora')
const spinner = ora('Preparing for liftoff (initializing project)')

/**
 * Download a repo and place inside a directory.
 *
 * @param {String} directoryName
 * @param {Object} options
 * @param {Function} callback (used for testing purposes)
 */

module.exports = function generate(directoryName, options, callback) {
    spinner.start()

    let repo = options.auth ? 'voyager-auth' : 'voyager'

    if (fs.existsSync(directoryName)) {
        spinner.stop()
        logger.fatal('Directory already exists.')
    }

    fs.mkdirSync(directoryName)

    download(`chriscourses/${repo}`, directoryName, err => {
        if (err) {
            spinner.stop()
            logger.fatal(err)
        }

        spinner.succeed()
        if (callback) callback(directoryName)

        spinner.text =
            'Downloading dependencies (this will take about 20-30 seconds)'
        spinner.color = 'blue'
        spinner.start()

        di.install(['./' + directoryName], function() {
            npmRun.exec(
                'npm rebuild node-sass --silent',
                { cwd: './' + directoryName },
                function(err, stdout, stderr) {
                    spinner.stop()
                    logger.success(
                        'Created new Voyager project: "%s".',
                        directoryName
                    )
                }
            )
        })
    })
}
