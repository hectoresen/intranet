export const CREATE_NEWS = "CREATE_NEWS";
export const CREATE_NEWS_OK = "CREATE_NEWS_OK";
export const CREATE_NEWS_ERROR = "CREATE_NEWS_ERROR";

export const FIND_NEWS = "FIND_NEWS";
export const FIND_NEWS_OK = "FIND_NEWS_OK";
export const FIND_NEWS_ERROR = "FIND_NEWS_ERROR"


export const createNews = (form) =>{
    return async(dispatch) =>{
        dispatch({type: CREATE_NEWS});

        const createNewsRequest = await fetch('http://localhost:4500/news/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        const createNewsResult = await createNewsRequest.json();
        if(createNewsResult){
            dispatch({type: CREATE_NEWS_OK, payload: createNewsResult})
        }else{
            dispatch({type: CREATE_NEWS_ERROR, payload: createNewsResult.message})
        }
    }
};

export const findNews = () =>{
    return async(dispatch) =>{
        dispatch({type: FIND_NEWS});

        const findNewsRequest = await fetch('http://localhost:4500/news/news',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const newsResult = await findNewsRequest.json();

        if(newsResult){
            dispatch({type: FIND_NEWS_OK, payload: newsResult});
            console.log(newsResult);
        }else{
            dispatch({type: FIND_NEWS_ERROR, payload: newsResult.message})
        }
    }
};