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
})


afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

it('should fetch articles (mocked request)', (done) => {
  // the result from the mocked AJAX call
  const articles = {articles: [{_id: 123, text: 'stuff', date: '123', img: null, comments: [], author: 'steve'}]}
  
  mock(`${actions.url}/articles/steve`, {
  	method: 'GET',
  	headers: {'Content-Type':'application/json'},
  	json: articles
  })
  
  articleActions.getArticles('steve')(
    action => {
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

it('should dispatch actions to create a new article', (done) => {
    const newArticle = "this is new text"
    const articlesReturned = {articles: [{_id: 123, text: 'stuff', date: '123', author: 'steve'}]}
    mock(`${actions.url}/article`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: articlesReturned
    })
    
    articleActions.addNewArticle('whatever')(action => {
	  expect(action.type).to.eql(articleActions.ActionTypes.ADD_ARTICLE)
	  expect(action.id).to.eql(articlesReturned.articles[0]._id)
	  expect(action.author).to.eql(articlesReturned.articles[0].author)
	  expect(action.text).to.eql(articlesReturned.articles[0].text)
      
	  done()
  	})
    
    
})

//TODO: Idk what this means
it('should render articles', (done) => {
    
    done()
})

