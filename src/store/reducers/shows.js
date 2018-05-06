import { DATA_AVAILABLE,ADD_FAVORITE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from '../actions/actionTypes'

const initialState={
    shows: [],
    selectedItem: null,
    data: [],
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'DATA_AVAILABLE':
            return {
                ...state,
                data: action.data
            };

        case 'ADD_FAVORITE':
            console.log("Add Favorite Reducer"+ action.show);
            return{
                ...state,
                    shows: state.shows.concat({
                    key: Math.random(),
                    show: action.show
                })

            };
        case 'DELETE_PLACE':
            return {
                ...state,
                places: state.places.filter(place=>{
                    return place.key !== state.selectedItem.key
                }),
                selectedItem: null
            };

        case 'SELECT_PLACE':
            return{
                ...state,
                selectedItem: action.item
                };
        case 'DESELECT_PLACE':
            return{
                ...state,
                selectedItem: null
            };
        default:
            return state;
    }
};

export default reducer
