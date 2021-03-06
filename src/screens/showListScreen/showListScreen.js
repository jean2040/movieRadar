import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ShowList from '../../components/showList/showlist';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import { getData, selectedPlace,deselectPlace, addFavorite } from '../../store/actions/index';

class ShowListScreen extends Component {

    static navigatorButtons = {

        rightButtons: [
            {
                id: 'switch-button',
                component: 'SwitchButton', // This line loads our component as a nav bar button item
                passProps: {
                    text: 'Hi!',
                }
            }

        ]
    };

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

    placeSelectedHandler = (item, modalType) =>{
        console.log("Select item");
        this.props.onSelectPlace(item, modalType);
    };
    modalClosedHandler =()=>{
        console.log("DeSelect item");
        this.props.onDeselectPlace();
    };
    addFavoriteHandler = (myFavorite) =>{
        alert("Favorite Added");
        this.props.onAddFavorite(myFavorite)
    };
    componentDidMount(){
        this.props.onGetData(); //call the action
    }

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
                    <MovieDetail selectedItem={this.props.selectedItem}
                                 modalType={this.props.modalType}
                                 onModalClose={this.modalClosedHandler}
                                 onAddFavorite={this.addFavoriteHandler}
                    />
                    <ShowList data={this.props.data} onItemSelected={this.placeSelectedHandler}/>
                </View>
            )
        }


    }



}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        modalType:  state.places.modalType,
        data: state.places.data,
        isLoading: state.ui.isLoading,
        myFavorite: state.places.myFavorite
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetData:()=>dispatch(getData('movie')),
        onSelectPlace: (item, modalType) => dispatch(selectedPlace(item, modalType)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),
        onAddFavorite: (myFavorite) => dispatch(addFavorite(myFavorite))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListScreen);

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    });
