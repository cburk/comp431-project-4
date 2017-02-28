import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ArticleActions from './articleActions'
import Article from './article'
import NewArticle from './newArticle'

export const Articles = ({ allArticles }) => {    
    console.log(allArticles)
    allArticles.map((item)=>{
        console.log(item)
        console.log(item.author)
        console.log(item.text)
    })
    //let buttons = navPages.map((page) => (<button value={page} onclick=>{page}</button>))
    return (
    <div>
        
        Articles List
        <span>
        {allArticles.map((art) => (
            <Article author={art.author} text={art.text} img={art.image} />
        ))}
        </span>
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
            //logout: () => dispatch(Actions.logout()),
        }
    }
)(Articles)
