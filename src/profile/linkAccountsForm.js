import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import * as AuthActions from '../auth/authActions'
import * as LinkActions from './linkActions'

export const Login = ({ link, raiseError, loggedInAs, ErrorMessage, unlink }) => {
    let uName;
    let pWord;
    
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
    
    const getDisplayObject = () => {
        if(loggedInAs == AuthActions.LOGGED_IN_WITH.OAUTH){
            return (
                <div>
                <input type="text" id="login-username" placeholder="Username" ref={(node) => uName = node} />
                <input type="password" id="login-password" placeholder="Password" ref={(node) => pWord = node} />
                <button id="login-login" onClick={_link}>Link accounts</button>
                </div>
            )
        }else if(loggedInAs==AuthActions.LOGGED_IN_WITH.PASSWORD){
            return (
                <p>To link accounts, please log in using oauth (facebook). </p>
            )
        }else{
            return (
                <button onClick={unlink}>Unlink Facebook Account</button>
            )
        }
    }
    
    return (
    <div>
        <h2>Link Accounts</h2>
        <span>{ErrorMessage}</span>
        {
            getDisplayObject()
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
            unlink: () => LinkActions.unlink()(dispatch),
            raiseError: (msg) => dispatch({type: Actions.ERROR, msg: msg}),
            tryAutoLogin: () => Actions.tryAutoLogin()(dispatch)
        }
    }
)(Login)
