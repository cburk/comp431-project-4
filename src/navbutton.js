import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions'

export const Navbutton = ({ id, text, navigate}) => {
    console.log("In button func")
    console.log(id)
    
    const _navigate = () => {
        navigate(id)
    }
    
    return (
            <button key={id} id={id} onClick={_navigate}>{text}</button>
    )
}

Navbutton.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default connect(
    null,
    (dispatch, ownProps) => {
        return {
            navigate: () => dispatch(Actions.navigateTo(ownProps.id))
        }
    }
)(Navbutton)

