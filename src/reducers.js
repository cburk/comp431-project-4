import * as Actions from './actions'

const Reducer = (state = {
    location: Actions.LANDING_PAGE,
    text: 'State originates in the reducer',
    message: '',
    uName: ''
}, action) => {
    switch (action.type) {
        case Actions.UPDATE_LOCATION:
            return {...state, location: action.location}
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, message: action.message }
        case Actions.LOGIN:
            return { ...state, uName: action.uName, location: Actions.MAIN_PAGE }
        case Actions.ActionTypes.NAVIGATE_TO:
            console.log("REEEEEEE")
            return { ...state, location: action.page }
        case Actions.ActionTypes.LOGOUT:
            return { ...state, location: Actions.LANDING_PAGE, uName: '' }
            
        default:
            return state
    }
}

export default Reducer