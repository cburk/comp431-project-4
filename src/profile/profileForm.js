import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const ProfileForm = ({ curUser }) => {
    return (
    <div>
        <b>This is the profile form</b>
    </div>
    )
}


export default connect(
    (state) => ({ curUser: state.curUser }),
    (dispatch) => ({ update: (text) => {} })
)(ProfileForm)
