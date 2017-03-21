import {resource} from '../actions'

export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'

// TODO: Get password
export const loginUser = (Uname, Pword) => (dispatch) => {
    //return { type: LOGIN, name: Uname }
    let thisJSON = {username: Uname, password: Pword}
    console.log("Found json: ", thisJSON)
    resource('POST', 'login', thisJSON)
        .then((r)=>{
        console.log('b')
        console.log(r)
        console.log('b')
        dispatch({type: LOGIN, username: r.username})
        })
        .catch((error) => {
        console.log(error)
    })
}
