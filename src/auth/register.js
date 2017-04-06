import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

export const Register = ({ register, raiseError, statusText }) => {
    let uName;
    let pWord;
    let displName;
    let email;
    let phone;
    let dob;
    let zip;
    
    const _register = () => {
        //Minimal validation logic necessary so that there's no null access (uName.value, for example)
        if(!(uName && uName.value)){
            raiseError("USERNAME required")
            return
        }
        if(!(pWord && pWord.value)){
            raiseError("PASSWORD required")
            return
        }
        if(!(email && email.value)){
            raiseError("EMAIL required")
            return
        }
        if(!(phone && phone.value)){
            raiseError("PHONE required")
            return
        }
        if(!(dob && dob.value)){
            raiseError("USERNAME required")
            return
        }
        if(!(zip && zip.value)){
            raiseError("ZIP CODE required")
            return
        }        

        // Otherwise we're good
        register(uName.value, pWord.value, email.value, phone.value, dob.value, zip.value)
    }
    
    return (
    <div>
        <h2>Register</h2>
        <span id='registration-status'>{statusText}</span>
        <input type="text"  id='register-username' placeholder="Username" pattern="[A-Za-z][A-Za-z1-9]+" required ref={(node) => uName = node} />
        <input type="text" placeholder="Displayname" ref={(node) => displName = node} />
        <input id='register-password' type="text" placeholder="Password" ref={(node) => pWord = node} />
        <input id='register-email' type="email" placeholder="Email" ref={(node) => email = node} />
        <input id='register-phone' type="phone" placeholder="phone" ref={(node) => phone = node} />
        <input id='register-zip' type="text" placeholder="zip" ref={(node) => zip = node} />
        <input id='register-date' type="date" placeholder="Date of Birth" ref={(node) => dob = node} />
        <input id='register-submit' type="submit" value="Submit" onClick={_register} />
        <input type="reset" value="Clear" />
    </div>)
}

export default connect(
    (state) => { 
        return {
            statusText: state.text
        }
    },
    (dispatch) => { 
        return {
            // TODO Later: Could use register action specifically in the future
            register: (uName, pWord, email, phone, dob, zip) => dispatch(Actions.registerUser(uName, pWord, email, phone, dob, zip)),
            raiseError: (msg) => dispatch({type: Actions.ERROR, msg: msg})
        }
    }
)(Register)
