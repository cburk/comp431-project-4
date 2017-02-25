import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Profile = ({ }) => {
    return (
    <span>
        <b>On profile page</b>
    </span>)
}


export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Profile)
