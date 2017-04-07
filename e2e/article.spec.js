import { expect } from 'chai'
import { go, sleep, findId, By, pageSource } from './selenium'
import common from './common'

const artText = 'newest article'

describe('Test Articles', () => {
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should Create a new article and validate the article appears in the feed', (done) => {
        sleep(500)
            .then(findId('add-art-text').sendKeys(artText))
            .then(findId('add-art-post').click())
            .then(() => {
                const outerArt = findId('article' + artText + common.creds.username)
                return outerArt
            })
            .then((outerArt) => {
                const inner = outerArt.findElement(By.name('article text'))
                const inner2 = outerArt.findElement(By.tagName('span'))
                return inner
            })
            .then((inner) => {
                console.log("Found inner? ", inner)
                console.log(inner.getText())
                return inner.getText()
            }).then((text) => {
                console.log("Down here ", text)
                expect(text).to.eql(artText)
            })
            .then(done)
    })
})
