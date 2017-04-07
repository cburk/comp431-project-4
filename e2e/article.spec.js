import { expect } from 'chai'
import { findAllByClass, go, sleep, findId, By, pageSource } from './selenium'
import common from './common'

const artText = 'newest article'

describe('Test Articles', () => {
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    /*
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
                return inner
            })
            .then((inner) => {
                return inner.getText()
            }).then((text) => {
                expect(text).to.eql(artText)
            })
            .then(done)
    })
    */
    
    it('should edit an article and validate the changes appear', (done) => {
        let articleFull
        const newContent = 'new content'
        sleep(500)
            .then(() => {return findAllByClass('article')})
            .then(list => {
                //console.log(list)
                articleFull = list[0]
                console.log("Got the full list")
                articleFull.findElement(By.name('article text')).sendKeys(newContent)
            })
            .then(sleep(500))
            .then(() => {
                //Find and press the edit button
                return articleFull.findElement(By.id('art-edit'))
            })
            .then((submitButton) => {
                submitButton.click()
            })
            .then(() => {
                //Verify the text has been edited
                return articleFull.findElement(By.name('article text')).getText()
            })
            .then((text) => {
                expect(text.indexOf(newContent)).to.not.eql(-1)
            })
            .then(done)
    })

})
