import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

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

/*
it('resource should give me the http error', (done) => {
    console.log("Inside error resource test")
  const expectedResult = "expectedResult"
  const somePage = 'somePage'
  mock(`${actions.url}/${somePage}`, {
  	method: 'GET',
    status: 404,
  	headers: {'Content-Type':'application/json'},
  	json: { expectedResult }
  })
  
  //Ensure resource actually requests the given page
  expect(() => {actions.resource('GET',somePage,{})}).to.throw(Error)
  done()
})
*/