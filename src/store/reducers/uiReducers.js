import { START_LOADING, STOP_LOADING } from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case START_LOADING:
            return{
                ...state,
                isLoading: true
            };
        case STOP_LOADING:
            return{
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
