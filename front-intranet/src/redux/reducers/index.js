import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { commentsReducer } from './comments.reducer';
import { eventsReducer } from './events.reducer';
import { newsReducer } from './news.reducer';

export const rootReducer = combineReducers(
    {
        auth: authReducer,
        events: eventsReducer,
        news: newsReducer,
        comments: commentsReducer,
    }
);

