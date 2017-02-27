import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import ProfileForm from './profileForm'

export const Profile = ({ curUser }) => {
    return (
    <div>
        <b>On profile page</b>
        <Navbar />
        <img src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi255PtmLHSAhVLxoMKHcxuDVwQjhwIBQ&url=http%3A%2F%2Fwww.stereogum.com%2F1649782%2Fdeath-grips-share-instrumental-and-vocal-tracks-from-their-last-two-albums%2Fnews%2F&psig=AFQjCNFYbeD74Vr-e11mBEk6Z9oUXMD6Rw&ust=1488316418090134"/>
        <ul>
            <li>Name: {curUser.name}</li>
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
