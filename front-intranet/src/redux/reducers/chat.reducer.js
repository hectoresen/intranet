import * as actions from '../actions/chat.actions';

const INITIAL_STATE = {
    allUsers: [],
    chatGroupCreated: false,
    chatGroup: false,
    createdMessage: [],
    postError: false,
    chatMessages: []
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
        case (actions.CREATE_MESSAGE_CHAT_OK) : {
            return {...state, createdMessage: action.payload}
        }
        case (actions.CREATE_MESSAGE_CHAT_ERROR) : {
            return {...state, postError: action.payload}
        }
        case (actions.GET_MESSAGE_CHAT_OK) : {
            console.log(action.payload);
            return {...state, chatMessages: action.payload}
        }

        default:
            return state;
    }
}