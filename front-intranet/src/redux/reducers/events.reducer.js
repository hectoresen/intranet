import * as actions from '../actions/events.actions';

const eventsResult = {
    event: false,
    eventErrors: null,
    createdEvent: null
}

export const eventsReducer = (state = eventsResult, action) =>{
    switch(action.type){
        case (actions.CREATE_EVENT_OK): {
            return {...state, createdEvent: true, eventErrors: false};
        }
        case (actions.CREATE_EVENT_ERROR): {
            return {...state, createdEvent: false};
        }
        case (actions.FIND_EVENT_OK): {
            return {...state, event: action.payload, eventErrors: false};
        }
        case (actions.FIND_EVENT_ERROR): {
            return {...state, eventErrors: action.payload}
        }
        default:
            return state;
    }
}