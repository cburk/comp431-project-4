import * as Actions from './actions'
import * as AuthActions from './auth/authActions'
import * as ProfileActions from './profile/profileActions'
import * as ArticleActions from './main/articleActions'
import * as FollowingListActions from './main/followingListActions'

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
    loggedInWith: AuthActions.LOGGED_IN_WITH.OAUTH,
    curUser: {name: '', email: '', phone: '', dob: '', zipcode: '', avatar: '', headline: '', password: '', headline: ''},
    tempFriendStatusesState: tempFriendStatuses,
    navPagesList: [],
    articlesList: fullArticlesList,
    nextArticleID: fullArticlesList.length + 1,
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
            tempFriendStatuses = state.tempFriendStatusesState
            action.list.map((pair) => {
                tempFriendStatuses[pair.username].avatar = pair.avatar
            })
            return {...state, tempFriendStatusesState: tempFriendStatuses }
        case FollowingListActions.FOLLOW_PERSON_HEADLINES:
            tempFriendStatuses = state.tempFriendStatusesState
            action.list.map((pair) => {
                tempFriendStatuses[pair.username].headline = pair.headline
            })
            return {...state, tempFriendStatusesState: tempFriendStatuses }
        case FollowingListActions.FINALIZE_FOLLOW_LIST:
            tempStatusList = []
            Object.keys(state.tempFriendStatusesState).map((name) => {
                tempStatusList.push({person: name, status: state.tempFriendStatusesState[name].headline, image: state.tempFriendStatusesState[name].avatar})
            })
            return {...state, friendStatuses: tempStatusList}
        case ArticleActions.ActionTypes.UPDATE_ARTICLES:
            // Update base list to be this user's articles
            return { ...state, articlesList: action.articles }
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, errorMsg: action.msg }
        case AuthActions.LOGIN:
            //Only dispatched by username login
            return { ...state, location: Actions.MAIN_PAGE, loggedInWith: action.using, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}) }
        case AuthActions.CLEAR_ART_STATE:
            return { ...state, ...blankUserState() }
        case Actions.ActionTypes.NAVIGATE_TO:
            return { ...state, location: action.page, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != action.page}), ...resetState() }
        // TODO: Rn just resetting article list and error msg after navigation
        case Actions.LOGOUT:
            //Default: logged in with oauth unless password login explicit
            return { ...state, location: Actions.LANDING_PAGE, uName: '', ...resetState() }
        case ProfileActions.ActionTypes.SET_USER_INFO:
            return { ...state, curUser: {...state.curUser, ...action.info}}
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
export default Reducer