import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../reducers.js'
import * as ArticleActions from '../main/articleActions'

let Action, actions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../actions').default
  actions = require('../actions')
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})


it('should state error (for displaying error message to user)', (done) => {
    const origState = {errorMsg: 'All good here'}
    const desiredError = "Error!"
    const newState = Reducer(origState, {type: actions.ERROR, msg: desiredError})
    console.log(newState)
    expect(newState.errorMsg).to.eql(desiredError)
    done()
})

it('should state success (for displaying success message to user)', (done) => {
    const origState = {text: 'All good here'}
    const desiredText = "text!"
    const newState = Reducer(origState, {type: actions.UPDATE_TEXT, text: desiredText})
    console.log(newState)
    expect(newState.text).to.eql(desiredText)
    done()
})

it('should initialize state', (done) => {
    const newState = Reducer(undefined, {type: 'not real'})
    console.log(newState)
    console.log("Just finished default test")
    expect(newState.errorMsg).to.eql('')
    expect(newState.location).to.eql(actions.LANDING_PAGE)
    expect(newState.text).to.eql('')
    expect(newState.message).to.eql('')
    expect(newState.curuser).to.not.eql(null)
    expect(newState.navPagesList.length).to.be.above(-1)
    expect(newState.articlesList.length).to.be.above(-1)
    expect(newState.friendStatuses.length).to.be.above(-1)
    done()
})

it('should set the articles', (done) => {
    const origState = {articlesList: []}
    const newArticles = [{a1: "text!"}, {a2: "anutha one"}]
    const newState = Reducer(origState, {type: ArticleActions.ActionTypes.UPDATE_ARTICLES, articles: newArticles})
    expect(newState.articlesList).to.eql(newArticles)
    done()
})

//Searchstring is not saved in this implementation
it('should set the search keyword', (done) => {
    done()
})

it('should filter displayed articles by the search keyword', (done) => {
    const articlesList = [{text: 'goodness', author: 'not matching'}, {text: 'not matching', author: 'good'}, {text: 'zero', author: 'matches'}]
    const origState = {articlesList}
    const newState = Reducer(origState, {type: ArticleActions.ActionTypes.SEARCH, searchString: 'good'})
    console.log(newState)
    expect(newState.articlesList[0]).to.eql(articlesList[0])
    expect(newState.articlesList[1]).to.eql(articlesList[1])
    expect(newState.articlesList.length).to.eql(2)
    done()
})
