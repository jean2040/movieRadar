import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'

const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem} >
            <Image source={props.placeImage} style={styles.placeImage}/>
        <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
   listItem: {
       width: '90%',
       marginBottom: 20,
       padding: 20,
       flexDirection: 'row',
       alignItems: 'center'
   },
    placeImage:{
       margin: 8,
        width: 50,
        height: 50
    }
});

export default listItem;
