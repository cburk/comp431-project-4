import { expect } from 'chai'
import { findAllById, go, sleep, findId, By, pageSource } from './selenium'
import common from './common'

const artText = 'newest article'
let followCount

describe('Test Articles', () => {
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    /*
    it('should Update the status headline and verify the change', (done) => {
        const newHeadline = 'Different headline 2'
        
        sleep(500)
            .then(findId('add-headline-text').sendKeys(newHeadline))
            .then(findId('add-headline-button').click())
            .then(sleep(500))
            .then(() => {
                const displayEl = findId('headline-display')
                return displayEl
            })
            .then((element) => {
                return element.getText()
            })
            .then((text) => {
                expect(text.indexOf(newHeadline)).to.not.eql(-1)
            })
            .then(done)
    })
    */

    it('should display correct # of followed users', (done) => {
        sleep(500)
            .then(() => {
                const allStatusesPromise = findAllById('friendStatus')
                return allStatusesPromise
            })
            .then((statusList) => {
                console.log("All stat 2", statusList)
                console.log("Found ", statusList.length, " items")
                followCount = statusList.length
                expect(statusList.length).to.be.above(0)
            })
            .then(sleep(500))
            .then(done)
    })
    
    it('should remove a followed user', (done) => {
        sleep(500)
            .then(() => {
                const allStatusesPromise = findAllById('friendStatus')
                return allStatusesPromise
            })
            .then((statusList) => {
                const aFollower = statusList[0]
                return aFollower
            })
            .then((aFollower) => {
                aFollower.findElement(By.id('removeButton')).click()
            })
            .then(sleep(500))
            .then(() => {
                const allStatusesPromiseAfter = findAllById('friendStatus')
                return allStatusesPromiseAfter
            })
            .then((statusList) => {
                console.log("All Statuses afterwards: ", statusList)
                console.log("Found ", statusList.length, " items")
                expect(statusList.length).to.eql(followCount - 1)
            })
            .then(done)
    })

    it('should add a followed user', (done) => {
        const followerName = 'Follower'
        sleep(500)
            .then(findId('add-follower-text').sendKeys(followerName))
            .then(findId('add-follower-submit').click())
            .then(sleep(500))
            .then(() => {
                const allStatusesPromiseAfter = findAllById('friendStatus')
                return allStatusesPromiseAfter
            })
            .then((statusList) => {
                console.log("All Statuses afterwards: ", statusList)
                console.log("Found ", statusList.length, " items")
                expect(statusList.length).to.eql(followCount)
            })
            .then(done)
    })
})
