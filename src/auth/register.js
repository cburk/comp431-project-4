import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

export const Login = ({ register }) => {
    let uName;
    let pWord;
    let displName;
    let email;
    let phone;
    let dob;
    let zip;
    
    const _register = () => {
        console.log("Inside login click")
        //Validation logic
        let errorMsg = document.getElementById('errorSpan')
        
        if(!uName.checkValidity()){
            console.log(1)
            errorMsg.innerHTML = "INVALID USERNAME"
            return
        }

        if(!pWord.checkValidity()){
            console.log(2)
            errorMsg.innerHTML = "INVALID PASSWORD"
            return
        }        
        
        if(!email.checkValidity()){
            console.log(3)
            errorMsg.innerHTML = "INVALID EMAIL"
            return
        }
        
        if(!phone.checkValidity()){
            errorMsg.innerHTML = "INVALID PHONE #"
            return
        }
        
        let over18 = false
        //E ure users are 18+ -->
        let curTime = Date.now();
        let curDate = new Date(curTime);
        let cutoffYear = curDate.getFullYear() - 18;
        let cutoffTime = new Date(curDate.setFullYear(cutoffYear));
        if(dob && dob.value){
            let birthTime = new Date(Date.parse(dob.value));
            over18 = (cutoffTime.getTime() > birthTime.getTime())
            if(!over18){
                errorMsg.innerHTML = "INVALID PHONE #"
                return
            }
        }else{
            errorMsg.innerHTML = "INVALID PHONE #"
            return
        }
        
        if(!zip.checkValidity()){
            errorMsg.innerHTML = "INVALID ZIP CODE"
            return
        }     
        
        // Otherwise we're good
        console.log("Component triggered login w/ ", uName.value, pWord.value)
        // TODO Later: Maybe do password checking later.  For now, not really checking w/ password
        register(uName.value)
    }
    
    return (
    <div>
        <h2>Register</h2>
        <input type="text" placeholder="Username" pattern="[A-Za-z][A-Za-z1-9]+" required ref={(node) => uName = node} />
        <input type="text" placeholder="Displayname" ref={(node) => displName = node} />
        <input type="text" placeholder="Password" required ref={(node) => pWord = node} />
        <input type="email" placeholder="Email" required ref={(node) => email = node} />
        <input type="phone" placeholder="phone" pattern="\d\d\d[\-]\d\d\d[\-]\d\d\d\d" required ref={(node) => phone = node} />
        <input type="text" placeholder="zip" pattern="[0-9]{5}" required ref={(node) => zip = node} />
        <input type="date" placeholder="Date of Birth" required ref={(node) => dob = node} />
        <input type="submit" value="Submit" onClick={_register} />
        <input type="reset" value="Clear" />
        <span id="errorSpan">Error Message</span>
    </div>)
}

export default connect(
    (state) => { 
        return {
        }
    },
    (dispatch) => { 
        return {
            // TODO Later: Could use register action specifically in the future
            register: (text) => dispatch(Actions.loginUser(text))
        }
    }
)(Login)
