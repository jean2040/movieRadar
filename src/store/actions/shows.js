import { DATA_AVAILABLE, ADD_FAVORITE,RANDOM, DELETE_PLACE, SELECT_SHOW, DESELECT_SHOW,FETCH_FAVORITES } from './actionTypes';
import { startLoading, stopLoading } from './index'

export const getData =(searchFor)=>{
    if(searchFor === "movie"){
        var buildURL = 'https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=54990a7c99582d0e4be944feff253c63';
    }
    else if(searchFor === "tv") {
        var buildURL = 'https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=54990a7c99582d0e4be944feff253c63';

    }
    else {
        var buildURL = "";
        console.log('An error has occur in the getData function');
    }
    return(dispatch)=>{
        dispatch(startLoading());
        //Make API call
        setTimeout(()=> {
            return fetch(buildURL)
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

export const addFavorite=(myFavorite)=>{
    return (dispatch) => {

        fetch("https://movieradar-b41ec.firebaseio.com/favorites.json", {
            method: "POST",
            body: JSON.stringify(myFavorite)
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedRef => {
                console.log("Favorite Added?");
                dispatch(fetchFavorites())
            });
        };
};

export const deleteShow = (id) => {
    console.log("Delete Show");
  return(dispatch) => {
      dispatch(removeShow(id));
      fetch("https://movieradar-b41ec.firebaseio.com/favorites/"+ id +".json", {
          method: "DELETE"
      })
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(parsedRef => {
              console.log("Favorite Removed");
              //dispatch(fetchFavorites())
          });
  }
};

export const removeShow = (id) =>{
    return{
        type: REMOVE_SHOW,
        id: id

    }
};

export const selectedPlace =(item, modalType) => {
    return {
        type: SELECT_SHOW,
        item: item,
        modalType: modalType

    }
};
export const selectedPlace2 =(item, modalType) => {
    return {
        type: SELECT_SHOW,
        item: item,
        modalType: modalType

    }
};

export const deselectPlace = () => {
    return {
        type: DESELECT_SHOW
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
                    //console.log(favorites);
                    return dispatch({type: FETCH_FAVORITES, favorites: favorites});
                });

        },2000);

    };

};
export const getRandom =()=>{
    var randomWords = require('random-words');
    var wordArray =  randomWords(1);
    var buildURL = "https://api.themoviedb.org/3/search/movie?api_key=54990a7c99582d0e4be944feff253c63&query=" + wordArray[0];
    return(dispatch)=>{
        dispatch(startLoading());
        //Make API call
        setTimeout(()=> {
            return fetch(buildURL)
                .catch(err => {
                    console.log(err);
                    dispatch(stopLoading());
                })
                .then((response) => response.json())
                .then((responseJson)=> {
                    //console.log(responseJson);
                    dispatch(stopLoading());
                    return dispatch({type: RANDOM, randomPick: responseJson.results});
                });

        },2000);

    };
};


