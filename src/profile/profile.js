import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import ProfileForm from './profileForm'

export const Profile = ({ curUser }) => {
    return (
    <div>
        <b>On profile page</b>
        <Navbar />
        <img src="forest.jpeg"/>
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
