import * as Actions from '../actions'

export const ActionTypes = {
    SET_USER_INFO: 'SET_USER_INFO',
    UPDATE_INFO: 'UPDATE_INFO',
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
export const setUserInfoFromServer = (name, password) => (dispatch) => {
    let userInfo = {name, password}
    //Immediately set name, password
    dispatch({type: ActionTypes.SET_USER_INFO, info: {name, password}})
    
    const dataPoints = ['email', 'dob', 'zipcode']
    //Get user's email, dob, zipcode
    dataPoints.map((dType) => {
        Actions.resource('GET', dType)
            .then((r)=>{
            console.log(dType, "?,", r)
            if(r.name == name){
                console.log("Email, dob, etc? ", r[dType.valueOf()])
                const thisDispatch = {type: ActionTypes.SET_USER_INFO, info: {}}
                thisDispatch.info[dType] = r[dType]
                dispatch(thisDispatch)
            }
        })
    })
    //Process for avatar slightly different
    Actions.resource('GET', 'avatar')
        .then((r)=>{
        console.log("avatar", "?,", r)
        if(r.avatars.length == 1)
            dispatch({type: ActionTypes.SET_USER_INFO, info: r.avatars[0]})
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
       
    return {type: ActionTypes.UPDATE_INFO, updates: updateObj}
}