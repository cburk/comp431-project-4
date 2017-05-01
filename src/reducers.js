import * as Actions from './actions'
import * as AuthActions from './auth/authActions'
import * as ProfileActions from './profile/profileActions'
import * as ArticleActions from './main/articleActions'
import * as FollowingListActions from './main/followingListActions'

// Hard coded values
//const fullArticlesList = require('../data/ArticlesList.json')
//const userStatus = require('../data/UserStatus.json')
//const friendStatuses = require('../data/FriendStatusList.json')
const friendStatuses = []
// For use creating statuses objects, whcih are ultimately converted to statuses list when finished
let tempFriendStatuses = {}
let tempStatusList = []
let fullArticlesList = []

const resetState = () => {
    return {articlesList: fullArticlesList, errorMsg: ''}
}

const blankUserState = () => {
    return {articlesList: [], friendStatuses: []}
}

// Thought/TODO: Maybe sort navPagesList each time, so they come out looking the same?
// TOOD: Status should probably be part of curUser's state
const Reducer = (state = {
    errorMsg: '',
    location: Actions.LANDING_PAGE,
    text: '',
    message: '',
    //curUser: {name: '', displayName: 'No display name set', email: 'asdf@stuff.com', phone: '123-456-7891', dob: 'N/A', zipcode: '14253'},
    curUser: {name: '', email: '', phone: '', dob: '', zipcode: '', avatar: '', headline: '', password: '', headline: ''},
    //}
    //uName: '',
    tempFriendStatusesState: tempFriendStatuses,
    navPagesList: [],
    articlesList: fullArticlesList,
    nextArticleID: fullArticlesList.length + 1,
    // Now replaced w/ headline as curUser field
    //curUserStatus: userStatus,
    friendStatuses: friendStatuses
}, action) => {
    switch (action.type) {
        case FollowingListActions.FOLLOW_PERSON_LIST_RAW:
            tempFriendStatuses = {}
            action.list.map((name) => {
                tempFriendStatuses[name] = {}
            })
            return {...state, tempFriendStatusesState: tempFriendStatuses }
        case FollowingListActions.FOLLOW_PERSON_AVATARS:
            console.log("Follow person avatars, what do we have? ", action.list)
            tempFriendStatuses = state.tempFriendStatusesState
            action.list.map((pair) => {
                tempFriendStatuses[pair.username].avatar = pair.avatar
            })
            return {...state, tempFriendStatusesState: tempFriendStatuses }
        case FollowingListActions.FOLLOW_PERSON_HEADLINES:
            tempFriendStatuses = state.tempFriendStatusesState
            console.log("Made it to follow person headlines?", action)
            action.list.map((pair) => {
                tempFriendStatuses[pair.username].headline = pair.headline
            })
            return {...state, tempFriendStatusesState: tempFriendStatuses }
        case FollowingListActions.FINALIZE_FOLLOW_LIST:
            tempStatusList = []
            console.log("Finalized?")
            Object.keys(state.tempFriendStatusesState).map((name) => {
                tempStatusList.push({person: name, status: state.tempFriendStatusesState[name].headline, image: state.tempFriendStatusesState[name].avatar})
            })
            return {...state, friendStatuses: tempStatusList}
        case ArticleActions.ActionTypes.UPDATE_ARTICLES:
            // Update base list to be this user's articles
            fullArticlesList = action.articles.sort((time1, time2) => {console.log(Date.parse(time1.date));return Date.parse(time2.date) - Date.parse(time1.date)})
            return { ...state, articlesList: action.articles }
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, errorMsg: action.msg }
        case AuthActions.LOGIN:
            return { ...state, location: Actions.MAIN_PAGE, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}) }
        case AuthActions.CLEAR_ART_STATE:
            return { ...state, ...blankUserState() }
        case Actions.ActionTypes.NAVIGATE_TO:
            return { ...state, location: action.page, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != action.page}), ...resetState() }
        // TODO: Rn just resetting article list and error msg after navigation
        case Actions.LOGOUT:
            return { ...state, location: Actions.LANDING_PAGE, uName: '', ...resetState() }
        case ProfileActions.ActionTypes.SET_USER_INFO:
            return { ...state, curUser: {...state.curUser, ...action.info}}
        //case ProfileActions.ActionTypes.UPDATE_INFO:
        //    return { ...state, curUser: {...state.curUser, ...action.updates} }
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
            return { ...state, curUser: { ...state.curUser, headline: action.headline } }
        case FollowingListActions.REMOVE_FRIEND:
            return { ...state, friendStatuses: state.friendStatuses.filter((fStat)=>{return fStat.person != action.person}) }
        case FollowingListActions.ADD_FRIEND:
            //TODO Later: Just hardcoded other info like the image, status
            return { ...state, friendStatuses: [ ...state.friendStatuses, {person: action.person, status: 'HARDCODED NEW FRIEND STATUS', image: 'gdp_breakdown.gif'} ] }
        default:
            return state
    }
}

/* TODO: Thoughts: what all should reset error messages?
Successful form submission (update_text)
Navigation (Logout, navigate_to, Login)
*/

export default Reducer