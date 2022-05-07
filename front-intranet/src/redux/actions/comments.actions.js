export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_OK = "CREATE_COMMENT_OK";
export const CREATE_COMMENT_ERROR = "CREATE_COMMENT_ERROR";

export const FIND_COMMENT = "FIND_COMMENT";
export const FIND_COMMENT_OK = "FIND_COMMENT_OK";
export const FIND_COMMENT_ERROR = "FIND_COMMENT_ERROR";

export const createComment = (comment) =>{
    console.log(comment);
    return async(dispatch) =>{
        dispatch({type: CREATE_COMMENT});

        const createCommentRequest = await fetch('http://localhost:4500/comments/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(comment),
        });
        const createCommentResult = await createCommentRequest.json();

        if(createCommentResult){
            dispatch({type: CREATE_COMMENT_OK, payload: createCommentResult})
        }else{
            dispatch({type: CREATE_COMMENT_ERROR, payload: createCommentResult.message})
        }
    }
};

export const findComment = (id) =>{
    console.log('ID EN REDUX',id);
    return async(dispatch) =>{
        dispatch({type: FIND_COMMENT});

        const findCommentRequest = await fetch(`http://localhost:4500/comments/find/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const findCommentResult = await findCommentRequest.json();

        if(findCommentResult){
            dispatch({type: FIND_COMMENT_OK, payload: findCommentResult})
        }else{
            dispatch({type: FIND_COMMENT_ERROR, payload: findCommentResult.message})
        }
    }
}
