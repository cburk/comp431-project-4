import { expect } from 'chai'
import { go, sleep, findId, findName, By } from './selenium'
import common from './common'

describe('Test Profile Actions', () => {
    before('should log in, navigate to profile', (done) => {
        go().then(common.login)
            .then(findId('PROFILE_PAGE').click())
            .then(done)
    })
    
    /*
    it('should update the users email', (done) => {
        const newEmail = "A@new2.email"
        findId('pf-email').sendKeys(newEmail)
        .then(findId('pf-submit').click())
        .then(sleep(200))
        .then(() => {return findName('p-email')})
        .then(emailObj => {
            return emailObj.getText()
        })
        .then(text => {expect(text.indexOf(newEmail)).to.not.eql(-1)})
        .then(done)
    })
    
    it('should update the users zipcode', (done) => {
        const newZip = "12521"
        findId('pf-zip').sendKeys(newZip)
        .then(findId('pf-submit').click())
        .then(sleep(200))
        .then(() => {return findName('p-zip')})
        .then(zipObj => {
            return zipObj.getText()
        })
        .then(text => {
        expect(text.indexOf(newZip)).to.not.eql(-1)})
        .then(done)
    })

    it('should not update the users password', (done) => {
        const newPass = "a-s-d"
        findId('pf-password').sendKeys(newPass)
        .then(findId('pf-submit').click())
        .then(sleep(200))
        .then(() => {return findId('profile-status')})
        .then(textStatusObj => {
            return textStatusObj.getText()
        })
        .then(text => {
        expect(text).to.eql('Password will not change')})
        .then(done)
    })
    */
    
    //password
    //profile-status
    //Password will not change
})
