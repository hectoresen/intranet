import * as actions from '../actions/news.actions';

const newsResults = {
    news: [],
    findEventsError: null,
    createdNews: null,
};

export const newsReducer = (state = newsResults, action) =>{
    switch(action.type){
        case(actions.CREATE_NEWS_OK): {
            return {...state, createdNews: true};
        }
        case(actions.CREATE_NEWS_ERROR) : {
            return {...state, createdNews: false};
        }
        case(actions.FIND_NEWS_OK) : {
            return {...state, news: action.payload};
        }
        case(actions.FIND_NEWS_ERROR) : {
            return {...state, findEventsError: true};
        }
        default:
            return state;
    }
}