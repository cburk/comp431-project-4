import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ author, text, img, id}) => {
    return (
        <div id="article">
            <p>{author} posted: </p>
            <div>
            {img &&
                (<img src={img}></img>)
             }
            <p>{text}</p>
            </div>
            <button>Comment</button>
            <button>Edit</button>
        </div>
    )
}

Article.propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default connect(
    null,
    (dispatch, ownProps) => {
        return {
        }
    }
)(Article)

