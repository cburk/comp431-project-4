//import ERROR, {resource} from '../actions'
import * as actions from '../actions'
import * as articleActions from '../main/articleActions'
import * as profileActions from '../profile/profileActions'
import * as followingListActions from '../main/followingListActions'

export const LOGIN = 'LOGIN'
export const CLEAR_ART_STATE = 'CLEAR_ART_STATE'

export const LOGGED_IN_WITH = {
    OAUTH: 'OAUTH',
    PASSWORD: 'PASSWORD'
}

const uNameRE = /[a-zA-Z][a-zA-Z][a-zA-Z][0-9]/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/
      
export const loginInfoFetch = (usingMethod) => (dispatch) => {
    articleActions.getArticles()(dispatch)
    followingListActions.setFollowingListFromServer()(dispatch)
    profileActions.setUserInfoFromServer()(dispatch)
    if(usingMethod=='OAUTH'){
        dispatch({type: LOGIN, using: LOGGED_IN_WITH.OAUTH})
    }else{
        dispatch({type: LOGIN, using: LOGGED_IN_WITH.PASSWORD})
    }
}

export const loginWithPayload = (json) => (dispatch) => {
    
}

export const loginUser = (Uname, Pword, isTest=false, linkActs=false) => (dispatch) => {
    let thisJSON = {username: Uname, password: Pword}
    if(linkActs){
        console.log("Asked login to link accounts")
        thisJSON.linkActs=true
    }
    
    if(pWordRE.exec(Pword) != Pword){
        dispatch({type: actions.ERROR, msg: "Wrong password format"})
        return
    }
    
    const loginFailed = -1
    let isError = false
    
    actions.resource('POST', 'login', thisJSON)
        .then((r)=>{
        if(r.result != 'success'){
            dispatch({type: actions.ERROR, msg: r.errorMsg})
            return
        }else{
            dispatch({type: CLEAR_ART_STATE})
            loginInfoFetch(LOGGED_IN_WITH.PASSWORD)(dispatch)
        }
    })
}