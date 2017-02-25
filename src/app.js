import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions' 

//import { updateText } from './actions'
import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

export const App = ({ text, message, update, location }) => {
    let input;

    const _update = () => {
        if (input && input.value) {
            //update(input.value)
            input.value = ''
        }
    }
    
    const getCorrectPage = () => {
        if (location == Actions.MAIN_PAGE) {
            console.log("routed to main")
            return <Main />
        } else if (location == Actions.PROFILE_PAGE) {
            console.log("routed to profile")
            return <Profile />
        } else {
            console.log("routed to landing")
            return (<Landing />)
        }
    }

    return (
        <div>
            <div>
                {getCorrectPage()}
            </div>
            <b>{message}</b>
        </div>
    )
}

App.propTypes = {
    //text: PropTypes.string.isRequired,
    //message: PropTypes.string.isRequired,
    //update: PropTypes.func.isRequired,
}

export default connect(
    (state) => ({ location: state.location, text: state.text, message: state.message }),
    //(dispatch) => ({ update: (text) => dispatch(updateText(text)) })
    (dispatch) => ({ update: (text) => {} })
)(App)


/*
    if (location == MAIN_PAGE) {
        <Main .../>
    } else if (location == PROFILE_PAGE) {
        <Profile .../>
    } else {
        <Landing .../>
    }
*/