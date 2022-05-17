import * as actions from '../actions/events.actions';

const eventsResult = {
    eventsList: [],
    eventErrors: null,
    createdEventErrors: null
}

export const eventsReducer = (state = eventsResult, action) =>{
    switch(action.type){
        case (actions.CREATE_EVENT_OK): {
            return {...state, createdEventErrors: false};
        }
        case (actions.CREATE_EVENT_ERROR): {
            return {...state, createdEventErrors: true};
        }
        case (actions.FIND_EVENT_OK): {
            return {...state, eventsList: action.payload, eventErrors: false};
        }
        case (actions.FIND_EVENT_ERROR): {
            return {...state, eventErrors: true}
        }
        default:
            return state;
    }
}