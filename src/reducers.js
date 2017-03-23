import * as Actions from './actions'
import * as AuthActions from './auth/authActions'
import * as ProfileActions from './profile/profileActions'
import * as ArticleActions from './main/articleActions'
import * as StatusActions from './main/statusActions'

// Hard coded values
//const fullArticlesList = require('../data/ArticlesList.json')
const userStatus = require('../data/UserStatus.json')
const friendStatuses = require('../data/FriendStatusList.json')
let fullArticlesList = []

const resetState = () => {
    return {articlesList: fullArticlesList, errorMsg: ''}
}

// Thought/TODO: Maybe sort navPagesList each time, so they come out looking the same?
// TOOD: Status should probably be part of curUser's state
const Reducer = (state = {
    errorMsg: '',
    location: Actions.LANDING_PAGE,
    text: 'State originates in the reducer',
    message: '',
    curUser: {name: '', displayName: 'No display name set', email: 'asdf@stuff.com', phone: '123-456-7891', dob: 'N/A', zipcode: '14253'},
    betterCurUser: {name: '', email: '', phone: '', dob: '', zipcode: '', avatar: '', headline: '', password: ''},
    //}
    //uName: '',
    navPagesList: [],
    articlesList: fullArticlesList,
    nextArticleID: fullArticlesList.length + 1,
    curUserStatus: userStatus,
    friendStatuses: friendStatuses
}, action) => {
    console.log("In reducer area")
    switch (action.type) {
        case ArticleActions.ActionTypes.UPDATE_ARTICLES:
            console.log("Reducer found articles: ", action)
            // Update base list to be this user's articles
            fullArticlesList = action.articles
            return { ...state, articlesList: action.articles }
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            console.log("Are we here?")
            console.log("What's the error look like? ", action)
            return { ...state, errorMsg: action.msg }
        case AuthActions.LOGIN:
            return { ...state, curUser: {...state.curUser, name: action.name}, location: Actions.MAIN_PAGE, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}) }
        // TODO: Fill this in so it actually works
        //case Actions.REGISTER:
        // TODO: Rn just resetting after navigation
        case Actions.ActionTypes.NAVIGATE_TO:
            return { ...state, location: action.page, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != action.page}), ...resetState() }
        // TODO: Rn just resetting article list and error msg after navigation
        case Actions.LOGOUT:
            return { ...state, location: Actions.LANDING_PAGE, uName: '', ...resetState() }
        case ProfileActions.ActionTypes.SET_USER_INFO:
            console.log("Action: ", action)
            console.log("Before set info: ", state)
            //console.log("After set info: ", { ...state, betterCurUser: {...state.betterCurUser, action.info}})
            return { ...state, betterCurUser: {...state.betterCurUser, ...action.info}}
        case ProfileActions.ActionTypes.UPDATE_INFO:
            return { ...state, curUser: {...state.curUser, ...action.updates} }
        case ArticleActions.ActionTypes.SEARCH:
            //TODO: Should it do similar search matching for author name, not just full match?
            return { ...state, articlesList: state.articlesList.filter((article) => {
                    return (action.searchString == article.author || article.text.search(action.searchString) != -1)
                   }) }
        case ArticleActions.ActionTypes.ADD_ARTICLE:
            let newArticles = [ {id: action.id, author: action.author, text: action.text, timestamp: Date.now()}, ...state.articlesList ].sort((time1, time2) => {return time2.timestamp - time1.timestamp})
            return { ...state, articlesList: newArticles, nextArticleID: action.id + 1 }
        case ProfileActions.ActionTypes.UPDATE_HEADLINE:
            //TODO: Maybe one day resolve the headline/status conflict
            return { ...state, curUserStatus: { ...userStatus, status: action.headline } }
        case StatusActions.ActionTypes.REMOVE_FRIEND:
            return { ...state, friendStatuses: state.friendStatuses.filter((fStat)=>{return fStat.person != action.person}) }
        case StatusActions.ActionTypes.ADD_FRIEND:
            //TODO Later: Just hardcoded other info like the image, status
            return { ...state, friendStatuses: [ ...state.friendStatuses, {person: action.person, status: 'HARDCODED NEW FRIEND STATUS', image: 'gdp_breakdown.gif'} ] }
        default:
            console.log("Fell through to default state")
            return state
    }
}

/* TODO: Thoughts: what all should reset error messages?
Successful form submission (update_text)
Navigation (Logout, navigate_to, Login)
*/

export default Reducer