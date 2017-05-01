export const FOLLOW_PERSON_LIST_RAW = 'F_P_L_R'
export const FOLLOW_PERSON_AVATARS = 'F_P_A'
export const FOLLOW_PERSON_HEADLINES = 'F_P_H'
export const FINALIZE_FOLLOW_LIST = 'F_F_L'
export const REMOVE_FRIEND = 'REMOVE_FRIEND'
export const ADD_FRIEND = 'ADD_FRIEND'
import * as Actions from '../actions'
import * as ArticleActions from './articleActions'

export const setFollowingListFromServer = () => (dispatch) => {
    Actions.resource('GET', 'following')
        .then((r)=>{
        //If there's no one being followed, don't try to get their headlines, will still get for loggedin
        if(r.following.length==0){
            console.log("Not following anyone, return")
            return
        }
        //Figure out who we're following
        dispatch({type: FOLLOW_PERSON_LIST_RAW, list: r.following})

        //Format so we can request their avatars, headlines from server
        let urlSuffix = ""        
        r.following.map((uName) => {
            urlSuffix += uName + ','
        })
        
        return urlSuffix
    }).then((urlSuffix) => {
        //If there's no one being followed, don't try to get their headlines, will still get for loggedin
        if(!urlSuffix){
            console.log("Not doing other bit")
            return
        }
        console.log("Getting headlines regardless?")
        getFollowingListHeadlines(urlSuffix)(dispatch)
    })
}

export const getFollowingListHeadlines = (urlSuffix) => (dispatch) => {
    //Should probably technically have this resource w/ a .then triggering getfollowing, as it does w/ finalize.  But it seems ok
    Actions.resource('GET', 'headlines/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_HEADLINES, list: act.headlines})
        getFollowingListAvatars(urlSuffix)(dispatch)
    })
}

export const getFollowingListAvatars = (urlSuffix) => (dispatch) => {
    Actions.resource('GET', 'avatars/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_AVATARS, list: act.avatars})
        //Finally, create the actual list that's used by the         
        dispatch({type: FINALIZE_FOLLOW_LIST})
    })
}


export const removeFriend = (person) => (dispatch) => {
    Actions.resource('DELETE', 'following/'+person)
        .then((act) => {
        dispatch({type: REMOVE_FRIEND, person: person})
        ArticleActions.getArticles()(dispatch)        
    })
}

export const addFriend = (person) => (dispatch) => {
    Actions.resource('PUT', 'following/'+person)
        .then((act) => {    
        setFollowingListFromServer()(dispatch)
        //Adding followed adds articles, need to update those too
        ArticleActions.getArticles()(dispatch)
    })
}