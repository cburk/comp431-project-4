import * as Actions from '../actions'

export const ActionTypes = {
    SET_USER_INFO: 'SET_USER_INFO',
    UPDATE_HEADLINE: 'UPDATE_HEADLINE'
}

const emailRE = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
const phoneRE = /\d\d\d[\-]\d\d\d[\-]\d\d\d\d/
const zipcodeRE = /[0-9]{5}/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/

export const updateHeadline = (headline) => (dispatch) => {
    Actions.resource('PUT', 'headline', {headline})
        .then((r)=>{
            if(r.headline == headline){
            dispatch({type: ActionTypes.UPDATE_HEADLINE, headline})
        }
    })
}

export const setAvatar = (imgUploadEvent) => (dispatch) => {
    const fileBytes = imgUploadEvent.target.files[0]    
    const fd = new FormData()
    fd.append('image', fileBytes)
    
    console.log("Form data created")
    const url = 'https://webdev-dummy.herokuapp.com/avatar'
    fetch(url, {
        method: 'PUT',
        credentials: 'include',
        body: fd
    }).then((e)=>{
        console.log("Put to avatar, response: ", e)
        return e.json()
    }).then((jsonResponse) => {
        console.log(jsonResponse)
        setAvatarInfoFromServer()(dispatch)
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
    setHeadlineInfoFromServer(name)(dispatch)
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

export const setHeadlineInfoFromServer = (name) => (dispatch) => {
    Actions.resource('GET', 'headlines')
        .then((r)=>{
        console.log("headline", "?,", r)
        if(r.headlines.length == 1)
            dispatch({type: ActionTypes.SET_USER_INFO, info: r.headlines[0]})
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



export const updateUserInfo = (displayName, email, phone, zipcode, password) => (dispatch) =>{
    let updateObj = {}
    // No extra validation for displayName, don't think there are rules governing
    // In the future, might want to do something w/ display name, I don't see how it factors in now
    //if(displayName)
        //setInfoOnServer()
        //updateObj["displayName"] = displayName
    console.log("update user info called")
    
    // If email is not blank (i.e. they want to change it), and ill formed, error
    if(email){
        if(emailRE.exec(email) != email)
            return {type: Actions.ERROR, msg: "ERROR: Invalid email format: " + email}
        else
            setInfoOnServer('email', email)(dispatch)
            //updateObj["email"] = email
    }
    
    // Validate phone number, if user tried to change it
    if(phone){
        if(phoneRE.exec(phone) != phone)
            return {type: Actions.ERROR, msg: "ERROR: Invalid phone format: " + phone}
        else{
            //Special case, no part of server seems to have phone info, so just send a dispatch message
            dispatch({type: ActionTypes.SET_USER_INFO, info: {phone: phone}})
        }
                
            //updateObj["phone"] = phone
    }

    // Validate zipcode, if user tried to change it
    if(zipcode){
        console.log("Found zipcode entered")
        if(zipcodeRE.exec(zipcode) != zipcode)
            return {type: Actions.ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode}
        else{
            console.log("Tryna set")
            setInfoOnServer('zipcode', zipcode)(dispatch)
        }
    }

    if(password){
        if(pWordRE.exec(password) != password)
            return {type: Actions.ERROR, msg: "ERROR: Invalid password format: " + password}
        else
            setInfoOnServer('password', password)(dispatch)
    }
}


export const setInfoOnServer = (type, info) => (dispatch) => {
    //Process for avatar slightly different
    const jsonPayload = {[type]: info}
    console.log("Sending json payload: ", jsonPayload)
    Actions.resource('PUT', type, jsonPayload)
        .then((r)=>{
        console.log("response from server", "?,", r)
        dispatch({type: ActionTypes.SET_USER_INFO, info: jsonPayload})
    })
}
