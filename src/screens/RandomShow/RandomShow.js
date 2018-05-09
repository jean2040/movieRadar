import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import {  getRandom, selectedPlace,deselectPlace, addFavorite } from '../../store/actions/index';
import RandomMovie from "../../components/RandomMovie/RandomMovie";


class RandomShow extends Component {

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
        this.props.onGetRandom(); //call the action

    }
    placeSelectedHandler = (item, modalType) =>{
        console.log("Select item");
        this.props.onSelectPlace(item, modalType);
    };
    onRandomSearch = () => {
        this.props.onGetRandom();
    };

    modalClosedHandler =()=>{
        console.log("DeSelect item");
        this.props.onDeselectPlace();
    };
    addFavoriteHandler = (myFavorite) =>{
        alert("Add Favorite Handler");
        this.props.onAddFavorite(myFavorite)
    };

    render(){
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                    <Text>{"Loading..."}</Text>
                </View>
            );
        } else {
            return(

                <View>
                    <Button
                        onPress={this.onRandomSearch}
                        title="New Random"
                        color="#33ADFF"
                        accessibilityLabel="Click to find another random show"
                    />
                    <MovieDetail selectedItem={this.props.selectedItem}
                                 modalType={this.props.modalType}
                                 onModalClose={this.modalClosedHandler}
                                 onAddFavorite={this.addFavoriteHandler}
                    />
                    <RandomMovie randomPick={this.props.randomPick} onItemSelected={this.placeSelectedHandler}/>
                </View>
            )
        }


    }


}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        modalType:  state.places.modalType,
        randomPick: state.places.randomPick,
        isLoading: state.ui.isLoading,
        myFavorite: state.places.myFavorite
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetRandom:()=>dispatch(getRandom()),
        onSelectPlace: (item, modalType) => dispatch(selectedPlace(item, modalType)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),
        onAddFavorite: (myFavorite) => dispatch(addFavorite(myFavorite))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomShow);

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
