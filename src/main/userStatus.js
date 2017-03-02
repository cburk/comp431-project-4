import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as StatusActions from './statusActions'

/* 
Each users status
*/
export const UserStatus = ({ author, image, status, removeFriend }) => {    
    const _removeFriend = () => {
        removeFriend(author)
    }

    
    return (
    <div>
        <img src={image}></img>
        <h5>User {author} posted status:</h5>
        <h7>{status}</h7>
        <button onClick={_removeFriend}>Remove Friend</button>
    </div>)
}

//TODO: Define props

export default connect(
    (state) => ({  }),
    (dispatch) => {
        return {
            removeFriend : (person) => dispatch(StatusActions.removeFriend(person))
        }
    }        
)(UserStatus)
