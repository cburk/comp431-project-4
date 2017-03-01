import * as Actions from '../actions'

export const ActionTypes = {
    SEARCH: 'SEARCH'
    //UPDATE_INFO: 'UPDATE_INFO'
}

export const searchArticles = (query) => {
    console.log("Article action search query")
    return {type: ActionTypes.SEARCH, searchString: query}
}

//Actions.ERROR

//export const updateUserInfo = (displayName, email, phone, zipcode) => {
//  return(type: memes, field: stuff)
//}