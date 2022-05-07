import { combineReducers } from 'redux';
import { adminReducer } from './admin.reducer';
import { authReducer } from './auth.reducer';
import { chatReducer } from './chat.reducer';
import { commentsReducer } from './comments.reducer';
import { eventsReducer } from './events.reducer';
import { newsReducer } from './news.reducer';
import { projectsReducer } from './project.reducer';

export const rootReducer = combineReducers(
    {
        auth: authReducer,
        events: eventsReducer,
        news: newsReducer,
        comments: commentsReducer,
        admin: adminReducer,
        chat: chatReducer,
        projects: projectsReducer
    }
);

