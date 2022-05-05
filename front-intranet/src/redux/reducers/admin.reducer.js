import * as actions from '../actions/admin.actions';

const INITIAL_STATE = {
    users: [],
    error: false,
    userDeleted: null
}

export const adminReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case(actions.FIND_USERS_OK): {
            return {...state, users: action.payload}
        }
        case(actions.FIND_USERS_ERROR): {
            return {...state, error: true}
        }
        case(actions.DELETE_USER_OK): {
            return {...state, userDeleted: action.payload}
        }
        case(actions.DELETE_USER_ERROR): {
            return {...state, userDeleted: false}
        }
        default:
            return state
    }
}