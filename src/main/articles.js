import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ArticleActions from './articleActions'
import Article from './article'
import NewArticle from './newArticle'

export const Articles = ({ allArticles, searchArticles }) => {    
    let searchQuery;
    const _searchArticles = () => {
        //TODO: Maybe raise error if empty search?  This seems fine tho
        if(searchQuery && searchQuery.value.length != 0){
            searchArticles(searchQuery.value)
            searchQuery.value = ""
        }
    }
    
    return (
    <div id="articles">
        <input type="text" placeholder="Search here" ref={(node) => searchQuery = node} />
        <button onClick={_searchArticles}>Search</button>
        <p>Articles List</p>
        <span>
        {allArticles.map((art) => (
            <Article author={art.author} text={art.text} img={art.image} key={art._id} id={art._id} />
        ))}
        </span>
        
        <NewArticle />
    </div>)
        
}

export default connect(
    (state) => { 
        return {
            allArticles: state.articlesList
        }
    },
    (dispatch) => {
        return {
            searchArticles: (query) => dispatch(ArticleActions.searchArticles(query)),
        }
    }
)(Articles)

