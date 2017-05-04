import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions' 

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
            return <Main />
        } else if (location == Actions.PROFILE_PAGE) {
            return <Profile />
        } else {
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


export default connect(
    (state) => ({ location: state.location, text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => {} })
)(App)