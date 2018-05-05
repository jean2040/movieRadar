import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';

class PlaceInput extends Component{

    state ={
        placeName: "",
        places: []
    };
    placeNameChangeHandler = (event) =>{
        this.setState({
            placeName: event
        });
    };

    placeSubmitHandler = () =>{
        if(this.state.placeName.trim() === ""){
            return;
        }

        this.props.onPlaceAdded(this.state.placeName)
    };

    render(){
        return(
        <View style={styles.topBar}>
            <TextInput style={styles.inputContainer}
                       placeholder={"And Awesome Place"}
                       value={this.state.placeName}
                       onChangeText={this.placeNameChangeHandler}
            />
            <Button style={styles.buttonContainer}
                    title={"Add"}
                    onPress={this.placeSubmitHandler}
            />
        </View>
        )}
}

export default PlaceInput;

const styles = StyleSheet.create({
    inputContainer:{
        width: '70%'
    },
    buttonContainer:{
        width: '30%'
    },
    topBar: {
        width: '90%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
});
