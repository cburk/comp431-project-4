import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
const ContentEditable = require("react-contenteditable"); 

export const Article = ({ author, text, img, id, comments}) => {
    let editedText = text
    
    const finalizeEdit = () => {
        console.log("Telling server to edit article w/ new text: ", editedText)
    }
    
    const handleEdit = (evt) => {
        console.log("Article ", id, " edited!")
        console.log(evt)
        console.log(evt.target.value)
        editedText = evt.target.value
    }
    
        
    return (
        <div id="article">
            <p>{author} posted: </p>
            <div>
            {img &&
                (<img src={img}></img>)
             }
            <p>
            <ContentEditable
                html={text}
                onChange={handleEdit}
            />
            </p>
            <button>Comment</button>
            <button onClick={finalizeEdit}>Edit</button>
            </div>
            {comments.map((comment) => (
                <p>{comment.author} commented: {comment.text}</p>
            ))}
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

