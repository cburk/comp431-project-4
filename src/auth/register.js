import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Register = ({ }) => {
    return (
    <div>
        <h1>Welcome to The Bigger Jail</h1>
        <b>Login/Register</b>
        <span>
        </span>
    </div>
    )
}

export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Register)
