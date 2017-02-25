import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Landing = ({ }) => {
    return (
    <span>
        <b>On landing page</b>
    </span>)
}


export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Landing)
