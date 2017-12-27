const { expect } = require('chai')
const fs = require('fs')
const rm = require('rimraf').sync

const generate = require('../lib/generate')

describe('running `voyager new app`', function() {
    this.timeout(15000)

    it('should create a voyager app', function(done) {
        const directoryPath = './test/test-app'
        const options = {
            auth: false
        }

        generate(directoryPath, options, directoryPath => {
            expect(fs.existsSync(directoryPath)).to.equal(true)

            const contents = fs.readFileSync(directoryPath + '/package.json')
            const packageJSON = JSON.parse(contents)
            expect(packageJSON.name).to.equal('voyager')

            rm(directoryPath)
            done()
        })
    })
})

describe('running `voyager new app --auth`', function() {
    this.timeout(15000)

    it('should create a voyager-auth app', function(done) {
        const directoryPath = './test/test-app-auth'
        const options = {
            auth: true
        }

        generate(directoryPath, options, directoryPath => {
            expect(fs.existsSync(directoryPath)).to.equal(true)

            const contents = fs.readFileSync(directoryPath + '/package.json')
            const packageJSON = JSON.parse(contents)
            expect(packageJSON.name).to.equal('voyager-auth')

            rm(directoryPath)
            done()
        })
    })
})

