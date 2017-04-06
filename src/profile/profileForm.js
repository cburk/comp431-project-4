import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ProfileActions from './profileActions'

export const ProfileForm = ({ curUser, errorMsg, update, handleImageChange }) => {
    let pWord;
    let displName;
    let email;
    let phone;
    let zip;
    // TODO Later: need to actually use this file in update
    let image;
    
    const _update = () => {
        console.log("In form, found zip? ", zip)
        console.log(zip.value)
        console.log(zip ? zip.value : '')
        console.log("++++++++++++")
        update(displName ? displName.value : '', email ? email.value : '', phone ? phone.value : '', zip ? zip.value : '', pWord ? pWord.value : '')
    }
        
    // TODO: Maybe li's for formatting?
    return (
    <div>
        <b>This is the profile form</b>
        <input type="text" placeholder="Displayname" ref={(node) => displName = node} />
        <input type="text" placeholder="Password" ref={(node) => pWord = node} />
        <input type="email" placeholder="Email" ref={(node) => email = node} />
        <input type="phone" placeholder="phone" ref={(node) => phone = node} />
        <input type="text" placeholder="zip" ref={(node) => zip = node} />
        <input type="submit" value="Submit" onClick={_update} />
        <input type="file" placeholder="Set avatar" accept="image/*" 
        onChange={(e) => handleImageChange(e)}/>
        <p>{errorMsg}</p>
    </div>
    )
    //TODO: Still need to add useless image upload button
}


export default connect(
    (state) => ({ curUser: state.curUser, errorMsg: state.errorMsg }),
    (dispatch) => ({ update: (displayName, email, phone, zipcode, password) => ProfileActions.updateUserInfo(displayName, email, phone, zipcode, password)(dispatch),
                    handleImageChange: (imgUploadEvent) => ProfileActions.setAvatar(imgUploadEvent)(dispatch)
    })
)(ProfileForm)
