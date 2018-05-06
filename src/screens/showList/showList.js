import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ShowList from '../../components/showList/showlist';
import MovieDetail from '../../components/MovieDetails/MovieDetails'
import { connect } from 'react-redux';
import { getData,selectedPlace,deselectPlace, addFavorite } from '../../store/actions/index';

class ShowListScreen extends Component {
    constructor(props){
        super(props);
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
