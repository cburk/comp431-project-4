import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import UserStatus from './userStatus'

import * as FollowingListActions from './followingListActions'

export const FollowingList = ({ friendStatuses, addFriend }) => {    

    let friendName;
    
    const _addFriend = () => {
        if(friendName && friendName.value.length > 0){
            addFriend(friendName.value)
            friendName.value = ''
        }
    }
    
    return (
    <div id="statusList">
        <p>Your friends statuses</p>
        <span>
        {friendStatuses.map((friendStatus) => (
            <div id="friendStatus">
                <UserStatus author={friendStatus.person} image={friendStatus.image} status={friendStatus.status} />
            </div>
        ))}
        </span>
        <br />
        <input type="Text" placeholder="Enter New Friend's Name Here" ref = {(node) => friendName = node}></input>
        <button onClick={_addFriend}>Add Friend</button>
        
    </div>)
}


export default connect(
    (state) => ({ friendStatuses : state.friendStatuses }),
    (dispatch) => ({ addFriend : (friendName) => FollowingListActions.addFriend(friendName)(dispatch) })
)(FollowingList)
