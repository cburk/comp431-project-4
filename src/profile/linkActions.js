import * as AuthActions from '../auth/authActions'

export const link = (Uname, Pword) => (dispatch) => {
    AuthActions.loginUser(Uname, Pword, false, true)(dispatch)
}