import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

// TODO: Ask why this instead of import?
// I think importing doesn't work b/c authActions imports resource -> fetch?
let Action, actions, articleActions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('../actions').default
  actions = require('../actions')
  
  articleActions = require('../main/articleActions')
  console.log("Here?")
  //import * as authActions from './authActions'
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

it('should fetch articles (mocked request)', (done) => {
    console.log("Should get article")
  // the result from the mocked AJAX call
  const articles = {articles: [{_id: 123, text: 'stuff', date: '123', img: null, comments: [], author: 'steve'}]}

  console.log(actions)
  
  mock(`${actions.url}/articles/steve`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: articles
  })

  console.log("After mocking")
  
  articleActions.getArticles('steve')(
    action => {
        console.log("Finished call to article actions test")
        console.log(action)
	  expect(action.articles).to.eql(articles.articles)
	  done()
  	})

})

it('should update the search keyword', (done) => {
    const query = "qry"
    expect(articleActions.searchArticles(query).type).to.eql(articleActions.ActionTypes.SEARCH)
    expect(articleActions.searchArticles(query).searchString).to.eql(query) 
    done()
})

