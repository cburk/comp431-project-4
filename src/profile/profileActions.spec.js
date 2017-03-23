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


it("should fetch the user's proile information", (done) => {
  // the result from the mocked AJAX calls
  const username = 'username'
  const password = 'whatever'
  const email = 'loginTest'
  const zipcode = 'success'
  const dob = 'asdf'
  const avatar = 'whatever'
  const headline = 'h'

  //DIdn't want to do things this way, but all TA and I could come up w/
  //Testing complex  actions asynchronously wasn't working, so just facotring out all subcalls
  //and seeing if they perform as wanted
  mock(`${actions.url}/email`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { email, name }
  })
  
  profileActions.setEmailInfoFromServer(name)(
    action => {
        expect(action.email).to.eql(email)
        expect(action.type).to.eql(profileActions.ActionTypes.SET_USER_INFO)
    })

  
  mock(`${actions.url}/dob`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { dob, name }
  })
  
  profileActions.setDobInfoFromServer(name)(
    action => {
        expect(action.dob).to.eql(dob)
        expect(action.type).to.eql(profileActions.ActionTypes.SET_USER_INFO)
    })
  
  mock(`${actions.url}/zipcode`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { zipcode, name }
  })
  
  profileActions.setZipcodeInfoFromServer(name)(
    action => {
        expect(action.zipcode).to.eql(zipcode)
        expect(action.type).to.eql(profileActions.ActionTypes.SET_USER_INFO)
    })

  mock(`${actions.url}/avatars`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { avatars: [{avatar, name}]}
  })
  
  profileActions.setAvatarInfoFromServer(name)(
    action => {
        expect(action.avatar).to.eql(avatar)
        expect(action.type).to.eql(profileActions.ActionTypes.SET_USER_INFO)
    })  

  mock(`${actions.url}/avatars`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: { avatars: [{avatar, name}]}
  })
  
  profileActions.setHeadlineInfoFromServer(name)(
    action => {
        expect(action.headline).to.eql(headline)
        expect(action.type).to.eql(profileActions.ActionTypes.SET_USER_INFO)
    })  

  
  done()
  
})


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
