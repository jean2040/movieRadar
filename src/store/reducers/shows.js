import { DATA_AVAILABLE,ADD_FAVORITE, REMOVE_SHOW, DESELECT_SHOW, SELECT_SHOW, FETCH_FAVORITES } from '../actions/actionTypes'

const initialState={
    shows: [],
    selectedItem: null,
    data: [],
    favorites: [],
    modalType: null,
    myFavorite: null,
    id: null
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
            console.log("Add Favorite Reducer");
            return{
                ...state,
                    myFavorite: action.myFavorite


            };
        case 'REMOVE_SHOW':
            return {
                ...state,
                favorites: state.favorites.filter(favorite=>{
                    return favorite.id !== action.id
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
                selectedItem: null,
                modalType: null
            };
        default:
            return state;
    }
};

export default reducer
