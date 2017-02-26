import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'

export const Navbar = ({ logout, navMain, navProfile }) => {
    let uName;
    let pWord;

    const _navigateProfile = (e) => {
        navProfile()
    }
    const _navigateLogout = (e) => {
        logout()
    }
    const _navigateMain = (e) => {
        navMain()
    }
    
    return (
    <div>
        <span>
        Navbar
        <button onClick={_navigateProfile}>Profile</button>
        <button onClick={_navigateMain}>Main</button>
        <button onClick={_navigateLogout}>Logout</button>
        </span>
    </div>)
}

export default connect(
    (state) => { 
        return {
        }
    },
    (dispatch) => {
        return {
            logout: () => dispatch(Actions.logout()),
            navMain: () => dispatch(Actions.navMain()),
            navProfile: () => dispatch(Actions.navProfile())
        }
    }
)(Navbar)


/*
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'

export const NavBar = ({ navigate }) => {
    let uName;
    let pWord;

    const _navigate = (e) => {
        console.log("In nav")
        console.log(e)
        navigate("memes")
    }
    
    return (
    <div>
        <div>
        This is the nav bar
        <span>
            <button id="profile" onClick={_navigate}>Profile</button>
            <button id="logout" onClick={_navigate}>Logout</button>
        </span>
    </div>
    )
}

export default connect(
    (state) => ({  }),
    (dispatch) => ({ navigate: () => {} })
)(NavBar)

*/
