import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
const ContentEditable = require("react-contenteditable"); 
import * as ArticleActions from './articleActions'
import Comment from './comment'

export const Article = ({ ErrorMessage, author, text, img, id, comments, articleEdit, addComment }) => {
    let editedText = text
    let newCommentText = ''
    
    const finalizeEdit = () => {
        articleEdit(id, editedText)
    }
    
    const _addComment = () => {
        if(newCommentText && newCommentText.value){
            addComment(id, newCommentText.value)
        }
    }
    
    const handleEdit = (evt) => {
        editedText = evt.target.value
    }
        
    return (
        <div name='article' data-author={author} id={"article" + text + author}>
            <p>{author} posted: </p>
            {img &&
                (<img src={img}></img>)
             }
            <ContentEditable
                name="article text"
                html={text}
                onChange={handleEdit}
            />
            <input id='art-comment-text' type="text" ref={(node) => newCommentText = node} />
            <button id='art-comment' onClick={_addComment}>Comment</button>
            <button id='art-edit' onClick={finalizeEdit}>Edit</button>
            <span>{ErrorMessage}</span>
            {comments.map((comment) => (
                <Comment articleID={id} author={comment.author} text={comment.text} commentID={comment.commentId} />
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
    (state) => ({ ErrorMessage: state.errorMsg }),
    (dispatch, ownProps) => {
        return {
            articleEdit: (articleID, newText) => ArticleActions.articleEdit(articleID, newText)(dispatch),
            addComment: (articleID, newText) => ArticleActions.addComment(articleID, newText)(dispatch)
        }
    }
)(Article)

