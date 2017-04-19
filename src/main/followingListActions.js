export const FOLLOW_PERSON_LIST_RAW = 'F_P_L_R'
export const FOLLOW_PERSON_AVATARS = 'F_P_A'
export const FOLLOW_PERSON_HEADLINES = 'F_P_H'
export const FINALIZE_FOLLOW_LIST = 'F_F_L'
export const REMOVE_FRIEND = 'REMOVE_FRIEND'
export const ADD_FRIEND = 'ADD_FRIEND'
import * as Actions from '../actions'

export const setFollowingListFromServer = () => (dispatch) => {
    Actions.resource('GET', 'following')
        .then((r)=>{
        //Figure out who we're following
        dispatch({type: FOLLOW_PERSON_LIST_RAW, list: r.following})

        //Format so we can request their avatars, headlines from server
        let urlSuffix = ""        
        r.following.map((uName) => {
            urlSuffix += uName + ','
        })
        
        return urlSuffix
    }).then((urlSuffix) => {
        getFollowingListHeadlines(urlSuffix)(dispatch)
        
        return urlSuffix
    }).then((urlSuffix) => {
        console.log("Getting url ending in: ", urlSuffix)
        getFollowingListAvatars(urlSuffix)(dispatch)
        
    })
}

export const getFollowingListHeadlines = (urlSuffix) => (dispatch) => {
    //Should probably technically have this resource w/ a .then triggering getfollowing, as it does w/ finalize.  But it seems ok
    Actions.resource('GET', 'headlines/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_HEADLINES, list: act.headlines})
    })
}

export const getFollowingListAvatars = (urlSuffix) => (dispatch) => {
    Actions.resource('GET', 'avatars/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_AVATARS, list: act.avatars})
    }).then(() => {
        //Finally, create the actual list that's used by the 
        dispatch({type: FINALIZE_FOLLOW_LIST})
    })
}


export const removeFriend = (person) => (dispatch) => {
    Actions.resource('DELETE', 'following/'+person)
        .then((act) => {
        dispatch({type: REMOVE_FRIEND, person: person})
    })
}

export const addFriend = (person) => (dispatch) => {
    Actions.resource('PUT', 'following/'+person)
        .then((act) => {    
        setFollowingListFromServer()(dispatch)
    })
}