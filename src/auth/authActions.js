//import ERROR, {resource} from '../actions'
import * as actions from '../actions'
import * as articleActions from '../main/articleActions'
import * as profileActions from '../profile/profileActions'
import * as followingListActions from '../main/followingListActions'

export const LOGIN = 'LOGIN'
export const CLEAR_ART_STATE = 'CLEAR_ART_STATE'

const uNameRE = /[a-zA-Z][a-zA-Z][a-zA-Z][0-9]/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/
      
export const loginInfoFetch = () => (dispatch) => {
    dispatch({type: CLEAR_ART_STATE})
    articleActions.getArticles()(dispatch)
    followingListActions.setFollowingListFromServer()(dispatch)
    profileActions.setUserInfoFromServer()(dispatch)
    dispatch({type: LOGIN})
}

// TODO: Get password
export const loginUser = (Uname, Pword, isTest=false) => (dispatch) => {
    let thisJSON = {username: Uname, password: Pword}
    
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
            loginInfoFetch(Uname, Pword)(dispatch)
        }
    })
}