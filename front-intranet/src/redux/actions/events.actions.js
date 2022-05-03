export const CREATE_EVENT = "CREATE_EVENT";
export const CREATE_EVENT_OK = "CREATE_EVENT_OK";
export const CREATE_EVENT_ERROR = "CREATE_EVENT_ERROR";

export const FIND_EVENT = "FIND_EVENT";
export const FIND_EVENT_OK = "FIND_EVENT_OK";
export const FIND_EVENT_ERROR = "FIND_EVENT_ERROR";



export const createEvent = (form) =>{

    const newEvent = {
        eventTitle: form.eventTitle,
        eventDate: form.eventDate.substring(0, 10),
        dateTime: form.eventDate.substring(11, 16),
        user: form.user
    };

    return async(dispatch) =>{
        dispatch({type: CREATE_EVENT});

        const createEventRequest = await fetch('http://localhost:4500/events/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
            body: JSON.stringify(newEvent),
        });
        const createEventResult = await createEventRequest.json();

        if(createEventResult){
            dispatch({type: CREATE_EVENT_OK, payload: createEventResult})
        }else{
            dispatch({type: CREATE_EVENT_ERROR, payload: createEventResult.message})
        };
    }
};

export const findEvent = (date) =>{

    return async(dispatch) =>{
        dispatch({type: FIND_EVENT});

        const findEventRequest = await fetch(`http://localhost:4500/events/info/${date}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
            credentials: "include",
        });
        const eventResult = await findEventRequest.json();

        if(eventResult){
            dispatch({type: FIND_EVENT_OK, payload: eventResult})
        }else{
            dispatch({type: FIND_EVENT_ERROR, payload: eventResult.message})
        }
    }
}