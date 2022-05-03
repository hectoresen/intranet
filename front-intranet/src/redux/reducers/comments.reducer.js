import * as actions from '../actions/comments.actions';

const commentsResults = {
    comments: [],
    findCommentsError: null,
    createdCommentsError: null,
}

export const commentsReducer = (state = commentsResults, action) =>{
    switch(action.type){
        case(actions.CREATE_COMMENT_OK): {
            return {...state, createdCommentsError: false};
        }
        case(actions.CREATE_COMMENT_ERROR): {
            return {...state, createdCommentsError: true};
        }
        case(actions.FIND_COMMENT_OK): {
            return {...state, comments: action.payload}
        }
        case(actions.FIND_COMMENT_ERROR): {
            return {...state, findCommentsError: true}
        }
        default:
            return state;
    }
}