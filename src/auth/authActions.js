//import ERROR, {resource} from '../actions'
import * as actions from '../actions'

export const LOGIN = 'LOGIN'

const uNameRE = /[a-zA-Z][a-zA-Z][a-zA-Z][0-9]/
const pWordRE = /[a-zA-Z0-9]+\-[a-zA-Z0-9]+\-[a-zA-Z0-9]+/
      
// TODO: Get password
export const loginUser = (Uname, Pword) => (dispatch) => {
    console.log("Inside loginKUser")
    //return { type: LOGIN, name: Uname }
    let thisJSON = {username: Uname, password: Pword}
    console.log("Found json: ", thisJSON)
    
    //Check properly formatted username, password
    if(uNameRE.exec(Uname) != Uname){
        dispatch({type: actions.ERROR, msg: "Wrong Login format"})
        return
    }
    if(pWordRE.exec(Pword) != Pword){
        dispatch({type: actions.ERROR, msg: "Wrong password format"})
        return
    }
    
    actions.resource('POST', 'login', thisJSON)
        .then((r)=>{
        console.log("Back in login,", r)
        console.log(r.result)
        if(r.result == 'success'){
            //TODO: Set cookies when valid login
            console.log("In success path?")
            dispatch({type: LOGIN, username: r.username})
        }else{
            console.log("Invalid login part 1")
            console.log("Invalid login part", {type: actions.ERROR, errorMsg: r.errorMsg})
            dispatch({type: actions.ERROR, msg: r.errorMsg})
        }
        done()
        })
}
