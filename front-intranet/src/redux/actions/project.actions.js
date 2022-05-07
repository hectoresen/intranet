export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_OK = "CREATE_PROJECT_OK";
export const CREATE_PROJECT_ERROR = "CREATE_PROJECT_ERROR";

export const GET_PROJECTS = "GET_PROJECTS";
export const GET_PROJECTS_OK = "GET_PROJECTS_OK"
export const GET_PROJECTS_ERROR = "GET_PROJECTS_ERROR"


export const createProject = (projectInfo) =>{
    return async(dispatch) =>{
        dispatch({type: CREATE_PROJECT});

        const createProjectRequest = await fetch('http://localhost:4500/projects/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(projectInfo),
        });
        const createProjectResults = await createProjectRequest.json();

        if(createProjectRequest.ok){
            dispatch({type: CREATE_PROJECT_OK, payload: createProjectResults})
        }else{
            dispatch({type: CREATE_PROJECT_ERROR, payload: createProjectResults.message})
        }
    }
};

export const getAllProjects = () =>{;
    return async(dispatch) =>{
        dispatch({type: GET_PROJECTS});

        const getProjectsRequest = await fetch('http://localhost:4500/projects/all',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });

        const getProjectsResults = await getProjectsRequest.json();

        if(getProjectsRequest.ok){
            dispatch({type: GET_PROJECTS_OK, payload: getProjectsResults})
        }else{
            dispatch({type: GET_PROJECTS_ERROR, payload: getProjectsResults.message})
        }
    }

}