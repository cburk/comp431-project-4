import * as Actions from '../actions'

export const ActionTypes = {
    UPDATE_STATUS: 'UPDATE_STATUS',
    REMOVE_FRIEND: 'REMOVE_FRIEND',
    ADD_FRIEND: 'ADD_FRIEND'
}

export const updateCurUserStatus = (newStatus) => {
    // TODO: Later/Eventually probably need author so we know which one to update?  Or will that be obvious from who's loggedIn?
    return {type: ActionTypes.UPDATE_STATUS, newStatus: newStatus}
}

export const removeFriend = (person) => {
    // TODO: Later, same thing as in updateCurUSer?
    return {type: ActionTypes.REMOVE_FRIEND, person: person}
}

export const addFriend = (person) => {
    return {type: ActionTypes.ADD_FRIEND, person: person}
}