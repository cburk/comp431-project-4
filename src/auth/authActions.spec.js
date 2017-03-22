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

    console.log("In login test")
    console.log(authActions)
    
  // the result from the mocked AJAX call
  const username = 'loginTest'
  const result = 'success'

  mock(`${actions.url}/login`, {
  	method: 'POST',
  	headers: {'Content-Type':'application/json'},
  	json: { username, result}
  })

  // review how complex actions work in Redux
  // updateHeadline returns a complex action
  // the complex action is called with dispatch as an argument
  // dispatch is then called with an action as an argument
  
  //Not sure if should be username
  /*
  console.log("Through mocking")

  console.log(authActions.loginUser('doesnotmatter'))
  
  console.log("basic test run")
  */
  console.log("Down here")
    
  authActions.loginUser('val1', 'ok-pass-word')(
  	//fn => fn(action => {
    action => {
      console.log('here?')
      console.log(action)
	  expect(action).to.eql({ 
	  	username, type: authActions.LOGIN
	  })
      //TODO: Assert view = main, how to access state?
	  done()
  	})

})

it('should not log in an invalid user', (done) => {

    console.log("In wrong login test")
    
  authActions.loginUser('incorrectUname', 'aaa-aaa-aaa')(
    action => {
	  expect(action.type).to.eql(actions.ERROR)
  	})

  authActions.loginUser('asd1', 'wrong-password')(
    action => {
	  expect(action.type).to.eql(actions.ERROR)
	  done()
  	})  
  
    //TODO: Mock a call that results in wrong authorization?
    
})

