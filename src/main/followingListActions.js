export const FOLLOW_PERSON_LIST_RAW = 'F_P_L_R'
export const FOLLOW_PERSON_AVATARS = 'F_P_A'
export const FOLLOW_PERSON_HEADLINES = 'F_P_H'
import * as Actions from '../actions'

export const setFollowingListFromServer = () => (dispatch) => {
    Actions.resource('GET', 'following')
        .then((r)=>{
        console.log('following these:', r)
        //Figure out who we're following
        dispatch({type: FOLLOW_PERSON_LIST_RAW, list: r.following})

        //Format so we can request their avatars, headlines from server
        let urlSuffix = ""        
        r.following.map((uName) => {
            urlSuffix += uName + ','
        })
        
        return urlSuffix
    }).then((urlSuffix) => {
        console.log("\n\nMade it to following list headlines\n\n")
        console.log(urlSuffix, " pt 2")
        getFollowingListHeadlines(urlSuffix)(dispatch)
        
        return urlSuffix
    }).then((urlSuffix) => {
        console.log("\n\nMade it to following list avatars\n\n")
        console.log(urlSuffix, " pt 3")
        getFollowingListAvatars(urlSuffix)(dispatch)
        
    })
    //TODO: Dispatch collate and update command?
}

export const getFollowingListHeadlines = (urlSuffix) => (dispatch) => {
    Actions.resource('GET', 'headlines/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_HEADLINES, list: act.headlines})
    })
}

export const getFollowingListAvatars = (urlSuffix) => (dispatch) => {
    Actions.resource('GET', 'avatars/'+urlSuffix)
        .then((act) => {
        dispatch({type: FOLLOW_PERSON_AVATARS, list: act.avatars})
    })
}


export const addPersonFollowing = (person) => (dispatch) => {
    //TODO
}