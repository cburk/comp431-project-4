import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as StatusActions from './statusActions'
import * as ProfileActions from '../profile/profileActions'


/* 
The box displaying a users image, status, and options to change them 
*/
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
        <img src={curUserStatus.image}></img>
        <h5>Logged in as: {curUserStatus.person}</h5>
        <p>Status: {curUserStatus.status}</p>        
        <input type="text" placeholder="Enter new status here" ref={(node) => newStatus = node} />
        <button onClick={_updateStatus}>Update Status</button>
    </div>)
}


export default connect(
    (state) => ({ curUserStatus: state.curUserStatus }),
    (dispatch) => ({ updateStatus: (newStat) => ProfileActions.updateHeadline(newStat)(dispatch) })
)(FollowingList)
