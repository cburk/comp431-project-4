import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import Articles from './articles'

export const Main = ({ }) => {
    return (
    <div>
        <b>On main page</b>
        <Navbar />
        <p></p>
        <p></p>
        <Articles />
    </div>)
}


export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Main)
