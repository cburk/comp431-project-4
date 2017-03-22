//import ERROR, {resource} from '../actions'
import * as actions from '../actions'

export const LOGIN = 'LOGIN'

const uNameRE = /[a-zA-Z][a-zA-Z][a-zA-Z][0-9]/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/
      
// TODO: Get password
export const loginUser = (Uname, Pword) => (dispatch) => {
    //return { type: LOGIN, name: Uname }
    let thisJSON = {username: Uname, password: Pword}
    console.log("Found json: ", thisJSON)
    
    //Check properly formatted username, password
    if(uNameRE.exec(Uname) != Uname){
        dispatch({type: actions.ERROR, errorMsg: "Wrong Login format"})
        return
    }
    if(pWordRE.exec(Pword) != Pword){
        dispatch({type: actions.ERROR, errorMsg: "Wrong password format"})
        return
    }
    
    actions.resource('POST', 'login', thisJSON)
        .then((r)=>{
        if(r.result == 'success'){
            //TODO: Set cookies when valid login
            dispatch({type: LOGIN, username: r.username})
        }
        })
        .catch((error) => {
            dispatch({type: actions.ERROR, errorMsg: "Invalid Login"})
            console.log(error)
    })
}
