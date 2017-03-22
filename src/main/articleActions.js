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

// TODO: Probably need to add image eventually, maybe error checking for users?  etc.
export const addNewArticle = (id, author, text) => {
    //TODO: POST articles/
    return {type: ActionTypes.ADD_ARTICLE, id: id, author: author, text: text}
}