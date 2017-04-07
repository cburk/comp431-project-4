import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
const ContentEditable = require("react-contenteditable"); 
import * as ArticleActions from './articleActions'

export const Article = ({ ErrorMessage, author, text, img, id, comments, articleEdit, addComment }) => {
    let editedText = text
    let newCommentText = ''
    
    const finalizeEdit = () => {
        console.log("Telling server to edit article w/ new text: ", editedText)
        articleEdit(id, editedText)
    }
    
    const _addComment = () => {
        if(newCommentText && newCommentText.value){
            addComment(id, newCommentText.value)
        }
    }
    
    const handleEdit = (evt) => {
        console.log("Article ", id, " edited!")
        console.log(evt)
        console.log(evt.target.value)
        editedText = evt.target.value
    }
        
    return (
        <div id={"article" + text + author}>
            <p>{author} posted: </p>
            {img &&
                (<img src={img}></img>)
             }
            <ContentEditable
                name="article text"
                html={text}
                onChange={handleEdit}
            />
            <input type="text" ref={(node) => newCommentText = node} />
            <button onClick={_addComment}>Comment</button>
            <button onClick={finalizeEdit}>Edit</button>
            <span>{ErrorMessage}</span>
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
    (state) => ({ ErrorMessage: state.errorMsg }),
    (dispatch, ownProps) => {
        return {
            articleEdit: (articleID, newText) => ArticleActions.articleEdit(articleID, newText)(dispatch),
            addComment: (articleID, newText) => ArticleActions.addComment(articleID, newText)(dispatch)
        }
    }
)(Article)

