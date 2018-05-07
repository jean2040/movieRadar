import { DATA_AVAILABLE,ADD_FAVORITE, DELETE_PLACE, DESELECT_SHOW, SELECT_SHOW, FETCH_FAVORITES } from '../actions/actionTypes'

const initialState={
    shows: [],
    selectedItem: null,
    data: [],
    favorites: [],
    modalType: null
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'DATA_AVAILABLE':
            return {
                ...state,
                data: action.data
            };
        case 'FETCH_FAVORITES':
            return {
                ...state,
                favorites: action.favorites
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

        case 'SELECT_SHOW':
            return{
                ...state,
                selectedItem: action.item,
                modalType: action.modalType
                };
        case 'DESELECT_SHOW':
            return{
                ...state,
                selectedItem: null
            };
        default:
            return state;
    }
};

export default reducer
