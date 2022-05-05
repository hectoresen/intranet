export const FIND_ALL_USERS = "FIND_ALL_USERS";
export const FIND_ALL_USERS_OK = "FIND_ALL_USERS_OK";
export const FIND_ALL_USERS_ERROR = "FIND_ALL_USERS_ERROR";

export const CREATE_CHAT_GROUP = "CREATE_CHAT_GROUP";
export const CREATE_CHAT_GROUP_OK = "CREATE_CHAT_GROUP_OK";
export const CREATE_CHAT_GROUP_ERROR = "CREATE_CHAT_GROUP_ERROR"

export const GET_CHAT_GROUP = "GET_CHAT_GROUP";
export const GET_CHAT_GROUP_OK = "GET_CHAT_GROUP_OK";
export const GET_CHAT_GROUP_ERROR = "GET_CHAT_GROUP_ERROR";

export const findAllUsers = () =>{
    return async(dispatch) =>{
        dispatch({type: FIND_ALL_USERS});

        const findUsersRequest = await fetch('http://localhost:4500/chat/allusers',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const findUsersResults = await findUsersRequest.json();

        if(findUsersResults){
            dispatch({type: FIND_ALL_USERS_OK, payload: findUsersResults})
        }else{
            dispatch({type: FIND_ALL_USERS_ERROR})
        }
    }
};

export const createGroup = (owner, guest) =>{
    const groupMembers = {
        owner: owner,
        guest: guest
    };

    return async(dispatch) =>{
        dispatch({type: CREATE_CHAT_GROUP});

        const createGroupRequest = await fetch('http://localhost:4500/chat/create',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(groupMembers)
        });

        const createGroupResult = await createGroupRequest.json();

        if(createGroupResult){
            dispatch({type: CREATE_CHAT_GROUP_OK, payload: createGroupResult})
        }else{
            dispatch({type: CREATE_CHAT_GROUP_ERROR, payload: createGroupResult.message})
        }
    }
};

export const getChats = (isGuest) =>{

    return async(dispatch) =>{
        dispatch({type: GET_CHAT_GROUP});

        const getGroupsRequest = await fetch(`http://localhost:4500/chat/find/${isGuest}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const getGroupsResults = await getGroupsRequest.json();

        if(getGroupsRequest){
            dispatch({type: GET_CHAT_GROUP_OK, payload: getGroupsResults})
        }else{
            dispatch({type: GET_CHAT_GROUP_ERROR, payload: getGroupsResults.message})
        };
    }
};
