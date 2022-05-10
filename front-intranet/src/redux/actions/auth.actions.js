export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_OK = "AUTH_REGISTER_OK";
export const AUTH_REGISTER_ERROR = "AUTH_REGISTER_ERROR";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_OK = "AUTH_LOGIN_OK";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";

export const AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT";
export const AUTH_USER_LOGOUT_OK = "AUTH_USER_LOGOUT_OK";
export const AUTH_USER_LOGOUT_ERROR = "AUTH_USER_LOGOUT_ERROR";

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