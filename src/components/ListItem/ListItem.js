import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'

const listItem = (props) => {
    console.log("list" + props.showTest);
    return (<TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>

            <Text>{props.showTest2}</Text>
        </View>
    </TouchableOpacity>
    )
};

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
