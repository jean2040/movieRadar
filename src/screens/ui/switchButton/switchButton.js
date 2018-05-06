import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Switch} from 'react-native'

const styles = StyleSheet.create({
    switch: {
        overflow: 'hidden',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Our custom component we want as a button in the nav bar
const CustomButton = ({ text }) => {
    return(

            <View style={styles.switch}>
                <Switch onSyncPress={value => this.setState({value})}/>
            </View>


        )

};

export default CustomButton
