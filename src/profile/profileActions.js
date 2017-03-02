import * as Actions from '../actions'

export const ActionTypes = {
    UPDATE_INFO: 'UPDATE_INFO'
}
//Actions.ERROR

const emailRE = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/
const phoneRE = /\d\d\d[\-]\d\d\d[\-]\d\d\d\d/
const zipcodeRE = /[0-9]{5}/

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