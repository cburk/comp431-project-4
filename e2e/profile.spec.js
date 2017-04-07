import { expect } from 'chai'
import { go, sleep, findId, findName, By } from './selenium'
import common from './common'

describe('Test Profile Actions', () => {
    before('should log in, navigate to profile', (done) => {
        go().then(common.login)
            .then(findId('PROFILE_PAGE').click())
            .then(done)
    })
    
    it('should update the users email', (done) => {
        const newEmail = "A@new.email"
        console.log("Started email test")
        findId('pf-email').sendKeys(newEmail)
        .then(findId('pf-submit').click())
        .then(() => {return findName('p-email')})
        .then(emailObj => {
            return emailObj.getText()
        })
        .then(text => {expect(text.indexOf(newEmail)).to.not.eql(-1)})
        .then(done)
    })
    
    //zipcode
    
    //password
})
