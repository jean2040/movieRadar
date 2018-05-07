import { DATA_AVAILABLE, ADD_FAVORITE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE,FETCH_FAVORITES } from './actionTypes';
import { startLoading, stopLoading } from './index'

export const getData =()=>{

    return(dispatch)=>{
        dispatch(startLoading());
        //Make API call
        setTimeout(()=> {
            return fetch('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=54990a7c99582d0e4be944feff253c63')
                .catch(err => {
                    console.log(err);
                    dispatch(stopLoading());
                })
                .then((response) => response.json())
                .then((responseJson)=> {
                    //console.log(responseJson);
                    dispatch(stopLoading());
                    return dispatch({type: DATA_AVAILABLE, data: responseJson.results});
                });

        },2000);

    };

           };

export const addFavorite=()=>{
    return (dispatch) => {
            const favoritesData = {
                name: "Movie name",
                description: "Movie description"
            };
            fetch("https://movieradar-b41ec.firebaseio.com/favoritesTest.json", {
                method: "POST",
                body: JSON.stringify(favoritesData)
            })
                .catch(err => console.log(err))
                .then(res => res.json())
                .then(parsedRef => {
                    //console.log(parsedRef)
                });
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

export const fetchFavorites =()=>{

    return(dispatch)=>{
        //Make API call
        setTimeout(()=> {
            return fetch('https://movieradar-b41ec.firebaseio.com/favorites.json')
                .catch(err => {alert("WTH"); console.log("Catching the erroe" + err)})
                .then((response) => response.json())
                .then((responseJson)=> {
                    const favorites = [];
                    for (let key in responseJson){
                        favorites.push({
                            ...responseJson[key],
                            id: key

                        })
                    }
                    console.log(favorites);
                    return dispatch({type: FETCH_FAVORITES, favorites: favorites});
                });

        },2000);

    };

};



