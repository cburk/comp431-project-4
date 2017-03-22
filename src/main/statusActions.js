import * as Actions from '../actions'

export const ActionTypes = {
    REMOVE_FRIEND: 'REMOVE_FRIEND',
    ADD_FRIEND: 'ADD_FRIEND'
}

export const removeFriend = (person) => {
    // TODO: Later, same thing as in updateCurUSer?
    return {type: ActionTypes.REMOVE_FRIEND, person: person}
}

export const addFriend = (person) => {
    return {type: ActionTypes.ADD_FRIEND, person: person}
}