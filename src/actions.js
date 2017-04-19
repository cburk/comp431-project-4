export const UPDATE_TEXT = 'UPDATE_TEXT'
export const ERROR = 'ERROR'
export const MAIN_PAGE = 'MAIN_PAGE'
export const PROFILE_PAGE = 'PROFILE_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'

export const LOGOUT = 'LOGOUT'

import fetch from 'isomorphic-fetch'

//export const url = 'https://webdev-dummy.herokuapp.com'
export const url = 'http://localhost:3000'
export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        //throw new Error(r.statusText)
        return({errorMsg: r.statusText, result: 'Fail'})
      }
    })
}

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
) => (dispatch) => {

    if(uNameRE.exec(uName) != uName){
        dispatch( {type: ERROR, msg: "ERROR: Invalid username format: " + uName} )
        return
    }
    if(emailRE.exec(email) != email){
        dispatch( {type: ERROR, msg: "ERROR: Invalid email format: " + email} )
        return
    }
    if(phoneRE.exec(phone) != phone){
        dispatch( {type: ERROR, msg: "ERROR: Invalid phone format: " + phone} )
        return
    }

    //Enure users are 18+ -->    
    let over18 = false
    let curTime = Date.now();
    let curDate = new Date(curTime);
    let cutoffYear = curDate.getFullYear() - 18;
    let cutoffTime = new Date(curDate.setFullYear(cutoffYear));
    let birthTime = new Date(Date.parse(dob));
    over18 = (cutoffTime.getTime() > birthTime.getTime())
    if(!over18){
        dispatch( { type: ERROR, msg: 'Error: must be over 18' } )
        return
    }
    
    if(zipcodeRE.exec(zipcode) != zipcode){
        dispatch( {type: ERROR, msg: "ERROR: Invalid zipcode format: " + zipcode} )
        return
    }
    
    //TODO: Phone/avatar if we ever decide to do them
    const json = {username: uName, password: pWord, email: email, phone: phone, dob: dob, avatar: 'NoneForP7', zipcode: zipcode}
    resource('POST', 'register', json).then((act) => {
        dispatch({type: UPDATE_TEXT, text: "Successfully registered user"})
    })
}

export const logoutUser = () => (dispatch) => {
    resource('PUT', 'logout')
        .then((r)=>{
        if(r == 'OK'){
            dispatch({ type: LOGOUT })
        }
    })
}

export const updateText = (text) => {
    if (text.length > 5) {
        return { type: UPDATE_TEXT, text }
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}



export const updateError = (msg) => {
    return {type: ERROR, msg}
}

export const navMain = () => {
    return { type: ActionTypes.NAVIGATE_TO, page: MAIN_PAGE }
}

export const navProfile = () => {
    return { type: ActionTypes.NAVIGATE_TO, page: PROFILE_PAGE }
}

export const logout = () => {
    return { type: ActionTypes.LOGOUT }
}

export const navigateTo = (pageType) => (dispatch) => {
    switch(pageType){
        case MAIN_PAGE:
            dispatch(navMain())
            return
        case PROFILE_PAGE:
            dispatch(navProfile())
            return
        default:
            return logoutUser()(dispatch)
    }
}
