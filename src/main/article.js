import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ author, text, img, id}) => {
    console.log("In button func")
    console.log(author)
    
    //Idea: same css style for each image to standardize size, really annoying rn
    
    /*
    const _navigate = () => {
        navigate(id)
    }
    */
    
    console.log("In article obj")
    console.log(img)
    console.log("Img above? ^")
    
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
    //TODO: Add buttons and such
}

Article.propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default connect(
    null,
    (dispatch, ownProps) => {
        return {
            navigate: () => dispatch(Actions.navigateTo(ownProps.id))
        }
    }
)(Article)

