import { DATA_AVAILABLE, ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes'

export const getData =()=>{

    return(dispatch)=>{
        //Make API call
        setTimeout(()=> {
            return fetch('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=54990a7c99582d0e4be944feff253c63')
                .then((response) => response.json())
                .then((responseJson)=> {
                    console.log(responseJson);
                    return dispatch({type: DATA_AVAILABLE, data: responseJson.results});
                });

        },2000);

    };

           };

export const addPlace=(placeName)=>{
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
};

export const deletePlace = () => {
  return{
      type: DELETE_PLACE
  }
};

export const selectedPlace =(item) => {
    return {
        type: SELECT_PLACE,
        item: item
    }
};

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    }
};

