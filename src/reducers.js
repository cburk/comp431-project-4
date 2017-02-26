import * as Actions from './actions'

const Reducer = (state = {
    location: Actions.LANDING_PAGE,
    text: 'State originates in the reducer',
    message: '',
    uName: '',
    navPagesList: []
}, action) => {
    switch (action.type) {
        case Actions.UPDATE_LOCATION:
            return {...state, location: action.location}
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, message: action.message }
        case Actions.LOGIN:
            console.log("Logging in reducer")
            console.log(Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}))
            return { ...state, uName: action.uName, location: Actions.MAIN_PAGE, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != Actions.MAIN_PAGE}) }
        case Actions.ActionTypes.NAVIGATE_TO:
            return { ...state, location: action.page, navPagesList: Actions.fullPagesList.filter((page) => {return page.pageType != action.page}) }
        case Actions.ActionTypes.LOGOUT:
            return { ...state, location: Actions.LANDING_PAGE, uName: '' }
            
        default:
            return state
    }
}

export default Reducer