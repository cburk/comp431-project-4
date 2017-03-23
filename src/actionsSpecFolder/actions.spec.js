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

it('resource should be a resource', (done) => {
    console.log("Inside resource resource")
  const expectedResult = "expectedResult"
  const somePage = 'somePage'
  mock(`${actions.url}/${somePage}`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { expectedResult }
  })
  
  //Ensure resource actually requests the given page
  actions.resource('GET',somePage,{})
    .then((r) => {
      expect(r).to.eql({expectedResult})
  }).then(done)
  .catch(done)
})

it('resource should be postable', (done) => {
  const expectedResult = "expectedResult"
  const somePage = 'somePage'
  mock(`${actions.url}/${somePage}`, {
  	method: 'POST',
  	headers: {'Content-Type':'application/json'},
  	json: { expectedResult }
  })
  
  //Ensure resource actually requests the given page
  actions.resource('POST',somePage,{})
    .then((r) => {
      expect(r).to.eql({expectedResult})
  }).then(done)
  .catch(done)
})


it('resource should give me the http error', (done) => {
    console.log("Inside error resource test")
  const errorMsg = "404: errorMsg"
  const somePage = 'somePage'
  mock(`${actions.url}/${somePage}`, {
  	method: 'GET',
    status: 404,
  	headers: {'Content-Type':'application/json'},
  	statusText: errorMsg
  })
  
  actions.resource('GET',somePage,{})
    .then((r) => {
        console.log("R is, ", r)
        expect(r.errorMsg).to.eql(errorMsg)
    }).then(done)
    .catch(done)
})

it('should update error message (for displaying error mesage to user)', (done) => {
    const eMsg = "Wrong!"
    expect(actions.updateError(eMsg).msg).to.eql(eMsg)
    expect(actions.updateError(eMsg).type).to.eql(actions.ERROR)
    done()
})
it('should update success message (for displaying success message to user)', (done) => {
    const text = "Sucess!"
    expect(actions.updateText(text).text).to.eql(text)
    expect(actions.updateText(text).type).to.eql(actions.UPDATE_TEXT)
    done()
})
it('should navigate (to profile, main, or landing)', (done) => {
    const pages = [actions.MAIN_PAGE, actions.LANDING_PAGE, actions.PROFILE_PAGE]
    pages.map((page) => {
        actions.navigateTo(page)((dis)=>{
            expect(dis.page).to.eql(page)
            expect(dis.type).to.eql(actions.ActionTypes.NAVIGATE_TO)
        })
    })
    done()
})

//TODO: This needs to go in reducers file
it('should update error message (for displaying error mesage to user)', (done) => {
    const origState = {errorMsg: 'All good here'}
    const desiredError = "Error!"
    const newState = Reducer(origState, {type: actions.ERROR, msg: desiredError})
    console.log(newState)
    expect(newState.errorMsg).to.eql(desiredError)
    done()
})

//Question: Is this asking for what happens w/ an initialize command?  Or what the default state is? 
//Think this is ok
/*
it('should initialize state', (done) => {
    const desiredError = "Error!"
    const newState = Reducer(undefined, {type: actions.ERROR, msg: desiredError})
    console.log(newState)
    console.log("Just finished default test")
    expect(newState.errorMsg).to.eql(desiredError)

})
*/
