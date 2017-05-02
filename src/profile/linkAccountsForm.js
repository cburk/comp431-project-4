import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import * as AuthActions from '../auth/authActions'
import * as LinkActions from './linkActions'

export const Login = ({ link, raiseError, loggedInAs, ErrorMessage }) => {
    let uName;
    let pWord;

    console.log("Logged in as frontend: ", loggedInAs)
    
    const _link = () => {
        // TODO: Length checking/other validation I think?
        if (!(uName && uName.value)){
            raiseError("ERROR: Login requires username")
            return
        }
            
        if (!(pWord && pWord.value)){
            raiseError("ERROR: Login requires password")
            return
        }
        link(uName.value, pWord.value)
        uName.value = ''
        pWord.value = ''
    }
    
    return (
    <div>
        <h2>Link Accounts</h2>
        <span>{ErrorMessage}</span>
        {
            //Only allow linking w/ password form, i.e. when logged in w/ oauth
            (loggedInAs==AuthActions.LOGGED_IN_WITH.OAUTH) ?
            (
                <div>
                <input type="text" id="login-username" placeholder="Username" ref={(node) => uName = node} />
                <input type="password" id="login-password" placeholder="Password" ref={(node) => pWord = node} />
                <button id="login-login" onClick={_link}>Link accounts</button>
                </div>
            ) : (
                <p>To link accounts, please log in using oauth (facebook). </p>
            )
        }
        
    </div>)
}

export default connect(
    (state) => { 
        return {
            ErrorMessage: state.errorMsg,
            loggedInAs: state.loggedInWith
        }
    },
    (dispatch) => { 
        return {
            link: (text, pword) => LinkActions.link(text, pword)(dispatch),
            raiseError: (msg) => dispatch({type: Actions.ERROR, msg: msg}),
            tryAutoLogin: () => Actions.tryAutoLogin()(dispatch)
        }
    }
)(Login)
