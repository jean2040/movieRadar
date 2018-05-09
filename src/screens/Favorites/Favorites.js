import React, { Component } from 'react';
import { View, Button } from 'react-native';
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import FavoriteDetails from '../../components/FavoritesList/FavoriteDetails'
import { connect } from 'react-redux';
import {selectedPlace2, deselectPlace, fetchFavorites, deleteShow} from '../../store/actions/index';

class Favorites extends Component {
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };


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

    deleteShowHandler = (id)=>{
        console.log(id);
        this.props.onDeleteShow(id);
    };

    render(){
        return(
            <View>
                <FavoriteDetails selectedItem={this.props.selectedItem}
                                 onModalClose={this.modalClosedHandler}
                                 onDeleteShow={this.deleteShowHandler}
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
        onDeleteShow: (id)=> dispatch(deleteShow(id))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
