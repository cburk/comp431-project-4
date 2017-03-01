import * as Actions from '../actions'

export const ActionTypes = {
    UPDATE_STATUS: 'UPDATE_STATUS'
}

export const updateCurUserStatus = (newStatus) => {
    console.log("Status action update status to: ", newStatus)
    // TODO: Eventually probably need author so we know which one to update?  Or will that be obvious from who's loggedIn?
    return {type: ActionTypes.UPDATE_STATUS, newStatus: newStatus}
}