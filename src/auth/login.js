import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

export const Login = ({ login, raiseError }) => {
    let uName;
    let pWord;

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
        login(uName.value)
        uName.value = ''
        pWord.value = ''
    }
    
    return (
    <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" ref={(node) => uName = node} />
        <input type="text" placeholder="Password" ref={(node) => pWord = node} />
        <button onClick={_login}>Login</button>
    </div>)
}

export default connect(
    (state) => { 
        return {
        }
    },
    (dispatch) => { 
        return {
            login: (text) => dispatch(Actions.loginUser(text)),
            raiseError: (msg) => dispatch({type: Actions.ERROR, msg: msg})
        }
    }
)(Login)
