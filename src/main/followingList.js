import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import Articles from './articles'
import UserStatus from './userStatus'

export const FollowingList = ({  }) => {    
    return (
    <div>
        <Headline />
        <FollowingList />
        <b>On main page</b>
        <Navbar />
        <p></p>
        <p></p>
        <Articles />
    </div>)
}


export default connect(
    (state) => ({  }),
    (dispatch) => ({  })
)(FollowingList)
