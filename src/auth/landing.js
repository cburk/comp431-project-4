import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import Login from './login'
import Register from './register'


export const Landing = ({ ErrorMessage, loggedInWith }) => {        
    return (
    <div>
        <h1>Welcome to The Bigger Jail</h1>
        <span>{ErrorMessage}</span>
        <span>
            <a href={Actions.url + "/login/facebook"}>Login with facebook!</a>
            <Login />
            <Register />
        </span>
    </div>)
}


export default connect(
    (state) => ({ ErrorMessage: state.errorMsg, loggedInWith: state.loggedInWith }),
    (dispatch) => ({ 
    })
)(Landing)
