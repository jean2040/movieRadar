import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ShowList from '../../components/showList/showlist';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import { getData,selectedPlace,deselectPlace, addFavorite } from '../../store/actions/index';

class ShowListScreen extends Component {

    static navigatorButtons = {

        rightButtons: [
            {
                id: 'custom-button',
                component: 'CustomButton', // This line loads our component as a nav bar button item
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
                <ShowList data={this.props.data} onItemSelected={this.placeSelectedHandler} />
            </View>
        )

    }


    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
                alert('NavBar', 'Edit button pressed');
            }
            if (event.id == 'add') {
                alert('NavBar', 'Add button pressed');
            }
        }
    }

}

const mapStateToProps = state => {
    return {
        selectedItem: state.places.selectedItem,
        data: state.places.data
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetData:()=>dispatch(getData()),
        onSelectPlace: (item) => dispatch(selectedPlace(item)),
        onDeselectPlace: ()=> dispatch(deselectPlace()),
        onAddFavorite: (item) => dispatch(addFavorite(item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListScreen);
