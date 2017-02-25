import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

export const Login = ({ login }) => {
    let uName;
    let pWord;

    const _login = () => {
        console.log("Inside login click")
        console.log(uName.value)
        console.log(pWord.value)
        // TODO: Length checking/other validation I think?
        if ((uName && uName.value) && (pWord && pWord.value)) {
            console.log("Component triggered login w/ ", uName.value, pWord.value)
            // For now, not really checking w/ password
            login(uName.value)
            uName.value = ''
            pWord.value = ''
        }
        //TODO: Otherwise, let them know invalid args
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
            login: (text) => dispatch({type: Actions.LOGIN, uName: text})
        }
    }
)(Login)
