import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
const ContentEditable = require("react-contenteditable"); 

export const Article = ({ author, text, img, id, comments}) => {
    /*
    return (
        <div id="article">
            <p>{author} posted: </p>
            <div>
            {img &&
                (<img src={img}></img>)
             }
            <p>{text}</p>
            <button>Comment</button>
            <button>Edit</button>
            </div>
            {comments.map((comment) => (
                <p>{comment.author} commented: {comment.text}</p>
            ))}
        </div>
    )
    */
    const handleEdit = (evt) => {
        console.log("Article ", id, " edited!")
        console.log(evt)
        console.log()
    }
    
    return <ContentEditable
                html={"<p>" + author + " posted: </p>" + "<p>stuff</p>"}
                onChange={handleEdit}
            />
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

