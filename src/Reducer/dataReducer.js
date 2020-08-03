import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCHING_TODOS } from '../Constant';

const initialState = {
    datas: [],
    UIdata:[],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function dataReducer(state = initialState, action) {
debugger;
    switch(action.type) {
        case FETCHING_TODOS:
            return {
                ...state,
                datas: [],
                isFetching: true
            }
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                datas: action.data,
                UIdata: action.uidata
            }
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}