import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ author, text, img, id}) => {
    // TODO: Should either filter in articles based on filter setting, or have some kind of article id
    // First one is probably the more react/reduxy way to do it, also probably more scalable if we sort by different attrs
    return (
        // TODO: Idk why this doesn't work
        <div class="article" id={id}>
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

