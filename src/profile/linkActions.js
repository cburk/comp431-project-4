import * as AuthActions from '../auth/authActions'
import * as Actions from '../actions'

export const link = (Uname, Pword) => (dispatch) => {
    AuthActions.loginUser(Uname, Pword, false, true)(dispatch)
}

export const unlink = () => (dispatch) => {
    Actions.resource('POST', 'unlink')
        .then((r)=>{
        if(r.result != 'success'){
            dispatch({type: actions.ERROR, msg: r.errorMsg})
            return
        }else{
            //Otherwise, account just logged in w/ password
            dispatch({type: AuthActions.LOGIN, using: AuthActions.LOGGED_IN_WITH.PASSWORD})
        }
    })
}