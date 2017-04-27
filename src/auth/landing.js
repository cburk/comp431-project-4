import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import Login from './login'
import Register from './register'


export const Landing = ({ ErrorMessage }) => {
    const _testing = () => {
        fetch("http://localhost:3000/login/facebook", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        }
        }).then((err, res) => {
            console.log("Res? ", res)
            console.log("Err? ", err)
        })
    }
    
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
    (state) => ({ ErrorMessage: state.errorMsg }),
    (dispatch) => ({ 
    })
)(Landing)
