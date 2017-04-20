import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import * as AuthActions from '../auth/authActions'

export const Login = ({ login, raiseError, tryAutoLogin }) => {
    let uName;
    let pWord;
    
    tryAutoLogin()

    const _login = () => {
        // TODO: Length checking/other validation I think?
        if (!(uName && uName.value)){
            raiseError("ERROR: Login requires username")
            return
        }
            
        if (!(pWord && pWord.value)){
            raiseError("ERROR: Login requires password")
            return
        }            
        login(uName.value, pWord.value)
        uName.value = ''
        pWord.value = ''
    }
    
    return (
    <div>
        <h2>Login</h2>
        <input type="text" id="login-username" placeholder="Username" ref={(node) => uName = node} />
        <input type="password" id="login-password" placeholder="Password" ref={(node) => pWord = node} />
        <button id="login-login" onClick={_login}>Login</button>
    </div>)
}

export default connect(
    (state) => { 
        return {
        }
    },
    (dispatch) => { 
        return {
            login: (text, pword) => AuthActions.loginUser(text, pword)(dispatch),
            raiseError: (msg) => dispatch({type: Actions.ERROR, msg: msg}),
            tryAutoLogin: () => Actions.tryAutoLogin()(dispatch)
        }
    }
)(Login)
