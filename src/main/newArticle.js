import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as ArticleActions from './articleActions'

export const NewArticle = ({ author, nextID, addNewArticle }) => {
        
    let articleText;
    let articleImageBytes;
    
    const _addNewArticle = () => {
        if(articleText && articleText.value.length > 0){
            addNewArticle(nextID, author, articleText.value, articleImageBytes)
            articleText.value = ""
            articleImageBytes = null
        }
    }
    
    const _handleImageChange = (e) => {
        articleImageBytes = e.target.files[0]
        console.log("In handle image ", articleImageBytes)
    }
    
    const _clear_input = () => {
        articleText.value = ""
        articleImageBytes = null
    }
    
    // TODO: Should either filter in articles based on filter setting, or have some kind of article id
    // First one is probably the more react/reduxy way to do it, also probably more scalable if we sort by different attrs
    return (
        <div class="addArticleInput">
            <p>Add a new article:</p>
            <input type="text" ref={(node) => articleText = node} />
            <input type="file" text="Add Image" accept="image/*" 
            onChange={(e) => _handleImageChange(e)}/>
            <button onClick={_addNewArticle} >Post</button>
            <button onClick={_clear_input} >Clear</button>
        </div>
    )
}

NewArticle.propTypes = {
    author: PropTypes.string.isRequired,
    nextID: PropTypes.number.isRequired
}

export default connect(
    (state) => {
        return {
            author: state.curUser.name,
            nextID: state.nextArticleID
        }
    },
    (dispatch) => {
        return {
            // TODO: Need to allow image to be uploaded as well
            addNewArticle: (id, author, text, articleImageBytes) => ArticleActions.addNewArticle(id, author, text, articleImageBytes)(dispatch)
        }
    }
)(NewArticle)

