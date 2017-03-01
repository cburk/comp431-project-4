import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

/* 
Each users status
*/
export const UserStatus = ({ author, image, status }) => {    
    console.log("Created user status w/ image: ", image)
    
    return (
    <div>
        <img src={image}></img>
        <h5>User {author} posted status:</h5>
        <p>{status}</p>
    </div>)
}



export default connect(
    (state) => ({  }),
    (dispatch) => ({ })
)(UserStatus)
