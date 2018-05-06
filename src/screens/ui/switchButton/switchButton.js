import React from 'react';
import { StyleSheet,View, Switch} from 'react-native'

const styles = StyleSheet.create({
    switch: {
        overflow: 'hidden',
        width: 40,
        height: 34,
        borderRadius: 34 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Our custom component we want as a button in the nav bar
class SwitchButton  extends React.Component{
    constructor(){
        super();
        this.state={
            switchValue : false
        }
    }

    ShowAlert = (value) =>{

        this.setState({

            switchValue: value
        });

        if(value === true)
        {
            //Perform any task here which you want to execute on Switch ON event.
            //alert("Switch is On.");
        }
        else{
            //Perform any task here which you want to execute on Switch OFF event.
            //alert("Switch is Off.");
        }

    }

    render() {
        return (

            <View>
                <Switch
                    style={styles.switch}
                    onValueChange={(value) => this.ShowAlert(value)}
                    value={this.state.switchValue}/>
            </View>


        )
    }
};

export default SwitchButton
