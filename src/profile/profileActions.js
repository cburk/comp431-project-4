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
    if(displayName)
        updateObj["displayName"] = displayName
        // Don't think display needs validation checking
        
    
    // If email is not blank (i.e. they want to change it), and ill formed, error
    if(email){
        if(emailRE.exec(email) != email)
            return {type: Actions.ERROR, msg: "ERROR: Invalid email format: " + email}
        else
            updateObj["email"] = email
    }
    
    if(phone){
        if(phoneRE.exec(phone) != phone)
            return {type: Actions.ERROR, msg: "ERROR: Invalid phone format: " + phone}
        else
            updateObj["phone"] = phone
    }
    
    if(zipcode){
        if(zipcodeRE.exec(zipcode) != zipcode)
            return {type: Actions.ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode}
        else
            updateObj["zipcode"] = zipcode
    }
    
    console.log("Action created obj to udpate following fields: ", updateObj)

       
    return {type: ActionTypes.UPDATE_INFO, updates: updateObj}
    //return {type: ActionTypes.UPDATE_INFO, displayName: displayName, email: email, phone: phone, dob: dob, zipcode: zipcode}
}