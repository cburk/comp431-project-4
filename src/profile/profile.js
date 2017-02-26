import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'

export const Profile = ({ }) => {
    return (
    <div>
        <b>On profile page</b>
        <Navbar />
    </div>
    )
}


export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(Profile)
