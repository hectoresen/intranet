import * as actions from '../actions/events.actions';

const eventsResult = {
    event: [],
    eventErrors: ''
}

export const eventsReducer = (state = eventsResult, action) =>{
    switch(action.type){
        case (actions.CREATE_EVENT_OK): {
            return {...state, event: 'Evento creado', eventErrors: false};
        }
        case (actions.CREATE_EVENT_ERROR): {
            return {...state, event: false, eventErrors: action.payload};
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