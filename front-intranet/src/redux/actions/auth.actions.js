export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_OK = "AUTH_REGISTER_OK";
export const AUTH_REGISTER_ERROR = "AUTH_REGISTER_ERROR";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_OK = "AUTH_LOGIN_OK";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";

export const AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT";
export const AUTH_USER_LOGOUT_OK = "AUTH_USER_LOGOUT_OK";
export const AUTH_USER_LOGOUT_ERROR = "AUTH_USER_LOGOUT_ERROR";

export const CHECK_SESSION = "CHECK_SESSION";
export const CHECK_SESSION_OK = "CHECK_SESSION_OK";
export const CHECK_SESSION_ERROR = "CHECK_SESSION_ERROR"


export const loginUser = (form) =>{

    return async(dispatch) =>{
        dispatch({type: AUTH_LOGIN});

        const loginRequest = await fetch('http://localhost:4500/auth/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        const loginResult = await loginRequest.json();

        if(loginRequest.ok){
            dispatch({type: AUTH_LOGIN_OK, payload: loginResult})
        }else{
            dispatch({type: AUTH_LOGIN_ERROR, payload: loginResult.message})
        };
    }
};

export const registerUser = (form) =>{
    return async(dispatch) =>{
        dispatch({ type: AUTH_REGISTER});

        const registerRequest = await fetch('http://localhost:4500/auth/register', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        const result = await registerRequest.json();
        (registerRequest.ok) ? dispatch({ type: AUTH_REGISTER_OK, payload: result}) : dispatch({ type: AUTH_REGISTER_ERROR, payload: result.message});
    };
};




export const logoutUser = (user)=>{
    let activeUser = user;
    return async(dispatch) =>{
        dispatch({type: AUTH_USER_LOGOUT});

        const logoutRequest = await fetch('http://localhost:4500/auth/logout', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(activeUser)
        });
        const result = await logoutRequest.json();

        (logoutRequest.ok)
        ?
        dispatch({type: AUTH_USER_LOGOUT_OK, payload: result})
        :
        dispatch({type:AUTH_USER_LOGOUT_ERROR, payload: result.message});
    }
};


export const checkUserSession = () => {
    return async (dispatch) => {
        dispatch({ type: CHECK_SESSION });
        const request = await fetch("http://localhost:4500/auth/check-session", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
        });
        const result = await request.json();
        if (request.ok) {
            dispatch({ type: CHECK_SESSION_OK, payload: result });
        } else {
            dispatch({ type: CHECK_SESSION_ERROR });
        }
    };
};