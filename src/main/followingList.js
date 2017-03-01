import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import UserStatus from './userStatus'

import * as StatusActions from './statusActions'

export const FollowingList = ({ friendStatuses, addFriend }) => {    

    let friendName;
    
    const _addFriend = () => {
        if(friendName && friendName.value.length > 0){
            addFriend(friendName.value)
            friendName.value = ''
        }
    }
    
    return (
    <div>
        <p>Your friends statuses</p>
        {friendStatuses.map((friendStatus) => (
            <div>
                <UserStatus author={friendStatus.person} image={friendStatus.image} status={friendStatus.status} />
            </div>
        ))}
        <input type="Text" placeholder="Enter New Friend's Name Here" ref = {(node) => friendName = node}></input>
        <button onClick={_addFriend}>Add Friend</button>
        
    </div>)
}


export default connect(
    (state) => ({ friendStatuses : state.friendStatuses }),
    (dispatch) => ({ addFriend : (friendName) => dispatch(StatusActions.addFriend(friendName)) })
)(FollowingList)
