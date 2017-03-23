import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

// TODO: Ask why this instead of import?
// I think importing doesn't work b/c authActions imports resource -> fetch?
let Action, actions, authActions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../actions').default
  actions = require('../actions')
  
  authActions = require('./authActions')
  //import * as authActions from './authActions'
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

it('should login the user', (done) => {

  // the result from the mocked AJAX call
  const username = 'asd1'
  const result = 'success'

  mock(`${actions.url}/login`, {
  	method: 'POST',
  	headers: {'Content-Type':'application/json'},
  	json: { username, result}
  })
    
  authActions.loginUser(username, 'ok-pass-word', true)(
  	//fn => fn(action => {
    action => {
        console.log("Action returned: ", action)
	  expect(action.name).to.eql(username) 
	  done()
  	})

})


it('should not log in an invalid user', (done) => {
  const errorMsg = "404: errorMsg"
  const somePage = 'somePage'
  mock(`${actions.url}/login`, {
  	method: 'POST',
    status: 404,
  	headers: {'Content-Type':'application/json'},
  	statusText: errorMsg
  })

  authActions.loginUser('incorrectUname', 'aaa-aaa-aaa')(
    action => {
	  expect(action.type).to.eql(actions.ERROR)
  	})

  authActions.loginUser('asd1', 'wrong-password')(
    action => {
	  expect(action.type).to.eql(actions.ERROR)
  	})      
  
  authActions.loginUser('nex1', 'non-existent-combo')(
      action => {
          expect(action.msg).to.eql(errorMsg)
          done()
      }
  )
})


it('should logout the user', (done) => {

  // the result from the mocked AJAX call
  const username = 'logoutTest'
  const result = 'OK'

  mock(`${actions.url}/logout`, {
  	method: 'PUT',
  	headers: {'Content-Type':'text/plain'},
  	text: result
  })

  // Unfortunately, because of how I designed navigation, stored in action
  actions.logoutUser()(
    action => {
	  expect(action).to.eql({ 
	  	type: actions.LOGOUT
	  })
	  done()
  	})

})


