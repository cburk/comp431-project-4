import * as Actions from '../actions'

export const ActionTypes = {
    SEARCH: 'SEARCH',
    ADD_ARTICLE: 'ADD_ARTICLE'
}

export const searchArticles = (query) => {
    return {type: ActionTypes.SEARCH, searchString: query}
}

// TODO: Probably need to add image eventually, maybe error checking for users?  etc.
export const addNewArticle = (id, author, text) => {
    return {type: ActionTypes.ADD_ARTICLE, id: id, author: author, text: text}
}