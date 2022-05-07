import * as actions from '../actions/project.actions';

const projectResults = {
    projects: [],
    createdProject: null
};


export const projectsReducer = (state = projectResults, action) =>{
    switch(action.type){
        case(actions.CREATE_PROJECT_OK) : {
            return {...state, createdProject: true}
        }
        case(actions.CREATE_PROJECT_ERROR) : {
            return {...state, createdProject: false}
        }
        case(actions.GET_PROJECTS_OK) : {
            return {...state, projects: action.payload}
        }
        case(actions.GET_PROJECTS_ERROR) : {
            return {...state, projects: false}
        }
        default:
            return state;
    }
}