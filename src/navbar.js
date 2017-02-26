import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'
import Navbutton from './navbutton'

export const Navbar = ({ navPages }) => {    
    console.log(navPages)
    navPages.map((item)=>{
        console.log(item)
        console.log(item.pageType)
        console.log(item.description)
    })
    //let buttons = navPages.map((page) => (<button value={page} onclick=>{page}</button>))
    return (
    <div>
        <span>
        Navbar
        {navPages.map((descr) => (
            <Navbutton id={descr.pageType} text={descr.description} />
        ))}
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
            logout: () => dispatch(Actions.logout()),
            navMain: () => dispatch(Actions.navMain()),
            navProfile: () => dispatch(Actions.navProfile())
        }
    }
)(Navbar)

