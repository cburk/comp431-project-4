import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import ProfileForm from './profileForm'

export const Profile = ({ curUser }) => {
    return (
    <div>
        <h1>On profile page</h1>
        <Navbar />
        <img src={curUser.avatar}/>
        <ul>
            <li>Display Name: {curUser.displayName}</li>
            <li>Email: {curUser.email}</li>
            <li>Phone: {curUser.phone}</li>
            <li>DOB: {curUser.dob}</li>
            <li>Zip: {curUser.zipcode}</li>
        </ul>
        <ProfileForm />
    </div>
    )
}


export default connect(
    (state) => ({ curUser: state.curUser }),
    (dispatch) => ({  })
)(Profile)
