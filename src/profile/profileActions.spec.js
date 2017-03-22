import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let Action, actions, profileActions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../actions').default
  actions = require('../actions')
  
  profileActions = require('./profileActions')
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

/*
//TODO: Ask about this, because I think it doesn't work asynchronously
it("should fetch the user's proile information", (done) => {
  // the result from the mocked AJAX calls
  const name = 'username'
  const password = 'whatever'
  const email = 'loginTest'
  const zipcode = 'success'
  const dob = 'asdf'
  const avatar = 'whatever'

  mock(`${actions.url}/email`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { email, name }
  })
  mock(`${actions.url}/dob`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { dob, name }
  })
  mock(`${actions.url}/zipcode`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { zipcode, name }
  })
  mock(`${actions.url}/avatar`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { avatars: [{avatar, name}]}
  })

  //Note: Solution here based on Scott's piazza post   
  const infoToBeUpdated = ['avatar', 'zipcode', 'dob', 'email', 'avatar', 'name', 'password']
  const infoThatWas = []
  profileActions.setUserInfoFromServer(name, password)(
    action => {
        console.log("found ", action)
        console.log("SetUserInfo test response: ", action)
        infoThatWas.push(action.info)
        console.log("pushed")
  	})
  
  expect(infoThatWas.length).to.eql(5)

})
*/


it("should update headline", (done) => {
  // the result from the mocked AJAX calls
  const headline = 'this headline'
  
  mock(`${actions.url}/headline`, {
  	method: 'PUT',
  	headers: {'Content-Type':'application/json'},
  	json: { headline }
  })
  
  profileActions.updateHeadline(headline)(
    action => {
        expect(action.type).to.eql(profileActions.ActionTypes.UPDATE_HEADLINE)
        expect(action.headline).to.eql(headline)
        done()
  	})

})
