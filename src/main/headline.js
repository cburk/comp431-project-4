import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UserStatus from './userStatus'
import * as StatusActions from './statusActions'


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
    <div>
        <UserStatus author={curUserStatus.author} image={curUserStatus.image} status={curUserStatus.status} />
        <input type="text" placeholder="Enter new status here" ref={(node) => newStatus = node} />
        <button onClick={_updateStatus}>Update Status</button>
    </div>)
}


export default connect(
    (state) => ({ curUserStatus: state.curUserStatus }),
    (dispatch) => ({ updateStatus: (newStat) => dispatch(StatusActions.updateCurUserStatus(newStat)) })
)(FollowingList)
