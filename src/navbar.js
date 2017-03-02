import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'
import Navbutton from './navbutton'

export const Navbar = ({ navPages }) => {    
    return (
    <div>
        <span>
        <p>
        Navbar
        {navPages.map((descr) => (
            <Navbutton id={descr.pageType} text={descr.description} />
        ))}
        </p>
        </span>
    </div>)
}

export default connect(
    (state) => { 
        return {
            navPages: state.navPagesList
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Navbar)

