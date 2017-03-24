import * as Actions from '../actions'

export const ActionTypes = {
    UPDATE_ARTICLES: 'UPDATE_ARTICLES',
    SEARCH: 'SEARCH',
    ADD_ARTICLE: 'ADD_ARTICLE'
}

// USE: W/o any id, just get all articles and filter using search RE's
export const getArticles = (idOrUsername) => (dispatch) => {
    console.log('articles/' + (idOrUsername ? idOrUsername : ''))
    Actions.resource('GET', 'articles/' + (idOrUsername ? idOrUsername : ''))
    .then((r)=>{
        console.log("inside  get articles request,", r)
            dispatch({type: ActionTypes.UPDATE_ARTICLES, articles: r.articles})
        }
    )
}

export const searchArticles = (query) => {
    return {type: ActionTypes.SEARCH, searchString: query}
}

// TODO: Probably need to add image eventually, maybe error checking for users?  etc.
export const addNewArticle = (id, author, text) => (dispatch) => {
    Actions.resource('POST', 'article', {text})
    .then((r)=>{
        console.log("inside post articles,", r)
            return r.articles[0]
        }).then((articleReturned) => {
            dispatch({type: ActionTypes.ADD_ARTICLE, id: articleReturned._id, author: articleReturned.author, text: articleReturned.text})
        })
}