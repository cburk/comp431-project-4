import { expect } from 'chai'
import { go, sleep, findId, By } from './selenium'
import common from './common'

describe('Test Dummy Server Registration', () => {
    before('should register', (done) => {
        go().then(common.register).then(done)
    })

    it('should register a new user, print success msesage', (done) => {
        sleep(500)
            .then(findId('registration-status').getText()
                .then(text => {
                    expect(text).to.equal("Successfully registered user")
                })
                .then(done))
    })
})
