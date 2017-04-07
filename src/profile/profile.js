import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import ProfileForm from './profileForm'

export const Profile = ({ curUser, statusText }) => {
    return (
    <div>
        <h1>On profile page</h1>
        <Navbar />
        <img src={curUser.avatar}/>
        <div>Display Name: {curUser.displayName}</div>
        <div name='p-email'>Email: {curUser.email}</div>
        <div name='p-phone'>Phone: {curUser.phone}</div>
        <div name='p-dob'>DOB: {curUser.dob}</div>
        <div name='p-zip'>Zip: {curUser.zipcode}</div>
        <span id='profile-status'>{statusText}</span>
        <ProfileForm />
    </div>
    )
}


export default connect(
    (state) => ({ curUser: state.curUser, statusText: state.text }),
    (dispatch) => ({ })
)(Profile)
