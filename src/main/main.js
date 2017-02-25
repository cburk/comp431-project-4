import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Main = ({ }) => {
    return (
    <span>
        <b>On main page</b>
    </span>)
}


export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Main)
