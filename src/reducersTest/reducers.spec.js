import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../reducers.js'

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

