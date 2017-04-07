import * as Actions from '../actions'

export const ActionTypes = {
    UPDATE_ARTICLES: 'UPDATE_ARTICLES',
    SEARCH: 'SEARCH',
    ADD_ARTICLE: 'ADD_ARTICLE'
}

// USE: W/o any id, just get all articles and filter using search RE's
export const getArticles = (idOrUsername) => (dispatch) => {
    Actions.resource('GET', 'articles/' + (idOrUsername ? idOrUsername : ''))
    .then((r)=>{
            dispatch({type: ActionTypes.UPDATE_ARTICLES, articles: r.articles})
        }
    )
}

export const articleEdit = (articleID, text) => (dispatch) => {
    articlePUT(articleID, text)(dispatch)
}

export const addComment = (articleID, text) => (dispatch) => {
    articlePUT(articleID, text, -1)(dispatch)
}

export const commentEdit = (commentID, articleID, text) => (dispatch) => {
    articlePUT(articleID, text, commentID)(dispatch)
}


export const articlePUT = (articleID, text, commentId) => (dispatch) => {
    const payload = commentId ? {text, commentId} : {text}
    Actions.resource('PUT', 'articles/' + articleID, payload)
    .then((r)=>{
        if(r.errorMsg)
            dispatch({type: Actions.ERROR, msg: r.errorMsg})
        else{
            //If the request was successful, need to update the articles list for new comment case
            getArticles()(dispatch)
        }
    })    
}


export const searchArticles = (query) => {
    return {type: ActionTypes.SEARCH, searchString: query}
}

// TODO: Probably need to add image eventually, maybe error checking for users?  etc.
export const addNewArticle = (id, author, text, imageBytes) => (dispatch) => {
    //Two different formats depending on whether there's an image or not
    if(imageBytes){
        const fd = new FormData()
        fd.append('image', imageBytes)
        fd.append('text', text)
        const url = 'https://webdev-dummy.herokuapp.com/article'
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: fd
        }).then((e)=>{
            return e.json()
        }).then((jsonResponse) => {
            getArticles()(dispatch)
        })
    }else{
        Actions.resource('POST', 'article', {text})
        .then((r)=>{
                return r.articles[0]
            }).then((articleReturned) => {
                getArticles()(dispatch)
            })
    }
}