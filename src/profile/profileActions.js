import * as Actions from '../actions'

export const ActionTypes = {
    SET_USER_INFO: 'SET_USER_INFO',
    UPDATE_HEADLINE: 'UPDATE_HEADLINE'
}

const emailRE = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
const phoneRE = /\d\d\d[\-]\d\d\d[\-]\d\d\d\d/
const zipcodeRE = /[0-9]{5}/

export const updateHeadline = (headline) => (dispatch) => {
    Actions.resource('PUT', 'headline', {headline})
        .then((r)=>{
            if(r.headline == headline){
            dispatch({type: ActionTypes.UPDATE_HEADLINE, headline})
        }
    })
}


//To be called immediately after logged in
export const setUserInfoFromServer = (name) => (dispatch) => {
    console.log("\n\nWe're in setuser info\n\n")
    console.log("\n\nWe're in setuser info\n\n")
    
    // Note: Didn't want to do it this way, but after speaking w/ TA only way we could find to test this
    setEmailInfoFromServer(name)(dispatch)
    setDobInfoFromServer(name)(dispatch)
    setZipcodeInfoFromServer(name)(dispatch)
    setAvatarInfoFromServer(name)(dispatch)
}

export const setEmailInfoFromServer = (name) => (dispatch) => {
    Actions.resource('GET', 'email')
        .then((r)=>{
        console.log('email', "?,", r)
        if(r.username == name){
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {email: r.email}}
            dispatch(thisDispatch)
        }
    })
}

export const setAvatarInfoFromServer = (name) => (dispatch) => {
    //Process for avatar slightly different
    Actions.resource('GET', 'avatars')
        .then((r)=>{
        console.log("avatar", "?,", r)
        if(r.avatars.length == 1)
            dispatch({type: ActionTypes.SET_USER_INFO, info: r.avatars[0]})
    })
}

export const setDobInfoFromServer = (name) => (dispatch) => {
    Actions.resource('GET', 'dob')
        .then((r)=>{
        console.log('dob', "?,", r)
        console.log('dob path, name? ', name)
        if(r.username == name){
            console.log("Dob path, got dispatch? ")
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {dob: r.dob}}
            console.log("Dob path, got dispatch? ", thisDispatch)
            dispatch(thisDispatch)
        }
    })
}

export const setZipcodeInfoFromServer = (name) => (dispatch) => {
    Actions.resource('GET', 'zipcode')
        .then((r)=>{
        console.log('zipcode', "?,", r)
        if(r.username == name){
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {zipcode: r.zipcode}}
            dispatch(thisDispatch)
        }
    })
}



export const updateUserInfo = (displayName, email, phone, zipcode) => {
    let updateObj = {}
    // No extra validation for displayName, don't think there are rules governing
    if(displayName)
        updateObj["displayName"] = displayName
    
    // If email is not blank (i.e. they want to change it), and ill formed, error
    if(email){
        if(emailRE.exec(email) != email)
            return {type: Actions.ERROR, msg: "ERROR: Invalid email format: " + email}
        else
            updateObj["email"] = email
    }
    
    // Validate phone number, if user tried to change it
    if(phone){
        if(phoneRE.exec(phone) != phone)
            return {type: Actions.ERROR, msg: "ERROR: Invalid phone format: " + phone}
        else
            updateObj["phone"] = phone
    }

    // Validate zipcode, if user tried to change it
    if(zipcode){
        if(zipcodeRE.exec(zipcode) != zipcode)
            return {type: Actions.ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode}
        else
            updateObj["zipcode"] = zipcode
    }
      
    //TODO: use SET_USER_INFO instead, resource/fetches and whatnot
    //return {type: ActionTypes.UPDATE_INFO, updates: updateObj}
}