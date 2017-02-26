export const UPDATE_TEXT = 'UPDATE_TEXT'
export const ERROR = 'ERROR'
export const MAIN_PAGE = 'MAIN_PAGE'
export const PROFILE_PAGE = 'PROFILE_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'
// TODO: In acitontypes?
export const LOGIN = 'LOGIN'

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
    // TODO Later: Do something w/ other fields?
    
    return loginUser(uName)
}

export const loginUser = (uName) => {
    console.log("did we make it to actions?")
    return { type: LOGIN, uName: uName }
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