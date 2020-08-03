import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCHING_TODOS } from '../Constant';

export function fetchToDos(entity,pval) {
debugger;
    return async (dispatch) => {
        dispatch(getToDos())

        try {
            const res = await (fetch("https://api.github.com/search/"+entity+"?q="+pval));
            const json = await res.json();
            const uijson = await json.items.map((item)=>{
                return item
            })
            return (dispatch(getToDosSuccess(json,uijson)));
        }
        catch (err) {
            console.log("Catcherrorbug"+err);
            
            return dispatch(getToDosFailure(err));
        }
    }
}

function getToDos() {
    return {
        type: FETCHING_TODOS
    }
}

function getToDosSuccess(data,uidata) {

    return {
        type: FETCH_TODOS_SUCCESS,
        data:data,
        uidata:uidata
    }
}

function getToDosFailure() {
    return {
        type: FETCH_TODOS_FAILURE
    }
}