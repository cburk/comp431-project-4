import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ArticleActions from './articleActions'
const ContentEditable = require("react-contenteditable"); 

export const Comment = ({ ErrorMessage, articleID, author, text, commentID, commentEdit }) => {
    let editedText = text
    let newCommentText = ''
    
    const finalizeEdit = () => {
        console.log("Telling server to edit article w/ new text: ", editedText)
        commentEdit(commentID, articleID, editedText)
    }

    const handleEdit = (evt) => {
        editedText = evt.target.value
    }
        
    return (
        <div name='comment'>
            <p>{author} commented:</p>
            <ContentEditable
                html={text}
                onChange={handleEdit}
            />
            <span>{ErrorMessage}</span>
            <button id='art-edit' onClick={finalizeEdit}>Edit Comment</button>
        </div>
    )

}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    articleID: PropTypes.number.isRequired,
    commentID: PropTypes.number.isRequired
}

export default connect(
    (state) => ({ ErrorMessage: state.errorMsg }),
    (dispatch, ownProps) => {
        return {
            commentEdit: (commentID, articleID, newText) => ArticleActions.commentEdit(commentID, articleID, newText)(dispatch)
        }
    }
)(Comment)

