import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as ProfileActions from '../profile/profileActions'

 
//The box displaying a users image, status, and options to change them 

export const FollowingList = ({ curUserStatus, updateStatus }) => {    
    let newStatus;
    
    const _updateStatus = () => {
        if (newStatus && newStatus.value.length > 0){
            updateStatus(newStatus.value)
            newStatus.value = ''
        }
    }
    
    return (
    <div id="headline">
        <img src={curUserStatus.avatar}></img>
        <h5>Logged in as: {curUserStatus.name}</h5>
        <p id='headline-display'>Status: {curUserStatus.headline}</p>        
        <input id='add-headline-text' type="text" placeholder="Enter new status here" ref={(node) => newStatus = node} />
        <button id='add-headline-button' onClick={_updateStatus}>Update Status</button>
    </div>)
}


export default connect(
    (state) => ({ curUserStatus: state.curUser }),
    (dispatch) => ({ updateStatus: (newStat) => ProfileActions.updateHeadline(newStat)(dispatch) })
)(FollowingList)
