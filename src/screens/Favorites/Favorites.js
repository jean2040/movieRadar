import React, { Component } from 'react';
import { View, Button } from 'react-native';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import {selectedPlace, deselectPlace, addFavorite, fetchFavorites} from '../../store/actions/index';

class Favorites extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.onGetFavorites(); //call the action
        console.log("Favorites Loading?" + this.props.favorites)
    }

    placeSelectedHandler = (item) =>{
        console.log("Select item");
        this.props.onSelectPlace(item);
    };
    modalClosedHandler =()=>{
        console.log("DeSelect item");
        this.props.onDeselectPlace();
    };
    addFavoriteHandler = (item) =>{
        console.log("Add Favorite Handler" +this.props.selectedItem);
        this.props.onAddFavorite(item)
    };

    render(){
        return(
            <View>
                <MovieDetail selectedItem={this.props.selectedItem}
                             onModalClose={this.modalClosedHandler}
                />
                <FavoritesList favorites={this.props.favorites} onItemSelected={this.placeSelectedHandler} />
            </View>
        )

    }
}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        data: state.places.data,
        favorites: state.places.favorites
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetFavorites:()=>dispatch(fetchFavorites()),
        onSelectPlace: (item) => dispatch(selectedPlace(item)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),
        onAddFavorite: (item) => dispatch(addFavorite(item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
