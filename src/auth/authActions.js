//import ERROR, {resource} from '../actions'
import * as actions from '../actions'
import * as articleActions from '../main/articleActions'
import * as profileActions from '../profile/profileActions'
import * as followingListActions from '../main/followingListActions'

export const LOGIN = 'LOGIN'

const uNameRE = /[a-zA-Z][a-zA-Z][a-zA-Z][0-9]/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/
      
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
        if(r.result == 'success'){
            //Get all articles for feed
            if(!isTest)  
                articleActions.getArticles()(dispatch)
        }else{
            dispatch({type: actions.ERROR, msg: r.errorMsg})
            isError = true
        }
    }).then((r)=>{
        if(!isTest && !isError)
            followingListActions.setFollowingListFromServer()(dispatch)
    }).then((r)=>{
        if(!isTest && !isError)
            profileActions.setUserInfoFromServer(Uname)(dispatch)
    }).then((r)=>{
        if(!isError){
            dispatch({type: LOGIN, name: Uname, password: Pword})
        }
    })
}