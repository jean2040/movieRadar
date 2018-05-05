import React from 'react';
import { View, Button, TextInput, StyleSheet} from 'react-native'

const InputText = (props) => (
    <View style={styles.topBar}>
        <TextInput style={styles.inputContainer}
                   placeholder={"And Awesome Place"}
                   value={props.placeName}
                   onChangeText={props.placeNameChangeHandler}
        />
        <Button style={styles.buttonContainer}
                title={"Add"}
                onPress={props.placeSubmitHandler}
        />
    </View>
);

export default InputText;

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
