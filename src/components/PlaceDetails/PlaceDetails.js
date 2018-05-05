import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';

const placeDetails = (props) => {
    let modalContent = null;
    if(props.selectedPlace){
        modalContent = (
            <View>
            <Image source={ props.selectedPlace.image} style={styles.placeImage}/>
            <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return(
    <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !==null} animationType={'slide'}>
        <View>
            {modalContent}
            <View>
                <Button style={styles.buttons} title={"Delete"} color={"red"} onPress={props.onItemDeleted}/>
                <Button style={styles.buttons} title={"Close"} onPress={props.onModalClosed}/>
            </View>
        </View>
    </Modal>
)};

export default  placeDetails;

const styles = StyleSheet.create({

    placeImage:{
        margin: 8,
        width: 150,
        height: 150
    },

    buttons:{
        width: '90%',
        margin: 5
    },
    placeName:{
      fontWeight: 'bold',
      textAlign: 'center',
        fontSize: 28
    }
});
