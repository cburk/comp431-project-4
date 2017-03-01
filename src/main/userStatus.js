import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as StatusActions from './statusActions'

/* 
Each users status
*/
export const UserStatus = ({ author, image, status, removeFriend }) => {    
    console.log("Created user status w/ image: ", image)
    
    const _removeFriend = () => {
        console.log("In remove friend button click")
        removeFriend(author)
    }

    
    return (
    <div>
        <img src={image}></img>
        <h5>User {author} posted status:</h5>
        <p>{status}</p>
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
