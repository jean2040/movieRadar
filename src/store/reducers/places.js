import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from '../actions/actionTypes'

const initialState={
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action)=>{
    switch (action.type){
        case 'ADD_PLACE':
            return{
                ...state,
                places: state.places.concat({key: Math.random(),
                    name: action.placeName,
                    image: {
                        uri: "http://images.intouchweekly.com/uploads/images/file/31967/courteney-cox-friends-monica-hair-2.jpg?fit=crop&h=510&w=680"
                    }})
            };
        case 'DELETE_PLACE':
            return {
                ...state,
                places: state.places.filter(place=>{
                    return place.key !== state.selectedPlace.key
                }),
                selectedPlace: null
            };

        case 'SELECT_PLACE':
            return{
                ...state,
                selectedPlace: state.places.find(place =>{
                    return place.key === action.placeKey;
                })
            };
        case 'DESELECT_PLACE':
            return{
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer
