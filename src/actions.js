export const UPDATE_TEXT = 'UPDATE_TEXT'
export const ERROR = 'ERROR'
export const MAIN_PAGE = 'MAIN_PAGE'
export const PROFILE_PAGE = 'PROFILE_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'
// TODO: In acitontypes?
export const LOGIN = 'LOGIN'

export const fullPagesList = [{pageType: PROFILE_PAGE, description: 'Profile'}, {pageType: LANDING_PAGE, description: 'Logout'}, {pageType: MAIN_PAGE, description: 'Main'}]

export const ActionTypes = {
    UPDATE_TEXT: 'UPDATE_TEXT', 
    NAVIGATE_TO: 'NAVIGATE_TO',
    LOGOUT: 'LOGOUT'
}

export const registerUser = ( uName,
    pWord,
    displName,
    email,
    phone,
    dob,
    zip
) => {
    // TODO by wednesday: Different register function, not just login?  Separate functions in practice,
    // also want new dob, zip, etc. for this assignment
    // TODO Later: Do something w/ other fields?
    
    return loginUser(uName)
}

export const loginUser = (Uname) => {
    console.log("did we make it to actions?")
    console.log("action found name,", Uname)
    //curUser: {name: '', email: '', phone: '', dob: '', zipcode: ''},
    console.log
    return { type: LOGIN, name: Uname }
}

export const updateText = (text) => {
    if (text.length > 5) {
        return { type: UPDATE_TEXT, text }
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}

export const navMain = () => {
    console.log("Sending page: Main page")
    return { type: ActionTypes.NAVIGATE_TO, page: MAIN_PAGE }
}

export const navProfile = () => {
    return { type: ActionTypes.NAVIGATE_TO, page: PROFILE_PAGE }
}

export const logout = () => {
    return { type: ActionTypes.LOGOUT }
}

export const navigateTo = (pageType) => {
    console.log("Asked to navigate to ", pageType)
    switch(pageType){
        case MAIN_PAGE:
            return navMain()
        case PROFILE_PAGE:
            return navProfile()
        default:
            return logout()
    }
}