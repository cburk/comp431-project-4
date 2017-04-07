import { expect } from 'chai'
import { findAllByClass, go, sleep, findId, By, pageSource } from './selenium'
import common from './common'

const artText = 'newest article'

describe('Test Articles', () => {
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

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
    /*
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
    */
    /*
    it('should successfully search for an article', (done) => {
        let relevantArticle
        const query = 'Only One Article Like This'
        sleep(500)
            .then(() => {findId('search-bar').sendKeys(query)})
            .then(() => {findId('search-button').click()})
            .then(sleep(500))
            .then(() => {return findAllByClass('article')})
            .then(list => {
                expect(list.length).to.eql(1)
                //console.log(list)
                relevantArticle = list[0]
                console.log("Got the full list")
                console.log("Relevant article, attributes? ", relevantArticle)
                return relevantArticle.getAttribute('data-author')
            })
            .then((authorAttr) => {
                console.log('found author: ', authorAttr)
                expect(authorAttr).to.eql(common.creds.username)
            })
            .then(done)
    })
    */
})
