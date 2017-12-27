const { expect } = require('chai')
const fs = require('fs')
const rm = require('rimraf').sync
const request = require('supertest')
const di = require('dependency-install')

const generate = require('../lib/generate')

// Ensure voyager start spins up server (run function then test that page gets 200 code)
describe('visiting `/` in newly created app', function() {
    this.timeout(100000)
    it('should render successfully', function(done) {
        const directoryPath = './test/test-voyager-start'
        const options = {
            auth: false
        }

        generate(directoryPath, options, directoryPath => {
            expect(fs.existsSync(directoryPath)).to.equal(true)

            const contents = fs.readFileSync(directoryPath + '/package.json')
            const packageJSON = JSON.parse(contents)
            expect(packageJSON.name).to.equal('voyager')

            di.install(['./'], function() {
                const app = require('./test-voyager-start/app.js')

                request(app)
                    .get('/')
                    .expect(200)

                rm(directoryPath)
                done()
            })
        })
    })
})
