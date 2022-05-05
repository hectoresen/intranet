export const FIND_USERS = "FIND_USERS";
export const FIND_USERS_OK = "FIND_USERS_OK";
export const FIND_USERS_ERROR = "FIND_USERS_ERROR";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_OK = "DELETE_USER_OK";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_OK = "EDIT_USER_OK";
export const EDIT_USER_ERROR = "EDIT_USER_ERROR";

export const findUsers = () =>{
    return async(dispatch) =>{
        dispatch({type: FIND_USERS});

        const findUsersRequest = await fetch('http://localhost:4500/admin/users',{
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
            dispatch({type: FIND_USERS_OK, payload: findUsersResults})
        }else{
            dispatch({type: FIND_USERS_ERROR})
        };
    }
}

export const deleteUser = (userId) =>{
    return async(dispatch) =>{
        dispatch({type: DELETE_USER});

        const deleteUserRequest = await fetch(`http://localhost:4500/admin/delete/${userId}`,{
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const deleteUserResult = await deleteUserRequest.json();

        if(deleteUserResult){
            dispatch({type: DELETE_USER_OK, payload: deleteUserResult})
        }else{
            dispatch({type: DELETE_USER_ERROR})
        };
    }
};

export const editPass = (userId, newPass) =>{
    const editInfo = {
        userId: userId,
        newPass: newPass
    };
    return async(dispatch) =>{
        dispatch({type: EDIT_USER});

        const editUserRequest = await fetch('http://localhost:4500/admin/modify/pass', {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(editInfo),
        });

        const editUserResult = await editUserRequest.json();

        if(editUserResult){
            dispatch({type: EDIT_USER_OK, payload: editUserResult})
        }else{
            dispatch({type: EDIT_USER_ERROR})
        };
    }
};


