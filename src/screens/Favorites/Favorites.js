import React, { Component } from 'react';
import { View, Button } from 'react-native';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import {selectedPlace2, deselectPlace, fetchFavorites} from '../../store/actions/index';

class Favorites extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.onGetFavorites(); //call the action

    }

    placeSelectedHandler = (item, modalType) =>{
        this.props.onSelectPlace2(item, modalType);
    };
    modalClosedHandler =()=>{
        console.log("DeSelect item");
        this.props.onDeselectPlace();
    };

    render(){
        return(
            <View>
                <MovieDetail selectedItem={this.props.selectedItem}
                             onModalClose={this.modalClosedHandler}
                             modalType={this.props.modalType}
                />
                <FavoritesList favorites={this.props.favorites} onItemSelected={this.placeSelectedHandler} />
            </View>
        )

    }
}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        modalType:  state.places.modalType,
        data: state.places.data,
        favorites: state.places.favorites
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetFavorites:()=>dispatch(fetchFavorites()),
        onSelectPlace2: (item, modalType) => dispatch(selectedPlace2(item, modalType)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
