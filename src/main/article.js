import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ author, text, img}) => {
    console.log("In button func")
    console.log(author)
    
    /*
    const _navigate = () => {
        navigate(id)
    }
    */
    
    console.log("In article obj")
    console.log(img)
    console.log("Img above? ^")
    
    // TODO: Should probs have some kind of article id
    return (
            <div key={author} id={author}>
            {img &&
                (<img src={img}></img>)
             }
            <p>{text}</p>
            </div>
    )
    //TODO: Add buttons and such
}

Article.propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default connect(
    null,
    (dispatch, ownProps) => {
        return {
            navigate: () => dispatch(Actions.navigateTo(ownProps.id))
        }
    }
)(Article)

