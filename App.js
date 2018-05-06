import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { connect } from 'react-redux'
import List from './src/components/List/List'
import ShowList from './src/components/showList/showlist'
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import MovieDetail from './src/components/MovieDetails/MovieDetails';
import {getData, addPlace, deletePlace, deselectPlace, selectedPlace} from "./src/store/actions";
import TabNavigator from './src/components/TabNavigator/TabNavigator'


class App extends React.Component {
    constructor(props){
        super(props);
     }

    componentDidMount(){
        this.props.onGetData(); //call the action
        console.log(this.props.data)
    }

    placeAddedHandler = (placeName) =>{
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = (item) =>{
        this.props.onSelectPlace(item);
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
                <MovieDetail selectedItem={this.props.selectedItem}
                             onItemDeleted={this.placeDeletedHandler}
                             onModalClose={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>

                <ShowList data={this.props.data} onItemSelected={this.placeSelectedHandler}/>

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
        selectedItem: state.places.selectedItem,
        data: state.places.data
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetData: () => dispatch(getData()),
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (item) => dispatch(selectedPlace(item)),
        onDeselectPlace: ()=> dispatch(deselectPlace())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
