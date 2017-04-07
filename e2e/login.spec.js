import { expect } from 'chai'
import { go, sleep, findId, By } from './selenium'
import common from './common'

describe('Test Login', () => {
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    /*
    it('should log in as the test user, navigate to main page', (done) => {
        sleep(500)
            .then(findId('page-title').getText()
                .then(text => {
                    expect(text).to.equal("Main Page")
                })
                .then(done))
    })
    */
})
