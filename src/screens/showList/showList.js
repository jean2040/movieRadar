import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ShowList from '../../components/showList/showlist';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import { getData,selectedPlace,deselectPlace, addFavorite } from '../../store/actions/index';

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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentDidMount(){
        this.props.onGetData(); //call the action
        }

    placeSelectedHandler = (item, modalType) =>{
        console.log("Select item");
        this.props.onSelectPlace(item, modalType);
    };
    modalClosedHandler =()=>{
        console.log("DeSelect item");
        this.props.onDeselectPlace();
    };
    addFavoriteHandler = () =>{
        console.log("Add Favorite Handler");
        this.props.onAddFavorite()
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
                    <MovieDetail selectedItem={this.props.selectedItem}
                                 modalType={this.props.modalType}
                                 onModalClose={this.modalClosedHandler}
                    />
                    <ShowList data={this.props.data} onItemSelected={this.placeSelectedHandler} />
                </View>
            )
        }


    }

    //THIS CODE HERE IS NOT WORKING YET - HAVE TO REVIEW DOCS
    onNavigatorEvent(event) { // this is the onPress handler
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'switch-button') { // this is the same id field from the static navigatorButtons definition
                alert('NavBar', ' button pressed');
            }

        }
    }

}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        modalType:  state.places.modalType,
        data: state.places.data,
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetData:()=>dispatch(getData()),
        onSelectPlace: (item, modalType) => dispatch(selectedPlace(item, modalType)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),
        onAddFavorite: () => dispatch(addFavorite())
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
