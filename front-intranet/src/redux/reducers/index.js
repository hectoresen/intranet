import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { eventsReducer } from './events.reducer';

export const rootReducer = combineReducers(
    {
        auth: authReducer,
        events: eventsReducer
    }
);

