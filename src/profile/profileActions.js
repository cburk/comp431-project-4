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
    
    const url = Actions.url + '/avatar'
    fetch(url, {
        method: 'PUT',
        credentials: 'include',
        body: fd
    }).then((e)=>{
        return e.json()
    }).then((jsonResponse) => {
        setAvatarInfoFromServer()(dispatch)
    })
}


//To be called immediately after logged in
export const setUserInfoFromServer = () => (dispatch) => {
    // Note: Didn't want to do it this way, but after speaking w/ TA only way we could find to test this
    setNameInfoFromServer()(dispatch)
    setEmailInfoFromServer(name)(dispatch)
    setDobInfoFromServer(name)(dispatch)
    setZipcodeInfoFromServer(name)(dispatch)
    setAvatarInfoFromServer(name)(dispatch)
    setHeadlineInfoFromServer(name)(dispatch)
}

export const setNameInfoFromServer = () => (dispatch) => {
    //Workaround, returns the name of the logged in user in the email response
    Actions.resource('GET', 'email')
        .then((r)=>{
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {name: r.username}}
            dispatch(thisDispatch)
    })
}

export const setEmailInfoFromServer = () => (dispatch) => {
    Actions.resource('GET', 'email')
        .then((r)=>{
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {email: r.email}}
            dispatch(thisDispatch)
    })
}

export const setHeadlineInfoFromServer = () => (dispatch) => {
    Actions.resource('GET', 'headlines')
        .then((r)=>{
        console.log("Got headlines from server, r: ", r)
        if(r.headlines.length == 1)
            dispatch({type: ActionTypes.SET_USER_INFO, info: r.headlines[0]})
    })
}

export const setAvatarInfoFromServer = () => (dispatch) => {
    console.log("Call to get avatar stuff")
    //Process for avatar slightly different
    Actions.resource('GET', 'avatars')
        .then((r)=>{
        console.log("Got avatars from server, r: ", r)
        if(r.avatars.length == 1)
            dispatch({type: ActionTypes.SET_USER_INFO, info: r.avatars[0]})
    })
}

export const setDobInfoFromServer = () => (dispatch) => {
    Actions.resource('GET', 'dob')
        .then((r)=>{
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {dob: r.dob}}
            dispatch(thisDispatch)
    })
}

export const setZipcodeInfoFromServer = () => (dispatch) => {
    Actions.resource('GET', 'zipcode')
        .then((r)=>{
            const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {zipcode: r.zipcode}}
            dispatch(thisDispatch)
    })
}



export const updateUserInfo = (displayName, email, phone, zipcode, password) => (dispatch) =>{
    let updateObj = {}
    // No extra validation for displayName, don't think there are rules governing
    // In the future, might want to do something w/ display name, I don't see how it factors in now
    //if(displayName)
        //setInfoOnServer()
        //updateObj["displayName"] = displayName
    
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
        if(zipcodeRE.exec(zipcode) != zipcode)
            return {type: Actions.ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode}
        else{
            setInfoOnServer('zipcode', zipcode)(dispatch)
        }
    }

    if(password){
        if(pWordRE.exec(password) != password)
            dispatch({type: Actions.ERROR, msg: "ERROR: Invalid password format: " + password})
        else
            setInfoOnServer('password', password)(dispatch)
            dispatch({type: Actions.UPDATE_TEXT, text: "Password Updated"})
    }
}


export const setInfoOnServer = (type, info) => (dispatch) => {
    //Process for avatar slightly different
    const jsonPayload = {[type]: info}
    Actions.resource('PUT', type, jsonPayload)
        .then((r)=>{
        dispatch({type: ActionTypes.SET_USER_INFO, info: jsonPayload})
    })
}
