import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

export const Landing = ({ ErrorMessage }) => {
    return (
    <div>
        <h1>Welcome to The Bigger Jail</h1>
        <b>Login/Register</b>
        <span>{ErrorMessage}</span>
        <span>
            <Login />
            <Register />
        </span>
    </div>)
}


export default connect(
    (state) => ({ ErrorMessage: state.errorMsg }),
    (dispatch) => ({  })
)(Landing)
