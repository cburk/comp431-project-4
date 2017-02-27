import * as Actions from './actions'
import * as ProfileActions from './profile/profileActions'

const postInfo = require('../data/PostInfo.json')

console.log("Did we get user info?")
console.log(postInfo)
console.log(postInfo[0].name)

// Thought/TODO: Maybe sort navPagesList each time, so they come out looking the same?
const Reducer = (state = {
    errorMsg: '',
    location: Actions.LANDING_PAGE,
    text: 'State originates in the reducer',
    message: '',
    curUser: {name: '', displayName: 'No display name set', email: 'asdf@stuff.com', phone: '123-456-7891', dob: 'N/A', zipcode: '14253'},
    //uName: '',
    navPagesList: [],
    posts: postInfo
}, action) => {
    switch (action.type) {
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, errorMsg: action.msg }
        case Actions.LOGIN:
            console.log("Login reducer action")
            console.log(state.curUser)
            console.log(action)
            return { ...state, curUser: {...state.curUser, name: action.name}, location: Actions.MAIN_PAGE, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}) }
        // TODO: Fill this in so it actually works
        //case Actions.REGISTER:
        case Actions.ActionTypes.NAVIGATE_TO:
            return { ...state, location: action.page, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != action.page}) }
        case Actions.ActionTypes.LOGOUT:
            return { ...state, location: Actions.LANDING_PAGE, uName: '' }
        case ProfileActions.ActionTypes.UPDATE_INFO:
            return { ...state, curUser: {...state.curUser, ...action.updates}
//    curUser: {name: '', displayName: 'No display name set', email: 'asdf@stuff.com', phone: '123-456-7891', dob: 'N/A', zipcode: '14253'},
                   }
            
        default:
            return state
    }
}

/* TODO: Thoughts: what all should reset error messages?
Successful form submission (update_text)
Navigation (Logout, navigate_to, Login)
*/

export default Reducer