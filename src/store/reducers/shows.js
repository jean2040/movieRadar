import { DATA_AVAILABLE, FETCH_TV, FETCH_MOVIE, ADD_FAVORITE, DELETE_PLACE, DESELECT_SHOW, SELECT_SHOW, FETCH_FAVORITES } from '../actions/actionTypes'

const initialState={
    shows: [],
    selectedItem: null,
    data: [],
    favorites: [],
    modalType: null,
    myFavorite: null
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'DATA_AVAILABLE':
            return {
                ...state,
                data: action.data
            };
        case 'RANDOM':
            return {
                ...state,
                randomPick: action.randomPick
            };
        case 'FETCH_FAVORITES':
            return {
                ...state,
                favorites: action.favorites
            };

        case 'ADD_FAVORITE':
            console.log("Add Favorite Reducer");
            return{
                ...state,
                    myFavorite: action.myFavorite


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
