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
    
    console.log(allArticles)
    allArticles.map((item)=>{
        console.log(item)
        console.log(item.author)
        console.log(item.text)
    })
    //let buttons = navPages.map((page) => (<button value={page} onclick=>{page}</button>))
    return (
    <div>
        <input type="text" placeholder="Search here" ref={(node) => searchQuery = node} />
        <button onClick={_searchArticles}>Search</button>
        
        Articles List
        <span>
        {allArticles.map((art) => (
            <Article author={art.author} text={art.text} img={art.image} key={art.id} id={art.id} />
        ))}
        </span>
        
        <NewArticle />
    </div>)
        
    //<NewArticle />
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

