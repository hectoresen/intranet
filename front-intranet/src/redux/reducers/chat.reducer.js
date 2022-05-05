import * as actions from '../actions/chat.actions';

const INITIAL_STATE = {
    allUsers: [],
    chatGroupCreated: false,
    chatGroup: false
};

export const chatReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case (actions.FIND_ALL_USERS_OK): {
            return {...state, allUsers: action.payload}
        }
        case (actions.FIND_ALL_USERS_ERROR): {
            return {...state, allUsers: false }
        }
        case (actions.CREATE_CHAT_GROUP_OK): {
            return {...state, chatGroupCreated: action.payload}
        }
        case (actions.CREATE_CHAT_GROUP_ERROR): {
            return {...state, chatGroupCreated: false}
        }
        case (actions.GET_CHAT_GROUP_OK) : {
            return {...state, chatGroup: action.payload}
        }
        case (actions.GET_CHAT_GROUP_ERROR): {
            return {...state, chatGroup: false}
        }
        default:
            return state;
    }
}