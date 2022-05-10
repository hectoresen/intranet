import * as actions from '../actions/auth.actions';

const INITIAL_STATE = {
    user: null,
    error: '',
}

export const authReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case (actions.AUTH_LOGIN_OK): {
            return {...state, user: action.payload};
        }
        case (actions.AUTH_LOGIN_ERROR): {
            return {...state, user: false, error: true};
        }
        case (actions.AUTH_REGISTER_OK): {
            return {...state, user: action.payload, error: ''};
        }
        case (actions.AUTH_REGISTER_ERROR): {
            return {...state, error: action.payload, user: false};
        }
        default:
            return state;
    }
}