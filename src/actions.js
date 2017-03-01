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

const uNameRE = /[A-Za-z][A-Za-z1-9]+/
const emailRE = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
const phoneRE = /\d\d\d[\-]\d\d\d[\-]\d\d\d\d/
const zipcodeRE = /[0-9]{5}/
      
export const registerUser = ( uName,
    pWord,
    email,
    phone,
    dob,
    zipcode
) => {
    
    if(uNameRE.exec(uName) != uName)
        return {type: ERROR, msg: "ERROR: Invalid username format: " + uName}
    
    if(emailRE.exec(email) != email)
        return {type: ERROR, msg: "ERROR: Invalid email format: " + email}
    
    if(phoneRE.exec(phone) != phone)
        return {type: ERROR, msg: "ERROR: Invalid phone format: " + phone}
            
    //Enure users are 18+ -->    
    let over18 = false
    let curTime = Date.now();
    let curDate = new Date(curTime);
    let cutoffYear = curDate.getFullYear() - 18;
    let cutoffTime = new Date(curDate.setFullYear(cutoffYear));
    let birthTime = new Date(Date.parse(dob));
    over18 = (cutoffTime.getTime() > birthTime.getTime())
    if(!over18){
        return { type: ERROR, msg: 'Error: must be over 18' }
    }
    
    if(zipcodeRE.exec(zipcode) != zipcode)
        return {type: ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode}    
    
    // TODO Later: something w/ other fields  
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