import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux'
import List from './src/components/List/List'
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceDetail from './src/components/PlaceDetails/PlaceDetails';
import {addPlace, deletePlace, deselectPlace, selectedPlace} from "./src/store/actions";


class App extends React.Component {

    placeAddedHandler = (placeName) =>{
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = (key) =>{
        this.props.onSelectPlace(key);
    };
    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    };

    modalClosedHandler =()=>{
        this.props.onDeselectPlace();
    };

    render() {
        return (
            <View style={styles.container}>
                <PlaceDetail selectedPlace={this.props.selectedPlace}
                             onItemDeleted={this.placeDeletedHandler}
                             onModalClosed={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <List places={this.props.places} onItemSelected={this.placeSelectedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectedPlace(key)),
        onDeselectPlace: ()=> dispatch(deselectPlace())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
