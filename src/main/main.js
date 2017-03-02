import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../navbar'
import Articles from './articles'
import Headline from './headline'
import FollowingList from './followingList'

export const Main = ({  }) => {    
    return (
    <div>
        <Headline />
        <h1>Main Page</h1>
        <Navbar />
        <FollowingList />
        <Articles />
    </div>)
}
/*


*/


export default connect(
    (state) => ({  }),
    (dispatch) => ({  })
)(Main)
